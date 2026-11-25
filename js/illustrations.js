/**
 * ============================================================================
 *  BESPOKE HAND-CRAFTED SVG ILLUSTRATIONS
 *  Original layered vector art for every scene (no emoji replacements).
 * ============================================================================
 */

window.BirthdayIllustrations = {
  /**
   * 1. Sealed Envelope for Scene 01
   */
  createEnvelopeSvg() {
    return `
      <svg class="envelope-svg" viewBox="0 0 310 215" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="envBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fdf4ea"/>
            <stop offset="55%" stop-color="#f6e3d4"/>
            <stop offset="100%" stop-color="#ebd0c4"/>
          </linearGradient>
          <linearGradient id="envFlap" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fffaf4"/>
            <stop offset="100%" stop-color="#f0d5c8"/>
          </linearGradient>
          <radialGradient id="waxGrad" cx="38%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#f48fb1"/>
            <stop offset="55%" stop-color="#c94572"/>
            <stop offset="100%" stop-color="#871f46"/>
          </radialGradient>
          <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#e5be7d"/>
            <stop offset="50%" stop-color="#fff0c9"/>
            <stop offset="100%" stop-color="#c9954c"/>
          </linearGradient>
        </defs>

        <!-- Back base -->
        <rect x="14" y="34" width="282" height="168" rx="14" fill="#dfbfb4"/>

        <!-- Inner peeking card -->
        <g class="envelope-card-peek">
          <rect x="30" y="42" width="250" height="148" rx="10" fill="#fffdf9" stroke="url(#goldTrim)" stroke-width="1.4"/>
          <path d="M44 58 H120 M44 68 H95" stroke="#d8b28e" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
          <path d="M155 62 C155 62 145 55 145 48 C145 44 148.5 41 152 41 C154 41 155 42.3 155 43.4 C155 42.3 156 41 158 41 C161.5 41 165 44 165 48 C165 55 155 62 155 62 Z" fill="#e57a9e" opacity="0.85"/>
        </g>

        <!-- Envelope pocket front folds -->
        <path d="M14 42 L155 130 L296 42 L296 188 C296 196 290 202 282 202 L28 202 C20 202 14 196 14 188 Z" fill="url(#envBody)" stroke="url(#goldTrim)" stroke-width="1.3"/>
        <path d="M14 196 L112 118 M296 196 L198 118" stroke="#d6b4a4" stroke-width="1.2" opacity="0.65"/>

        <!-- Gold filigree border -->
        <rect x="22" y="42" width="266" height="152" rx="10" fill="none" stroke="url(#goldTrim)" stroke-width="0.9" stroke-dasharray="4 3" opacity="0.65"/>

        <!-- Top flap -->
        <g class="envelope-flap">
          <path d="M14 42 C14 37 19 34 25 34 L285 34 C291 34 296 37 296 42 L155 134 Z" fill="url(#envFlap)" stroke="url(#goldTrim)" stroke-width="1.4"/>
        </g>

        <!-- Heart-shaped wax seal -->
        <g class="wax-seal-group">
          <circle cx="155" cy="118" r="24" fill="url(#waxGrad)" stroke="#f7d59b" stroke-width="1.2"/>
          <circle cx="155" cy="118" r="19.5" fill="none" stroke="rgba(255,235,240,0.42)" stroke-width="1"/>
          <path d="M155 129 C155 129 143 121 143 113.5 C143 109.5 146.2 106.5 150 106.5 C152.3 106.5 154.1 107.7 155 109.4 C155.9 107.7 157.7 106.5 160 106.5 C163.8 106.5 167 109.5 167 113.5 C167 121 155 129 155 129 Z" fill="#ffdce7" stroke="#b93262" stroke-width="0.8"/>
        </g>
      </svg>
    `;
  },

  /**
   * 2. Scene 02 Constellation Heart & Starry "24"
   */
  createConstellationSvg() {
    const heartStars = [
      [170, 56], [142, 34], [108, 36], [82, 62], [86, 98],
      [118, 134], [170, 174], [222, 134], [254, 98], [258, 62],
      [232, 36], [198, 34], [170, 56]
    ];
    const polyPoints = heartStars.map((p) => p.join(",")).join(" ");
    const starNodes = heartStars.slice(0, -1).map(([x, y], idx) => `
      <g class="constellation-node" pointer-events="none" style="animation-delay:${idx * 0.14}s">
        <circle cx="${x}" cy="${y}" r="6" fill="rgba(242,140,177,0.22)"/>
        <circle cx="${x}" cy="${y}" r="2.6" fill="#fdf8f2"/>
      </g>
    `).join("");

    return `
      <svg class="constellation-svg" viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="constLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f3d59b"/>
            <stop offset="50%" stop-color="#f28cb1"/>
            <stop offset="100%" stop-color="#c8b6ff"/>
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- Soft nebula halo -->
        <ellipse cx="170" cy="105" rx="125" ry="74" fill="rgba(242, 140, 177, 0.08)" pointer-events="none"/>

        <!-- Heart constellation connecting path -->
        <polyline id="heart-constellation-line"
          points="${polyPoints}"
          fill="rgba(242,140,177,0.06)"
          stroke="url(#constLine)"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="620"
          stroke-dashoffset="620"
          pointer-events="none"
          filter="url(#softGlow)"/>

        ${starNodes}

        <!-- Interactive Glowing "24" built from stars & luminous strokes -->
        <g id="constellation-24" class="num24-hitbox" filter="url(#softGlow)" role="button" aria-label="24">
          <title>Touch 24</title>
          <rect x="112" y="64" width="116" height="72" fill="transparent"/>
          <!-- Digit 2 -->
          <path d="M126 88 C126 76 140 72 150 77 C160 82 160 95 148 104 L125 123 L161 123"
            fill="none" stroke="#f3d59b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Digit 4 -->
          <path d="M204 75 L178 109 L214 109 M204 75 L204 124"
            fill="none" stroke="#f9c6d7" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Star accents on 24 -->
          <circle cx="126" cy="88" r="2.5" fill="#fff"/>
          <circle cx="156" cy="83" r="2.8" fill="#fff"/>
          <circle cx="161" cy="123" r="2.5" fill="#fff"/>
          <circle cx="204" cy="75" r="3" fill="#fff"/>
          <circle cx="178" cy="109" r="2.5" fill="#fff"/>
          <circle cx="204" cy="124" r="2.8" fill="#fff"/>
        </g>
      </svg>
    `;
  },

  /**
   * 3. Botanical Flower SVG (6 unique blossom shapes, 4 palettes)
   */
  createFlowerSvg(index, palette = "rose") {
    const palettes = {
      rose: { main: "#f28cb1", light: "#ffd9e8", deep: "#be4875", center: "#f7d78e" },
      lavender: { main: "#b89eff", light: "#ebe3ff", deep: "#795bc9", center: "#fce5a8" },
      gold: { main: "#f3cb7d", light: "#fff1cf", deep: "#c48a34", center: "#fff7e5" },
      ivory: { main: "#fdf6ec", light: "#ffffff", deep: "#d9b9b0", center: "#f2a0b8" }
    };
    const p = palettes[palette] || palettes.rose;
    const variant = index % 4;

    let blossom = "";
    if (variant === 0) {
      // Romantic Rose
      blossom = `
        <g transform="translate(22, 18)">
          <circle cx="-6" cy="1" r="7.5" fill="${p.deep}"/>
          <circle cx="6" cy="1" r="7.5" fill="${p.deep}"/>
          <circle cx="0" cy="-5" r="8" fill="${p.main}"/>
          <circle cx="-4" cy="2" r="6" fill="${p.main}"/>
          <circle cx="4" cy="2" r="6" fill="${p.main}"/>
          <circle cx="0" cy="0" r="5" fill="${p.light}"/>
          <path d="M-2.5 0 C-2.5 -2.2 2.5 -2.2 2.5 0.5 C2.5 2.5 -1.5 2.8 -1.5 1" fill="none" stroke="${p.deep}" stroke-width="1.2" stroke-linecap="round"/>
        </g>`;
    } else if (variant === 1) {
      // 6-Petal Starry Cosmos
      blossom = `
        <g transform="translate(22, 18)">
          ${[0, 60, 120, 180, 240, 300].map((a) => `
            <ellipse cx="0" cy="-7" rx="4.2" ry="7.8" fill="${p.main}" transform="rotate(${a})" opacity="0.92"/>
          `).join("")}
          ${[30, 150, 270].map((a) => `
            <ellipse cx="0" cy="-5.5" rx="3.2" ry="6" fill="${p.light}" transform="rotate(${a})" opacity="0.7"/>
          `).join("")}
          <circle cx="0" cy="0" r="3.8" fill="${p.center}"/>
        </g>`;
    } else if (variant === 2) {
      // Graceful Tulip
      blossom = `
        <g transform="translate(22, 18)">
          <path d="M-8 -4 C-9 6 -4 10 0 10 C4 10 9 6 8 -4 C5 0 2 0 0 -8 C-2 0 -5 0 -8 -4 Z" fill="${p.main}"/>
          <path d="M-4 -5 C-2 3 0 6 0 9 C0 6 2 3 4 -5 C2 -1 0 -9 0 -9 C0 -9 -2 -1 -4 -5 Z" fill="${p.light}" opacity="0.88"/>
        </g>`;
    } else {
      // Lotus / Peony
      blossom = `
        <g transform="translate(22, 18)">
          <ellipse cx="-6" cy="2" rx="6" ry="8" transform="rotate(-25 -6 2)" fill="${p.deep}" opacity="0.9"/>
          <ellipse cx="6" cy="2" rx="6" ry="8" transform="rotate(25 6 2)" fill="${p.deep}" opacity="0.9"/>
          <ellipse cx="-3.5" cy="0" rx="5.2" ry="8.2" transform="rotate(-12 -3.5 0)" fill="${p.main}"/>
          <ellipse cx="3.5" cy="0" rx="5.2" ry="8.2" transform="rotate(12 3.5 0)" fill="${p.main}"/>
          <ellipse cx="0" cy="-1" rx="4.5" ry="8.5" fill="${p.light}"/>
          <circle cx="0" cy="2" r="2.6" fill="${p.center}"/>
        </g>`;
    }

    return `
      <svg viewBox="0 0 44 58" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M22 55 Q20 40 22 25" fill="none" stroke="#5eb589" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M21 43 Q12 39 11 33 Q17 34 21 40 Z" fill="#4f9f78"/>
        <path d="M22 39 Q31 35 32 29 Q26 30 22 36 Z" fill="#63bd8f"/>
        ${blossom}
      </svg>
    `;
  },

  /**
   * 4. Scene 04 "Our Little Universe" — Moonlit Lake & Couple
   */
  createLittleUniverseSvg() {
    return `
      <svg class="universe-svg" viewBox="0 0 370 375" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff9e8"/>
            <stop offset="55%" stop-color="#f5d99c"/>
            <stop offset="100%" stop-color="rgba(245,217,156,0)"/>
          </radialGradient>
          <linearGradient id="lakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#191642"/>
            <stop offset="50%" stop-color="#13193b"/>
            <stop offset="100%" stop-color="#0b0f26"/>
          </linearGradient>
          <linearGradient id="hillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1f1538"/>
            <stop offset="100%" stop-color="#0c081a"/>
          </linearGradient>
        </defs>

        <!-- Twinkling stars -->
        <g fill="#fdf8f2" opacity="0.8">
          <circle cx="38" cy="40" r="1.3"/><circle cx="78" cy="65" r="1"/>
          <circle cx="122" cy="28" r="1.5"/><circle cx="164" cy="54" r="1"/>
          <circle cx="215" cy="36" r="1.4"/><circle cx="328" cy="48" r="1.5"/>
          <circle cx="342" cy="96" r="1.1"/><circle cx="52" cy="110" r="1.2"/>
          <circle cx="195" cy="98" r="1.1"/>
        </g>

        <!-- Moving soft clouds -->
        <g class="cloud-drift-slow" opacity="0.22" fill="#c8b6ff">
          <ellipse cx="95" cy="84" rx="44" ry="12"/>
          <ellipse cx="118" cy="78" rx="28" ry="11"/>
        </g>
        <g class="cloud-drift-fast" opacity="0.18" fill="#f9c6d7">
          <ellipse cx="265" cy="118" rx="46" ry="11"/>
          <ellipse cx="242" cy="113" rx="28" ry="10"/>
        </g>

        <!-- Interactive Glowing Moon -->
        <g id="scene04-moon" style="cursor:pointer;">
          <circle cx="272" cy="74" r="56" fill="url(#moonGlow)" opacity="0.45"/>
          <circle cx="272" cy="74" r="28" fill="#fdf1d0"/>
          <circle cx="262" cy="68" r="4.5" fill="rgba(214,178,120,0.32)"/>
          <circle cx="280" cy="82" r="6" fill="rgba(214,178,120,0.25)"/>
          <circle cx="279" cy="62" r="2.8" fill="rgba(214,178,120,0.28)"/>
          <circle cx="272" cy="74" r="36" fill="transparent"/>
        </g>

        <!-- Interactive Shooting Star -->
        <g id="scene04-shooting-star" style="cursor:pointer;">
          <rect x="58" y="30" width="90" height="48" fill="transparent"/>
          <line x1="65" y1="68" x2="132" y2="42" stroke="#f3d59b" stroke-width="2.2" stroke-linecap="round" opacity="0.88"/>
          <circle cx="132" cy="42" r="4.5" fill="#fffaf0"/>
          <circle cx="132" cy="42" r="12" fill="rgba(243,213,155,0.28)"/>
        </g>

        <!-- Peaceful Lake -->
        <rect x="0" y="218" width="370" height="157" fill="url(#lakeGrad)" pointer-events="none"/>
        <!-- Moon reflection on lake -->
        <g id="scene04-lake" style="cursor:pointer;">
          <rect x="215" y="222" width="115" height="68" fill="transparent"/>
          <ellipse class="lake-shimmer" cx="272" cy="240" rx="24" ry="4" fill="rgba(245,217,156,0.42)"/>
          <ellipse class="lake-shimmer" cx="272" cy="254" rx="18" ry="3" fill="rgba(245,217,156,0.34)"/>
          <ellipse class="lake-shimmer" cx="272" cy="268" rx="12" ry="2.4" fill="rgba(245,217,156,0.26)"/>
          <ellipse class="lake-shimmer" cx="272" cy="283" rx="8" ry="2" fill="rgba(245,217,156,0.2)"/>
        </g>

        <!-- Distant hills silhouette -->
        <path d="M0 220 Q70 192 145 214 Q225 188 305 212 Q342 204 370 218 L370 226 L0 226 Z" fill="#150d2a" pointer-events="none"/>

        <!-- Foreground grassy hill where the couple sits -->
        <path d="M0 282 Q135 232 275 292 Q328 315 370 300 L370 375 L0 375 Z" fill="url(#hillGrad)" pointer-events="none"/>

        <!-- Couple sitting together under the moonlight, holding hands -->
        <g class="couple-breathe" pointer-events="none">
          <!-- Boy (Adeesha) on left -->
          <g id="couple-adeesha">
            <!-- Legs/jacket -->
            <path d="M138 272 C136 244 146 232 157 232 C168 232 175 244 174 270 L185 284 L162 288 L138 282 Z" fill="#2c2454"/>
            <!-- Head -->
            <circle cx="156" cy="215" r="14" fill="#e8b89a"/>
            <!-- Hair -->
            <path d="M142 214 C141 200 154 196 165 202 C170 206 171 213 169 216 C164 209 150 208 142 214 Z" fill="#1d142c"/>
            <!-- Arm reaching to hold Chamudi's hand -->
            <path d="M167 244 Q180 256 186 260" fill="none" stroke="#3c316e" stroke-width="7" stroke-linecap="round"/>
          </g>

          <!-- Girl (Chamudi) on right, leaning gently -->
          <g id="couple-chamudi">
            <!-- Flowing dress -->
            <path d="M188 272 C188 244 196 233 207 233 C218 233 226 248 228 280 L190 284 Z" fill="#d96b96"/>
            <!-- Soft shawl/collar -->
            <path d="M196 238 Q207 246 218 238" fill="none" stroke="#f9c6d7" stroke-width="3" stroke-linecap="round"/>
            <!-- Head tilted slightly -->
            <circle cx="204" cy="216" r="13.5" fill="#ebc0a4"/>
            <!-- Long wavy hair + lavender ribbon -->
            <path d="M190 216 C190 199 212 197 220 212 C226 226 224 248 214 252 C217 236 213 219 205 212 C198 209 193 213 190 216 Z" fill="#1a1026"/>
            <circle cx="215" cy="209" r="3" fill="#c8b6ff"/>
            <!-- Hand meeting Adeesha's -->
            <path d="M194 246 Q189 256 186 260" fill="none" stroke="#f08eb5" stroke-width="6" stroke-linecap="round"/>
          </g>

          <!-- Warm golden glow where their hands meet -->
          <circle cx="186" cy="260" r="6" fill="rgba(243,213,155,0.45)"/>
          <circle cx="186" cy="260" r="2.6" fill="#ffd9e6"/>
        </g>

        <!-- Decorative firefly on right -->
        <g pointer-events="none">
          <circle cx="310" cy="272" r="9" fill="rgba(243,213,155,0.22)"/>
          <circle cx="310" cy="272" r="3" fill="#ffe89c"/>
        </g>

        <!-- Interactive Fireflies Cluster -->
        <g id="scene04-fireflies" style="cursor:pointer;">
          <circle cx="74" cy="244" r="34" fill="transparent"/>
          <circle cx="62" cy="252" r="9" fill="rgba(243,213,155,0.22)"/>
          <circle cx="62" cy="252" r="3" fill="#ffe89c"/>
          <circle cx="88" cy="228" r="8" fill="rgba(243,213,155,0.22)"/>
          <circle cx="88" cy="228" r="2.5" fill="#ffe89c"/>
          <circle cx="72" cy="264" r="7" fill="rgba(243,213,155,0.18)"/>
          <circle cx="72" cy="264" r="2.2" fill="#ffe89c"/>
        </g>
      </svg>
    `;
  },

  /**
   * 5. Scene 05 "My Future Doctor" + Transformation Layers + ECG Heart Strip
   */
  createDoctorSceneSvg() {
    return `
      <svg class="doctor-svg" viewBox="0 0 370 270" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lampBeam" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stop-color="rgba(243,213,155,0.34)"/>
            <stop offset="100%" stop-color="rgba(243,213,155,0)"/>
          </linearGradient>
          <linearGradient id="whiteCoatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#e5e8f4"/>
          </linearGradient>
        </defs>

        <!-- Soft hospital / graduation skyline silhouette revealed on transformation -->
        <g id="doc-hospital-bg" opacity="0">
          <rect x="24" y="90" width="58" height="120" rx="4" fill="rgba(200,182,255,0.12)"/>
          <rect x="285" y="75" width="62" height="135" rx="4" fill="rgba(200,182,255,0.12)"/>
          <path d="M53 105 v14 M46 112 h14" stroke="#f28cb1" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
          <!-- Graduation cap silhouette in upper left -->
          <g transform="translate(54, 48)">
            <polygon points="0,-10 22,0 0,10 -22,0" fill="#f3d59b" opacity="0.85"/>
            <path d="M-12 5 L-12 14 Q0 19 12 14 L12 5" fill="#d9a75c" opacity="0.85"/>
            <line x1="20" y1="1" x2="20" y2="16" stroke="#f28cb1" stroke-width="1.8"/>
          </g>
        </g>

        <!-- Warm Desk Lamp -->
        <g id="doc-lamp" pointer-events="none">
          <path d="M292 212 L292 122 Q292 104 274 104" fill="none" stroke="#d9a75c" stroke-width="4" stroke-linecap="round"/>
          <path d="M254 106 L284 106 L276 86 L262 86 Z" fill="#f3d59b"/>
          <polygon points="254,106 284,106 324,212 214,212" fill="url(#lampBeam)"/>
          <rect x="275" y="208" width="34" height="6" rx="3" fill="#c9954c"/>
        </g>

        <!-- Study Desk Surface -->
        <rect x="24" y="212" width="322" height="14" rx="6" fill="#3a2048" stroke="rgba(243,213,155,0.28)" stroke-width="1"/>

        <!-- Steaming Coffee Cup -->
        <g id="doc-coffee" transform="translate(242, 186)">
          <path d="M0 6 L18 6 L16 26 L2 26 Z" fill="#fdf8f2"/>
          <path d="M18 10 C24 10 24 20 17 20" fill="none" stroke="#fdf8f2" stroke-width="2.2"/>
          <path d="M5 1 Q3 -5 7 -9 M12 1 Q10 -6 14 -10" fill="none" stroke="rgba(253,248,242,0.55)" stroke-width="1.5" stroke-linecap="round"/>
        </g>

        <!-- Anatomical Heart Sketch & Handwritten Notes on Desk -->
        <g id="doc-notes" transform="translate(132, 198)">
          <rect x="0" y="0" width="68" height="14" rx="2" fill="#fffaf0" opacity="0.9"/>
          <path d="M10 6 H36 M10 10 H28" stroke="#8a5a78" stroke-width="1.2" stroke-linecap="round"/>
          <circle cx="52" cy="7" r="3.5" fill="#e57a9e" opacity="0.8"/>
        </g>

        <!-- Floating Medical Books -->
        <g id="doc-books">
          <g class="floating-book" transform="translate(46, 174)">
            <rect x="0" y="18" width="54" height="14" rx="3" fill="#9b66b8" stroke="#f3d59b" stroke-width="0.8"/>
            <rect x="4" y="4" width="48" height="13" rx="3" fill="#d96b96" stroke="#fff3e0" stroke-width="0.8"/>
            <line x1="12" y1="10" x2="40" y2="10" stroke="#fff3e0" stroke-width="1.2" opacity="0.7"/>
          </g>
        </g>

        <!-- Central Character: Chamudi -->
        <g id="doc-chamudi" transform="translate(185, 134)">
          <!-- Aura glow -->
          <circle id="doc-aura" cx="0" cy="0" r="68" fill="rgba(243,213,155,0)" />

          <!-- Medical Student Sweater (initial) -->
          <path id="doc-sweater" d="M-32 78 C-34 42 -20 26 0 26 C20 26 34 42 32 78 Z" fill="#b47ae0"/>

          <!-- Future Doctor White Coat (hidden initially, fades/scales in!) -->
          <g id="doc-white-coat" opacity="0">
            <path d="M-36 78 C-38 40 -24 24 0 24 C24 24 38 40 36 78 Z" fill="url(#whiteCoatGrad)" stroke="#d0d7ee" stroke-width="1.2"/>
            <!-- Lapels -->
            <polygon points="-14,25 -2,54 -22,50" fill="#eef1fa" stroke="#c8d0ea" stroke-width="0.8"/>
            <polygon points="14,25 2,54 22,50" fill="#eef1fa" stroke="#c8d0ea" stroke-width="0.8"/>
            <!-- Pink blouse inner V -->
            <polygon points="-11,26 11,26 0,52" fill="#f28cb1"/>
            <!-- Gold Doctor Name Pin -->
            <rect x="11" y="48" width="16" height="6" rx="2" fill="#f3d59b"/>
          </g>

          <!-- Head & Face -->
          <circle cx="0" cy="-2" r="22" fill="#edc2a6"/>
          <!-- Hair -->
          <path d="M-24 -2 C-26 -26 -8 -34 6 -30 C22 -28 27 -12 25 8 C23 22 18 32 13 36 C16 18 16 -2 10 -12 C2 -18 -14 -14 -24 -2 Z" fill="#1c1129"/>
          <!-- Gentle smile & eyes -->
          <circle cx="-7" cy="-2" r="2" fill="#2c1736"/>
          <circle cx="7" cy="-2" r="2" fill="#2c1736"/>
          <path d="M-4 7 Q0 11 4 7" fill="none" stroke="#a64b65" stroke-width="1.8" stroke-linecap="round"/>
          <!-- Subtle blush -->
          <ellipse cx="-11" cy="3" rx="3.5" ry="2" fill="#f28cb1" opacity="0.45"/>
          <ellipse cx="11" cy="3" rx="3.5" ry="2" fill="#f28cb1" opacity="0.45"/>

          <!-- Interactive Stethoscope (Easter Egg: touch to hear heartbeat) -->
          <g id="doc-stethoscope" style="cursor:pointer;">
            <circle cx="0" cy="50" r="28" fill="transparent"/>
            <path d="M-15 24 C-18 46 -12 58 0 58 C12 58 18 46 15 24" fill="none" stroke="#53c7e6" stroke-width="3.2" stroke-linecap="round"/>
            <path d="M0 58 L0 68" fill="none" stroke="#53c7e6" stroke-width="3" stroke-linecap="round"/>
            <circle cx="0" cy="70" r="6.5" fill="#f3d59b" stroke="#ffffff" stroke-width="1.5"/>
            <circle cx="0" cy="70" r="2.5" fill="#e56997"/>
          </g>
        </g>
      </svg>
    `;
  },

  createEcgStripSvg() {
    return `
      <svg class="ecg-strip" viewBox="0 0 350 54" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#c8b6ff"/>
            <stop offset="55%" stop-color="#f28cb1"/>
            <stop offset="100%" stop-color="#f3d59b"/>
          </linearGradient>
        </defs>
        <!-- ECG Line leading into a glowing heart -->
        <path id="ecg-heart-path"
          d="M10 30 L68 30 L78 24 L86 30 L96 30 L103 10 L111 46 L119 18 L127 30 L146 30 L156 22 L166 30 L218 30
             L226 14 L234 42 L242 22 L250 30 L282 30
             C284 20 296 14 304 22 C312 14 324 20 326 30 C328 40 304 49 304 49 C304 49 280 40 282 30"
          fill="none" stroke="url(#ecgGrad)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"
          stroke-dasharray="560" stroke-dashoffset="560"/>
      </svg>
    `;
  },

  /**
   * 6. Scene 06 Heart Stamp SVG
   */
  createRxStampSvg() {
    return `
      <svg class="rx-stamp" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="45" cy="45" r="39" fill="none" stroke="#c94572" stroke-width="2.8" stroke-dasharray="5 3"/>
        <circle cx="45" cy="45" r="32" fill="rgba(201,69,114,0.08)" stroke="#c94572" stroke-width="1.3"/>
        <path d="M45 55 C45 55 31 46 31 37 C31 32 35 28 39.5 28 C42.2 28 44 29.5 45 31.5 C46 29.5 47.8 28 50.5 28 C55 28 59 32 59 37 C59 46 45 55 45 55 Z" fill="#d95f8b"/>
        <text x="45" y="69" text-anchor="middle" fill="#a82c58" font-size="8.5" font-weight="700" letter-spacing="1">FILLED WITH LOVE</text>
      </svg>
    `;
  },

  /**
   * 7. Scene 07 Luxury Birthday Cake with Balloons & "24" Candles
   */
  createBirthdayCakeSvg() {
    return `
      <svg class="cake-svg" viewBox="0 0 340 290" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cakePink" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f3a6c2"/>
            <stop offset="50%" stop-color="#f9c8da"/>
            <stop offset="100%" stop-color="#e487aa"/>
          </linearGradient>
          <linearGradient id="cakeIvory" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f6e6da"/>
            <stop offset="50%" stop-color="#fffaf4"/>
            <stop offset="100%" stop-color="#ebd4c4"/>
          </linearGradient>
          <linearGradient id="goldStand" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#c69049"/>
            <stop offset="50%" stop-color="#f7dfa9"/>
            <stop offset="100%" stop-color="#b9833b"/>
          </linearGradient>
          <radialGradient id="flameOuter" cx="50%" cy="65%" r="55%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="45%" stop-color="#ffe082"/>
            <stop offset="100%" stop-color="#ff8a4c"/>
          </radialGradient>
        </defs>

        <!-- Floating Balloons -->
        <g id="cake-balloons">
          <g class="balloon-float" style="animation-delay:0s">
            <path d="M56 112 Q52 150 62 184" fill="none" stroke="rgba(253,248,242,0.45)" stroke-width="1"/>
            <ellipse cx="56" cy="86" rx="20" ry="25" fill="#f28cb1" opacity="0.88"/>
            <ellipse cx="50" cy="77" rx="5" ry="9" fill="rgba(255,255,255,0.35)"/>
          </g>
          <g class="balloon-float" style="animation-delay:0.8s">
            <path d="M284 106 Q288 148 278 182" fill="none" stroke="rgba(253,248,242,0.45)" stroke-width="1"/>
            <ellipse cx="284" cy="80" rx="20" ry="25" fill="#c8b6ff" opacity="0.88"/>
            <ellipse cx="278" cy="71" rx="5" ry="9" fill="rgba(255,255,255,0.35)"/>
          </g>
          <g class="balloon-float" style="animation-delay:0.4s">
            <path d="M90 70 Q92 108 98 138" fill="none" stroke="rgba(253,248,242,0.38)" stroke-width="1"/>
            <ellipse cx="90" cy="48" rx="15" ry="19" fill="#f3d59b" opacity="0.85"/>
          </g>
        </g>

        <!-- Cake Stand -->
        <ellipse cx="170" cy="252" rx="108" ry="14" fill="url(#goldStand)"/>
        <rect x="155" y="254" width="30" height="18" fill="url(#goldStand)"/>
        <ellipse cx="170" cy="274" rx="52" ry="8" fill="url(#goldStand)"/>

        <!-- Bottom Tier -->
        <rect x="82" y="182" width="176" height="68" rx="14" fill="url(#cakePink)"/>
        <!-- Ivory drip icing on bottom tier -->
        <path d="M82 188 Q96 206 110 188 Q125 212 140 188 Q155 208 170 188 Q185 210 200 188 Q215 206 230 188 Q244 205 258 188 L258 182 L82 182 Z" fill="url(#cakeIvory)"/>
        <!-- Gold pearls -->
        <g fill="#f7d78e">
          <circle cx="96" cy="242" r="3.5"/><circle cx="114" cy="244" r="3.5"/>
          <circle cx="132" cy="245" r="3.5"/><circle cx="151" cy="246" r="3.5"/>
          <circle cx="170" cy="246" r="3.5"/><circle cx="189" cy="246" r="3.5"/>
          <circle cx="208" cy="245" r="3.5"/><circle cx="226" cy="244" r="3.5"/>
          <circle cx="244" cy="242" r="3.5"/>
        </g>

        <!-- Top Tier -->
        <rect x="108" y="128" width="124" height="56" rx="12" fill="url(#cakeIvory)"/>
        <path d="M108 134 Q120 149 132 134 Q145 152 158 134 Q170 148 182 134 Q195 150 208 134 Q220 148 232 134 L232 128 L108 128 Z" fill="url(#cakePink)"/>

        <!-- Strawberries & Piped Roses -->
        <g transform="translate(122, 124)">
          <path d="M0 0 C-7 -1 -8 10 0 13 C8 10 7 -1 0 0 Z" fill="#d9385a"/>
          <path d="M-4 -1 L0 2 L4 -1 L1 -3 Z" fill="#4f9f78"/>
        </g>
        <g transform="translate(218, 124)">
          <path d="M0 0 C-7 -1 -8 10 0 13 C8 10 7 -1 0 0 Z" fill="#d9385a"/>
          <path d="M-4 -1 L0 2 L4 -1 L1 -3 Z" fill="#4f9f78"/>
        </g>
        <!-- Piped rose rosettes -->
        <circle cx="136" cy="176" r="6" fill="#e86f99"/>
        <circle cx="136" cy="176" r="3" fill="#ffd2e3"/>
        <circle cx="204" cy="176" r="6" fill="#e86f99"/>
        <circle cx="204" cy="176" r="3" fill="#ffd2e3"/>

        <!-- Number "24" Candles -->
        <g id="cake-candles">
          <!-- Candle "2" -->
          <path d="M144 96 C144 88 156 86 160 92 C164 98 155 105 144 115 L161 115"
            fill="none" stroke="#f3d59b" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M144 96 C144 88 156 86 160 92 C164 98 155 105 144 115 L161 115"
            fill="none" stroke="#fff3d6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="152" y1="86" x2="152" y2="79" stroke="#533845" stroke-width="2" stroke-linecap="round"/>

          <!-- Candle "4" -->
          <path d="M192 88 L178 107 L197 107 M192 88 L192 116"
            fill="none" stroke="#f28cb1" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M192 88 L178 107 L197 107 M192 88 L192 116"
            fill="none" stroke="#ffd8e7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="192" y1="84" x2="192" y2="77" stroke="#533845" stroke-width="2" stroke-linecap="round"/>

          <!-- Candle Flames -->
          <g class="candle-flame">
            <ellipse cx="152" cy="70" rx="6" ry="11" fill="url(#flameOuter)"/>
            <ellipse cx="152" cy="73" rx="2.5" ry="5" fill="#fffdf7"/>
          </g>
          <g class="candle-flame" style="animation-delay:0.12s">
            <ellipse cx="192" cy="68" rx="6" ry="11" fill="url(#flameOuter)"/>
            <ellipse cx="192" cy="71" rx="2.5" ry="5" fill="#fffdf7"/>
          </g>
        </g>
      </svg>
    `;
  },

  /**
   * 8. Scene 08 Animated Signature SVG
   */
  createSignatureSvg() {
    return `
      <svg class="letter-signature-svg" viewBox="0 0 180 60" xmlns="http://www.w3.org/2000/svg">
        <path id="signature-stroke"
          d="M18 46 Q28 12 36 44 M22 33 Q32 31 40 31
             C42 26 52 24 52 34 C52 44 41 44 43 34 C46 28 54 12 54 42
             C56 32 68 28 68 36 C68 42 58 43 60 35 C63 30 75 29 77 35
             C79 42 70 43 76 34 C81 28 90 29 88 37 C86 43 79 41 85 35
             C91 29 98 14 98 42 C100 31 112 29 112 39 C112 44 118 33 125 32
             C132 31 134 42 126 42 C121 42 130 33 142 35"
          fill="none" stroke="#8f2d59" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"
          stroke-dasharray="420" stroke-dashoffset="420"/>
        <path d="M153 33 C153 33 147 29 147 24.5 C147 22 149 20 151 20 C152.2 20 153 21 153 21.8 C153 21 153.8 20 155 20 C157 20 159 22 159 24.5 C159 29 153 33 153 33 Z" fill="#d95f8b"/>
      </svg>
    `;
  },

  /**
   * 9. Scene 09 Virtual Hug Couple SVG
   */
  createHugSvg() {
    return `
      <svg viewBox="0 0 360 270" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <!-- Soft Moon & Ground -->
        <circle cx="180" cy="60" r="24" fill="rgba(243,213,155,0.28)"/>
        <circle cx="180" cy="60" r="14" fill="#fae5b0"/>
        <ellipse cx="180" cy="236" rx="135" ry="18" fill="rgba(242,140,177,0.14)"/>

        <!-- Adeesha (Left) -->
        <g class="hug-char-left">
          <g transform="translate(88, 128)">
            <circle cx="0" cy="-16" r="18" fill="#e8b89a"/>
            <path d="M-18 -17 C-19 -34 -3 -39 11 -33 C17 -29 20 -21 17 -16 C10 -24 -8 -24 -18 -17 Z" fill="#1d142c"/>
            <circle cx="6" cy="-16" r="2" fill="#2c1736"/>
            <path d="M2 -8 Q6 -5 9 -8" fill="none" stroke="#a64b65" stroke-width="1.6" stroke-linecap="round"/>
            <!-- Body -->
            <path d="M-20 50 C-20 14 -12 4 0 4 C12 4 20 14 20 50 L14 96 L-14 96 Z" fill="#3a2f6e"/>
            <!-- Extended hugging arm -->
            <path d="M12 16 Q38 14 44 26" fill="none" stroke="#4f408f" stroke-width="9" stroke-linecap="round"/>
          </g>
        </g>

        <!-- Chamudi (Right) -->
        <g class="hug-char-right">
          <g transform="translate(272, 130)">
            <circle cx="0" cy="-16" r="17.5" fill="#ebc0a4"/>
            <path d="M-16 -17 C-15 -34 10 -37 19 -20 C24 -6 22 18 14 24 C15 6 12 -14 2 -20 C-6 -22 -12 -20 -16 -17 Z" fill="#1a1026"/>
            <circle cx="-6" cy="-16" r="2" fill="#2c1736"/>
            <path d="M-9 -8 Q-5 -5 -2 -8" fill="none" stroke="#a64b65" stroke-width="1.6" stroke-linecap="round"/>
            <!-- Pink dress -->
            <path d="M-18 54 C-18 16 -10 4 0 4 C12 4 20 16 24 68 L-20 68 Z" fill="#e36d9b"/>
            <rect x="-8" y="68" width="6" height="26" rx="3" fill="#ebc0a4"/>
            <rect x="2" y="68" width="6" height="26" rx="3" fill="#ebc0a4"/>
            <!-- Extended hugging arm -->
            <path d="M-12 16 Q-38 14 -44 26" fill="none" stroke="#f08eb5" stroke-width="8.5" stroke-linecap="round"/>
          </g>
        </g>
      </svg>
    `;
  },

  /**
   * 10. Scene 10 Grand Finale Panoramic Sky & Illuminated Garden
   */
  createFinaleSvg() {
    return `
      <svg viewBox="0 0 370 230" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="finaleHeartGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(242,140,177,0.45)"/>
            <stop offset="100%" stop-color="rgba(242,140,177,0)"/>
          </radialGradient>
        </defs>

        <!-- Glowing Sky Heart -->
        <circle cx="185" cy="76" r="64" fill="url(#finaleHeartGlow)"/>
        <path d="M185 112 C185 112 138 84 138 56 C138 41 150 30 164 30 C174 30 181 36 185 43 C189 36 196 30 206 30 C220 30 232 41 232 56 C232 84 185 112 185 112 Z"
          fill="rgba(242,140,177,0.18)" stroke="#f3d59b" stroke-width="2" stroke-dasharray="6 4"/>

        <!-- Illuminated Garden Meadow -->
        <path d="M0 184 Q185 154 370 184 L370 230 L0 230 Z" fill="#17232c"/>
        <g>
          ${[26, 56, 88, 122, 248, 282, 314, 344].map((x, idx) => `
            <line x1="${x}" y1="205" x2="${x}" y2="180" stroke="#5eb589" stroke-width="2"/>
            <circle cx="${x}" cy="177" r="6" fill="${idx % 2 === 0 ? "#f28cb1" : "#c8b6ff"}"/>
            <circle cx="${x}" cy="177" r="2.2" fill="#f7d78e"/>
          `).join("")}
        </g>

        <!-- Couple standing together looking at the stars -->
        <g transform="translate(185, 166)">
          <!-- Adeesha -->
          <circle cx="-13" cy="-22" r="9" fill="#e8b89a"/>
          <path d="M-22 -22 C-22 -32 -7 -34 -4 -22 Z" fill="#1d142c"/>
          <path d="M-24 22 L-22 -10 L-4 -10 L-2 22 Z" fill="#32285e"/>
          <!-- Chamudi -->
          <circle cx="13" cy="-20" r="8.5" fill="#ebc0a4"/>
          <path d="M4 -20 C5 -31 20 -31 22 -16 C23 -6 21 6 17 10 Z" fill="#1a1026"/>
          <path d="M2 22 L5 -9 L21 -9 L25 22 Z" fill="#df6e9b"/>
          <!-- Joined hands glow -->
          <circle cx="0" cy="4" r="4" fill="rgba(243,213,155,0.6)"/>
        </g>
      </svg>
    `;
  }
};
