# ⚡ TERMINAL — Interactive Developer Portfolio Template

A modern, creative, fully-interactive developer portfolio with a **terminal-inspired interface**, **3D parallax cards**, custom cursor, and a dark **neon-green/cyan** theme. No frameworks — pure HTML/CSS/JS.

## ✨ Features

| Feature | Description |
|---|---|
| 🖥️ **Interactive Terminal Hero** | Animated boot sequence that "loads" your profile, then `$ whoami` reveals your name |
| ⌨️ **Command-Line Navigation** | Type `help`, `about`, `projects`, `skills`, `socials`, `whoami`, `clear`… real commands that scroll + show toasts |
| 🧊 **3D Tilt Cards** | Project cards rotate in 3D following your cursor with a glowing radial highlight |
| 🌌 **Parallax Depth** | Background neon grid + floating orbs drift at different scroll speeds |
| ⌨️ **Typewriter Effect** | Rotating roles (Full-Stack Developer → UI Engineer → …) typed & deleted live |
| 🎯 **Custom Cursor** | Neon dot + easing ring that grows over interactive targets |
| 📊 **Animated Stats & Bars** | Counters and skill bars animate when scrolled into view |
| 📱 **Fully Responsive** | Hamburger nav on mobile, touch-friendly, respects `prefers-reduced-motion` |
| 📦 **Single `data.js`** | Change *all* content (name, projects, skills, links) in one file — no HTML edit needed |

## 🚀 Quick Start

1. Open the project folder in your editor.
2. Open `js/data.js` and replace every field with **your** info.
3. Open `index.html` in your browser (or run any static server, e.g. `npx serve .` or `python3 -m http.server`).
4. Deploy to GitHub Pages / Vercel / Netlify as static files.

## 🎨 Customizing — `js/data.js`

Everything lives in the `portfolioData` object:

```js
name      // Your name
handle    // Shown as "const <handle> = {"
roles     // Rotating typewriter roles
bio       // About lead + text (lead supports <strong> tags)
stats     // [{ value, suffix, label }]
current   // "currently:" tags under About
skills    // Categories → items with proficiency %
projects  // Cards with accent colors, tags, code/demo URLs
experience// Timeline entries (date, role, company, desc)
channels  // Contact card rows
socials   // Footer icons
```

### Colors
Edit CSS variables at the top of `css/base.css`:

```css
--neon:     #00ff9f;   /* primary accent (green) */
--cyan:     #00d4ff;   /* secondary accent     */
--purple:   #9d4dff;   /* tertiary accent      */
--bg:       #0a0e14;   /* background           */
```

### Brand wording
- Header brand: `css`? No — it's hardcoded in `index.html` (`kim@developer`), edit it there.
- Terminal titles (`kim@portfolio:~`) are also hardcoded in `index.html` / `terminal.js` — search for `kim@`.

## ⌨️ Terminal Commands

- `whoami` — identity card
- `about` / `skills` / `projects` / `experience` / `contact` — smooth-scroll to a section
- `socials` — list all links
- `help` or `?` — command list
- `sudo whoami` — you're already root 😄
- `clear` — reset output
- `date` — system time

> **Overlay terminal:** click the **`>_`** button in the header, or press **`Ctrl + ``** (`Ctrl+backtick`) for a full-screen terminal. `Esc` closes it.

## 📁 File Structure

```
portfolio/
├── index.html        → All markup (sections, terminal, overlay)
├── css/
│   ├── base.css      → Reset, variables, globals, scrollbar
│   ├── layout.css    → Header, hero, about/skills/projects/contact
│   ├── terminal.css  → Terminal windows, boot log, overlay
│   └── effects.css   → Cursor, tilt, parallax, glitch, reveal
├── js/
│   ├── data.js       → ★ ALL YOUR CONTENT
│   ├── terminal.js   → Boot log + command engine + overlay
│   ├── effects.js    → Cursor, 3D tilt, parallax, scroll reveal
│   └── main.js       → Renders sections from data.js, typewriter
```

## 🤝 License

MIT — free for personal and commercial use. A shout-out is appreciated but not required.

Built with 💚 and way too much coffee.

# Kim Philip Lonzame - Portfolio

Personal portfolio website showcasing full-stack development projects and skills.

## Tech Stack
- HTML, CSS, JavaScript
- Laravel PHP
- React
- Node.js
- Python
- TypeScript
- MySQL
- Oracle
