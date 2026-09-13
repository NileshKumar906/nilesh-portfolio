const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
toggle.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  toggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => document.body.classList.remove('menu-open')));
document.getElementById('year').textContent = new Date().getFullYear();

const progress = document.querySelector('.scroll-progress span');
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') document.body.classList.add('theme-light');
const setThemeLabel = () => themeToggle.setAttribute('aria-label', document.body.classList.contains('theme-light') ? 'Switch to dark theme' : 'Switch to light theme');
setThemeLabel();
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('theme-light');
  localStorage.setItem('portfolio-theme', document.body.classList.contains('theme-light') ? 'light' : 'dark');
  setThemeLabel();
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal, .featured-project, .project-card, .signal-grid article, .tech-list article, .experience article, .credentials a').forEach(el => observer.observe(el));

// Terminal typing effect - replayed once without blocking the page.
const typedCode = document.querySelector('.typed-code');
if (typedCode) {
  const text = typedCode.dataset.text;
  let index = 0;
  const type = () => {
    typedCode.textContent = text.slice(0, index += 1);
    if (index < text.length) setTimeout(type, 60);
  };
  setTimeout(type, 850);
}

const modules = {
  mobile: { kicker: 'MOBILE UI / FLUTTER', title: 'Clear interfaces, designed for people.', copy: 'I build responsive Flutter experiences with reusable components and deliberate navigation, so the product feels calm and easy to use.', tags: ['DART', 'RESPONSIVE UI', 'FIREBASE'] },
  state: { kicker: 'STATE / RIVERPOD', title: 'State that stays easy to reason about.', copy: 'A clean state layer separates UI from application logic and makes it easier to build, test, and extend a product over time.', tags: ['RIVERPOD', 'PROVIDER', 'CLEAN FLOWS'] },
  api: { kicker: 'API LAYER / NODE.JS', title: 'Services that connect product to data.', copy: 'I design RESTful endpoints around useful product flows: authentication, clear requests, predictable responses, and maintainable logic.', tags: ['NODE.JS', 'EXPRESS', 'REST API'] },
  data: { kicker: 'DATA / MONGODB', title: 'Data shaped around real product needs.', copy: 'A practical persistence layer helps the application stay responsive, synchronized, and ready for the next feature.', tags: ['MONGODB', 'FIRESTORE', 'DATA MODELS'] },
  core: { kicker: 'PRODUCT SYSTEM', title: 'The best experiences are connected systems.', copy: 'No layer stands alone. I focus on the handoffs between interface, state, services, and data - where a product becomes dependable.', tags: ['SYSTEM THINKING', 'USER FOCUS', 'ITERATION'] }
};
document.querySelectorAll('.map-node').forEach(node => node.addEventListener('click', () => {
  const module = modules[node.dataset.module];
  document.querySelectorAll('.map-node').forEach(item => item.classList.remove('active'));
  node.classList.add('active');
  document.getElementById('module-kicker').textContent = module.kicker;
  document.getElementById('module-title').textContent = module.title;
  document.getElementById('module-copy').textContent = module.copy;
  document.getElementById('module-tags').innerHTML = module.tags.map(tag => `<span>${tag}</span>`).join('');
}));

// Editable live status is loaded from now.json; defaults remain in the HTML when previewed without a server.
fetch('now.json').then(response => response.ok ? response.json() : Promise.reject()).then(now => {
  document.getElementById('now-headline').textContent = now.headline;
  document.getElementById('now-detail').textContent = now.detail;
  document.getElementById('now-building').textContent = now.building;
  document.getElementById('now-learning').textContent = now.learning;
  document.getElementById('now-availability').textContent = now.availability;
}).catch(() => {});

