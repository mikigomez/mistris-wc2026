// Format: { name, pos } where pos = 'GK' | 'DEF' | 'MID' | 'FWD'
// Points: FWD=5, MID=10, GK/DEF=15

const SQUADS = {
  'Mexico': [
    {name:'Guillermo Ochoa',pos:'GK'},{name:'Luis Malagon',pos:'GK'},{name:'Carlos Acevedo',pos:'GK'},
    {name:'Jorge Sanchez',pos:'DEF'},{name:'Kevin Alvarez',pos:'DEF'},{name:'Jesus Gallardo',pos:'DEF'},{name:'Johan Vasquez',pos:'DEF'},{name:'Cesar Montes',pos:'DEF'},{name:'Julian Araujo',pos:'DEF'},
    {name:'Edson Alvarez',pos:'MID'},{name:'Carlos Rodriguez',pos:'MID'},{name:'Orbelin Pineda',pos:'MID'},{name:'Luis Chavez',pos:'MID'},{name:'Efrain Alvarez',pos:'MID'},{name:'Obed Vargas',pos:'MID'},
    {name:'Hirving Lozano',pos:'FWD'},{name:'Roberto Alvarado',pos:'FWD'},{name:'Santiago Gimenez',pos:'FWD'},{name:'Raul Jimenez',pos:'FWD'},{name:'Henry Martin',pos:'FWD'},{name:'Alexis Vega',pos:'FWD'},{name:'Julian Quinones',pos:'FWD'}
  ],
  'South Africa': [
    {name:'Ronwen Williams',pos:'GK'},{name:'Veli Mothwa',pos:'GK'},{name:'Bruce Bvuma',pos:'GK'},
    {name:'Bongani Zungu',pos:'DEF'},{name:'Sifiso Mlungwana',pos:'DEF'},{name:'Aubrey Modiba',pos:'DEF'},{name:'Mothobi Mvala',pos:'DEF'},{name:'Bradley Cross',pos:'DEF'},
    {name:'Teboho Mokoena',pos:'MID'},{name:'Yusuf Maart',pos:'MID'},{name:'Ethan Brooks',pos:'MID'},{name:'Sipho Mbule',pos:'MID'},
    {name:'Themba Zwane',pos:'FWD'},{name:'Percy Tau',pos:'FWD'},{name:'Evidence Makgopa',pos:'FWD'},{name:'Lyle Foster',pos:'FWD'},{name:'Keagan Dolly',pos:'FWD'},{name:'Oswin Appollis',pos:'FWD'},{name:'Lebo Mothiba',pos:'FWD'},{name:'Victor Letsoalo',pos:'FWD'}
  ],
  'South Korea': [
    {name:'Kim Seung-Gyu',pos:'GK'},{name:'Jo Hyeon-woo',pos:'GK'},{name:'Song Bum-keun',pos:'GK'},
    {name:'Kim Min-jae',pos:'DEF'},{name:'Kim Moon-hwan',pos:'DEF'},{name:'Seol Young-woo',pos:'DEF'},{name:'Cho Yu-min',pos:'DEF'},{name:'Lee Tae-seok',pos:'DEF'},{name:'Park Jin-seob',pos:'DEF'},{name:'Kim Tae-hyeon',pos:'DEF'},{name:'Lee Han-beom',pos:'DEF'},{name:'Jens Castrop',pos:'DEF'},
    {name:'Lee Jae-sung',pos:'MID'},{name:'Hwang Hee-chan',pos:'MID'},{name:'Hwang In-beom',pos:'MID'},{name:'Lee Kang-in',pos:'MID'},{name:'Paik Seung-ho',pos:'MID'},{name:'Kim Jin-gyu',pos:'MID'},{name:'Lee Dong-gyeong',pos:'MID'},{name:'Bae Jun-ho',pos:'MID'},{name:'Eom Ji-Sung',pos:'MID'},{name:'Yang Hyun-jun',pos:'MID'},
    {name:'Son Heung-min',pos:'FWD'},{name:'Cho Gue-sung',pos:'FWD'},{name:'Oh Hyeon-gyu',pos:'FWD'}
  ],
  'Czechia': [
    {name:'Tomas Vaclik',pos:'GK'},{name:'Jiri Pavlenka',pos:'GK'},{name:'Ales Mandous',pos:'GK'},
    {name:'Vladimir Coufal',pos:'DEF'},{name:'David Zima',pos:'DEF'},{name:'Jan Boril',pos:'DEF'},{name:'Ladislav Krejci',pos:'DEF'},{name:'Matej Jurasek',pos:'DEF'},
    {name:'Tomas Soucek',pos:'MID'},{name:'Alex Kral',pos:'MID'},{name:'Antonin Barak',pos:'MID'},{name:'Lukas Provod',pos:'MID'},{name:'Ondrej Lingr',pos:'MID'},{name:'Tomas Holes',pos:'MID'},{name:'Vaclav Cerny',pos:'MID'},
    {name:'Patrik Schick',pos:'FWD'},{name:'Adam Hlozek',pos:'FWD'},{name:'Jan Kuchta',pos:'FWD'},{name:'Mojmir Chytil',pos:'FWD'}
  ],
  'Canada': [
    {name:'Maxime Crepeau',pos:'GK'},{name:'Milan Borjan',pos:'GK'},{name:'Dayne St. Clair',pos:'GK'},
    {name:'Kamal Miller',pos:'DEF'},{name:'Alistair Johnston',pos:'DEF'},{name:'Steven Vitoria',pos:'DEF'},{name:'Derek Cornelius',pos:'DEF'},{name:'Sam Adekugbe',pos:'DEF'},{name:'Richie Laryea',pos:'DEF'},
    {name:'Stephen Eustaquio',pos:'MID'},{name:'Jonathan Osorio',pos:'MID'},{name:'Ismael Kone',pos:'MID'},{name:'Samuel Piette',pos:'MID'},{name:'Tajon Buchanan',pos:'MID'},{name:'Alphonso Davies',pos:'MID'},
    {name:'Jonathan David',pos:'FWD'},{name:'Cyle Larin',pos:'FWD'},{name:'Lucas Cavallini',pos:'FWD'},{name:'Theo Bair',pos:'FWD'},{name:'Jacob Shaffelburg',pos:'FWD'}
  ],
  'Bosnia & Herz.': [
    {name:'Nikola Vasilj',pos:'GK'},{name:'Martin Zlomislic',pos:'GK'},{name:'Osman Hadzikic',pos:'GK'},
    {name:'Sead Kolasinac',pos:'DEF'},{name:'Dennis Hadzikadunic',pos:'DEF'},{name:'Amar Dedic',pos:'DEF'},{name:'Nikola Katic',pos:'DEF'},{name:'Tarik Muharemovic',pos:'DEF'},{name:'Nihad Mujakic',pos:'DEF'},{name:'Stjepan Radeljic',pos:'DEF'},{name:'Nidal Celik',pos:'DEF'},
    {name:'Amir Hadziahmetovic',pos:'MID'},{name:'Benjamin Tahirovic',pos:'MID'},{name:'Armin Gigovic',pos:'MID'},{name:'Dzenis Burnic',pos:'MID'},{name:'Ivan Basic',pos:'MID'},{name:'Amar Memic',pos:'MID'},{name:'Ivan Sunjic',pos:'MID'},{name:'Ermin Mahmic',pos:'MID'},
    {name:'Edin Dzeko',pos:'FWD'},{name:'Ermedin Demirovic',pos:'FWD'},{name:'Samed Bazdar',pos:'FWD'},{name:'Haris Tabakovic',pos:'FWD'},{name:'Esmir Bajraktarevic',pos:'FWD'},{name:'Kerim Alajbegovic',pos:'FWD'},{name:'Jovo Lukic',pos:'FWD'}
  ],
  'Qatar': [
    {name:'Meshaal Barsham',pos:'GK'},{name:'Yousef Hassan',pos:'GK'},{name:'Saad Al Sheeb',pos:'GK'},
    {name:'Pedro Miguel',pos:'DEF'},{name:'Tarek Salman',pos:'DEF'},{name:'Bassam Al-Rawi',pos:'DEF'},{name:'Boualem Khoukhi',pos:'DEF'},{name:'Homam Ahmed',pos:'DEF'},{name:'Mohammed Waad',pos:'DEF'},
    {name:'Karim Boudiaf',pos:'MID'},{name:'Abdulaziz Hatem',pos:'MID'},{name:'Salem Al-Hajri',pos:'MID'},{name:'Ahmed Fathel',pos:'MID'},
    {name:'Akram Afif',pos:'FWD'},{name:'Almoez Ali',pos:'FWD'},{name:'Hassan Al-Haydos',pos:'FWD'},{name:'Mohammed Muntari',pos:'FWD'},{name:'Ahmed Alaaeldin',pos:'FWD'},{name:'Ismaeel Mohammad',pos:'FWD'}
  ],
  'Switzerland': [
    {name:'Marvin Keller',pos:'GK'},{name:'Gregor Kobel',pos:'GK'},{name:'Yvon Mvogo',pos:'GK'},
    {name:'Manuel Akanji',pos:'DEF'},{name:'Aurele Amenda',pos:'DEF'},{name:'Eray Comert',pos:'DEF'},{name:'Nico Elvedi',pos:'DEF'},{name:'Luca Jaquez',pos:'DEF'},{name:'Miro Muheim',pos:'DEF'},{name:'Ricardo Rodriguez',pos:'DEF'},{name:'Silvan Widmer',pos:'DEF'},
    {name:'Michel Aebischer',pos:'MID'},{name:'Christian Fassnacht',pos:'MID'},{name:'Remo Freuler',pos:'MID'},{name:'Ardon Jashari',pos:'MID'},{name:'Fabian Rieder',pos:'MID'},{name:'Djibril Sow',pos:'MID'},{name:'Ruben Vargas',pos:'MID'},{name:'Granit Xhaka',pos:'MID'},{name:'Denis Zakaria',pos:'MID'},
    {name:'Zeki Amdouni',pos:'FWD'},{name:'Breel Embolo',pos:'FWD'},{name:'Cedric Itten',pos:'FWD'},{name:'Dan Ndoye',pos:'FWD'},{name:'Noah Okafor',pos:'FWD'}
  ],
  'Brazil': [
    {name:'Alisson',pos:'GK'},{name:'Ederson',pos:'GK'},{name:'Weverton',pos:'GK'},
    {name:'Marquinhos',pos:'DEF'},{name:'Alex Sandro',pos:'DEF'},{name:'Gabriel Magalhaes',pos:'DEF'},{name:'Bremer',pos:'DEF'},{name:'Wesley',pos:'DEF'},{name:'Roger Ibanez',pos:'DEF'},{name:'Douglas Santos',pos:'DEF'},{name:'Leo Pereira',pos:'DEF'},{name:'Danilo',pos:'DEF'},
    {name:'Casemiro',pos:'MID'},{name:'Lucas Paqueta',pos:'MID'},{name:'Bruno Guimaraes',pos:'MID'},{name:'Fabinho',pos:'MID'},{name:'Danilo Santos',pos:'MID'},{name:'Neymar',pos:'MID'},{name:'Raphinha',pos:'MID'},
    {name:'Vinicius Jr',pos:'FWD'},{name:'Gabriel Martinelli',pos:'FWD'},{name:'Matheus Cunha',pos:'FWD'},{name:'Endrick',pos:'FWD'},{name:'Luiz Henrique',pos:'FWD'},{name:'Igor Thiago',pos:'FWD'},{name:'Rayan',pos:'FWD'}
  ],
  'Morocco': [
    {name:'Yassine Bounou',pos:'GK'},{name:'Ahmed Tagnaouti',pos:'GK'},{name:'Munir El Kajoui',pos:'GK'},
    {name:'Achraf Hakimi',pos:'DEF'},{name:'Nayef Aguerd',pos:'DEF'},{name:'Romain Saiss',pos:'DEF'},{name:'Jawad El Yamiq',pos:'DEF'},{name:'Noussair Mazraoui',pos:'DEF'},{name:'Adam Masina',pos:'DEF'},{name:'Yahia Attiyat Allah',pos:'DEF'},
    {name:'Sofyan Amrabat',pos:'MID'},{name:'Azzedine Ounahi',pos:'MID'},{name:'Ilias Chair',pos:'MID'},{name:'Selim Amallah',pos:'MID'},{name:'Abdelhamid Sabiri',pos:'MID'},{name:'Bilal El Khannouss',pos:'MID'},{name:'Hakim Ziyech',pos:'MID'},
    {name:'Youssef En-Nesyri',pos:'FWD'},{name:'Ayoub El Kaabi',pos:'FWD'},{name:'Soufiane Rahimi',pos:'FWD'},{name:'Zakaria Aboukhlal',pos:'FWD'}
  ],
  'Haiti': [
    {name:'Johny Placide',pos:'GK'},{name:'Alexandre Pierre',pos:'GK'},{name:'Josue Duverger',pos:'GK'},
    {name:'Ricardo Ade',pos:'DEF'},{name:'Carlens Arcus',pos:'DEF'},{name:'Jean-Kevin Duverne',pos:'DEF'},{name:'Duke Lacroix',pos:'DEF'},{name:'Wilguens Paugain',pos:'DEF'},{name:'Hannes Delcroix',pos:'DEF'},
    {name:'Leverton Pierre',pos:'MID'},{name:'Danley Jean Jacques',pos:'MID'},{name:'Carl Sainte',pos:'MID'},{name:'Jean-Ricner Bellegarde',pos:'MID'},{name:'Woodensky Pierre',pos:'MID'},{name:'Dominique Simon',pos:'MID'},
    {name:'Duckens Nazon',pos:'FWD'},{name:'Frantzdy Pierrot',pos:'FWD'},{name:'Derrick Etienne Jr',pos:'FWD'},{name:'Wilson Isidor',pos:'FWD'},{name:'Lenny Joseph',pos:'FWD'}
  ],
  'Scotland': [
    {name:'Angus Gunn',pos:'GK'},{name:'Craig Gordon',pos:'GK'},{name:'Liam Kelly',pos:'GK'},
    {name:'Andy Robertson',pos:'DEF'},{name:'Kieran Tierney',pos:'DEF'},{name:'Anthony Ralston',pos:'DEF'},{name:'John Souttar',pos:'DEF'},{name:'Scott McKenna',pos:'DEF'},{name:'Jack Hendry',pos:'DEF'},{name:'Aaron Hickey',pos:'DEF'},{name:'Nathan Patterson',pos:'DEF'},{name:'Grant Hanley',pos:'DEF'},{name:'Dominic Hyam',pos:'DEF'},
    {name:'Scott McTominay',pos:'MID'},{name:'Billy Gilmour',pos:'MID'},{name:'John McGinn',pos:'MID'},{name:'Kenny McLean',pos:'MID'},{name:'Lewis Ferguson',pos:'MID'},{name:'Ryan Christie',pos:'MID'},{name:'Findlay Curtis',pos:'MID'},{name:'Ben Gannon-Doak',pos:'MID'},
    {name:'Lawrence Shankland',pos:'FWD'},{name:'George Hirst',pos:'FWD'},{name:'Che Adams',pos:'FWD'},{name:'Ross Stewart',pos:'FWD'},{name:'Lyndon Dykes',pos:'FWD'}
  ],
  'USA': [
    {name:'Matt Turner',pos:'GK'},{name:'Chris Brady',pos:'GK'},{name:'Matt Freese',pos:'GK'},
    {name:'Sergino Dest',pos:'DEF'},{name:'Chris Richards',pos:'DEF'},{name:'Antonee Robinson',pos:'DEF'},{name:'Auston Trusty',pos:'DEF'},{name:'Miles Robinson',pos:'DEF'},{name:'Tim Ream',pos:'DEF'},{name:'Alex Freeman',pos:'DEF'},{name:'Mark McKenzie',pos:'DEF'},{name:'Joe Scally',pos:'DEF'},
    {name:'Tyler Adams',pos:'MID'},{name:'Weston McKennie',pos:'MID'},{name:'Christian Pulisic',pos:'MID'},{name:'Sebastian Berhalter',pos:'MID'},{name:'Cristian Roldan',pos:'MID'},{name:'Malik Tillman',pos:'MID'},
    {name:'Gio Reyna',pos:'FWD'},{name:'Ricardo Pepi',pos:'FWD'},{name:'Brenden Aaronson',pos:'FWD'},{name:'Max Arfsten',pos:'FWD'},{name:'Haji Wright',pos:'FWD'},{name:'Folarin Balogun',pos:'FWD'},{name:'Tim Weah',pos:'FWD'},{name:'Alex Zendejas',pos:'FWD'}
  ],
  'Paraguay': [
    {name:'Antony Silva',pos:'GK'},{name:'Alfredo Aguilar',pos:'GK'},{name:'Bruno Vald',pos:'GK'},
    {name:'Omar Alderete',pos:'DEF'},{name:'Junior Alonso',pos:'DEF'},{name:'Fabian Balbuena',pos:'DEF'},{name:'Gustavo Gomez',pos:'DEF'},{name:'Robert Rojas',pos:'DEF'},{name:'Santiago Alarcon',pos:'DEF'},
    {name:'Matias Rojas',pos:'MID'},{name:'Andres Cubas',pos:'MID'},{name:'Richard Sanchez',pos:'MID'},{name:'Mathias Villasanti',pos:'MID'},{name:'Diego Gomez',pos:'MID'},
    {name:'Miguel Almiron',pos:'FWD'},{name:'Carlos Gonzalez',pos:'FWD'},{name:'Diego Leon',pos:'FWD'},{name:'Julio Enciso',pos:'FWD'},{name:'Gabriel Avalos',pos:'FWD'}
  ],
  'Australia': [
    {name:'Mat Ryan',pos:'GK'},{name:'Mitch Langerak',pos:'GK'},{name:'Danny Vukovic',pos:'GK'},
    {name:'Harry Souttar',pos:'DEF'},{name:'Milos Degenek',pos:'DEF'},{name:'Nathaniel Atkinson',pos:'DEF'},{name:'Aziz Behich',pos:'DEF'},{name:'Joel King',pos:'DEF'},{name:'Ryan Strain',pos:'DEF'},{name:'Trent Sainsbury',pos:'DEF'},
    {name:'Aaron Mooy',pos:'MID'},{name:'Jackson Irvine',pos:'MID'},{name:'Ajdin Hrustic',pos:'MID'},{name:'Keanu Baccus',pos:'MID'},{name:'Cameron Devlin',pos:'MID'},{name:'Craig Goodwin',pos:'MID'},
    {name:'Mathew Leckie',pos:'FWD'},{name:'Mitchell Duke',pos:'FWD'},{name:'Martin Boyle',pos:'FWD'},{name:'Jamie Maclaren',pos:'FWD'}
  ],
  'Croatia': [
    {name:'Dominik Livakovic',pos:'GK'},{name:'Ivica Ivusic',pos:'GK'},{name:'Nediljko Labrovic',pos:'GK'},
    {name:'Josip Juranovic',pos:'DEF'},{name:'Dejan Lovren',pos:'DEF'},{name:'Josko Gvardiol',pos:'DEF'},{name:'Borna Sosa',pos:'DEF'},{name:'Josip Stanisic',pos:'DEF'},{name:'Martin Erlic',pos:'DEF'},{name:'Borna Barisic',pos:'DEF'},
    {name:'Luka Modric',pos:'MID'},{name:'Mateo Kovacic',pos:'MID'},{name:'Marcelo Brozovic',pos:'MID'},{name:'Mario Pasalic',pos:'MID'},{name:'Nikola Vlasic',pos:'MID'},{name:'Lovro Majer',pos:'MID'},
    {name:'Ivan Perisic',pos:'FWD'},{name:'Marko Livaja',pos:'FWD'},{name:'Andrej Kramaric',pos:'FWD'},{name:'Bruno Petkovic',pos:'FWD'}
  ],
  'Germany': [
    {name:'Manuel Neuer',pos:'GK'},{name:'Oliver Baumann',pos:'GK'},{name:'Alexander Nubel',pos:'GK'},
    {name:'Antonio Rudiger',pos:'DEF'},{name:'Jonathan Tah',pos:'DEF'},{name:'Nico Schlotterbeck',pos:'DEF'},{name:'Nathaniel Brown',pos:'DEF'},{name:'David Raum',pos:'DEF'},{name:'Malick Thiaw',pos:'DEF'},{name:'Waldemar Anton',pos:'DEF'},{name:'Pascal Gross',pos:'DEF'},
    {name:'Joshua Kimmich',pos:'MID'},{name:'Leon Goretzka',pos:'MID'},{name:'Jamal Musiala',pos:'MID'},{name:'Florian Wirtz',pos:'MID'},{name:'Leroy Sane',pos:'MID'},{name:'Aleksandar Pavlovic',pos:'MID'},{name:'Felix Nmecha',pos:'MID'},{name:'Angelo Stiller',pos:'MID'},
    {name:'Kai Havertz',pos:'FWD'},{name:'Denis Undav',pos:'FWD'},{name:'Nick Woltemeade',pos:'FWD'},{name:'Maximilian Beier',pos:'FWD'}
  ],
  "Côte d'Ivoire": [
    {name:'Yahia Fofana',pos:'GK'},{name:'Alban Lafont',pos:'GK'},{name:'Mohamed Kone',pos:'GK'},
    {name:'Ghislain Konan',pos:'DEF'},{name:'Odilon Kossounou',pos:'DEF'},{name:'Wilfried Singo',pos:'DEF'},{name:'Evan Ndicka',pos:'DEF'},{name:'Emmanuel Agbadou',pos:'DEF'},{name:'Ousmane Diomande',pos:'DEF'},
    {name:'Franck Kessie',pos:'MID'},{name:'Jean Michael Seri',pos:'MID'},{name:'Ibrahim Sangare',pos:'MID'},{name:'Seko Fofana',pos:'MID'},{name:'Simon Adingra',pos:'MID'},
    {name:'Nicolas Pepe',pos:'FWD'},{name:'Amad Diallo',pos:'FWD'},{name:'Elye Wahi',pos:'FWD'},{name:'Oumar Diakite',pos:'FWD'},{name:'Evann Guessand',pos:'FWD'},{name:'Ange Yoan-Bonny',pos:'FWD'}
  ],
  'Ecuador': [
    {name:'Hernan Galindez',pos:'GK'},{name:'Alexander Dominguez',pos:'GK'},{name:'Carlos Hurtado',pos:'GK'},
    {name:'Piero Hincapie',pos:'DEF'},{name:'Felix Torres',pos:'DEF'},{name:'Jackson Porozo',pos:'DEF'},{name:'Pervis Estupinan',pos:'DEF'},{name:'William Pacho',pos:'DEF'},{name:'Diego Palacios',pos:'DEF'},{name:'Angelo Preciado',pos:'DEF'},
    {name:'Moises Caicedo',pos:'MID'},{name:'Jeremy Sarmiento',pos:'MID'},{name:'Alan Franco',pos:'MID'},{name:'Jose Cifuentes',pos:'MID'},{name:'Carlos Gruezo',pos:'MID'},{name:'Gonzalo Plata',pos:'MID'},
    {name:'Enner Valencia',pos:'FWD'},{name:'Jordi Caicedo',pos:'FWD'},{name:'Michael Estrada',pos:'FWD'},{name:'Angel Mena',pos:'FWD'}
  ],
  'Curaçao': [
    {name:'Eloy Room',pos:'GK'},{name:'Trevor Doornbusch',pos:'GK'},{name:'Tyrick Bodak',pos:'GK'},
    {name:'Jurien Gaari',pos:'DEF'},{name:'Roshon van Eijma',pos:'DEF'},{name:'Sherel Floranus',pos:'DEF'},{name:'Joshua Brenet',pos:'DEF'},{name:'Shurandy Sambo',pos:'DEF'},{name:'Armando Obispo',pos:'DEF'},{name:'Riechedly Bazoer',pos:'DEF'},
    {name:'Leandro Bacuna',pos:'MID'},{name:'Juninho Bacuna',pos:'MID'},{name:'Godfried Roemeratoe',pos:'MID'},{name:'Livano Comenencia',pos:'MID'},{name:'Tyrese Noslin',pos:'MID'},
    {name:'Kenji Gorre',pos:'FWD'},{name:'Brandley Kuwas',pos:'FWD'},{name:'Gervane Kastaneer',pos:'FWD'},{name:'Jurgen Locadia',pos:'FWD'},{name:'Sontje Hansen',pos:'FWD'},{name:'Tahith Chong',pos:'FWD'}
  ],
  'Netherlands': [
    {name:'Mark Flekken',pos:'GK'},{name:'Robin Roefs',pos:'GK'},{name:'Bart Verbruggen',pos:'GK'},
    {name:'Nathan Ake',pos:'DEF'},{name:'Denzel Dumfries',pos:'DEF'},{name:'Jorrel Hato',pos:'DEF'},{name:'Jurrien Timber',pos:'DEF'},{name:'Jan Paul van Hecke',pos:'DEF'},{name:'Virgil van Dijk',pos:'DEF'},{name:'Micky van de Ven',pos:'DEF'},
    {name:'Ryan Gravenberch',pos:'MID'},{name:'Frenkie de Jong',pos:'MID'},{name:'Teun Koopmeijners',pos:'MID'},{name:'Tijjani Reijnders',pos:'MID'},{name:'Maarten de Roon',pos:'MID'},{name:'Guus Til',pos:'MID'},{name:'Quinten Timber',pos:'MID'},{name:'Mats Wieffer',pos:'MID'},
    {name:'Brian Brobbey',pos:'FWD'},{name:'Memphis Depay',pos:'FWD'},{name:'Cody Gakpo',pos:'FWD'},{name:'Donyell Malen',pos:'FWD'},{name:'Noa Lang',pos:'FWD'},{name:'Wout Weghorst',pos:'FWD'},{name:'Crysencio Summerville',pos:'FWD'}
  ],
  'Japan': [
    {name:'Zion Suzuki',pos:'GK'},{name:'Keisuke Osako',pos:'GK'},{name:'Tomoki Hayakawa',pos:'GK'},
    {name:'Yuto Nagatomo',pos:'DEF'},{name:'Takehiro Tomiyasu',pos:'DEF'},{name:'Ko Itakura',pos:'DEF'},{name:'Shogo Taniguchi',pos:'DEF'},{name:'Yukinari Sugawara',pos:'DEF'},{name:'Ayumu Seko',pos:'DEF'},{name:'Tsuyoshi Watanabe',pos:'DEF'},
    {name:'Wataru Endo',pos:'MID'},{name:'Junya Ito',pos:'MID'},{name:'Ritsu Doan',pos:'MID'},{name:'Daichi Kamada',pos:'MID'},{name:'Takefusa Kubo',pos:'MID'},{name:'Ao Tanaka',pos:'MID'},{name:'Keito Nakamura',pos:'MID'},
    {name:'Ayase Ueda',pos:'FWD'},{name:'Daizen Maeda',pos:'FWD'},{name:'Koki Ogawa',pos:'FWD'},{name:'Yuito Suzuki',pos:'FWD'},{name:'Keisuke Goto',pos:'FWD'}
  ],
  'Belgium': [
    {name:'Thibaut Courtois',pos:'GK'},{name:'Senne Lammens',pos:'GK'},{name:'Mike Penders',pos:'GK'},
    {name:'Thomas Meunier',pos:'DEF'},{name:'Timothy Castagne',pos:'DEF'},{name:'Arthur Theate',pos:'DEF'},{name:'Zeno Debast',pos:'DEF'},{name:'Maxim De Cuyper',pos:'DEF'},{name:'Brandon Mechele',pos:'DEF'},{name:'Koni De Winter',pos:'DEF'},
    {name:'Kevin De Bruyne',pos:'MID'},{name:'Youri Tielemans',pos:'MID'},{name:'Amadou Onana',pos:'MID'},{name:'Hans Vanaken',pos:'MID'},{name:'Axel Witsel',pos:'MID'},{name:'Leandro Trossard',pos:'MID'},{name:'Jeremy Doku',pos:'MID'},
    {name:'Romelu Lukaku',pos:'FWD'},{name:'Lois Openda',pos:'FWD'},{name:'Dries Mertens',pos:'FWD'},{name:'Johan Bakayoko',pos:'FWD'},{name:'Charles De Ketelaere',pos:'FWD'}
  ],
  'Tunisia': [
    {name:'Aymen Dahmen',pos:'GK'},{name:'Sabri Ben Hessen',pos:'GK'},{name:'Mouhib Chamakh',pos:'GK'},
    {name:'Montassar Talbi',pos:'DEF'},{name:'Dylan Bronn',pos:'DEF'},{name:'Ali Abdi',pos:'DEF'},{name:'Yan Valery',pos:'DEF'},{name:'Omar Rekik',pos:'DEF'},{name:'Adem Arous',pos:'DEF'},
    {name:'Ellyes Shkiri',pos:'MID'},{name:'Hannibal Mejbri',pos:'MID'},{name:'Anis Ben Slimane',pos:'MID'},{name:'Ismael Gharbi',pos:'MID'},{name:'Rani Khedira',pos:'MID'},
    {name:'Elias Achouri',pos:'FWD'},{name:'Firas Chaouat',pos:'FWD'},{name:'Hazem Mastouri',pos:'FWD'},{name:'Elias Saad',pos:'FWD'},{name:'Rayan Elloumi',pos:'FWD'}
  ],
  'Iran': [
    {name:'Alireza Beiranvand',pos:'GK'},{name:'Hossein Hosseini',pos:'GK'},{name:'Payam Niazmand',pos:'GK'},
    {name:'Sadegh Moharrami',pos:'DEF'},{name:'Majid Hosseini',pos:'DEF'},{name:'Shoja Khalilzadeh',pos:'DEF'},{name:'Milad Mohammadi',pos:'DEF'},{name:'Abolfazl Jalali',pos:'DEF'},
    {name:'Ali Karimi',pos:'MID'},{name:'Saeid Ezatolahi',pos:'MID'},{name:'Ahmad Noorollahi',pos:'MID'},{name:'Mehdi Torabi',pos:'MID'},{name:'Alireza Jahanbakhsh',pos:'MID'},{name:'Saman Ghoddos',pos:'MID'},
    {name:'Sardar Azmoun',pos:'FWD'},{name:'Karim Ansarifard',pos:'FWD'},{name:'Mehdi Taremi',pos:'FWD'},{name:'Ali Gholizadeh',pos:'FWD'},{name:'Allahyar Sayyadmanesh',pos:'FWD'}
  ],
  'New Zealand': [
    {name:'Oliver Sail',pos:'GK'},{name:'Stefan Marinovic',pos:'GK'},{name:'Michael Woud',pos:'GK'},
    {name:'Nando Pijnaker',pos:'DEF'},{name:'Winston Reid',pos:'DEF'},{name:'Liberato Cacace',pos:'DEF'},{name:'Michael Boxall',pos:'DEF'},{name:'Tim Payne',pos:'DEF'},{name:'Dane Ingham',pos:'DEF'},
    {name:'Joe Bell',pos:'MID'},{name:'Clayton Lewis',pos:'MID'},{name:'Callum McCowatt',pos:'MID'},{name:'Ryan Thomas',pos:'MID'},{name:'Matthew Garbett',pos:'MID'},
    {name:'Chris Wood',pos:'FWD'},{name:'Kosta Barbarouses',pos:'FWD'},{name:'Liam Millar',pos:'FWD'},{name:'Ben Old',pos:'FWD'}
  ],
  'Egypt': [
    {name:'Mohamed El-Shenawy',pos:'GK'},{name:'Ahmed El-Shenawy',pos:'GK'},{name:'Mahmoud Gad',pos:'GK'},
    {name:'Ahmed Hegazy',pos:'DEF'},{name:'Omar Kamal',pos:'DEF'},{name:'Mohamed Abdelmonem',pos:'DEF'},{name:'Mahmoud Hamdi',pos:'DEF'},{name:'Akram Tawfik',pos:'DEF'},{name:'Mohamed Hany',pos:'DEF'},
    {name:'Emam Ashour',pos:'MID'},{name:'Ibrahim Adel',pos:'MID'},{name:'Zizo',pos:'MID'},{name:'Mahmoud El Wenty',pos:'MID'},{name:'Taher Mohamed',pos:'MID'},{name:'Hamdi Fathy',pos:'MID'},
    {name:'Mohamed Salah',pos:'FWD'},{name:'Trezeguet',pos:'FWD'},{name:'Mostafa Mohamed',pos:'FWD'},{name:'Omar Marmoush',pos:'FWD'},{name:'Ahmed Sayed Zizo',pos:'FWD'}
  ],
  'Spain': [
    {name:'David Raya',pos:'GK'},{name:'Unai Simon',pos:'GK'},{name:'Alex Remiro',pos:'GK'},
    {name:'Dani Carvajal',pos:'DEF'},{name:'Pau Cubarsi',pos:'DEF'},{name:'Robin Le Normand',pos:'DEF'},{name:'Aymeric Laporte',pos:'DEF'},{name:'Alejandro Grimaldo',pos:'DEF'},{name:'Marc Cucurella',pos:'DEF'},{name:'David Garcia',pos:'DEF'},
    {name:'Pedri',pos:'MID'},{name:'Rodri',pos:'MID'},{name:'Fabian Ruiz',pos:'MID'},{name:'Mikel Merino',pos:'MID'},{name:'Dani Olmo',pos:'MID'},{name:'Gavi',pos:'MID'},{name:'Fermin Lopez',pos:'MID'},{name:'Martin Zubimendi',pos:'MID'},
    {name:'Lamine Yamal',pos:'FWD'},{name:'Nico Williams',pos:'FWD'},{name:'Alvaro Morata',pos:'FWD'},{name:'Mikel Oyarzabal',pos:'FWD'},{name:'Ayoze Perez',pos:'FWD'},{name:'Joselu',pos:'FWD'}
  ],
  'Cape Verde': [
    {name:'Vozinha',pos:'GK'},{name:'Kenny Rocha',pos:'GK'},{name:'Carlos Rodrigues',pos:'GK'},
    {name:'Dylan Tavares',pos:'DEF'},{name:'Stopira',pos:'DEF'},{name:'Steven Fortes',pos:'DEF'},{name:'Fernando Varela',pos:'DEF'},{name:'Jeffrey Fortes',pos:'DEF'},{name:'Elvis',pos:'DEF'},
    {name:'Kevin Pina',pos:'MID'},{name:'Claudio Fernandes',pos:'MID'},{name:'Nando',pos:'MID'},{name:'Lisandro Semedo',pos:'MID'},{name:'Willy Semedo',pos:'MID'},
    {name:'Ryan Mendes',pos:'FWD'},{name:'Bebeto',pos:'FWD'},{name:'Garry Rodrigues',pos:'FWD'},{name:'Julio Tavares',pos:'FWD'},{name:'Gilson Benchimol',pos:'FWD'},{name:'Denis Benchimol',pos:'FWD'}
  ],
  'Saudi Arabia': [
    {name:'Mohammed Al-Owais',pos:'GK'},{name:'Nawaf Al-Aqidi',pos:'GK'},{name:'Yasser Al-Mosailem',pos:'GK'},
    {name:'Saud Abdulhamid',pos:'DEF'},{name:'Mohammed Al-Burayk',pos:'DEF'},{name:'Ali Al-Bulayhi',pos:'DEF'},{name:'Abdulelah Al-Amri',pos:'DEF'},{name:'Hassan Tambakti',pos:'DEF'},{name:'Sultan Al-Ghannam',pos:'DEF'},
    {name:'Salman Al-Faraj',pos:'MID'},{name:'Mohammed Kanno',pos:'MID'},{name:'Nasser Al-Dawsari',pos:'MID'},{name:'Abdulrahman Al-Aboud',pos:'MID'},{name:'Salem Al-Dawsari',pos:'MID'},
    {name:'Feras Al-Brikan',pos:'FWD'},{name:'Abdullah Al-Hamdan',pos:'FWD'},{name:'Fahad Al-Muwallad',pos:'FWD'},{name:'Haitham Asiri',pos:'FWD'}
  ],
  'Uruguay': [
    {name:'Fernando Muslera',pos:'GK'},{name:'Sebastian Sosa',pos:'GK'},{name:'Rodrigo Munoz',pos:'GK'},
    {name:'Ronald Araujo',pos:'DEF'},{name:'Jose Maria Gimenez',pos:'DEF'},{name:'Sebastian Coates',pos:'DEF'},{name:'Mathias Olivera',pos:'DEF'},{name:'Guillermo Varela',pos:'DEF'},{name:'Nicolas Marichal',pos:'DEF'},{name:'Lucas Olaza',pos:'DEF'},
    {name:'Rodrigo Bentancur',pos:'MID'},{name:'Lucas Torreira',pos:'MID'},{name:'Federico Valverde',pos:'MID'},{name:'Matias Vecino',pos:'MID'},{name:'Giorgian De Arrascaeta',pos:'MID'},{name:'Nicolas De La Cruz',pos:'MID'},{name:'Manuel Ugarte',pos:'MID'},
    {name:'Darwin Nunez',pos:'FWD'},{name:'Luis Suarez',pos:'FWD'},{name:'Edinson Cavani',pos:'FWD'}
  ],
  'France': [
    {name:'Mike Maignan',pos:'GK'},{name:'Alphonse Areola',pos:'GK'},{name:'Alban Lafont',pos:'GK'},
    {name:'Lucas Hernandez',pos:'DEF'},{name:'Theo Hernandez',pos:'DEF'},{name:'Dayot Upamecano',pos:'DEF'},{name:'Jules Kounde',pos:'DEF'},{name:'Benjamin Pavard',pos:'DEF'},{name:'Ibrahima Konate',pos:'DEF'},{name:'William Saliba',pos:'DEF'},
    {name:'Eduardo Camavinga',pos:'MID'},{name:'Aurelien Tchouameni',pos:'MID'},{name:'Adrien Rabiot',pos:'MID'},{name:'Antoine Griezmann',pos:'MID'},{name:'Kingsley Coman',pos:'MID'},{name:'Ousmane Dembele',pos:'MID'},
    {name:'Kylian Mbappe',pos:'FWD'},{name:'Olivier Giroud',pos:'FWD'},{name:'Marcus Thuram',pos:'FWD'},{name:'Christopher Nkunku',pos:'FWD'}
  ],
  'Senegal': [
    {name:'Edouard Mendy',pos:'GK'},{name:'Seny Dieng',pos:'GK'},{name:'Alfred Gomis',pos:'GK'},
    {name:'Kalidou Koulibaly',pos:'DEF'},{name:'Abdou Diallo',pos:'DEF'},{name:'Ismail Jakobs',pos:'DEF'},{name:'Formose Mendy',pos:'DEF'},{name:'Pape Abou Cisse',pos:'DEF'},{name:'Moussa Niakhate',pos:'DEF'},
    {name:'Idrissa Gueye',pos:'MID'},{name:'Pape Matar Sarr',pos:'MID'},{name:'Nampalys Mendy',pos:'MID'},{name:'Cheikhou Kouyate',pos:'MID'},{name:'Pathe Ciss',pos:'MID'},
    {name:'Ismaila Sarr',pos:'FWD'},{name:'Sadio Mane',pos:'FWD'},{name:'Boulaye Dia',pos:'FWD'},{name:'Nicolas Jackson',pos:'FWD'},{name:'Habib Diallo',pos:'FWD'},{name:'Iliman Ndiaye',pos:'FWD'}
  ],
  'Iraq': [
    {name:'Jalal Hasan',pos:'GK'},{name:'Dhurgham Ismail',pos:'GK'},{name:'Alaa Abbas',pos:'GK'},
    {name:'Ali Adnan',pos:'DEF'},{name:'Rebin Sulaka',pos:'DEF'},{name:'Saad Natiq',pos:'DEF'},{name:'Amjed Attwan',pos:'DEF'},{name:'Zaid Tahseen',pos:'DEF'},
    {name:'Ahmed Ibrahim',pos:'MID'},{name:'Bashar Resan',pos:'MID'},{name:'Alaa Al Saedy',pos:'MID'},{name:'Hussein Ali',pos:'MID'},{name:'Ameen Mohammed',pos:'MID'},{name:'Aws Younis',pos:'MID'},
    {name:'Aymen Hussein',pos:'FWD'},{name:'Mohanad Ali',pos:'FWD'},{name:'Ibrahim Bayesh',pos:'FWD'},{name:'Mohannad Abdulraheem',pos:'FWD'}
  ],
  'Norway': [
    {name:'Orjan Nyland',pos:'GK'},{name:'Jorgen Strand Larsen',pos:'GK'},{name:'Rorke Svensson',pos:'GK'},
    {name:'Kristoffer Ajer',pos:'DEF'},{name:'Andreas Hanche-Olsen',pos:'DEF'},{name:'Leo Skiri Ostigard',pos:'DEF'},{name:'Stefan Strandberg',pos:'DEF'},{name:'Jonas Svensson',pos:'DEF'},{name:'Birger Meling',pos:'DEF'},
    {name:'Martin Odegaard',pos:'MID'},{name:'Sander Berge',pos:'MID'},{name:'Morten Thorsby',pos:'MID'},{name:'Fredrik Aursnes',pos:'MID'},{name:'Kristian Thorstvedt',pos:'MID'},
    {name:'Erling Haaland',pos:'FWD'},{name:'Alexander Sorloth',pos:'FWD'},{name:'Antonio Nusa',pos:'FWD'},{name:'Ola Solbakken',pos:'FWD'},{name:'Jens Petter Hauge',pos:'FWD'}
  ],
  'Argentina': [
    {name:'Emiliano Martinez',pos:'GK'},{name:'Franco Armani',pos:'GK'},{name:'Geronimo Rulli',pos:'GK'},
    {name:'Nahuel Molina',pos:'DEF'},{name:'Gonzalo Montiel',pos:'DEF'},{name:'Cristian Romero',pos:'DEF'},{name:'Lisandro Martinez',pos:'DEF'},{name:'German Pezzella',pos:'DEF'},{name:'Nicolas Tagliafico',pos:'DEF'},{name:'Marcos Acuna',pos:'DEF'},{name:'Nicolas Otamendi',pos:'DEF'},
    {name:'Leandro Paredes',pos:'MID'},{name:'Rodrigo De Paul',pos:'MID'},{name:'Enzo Fernandez',pos:'MID'},{name:'Alexis Mac Allister',pos:'MID'},{name:'Giovanni Lo Celso',pos:'MID'},{name:'Thiago Almada',pos:'MID'},
    {name:'Lionel Messi',pos:'FWD'},{name:'Angel Di Maria',pos:'FWD'},{name:'Nicolas Gonzalez',pos:'FWD'},{name:'Julian Alvarez',pos:'FWD'},{name:'Lautaro Martinez',pos:'FWD'},{name:'Paulo Dybala',pos:'FWD'},{name:'Alejandro Garnacho',pos:'FWD'},{name:'Valentin Castellanos',pos:'FWD'}
  ],
  'Algeria': [
    {name:"Rais M'Bolhi",pos:'GK'},{name:'Alexandre Oukidja',pos:'GK'},{name:'Mandrea Benali',pos:'GK'},
    {name:'Ramy Bensebaini',pos:'DEF'},{name:'Aissa Mandi',pos:'DEF'},{name:'Djamel Benlamri',pos:'DEF'},{name:'Youcef Atal',pos:'DEF'},{name:'Mehdi Tahrat',pos:'DEF'},
    {name:'Hicham Boudaoui',pos:'MID'},{name:'Nabil Bentaleb',pos:'MID'},{name:'Sofiane Feghouli',pos:'MID'},{name:'Houssem Aouar',pos:'MID'},{name:'Said Benrahma',pos:'MID'},{name:'Zinedine Ferhat',pos:'MID'},
    {name:'Andy Delort',pos:'FWD'},{name:'Islam Slimani',pos:'FWD'},{name:'Riyad Mahrez',pos:'FWD'},{name:'Youcef Belaili',pos:'FWD'},{name:'Mohamed Amine Amoura',pos:'FWD'}
  ],
  'Austria': [
    {name:'Patrick Pentz',pos:'GK'},{name:'Alexander Schlager',pos:'GK'},{name:'Florian Wiegele',pos:'GK'},
    {name:'David Alaba',pos:'DEF'},{name:'Kevin Danso',pos:'DEF'},{name:'Philipp Lienhart',pos:'DEF'},{name:'Stefan Posch',pos:'DEF'},{name:'Phillipp Mwene',pos:'DEF'},{name:'Marco Friedl',pos:'DEF'},{name:'Michael Svoboda',pos:'DEF'},
    {name:'Konrad Laimer',pos:'MID'},{name:'Marcel Sabitzer',pos:'MID'},{name:'Nicolas Seiwald',pos:'MID'},{name:'Xaver Schlager',pos:'MID'},{name:'Florian Grillitsch',pos:'MID'},{name:'Christoph Baumgartner',pos:'MID'},{name:'Romano Schmid',pos:'MID'},
    {name:'Marko Arnautovic',pos:'FWD'},{name:'Michael Gregoritsch',pos:'FWD'},{name:'Patrick Wimmer',pos:'FWD'},{name:'Andreas Weimann',pos:'FWD'}
  ],
  'Jordan': [
    {name:'Amer Shafi',pos:'GK'},{name:'Muntasir Al Shalbi',pos:'GK'},{name:'Ibrahim Awad',pos:'GK'},
    {name:'Mohammad Abu Hasheesh',pos:'DEF'},{name:'Yazan Alnaimat',pos:'DEF'},{name:'Baha Faisal',pos:'DEF'},{name:'Ahmad Al-Sarori',pos:'DEF'},{name:'Hasan Abdel-Fattah',pos:'DEF'},
    {name:'Nour Al-Rawabdeh',pos:'MID'},{name:'Mahmoud Almardi',pos:'MID'},{name:'Yazan Al-Arabiat',pos:'MID'},{name:'Abdallah Nasib',pos:'MID'},{name:'Omar Al-Aqarbeh',pos:'MID'},
    {name:'Musa Al Taamari',pos:'FWD'},{name:'Mousa Al-Tamari',pos:'FWD'},{name:'Ali Olwan',pos:'FWD'},{name:'Ahmed Abu Laila',pos:'FWD'},{name:'Hamza Al-Dardour',pos:'FWD'}
  ],
  'Portugal': [
    {name:'Rui Patricio',pos:'GK'},{name:'Diogo Costa',pos:'GK'},{name:'Jose Sa',pos:'GK'},
    {name:'Joao Cancelo',pos:'DEF'},{name:'Ruben Dias',pos:'DEF'},{name:'Jose Fonte',pos:'DEF'},{name:'Nuno Mendes',pos:'DEF'},{name:'Diogo Dalot',pos:'DEF'},{name:'Goncalo Inacio',pos:'DEF'},
    {name:'Joao Palhinha',pos:'MID'},{name:'Bernardo Silva',pos:'MID'},{name:'Bruno Fernandes',pos:'MID'},{name:'Ruben Neves',pos:'MID'},{name:'Vitinha',pos:'MID'},{name:'Pedro Neto',pos:'MID'},
    {name:'Cristiano Ronaldo',pos:'FWD'},{name:'Joao Felix',pos:'FWD'},{name:'Rafael Leao',pos:'FWD'},{name:'Diogo Jota',pos:'FWD'},{name:'Goncalo Ramos',pos:'FWD'}
  ],
  'DR Congo': [
    {name:'Joel Kiassumbua',pos:'GK'},{name:'Ley Matampi',pos:'GK'},{name:'Vimba Kibambe',pos:'GK'},
    {name:'Christian Luyindama',pos:'DEF'},{name:'Arthur Masuaku',pos:'DEF'},{name:'Chancel Mbemba',pos:'DEF'},{name:'Marcel Tisserand',pos:'DEF'},{name:'Jordan Ikoko',pos:'DEF'},
    {name:'Paul-Jose Mpoku',pos:'MID'},{name:'Chadrac Akolo',pos:'MID'},{name:'Theo Bongonda',pos:'MID'},{name:'Samuel Moutoussamy',pos:'MID'},{name:'Samy Loboteka',pos:'MID'},
    {name:'Yoane Wissa',pos:'FWD'},{name:'Silas Wissa',pos:'FWD'},{name:'Cedric Bakambu',pos:'FWD'},{name:'Dieumerci Mbokani',pos:'FWD'},{name:'Mama Balde',pos:'FWD'}
  ],
  'Uzbekistan': [
    {name:'Eldorbek Smatov',pos:'GK'},{name:'Oybek Mirzayev',pos:'GK'},{name:'Shohruh Qodirov',pos:'GK'},
    {name:'Bobur Abdixoliqov',pos:'DEF'},{name:'Jasur Yakhshiboev',pos:'DEF'},{name:'Azizbek Turgunboev',pos:'DEF'},{name:'Otabek Shukurov',pos:'DEF'},{name:'Khojiakbar Alijonov',pos:'DEF'},
    {name:'Lochinbek Tursunov',pos:'MID'},{name:'Ruslan Nishonov',pos:'MID'},{name:'Farrukh Tashkentov',pos:'MID'},{name:'Dostonbek Khamdamov',pos:'MID'},{name:'Jaloliddin Masharipov',pos:'MID'},{name:'Abbosbek Fayzullaev',pos:'MID'},
    {name:'Eldor Shomurodov',pos:'FWD'},{name:'Nodirbek Abdusalomov',pos:'FWD'},{name:'Sherzod Mamurov',pos:'FWD'},{name:'Sanjar Tursunov',pos:'FWD'}
  ],
  'Colombia': [
    {name:'Camilo Vargas',pos:'GK'},{name:'David Ospina',pos:'GK'},{name:'Alvaro Montero',pos:'GK'},
    {name:'Davinson Sanchez',pos:'DEF'},{name:'Daniel Munoz',pos:'DEF'},{name:'Jhon Lucumi',pos:'DEF'},{name:'Carlos Cuesta',pos:'DEF'},{name:'Johan Mojica',pos:'DEF'},{name:'Cristian Borja',pos:'DEF'},
    {name:'Wilmar Barrios',pos:'MID'},{name:'Jefferson Lerma',pos:'MID'},{name:'Matheus Uribe',pos:'MID'},{name:'Juan Cuadrado',pos:'MID'},{name:'James Rodriguez',pos:'MID'},{name:'Jhon Arias',pos:'MID'},
    {name:'Luis Diaz',pos:'FWD'},{name:'Cucho Hernandez',pos:'FWD'},{name:'Rafael Santos Borre',pos:'FWD'},{name:'Borja Gomez',pos:'FWD'},{name:'Falcao',pos:'FWD'}
  ],
  'England': [
    {name:'Jordan Pickford',pos:'GK'},{name:'Nick Pope',pos:'GK'},{name:'Aaron Ramsdale',pos:'GK'},
    {name:'Kyle Walker',pos:'DEF'},{name:'Trent Alexander-Arnold',pos:'DEF'},{name:'Harry Maguire',pos:'DEF'},{name:'John Stones',pos:'DEF'},{name:'Luke Shaw',pos:'DEF'},{name:'Kieran Trippier',pos:'DEF'},{name:'Marc Guehi',pos:'DEF'},{name:'Ben White',pos:'DEF'},
    {name:'Declan Rice',pos:'MID'},{name:'Jude Bellingham',pos:'MID'},{name:'Phil Foden',pos:'MID'},{name:'Mason Mount',pos:'MID'},{name:'Bukayo Saka',pos:'MID'},{name:'Cole Palmer',pos:'MID'},{name:'Jack Grealish',pos:'MID'},
    {name:'Harry Kane',pos:'FWD'},{name:'Marcus Rashford',pos:'FWD'},{name:'Ivan Toney',pos:'FWD'},{name:'Ollie Watkins',pos:'FWD'},{name:'Jarrod Bowen',pos:'FWD'}
  ],
  'Ghana': [
    {name:'Lawrence Ati-Zigi',pos:'GK'},{name:'Richard Ofori',pos:'GK'},{name:'Ibrahim Danlad',pos:'GK'},
    {name:'Daniel Amartey',pos:'DEF'},{name:'Alexander Djiku',pos:'DEF'},{name:'Abdul Mumin',pos:'DEF'},{name:'Gideon Mensah',pos:'DEF'},{name:'Tariq Lamptey',pos:'DEF'},{name:'Baba Rahman',pos:'DEF'},
    {name:'Thomas Partey',pos:'MID'},{name:'Mohammed Kudus',pos:'MID'},{name:'Salis Abdul Samed',pos:'MID'},{name:'Daniel Kofi Kyereh',pos:'MID'},{name:'Kamaldeen Sulemana',pos:'MID'},
    {name:'Andre Ayew',pos:'FWD'},{name:'Jordan Ayew',pos:'FWD'},{name:'Osman Bukari',pos:'FWD'},{name:'Antoine Semenyo',pos:'FWD'},{name:'Felix Afena-Gyan',pos:'FWD'},{name:'Abdul Fatawu',pos:'FWD'}
  ],
  'Panama': [
    {name:'Luis Mejia',pos:'GK'},{name:'Orlando Mosquera',pos:'GK'},{name:'Erick Davis',pos:'GK'},
    {name:'Andres Andrade',pos:'DEF'},{name:'Harold Cummings',pos:'DEF'},{name:'Fidel Escobar',pos:'DEF'},{name:'Cesar Blackman',pos:'DEF'},{name:'Michael Murillo',pos:'DEF'},
    {name:'Adalberto Carrasquilla',pos:'MID'},{name:'Cristian Martinez',pos:'MID'},{name:'Edgar Barcenas',pos:'MID'},{name:'Alberto Quintero',pos:'MID'},{name:'Ivan Anderson',pos:'MID'},
    {name:'Ismael Diaz',pos:'FWD'},{name:'Jose Fajardo',pos:'FWD'},{name:'Cecilio Waterman',pos:'FWD'},{name:'Gabriel Torres',pos:'FWD'},{name:'Rolando Blackburn',pos:'FWD'}
  ],
  'TBD': []
};

const POS_PTS  = { GK: 15, DEF: 15, MID: 10, FWD: 5 };
const POS_LABEL = { GK: 'Goalkeeper', DEF: 'Defender', MID: 'Midfielder', FWD: 'Striker' };
