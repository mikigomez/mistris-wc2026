// ── SUPABASE CONFIG ────────────────────────────────────────────
const SUPABASE_URL = 'https://llfnajykahqiouageogm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_yPbTM-Af0JAY1D0DdS-dKw_FsU4D2pQ';

// ── SUPABASE CLIENT ────────────────────────────────────────────
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── STATE ──────────────────────────────────────────────────────
let state = {
  players: [],
  currentPlayer: null,   // { name, pinHash }
  predictions: {},       // { playerName: { matchId: { homeScore, awayScore, scorers } } }
  results: {},           // { matchId: { homeScore, awayScore, scorers, status } }
  currentPhase: 'Group stage'
};

// Only store current player locally (so they stay logged in on refresh)
function saveCurrentPlayer() {
  try { localStorage.setItem('mistris_player', JSON.stringify(state.currentPlayer)); } catch(e) {}
}
function loadCurrentPlayer() {
  try { const p = localStorage.getItem('mistris_player'); if (p) state.currentPlayer = JSON.parse(p); } catch(e) {}
}

// ── KICKOFF LOCK ───────────────────────────────────────────────
function isMatchLocked(match) {
  if (!match || match.home === 'TBD') return true;
  if (state.results[match.id]?.status === 'finished') return true;
  if (state.results[match.id]?.status === 'live') return true;
  const kickoff = KICKOFFS[match.id];
  if (kickoff) return Date.now() >= new Date(kickoff).getTime();
  const parts = match.date.match(/(\w+)\s+(\d+)/);
  if (!parts) return false;
  const mon = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
  return Date.now() >= new Date(Date.UTC(2026, mon[parts[1]], parseInt(parts[2]), 23, 59)).getTime();
}

// ── SCORER RULES ───────────────────────────────────────────────
const MAX_FWD = 2;
function scorerPts(pos) { return POS_PTS[pos] || 5; }

// ── PIN HASH ───────────────────────────────────────────────────
function hashPin(name, pin) {
  const str = name.toLowerCase() + '|' + pin + '|mistris2026';
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = ((h << 5) - h) + str.charCodeAt(i); h |= 0; }
  return h.toString(16);
}

// ── LOAD ALL DATA FROM SUPABASE ────────────────────────────────
async function loadAllData() {
  showLoading(true);
  try {
    const [playersRes, predictionsRes, resultsRes] = await Promise.all([
      db.from('players').select('name, pin_hash'),
      db.from('predictions').select('*'),
      db.from('results').select('*')
    ]);

    // Players
    state.players = (playersRes.data || []).map(p => ({ name: p.name, pinHash: p.pin_hash }));

    // Predictions — rebuild into { playerName: { matchId: {...} } }
    state.predictions = {};
    (predictionsRes.data || []).forEach(p => {
      if (!state.predictions[p.player_name]) state.predictions[p.player_name] = {};
      state.predictions[p.player_name][p.match_id] = {
        homeScore: p.home_score,
        awayScore: p.away_score,
        scorers: p.scorers || []
      };
    });

    // Results
    state.results = {};
    (resultsRes.data || []).forEach(r => {
      state.results[r.match_id] = {
        homeScore: r.home_score,
        awayScore: r.away_score,
        scorers: r.scorers || [],
        status: r.status
      };
    });

  } catch(e) {
    console.error('Failed to load data:', e);
    showToast('Connection error — retrying...');
    setTimeout(loadAllData, 3000);
    return;
  }
  showLoading(false);
  renderAll();
}

function showLoading(on) {
  let el = document.getElementById('loading-bar');
  if (!el) {
    el = document.createElement('div');
    el.id = 'loading-bar';
    el.style.cssText = 'position:fixed;top:0;left:0;right:0;height:3px;background:#f5c842;z-index:999;transition:opacity 0.3s';
    document.body.appendChild(el);
  }
  el.style.opacity = on ? '1' : '0';
}

