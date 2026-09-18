/* =========================================================
   DATA — edit everything about your portfolio here.
   One file for all text, links, projects, skills, etc.
   ========================================================= */

const portfolioData = {
  /* ---------- Identity ---------- */
  name: 'Kim Philip',
  handle: 'kim',
  title: 'Full-Stack Developer',
  roles: [
    'Full-Stack Developer',
    'Open Source Builder',
    'Performance Nerd',
    'Clean Code Advocate',
  ],
  tagline: 'const kim_philip = { developer: true, creative: true };',
  email: 'kplonzame.10.2k09@gmail.com',
  location: 'Lucena City, Quezon',
  availability: 'available for freelance',

  bio: {
    lead: "I'm a <strong>Full-Stack Developer</strong> who treats code like poetry — every line intentional, every interaction delightful.",
    text: "Over the past months I've shipped products used by millions. I specialize in HTML, CSS and JS, and Laravel PHP, but I love crossing into design to craft interfaces that feel alive. When I'm not coding, I'm contributing to open source or writing about performance.",
  },

  /* ---------- Stats ---------- */
  stats: [
    { value: 2, suffix: '+', label: 'projects shipped' },
    { value: 0, suffix: 'k', label: 'github stars' },
  ],

  current: ['Building a realtime collab editor', 'Learning Rust', 'Writing v2 of my design system'],

  /* ---------- Skills ---------- */
  skills: [
    {
      name: 'Frontend',
      icon: '✓',
      accent: ['#00ff9f', '#0a4a33'],
      items: [ 
        { name: 'HTML / CSS / JS', pct: 88 },
        { name: 'TypeScript / React', pct: 75 },
        { name: 'Tailwind', pct: 88 },
        
      ],
    },
    {
      name: 'Backend',
      icon: '⚙',
      accent: ['#00d4ff', '#0a334a'],
      items: [
        { name: 'Node.js / Express', pct: 90 },
        { name: 'MySql', pct: 85 },
        { name: 'Oracle', pct: 88 },
        { name: 'Laravel / PHP', pct: 78 },
      ],
    },
    // {
    //   name: 'DevOps & Tools',
    //   icon: '▣',
    //   accent: ['#9d4dff', '#2b0a4a'],
    //   items: [
    //     { name: 'Docker / Kubernetes', pct: 75 },
    //     { name: 'CI/CD (GitHub Actions)', pct: 85 },
    //     { name: 'AWS / GCP', pct: 70 },
    //     { name: 'Linux / Bash', pct: 90 },
    //   ],
    // },
    // {
    //   name: 'Other',
    //   icon: '◆',
    //   accent: ['#ffd166', '#4a3a0a'],
    //   items: [
    //     { name: 'Rust (learning)', pct: 55 },
    //     { name: 'Figma → Code', pct: 82 },
    //     { name: 'Technical Writing', pct: 80 },
    //     { name: 'Testing / TDD', pct: 84 },
    //   ],
    // },
  ],

  /* ---------- Projects ---------- */
  projects: [
    {
      title: 'Digitech College Integrated Web Portal',
      type: 'Laravel',
      year: '2025',
      accent: ['#00ff9f', '#0a4a33'],
      blurb: 'Online enrollment application for students, document requesting and grades viewing.',
      tags: ['Laravel', 'TailwindCSS', 'PHP'],
      codeUrl: 'https://github.com/kplonzame102k09/digitech',
      demoUrl: '',
    },
    {
      title: 'ojtFinder',
      type: 'Laravel',
      accent: ['#00ff9f', '#0a4a33'],
      blurb: 'Online on the job training finder for students.',
      tags: ['Laravel', 'TailwindCSS', 'PHP'],
      codeUrl: 'https://github.com/kplonzame102k09/website_ojtfinder',
      demoUrl: 'https://ojtfinder.42web.io/',
    },
  ],

  /* ---------- Experience ---------- */
  experience: [
    {
      marker: '→',
      date: '2026 - present',
      role: 'Frontend Developer',
      company: 'Mono, Inc.',
      desc: 'Shipped the v2 rewrite in React + TypeScript. Introduced component design system and testing culture; raised Lighthouse scores past 95 on every page.',
    },
  ],

  /* ---------- Contact channels ---------- */
  channels: [
    { label: 'email', value: 'kplonzame.10.2k09@gmail.com', href: 'mailto:kplonzame.10.2k09@gmail.com' },
    { label: 'github', value: 'github.com/kplonzame102k09', href: 'https://github.com/kplonzame102k09' },
  ],

  socials: {
    github: 'https://github.com/kplonzame102k09',
    email: 'mailto:kplonzame.10.2k09@gmail.om',
  },

  contactQuote: "Let's build something great together.",
  contactSub: 'I usually respond within 24 hours. Open to interesting problems.',
  footerMeta: '© 2026 kim — built with <3 and lots of coffee',

  /* ---------- About code block ---------- */
  aboutCode: [
    { line: "interface Person {", indent: 0 },
    { line: "name: 'Kim Philip';", indent: 1 },
    { line: "role: 'Full-Stack Developer';", indent: 1 },
    { line: "focus: ['interfaces', 'performance', 'realtime']", indent: 1 },
    { line: "stack: ['HTML', 'CSS', 'TailwindCSS', 'PHP', 'Laravel', 'TS', 'React', 'Node', 'MySql', 'Oracle']", indent: 1 },
    { line: "loves: ['open source', 'vim', 'synthwave']", indent: 1 },
    { line: "}", indent: 0 },
    { line: "", indent: 0 },
    { line: "// continuously shipping great software", indent: 0 },
  ],
};

/* Expose globally so other scripts can use it (robust across loading modes) */
if (typeof window !== 'undefined') {
  window.portfolioData = portfolioData;
  if (window.TerminalEngine) window.TerminalEngine._data = portfolioData;
}