/**
 * ============================================================================
 *  ROMANTIC AUDIO ENGINE
 *  Uses local WAV/MP3 files from assets/audio/ with Web Audio API fallback,
 *  explicit user-gesture unlock (iOS Safari safe), and smooth fades.
 * ============================================================================
 */

class RomanticAudioEngine {
  constructor(config) {
    this.config = config;
    this.enabled = false;
    this.unlocked = false;
    this.bgAudio = null;
    this.sfxCache = {};
    this.audioCtx = null;
    this.musicStarted = false;
    this.onChangeCallbacks = [];
  }

  onChange(cb) {
    this.onChangeCallbacks.push(cb);
  }

  _notify() {
    this.onChangeCallbacks.forEach((cb) => cb(this.enabled));
  }

  _ensureContext() {
    if (!this.audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) {
        this.audioCtx = new Ctx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume().catch(() => {});
    }
  }

  _initElements() {
    if (!this.bgAudio && this.config.bgMusic) {
      const a = new Audio(this.config.bgMusic);
      a.loop = true;
      a.preload = "auto";
      a.volume = 0;
      this.bgAudio = a;
    }

    const sfxKeys = ["chime", "envelope", "heartbeat", "celebration"];
    sfxKeys.forEach((key) => {
      if (!this.sfxCache[key] && this.config[key]) {
        const s = new Audio(this.config[key]);
        s.preload = "auto";
        s.volume = this.config.sfxVolume ?? 0.55;
        this.sfxCache[key] = s;
      }
    });
  }

  unlockAndEnable(autoStartMusic = true) {
    this._ensureContext();
    this._initElements();
    this.unlocked = true;
    this.enabled = true;
    this._notify();
    if (autoStartMusic) {
      this.startBackgroundMusic();
    }
  }

  toggle() {
    if (!this.unlocked) {
      this.unlockAndEnable(true);
      return this.enabled;
    }
    this.enabled = !this.enabled;
    if (this.enabled) {
      this._ensureContext();
      this.startBackgroundMusic();
    } else {
      this.pauseBackgroundMusic();
    }
    this._notify();
    return this.enabled;
  }

  startBackgroundMusic() {
    if (!this.enabled) return;
    this._initElements();
    if (!this.bgAudio) return;

    const targetVol = this.config.musicVolume ?? 0.42;
    this.bgAudio.play().then(() => {
      this.musicStarted = true;
      this._fadeAudio(this.bgAudio, targetVol, 1200);
    }).catch(() => {
      // Autoplay blocked or headless environment; graceful fallback
    });
  }

  pauseBackgroundMusic() {
    if (this.bgAudio && !this.bgAudio.paused) {
      this._fadeAudio(this.bgAudio, 0, 450, () => {
        this.bgAudio.pause();
      });
    }
  }

  _fadeAudio(audioEl, targetVolume, durationMs, onComplete) {
    const startVol = audioEl.volume;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min(1, (now - startTime) / durationMs);
      audioEl.volume = Math.max(0, Math.min(1, startVol + (targetVolume - startVol) * progress));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else if (onComplete) {
        onComplete();
      }
    };
    requestAnimationFrame(step);
  }

  playSfx(name) {
    if (!this.enabled) return;
    this._ensureContext();
    this._initElements();

    const template = this.sfxCache[name];
    if (template) {
      try {
        const clone = template.cloneNode(true);
        clone.volume = this.config.sfxVolume ?? 0.55;
        clone.play().catch(() => this._synthFallback(name));
        return;
      } catch {
        // fallback below
      }
    }
    this._synthFallback(name);
  }

  _synthFallback(name) {
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;

    const playTone = (freq, startOffset, dur, gainPeak = 0.12) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + startOffset);
      gain.gain.setValueAtTime(0.0001, now + startOffset);
      gain.gain.linearRampToValueAtTime(gainPeak, now + startOffset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + startOffset + dur);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now + startOffset);
      osc.stop(now + startOffset + dur);
    };

    if (name === "chime") {
      [1046.5, 1318.5, 1567.98].forEach((f, i) => playTone(f, i * 0.07, 0.8, 0.09));
    } else if (name === "envelope") {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => playTone(f, i * 0.06, 0.65, 0.09));
    } else if (name === "heartbeat") {
      playTone(62, 0.02, 0.16, 0.25);
      playTone(50, 0.24, 0.16, 0.2);
    } else if (name === "celebration") {
      [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98].forEach((f, i) => playTone(f, i * 0.08, 1.0, 0.1));
    }
  }
}

window.RomanticAudioEngine = RomanticAudioEngine;