// ── REALTIME SUBSCRIPTIONS ─────────────────────────────────────
function setupRealtime() {
  // Listen for new/updated predictions
  db.channel('predictions-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'predictions' }, payload => {
      const p = payload.new;
      if (!p) return;
      if (!state.predictions[p.player_name]) state.predictions[p.player_name] = {};
      state.predictions[p.player_name][p.match_id] = {
        homeScore: p.home_score, awayScore: p.away_score, scorers: p.scorers || []
      };
      renderAll();
    })
    .subscribe();

  // Listen for result updates
  db.channel('results-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'results' }, payload => {
      const r = payload.new;
      if (!r) return;
      state.results[r.match_id] = {
        homeScore: r.home_score, awayScore: r.away_score,
        scorers: r.scorers || [], status: r.status
      };
      renderAll();
    })
    .subscribe();

  // Listen for new players
  db.channel('players-changes')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'players' }, payload => {
      const p = payload.new;
      if (!p) return;
      if (!state.players.find(pl => pl.name === p.name)) {
        state.players.push({ name: p.name, pinHash: p.pin_hash });
        renderPlayerChips();
        renderLeaderboard();
      }
    })
    .subscribe();
}

// ── POINTS ─────────────────────────────────────────────────────
function calcPoints(pred, result) {
  if (!pred || !result || result.status !== 'finished') return null;
  const ph = parseInt(pred.homeScore), pa = parseInt(pred.awayScore);
  const rh = parseInt(result.homeScore), ra = parseInt(result.awayScore);
  if (isNaN(ph)||isNaN(pa)||isNaN(rh)||isNaN(ra)) return null;
  let pts = 0;
  if (ph === rh && pa === ra) pts += 10;
  else if ((ph>pa&&rh>ra)||(ph<pa&&rh<ra)||(ph===pa&&rh===ra)) pts += 5;
  const actualNames = (result.scorers||[]).map(s => normalise(s.name));
  (pred.scorers||[]).forEach(ps => { if (actualNames.includes(normalise(ps.name))) pts += scorerPts(ps.pos); });
  return pts;
}

function playerTotal(name) {
  let t = 0;
  MATCHES.forEach(m => {
    const pts = calcPoints((state.predictions[name]||{})[m.id], state.results[m.id]);
    if (pts !== null) t += pts;
  });
  return t;
}

function normalise(n) { return (n||'').toLowerCase().replace(/[^a-z]/g,''); }
function getPlayerName(p) { return typeof p === 'object' ? p.name : p; }

// ── AUTH ───────────────────────────────────────────────────────
let authMode = null, authTargetName = null;

