/**
 * ============================================================================
 *  MAIN STORY CONTROLLER — CHAMUDI'S 24TH BIRTHDAY EXPERIENCE
 * ============================================================================
 */

(function () {
  const CFG = window.BIRTHDAY_CONFIG;
  const ILL = window.BirthdayIllustrations;

  // Apply customizable theme colors from config.js
  if (CFG.colors) {
    const r = document.documentElement.style;
    if (CFG.colors.midnightPurple) r.setProperty("--bg-midnight", CFG.colors.midnightPurple);
    if (CFG.colors.deepVelvet) r.setProperty("--bg-velvet", CFG.colors.deepVelvet);
    if (CFG.colors.rosePink) r.setProperty("--rose-pink", CFG.colors.rosePink);
    if (CFG.colors.softBlush) r.setProperty("--soft-blush", CFG.colors.softBlush);
    if (CFG.colors.lavender) r.setProperty("--lavender", CFG.colors.lavender);
    if (CFG.colors.champagneGold) r.setProperty("--champagne-gold", CFG.colors.champagneGold);
    if (CFG.colors.ivory) r.setProperty("--ivory", CFG.colors.ivory);
  }

  const audio = new window.RomanticAudioEngine(CFG.audio);

  const scenes = Array.from(document.querySelectorAll(".scene"));
  const TOTAL_SCENES = scenes.length;
  let currentScene = 0;
  let isTransitioning = false;
  let wantSoundOnOpen = true;
  let butterflyIndex = 0;
  let whisperTimer = null;

  // Interactive Scene States (resettable on Replay)
  const state = {
    s1Opened: false,
    bloomedCount: 0,
    gardenArranged: false,
    doctorTransformed: false,
    rxAnimated: false,
    candlesOut: false,
    letterOpened: false,
    hugged: false,
    secretRevealed: false
  };

  // Elements
  const progressStarsEl = document.getElementById("progress-stars");
  const audioToggleBtn = document.getElementById("audio-toggle-btn");
  const audioIconMuted = document.getElementById("audio-icon-muted");
  const audioIconPlaying = document.getElementById("audio-icon-playing");
  const prevBtn = document.getElementById("prev-scene-btn");
  const nextBtn = document.getElementById("next-scene-btn");
  const chapterTag = document.getElementById("scene-chapter-tag");
  const whisperToast = document.getElementById("whisper-toast");
  const whisperKicker = document.getElementById("whisper-kicker");
  const whisperText = document.getElementById("whisper-text");

  function showWhisper(text, kicker = "A whisper for you", duration = 4200) {
    whisperKicker.textContent = kicker;
    whisperText.textContent = text;
    whisperToast.classList.add("visible");
    clearTimeout(whisperTimer);
    whisperTimer = setTimeout(() => {
      whisperToast.classList.remove("visible");
    }, duration);
  }

  const fx = new window.MagicalEffectsEngine(
    document.getElementById("ambient-canvas"),
    document.getElementById("fx-canvas"),
    document.getElementById("butterfly-layer"),
    () => {
      audio.playSfx("chime");
      const list = CFG.easterEggs.butterflies;
      const msg = list[butterflyIndex % list.length];
      butterflyIndex++;
      showWhisper(msg, "Butterfly Compliment ✧");
    }
  );

  // ==========================================================================
  // AUDIO UI SYNC
  // ==========================================================================
  function syncAudioUi(enabled) {
    audioToggleBtn.classList.toggle("is-playing", enabled);
    audioIconMuted.style.display = enabled ? "none" : "block";
    audioIconPlaying.style.display = enabled ? "block" : "none";
  }

  audio.onChange(syncAudioUi);
  audioToggleBtn.addEventListener("click", () => {
    const on = audio.toggle();
    if (on) {
      audio.playSfx("chime");
      showWhisper("Soft music enabled ♡", "Sound", 2200);
    }
  });

  // ==========================================================================
  // PROGRESS STARS & SCENE NAVIGATION
  // ==========================================================================
  function buildProgressStars() {
    progressStarsEl.innerHTML = "";
    for (let i = 0; i < TOTAL_SCENES; i++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "progress-dot";
      btn.setAttribute("aria-label", `Go to scene ${i + 1}`);
      btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 2 L14.7 9.1 L22 9.7 L16.4 14.5 L18.2 21.8 L12 17.7 L5.8 21.8 L7.6 14.5 L2 9.7 L9.3 9.1 Z"/></svg>`;
      btn.addEventListener("click", () => goToScene(i));
      progressStarsEl.appendChild(btn);
    }
  }

  function updateChrome() {
    const dots = progressStarsEl.querySelectorAll(".progress-dot");
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentScene);
      dot.classList.toggle("completed", idx < currentScene);
    });
    prevBtn.classList.toggle("is-hidden", currentScene === 0);
    nextBtn.classList.toggle("is-hidden", currentScene === TOTAL_SCENES - 1);
    chapterTag.textContent = scenes[currentScene].dataset.chapter || "";
  }

  function goToScene(index) {
    if (index < 0 || index >= TOTAL_SCENES || index === currentScene || isTransitioning) return;
    isTransitioning = true;

    const outgoing = scenes[currentScene];
    const incoming = scenes[index];
    currentScene = index;
    updateChrome();

    onExitScene();

    incoming.scrollTop = 0;
    incoming.classList.add("is-active");

    if (window.gsap) {
      gsap.set(incoming, { opacity: 0, scale: 1.04 });
      gsap.to(outgoing, {
        opacity: 0,
        scale: 0.96,
        duration: 0.55,
        ease: "power2.inOut",
        onComplete: () => {
          outgoing.classList.remove("is-active");
          gsap.set(outgoing, { clearProps: "transform,opacity" });
        }
      });
      gsap.to(incoming, {
        opacity: 1,
        scale: 1,
        duration: 0.72,
        delay: 0.14,
        ease: "power3.out",
        onComplete: () => {
          isTransitioning = false;
          onEnterScene(index);
        }
      });
    } else {
      outgoing.classList.remove("is-active");
      isTransitioning = false;
      onEnterScene(index);
    }
  }

  prevBtn.addEventListener("click", () => goToScene(currentScene - 1));
  nextBtn.addEventListener("click", () => goToScene(currentScene + 1));

  // Swipe navigation support (avoid triggering inside interactive garden/scroll areas unnecessarily)
  let touchStartX = 0;
  let touchStartY = 0;
  document.getElementById("scenes-viewport").addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  document.getElementById("scenes-viewport").addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.8) {
      if (dx < 0 && currentScene < TOTAL_SCENES - 1) goToScene(currentScene + 1);
      if (dx > 0 && currentScene > 0) goToScene(currentScene - 1);
    }
  }, { passive: true });

  function onExitScene() {
    fx.setPetalsEnabled(false);
    fx.setFireworksLoop(false);
    fx.clearButterflies();
  }

  function onEnterScene(idx) {
    if (idx === 0) runScene01Intro();
    if (idx === 1) runScene02Anim();
    if (idx === 2) fx.spawnButterflies(2);
    if (idx === 3) fx.spawnButterflies(2);
    if (idx === 4) runScene05Anim();
    if (idx === 5) runScene06Anim();
    if (idx === 6) runScene07Anim();
    if (idx === 7) fx.setPetalsEnabled(true);
    if (idx === 9) runScene10Anim();
  }

  // ==========================================================================
  // SCENE 01 — MYSTERIOUS SURPRISE ENVELOPE
  // ==========================================================================
  const envelopeStage = document.getElementById("envelope-stage");
  const openSurpriseBtn = document.getElementById("open-surprise-btn");
  const soundOptBtn = document.getElementById("s1-sound-opt");

  function initScene01() {
    document.getElementById("s1-pre").textContent = CFG.scene01.preTitle;
    document.getElementById("s1-to").textContent = CFG.scene01.toLine;
    document.getElementById("s1-from").textContent = CFG.scene01.fromLine;
    openSurpriseBtn.textContent = CFG.scene01.buttonText;
    envelopeStage.innerHTML = ILL.createEnvelopeSvg();

    document.getElementById("scene01-moon").addEventListener("click", () => {
      audio.playSfx("chime");
      fx.spawnSparkles(window.innerWidth - 50, 75, 16);
      showWhisper(CFG.scene04.moonMessage, "Moonlight Secret ☽");
    });

    soundOptBtn.addEventListener("click", () => {
      wantSoundOnOpen = !wantSoundOnOpen;
      soundOptBtn.classList.toggle("active", wantSoundOnOpen);
      soundOptBtn.textContent = wantSoundOnOpen
        ? "♪ Music & Sounds: On when opened"
        : "♪ Music & Sounds: Muted (Tap to enable)";
    });

    const handleOpen = () => {
      if (state.s1Opened) {
        goToScene(1);
        return;
      }
      state.s1Opened = true;
      envelopeStage.classList.add("is-opened");
      if (wantSoundOnOpen && !audio.enabled) {
        audio.unlockAndEnable(true);
      }
      audio.playSfx("envelope");

      const rect = envelopeStage.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      fx.spawnHeartBurst(cx, cy, 32);
      fx.spawnSparkles(cx, cy, 28);
      fx.setPetalsEnabled(true);
      fx.spawnButterflies(3);

      setTimeout(() => {
        goToScene(1);
      }, 1450);
    };

    envelopeStage.addEventListener("click", handleOpen);
    envelopeStage.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleOpen();
      }
    });
    openSurpriseBtn.addEventListener("click", handleOpen);
  }

  function runScene01Intro() {
    if (!window.gsap) {
      document.getElementById("s1-pre").style.opacity = 1;
      document.getElementById("s1-to").style.opacity = 1;
      document.getElementById("s1-from").style.opacity = 1;
      return;
    }
    gsap.fromTo("#s1-pre", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.2 });
    gsap.fromTo("#s1-to", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1.0, delay: 0.8 });
    gsap.fromTo("#s1-from", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1.0, delay: 1.35 });
  }

  // ==========================================================================
  // SCENE 02 — THE BIRTHDAY UNIVERSE
  // ==========================================================================
  function initScene02() {
    document.getElementById("constellation-wrap").innerHTML = ILL.createConstellationSvg();
    const nameEl = document.getElementById("s2-name");
    nameEl.innerHTML = CFG.scene02.name
      .split("")
      .map((ch) => `<span>${ch === " " ? "&nbsp;" : ch}</span>`)
      .join("");

    document.getElementById("s2-headline").textContent = CFG.scene02.headline;
    document.getElementById("s2-line1").textContent = CFG.scene02.line1;
    document.getElementById("s2-line2").textContent = CFG.scene02.line2;
    document.getElementById("s2-hint").textContent = CFG.scene02.continueHint;

    document.getElementById("constellation-24").addEventListener("click", (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      audio.playSfx("chime");
      fx.spawnSparkles(r.left + r.width / 2, r.top + r.height / 2, 34);
      showWhisper(CFG.easterEggs.number24Message, "24 Stars ✧");
    });

    document.getElementById("s2-continue-star").addEventListener("click", () => {
      audio.playSfx("chime");
      goToScene(2);
    });
  }

  function runScene02Anim() {
    fx.spawnButterflies(2);
    const letters = document.querySelectorAll("#s2-name span");
    const line = document.getElementById("heart-constellation-line");

    if (window.gsap) {
      gsap.set(letters, { opacity: 0, y: 10, scale: 0.85 });
      gsap.to(letters, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.055,
        duration: 0.45,
        ease: "back.out(1.6)"
      });
      if (line) {
        gsap.set(line, { strokeDashoffset: 620 });
        gsap.to(line, { strokeDashoffset: 0, duration: 2.2, delay: 0.3, ease: "power2.inOut" });
      }
    } else {
      letters.forEach((l) => (l.style.opacity = 1));
      if (line) line.style.strokeDashoffset = "0";
    }
  }

  // ==========================================================================
  // SCENE 03 — 24 FLOWERS FOR 24 BEAUTIFUL YEARS
  // ==========================================================================
  const gardenStage = document.getElementById("garden-stage");
  const bloomCounterEl = document.getElementById("bloom-counter");
  const wishTitleEl = document.getElementById("flower-wish-title");
  const wishNoteEl = document.getElementById("flower-wish-note");
  let flowerSlots = [];

  // Organic scattered coordinates (%) inside the garden soil area
  const SCATTER_POS = [
    [13, 62], [25, 58], [38, 64], [50, 56], [63, 62], [76, 57], [88, 63],
    [10, 76], [22, 72], [34, 78], [46, 70], [58, 76], [70, 71], [82, 77], [91, 74],
    [16, 90], [28, 86], [40, 91], [52, 85], [64, 90], [75, 86], [86, 91],
    [32, 68], [67, 81]
  ];

  // Heart formation coordinates (%) when all 24 flowers bloom
  function getHeartPoint(i, total = 24) {
    const t = (i / total) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return [50 + x * 2.35, 52 + y * 2.15];
  }

  function initScene03() {
    document.getElementById("s3-title").textContent = CFG.scene03.title;
    document.getElementById("s3-subtitle").textContent = CFG.scene03.subtitle;

    buildFlowerGarden();

    // Tapping empty ground blooms the next unbloomed flower
    gardenStage.addEventListener("click", (e) => {
      if (e.target.closest(".flower-slot")) return;
      const next = flowerSlots.find((s) => !s.dataset.bloomed);
      if (next) {
        bloomFlower(Number(next.dataset.index));
      }
    });

    document.getElementById("bloom-all-btn").addEventListener("click", () => {
      flowerSlots.forEach((s, i) => {
        if (!s.dataset.bloomed) {
          setTimeout(() => bloomFlower(i), i * 55);
        }
      });
    });
  }

  function buildFlowerGarden() {
    gardenStage.querySelectorAll(".flower-slot").forEach((el) => el.remove());
    flowerSlots = [];
    state.bloomedCount = 0;
    state.gardenArranged = false;
    bloomCounterEl.textContent = "0 / 24 Bloomed";
    wishTitleEl.textContent = "Touch the glowing earth";
    wishNoteEl.textContent = "Each flower holds a birthday wish from Adeesha.";

    CFG.scene03.flowers.forEach((f, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "flower-slot";
      btn.dataset.index = String(idx);
      const [x, y] = SCATTER_POS[idx];
      btn.style.left = `${x}%`;
      btn.style.top = `${y}%`;
      btn.setAttribute("aria-label", `Flower ${idx + 1}: ${f.quality}`);
      btn.innerHTML = `<span class="seed-mound"></span>${ILL.createFlowerSvg(idx, f.palette)}`;

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        bloomFlower(idx);
      });

      gardenStage.appendChild(btn);
      flowerSlots.push(btn);
    });
  }

  function bloomFlower(idx) {
    const slot = flowerSlots[idx];
    const data = CFG.scene03.flowers[idx];
    if (!slot || !data) return;

    const r = slot.getBoundingClientRect();
    fx.spawnSparkles(r.left + r.width / 2, r.top + r.height / 2, 16);
    audio.playSfx("chime");

    if (!slot.dataset.bloomed) {
      slot.dataset.bloomed = "true";
      slot.classList.add("is-bloomed");
      state.bloomedCount++;
      bloomCounterEl.textContent = `${state.bloomedCount} / 24 Bloomed`;
    }

    wishTitleEl.textContent = `${idx + 1}. ${data.quality}`;
    wishNoteEl.textContent = data.note;

    if (state.bloomedCount === 24 && !state.gardenArranged) {
      state.gardenArranged = true;
      setTimeout(() => {
        flowerSlots.forEach((s, i) => {
          const [hx, hy] = getHeartPoint(i, 24);
          s.style.left = `${hx.toFixed(1)}%`;
          s.style.top = `${hy.toFixed(1)}%`;
        });
        const gr = gardenStage.getBoundingClientRect();
        fx.spawnHeartBurst(gr.left + gr.width / 2, gr.top + gr.height / 2, 36);
        wishTitleEl.textContent = "A Heart of 24 Blooms ♡";
        wishNoteEl.textContent = CFG.scene03.completionText;
      }, 650);
    }
  }

  // ==========================================================================
  // SCENE 04 — OUR LITTLE UNIVERSE
  // ==========================================================================
  function initScene04() {
    document.getElementById("s4-title").textContent = CFG.scene04.title;
    document.getElementById("s4-hint").textContent = CFG.scene04.hint;
    document.getElementById("universe-scene-frame").innerHTML = ILL.createLittleUniverseSvg();

    const msgBox = document.getElementById("scene04-msg-box");
    const bindSpot = (id, msg) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("click", () => {
        const r = el.getBoundingClientRect();
        audio.playSfx("chime");
        fx.spawnSparkles(r.left + r.width / 2, r.top + r.height / 2, 20);
        msgBox.textContent = msg;
      });
    };

    bindSpot("scene04-moon", CFG.scene04.moonMessage);
    bindSpot("scene04-shooting-star", CFG.scene04.starMessage);
    bindSpot("scene04-fireflies", CFG.scene04.fireflyMessage);
    bindSpot("scene04-lake", CFG.scene04.lakeMessage);
  }

  // ==========================================================================
  // SCENE 05 — MY FUTURE DOCTOR
  // ==========================================================================
  function initScene05() {
    document.getElementById("doctor-stage").innerHTML = ILL.createDoctorSceneSvg();
    document.getElementById("doctor-badge-pill").textContent = CFG.person.professionTitle;
    document.getElementById("ecg-container").innerHTML = ILL.createEcgStripSvg();

    const storyBox = document.getElementById("doctor-story-box");
    storyBox.innerHTML = CFG.scene05.paragraphs.map((p) => `<p>${p}</p>`).join("");

    const transformBtn = document.getElementById("doc-transform-btn");
    transformBtn.textContent = CFG.scene05.transformButton;
    transformBtn.addEventListener("click", triggerDoctorTransformation);

    // Easter Egg: touch stethoscope for heartbeat sound
    document.getElementById("doc-stethoscope").addEventListener("click", (e) => {
      e.stopPropagation();
      if (!audio.enabled) {
        audio.unlockAndEnable(false);
      }
      audio.playSfx("heartbeat");
      const r = e.currentTarget.getBoundingClientRect();
      fx.spawnHeartBurst(r.left + r.width / 2, r.top + r.height / 2, 18);
      showWhisper(CFG.easterEggs.stethoscopeMessage, "Heartbeat ♡");
    });
  }

  function triggerDoctorTransformation() {
    const books = document.querySelectorAll(".floating-book");
    const coat = document.getElementById("doc-white-coat");
    const sweater = document.getElementById("doc-sweater");
    const hospitalBg = document.getElementById("doc-hospital-bg");
    const aura = document.getElementById("doc-aura");
    const badge = document.getElementById("doctor-badge-pill");

    audio.playSfx("chime");
    const stageRect = document.getElementById("doctor-stage").getBoundingClientRect();
    fx.spawnSparkles(stageRect.left + stageRect.width / 2, stageRect.top + stageRect.height / 2, 34);

    if (window.gsap) {
      gsap.to(books, { y: -55, rotation: -8, duration: 1.3, ease: "power2.out" });
      gsap.to(aura, { attr: { fill: "rgba(243,213,155,0.22)" }, duration: 1.2 });
      gsap.to(hospitalBg, { opacity: 1, duration: 1.4, delay: 0.3 });
      gsap.to(sweater, { opacity: 0, duration: 0.8, delay: 0.4 });
      gsap.to(coat, { opacity: 1, duration: 1.1, delay: 0.55 });
    } else {
      hospitalBg.style.opacity = "1";
      sweater.style.opacity = "0";
      coat.style.opacity = "1";
    }

    setTimeout(() => {
      badge.classList.add("visible");
      state.doctorTransformed = true;
      const btn = document.getElementById("doc-transform-btn");
      if (btn) btn.textContent = "Future Doctor Revealed ✨";
    }, 650);
  }

  function runScene05Anim() {
    const ecg = document.getElementById("ecg-heart-path");
    if (ecg && window.gsap) {
      gsap.set(ecg, { strokeDashoffset: 560 });
      gsap.to(ecg, { strokeDashoffset: 0, duration: 2.6, ease: "power2.inOut" });
    } else if (ecg) {
      ecg.style.strokeDashoffset = "0";
    }
    if (!state.doctorTransformed) {
      setTimeout(() => {
        if (currentScene === 4 && !state.doctorTransformed) {
          triggerDoctorTransformation();
        }
      }, 3400);
    }
  }

  // ==========================================================================
  // SCENE 06 — SPECIAL BIRTHDAY PRESCRIPTION
  // ==========================================================================
  function initScene06() {
    document.getElementById("rx-patient").textContent = CFG.scene06.patient;
    document.getElementById("rx-prescriber").textContent = CFG.scene06.prescriber;
    document.getElementById("rx-duration").textContent = CFG.scene06.duration;
    document.getElementById("rx-side-effects").textContent = CFG.scene06.sideEffects;
    document.getElementById("rx-refills").textContent = CFG.scene06.refills;
    document.getElementById("rx-date").textContent = CFG.person.celebrationDate;
    document.getElementById("rx-stamp-wrap").innerHTML = ILL.createRxStampSvg();

    const listEl = document.getElementById("rx-list");
    listEl.innerHTML = CFG.scene06.items.map((item) => `<li class="rx-item">${item}</li>`).join("");
  }

  function runScene06Anim() {
    if (state.rxAnimated) return;
    state.rxAnimated = true;

    const items = Array.from(document.querySelectorAll("#rx-list .rx-item"));
    const pen = document.getElementById("rx-pen-nib");
    const stamp = document.querySelector("#rx-stamp-wrap .rx-stamp");

    if (window.gsap) {
      gsap.set(pen, { opacity: 1, x: 30, y: 120 });
      items.forEach((item, i) => {
        const yPos = 112 + i * 24;
        gsap.to(pen, { x: 185, y: yPos, duration: 0.34, delay: i * 0.32, ease: "sine.inOut" });
        gsap.to(item, { opacity: 1, x: 0, duration: 0.38, delay: i * 0.32 + 0.08 });
      });
      gsap.to(pen, { opacity: 0, duration: 0.3, delay: items.length * 0.32 + 0.15 });
      setTimeout(() => {
        if (stamp) stamp.classList.add("stamped");
        audio.playSfx("chime");
      }, items.length * 320 + 250);
    } else {
      items.forEach((item) => {
        item.style.opacity = "1";
        item.style.transform = "none";
      });
      if (stamp) stamp.classList.add("stamped");
    }
  }

  // ==========================================================================
  // SCENE 07 — INTERACTIVE BIRTHDAY CAKE
  // ==========================================================================
  function initScene07() {
    document.getElementById("cake-svg-wrap").innerHTML = ILL.createBirthdayCakeSvg();
    const prompts = document.getElementById("cake-prompts");
    const blowBtn = document.getElementById("blow-candles-btn");
    const cakeStage = document.getElementById("cake-stage");

    prompts.innerHTML = `${CFG.scene07.prompt1}<span class="wish-sub">${CFG.scene07.prompt2}</span>`;
    blowBtn.textContent = CFG.scene07.buttonText;

    blowBtn.addEventListener("click", () => {
      if (state.candlesOut) {
        goToScene(7);
        return;
      }
      state.candlesOut = true;
      cakeStage.classList.add("candles-out");

      const rect = cakeStage.getBoundingClientRect();
      fx.spawnSmoke(rect.left + rect.width * 0.46, rect.top + rect.height * 0.28, 12);
      fx.spawnSmoke(rect.left + rect.width * 0.56, rect.top + rect.height * 0.28, 12);

      // Brief warm dim followed by celebratory burst!
      if (window.gsap) {
        gsap.to("#cake-balloons", { y: -150, opacity: 0.2, duration: 2.2, ease: "power1.in" });
      }
      setTimeout(() => {
        audio.playSfx("celebration");
        fx.spawnConfetti(85);
        fx.spawnHeartBurst(window.innerWidth * 0.3, window.innerHeight * 0.26, 26);
        fx.spawnHeartBurst(window.innerWidth * 0.7, window.innerHeight * 0.26, 26);
        prompts.innerHTML = `<strong class="glow-gold">${CFG.scene07.wishHeadline}</strong><span class="wish-sub">${CFG.scene07.wishSub}</span>`;
        blowBtn.textContent = "Read Your Love Letter ♡";
      }, 420);
    });
  }

  function runScene07Anim() {
    if (window.gsap && !state.candlesOut) {
      gsap.fromTo("#cake-svg-wrap", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "back.out(1.2)" });
    }
  }

  // ==========================================================================
  // SCENE 08 — A SECRET LOVE LETTER
  // ==========================================================================
  function initScene08() {
    const sealedBox = document.getElementById("letter-sealed-box");
    const letterPaper = document.getElementById("letter-paper");
    const letterBody = document.getElementById("letter-body");
    document.getElementById("letter-tap-hint").textContent = CFG.scene08.tapHint;
    document.getElementById("letter-signature-svg-wrap").innerHTML = ILL.createSignatureSvg();

    const openLetter = () => {
      if (state.letterOpened) return;
      state.letterOpened = true;
      audio.playSfx("envelope");
      sealedBox.style.display = "none";
      letterPaper.classList.add("is-open");

      // Gentle typewriter paragraph reveal
      letterBody.innerHTML = "";
      const paras = CFG.scene08.letterParagraphs;
      paras.forEach((p, idx) => {
        const el = document.createElement("p");
        el.style.opacity = "0";
        el.textContent = p;
        letterBody.appendChild(el);
        setTimeout(() => {
          el.style.transition = "opacity 0.55s ease";
          el.style.opacity = "1";
        }, idx * 240);
      });

      // Animate signature path drawing
      setTimeout(() => {
        const sig = document.getElementById("signature-stroke");
        if (sig && window.gsap) {
          gsap.to(sig, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" });
        } else if (sig) {
          sig.style.strokeDashoffset = "0";
        }
      }, paras.length * 190);
    };

    sealedBox.addEventListener("click", openLetter);
    sealedBox.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLetter();
      }
    });

    // Easter Egg: touch handwritten signature
    document.getElementById("letter-signature-wrap").addEventListener("click", (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      audio.playSfx("chime");
      fx.spawnHeartBurst(r.left + r.width / 2, r.top + r.height / 2, 22);
      showWhisper(CFG.easterEggs.signatureMessage, "Signed with Love ♡");
    });
  }

  // ==========================================================================
  // SCENE 09 — A VIRTUAL HUG
  // ==========================================================================
  function initScene09() {
    document.getElementById("s9-title").textContent = CFG.scene09.title;
    const hugStage = document.getElementById("hug-stage");
    hugStage.innerHTML = ILL.createHugSvg();

    const hugBtn = document.getElementById("hug-btn");
    const hugMsg = document.getElementById("hug-message-box");
    hugBtn.textContent = CFG.scene09.buttonText;

    hugBtn.addEventListener("click", () => {
      const r = hugStage.getBoundingClientRect();
      if (!state.hugged) {
        state.hugged = true;
        hugStage.classList.add("is-hugging");
        audio.playSfx("chime");
        setTimeout(() => {
          fx.spawnHeartBurst(r.left + r.width / 2, r.top + r.height * 0.45, 34);
          hugMsg.innerHTML = `<p style="margin:0 0 6px;">${CFG.scene09.message1}</p><p class="glow-rose" style="margin:0; font-style:italic;">${CFG.scene09.message2}</p>`;
          hugBtn.textContent = "Send Another Squeeze ♡";
        }, 750);
      } else {
        audio.playSfx("chime");
        fx.spawnHeartBurst(r.left + r.width / 2, r.top + r.height * 0.45, 28);
      }
    });
  }

  // ==========================================================================
  // SCENE 10 — GRAND FINALE & REPLAY
  // ==========================================================================
  function initScene10() {
    document.getElementById("finale-stage").innerHTML = ILL.createFinaleSvg();
    document.getElementById("s10-line1").textContent = CFG.scene10.line1;
    document.getElementById("s10-line2").textContent = CFG.scene10.line2;
    document.getElementById("s10-line3").textContent = CFG.scene10.line3;
    document.getElementById("s10-credit1").textContent = CFG.scene10.credit1;
    document.getElementById("s10-credit2").textContent = CFG.scene10.credit2;

    const secretBtn = document.getElementById("last-secret-btn");
    const replayBtn = document.getElementById("replay-btn");
    const secretBox = document.getElementById("finale-secret-box");

    secretBtn.textContent = CFG.scene10.secretButton;
    replayBtn.textContent = CFG.scene10.replayButton;
    document.getElementById("s10-secret1").textContent = CFG.scene10.secretLine1;
    document.getElementById("s10-secret2").textContent = CFG.scene10.secretLine2;

    secretBtn.addEventListener("click", () => {
      state.secretRevealed = true;
      secretBox.classList.add("visible");
      audio.playSfx("celebration");
      fx.spawnHeartBurst(window.innerWidth / 2, window.innerHeight * 0.38, 42);
    });

    // Optional Memories Modal (if photos[] is configured)
    if (Array.isArray(CFG.photos) && CFG.photos.length > 0) {
      const photosBtn = document.getElementById("photos-btn");
      const photosModal = document.getElementById("photos-modal");
      const photosGrid = document.getElementById("photos-grid");
      photosBtn.style.display = "inline-flex";
      photosGrid.innerHTML = CFG.photos
        .map((p) => `<div class="photo-frame"><img src="${p.src}" alt="${p.caption || "Memory"}" loading="lazy"/><span>${p.caption || ""}</span></div>`)
        .join("");
      photosBtn.addEventListener("click", () => photosModal.classList.add("open"));
      document.getElementById("close-photos-btn").addEventListener("click", () => photosModal.classList.remove("open"));
    }

    replayBtn.addEventListener("click", resetAndReplay);
  }

  function runScene10Anim() {
    fx.setPetalsEnabled(true);
    fx.spawnButterflies(3);
    fx.setFireworksLoop(true);
  }

  function resetAndReplay() {
    state.s1Opened = false;
    state.doctorTransformed = false;
    state.rxAnimated = false;
    state.candlesOut = false;
    state.letterOpened = false;
    state.hugged = false;
    state.secretRevealed = false;

    // Reset Scene 01
    envelopeStage.classList.remove("is-opened");
    // Reset Scene 03
    buildFlowerGarden();
    // Reset Scene 05
    document.getElementById("doctor-badge-pill").classList.remove("visible");
    document.getElementById("doc-transform-btn").textContent = CFG.scene05.transformButton;
    if (window.gsap) {
      gsap.set("#doc-hospital-bg", { opacity: 0 });
      gsap.set("#doc-sweater", { opacity: 1 });
      gsap.set("#doc-white-coat", { opacity: 0 });
      gsap.set(".floating-book", { y: 0, rotation: 0 });
      gsap.set("#cake-balloons", { y: 0, opacity: 1 });
    }
    // Reset Scene 06
    document.querySelectorAll("#rx-list .rx-item").forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateX(-8px)";
    });
    const stamp = document.querySelector("#rx-stamp-wrap .rx-stamp");
    if (stamp) stamp.classList.remove("stamped");
    // Reset Scene 07
    document.getElementById("cake-stage").classList.remove("candles-out");
    document.getElementById("cake-prompts").innerHTML = `${CFG.scene07.prompt1}<span class="wish-sub">${CFG.scene07.prompt2}</span>`;
    document.getElementById("blow-candles-btn").textContent = CFG.scene07.buttonText;
    // Reset Scene 08
    document.getElementById("letter-sealed-box").style.display = "block";
    document.getElementById("letter-paper").classList.remove("is-open");
    const sig = document.getElementById("signature-stroke");
    if (sig) sig.style.strokeDashoffset = "420";
    // Reset Scene 09
    document.getElementById("hug-stage").classList.remove("is-hugging");
    document.getElementById("hug-message-box").innerHTML = "";
    document.getElementById("hug-btn").textContent = CFG.scene09.buttonText;
    // Reset Scene 10
    document.getElementById("finale-secret-box").classList.remove("visible");

    goToScene(0);
  }

  // ==========================================================================
  // HIDDEN HEART EASTER EGG
  // ==========================================================================
  document.getElementById("hidden-heart-trigger").addEventListener("click", (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    audio.playSfx("chime");
    fx.spawnHeartBurst(r.left + r.width / 2, r.top + r.height / 2, 24);
    showWhisper(CFG.easterEggs.hiddenHeartNote, "Secret Note ♡", 5000);
  });

  // ==========================================================================
  // BOOTSTRAP
  // ==========================================================================
  buildProgressStars();
  initScene01();
  initScene02();
  initScene03();
  initScene04();
  initScene05();
  initScene06();
  initScene07();
  initScene08();
  initScene09();
  initScene10();
  updateChrome();
  runScene01Intro();
})();
