/* Once Upon a Time Asia
   Original storytelling cards from public history of the five partitions
   that unmade the Indian Empire (1937–1971). Not a transcription of any
   book or audiobook. Not affiliated with Atlas Games. */
(function (root) {
  "use strict";

  var CATS = {
    person: { id: "person", label: "Person", hue: "#7a2e24" },
    place: { id: "place", label: "Place", hue: "#1f4a38" },
    thing: { id: "thing", label: "Thing", hue: "#6b3e22" },
    aspect: { id: "aspect", label: "Aspect", hue: "#3d4a6b" },
    event: { id: "event", label: "Event", hue: "#8a2f52" }
  };

  function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function card(chapter, category, title, interrupt) {
    return {
      id: chapter + "-" + category + "-" + slug(title) + (interrupt ? "-x" : ""),
      chapter: chapter,
      category: category,
      title: title,
      interrupt: !!interrupt
    };
  }

  function ending(chapter, text) {
    return {
      id: chapter + "-end-" + slug(text).slice(0, 48),
      chapter: chapter,
      text: text
    };
  }

  function deck(chapter, people, places, things, aspects, events, interrupts, endings) {
    var story = [];
    function add(cat, list) {
      for (var i = 0; i < list.length; i++) story.push(card(chapter, cat, list[i], false));
    }
    add("person", people);
    add("place", places);
    add("thing", things);
    add("aspect", aspects);
    add("event", events);
    for (var j = 0; j < interrupts.length; j++) {
      story.push(card(chapter, interrupts[j][0], interrupts[j][1], true));
    }
    var end = [];
    for (var k = 0; k < endings.length; k++) end.push(ending(chapter, endings[k]));
    return { story: story, endings: end };
  }

  var CHAPTERS = [
    {
      id: "burma",
      roman: "I",
      year: "1937",
      title: "The Burma Cut",
      kicker: "First partition",
      map: "Rangoon to the Shan hills",
      summary:
        "In 1937 Burma was separated from British India. Rangoon had been an Indian imperial port; Indian traders, Burmese nationalists, and hill princes suddenly found themselves on different papers. War arrived in 1942. Independence followed in 1948, with the Panglong talks still unfinished business.",
      play: "A tale of teak, docks, and a country cut out of a larger map."
    },
    {
      id: "arabia",
      roman: "II",
      year: "1937–47",
      title: "The Arabian Shore",
      kicker: "Second partition",
      map: "Aden to the Gulf creeks",
      summary:
        "Aden, the Hadhramaut, and the Gulf sheikhdoms were run for decades through British India. In 1937 Aden became a Crown Colony of its own. In 1947 the Gulf residency left the India Office for the Foreign Office. The Indian rupee lingered in bazaars from Kuwait to Dubai.",
      play: "A tale of dhows, treaties, and an empire that forgot the Red Sea."
    },
    {
      id: "great",
      roman: "III",
      year: "1947",
      title: "The Great Partition",
      kicker: "Third partition",
      map: "Punjab and Bengal",
      summary:
        "At midnight in August 1947 British India became two dominions. A lawyer who barely knew the land drew a line through Punjab and Bengal. Flags rose. Trains moved. Neighbours learned that a field could become a frontier overnight.",
      play: "A tale of midnight flags, pencil lines, and names that no longer matched the soil."
    },
    {
      id: "princes",
      roman: "IV",
      year: "1947–48",
      title: "The Princely Map",
      kicker: "Fourth partition",
      map: "Hyderabad, Junagadh, Kashmir",
      summary:
        "Hundreds of princely states sat outside British India proper. When paramountcy lapsed, each ruler had to accede. Most signed. A few hesitated: Junagadh’s nawab, Hyderabad’s nizam, Kashmir’s maharaja. Palaces bargained while the new maps hardened around them.",
      play: "A tale of instruments of accession, palace radios, and flags lowered in courtyards."
    },
    {
      id: "east",
      roman: "V",
      year: "1971",
      title: "The Eastern Wing",
      kicker: "Fifth partition",
      map: "Dhaka to the Padma",
      summary:
        "Pakistan’s two wings were a thousand miles apart. In 1952 students died for the right to speak Bangla. In 1970 a cyclone and an election broke the old bargain. In 1971 the eastern wing became Bangladesh.",
      play: "A tale of language, cyclone season, a radio in hiding, and a name said aloud."
    }
  ];

  var DECKS = {
    burma: deck(
      "burma",
      ["Aung San", "A Rangoon dockworker", "A Shan saohpa", "An Indian trader", "A university student", "A British governor"],
      ["Rangoon harbour", "The Irrawaddy", "Mandalay", "The Shan hills", "The Burma Road", "A teak forest"],
      ["A teak log", "An Indian-Empire passport", "A rice sack", "A monastic bowl", "A separatist Whitehall file"],
      ["Cut away", "Hill-born", "Cosmopolitan", "Occupied", "Loyal to a vanished Raj"],
      ["Burma is separated", "The docks strike", "The Japanese march in", "Panglong is promised", "Independence is declared"],
      [
        ["person", "A railway clerk from India"],
        ["place", "A frontier outpost"],
        ["thing", "A Japanese leaflet"],
        ["aspect", "Forgotten by Delhi"],
        ["event", "A border is gazetted"]
      ],
      [
        "And so Burma stood outside India, a new country with old ledgers still open.",
        "And the teak was floated downriver, though the men who counted it now held different papers.",
        "And the hill prince kept his umbrella, and waited to see whose map would last.",
        "And Rangoon’s harbour still spoke many languages, but only one flag flew.",
        "And the student closed the book on empire, and opened one on a harder freedom.",
        "And the road through the forest became a border that nobody had walked yet.",
        "And they named the country aloud, and the old name went into the archives.",
        "And the governor’s last dispatch went unread, because the addressee no longer existed."
      ]
    ),
    arabia: deck(
      "arabia",
      ["A Political Resident", "An Adeni stevedore", "A Trucial sheikh", "An Indian clerk in Bahrain", "A Hadhrami sailor", "A pearling nakhuda"],
      ["Steamer Point", "Aden crater", "Dubai Creek", "Kuwait harbour", "Muscat", "The Bab el-Mandab"],
      ["A Gulf rupee", "A pearling dhow", "A treaty in a camphor chest", "A wireless set", "A tin of frankincense"],
      ["Treaty-bound", "Far from Delhi", "Coastal", "Oil-scented", "Suddenly foreign"],
      ["Aden becomes a colony", "The Residency changes hands", "The India Office lets go", "An oil concession is signed", "The rupee still circulates"],
      [
        ["person", "The last India Office man"],
        ["place", "A desert fort"],
        ["thing", "A steamer ticket to Bombay"],
        ["aspect", "Overlooked"],
        ["event", "A protectorate is transferred"]
      ],
      [
        "And so the sheikh kept the treaty, and waited for a different empire to write the next line.",
        "And Aden looked toward London now, not toward Bombay.",
        "And the creek still took the dhows, though the passports at the wharf had changed colour.",
        "And the clerk packed the rupee ledgers, and did not know which capital would want them.",
        "And the Resident hauled down one flag and was not sure which to raise.",
        "And the desert stayed itself, while the map-makers argued on the verandah.",
        "And they said this shore had never really been India, and the sailors laughed, because the coins still said so.",
        "And the wireless spoke a new ministry’s name, and the old one faded into static."
      ]
    ),
    great: deck(
      "great",
      ["A midnight prime minister", "A tired mapmaker", "A Punjab farmer", "A Bengal boatman", "A railway guard", "A woman with one trunk"],
      ["Lahore", "Amritsar", "Calcutta", "Karachi", "New Delhi", "A line on a borrowed map"],
      ["A packed trunk", "A railway ticket", "A pencil", "A new flag, still folded", "A well in a shared courtyard"],
      ["Newly foreign", "Neighbouring", "Uncounted", "Sleepless", "Divided"],
      ["Midnight is declared", "The line is drawn", "A train is packed", "A flag is raised", "A census cannot keep up"],
      [
        ["person", "A neighbour from yesterday"],
        ["place", "A refugee camp of tents"],
        ["thing", "A house key to nowhere"],
        ["aspect", "Torn"],
        ["event", "A frontier appears in a field"]
      ],
      [
        "And so two flags rose, and the river between them did not change its mind.",
        "And the farmer learned that his far field now needed a permit.",
        "And the train arrived, and the names on the carriages were from a country that had lasted a week.",
        "And the mapmaker put down the pencil, and would not look at what the line had done.",
        "And they kept the courtyard well, because water does not read gazettes.",
        "And a child asked which anthem to learn, and the grown-ups chose the nearer drum.",
        "And the old address was still written in the trunk, under the new papers.",
        "And dawn came to both capitals at once, and neither slept."
      ]
    ),
    princes: deck(
      "princes",
      ["Vallabhbhai Patel", "A palace diwan", "The Nizam", "A Kashmir maharaja", "A nawab at sea", "A woman who reads the standstill"],
      ["Hyderabad", "Srinagar", "Junagadh", "Mysore", "Travancore", "The Chamber of Princes"],
      ["An Instrument of Accession", "A privy purse", "A state flag", "A palace radio", "A standstill paper"],
      ["Nominally sovereign", "Acceding", "Proud", "Uncertain", "Outflanked"],
      ["Paramountcy lapses", "The instrument is signed", "A palace flag comes down", "A mountain pass is contested", "The Chamber dissolves"],
      [
        ["person", "V. P. Menon with a briefcase"],
        ["place", "A residency bungalow"],
        ["thing", "A sealed letter to Delhi"],
        ["aspect", "Bargaining"],
        ["event", "Troops are rumoured at the border"]
      ],
      [
        "And so the prince signed, and the palace became a museum of what it had been.",
        "And the instrument went into a file, and the file went into a new republic.",
        "And the radio in the durbar hall played a different anthem at dusk.",
        "And the mountain state chose, or was chosen, and the pass kept its snow.",
        "And the nawab’s ship left a harbour that no longer answered to him.",
        "And they numbered the states that remained, and the number kept falling.",
        "And the diwan burned the old letterheads, and ordered new ones before breakfast.",
        "And the Chamber’s chairs were stacked, because there was no longer a chamber."
      ]
    ),
    east: deck(
      "east",
      ["Sheikh Mujib", "A Dhaka student", "A radio announcer in hiding", "A boatman on the Padma", "A cyclone survivor", "A sister of 1952"],
      ["Dhaka University", "The Padma", "Chittagong", "The Buriganga", "A border with Tripura", "A hall of banned meetings"],
      ["A 21 February poster", "A cyclone warning", "A ballot box", "A forbidden microphone", "A boat across the river"],
      ["Eastern", "Unbowed", "Flooded", "Silenced", "Independent at last"],
      ["The language march", "The great cyclone", "An election is won and ignored", "A radio names the country", "A surrender in December"],
      [
        ["person", "A poet with a banned page"],
        ["place", "A monsoon road"],
        ["thing", "A schoolbook in Bangla"],
        ["aspect", "A thousand miles apart"],
        ["event", "The eastern wing breaks away"]
      ],
      [
        "And so the eastern wing became a country, and the radio said the name without fear.",
        "And the student stood where the march had stood, and the language was the victory.",
        "And the river took the boats both ways, because families do not follow wings of maps.",
        "And December came, and the old order signed its name smaller than before.",
        "And they counted the years from 1952, as if the alphabet itself had been a frontier.",
        "And the cyclone had already rewritten the coast; the war only followed.",
        "And a poster from February outlived the government that banned it.",
        "And dawn over Dhaka was the first morning of a map that had been spoken before it was drawn."
      ]
    )
  };

  var EMPIRE = {
    id: "empire",
    roman: "I–V",
    year: "1937–71",
    title: "The Shattered Raj",
    kicker: "All five partitions",
    map: "Red Sea to the Shan hills",
    summary:
      "From 1937 to 1971 a single imperial structure — officially the Indian Empire — came apart in five cuts. Play this mixed deck when you want the whole fifty-year tale on one table.",
    play: "A long tale. Cards from every chapter. Steer toward your secret ending."
  };

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function chapterById(id) {
    if (id === "empire") return EMPIRE;
    for (var i = 0; i < CHAPTERS.length; i++) if (CHAPTERS[i].id === id) return CHAPTERS[i];
    return null;
  }

  function storyFor(id) {
    if (id === "empire") {
      var all = [];
      for (var i = 0; i < CHAPTERS.length; i++) all = all.concat(DECKS[CHAPTERS[i].id].story);
      return all;
    }
    return DECKS[id].story.slice();
  }

  function endingsFor(id) {
    if (id === "empire") {
      var all = [];
      for (var i = 0; i < CHAPTERS.length; i++) all = all.concat(DECKS[CHAPTERS[i].id].endings);
      return all;
    }
    return DECKS[id].endings.slice();
  }

  function deal(chapterId, names) {
    var n = names.length;
    var handSize = Math.max(5, 11 - n);
    var story = shuffle(storyFor(chapterId));
    var endings = shuffle(endingsFor(chapterId));
    var players = [];
    for (var i = 0; i < n; i++) {
      players.push({
        name: names[i] || "Player " + (i + 1),
        hand: story.splice(0, handSize),
        ending: endings.pop()
      });
    }
    var opener = story.length ? story.pop() : null;
    return {
      chapterId: chapterId,
      storyDeck: story,
      endingDeck: endings,
      discard: [],
      line: opener ? [opener] : [],
      players: players,
      storyteller: 0,
      phase: "story",
      pending: null,
      winner: null,
      log: opener ? ["The tale begins with " + opener.title + "."] : ["The tale is waiting to be told."]
    };
  }

  function draw(game, pi) {
    if (!game.storyDeck.length) {
      if (game.discard.length) {
        game.storyDeck = shuffle(game.discard);
        game.discard = [];
      }
    }
    if (!game.storyDeck.length) return null;
    var c = game.storyDeck.pop();
    game.players[pi].hand.push(c);
    return c;
  }

  function nextTeller(game) {
    game.storyteller = (game.storyteller + 1) % game.players.length;
    game.phase = "story";
    game.pending = null;
  }

  function playCard(game, cardId) {
    var p = game.players[game.storyteller];
    var idx = -1;
    for (var i = 0; i < p.hand.length; i++) if (p.hand[i].id === cardId) idx = i;
    if (idx < 0) return { ok: false, error: "not_in_hand" };
    if (game.phase !== "story") return { ok: false, error: "not_your_moment" };
    var card = p.hand.splice(idx, 1)[0];
    game.line.push(card);
    game.log.push(p.name + " weaves in " + card.title + ".");
    if (!p.hand.length) {
      game.phase = "ending";
      game.pending = null;
      return { ok: true, ending: true };
    }
    var othersHaveInterrupt = false;
    for (var j = 0; j < game.players.length; j++) {
      if (j === game.storyteller) continue;
      var h = game.players[j].hand;
      for (var k = 0; k < h.length; k++) {
        if (h[k].interrupt && h[k].category === card.category) othersHaveInterrupt = true;
      }
    }
    if (othersHaveInterrupt && game.players.length > 1) {
      game.phase = "interrupt";
      game.pending = { type: "interrupt", category: card.category, from: game.storyteller };
      return { ok: true, interruptWindow: true, category: card.category };
    }
    return { ok: true };
  }

  function interrupt(game, playerIndex, cardId) {
    if (game.phase !== "interrupt") return { ok: false, error: "no_window" };
    if (playerIndex === game.storyteller) return { ok: false, error: "teller" };
    var p = game.players[playerIndex];
    var idx = -1;
    for (var i = 0; i < p.hand.length; i++) {
      if (p.hand[i].id === cardId && p.hand[i].interrupt && p.hand[i].category === game.pending.category) idx = i;
    }
    if (idx < 0) return { ok: false, error: "no_interrupt" };
    var card = p.hand.splice(idx, 1)[0];
    game.line.push(card);
    game.log.push(p.name + " interrupts with " + card.title + ".");
    draw(game, game.storyteller);
    game.storyteller = playerIndex;
    game.phase = "story";
    game.pending = null;
    if (!p.hand.length) {
      game.phase = "ending";
      return { ok: true, ending: true };
    }
    return { ok: true };
  }

  function declineInterrupt(game) {
    if (game.phase !== "interrupt") return { ok: false };
    game.phase = "story";
    game.pending = null;
    return { ok: true };
  }

  function passTale(game) {
    if (game.phase !== "story") return { ok: false };
    var who = game.storyteller;
    draw(game, who);
    game.log.push(game.players[who].name + " passes the tale.");
    nextTeller(game);
    return { ok: true };
  }

  function acceptEnding(game) {
    if (game.phase !== "ending") return { ok: false };
    game.winner = game.storyteller;
    game.phase = "won";
    game.log.push(game.players[game.storyteller].name + " closes the tale.");
    return { ok: true };
  }

  function rejectEnding(game) {
    if (game.phase !== "ending") return { ok: false };
    var p = game.players[game.storyteller];
    if (game.endingDeck.length) p.ending = game.endingDeck.pop();
    draw(game, game.storyteller);
    game.log.push("The ending did not land. The tale continues.");
    nextTeller(game);
    return { ok: true };
  }

  function namedInterrupt(game, playerIndex, cardId) {
    if (game.phase !== "story") return { ok: false, error: "not_story" };
    if (playerIndex === game.storyteller) return { ok: false, error: "teller" };
    if (!game.line.length) return { ok: false, error: "empty" };
    var last = game.line[game.line.length - 1];
    var p = game.players[playerIndex];
    var idx = -1;
    for (var i = 0; i < p.hand.length; i++) {
      if (p.hand[i].id === cardId && p.hand[i].title === last.title) idx = i;
    }
    if (idx < 0) return { ok: false, error: "no_match" };
    var card = p.hand.splice(idx, 1)[0];
    game.line.push(card);
    game.log.push(p.name + " snatches the tale — they also held " + card.title + ".");
    draw(game, game.storyteller);
    game.storyteller = playerIndex;
    if (!p.hand.length) {
      game.phase = "ending";
      return { ok: true, ending: true };
    }
    return { ok: true };
  }

  function counts() {
    var out = { chapters: CHAPTERS.length, story: 0, endings: 0, interrupts: 0 };
    for (var i = 0; i < CHAPTERS.length; i++) {
      var d = DECKS[CHAPTERS[i].id];
      out.story += d.story.length;
      out.endings += d.endings.length;
      for (var j = 0; j < d.story.length; j++) if (d.story[j].interrupt) out.interrupts++;
    }
    return out;
  }

  root.OnceUponAsia = {
    CATS: CATS,
    CHAPTERS: CHAPTERS,
    EMPIRE: EMPIRE,
    DECKS: DECKS,
    chapterById: chapterById,
    storyFor: storyFor,
    endingsFor: endingsFor,
    shuffle: shuffle,
    deal: deal,
    playCard: playCard,
    interrupt: interrupt,
    declineInterrupt: declineInterrupt,
    passTale: passTale,
    acceptEnding: acceptEnding,
    rejectEnding: rejectEnding,
    namedInterrupt: namedInterrupt,
    draw: draw,
    counts: counts
  };
})(typeof window !== "undefined" ? window : globalThis);
