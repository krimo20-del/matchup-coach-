// MatchupCoach.gg — full champion rosters per role (for the home picker). Patch 26.11.
window.ROSTERS = {
  top: [
    { g: "Juggernauts", c: ["Aatrox","Darius","Dr. Mundo","Garen","Illaoi","Mordekaiser","Nasus","Sett","Trundle","Urgot","Volibear","Yorick"] },
    { g: "Divers & Skirmishers", c: ["Camille","Fiora","Gragas","Gwen","Irelia","Jax","Kled","Olaf","Pantheon","Renekton","Riven","Tryndamere","Vayne","Warwick","Wukong","Yasuo","Yone"] },
    { g: "Tanks", c: ["Cho'Gath","K'Sante","Malphite","Maokai","Nautilus","Ornn","Poppy","Shen","Sion","Tahm Kench","Zac"] },
    { g: "Mages, Marksmen & Specialists", c: ["Akali","Aurora","Gangplank","Gnar","Heimerdinger","Jayce","Kayle","Kennen","Quinn","Rumble","Singed","Swain","Teemo","Vladimir"] },
    { g: "Newest Arrivals", c: ["Ambessa","Zaahen"] },
    { g: "Off-Meta & Flex Picks", c: ["Akshan","Cassiopeia","Galio","Graves","Karma","Kassadin","Lillia","Lucian","Master Yi","Mel","Neeko","Ryze","Sejuani","Sylas","Ziggs"] }
  ],
  jungle: [
    { g: "Assassins & Divers", c: ["Bel'Veth","Diana","Ekko","Elise","Evelynn","Graves","Kayn","Kha'Zix","Kindred","Lee Sin","Naafiri","Nidalee","Nocturne","Rengar","Shaco","Talon","Viego","Wukong"] },
    { g: "Skirmishers & Fighters", c: ["Briar","Jax","Master Yi","Olaf","Qiyana","Shyvana","Trundle","Udyr","Vi","Xin Zhao"] },
    { g: "Tanks & Vanguards", c: ["Amumu","Hecarim","Jarvan IV","Maokai","Nunu & Willump","Rammus","Rek'Sai","Sejuani","Skarner","Volibear","Warwick","Zac"] },
    { g: "Mages & Specialists", c: ["Brand","Fiddlesticks","Gragas","Ivern","Karthus","Lillia","Morgana","Taliyah","Zyra"] }
  ],
  mid: [
    { g: "Control & Battlemages", c: ["Anivia","Aurelion Sol","Azir","Cassiopeia","Hwei","Lissandra","Malzahar","Orianna","Ryze","Swain","Syndra","Taliyah","Viktor","Vladimir","Xerath","Ziggs"] },
    { g: "Burst & Utility Mages", c: ["Ahri","Annie","Aurora","Brand","Karma","Lux","Mel","Neeko","Twisted Fate","Veigar","Vex","Zoe"] },
    { g: "Assassins", c: ["Akali","Akshan","Diana","Ekko","Fizz","Kassadin","Katarina","LeBlanc","Locke","Naafiri","Qiyana","Sylas","Talon","Zed"] },
    { g: "Fighters & Skirmishers", c: ["Galio","Irelia","Pantheon","Yasuo","Yone"] }
  ],
  bot: [
    { g: "Hypercarries & Crit Marksmen", c: ["Aphelios","Ashe","Caitlyn","Draven","Jhin","Jinx","Kai'Sa","Kog'Maw","Nilah","Samira","Smolder","Tristana","Twitch","Vayne","Zeri"] },
    { g: "Utility & Lane Marksmen", c: ["Corki","Ezreal","Kalista","Lucian","Miss Fortune","Senna","Sivir","Varus","Xayah"] },
    { g: "APC & Flex Bot", c: ["Heimerdinger","Karthus","Seraphine","Swain","Veigar","Ziggs"] }
  ],
  support: [
    { g: "Enchanters", c: ["Janna","Karma","Lulu","Milio","Nami","Renata Glasc","Senna","Seraphine","Sona","Soraka","Yuumi","Zilean"] },
    { g: "Wardens & Tanks", c: ["Alistar","Braum","Galio","Leona","Maokai","Poppy","Rell","Tahm Kench","Taric"] },
    { g: "Catchers & Engage", c: ["Bard","Blitzcrank","Nautilus","Pyke","Rakan","Thresh"] },
    { g: "Mage & Poke Supports", c: ["Brand","Hwei","Lux","Morgana","Neeko","Swain","Vel'Koz","Xerath","Zyra"] }
  ]
};
window.ROLE_META = {
  top: { label: "Top", accent: "#e8b84b", blurb: "Islands, teleport plays, and 1v1 lane kingdoms." },
  jungle: { label: "Jungle", accent: "#3ddc97", blurb: "Pathing, ganks, and objective tempo." },
  mid: { label: "Mid", accent: "#46c6f5", blurb: "Priority, roams, and side-to-side control." },
  bot: { label: "Bot", accent: "#ff8bd0", blurb: "Scaling carries and the 2v2 lane." },
  support: { label: "Support", accent: "#9b8cff", blurb: "Vision, engage, and protecting your carry." }
};
