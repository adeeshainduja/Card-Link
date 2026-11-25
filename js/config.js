/**
 * ============================================================================
 *  BIRTHDAY EXPERIENCE CONFIGURATION
 *  Created with love by Adeesha for Chamudi Kavindya
 * ============================================================================
 *  Edit any names, dates, messages, colors, flower wishes, or audio paths here.
 *  Changes take effect immediately when you reload index.html.
 */

window.BIRTHDAY_CONFIG = {
  person: {
    girlfriendName: "Chamudi Kavindya",
    girlfriendShort: "Chamudi",
    boyfriendName: "Adeesha",
    dob: "26 November 2002",
    celebrationDate: "26 November 2026",
    age: 24,
    professionTitle: "Future Dr. Chamudi Kavindya",
    themeTitle: "My Love, My Future Doctor"
  },

  /**
   * Optional theme palette overrides (applied to CSS custom properties).
   */
  colors: {
    midnightPurple: "#140b24",
    deepVelvet: "#211138",
    rosePink: "#f28cb1",
    softBlush: "#f9c6d7",
    lavender: "#c8b6ff",
    champagneGold: "#f3d59b",
    ivory: "#fdf8f2"
  },

  /**
   * Local audio files inside assets/audio/.
   * Replace any file with your own MP3 or WAV and update the path below.
   */
  audio: {
    bgMusic: "assets/audio/romantic-piano.wav",
    chime: "assets/audio/chime.wav",
    envelope: "assets/audio/envelope.wav",
    heartbeat: "assets/audio/heartbeat.wav",
    celebration: "assets/audio/celebration.wav",
    musicVolume: 0.42,
    sfxVolume: 0.55
  },

  /**
   * Optional personal photos (kept empty by default so no broken images appear).
   * If you add photos into assets/images/, list them here:
   *   { src: "assets/images/memory-1.jpg", caption: "Our favorite day" }
   * When present, a gentle keepsake gallery button appears in the Finale scene.
   */
  photos: [],

  scene01: {
    preTitle: "For someone very special...",
    toLine: "To: Chamudi Kavindya",
    fromLine: "From: Adeesha, with all my love.",
    buttonText: "Open Your Surprise ♡"
  },

  scene02: {
    name: "Chamudi Kavindya",
    headline: "Happy 24th Birthday, My Love!",
    line1: "On 26 November 2002, the world became a little more beautiful.",
    line2: "And today, I get to celebrate the girl who makes my world brighter.",
    continueHint: "Touch the glowing star to continue"
  },

  scene03: {
    title: "24 Flowers for 24 Beautiful Years",
    subtitle: "Tap the glowing earth to bloom each wish for you",
    completionText: "24 flowers for 24 beautiful years. If I could, I would give you a whole universe of flowers.",
    flowers: [
      { quality: "Happiness", note: "May your days always overflow with quiet joy and radiant laughter.", palette: "rose" },
      { quality: "Kindness", note: "Your gentle heart softens every room you walk into.", palette: "lavender" },
      { quality: "Courage", note: "Even on the hardest days, you carry a quiet, unstoppable bravery.", palette: "gold" },
      { quality: "Love", note: "You are cherished more deeply than words on any page could hold.", palette: "rose" },
      { quality: "Intelligence", note: "Your brilliant mind and dedication inspire me every single day.", palette: "lavender" },
      { quality: "Patience", note: "Through every long chapter and late night, your grace never fades.", palette: "ivory" },
      { quality: "Confidence", note: "Walk tall, my love — you were made for everything you dream of.", palette: "gold" },
      { quality: "Peace", note: "May your mind always find calm after every storm of exams.", palette: "lavender" },
      { quality: "Beautiful dreams", note: "Every dream tucked inside your heart deserves to come true.", palette: "rose" },
      { quality: "Strength", note: "Stronger than you know, softer than the moonlight.", palette: "gold" },
      { quality: "Compassion", note: "Your future patients will feel blessed just by your presence.", palette: "ivory" },
      { quality: "Laughter", note: "Your laugh is still my favorite melody in the entire universe.", palette: "rose" },
      { quality: "Success", note: "Every milestone ahead of you is waiting for your name on it.", palette: "gold" },
      { quality: "Hope", note: "You bring light even to moments that feel heavy.", palette: "lavender" },
      { quality: "Health", note: "Take care of yourself the way you take care of everyone else.", palette: "ivory" },
      { quality: "Adventure", note: "So many cities, sunsets, and quiet mornings still await us.", palette: "rose" },
      { quality: "Friendship", note: "Before anything else, you are my favorite person to talk to.", palette: "lavender" },
      { quality: "Wisdom", note: "Year 24 brings deeper clarity, grace, and quiet certainty.", palette: "gold" },
      { quality: "Joy", note: "May small surprises make you smile when you least expect it.", palette: "rose" },
      { quality: "Beautiful memories", note: "Here is to a thousand more snapshots saved in our hearts.", palette: "ivory" },
      { quality: "New opportunities", note: "Doors of wonder are opening gently right in front of you.", palette: "lavender" },
      { quality: "Endless smiles", note: "If I have one job, it is keeping that smile glowing.", palette: "rose" },
      { quality: "A wonderful future", note: "The best chapters of your life are only just beginning.", palette: "gold" },
      { quality: "My love for you", note: "Always yours, in every season and every tomorrow — Adeesha.", palette: "rose" }
    ]
  },

  scene04: {
    title: "Our Little Universe",
    hint: "Touch the moon, the shooting stars, and the quiet wonders around us",
    moonMessage: "In a world full of people, I'm so happy I found you.",
    starMessage: "Every version of my future looks more beautiful with you in it.",
    fireflyMessage: "Even in the darkest night, being beside you feels like home.",
    lakeMessage: "No matter how far life takes us, my heart always finds its way to you."
  },

  scene05: {
    badgeText: "Future Dr. Chamudi Kavindya",
    transformButton: "Witness Her Journey ✨",
    paragraphs: [
      "One day, people will call you Doctor Chamudi.",
      "They will trust you with their lives, and you will bring hope to people who need it most.",
      "I know the journey is not always easy. There will be difficult exams, sleepless nights and exhausting days.",
      "But I believe in you, my love.",
      "I am proud of the medical student you are today, and I will be cheering for the doctor you are becoming.",
      "While you learn to take care of everyone's hearts, remember that Adeesha will always care about yours."
    ]
  },

  scene06: {
    patient: "Chamudi Kavindya",
    prescriber: "Adeesha",
    items: [
      "Unlimited happiness.",
      "A daily dose of smiles.",
      "Endless hugs.",
      "Plenty of rest after studying.",
      "Confidence before every exam.",
      "Unlimited love.",
      "Beautiful dreams coming true."
    ],
    duration: "A lifetime.",
    sideEffects: "Butterflies in your stomach and unexpected smiles.",
    refills: "Unlimited."
  },

  scene07: {
    prompt1: "Close your eyes, my love.",
    prompt2: "Make a beautiful wish...",
    buttonText: "Blow Out the Candles",
    wishHeadline: "Happy Birthday, Chamudi!",
    wishSub: "May every wish in your beautiful heart come true."
  },

  scene08: {
    tapHint: "Tap the sealed letter to unfold it",
    letterParagraphs: [
      "My dearest Chamudi,",
      "Happy 24th birthday, my love.",
      "Today is not just another day. It is the day the world received someone who would eventually become incredibly special to me.",
      "I love your smile, your kindness, your beautiful heart and the way you keep working toward your dreams.",
      "I know becoming a doctor is not easy. Some days will be tiring, some exams will be difficult, and sometimes you may feel overwhelmed.",
      "But please remember that you have someone who believes in you.",
      "I am proud of you, not only for the doctor you are going to become, but also for the wonderful person you already are.",
      "I hope your 24th year brings you happiness, success, peace, good health and countless beautiful memories.",
      "I hope I get to celebrate many more birthdays with you, watch your dreams come true and see that beautiful smile for years to come.",
      "Happy birthday to my favorite person, my beautiful girl and my future doctor.",
      "With all my love,",
      "Your Adeesha ♡"
    ],
    signature: "Adeesha"
  },

  scene09: {
    title: "One more surprise...",
    buttonText: "I Need a Hug",
    message1: "Whenever the world feels heavy, remember that you have someone in your corner.",
    message2: "Sending you the biggest hug, my love."
  },

  scene10: {
    line1: "Happy 24th Birthday",
    line2: "Chamudi Kavindya",
    line3: "My Love. My Beautiful Girl. My Future Doctor.",
    credit1: "Made with love, just for you.",
    credit2: "Forever your biggest supporter, Adeesha.",
    secretButton: "One Last Secret ♡",
    secretLine1: "Out of all the things I could wish for today, my favorite wish is to celebrate many more birthdays with you.",
    secretLine2: "I love you, Chamudi.",
    replayButton: "Experience Again ↺"
  },

  easterEggs: {
    butterflies: [
      "Your smile can outshine an entire night sky.",
      "You make ordinary moments feel enchanted.",
      "The future Doctor Chamudi has the kindest soul.",
      "Every little thing about you is effortlessly lovely.",
      "You are Adeesha's favorite miracle."
    ],
    hiddenHeartNote: "Secret note: Even on your busiest study nights, you are always on my mind. — Adeesha ♡",
    number24Message: "24 years ago today, the brightest star arrived on Earth!",
    signatureMessage: "Signed with all my heart — forever yours, Adeesha ♡",
    stethoscopeMessage: "Listen closely... that steady heartbeat beats for you, Chamudi."
  }
};
