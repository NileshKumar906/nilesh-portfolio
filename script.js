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

const modal = document.getElementById('project-modal');
const projects = {
  yoga: { index: '02 / CASE STUDY', title: 'Yoga Wellness', summary: 'A full-stack wellness companion designed to make yoga content and personal account flows easy to access on mobile.', stack: ['FLUTTER', 'NODE.JS', 'EXPRESS', 'MONGODB'], points: ['Designed the cross-platform Flutter interface', 'Built REST APIs for authentication and data management', 'Connected the client and backend around a simple, scalable data flow'], links: [['Frontend ↗', 'https://github.com/NileshKumar906/yoga'], ['Backend ↗', 'https://github.com/NileshKumar906/yoga-backend']] },
  sneaker: { index: '03 / CASE STUDY', title: 'Sneaker Store', summary: 'A responsive mobile shopping experience focused on browsing products quickly and keeping product information in sync in real time.', stack: ['FLUTTER', 'FIREBASE', 'FIRESTORE'], points: ['Built the responsive Flutter product-browsing interface', 'Integrated Cloud Firestore for real-time product data', 'Focused on a clear and frictionless commerce journey'], links: [['View source ↗', 'https://github.com/NileshKumar906/Sneaker-app']] }
};
document.querySelectorAll('.project-expand').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  document.getElementById('modal-index').textContent = project.index;
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-summary').textContent = project.summary;
  document.getElementById('modal-stack').innerHTML = project.stack.map(item => `<span>${item}</span>`).join('');
  document.getElementById('modal-points').innerHTML = project.points.map(item => `<li>${item}</li>`).join('');
  document.getElementById('modal-links').innerHTML = project.links.map(([label, url]) => `<a href="${url}" target="_blank" rel="noreferrer">${label}</a>`).join('');
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