function showJoinModal() {
  authMode = 'join'; authTargetName = null;
  document.getElementById('authTitle').textContent = 'Create your profile';
  document.getElementById('authNameRow').style.display = 'flex';
  document.getElementById('authPinConfirmRow').style.display = 'flex';
  document.getElementById('authBtn').textContent = 'Create profile';
  ['authNameInput','authPinInput','authPinConfirm'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('authError').textContent = '';
  document.getElementById('authOverlay').classList.add('open');
  setTimeout(() => document.getElementById('authNameInput').focus(), 100);
}

function showLoginModal(name) {
  authMode = 'login'; authTargetName = name;
  document.getElementById('authTitle').textContent = `Welcome back, ${name}`;
  document.getElementById('authNameRow').style.display = 'none';
  document.getElementById('authPinConfirmRow').style.display = 'none';
  document.getElementById('authBtn').textContent = 'Unlock profile';
  document.getElementById('authPinInput').value = '';
  document.getElementById('authError').textContent = '';
  document.getElementById('authOverlay').classList.add('open');
  setTimeout(() => document.getElementById('authPinInput').focus(), 100);
}

function closeAuthModal() {
  document.getElementById('authOverlay').classList.remove('open');
  authMode = null; authTargetName = null;
}

async function submitAuth() {
  const pin = document.getElementById('authPinInput').value.trim();
  document.getElementById('authError').textContent = '';
  document.getElementById('authBtn').disabled = true;
  document.getElementById('authBtn').textContent = 'Please wait...';

  try {
    if (authMode === 'join') {
      const name = document.getElementById('authNameInput').value.trim();
      const confirm = document.getElementById('authPinConfirm').value.trim();
      if (!name) { authErr('Please enter a name.'); return; }
      if (!/^\d{4}$/.test(pin)) { authErr('PIN must be exactly 4 digits.'); return; }
      if (pin !== confirm) { authErr('PINs do not match.'); return; }

      // Check name not taken (check local state first, then DB)
      if (state.players.find(p => getPlayerName(p).toLowerCase() === name.toLowerCase())) {
        authErr('Name already taken.'); return;
      }

      const ph = hashPin(name, pin);
      const { error } = await db.from('players').insert({ name, pin_hash: ph });
      if (error) {
        if (error.code === '23505') { authErr('Name already taken.'); return; }
        authErr('Could not create profile. Try again.'); return;
      }

      state.players.push({ name, pinHash: ph });
      state.currentPlayer = { name, pinHash: ph };
      saveCurrentPlayer();
      closeAuthModal();
      renderAll();
      showToast(`Welcome, ${name}! 🎉`);

    } else if (authMode === 'login') {
      const player = state.players.find(p => getPlayerName(p) === authTargetName);
      if (!player) { authErr('Player not found.'); return; }
      if (typeof player === 'object' && player.pinHash && hashPin(authTargetName, pin) !== player.pinHash) {
        authErr('Wrong PIN. Try again.'); return;
      }
      state.currentPlayer = player;
      saveCurrentPlayer();
      closeAuthModal();
      renderAll();
      showToast(`Welcome back, ${authTargetName}!`);
    }
  } finally {
    document.getElementById('authBtn').disabled = false;
    document.getElementById('authBtn').textContent = authMode === 'join' ? 'Create profile' : 'Unlock profile';
  }
}

function authErr(msg) {
  document.getElementById('authError').textContent = msg;
  document.getElementById('authBtn').disabled = false;
  document.getElementById('authBtn').textContent = authMode === 'join' ? 'Create profile' : 'Unlock profile';
}

document.getElementById('authPinInput').addEventListener('keydown', e => { if(e.key==='Enter') submitAuth(); });
document.getElementById('authPinConfirm').addEventListener('keydown', e => { if(e.key==='Enter') submitAuth(); });
document.getElementById('authNameInput').addEventListener('keydown', e => { if(e.key==='Enter') document.getElementById('authPinInput').focus(); });
['authPinInput','authPinConfirm'].forEach(id => {
  document.getElementById(id).addEventListener('input', function() { this.value = this.value.replace(/\D/g,'').slice(0,4); });
});

function logout() {
  state.currentPlayer = null;
  saveCurrentPlayer();
  renderAll();
}

// ── TAB SWITCHING ──────────────────────────────────────────────
function switchTab(tab, btn) {
  document.querySelectorAll('.main-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-matches').style.display   = tab === 'matches'   ? 'block' : 'none';
  document.getElementById('tab-howtoplay').style.display = tab === 'howtoplay' ? 'block' : 'none';
}

// ── PLAYER CHIPS ───────────────────────────────────────────────
function renderPlayerChips() {
  const wrap = document.getElementById('playerChips');
  if (!state.players.length) { wrap.innerHTML = '<p class="no-players-hint">No players yet</p>'; return; }
  wrap.innerHTML = state.players.map(p => {
    const name = getPlayerName(p), pts = playerTotal(name), isMe = state.currentPlayer && getPlayerName(state.currentPlayer) === name;
    return `<button class="player-chip ${isMe?'active':''}" onclick="${isMe ? 'logout()' : `showLoginModal('${esc(name)}')`}">
      <span class="chip-avatar">${name.charAt(0).toUpperCase()}</span>
      <span class="chip-name">${esc(name)}</span>
      ${isMe ? '<span class="chip-you">you · logout</span>' : ''}
      <span class="chip-pts">${pts} pts</span>
    </button>`;
  }).join('');
}

// ── PHASES ─────────────────────────────────────────────────────
function renderPhases() {
  document.getElementById('phaseScroll').innerHTML = PHASES.map(ph => `
    <button class="phase-pill ${ph===state.currentPhase?'active':''}" onclick="setPhase('${ph}')">${ph}</button>`).join('');
}
function setPhase(ph) { state.currentPhase = ph; renderPhases(); renderMatchList(); }

// ── MATCH LIST ─────────────────────────────────────────────────
function renderMatchList() {
  const wrap = document.getElementById('matchList');
  const matches = MATCHES.filter(m => m.phase === state.currentPhase);
  if (state.currentPhase === 'Group stage') {
    const groups = {};
    matches.forEach(m => { if (!groups[m.group]) groups[m.group]=[]; groups[m.group].push(m); });
    wrap.innerHTML = Object.entries(groups).map(([g,ms]) => `
      <div class="group-header"><span class="group-header-label">Group ${g}</span><span class="group-header-line"></span></div>
      ${ms.map(m => matchCardHTML(m)).join('')}`).join('');
  } else {
    wrap.innerHTML = matches.map(m => matchCardHTML(m)).join('');
  }
}

function matchCardHTML(m) {
  const locked = isMatchLocked(m);
  const result = state.results[m.id];
  const isFinished = result?.status === 'finished';
  const isLive = result?.status === 'live';
  const myName = state.currentPlayer ? getPlayerName(state.currentPlayer) : null;
  const myPred = myName ? (state.predictions[myName]||{})[m.id] : null;

  let statusLabel = '', statusClass = 'upcoming';
  if (isLive)           { statusLabel = '🔴 Live'; statusClass = 'live'; }
  else if (isFinished)  { statusLabel = 'Final'; statusClass = 'final'; }
  else if (locked)      { statusLabel = '🔒 In progress'; statusClass = 'locked'; }
  else if (m.time)      { statusLabel = m.time; statusClass = 'upcoming'; }

  const scoreHTML = result
    ? `<div class="score-nums"><span class="score-n">${result.homeScore??'?'}</span><span class="score-sep">:</span><span class="score-n">${result.awayScore??'?'}</span></div>`
    : `<span class="score-vs">${m.home==='TBD'?'TBD':'vs'}</span>`;

  // My prediction strip
  let myPredHTML = '';
  if (m.home !== 'TBD') {
    if (myPred) {
      const pts = calcPoints(myPred, result);
      const scorerList = (myPred.scorers||[]).map(s => s.name).join(', ');
      myPredHTML = `
        <div class="my-pred-strip ${!locked?'clickable':''}" ${!locked?`onclick="openPredModal(${m.id})"`:''}>
          <span class="pred-label">Your pick:</span>
          <span class="pred-score">${myPred.homeScore} – ${myPred.awayScore}</span>
          ${scorerList ? `<span class="pred-scorer-lbl">⚽ ${esc(scorerList)}</span>` : ''}
          ${pts !== null ? `<span class="pred-pts">+${pts} pts</span>` : ''}
          ${!locked ? '<span class="pred-edit">edit</span>' : ''}
        </div>`;
    } else if (!locked && myName) {
      myPredHTML = `<div class="no-pred-strip" onclick="openPredModal(${m.id})">+ Add your prediction</div>`;
    } else if (!locked && !myName) {
      myPredHTML = `<div class="no-pred-strip" onclick="showJoinModal()">Log in to predict</div>`;
    } else if (locked && !isFinished && !isLive) {
      myPredHTML = `<div class="no-pred-strip locked-strip">🔒 Predictions closed</div>`;
    }
  }

  // All predictions — only visible after kickoff
  const allPredsHTML = locked ? allPredictionsHTML(m) : '';

  // Results breakdown — only after finished
  const resultsHTML = isFinished ? resultsBreakdownHTML(m) : '';

  return `<div class="match-card ${myPred?'has-prediction':''}">
    <div class="mc-top">
      <div class="mc-meta">
        <span class="mc-date">${m.date}${m.time?' · '+m.time:''}</span>
        ${statusLabel ? `<span class="status-pill status-${statusClass}">${statusLabel}</span>` : ''}
      </div>
      <div class="teams-row">
        <div class="team-block"><span class="team-flag">${FLAGS[m.home]||'🏳️'}</span><span class="team-name">${m.home}</span></div>
        <div class="score-area">${scoreHTML}</div>
        <div class="team-block"><span class="team-flag">${FLAGS[m.away]||'🏳️'}</span><span class="team-name">${m.away}</span></div>
      </div>
    </div>
    ${myPredHTML}
    ${allPredsHTML}
    ${resultsHTML}
  </div>`;
}

// ── ALL PREDICTIONS (after kickoff only) ───────────────────────
function allPredictionsHTML(m) {
  if (!state.players.length) return '';
  const result = state.results[m.id];
  const rows = state.players.map(p => {
    const name = getPlayerName(p);
    const pred = (state.predictions[name]||{})[m.id];
    const pts = calcPoints(pred, result);
    const scorerList = (pred?.scorers||[]).map(s => s.name).join(', ');
    return `<div class="rd-row">
      <div class="rd-av">${name.charAt(0).toUpperCase()}</div>
      <span class="rd-name">${esc(name)}</span>
      ${pred
        ? `<span class="rd-detail">${pred.homeScore}–${pred.awayScore}${scorerList?' · ⚽ '+esc(scorerList):''}</span>
           ${pts !== null ? `<span class="rd-pts">+${pts}</span>` : '<span class="rd-pending">pending</span>'}`
        : `<span class="rd-detail" style="font-style:italic;color:var(--text3)">no prediction</span>`}
    </div>`;
  }).join('');
  return `<div class="results-dropdown">
    <button class="rd-toggle" onclick="toggleRD('all-${m.id}')">
      <span>All predictions</span><span class="rd-arrow" id="rdarrow-all-${m.id}">▾</span>
    </button>
    <div class="rd-body" id="rdbody-all-${m.id}" style="display:none">${rows}</div>
  </div>`;
}

// ── RESULTS BREAKDOWN ──────────────────────────────────────────
function resultsBreakdownHTML(m) {
  const result = state.results[m.id];
  if (!result || result.status !== 'finished') return '';
  const rh = parseInt(result.homeScore), ra = parseInt(result.awayScore);
  const actualNames = (result.scorers||[]).map(s => normalise(s.name));

  const scoreWinners = [], scorerWinners = [];
  state.players.forEach(p => {
    const name = getPlayerName(p), pred = (state.predictions[name]||{})[m.id];
    if (!pred) return;
    const ph = parseInt(pred.homeScore), pa = parseInt(pred.awayScore);
    if (ph===rh && pa===ra) scoreWinners.push({name, label:`${ph}–${pa}`, pts:10, exact:true});
    else if ((ph>pa&&rh>ra)||(ph<pa&&rh<ra)||(ph===pa&&rh===ra)) scoreWinners.push({name, label:`${ph}–${pa}`, pts:5, exact:false});
    (pred.scorers||[]).forEach(ps => {
      if (actualNames.includes(normalise(ps.name))) scorerWinners.push({name, scorer:ps.name, pos:ps.pos, pts:scorerPts(ps.pos)});
    });
  });

  const noOne = '<span class="rd-nobody">Nobody got this right</span>';
  const actualStr = (result.scorers||[]).map(s=>s.name).join(', ') || '—';
  const scoreRows = scoreWinners.length
    ? scoreWinners.map(w=>`<div class="rd-row"><div class="rd-av">${w.name.charAt(0)}</div><span class="rd-name">${esc(w.name)}</span><span class="rd-detail">${w.label}${w.exact?' ⭐':''}</span><span class="rd-pts">+${w.pts}</span></div>`).join('')
    : noOne;
  const scorerRows = scorerWinners.length
    ? scorerWinners.map(w=>`<div class="rd-row"><div class="rd-av">${w.name.charAt(0)}</div><span class="rd-name">${esc(w.name)}</span><span class="rd-detail">⚽ ${esc(w.scorer)} (${POS_LABEL[w.pos]||w.pos})</span><span class="rd-pts">+${w.pts}</span></div>`).join('')
    : noOne;

  return `<div class="results-dropdown">
    <button class="rd-toggle" onclick="toggleRD('res-${m.id}')">
      <span>Who predicted correctly?</span><span class="rd-arrow" id="rdarrow-res-${m.id}">▾</span>
    </button>
    <div class="rd-body" id="rdbody-res-${m.id}" style="display:none">
      <div class="rd-section"><div class="rd-section-title">🏆 Score</div>${scoreRows}</div>
      <div class="rd-section"><div class="rd-section-title">⚽ Goalscorers — ${esc(actualStr)}</div>${scorerRows}</div>
    </div>
  </div>`;
}

function toggleRD(key) {
  const body = document.getElementById('rdbody-'+key);
  const arrow = document.getElementById('rdarrow-'+key);
  if (!body) return;
  const open = body.style.display !== 'none';
  body.style.display = open ? 'none' : 'block';
  if (arrow) arrow.textContent = open ? '▾' : '▴';
}

// ── LEADERBOARD ────────────────────────────────────────────────
function renderLeaderboard() {
  const wrap = document.getElementById('lbContent');
  if (!state.players.length) { wrap.innerHTML = '<div class="lb-empty">Add players to start</div>'; return; }
  const board = state.players.map(p => {
    const name = getPlayerName(p); let total=0, correct=0, exact=0, preds=0;
    MATCHES.forEach(m => {
      const pred = (state.predictions[name]||{})[m.id]; if (pred) preds++;
      const pts = calcPoints(pred, state.results[m.id]);
      if (pts !== null) { total+=pts; if(pts>=5) correct++; if(pts>=10) exact++; }
    });
    return {name, total, correct, exact, preds};
  }).sort((a,b) => b.total - a.total);

  const medals = ['🥇','🥈','🥉'];
  wrap.innerHTML = board.map((p,i) => `
    <div class="lb-row">
      <span class="lb-rank ${['r1','r2','r3'][i]||''}">${medals[i]||(i+1)}</span>
      <div class="lb-avatar">${p.name.charAt(0)}</div>
      <div class="lb-info"><div class="lb-name">${esc(p.name)}</div><div class="lb-detail">${p.preds} pred · ${p.correct} correct · ${p.exact} exact</div></div>
      <div><div class="lb-pts-num">${p.total}</div><div class="lb-pts-lbl">pts</div></div>
    </div>`).join('');
}

// ── PREDICTION MODAL ───────────────────────────────────────────
let activeMatchId = null, tempHome = 0, tempAway = 0, tempScorers = [];

function openPredModal(matchId) {
  const myName = state.currentPlayer ? getPlayerName(state.currentPlayer) : null;
  if (!myName) { showJoinModal(); return; }
  const match = MATCHES.find(m => m.id === matchId);
  if (!match || isMatchLocked(match)) { showToast('Predictions are locked for this match!'); return; }
  activeMatchId = matchId;

  const pred = (state.predictions[myName]||{})[matchId];
  tempHome = pred ? parseInt(pred.homeScore)||0 : 0;
  tempAway = pred ? parseInt(pred.awayScore)||0 : 0;
  tempScorers = pred ? [...(pred.scorers||[])] : [];

  document.getElementById('spHomeVal').textContent = tempHome;
  document.getElementById('spAwayVal').textContent = tempAway;
  document.getElementById('spHomeLabel').textContent = match.home;
  document.getElementById('spAwayLabel').textContent = match.away;
  document.getElementById('modalHeader').innerHTML = `
    <span class="modal-flag">${FLAGS[match.home]||'🏳️'}</span>
    <span class="modal-team">${match.home}</span>
    <span class="modal-vs">VS</span>
    <span class="modal-team">${match.away}</span>
    <span class="modal-flag">${FLAGS[match.away]||'🏳️'}</span>`;

  buildScorerUI(match);
  document.getElementById('predOverlay').classList.add('open');
}

function buildScorerUI(match) {
  const wrap = document.getElementById('scorerPickerWrap');
  const home = SQUADS[match.home]||[], away = SQUADS[match.away]||[];
  let html = '<p class="scorer-ui-hint">Tap to select scorers. Max 2 strikers total. Midfielders 10 pts · Defenders/GK 15 pts.</p>';
  ['FWD','MID','DEF','GK'].forEach(pos => {
    [[match.home,home],[match.away,away]].forEach(([team,squad]) => {
      const players = squad.filter(p => p.pos === pos);
      if (!players.length) return;
      html += `<div class="scorer-group">
        <div class="scorer-group-title">${FLAGS[team]||''} ${team} — ${POS_LABEL[pos]} (${POS_PTS[pos]} pts)</div>
        <div class="scorer-chips">${players.map(p => {
          const sel = tempScorers.find(s => normalise(s.name) === normalise(p.name));
          return `<button class="scorer-chip ${sel?'selected':''}" data-name="${esc(p.name)}" data-pos="${p.pos}" onclick="toggleScorer(this)">${esc(p.name)}</button>`;
        }).join('')}</div>
      </div>`;
    });
  });
  wrap.innerHTML = html;
  updateScorerCount();
}

function toggleScorer(btn) {
  const name = btn.dataset.name, pos = btn.dataset.pos;
  const idx = tempScorers.findIndex(s => normalise(s.name) === normalise(name));
  if (idx >= 0) { tempScorers.splice(idx,1); btn.classList.remove('selected'); }
  else {
    if (pos === 'FWD' && tempScorers.filter(s=>s.pos==='FWD').length >= MAX_FWD) { showToast(`Max ${MAX_FWD} strikers allowed!`); return; }
    tempScorers.push({name, pos}); btn.classList.add('selected');
  }
  updateScorerCount();
}

function updateScorerCount() {
  const el = document.getElementById('scorerCount');
  if (!el) return;
  const total = tempScorers.length, fwd = tempScorers.filter(s=>s.pos==='FWD').length;
  el.textContent = total === 0 ? 'No scorers selected' : `${total} scorer${total!==1?'s':''} selected (${fwd}/${MAX_FWD} strikers)`;
}

function closePredModal() { document.getElementById('predOverlay').classList.remove('open'); activeMatchId = null; }

function changeScore(team, delta) {
  if (team==='home') { tempHome=Math.max(0,Math.min(20,tempHome+delta)); document.getElementById('spHomeVal').textContent=tempHome; }
  else { tempAway=Math.max(0,Math.min(20,tempAway+delta)); document.getElementById('spAwayVal').textContent=tempAway; }
}

async function savePrediction() {
  const myName = state.currentPlayer ? getPlayerName(state.currentPlayer) : null;
  if (!activeMatchId || !myName) return;
  const match = MATCHES.find(m => m.id === activeMatchId);

  // Double-check lock on save
  if (isMatchLocked(match)) { showToast('Predictions are locked!'); closePredModal(); return; }
  if (tempScorers.filter(s=>s.pos==='FWD').length > MAX_FWD) { showToast('Too many strikers!'); return; }

  const btn = document.querySelector('#predOverlay .save-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Saving...'; }

  try {
    const { error } = await db.from('predictions').upsert({
      player_name: myName,
      match_id: activeMatchId,
      home_score: tempHome,
      away_score: tempAway,
      scorers: tempScorers,
      updated_at: new Date().toISOString()
    }, { onConflict: 'player_name,match_id' });

    if (error) { showToast('Save failed — try again.'); return; }

    // Update local state immediately
    if (!state.predictions[myName]) state.predictions[myName] = {};
    state.predictions[myName][activeMatchId] = { homeScore: tempHome, awayScore: tempAway, scorers: [...tempScorers] };

    closePredModal();
    renderAll();
    showToast('Prediction saved! ✓');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Save prediction'; }
  }
}

document.getElementById('predOverlay').addEventListener('click', e => { if(e.target===document.getElementById('predOverlay')) closePredModal(); });
document.getElementById('authOverlay').addEventListener('click', e => { if(e.target===document.getElementById('authOverlay')) closeAuthModal(); });

// ── RENDER ALL ─────────────────────────────────────────────────
function renderAll() { renderPlayerChips(); renderPhases(); renderMatchList(); renderLeaderboard(); }

// ── TOAST ──────────────────────────────────────────────────────
function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t=document.createElement('div'); t.className='toast'; document.body.appendChild(t); }
  t.textContent=msg; t.classList.add('show');
  clearTimeout(t._timer); t._timer=setTimeout(()=>t.classList.remove('show'), 2500);
}

function esc(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── INIT ───────────────────────────────────────────────────────
loadCurrentPlayer();
loadAllData();
setupRealtime();
// Re-check locks every minute
setInterval(renderMatchList, 60 * 1000);