const commandPalette = document.getElementById('command-palette');
const commandInput = document.getElementById('command-input');
const commandButtons = [...document.querySelectorAll('.command-list button')];
const openPalette = () => { commandPalette.showModal(); commandInput.value = ''; commandButtons.forEach(button => button.hidden = false); commandInput.focus(); };
const closePalette = () => commandPalette.close();
const commands = {
  about: () => document.getElementById('about').scrollIntoView({ behavior: 'smooth' }),
  projects: () => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }),
  system: () => document.getElementById('system-map').scrollIntoView({ behavior: 'smooth' }),
  lab: () => document.getElementById('lab').scrollIntoView({ behavior: 'smooth' }),
  resume: () => document.querySelector('.resume-button').click(),
  email: () => window.location.href = 'mailto:nileshkumar3291@gmail.com',
  theme: () => themeToggle.click()
};
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); if (!commandPalette.open) openPalette(); }
  if (event.key === 'Escape' && commandPalette.open) closePalette();
});
commandInput.addEventListener('input', () => {
  const query = commandInput.value.trim().toLowerCase();
  commandButtons.forEach(button => button.hidden = !button.textContent.toLowerCase().includes(query));
});
commandButtons.forEach(button => button.addEventListener('click', () => { closePalette(); commands[button.dataset.command](); }));
commandPalette.addEventListener('click', event => { if (event.target === commandPalette) closePalette(); });

const egg = document.getElementById('easter-egg');
const secret = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
let secretIndex = 0;
document.addEventListener('keydown', event => {
  secretIndex = event.key === secret[secretIndex] ? secretIndex + 1 : 0;
  if (secretIndex === secret.length) {
    egg.classList.add('visible');
    setTimeout(() => egg.classList.remove('visible'), 4200);
    secretIndex = 0;
  }
});

const modal = document.getElementById('project-modal');
const projects = {
  yoga: { index: '02 / CASE STUDY', title: 'Yoga Wellness', summary: 'A full-stack wellness companion designed to make yoga content and personal account flows easy to access on mobile.', stack: ['FLUTTER', 'NODE.JS', 'EXPRESS', 'MONGODB'], points: ['Designed the cross-platform Flutter interface', 'Built REST APIs for authentication and data management', 'Connected the client and backend around a simple, scalable data flow'], links: [['Frontend ↗', 'https://github.com/NileshKumar906/yoga'], ['Backend ↗', 'https://github.com/NileshKumar906/yoga-backend']] },
  sneaker: { index: '03 / CASE STUDY', title: 'Sneaker Store', summary: 'A responsive mobile shopping experience focused on browsing products quickly and keeping product information in sync in real time.', stack: ['FLUTTER', 'FIREBASE', 'FIRESTORE'], points: ['Built the responsive Flutter product-browsing interface', 'Integrated Cloud Firestore for real-time product data', 'Focused on a clear and frictionless commerce journey'], links: [['View source ↗', 'https://github.com/NileshKumar906/Sneaker-app']] },
  expense: { index: '04 / OPEN SOURCE', title: 'Expense Tracker', summary: 'A Flutter personal-finance app that helps make day-to-day spending visible and easier to understand.', stack: ['FLUTTER', 'DART', 'PERSONAL FINANCE'], points: ['Designed around quick, everyday expense capture', 'Built as a focused Flutter mobile application', 'Published as an open-source project on GitHub'], links: [['View source ↗', 'https://github.com/NileshKumar906/flutter-expense-tracker']] },
  sih: { index: '05 / HACKATHON PROJECT', title: 'Jharkhand SIH App', summary: 'A Jharkhand-focused Flutter application created as a Smart India Hackathon project.', stack: ['FLUTTER', 'SMART INDIA HACKATHON'], points: ['Developed as part of a Smart India Hackathon project', 'Focused on a Jharkhand-specific use case', 'Published as an open-source project on GitHub'], links: [['View source ↗', 'https://github.com/NileshKumar906/Jharkhand-Societal-Innovation-flutter-app']] }
};
document.querySelectorAll('.project-expand').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  document.getElementById('modal-index').textContent = project.index;
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-summary').textContent = project.summary;
  document.getElementById('modal-stack').innerHTML = project.stack.map(item => `<span>${item}</span>`).join('');
  document.getElementById('modal-points').innerHTML = project.points.map(item => `<li>${item}</li>`).join('');
  document.getElementById('modal-links').innerHTML = project.links.length ? project.links.map(([label, url]) => `<a href="${url}" target="_blank" rel="noreferrer">${label}</a>`).join('') : '<span class="modal-pending">Source code coming soon</span>';
  modal.showModal();
}));
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', async event => {
  event.preventDefault();
  const button = form.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Sending...';
  status.textContent = '';
  try {
    const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Unable to send your message.');
    form.reset();
    status.textContent = 'Message sent. Thanks for reaching out!';
  } catch (error) {
    status.textContent = `${error.message} You can also email me directly.`;
  } finally {
    button.disabled = false;
    button.innerHTML = 'Send message <span>↗</span>';
  }
});
