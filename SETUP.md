# WC2026 Prediction Game — Setup Guide

Your website is fully built. Follow these steps to get it live.
Total time: ~30–45 minutes. No coding required.

---

## STEP 1 — Get your live results API key (free tier available)

1. Go to https://dashboard.api-football.com/register
2. Create a free account (gives you 100 requests/day — enough for the tournament)
3. After login, go to **Dashboard → API Key** and copy your key
4. Open the file `app.js` in a text editor
5. Find line 9: `const API_KEY = 'YOUR_API_KEY';`
6. Replace `YOUR_API_KEY` with the key you copied (keep the quotes)
7. Save the file

> If you want unlimited requests (~$10/month), upgrade to the Basic plan on the same site.

---

## STEP 2 — Put the files on GitHub

1. Go to https://github.com and create a free account if you don't have one
2. Click the **+** icon → **New repository**
3. Name it `wc2026` (or anything you like), make it **Public**, click **Create**
4. Click **uploading an existing file**
5. Drag and drop ALL 4 files: `index.html`, `style.css`, `data.js`, `app.js`
6. Click **Commit changes**

---

## STEP 3 — Deploy to Vercel (free, gives you a URL)

1. Go to https://vercel.com and sign up with your GitHub account
2. Click **Add New Project**
3. Find your `wc2026` repository and click **Import**
4. Leave all settings as default, click **Deploy**
5. Wait ~30 seconds — Vercel gives you a URL like: `wc2026.vercel.app`

**That's your website! Share it with your friends.**

---

## HOW IT WORKS

- Friends open the URL on their phone
- They enter their name and start predicting matches
- The site auto-fetches live results from the API every 3 minutes
- Points update automatically — no admin needed
- Predictions are saved in each person's browser (localStorage)

---

## SCORING

| Points | What you need |
|--------|--------------|
| 🏆 10 pts | Exact correct score (e.g. 2-1) |
| ✅ 5 pts  | Correct winner or draw |
| ⚽ 8 pts  | Correct goalscorer |

Maximum 18 points per match.

---

## SHARING DATA ACROSS DEVICES (optional upgrade)

Currently each player's predictions are saved in their own browser.
If you want predictions shared across devices (so you can see everyone's picks
from your phone), you'll need to add Supabase as a database backend.
Ask Claude to "add Supabase to the WC2026 app" and it will generate the extra code.

---

## NEED HELP?

Share this guide with Claude and ask for help with any step!
