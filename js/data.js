/* =========================================================
   DATA — edit everything about your portfolio here.
   One file for all text, links, projects, skills, etc.
   ========================================================= */

const portfolioData = {
  /* ---------- Identity ---------- */
  name: 'Kim Philip Lonzame',
  handle: 'kim',
  title: 'Full Stack Developer',
  roles: [
    'Full Stack Developer',
    'Web Developer',
    'Backend Developer',
    'Frontend Developer',
  ],
  tagline: 'const kim_philip_lonzame = { developer: true, learner: true };',
  email: 'kplonzame.10.2k09@gmail.com',
  location: 'Philippines',
  availability: 'available for opportunities',

  bio: {
    lead: "I'm a <strong>Full Stack Developer</strong> passionate about building modern web applications with clean, efficient code.",
    text: "As a motivated developer eager to launch my career, I focus on creating robust web solutions using Laravel PHP, React, and modern JavaScript. I'm continuously expanding my skill set and building practical projects to demonstrate my capabilities. When I'm not coding, I'm exploring new technologies and contributing to open source projects.",
  },

  /* ---------- Stats ---------- */
  stats: [
    { value: 2, suffix: '+', label: 'projects completed' },
    { value: 10, suffix: '+', label: 'technologies learned' },
  ],

  current: ['Building web applications with Laravel', 'Learning React and TypeScript', 'Expanding backend skills with Node.js'],

  /* ---------- Skills ---------- */
  skills: [
    {
      name: 'Frontend',
      icon: '✓',
      accent: ['#00ff9f', '#0a4a33'],
      items: [
        { name: 'HTML / CSS', pct: 85 },
        { name: 'Vanilla JavaScript', pct: 80 },
        { name: 'TypeScript / React', pct: 70 },
        { name: 'TailwindCSS', pct: 75 },
      ],
    },
    {
      name: 'Backend',
      icon: '⚙',
      accent: ['#00d4ff', '#0a334a'],
      items: [
        { name: 'Laravel / PHP', pct: 80 },
        { name: 'Node.js', pct: 70 },
        { name: 'Python', pct: 65 },
        { name: 'MySQL', pct: 75 },
        { name: 'Oracle', pct: 70 },
      ],
    },
  ],

  /* ---------- Projects ---------- */
  projects: [
    {
      title: 'ojtFinder',
      type: 'Laravel',
      year: '2025',
      accent: ['#00ff9f', '#0a4a33'],
      blurb: 'Online on-the-job training finder platform that helps students discover and apply for OJT opportunities. Features company listings, application tracking, and student-employer matching.',
      tags: ['Laravel', 'PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
      codeUrl: 'https://github.com/kplonzame102k09/website_ojtfinder',
      demoUrl: '',
    },
    {
      title: 'Digitech College Integrated Web Portal',
      type: 'Laravel',
      year: '2025',
      accent: ['#00d4ff', '#0a334a'],
      blurb: 'Comprehensive web portal for Digitech College featuring online enrollment, document requesting system, and grades viewing. Streamlines administrative processes for students and faculty.',
      tags: ['Laravel', 'PHP', 'MySQL', 'TailwindCSS', 'HTML', 'CSS'],
      codeUrl: 'https://github.com/kplonzame102k09/digitech',
      demoUrl: '',
    },
  ],

  /* ---------- Experience ---------- */
  experience: [
    {
      marker: '→',
      date: '2025 - present',
      role: 'Full Stack Developer (Entry Level)',
      company: 'Freelance / Personal Projects',
      desc: 'Building practical web applications using Laravel PHP, React, and modern JavaScript. Focused on developing real-world projects to demonstrate full-stack capabilities and continuously expanding technical skills.',
    },
  ],

  /* ---------- Contact channels ---------- */
  channels: [
    { label: 'email', value: 'kplonzame.10.2k09@gmail.com', href: 'mailto:kplonzame.10.2k09@gmail.com' },
    { label: 'github', value: 'github.com/kplonzame102k09', href: 'https://github.com/kplonzame102k09' },
  ],

  socials: {
    github: 'https://github.com/kplonzame102k09',
    email: 'mailto:kplonzame.10.2k09@gmail.com',
  },

  contactQuote: "Let's build something amazing together.",
  contactSub: 'Eager to learn and contribute to meaningful projects. Open to opportunities and collaborations.',
  footerMeta: '© 2026 Kim Philip Lonzame — built with passion and code',

  /* ---------- About code block ---------- */
  aboutCode: [
    { line: "interface Developer {", indent: 0 },
    { line: "name: 'Kim Philip Lonzame';", indent: 1 },
    { line: "role: 'Full Stack Developer';", indent: 1 },
    { line: "experience: 'Entry Level';", indent: 1 },
    { line: "stack: ['Laravel', 'PHP', 'HTML', 'CSS', 'Vanilla JS', 'NodeJS', 'Python', 'TypeScript', 'React', 'MySQL', 'Oracle']", indent: 1 },
    { line: "passion: ['learning', 'building', 'growing'];", indent: 1 },
    { line: "}", indent: 0 },
    { line: "", indent: 0 },
    { line: "// eager to launch my career", indent: 0 },
  ],
};

/* Expose globally so other scripts can use it (robust across loading modes) */
if (typeof window !== 'undefined') {
  window.portfolioData = portfolioData;
  if (window.TerminalEngine) window.TerminalEngine._data = portfolioData;
}