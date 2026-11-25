# My Love, My Future Doctor — Chamudi Kavindya's 24th Birthday Surprise

An interactive, cinematic, mobile-first digital story crafted for **Chamudi Kavindya** on her 24th birthday (**26 November 2026**) by **Adeesha**.

Built with pure static HTML, CSS, JavaScript, Canvas 2D particles, custom hand-crafted SVG illustrations, local GSAP animations, and synthesized/local audio — 100% compatible with **GitHub Pages** with zero backend or API keys required.

---

## Project Structure

```text
├── index.html                  # Main 10-scene story shell
├── css/
│   └── style.css               # Luxury romantic theme, iPhone 14 mobile-first layout
├── js/
│   ├── config.js               # All names, dates, messages, colors, wishes & audio paths
│   ├── audio.js                # Local audio player + Web Audio API fallback
│   ├── illustrations.js        # Original layered SVG artwork for all 10 scenes
│   ├── animations.js           # Starfield, parallax, butterflies, petals, confetti & heart fireworks
│   ├── main.js                 # Scene controller, Easter eggs, progress stars & replay
│   └── vendor/
│       └── gsap.min.js         # Local GSAP 3 library
├── assets/
│   ├── audio/                  # Local WAV music & sound effects
│   ├── illustrations/          # App favicon & vector icons
│   └── images/                 # Optional folder for personal couple photos
└── README.md
```

---

## 1. How to Run Locally

Because modern browsers restrict some features on `file://` URLs, run a quick local static server from the project folder:

### Option A — Python (recommended)
```bash
python -m http.server 8424
```
Then open `http://localhost:8424/` in your browser.

### Option B — Node.js
```bash
npx serve .
```

### Option C — VS Code Live Server
Open the folder in VS Code, right-click `index.html`, and choose **Open with Live Server**.

---

## 2. How to Customize Names, Dates, Messages & Colors

Open **`js/config.js`** and edit `window.BIRTHDAY_CONFIG`:

- **Personal details (`person`)**: Update `girlfriendName`, `boyfriendName`, `dob`, `celebrationDate`, `age`, `professionTitle`, and `themeTitle`.
- **Colors (`colors`)**: Customize `midnightPurple`, `deepVelvet`, `rosePink`, `softBlush`, `lavender`, `champagneGold`, and `ivory`.
- **Scene texts (`scene01` – `scene10`)**: Edit any greeting, story paragraph, prescription item, or love letter line.
- **24 Flower Wishes (`scene03.flowers`)**: Customize the 24 qualities, notes, and flower palettes (`"rose"`, `"lavender"`, `"gold"`, `"ivory"`).
- **Easter Eggs (`easterEggs`)**: Customize butterfly compliments, hidden heart secret note, stethoscope heartbeat message, and signature note.

---

## 3. How to Add Personal Photos

1. Copy your favorite photos (e.g., `memory-1.jpg`, `memory-2.jpg`) into **`assets/images/`**.
2. Open **`js/config.js`** and add entries to the `photos` array:
   ```js
   photos: [
     { src: "assets/images/memory-1.jpg", caption: "Our favorite evening together ♡" },
     { src: "assets/images/memory-2.jpg", caption: "Always cheering for you" }
   ],
   ```
3. Once `photos` has at least one image, an **"Our Memories ♡"** keepsake button automatically appears in Scene 10 (The Grand Finale) alongside the Replay button.

---

## 4. How to Change Background Music & Sound Effects

The project includes original synthesized romantic piano music and sound effects in **`assets/audio/`**:
- `romantic-piano.wav`
- `chime.wav`
- `envelope.wav`
- `heartbeat.wav`
- `celebration.wav`

To use your own song or sound effects:
1. Place your `.mp3` or `.wav` file inside **`assets/audio/`** (for example, `assets/audio/our-song.mp3`).
2. Update the path in **`js/config.js`** under `audio.bgMusic`:
   ```js
   audio: {
     bgMusic: "assets/audio/our-song.mp3",
     ...
   }
   ```

> **Note on Mobile Browsers:** Mobile Safari and Chrome block autoplay until a user taps the screen. Music starts smoothly right when Chamudi opens the envelope (if sound is enabled) or taps the floating speaker icon in the top-right corner.

---

## 5. How to Deploy to GitHub Pages (Free)

1. Create a new repository on GitHub (e.g., `chamudi-24th-birthday`).
2. Push all files from this folder to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Chamudi's 24th birthday surprise"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose **`main`** and **`/ (root)`**, and click **Save**.
5. After ~1 minute, your live link (`https://<your-username>.github.io/<repo-name>/`) will be ready to share with Chamudi!

---

## 6. How to Test the Mobile Version

- **Chrome / Edge DevTools**: Press `F12`, toggle the **Device Toolbar** (`Ctrl+Shift+M`), and select **iPhone 14** (`390 × 844`) or **iPhone 14 Pro Max**.
- **Real Phone on Same Wi-Fi**:
  1. Start the local server: `python -m http.server 8424 --bind 0.0.0.0`
  2. Find your computer's local IP (`ipconfig` on Windows, e.g., `192.168.1.42`).
  3. Open `http://192.168.1.42:8424/` in Safari on iPhone or Chrome on Android.

---

## Hidden Easter Eggs to Discover

- Tap a **floating butterfly** for a sweet compliment.
- Tap the **glowing moon** for a romantic message.
- Tap the **number 24** in the birthday constellation for a burst of starry particles.
- Tap the **stethoscope** in *My Future Doctor* to hear a gentle heartbeat.
- Tap the **handwritten signature** in the love letter for a secret note.
- Tap the subtle **hidden heart** in the bottom-right corner for a secret message from Adeesha.
