/* ============================================================
   THE COLLABORATIVE — shared chrome (header, nav, footer)
   Injected on every page so nav/contact live in ONE place.
   Edit NAV, CONTACT, and the brand below.
   ============================================================ */

const CONTACT = {
  email:     'thecollaborative.training@gmail.com',
  instagram: 'https://www.instagram.com/thecollaborative_training/',
  igHandle:  '@thecollaborative_training',
  studio:    'Move Dance Studio',
  address:   '10981 N 5600 W, Highland, UT 84003',
  // Replace with your real Mindbody booking link:
  mindbody:  'https://clients.mindbodyonline.com/classic/ws?studioid=5738674&stype=-7&sView=week&sLoc=0',
  // Solo submission — paste the "Send" link of your Google Form (it must have a
  // File upload question). Uploaded videos auto-collect in a Google Drive folder.
  soloForm:  'https://forms.gle/REPLACE_WITH_YOUR_FORM_LINK',
};

const NAV = [
  { label: 'Home',    href: 'index.html',  page: 'home' },
  { label: 'About',   href: 'about.html',  page: 'about' },
  { label: 'Events',  href: 'events.html', page: 'events' },
  { label: 'Convention', href: 'collegiate.html', page: 'collegiate' },
  { label: 'Videos',  href: 'videos.html', page: 'videos' },
];

/* ---- Inline icons (no external deps) ---- */
const ICONS = {
  menu:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  mail:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  pin:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  cal:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>',
  play:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  lock:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  film:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5L5 21"/></svg>',
};

/* ---- Brand mark — the real Collaborative logo (vector) ---- */
const BRAND_MARK = `<img class="brand__mark" src="assets/logo-mark.svg" alt="The Collaborative" />`;

function buildHeader(current) {
  const links = NAV.map(n =>
    `<a href="${n.href}"${n.page === current ? ' aria-current="page"' : ''}>${n.label}</a>`
  ).join('');

  return `
  <header class="site-header" id="siteHeader">
    <a class="brand" href="index.html">
      ${BRAND_MARK}
      <span class="brand__name">The Collaborative</span>
    </a>
    <nav class="nav">${links}</nav>
  </header>`;
}

function buildFooter() {
  const links = NAV.map(n => `<a href="${n.href}">${n.label}</a>`).join('');
  return `
  <footer class="site-footer">
    <div class="wrap footer-grid">
      <div class="footer-brand">
        <a class="brand" href="index.html">${BRAND_MARK}<span class="brand__name">The Collaborative</span></a>
        <p>High-level dance training in Highland, Utah — refined technique, real versatility, and a community that pushes you further.</p>
      </div>
      <div class="footer-col">
        <h4>Explore</h4>
        ${links}
      </div>
      <div class="footer-col">
        <h4>Connect</h4>
        <a href="${CONTACT.instagram}" target="_blank" rel="noopener">${ICONS.instagram} ${CONTACT.igHandle}</a>
        <a href="mailto:${CONTACT.email}">${ICONS.mail} Email us</a>
        <p>${ICONS.pin} ${CONTACT.studio}, ${CONTACT.address}</p>
      </div>
    </div>
    <div class="wrap footer-bottom">
      <span>© <span id="year"></span> The Collaborative. All rights reserved.</span>
      <span>Highland, Utah</span>
    </div>
  </footer>`;
}

/* ---- Boot ---- */
document.addEventListener('DOMContentLoaded', () => {
  const current = document.body.dataset.page || '';

  const headerSlot = document.getElementById('site-header');
  const footerSlot = document.getElementById('site-footer');
  if (headerSlot) headerSlot.innerHTML = buildHeader(current);
  if (footerSlot) footerSlot.innerHTML = buildFooter();

  // expose icons for page scripts
  window.ICONS = ICONS;
  window.CONTACT = CONTACT;

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // sticky-header style on scroll
  const header = document.getElementById('siteHeader');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // reveal-on-scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
});
