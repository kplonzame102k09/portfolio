/* =========================================================
   MAIN — renders all sections from data.js, typing effect
   ========================================================= */
(function () {
  'use strict';

  const data = window.portfolioData;
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  };

  /* ---------------- Doc title ---------------- */
  document.title = `${data.name} — ${data.title}`;

  /* ---------------- Typewriter ---------------- */
  function initTypewriter() {
    const el = $('#typeText');
    if (!el) return;
    const roles = data.roles;
    let idx = 0;
    let charI = 0;
    let deleting = false;

    const tick = () => {
      const word = roles[idx];
      el.textContent = word.slice(0, charI);
      if (!deleting) {
        charI++;
        if (charI > word.length) {
          deleting = true;
          setTimeout(tick, 1500);
          return;
        }
        setTimeout(tick, 55 + Math.random() * 40);
      } else {
        charI--;
        if (charI < 0) {
          deleting = false;
          idx = (idx + 1) % roles.length;
          setTimeout(tick, 300);
          return;
        }
        setTimeout(tick, 28);
      }
    };
    setTimeout(tick, 400);
  }

  /* ---------------- Hero title ---------------- */
  function initHeroTitle() {
    const nameEl = document.querySelector('.c-name');
    if (nameEl) nameEl.textContent = esc(data.handle);
    const badge = document.querySelector('.hero-badge');
    if (badge && data.availability) {
      const dot = badge.querySelector('.pulse-dot');
      badge.textContent = '';
      if (dot) badge.appendChild(dot);
      badge.appendChild(document.createTextNode(' ' + data.availability));
    }
  }

  /* ---------------- About section ---------------- */
  function renderAbout() {
    // code window
    const codeEl = $('#aboutCode');
    if (codeEl && data.aboutCode) {
      codeEl.innerHTML = data.aboutCode
        .map((l) => {
          const pad = '\u00A0'.repeat(l.indent * 2);
          return esc(pad + l.line);
        })
        .join('\n');
    }

    // lead / text
    const lead = $('#aboutLead');
    if (lead) lead.innerHTML = data.bio.lead;
    const text = $('#aboutText');
    if (text) text.textContent = data.bio.text;

    // stats
    const grid = $('#statGrid');
    if (grid && data.stats) {
      grid.innerHTML = data.stats
        .map(
          (s) => `
        <div class="stat">
          <div class="stat-value" data-count="${s.value}" data-suffix="${s.suffix}">0${esc(s.suffix)}</div>
          <div class="stat-label">${esc(s.label)}</div>
        </div>`
        )
        .join('');
      // animate counters
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            animateCount(e.target);
            io.unobserve(e.target);
          });
        },
        { threshold: 0.5 }
      );
      grid.querySelectorAll('.stat-value').forEach((el) => io.observe(el));
    }

    // current tags
    const tags = $('#currentTags');
    if (tags && data.current) {
      tags.innerHTML = data.current.map((t) => `<span class="tag">${esc(t)}</span>`).join('');
    }
  }

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const dur = 1100;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------------- Skills ---------------- */
  const skillIcons = ['{ }', '</>', '⚙', '◆'];
  function renderSkills() {
    const grid = $('#skillsGrid');
    if (!grid) return;
    grid.innerHTML = data.skills
      .map(
        (cat, ci) => `
      <div class="skill-card reveal">
        <div class="skill-card-head">
          <span class="skill-icon" style="background:linear-gradient(135deg, ${cat.accent[0]}22, ${cat.accent[1]});color:${cat.accent[0]};border:1px solid ${cat.accent[0]}33;">${skillIcons[ci] || '{ }'}</span>
          <h3 style="color:${cat.accent[0]}">${esc(cat.name)}</h3>
        </div>
        ${cat.items
          .map(
            (it, ii) => `
          <div class="skill-item" data-i="${ii}">
            <div class="skill-row"><span>${esc(it.name)}</span><span class="pct">${it.pct}%</span></div>
            <div class="skill-bar"><div class="skill-fill" data-w="${it.pct}"></div></div>
          </div>`
          )
          .join('')}
      </div>`
      )
      .join('');

    // animate bars on visibility
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.querySelectorAll('.skill-fill').forEach((f, i) => {
            setTimeout(() => (f.style.width = f.dataset.w + '%'), 100 * i);
          });
          io.unobserve(e.target);
        });
      },
      { threshold: 0.25 }
    );
    grid.querySelectorAll('.skill-card').forEach((c) => io.observe(c));
  }

  /* ---------------- Projects (3D tilt cards) ---------------- */
  function renderProjects() {
    const grid = $('#projectGrid');
    if (!grid) return;
    grid.innerHTML = data.projects
      .map(
        (p) => `
      <article class="project-card reveal" data-tilt
        style="--p1:${p.accent[0]}22;--p2:${p.accent[1]}">
        <div class="tilt-glow" aria-hidden="true"></div>
        <div class="project-visual">
          <span class="pv-tag">${esc(p.type)}</span>
          <span class="pv-year">${esc(p.year)}</span>
        </div>
        <div class="project-title">
          <span>${esc(p.title)}</span>
          <span class="project-link-arrow">⇱</span>
        </div>
        <p class="project-desc">${esc(p.blurb)}</p>
        <div class="project-tags">${p.tags.map((t) => `<span class="ptag">${esc(t)}</span>`).join('')}</div>
        <div class="project-links">
          ${p.codeUrl ? `<a class="plink" href="${p.codeUrl}" target="_blank" rel="noopener">&lt;/&gt; code</a>` : ''}
          ${p.demoUrl ? `<a class="plink" href="${p.demoUrl}" target="_blank" rel="noopener">↗ demo</a>` : ''}
        </div>
      </article>`
      )
      .join('');
  }

  /* ---------------- Experience ---------------- */
  function renderExperience() {
    const tl = $('#timeline');
    if (!tl) return;
    tl.innerHTML = data.experience
      .map(
        (exp) => `
      <div class="tl-item reveal">
        <span class="tl-date">${esc(exp.date)}</span>
        <div>
          <span class="tl-marker">${esc(exp.marker)}</span>
          <div class="tl-card">
            <h3 class="tl-role">${esc(exp.role)}</h3>
            <div class="tl-company">@ ${esc(exp.company)}</div>
            <p class="tl-desc">${esc(exp.desc)}</p>
          </div>
        </div>
      </div>`
      )
      .join('');
  }

  /* ---------------- Contact ---------------- */
  const channelIcons = {
    email: '✉',
    github: '⌥',
    linkedin: 'in',
    x: '𝕏',
    resume: '⬇',
  };
  function renderContact() {
    const ch = $('#contactChannels');
    if (ch && data.channels) {
      ch.innerHTML = data.channels
        .map((c) => {
          const icon = channelIcons[c.label] || '→';
          const href = c.href || '#';
          const target = href.startsWith('#') ? '' : 'target="_blank" rel="noopener"';
          return `
        <a class="channel" href="${href}" ${target}>
          <span class="ch-ico" style="color:var(--cyan)">${icon}</span>
          <span class="ch-label">${esc(c.label)}</span>
          <span style="color:var(--text)">${esc(c.value)}</span>
          <span class="ch-arrow">→</span>
        </a>`;
        })
        .join('');
    }

    const q = $('#contactQuote');
    if (q) q.textContent = data.contactQuote;
    const sub = $('#contactSub');
    if (sub) sub.textContent = data.contactSub;

    const mail = $('#emailBtn');
    if (mail) mail.href = 'mailto:' + data.email + '?subject=Hello ' + data.name;
  }

  /* ---------------- Footer ---------------- */
  function renderFooter() {
    const meta = $('#footerMeta');
    if (meta) meta.innerHTML = data.footerMeta;
    const social = $('#footerSocial');
    if (social && data.socials) {
      const labels = { github: 'gh', linkedin: 'in', x: '𝕏', email: '✉' };
      social.innerHTML = Object.entries(data.socials)
        .map(
          ([k, v]) =>
            `<a href="${v}" target="_blank" rel="noopener" aria-label="${k}">${labels[k] || k}</a>`
        )
        .join('');
    }
  }

  /* ---------------- Boot ---------------- */
  function init() {
    initHeroTitle();
    renderAbout();
    renderSkills();
    renderProjects();
    renderExperience();
    renderContact();
    renderFooter();
    initTypewriter();
    if (window.Effects && window.Effects.refreshReveals) {
      requestAnimationFrame(() => window.Effects.refreshReveals());
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();