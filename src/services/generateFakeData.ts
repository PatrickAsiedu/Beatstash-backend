const trapRapSongTitles = [
  "Flexin' On Em",
  "Stacks On Deck",
  "Drip Too Hard",
  "Hustle & Flow",
  "Trap Life Chronicles",
  "Money Moves",
  "Gangsta Paradise",
  "Sippin' Lean",
  "Ride or Die",
  "Grindin' All Day",
  "Trap Queen Anthem",
  "Cashing Out",
  "Rollin' Deep",
  "Boss Status",
  "Trapstar Lifestyle",
  "Litty Committee",
  "Thug Life Ballad",
  "No Sleep Till Success",
  "Benjamins & Bands",
  "Savage Mode",
  "Cash Rules Everything",
  "Trap Talk",
  "Ghetto Fabulous",
  "Trap House Symphony",
  "Big Baller Anthem",
  "Makin' Moves",
  "Stuntin' On Em",
  "Hood Rich Chronicles",
  "Gang Signs",
  "Paper Chasin'",
  "Racks On Racks",
  "Trappin' Ain't Dead",
  "Money Power Respect",
  "Hustle Hard",
  "Street Dreams",
  "Real Recognize Real",
  "Thug Passion",
  "Trapstar Anthem",
  "Ride Wit Me",
  "Stackin' Paper",
  "Straight Outta Compton",
  "Gangsta Lean",
  "Dirty Money",
  "Grind Mode",
  "Trap God Chronicles",
  "Ballin' Like A Boss",
  "No Limit Soldier",
  "Gangsta Paradise",
  "Thug Life Chronicles",
  "Money Talks",
  "Trapstar Dreams",
  "Hood Billionaire",
  "Stackin' Chips",
  "Flexin' & Flossin'",
  "Cash Flow",
  "Rollin' In The Deep",
  "Trap Queen Ballad",
  "Gangster's Paradise",
  "Thug Life Symphony",
  "Trappin' & Stackin'",
  "Street Cred",
  "Boss Moves",
  "Money Mantra",
  "Trap Life Ballad",
  "Gangsta Anthem",
  "Grindin' For Success",
  "Trapstar Chronicles",
  "Litty City",
  "Thug Passion Ballad",
  "Trap House Ballad",
  "Baller Status",
  "Money Trees",
  "Hustle & Grind",
  "Street Savvy",
  "Trapstar Lifestyle",
  "Gangsta's Paradise",
  "Thug Life Anthem",
  "Trapped Out",
  "Cash King",
  "Stacks On Stacks",
  "Boss Up",
  "Trap Queen Symphony",
  "Gangsta's Paradise",
  "Thug Life Chronicles",
  "Money Talks",
  "Trapstar Dreams",
  "Hood Billionaire",
  "Stackin' Chips",
  "Flexin' & Flossin'",
  "Cash Flow",
  "Rollin' In The Deep",
  "Trap Queen Ballad",
  "Gangster's Paradise",
  "Thug Life Symphony",
  "Trappin' & Stackin'",
  "Street Cred",
  "Boss Moves",
  "Money Mantra",
  "Trap Life Ballad",
  "Gangsta Anthem",
  "Grindin' For Success",
  "Trapstar Chronicles",
  "Litty City",
  "Thug Passion Ballad",
  "Trap House Ballad",
  "Baller Status",
  "Money Trees",
  "Hustle & Grind",
  "Street Savvy",
  "Trapstar Lifestyle",
  "Gangsta's Paradise",
  "Thug Life Anthem",
  "Trapped Out",
  "Cash King",
  "Stacks On Stacks",
  "Boss Up",
  "Trap Queen Symphony",
];

const topTrapArtistsUSA = [
  "Future",
  "Travis Scott",
  "Migos",
  "Young Thug",
  "Lil Uzi Vert",
  "Gucci Mane",
  "21 Savage",
  "Lil Baby",
  "Roddy Ricch",
  "Gunna",
];

const topKeysTrap = [
  "cminor",
  "dminor",
  "eminor",
  "fminor",
  "gminor",
  "aminor",
  "c#minor",
  "d#minor",
  "f#minor",
  "a#minor",
];

const genres = [
  "hippop",
  "rnb",
  "trap",
  "drill",
  "pop",
  "country",
  "latin",
  "countrypop",
  "gospel",
  "afrobeat",
];
const topBPMsTrap = [130, 140, 150, 160, 170, 120, 110, 100, 180, 190];

export const trapPosts: any = [];

let i = 0;

