const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
toggle.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  toggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => document.body.classList.remove('menu-open')));
document.getElementById('year').textContent = new Date().getFullYear();
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }}), { threshold: 0.12 });
document.querySelectorAll('.reveal, .featured-project, .project-card, .signal-grid article, .tech-list article, .experience article, .credentials a').forEach(el => observer.observe(el));

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
