/* =========================================================
   TERMINAL ENGINE — hero boot log + command navigation
   ========================================================= */
(function () {
  'use strict';

  const data = window.portfolioData;
  const bootLogEl = document.getElementById('bootLog');
  const heroPromptLine = document.getElementById('heroPromptLine');
  const heroPromptCaret = document.getElementById('heroPromptCaret');
  const commandInput = document.getElementById('commandInput');
  const inputCaret = document.getElementById('inputCaret');

  /* ---------------- Boot log ---------------- */
  const bootLines = [
    { text: '[0.000s] initializing kernel...', cls: 'log-faint' },
    { text: `[0.042s] loading profile: ${data.handle}`, cls: 'log-info' },
    { text: '[0.113s] mounting /projects', cls: 'log-info' },
    { text: '[0.198s] compiling skills...', cls: 'log-info' },
    { text: `[0.241s] status: ${data.availability}`, cls: 'log-warn' },
    { text: '[0.320s] opening secure channel...', cls: 'log-faint' },
    { text: '[0.413s] encryption: AES-256-GCM', cls: 'log-faint' },
    { text: '[0.502s] rendering experience()', cls: 'log-faint' },
    { text: '[0.589s] connecting to socials...', cls: 'log-faint' },
    { text: '[0.641s] all systems operational.', cls: 'log-ok' },
  ];

  function line(text, cls) {
    const d = document.createElement('div');
    d.className = 'log-line ' + (cls || '');
    d.innerHTML = text;
    bootLogEl.appendChild(d);
    return d;
  }

  function boot() {
    bootLogEl.innerHTML = '';
    let i = 0;
    const tick = () => {
      if (i >= bootLines.length) {
        revealPrompt();
        return;
      }
      const { text, cls } = bootLines[i];
      line(text, cls);
      i++;
      bootLogEl.scrollTop = bootLogEl.scrollHeight;
      setTimeout(tick, 70 + Math.random() * 60);
    };
    setTimeout(tick, 250);
  }

  function revealPrompt() {
    setTimeout(() => {
      heroPromptLine.removeAttribute('hidden');
      const t = setTimeout(() => {
        const whoami = document.createElement('div');
        whoami.className = 'log-line';
        whoami.innerHTML =
          '<span class="log-neon">kim@portfolio</span><span class="log-bracket">:~$</span> <span class="log-info">whoami</span>';
        bootLogEl.appendChild(whoami);
        const res = document.createElement('div');
        res.className = 'log-line';
        res.innerHTML =
          `<span style="color:var(--text)">${data.name}</span> — <span class="log-info">${data.title}</span>`;
        setTimeout(() => bootLogEl.appendChild(res), 380);
        clearTimeout(t);
      }, 420);
    }, 180);
  }

  /* ---------------- Command engine ---------------- */
  const SECTIONS = {
    about: '#about',
    skills: '#skills',
    projects: '#projects',
    experience: '#experience',
    contact: '#contact',
    home: '#home',
  };

  const HELP_TEXT = [
    { cmd: 'whoami', desc: 'who are you?' },
    { cmd: 'about / bio', desc: 'view my bio' },
    { cmd: 'skills', desc: 'list technical skills' },
    { cmd: 'projects', desc: 'view selected projects' },
    { cmd: 'experience --log', desc: 'work history' },
    { cmd: 'socials', desc: 'find me online' },
    { cmd: 'contact', desc: 'open a secure channel' },
    { cmd: 'clear', desc: 'clear the terminal' },
  ];

  function scrollToSection(key) {
    const sel = SECTIONS[key];
    if (!sel) return false;
    const el = document.querySelector(sel);
    if (!el) return false;
    if (typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const section = document.querySelector(sel);
      if (section && section.scrollTop !== undefined) section.scrollTop = 0;
    }
    const rect = el.getBoundingClientRect();
    const marker = document.createElement('div');
    marker.style.cssText =
      'position:absolute;pointer-events:none;border-radius:var(--radius);box-shadow:0 0 0 3px var(--neon-dim),0 0 60px rgba(0,255,159,0.15);z-index:5;';
    marker.style.top = rect.top + 'px';
    marker.style.left = rect.left + 'px';
    marker.style.width = rect.width + 'px';
    marker.style.height = rect.height + 'px';
    el.style.position = 'relative';
    document.body.appendChild(marker);
    setTimeout(() => marker.remove(), 1200);
    return true;
  }

  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerHTML = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  function executeCommand(raw, output) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    // Movement-ish commands
    for (const key of Object.keys(SECTIONS)) {
      if (cmd === key || cmd === `go ${key}` || cmd === `cd ${key}` || cmd === `open ${key}`) {
        scrollToSection(key);
        showToast(`<span class="t-cmd">$ ${cmd}</span> → jumping to ${key}`);
        return;
      }
    }

    if (cmd === 'ls projects') return scrollToSection('projects');

    switch (cmd) {
      case 'help':
      case '?':
        if (output) {
          output.addCmd(raw);
          output.div(
            '<div class="out-help-grid">' +
              HELP_TEXT.map(
                (h) =>
                  `<div><span class="out-help-cmd">${h.cmd}</span><span class="out-help-desc"> — ${h.desc}</span></div>`
              ).join('') +
              '</div>'
          );
        } else {
          showToast(
            'commands: whoami, about, skills, projects, experience, socials, contact, clear — try <b>./terminal</b> too'
          );
        }
        break;

      case 'whoami':
        if (output) {
          output.addCmd(raw);
          output.div(
            `<div class="out-item"><span class="oi-k">name</span><span class="oi-v">${data.name}</span></div>` +
              `<div class="out-item"><span class="oi-k">role</span><span class="oi-v">${data.title}</span></div>` +
              `<div class="out-item"><span class="oi-k">status</span><span class="oi-v">${data.availability}</span></div>` +
              `<div class="out-item"><span class="oi-k">location</span><span class="oi-v">${data.location}</span></div>`
          );
        } else {
          showToast(`${data.name} — ${data.title}`);
        }
        break;

      case 'about':
      case 'bio':
        scrollToSection('about');
        showToast(`<span class="t-cmd">$ ${cmd}</span> → scrolling to about`);
        break;

      case 'skills':
      case 'tech':
        scrollToSection('skills');
        showToast(`<span class="t-cmd">$ ${cmd}</span> → scrolling to skills`);
        break;

      case 'projects':
      case 'project':
      case 'ls':
      case 'work':
        scrollToSection('projects');
        showToast(`<span class="t-cmd">$ ${cmd}</span> → scrolling to projects`);
        break;

      case 'experience':
      case 'exp':
      case 'log':
        scrollToSection('experience');
        showToast(`<span class="t-cmd">$ ${cmd}</span> → scrolling to experience`);
        break;

      case 'contact':
      case 'email':
      case 'mail':
        scrollToSection('contact');
        showToast(`<span class="t-cmd">$ ${cmd}</span> → scrolling to contact`);
        break;

      case 'socials':
        if (output) {
          output.addCmd(raw);
          output.div(
            Object.entries(data.socials)
              .map(
                ([k, v]) =>
                  `<div class="out-item"><span class="oi-k">${k}</span><span class="oi-v"><a href="${v}" target="_blank" rel="noopener">${v}</a></span></div>`
              )
              .join('')
          );
        } else {
          Object.values(data.socials).forEach((u) => window.open(u, '_blank'));
        }
        break;

      case 'clear':
      case 'cls':
        if (output) output.clear();
        else showToast('terminal cleared');
        break;

      case 'sudo':
        if (output) output.addCmd(raw);
        if (output) output.div('<span class="log-warn"># nice try. hint: try <b>sudo whoami</b></span>');
        else showToast('nice try 😄 hint: <b>sudo whoami</b>');
        break;

      case 'sudo whoami':
        if (output) output.addCmd(raw);
        if (output) {
          output.div(`<span class="log-ok">&gt; you are already root. identity verified: ${data.name}</span>`);
        } else {
          showToast(`you are already root. it&apos;s <b>${data.name}</b>`);
        }
        break;

      case 'date':
        if (output) {
          output.addCmd(raw);
          output.div(`<span style="color:var(--text)">${new Date().toLocaleString()}</span>`);
        } else {
          showToast(new Date().toLocaleString());
        }
        break;

      case 'cat resume':
      case 'resume':
        showToast('resume coming soon — email me!');
        break;

      case 'me':
        scrollToSection('home');
        showToast('that&apos;s you — nice to meet you 🙂');
        break;

      default:
        if (output) {
          output.addCmd(raw);
          output.div(
            `<span class="log-err">command not found: ${esc(cmd)}</span><br/>` +
              `<span class="log-faint">type <b style="color:var(--neon)">help</b> for available commands</span>`
          );
        } else {
          showToast(`<span class="log-err">command not found: ${esc(cmd)}</span> — try <b>help</b>`);
        }
    }
  }

  function esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  /* ---------------- Hero prompt ---------------- */
  function syncCaret() {
    if (!inputCaret) return;
    inputCaret.style.display =
      document.activeElement === commandInput ? 'block' : 'none';
  }

  function initHeroPrompt() {
    if (!commandInput) return;
    const handleKey = (e) => {
      if (e.key === 'Enter') {
        const val = commandInput.value.trim();
        executeCommand(val, null);
        commandInput.value = '';
      }
    };
    commandInput.addEventListener('keydown', handleKey);
    commandInput.addEventListener('input', syncCaret);
    commandInput.addEventListener('focus', syncCaret);
    commandInput.addEventListener('blur', syncCaret);
  }

  /* ---------------- Terminal overlay ---------------- */
  const overlay = document.getElementById('termOverlay');
  const overlayBody = document.getElementById('termOverlayBody');
  const overlayInput = document.getElementById('overlayCommandInput');
  const toggleBtn = document.getElementById('terminalToggle');
  const closeBtn = overlay ? overlay.querySelector('[data-close-term]') : null;

  const bannerArt = [
    '  ____  __.                 ',
    ' |    |/ _|__  __.___  _____',
    ' |      <  |/ _/ __|__  |   ',
    ' |    |  \\   \\__ |  / __ |   ',
    ' |____|__ \\___|___ /____ /  ',
    '         \\/       \\/     \\/  ',
  ];

  const Out = {
    addCmd(raw) {
      const block = document.createElement('div');
      block.className = 'out-block';
      block.innerHTML =
        `<div class="out-command"><span class="ps">kim@portfolio:~$</span> ${esc(raw)}</div>` +
        `<div class="out-content"></div>`;
      overlayBody.appendChild(block);
      overlayBody.scrollTop = overlayBody.scrollHeight;
      return block.querySelector('.out-content');
    },
    div(html) {
      const d = document.createElement('div');
      d.innerHTML = html;
      overlayBody.appendChild(d);
      requestAnimationFrame(() => {
        d.querySelectorAll('.out-skill-fill').forEach((f) => {
          f.style.width = f.dataset.w + '%';
        });
      });
      overlayBody.scrollTop = overlayBody.scrollHeight;
      return d;
    },
    clear() {
      overlayBody.innerHTML = '';
      banner();
    },
  };

  function banner() {
    Out.div('<div class="out-art">' + bannerArt.join('\n') + '</div>');
    Out.div(
      `<span class="log-neon">${data.name}</span> — <span class="log-info">${data.title}</span>` +
        `<div class="log-faint">type <b style="color:var(--neon)">help</b> to explore · movement commands scroll the page</div>`
    );
  }

  function openOverlay() {
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    overlayBody.innerHTML = '';
    banner();
    requestAnimationFrame(() => overlayInput && overlayInput.focus());
  }

  function closeOverlay() {
    overlay.hidden = true;
    document.body.style.overflow = '';
  }

  function initOverlay() {
    if (!overlay) return;
    if (toggleBtn) toggleBtn.addEventListener('click', () => (overlay.hidden ? openOverlay() : closeOverlay()));
    if (closeBtn) closeBtn.addEventListener('click', closeOverlay);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !overlay.hidden) closeOverlay();
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        overlay.hidden ? openOverlay() : closeOverlay();
      }
      if (overlayInput && document.activeElement === overlayInput && e.key === 'Enter') {
        const val = overlayInput.value.trim();
        executeCommand(val, Out);
        overlayInput.value = '';
        e.preventDefault();
      }
      if (!overlay.hidden && overlayInput && document.activeElement !== overlayInput && e.key.length === 1) {
        overlayInput.focus();
      }
    });
  }

  /* ---------------- Public API ---------------- */
  window.TerminalEngine = {
    init() {
      boot();
      initHeroPrompt();
      initOverlay();
    },
    execute: executeCommand,
    output: Out,
  };

  /* Auto-init (order-safe) */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.TerminalEngine.init());
  } else {
    window.TerminalEngine.init();
  }
})();