trapRapSongTitles.forEach((title) => {
  if (i === 10) {
    i = 0;
    const postoriginal = {
      user: "64ca4f56f6fb8b30b6ffc9be",
      title: topTrapArtistsUSA[i] + " " + "type beat" + " " + "-" + " " + title,
      tags: [
        topTrapArtistsUSA[i],
        topTrapArtistsUSA[i] + " " + "type beat",
        topTrapArtistsUSA[i].split(" ").join(""),
        topTrapArtistsUSA[i] +
          " " +
          "x" +
          " " +
          topTrapArtistsUSA[i + 1] +
          " " +
          "type beat",
      ],
      genres: [genres[i]],
      key: topKeysTrap[i],
      bpm: topBPMsTrap[i],
      artwork: "hhh",
      mp3: "hhhh",
      wav: "hhhh",
    };
    const postnoartintitle = {
      user: "64ca4f56f6fb8b30b6ffc9be",
      title: title,
      tags: [
        topTrapArtistsUSA[i],
        topTrapArtistsUSA[i] + " " + "type beat",
        topTrapArtistsUSA[i].split(" ").join(""),
        topTrapArtistsUSA[i] +
          " " +
          "x" +
          " " +
          topTrapArtistsUSA[i + 1] +
          " " +
          "type beat",
      ],
      key: topKeysTrap[i],
      bpm: topBPMsTrap[i],
      artwork: "hhh",
      mp3: "hhhh",
      wav: "hhhh",
    };
    const postnotags = {
      user: "64ca4f56f6fb8b30b6ffc9be",
      title: topTrapArtistsUSA[i] + " " + "type beat" + " " + "-" + " " + title,
      tags: [""],
      key: topKeysTrap[i],
      bpm: topBPMsTrap[i],
      artwork: "hhh",
      mp3: "hhhh",
      wav: "hhhh",
    };
    const posttagsnotrim = {
      user: "64ca4f56f6fb8b30b6ffc9be",
      title: topTrapArtistsUSA[i] + " " + "type beat" + " " + "-" + " " + title,
      tags: [
        topTrapArtistsUSA[i],
        topTrapArtistsUSA[i] + " " + "type beat",
        topTrapArtistsUSA[i] +
          " " +
          "x" +
          " " +
          topTrapArtistsUSA[i + 1] +
          " " +
          "type beat",
      ],
      key: topKeysTrap[i],
      bpm: topBPMsTrap[i],
      artwork: "hhh",
      mp3: "hhhh",
      wav: "hhhh",
    };
    const postexclusive = {
      user: "64ca4f56f6fb8b30b6ffc9be",
      title: topTrapArtistsUSA[i] + " " + "type beat" + " " + "-" + " " + title,
      tags: [
        topTrapArtistsUSA[i],
        topTrapArtistsUSA[i] + " " + "type beat",
        topTrapArtistsUSA[i].split(" ").join(""),
      ],
      key: topKeysTrap[i],
      bpm: topBPMsTrap[i],
      artwork: "hhh",
      mp3: "hhhh",
      wav: "hhhh",
    };

    trapPosts.push(postoriginal);
    i++;
  }

  const postoriginal = {
    user: "64ca4f56f6fb8b30b6ffc9be",
    title: topTrapArtistsUSA[i] + " " + "type beat" + " " + "-" + " " + title,
    tags: [
      topTrapArtistsUSA[i],
      topTrapArtistsUSA[i] + " " + "type beat",
      topTrapArtistsUSA[i].split(" ").join(""),
      topTrapArtistsUSA[i] +
        " " +
        "x" +
        " " +
        topTrapArtistsUSA[i + 1] +
        " " +
        "type beat",
    ],
    key: topKeysTrap[i],
    bpm: topBPMsTrap[i],
    artwork: "hhh",
    mp3: "hhhh",
    wav: "hhhh",
  };
  const postnoartintitle = {
    user: "64ca4f56f6fb8b30b6ffc9be",
    title: title,
    tags: [
      topTrapArtistsUSA[i],
      topTrapArtistsUSA[i] + " " + "type beat",
      topTrapArtistsUSA[i].split(" ").join(""),
      topTrapArtistsUSA[i] +
        " " +
        "x" +
        " " +
        topTrapArtistsUSA[i + 1] +
        " " +
        "type beat",
    ],
    key: topKeysTrap[i],
    bpm: topBPMsTrap[i],
    artwork: "hhh",
    mp3: "hhhh",
    wav: "hhhh",
  };
  const postnotags = {
    user: "64ca4f56f6fb8b30b6ffc9be",
    title: topTrapArtistsUSA[i] + " " + "type beat" + " " + "-" + " " + title,
    tags: [""],
    key: topKeysTrap[i],
    bpm: topBPMsTrap[i],
    artwork: "hhh",
    mp3: "hhhh",
    wav: "hhhh",
  };
  const posttagsnotrim = {
    user: "64ca4f56f6fb8b30b6ffc9be",
    title: topTrapArtistsUSA[i] + " " + "type beat" + " " + "-" + " " + title,
    tags: [
      topTrapArtistsUSA[i],
      topTrapArtistsUSA[i] + " " + "type beat",
      topTrapArtistsUSA[i] +
        " " +
        "x" +
        " " +
        topTrapArtistsUSA[i + 1] +
        " " +
        "type beat",
    ],
    key: topKeysTrap[i],
    bpm: topBPMsTrap[i],
    artwork: "hhh",
    mp3: "hhhh",
    wav: "hhhh",
  };
  const postexclusive = {
    user: "64ca4f56f6fb8b30b6ffc9be",
    title: topTrapArtistsUSA[i] + " " + "type beat" + " " + "-" + " " + title,
    tags: [
      topTrapArtistsUSA[i],
      topTrapArtistsUSA[i] + " " + "type beat",
      topTrapArtistsUSA[i].split(" ").join(""),
    ],
    key: topKeysTrap[i],
    bpm: topBPMsTrap[i],
    artwork: "hhh",
    mp3: "hhhh",
    wav: "hhhh",
  };
  trapPosts.push(postexclusive);
  i++;
});
