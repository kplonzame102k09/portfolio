/* =========================================================
   EFFECTS — custom cursor, 3D tilt cards, parallax, nav state
   ========================================================= */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Custom cursor ---------------- */
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;

  function initCursor() {
    if (!dot || !ring || reduceMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
    });

    // ring eases toward cursor
    const loop = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate(${ringX - ring.offsetWidth / 2}px, ${ringY - ring.offsetHeight / 2}px)`;
      requestAnimationFrame(loop);
    };
    loop();

    document.addEventListener('mousedown', () => ring.classList.add('pressed-ring'));
    document.addEventListener('mouseup', () => ring.classList.remove('pressed-ring'));

    // grow on interactive targets
    const interactive = 'a, button, input, [data-tilt], .tag, .ptag, .channel, .terminal-toggle';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactive)) ring.classList.add('hover-ring');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactive)) ring.classList.remove('hover-ring');
    });
  }

  /* ---------------- 3D tilt cards ---------------- */
  function initTilt() {
    if (reduceMotion) return;
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => {
      card.classList.add('tilt-ready');
      let raf = null;

      card.addEventListener('mousemove', (e) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = null;
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width;
          const py = (e.clientY - rect.top) / rect.height;
          const rx = (0.5 - py) * 10; // rotateX
          const ry = (px - 0.5) * 12; // rotateY
          card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px) scale(1.01)`;
          // move glow
          card.style.setProperty('--mx', px * 100 + '%');
          card.style.setProperty('--my', py * 100 + '%');
          // parallax children
          const vis = card.querySelector('.project-visual');
          if (vis) vis.style.transform = `translateZ(18px) translate(${(px - 0.5) * 10}px, ${(py - 0.5) * 10}px)`;
        });
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        const vis = card.querySelector('.project-visual');
        if (vis) vis.style.transform = '';
      });
    });
  }

  /* ---------------- Parallax orbs + grid on scroll ---------------- */
  function initParallax() {
    if (reduceMotion) return;
    const orbs = document.querySelectorAll('.orb');
    const grid = document.querySelector('.bg-grid');
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        orbs.forEach((orb, i) => {
          const speed = 0.05 + i * 0.04;
          orb.style.transform = `translate3d(0, ${y * speed}px, 0)`;
        });
        if (grid) grid.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
        ticking = false;
      });
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  function initReveals() {
    const reveals = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      reveals.forEach((r) => r.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((r) => io.observe(r));
  }

  /* ---------------- Scroll progress + header state ---------------- */
  function initScrollUI() {
    const progress = document.getElementById('scrollProgress');
    const header = document.getElementById('siteHeader');
    let ticking = false;
    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const h = document.documentElement;
          const max = h.scrollHeight - h.clientHeight;
          const p = max > 0 ? (h.scrollTop / max) * 100 : 0;
          if (progress) progress.style.width = p + '%';
          if (header) header.classList.toggle('scrolled', h.scrollTop > 20);
          onScrollActive();
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  /* ---------------- Active nav link ---------------- */
  function initLatentNav() {
    document.addEventListener('scroll', onScrollActive);
    onScrollActive();
  }
  function onScrollActive() {
    const ids = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    let current = 'home';
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (r.top <= 140) current = id;
    }
    document.querySelectorAll('.nav-link').forEach((a) => {
      const href = a.getAttribute('href');
      a.classList.toggle('active', href === '#' + current);
    });
  }

  /* ---------------- Mobile nav ---------------- */
  function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('siteNav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
    });
    nav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.classList.remove('open');
      })
    );
  }

  /* ---------------- Init ---------------- */
  function init() {
    initCursor();
    initTilt();
    initParallax();
    initReveals();
    initScrollUI();
    initLatentNav();
    initMobileNav();
  }

  // minor cleanup of stray generated code above
  window.Effects = { init, refreshTilt: initTilt, refreshReveals: initReveals };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();