/**
 * ============================================================================
 *  PARTICLE ENGINE, BUTTERFLIES, CONFETTI, HEART FIREWORKS & SMOKE
 *  High-FPS Canvas 2D + interactive SVG butterflies. Automatically scales
 *  particle counts for mobile and respects prefers-reduced-motion.
 * ============================================================================
 */

class MagicalEffectsEngine {
  constructor(ambientCanvas, fxCanvas, butterflyLayer, onButterflyTap) {
    this.ambientCanvas = ambientCanvas;
    this.fxCanvas = fxCanvas;
    this.aCtx = ambientCanvas.getContext("2d");
    this.fCtx = fxCanvas.getContext("2d");
    this.butterflyLayer = butterflyLayer;
    this.onButterflyTap = onButterflyTap;

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.stars = [];
    this.petals = [];
    this.fxParticles = [];
    this.butterflies = [];
    this.petalsActive = false;
    this.fireworksLoopActive = false;
    this.fireworkTimer = 0;

    this.parallaxX = 0;
    this.parallaxY = 0;

    this.resize();
    this._initStars();
    window.addEventListener("resize", () => this.resize());
    window.addEventListener("pointermove", (e) => {
      this.parallaxX = (e.clientX / Math.max(1, this.width) - 0.5) * 18;
      this.parallaxY = (e.clientY / Math.max(1, this.height) - 0.5) * 14;
    }, { passive: true });

    this._rafId = null;
    this._lastTime = performance.now();
    this.start();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    [this.ambientCanvas, this.fxCanvas].forEach((c) => {
      c.width = Math.floor(this.width * this.dpr);
      c.height = Math.floor(this.height * this.dpr);
      c.style.width = `${this.width}px`;
      c.style.height = `${this.height}px`;
    });

    this.aCtx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.fCtx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  _initStars() {
    const count = this.reducedMotion ? 35 : 85;
    this.stars = Array.from({ length: count }, () => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      r: 0.6 + Math.random() * 1.8,
      depth: 0.25 + Math.random() * 0.75,
      twinkle: Math.random() * Math.PI * 2,
      speed: 0.8 + Math.random() * 1.6,
      hue: Math.random() < 0.28 ? "#f9c6d7" : Math.random() < 0.55 ? "#f3d59b" : "#fdf8f2"
    }));
  }

  setPetalsEnabled(flag) {
    this.petalsActive = flag && !this.reducedMotion;
    if (this.petalsActive && this.petals.length < 18) {
      for (let i = 0; i < 18; i++) {
        this.petals.push(this._makePetal(true));
      }
    }
  }

  setFireworksLoop(flag) {
    this.fireworksLoopActive = flag && !this.reducedMotion;
    this.fireworkTimer = 0.2;
  }

  _makePetal(randomY = false) {
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -20,
      vx: -0.45 + Math.random() * 0.9,
      vy: 0.7 + Math.random() * 0.95,
      size: 5 + Math.random() * 5.5,
      rot: Math.random() * Math.PI * 2,
      vRot: -0.03 + Math.random() * 0.06,
      color: Math.random() < 0.6 ? "rgba(242, 140, 177, 0.72)" : "rgba(249, 198, 215, 0.72)"
    };
  }

  spawnSparkles(cx, cy, count = 20, colors = ["#f3d59b", "#f28cb1", "#c8b6ff", "#fdf8f2"]) {
    const total = this.reducedMotion ? Math.min(8, count) : count;
    for (let i = 0; i < total; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.1 + Math.random() * 3.8;
      this.fxParticles.push({
        type: "spark",
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.6,
        size: 1.8 + Math.random() * 3.2,
        life: 1,
        decay: 0.015 + Math.random() * 0.015,
        gravity: 0.04,
        color: colors[i % colors.length]
      });
    }
  }

  spawnHeartBurst(cx, cy, count = 28) {
    const total = this.reducedMotion ? 12 : count;
    for (let i = 0; i < total; i++) {
      const t = (i / total) * Math.PI * 2;
      // Parametric heart velocity
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      const scale = 0.16 + Math.random() * 0.07;
      this.fxParticles.push({
        type: "spark",
        x: cx,
        y: cy,
        vx: hx * scale,
        vy: hy * scale,
        size: 2.5 + Math.random() * 2.2,
        life: 1,
        decay: 0.012 + Math.random() * 0.008,
        gravity: 0.02,
        color: i % 3 === 0 ? "#f3d59b" : i % 2 === 0 ? "#f28cb1" : "#f9c6d7"
      });
    }
  }

  spawnConfetti(count = 70) {
    const total = this.reducedMotion ? 20 : count;
    const palette = ["#f28cb1", "#f3d59b", "#c8b6ff", "#fdf8f2", "#ff9ebb"];
    for (let i = 0; i < total; i++) {
      this.fxParticles.push({
        type: "confetti",
        x: this.width * (0.15 + Math.random() * 0.7),
        y: this.height * 0.35 + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 7,
        vy: -4 - Math.random() * 6,
        w: 6 + Math.random() * 5,
        h: 4 + Math.random() * 4,
        rot: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.25,
        life: 1,
        decay: 0.0065 + Math.random() * 0.004,
        gravity: 0.14,
        color: palette[i % palette.length]
      });
    }
  }

  spawnSmoke(cx, cy, count = 16) {
    for (let i = 0; i < count; i++) {
      this.fxParticles.push({
        type: "smoke",
        x: cx + (Math.random() - 0.5) * 14,
        y: cy,
        vx: (Math.random() - 0.5) * 0.7,
        vy: -0.9 - Math.random() * 1.1,
        size: 5 + Math.random() * 7,
        life: 1,
        decay: 0.012 + Math.random() * 0.008,
        gravity: -0.01,
        color: "rgba(232, 224, 240, 0.45)"
      });
    }
  }

  spawnButterflies(count = 3) {
    this.clearButterflies();
    const hues = [
      ["#f28cb1", "#ffd6e6"],
      ["#c8b6ff", "#efe7ff"],
      ["#f3d59b", "#fff5db"]
    ];

    for (let i = 0; i < count; i++) {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "interactive-butterfly";
      el.setAttribute("aria-label", "Magical butterfly");
      const [c1, c2] = hues[i % hues.length];
      el.innerHTML = `
        <svg viewBox="0 0 48 48" width="36" height="36" aria-hidden="true">
          <g class="butterfly-wing-l">
            <path d="M24 24 C14 8 3 12 6 24 C8 32 18 30 24 25 Z" fill="${c1}" opacity="0.9"/>
            <path d="M24 25 C15 28 10 38 17 40 C22 41 24 34 24 25 Z" fill="${c2}" opacity="0.85"/>
          </g>
          <g class="butterfly-wing-r">
            <path d="M24 24 C34 8 45 12 42 24 C40 32 30 30 24 25 Z" fill="${c1}" opacity="0.9"/>
            <path d="M24 25 C33 28 38 38 31 40 C26 41 24 34 24 25 Z" fill="${c2}" opacity="0.85"/>
          </g>
          <line x1="24" y1="15" x2="24" y2="34" stroke="#fdf8f2" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      `;

      const state = {
        el,
        x: this.width * (0.12 + Math.random() * 0.74),
        y: this.height * (0.11 + Math.random() * 0.14),
        phase: Math.random() * Math.PI * 2,
        speedX: 0.45 + Math.random() * 0.45,
        ampY: 12 + Math.random() * 14,
        dir: Math.random() < 0.5 ? 1 : -1
      };

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        const rect = el.getBoundingClientRect();
        this.spawnSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 18);
        if (this.onButterflyTap) {
          this.onButterflyTap();
        }
      });

      this.butterflyLayer.appendChild(el);
      this.butterflies.push(state);
    }
  }

  clearButterflies() {
    this.butterflies.forEach((b) => b.el.remove());
    this.butterflies = [];
  }

  start() {
    const tick = (now) => {
      const dt = Math.min(0.05, (now - this._lastTime) / 1000);
      this._lastTime = now;
      this._update(dt, now / 1000);
      this._draw();
      this._rafId = requestAnimationFrame(tick);
    };
    this._rafId = requestAnimationFrame(tick);
  }

  _update(dt, timeSec) {
    // Update butterflies
    for (const b of this.butterflies) {
      if (!this.reducedMotion) {
        b.x += b.dir * b.speedX * 42 * dt;
        b.phase += dt * 1.9;
        if (b.x > this.width - 42) b.dir = -1;
        if (b.x < 10) b.dir = 1;
      }
      const py = b.y + Math.sin(b.phase) * b.ampY;
      b.el.style.transform = `translate3d(${b.x.toFixed(1)}px, ${py.toFixed(1)}px, 0) scaleX(${b.dir})`;
    }

    // Update petals
    if (this.petalsActive) {
      for (let i = 0; i < this.petals.length; i++) {
        const p = this.petals[i];
        p.x += p.vx + Math.sin(timeSec + i) * 0.35;
        p.y += p.vy;
        p.rot += p.vRot;
        if (p.y > this.height + 24) {
          this.petals[i] = this._makePetal(false);
        }
      }
    } else if (this.petals.length > 0) {
      this.petals = [];
    }

    // Finale fireworks loop
    if (this.fireworksLoopActive) {
      this.fireworkTimer -= dt;
      if (this.fireworkTimer <= 0) {
        this.spawnHeartBurst(
          this.width * (0.2 + Math.random() * 0.6),
          this.height * (0.16 + Math.random() * 0.3),
          26
        );
        this.fireworkTimer = 1.35 + Math.random() * 0.9;
      }
    }

    // Update FX particles
    for (let i = this.fxParticles.length - 1; i >= 0; i--) {
      const p = this.fxParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      if (p.rot !== undefined) p.rot += p.vRot;
      if (p.type === "smoke") p.size += 0.18;
      p.life -= p.decay;
      if (p.life <= 0) {
        this.fxParticles.splice(i, 1);
      }
    }
  }

  _draw() {
    this.aCtx.clearRect(0, 0, this.width, this.height);
    this.fCtx.clearRect(0, 0, this.width, this.height);

    // Draw twinkling parallax stars
    const now = performance.now() / 1000;
    for (const s of this.stars) {
      const alpha = this.reducedMotion ? 0.65 : 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(now * s.speed + s.twinkle));
      const px = s.x + this.parallaxX * s.depth;
      const py = s.y + this.parallaxY * s.depth;
      this.aCtx.globalAlpha = alpha;
      this.aCtx.fillStyle = s.hue;
      this.aCtx.beginPath();
      this.aCtx.arc(px, py, s.r, 0, Math.PI * 2);
      this.aCtx.fill();
    }
    this.aCtx.globalAlpha = 1;

    // Draw floating rose petals
    for (const p of this.petals) {
      this.fCtx.save();
      this.fCtx.translate(p.x, p.y);
      this.fCtx.rotate(p.rot);
      this.fCtx.fillStyle = p.color;
      this.fCtx.beginPath();
      this.fCtx.ellipse(0, 0, p.size, p.size * 0.58, 0, 0, Math.PI * 2);
      this.fCtx.fill();
      this.fCtx.restore();
    }

    // Draw FX particles (sparkles, confetti, smoke)
    for (const p of this.fxParticles) {
      this.fCtx.save();
      this.fCtx.globalAlpha = Math.max(0, p.life);
      if (p.type === "spark") {
        this.fCtx.fillStyle = p.color;
        this.fCtx.beginPath();
        this.fCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.fCtx.fill();
      } else if (p.type === "confetti") {
        this.fCtx.translate(p.x, p.y);
        this.fCtx.rotate(p.rot);
        this.fCtx.fillStyle = p.color;
        this.fCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      } else if (p.type === "smoke") {
        this.fCtx.fillStyle = p.color;
        this.fCtx.beginPath();
        this.fCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.fCtx.fill();
      }
      this.fCtx.restore();
    }
  }
}

window.MagicalEffectsEngine = MagicalEffectsEngine;
