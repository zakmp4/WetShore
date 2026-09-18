// =====================================================================
//  WetShore Studios site — shared layout, data and behaviour
//  To add a game: add it to GAMES below, then copy coastline.html.
// =====================================================================

const DISCORD_INVITE = 'https://discord.gg/jtAGYcxtdt';
const SLIDE_MS = 7000;

const GAMES = [
  {
    id: 'coastline',
    name: 'Coastline',
    page: 'coastline.html',
    logo: 'assets/coastline-logo.png',
    status: 'In development',
    platforms: 'PC',
    blurb: 'A realistic open world on the coast where almost everything can be destroyed. Drive, explore, and bring it all down.',
  },
  // { id: 'next-game', name: 'Next Game', page: 'next-game.html', logo: 'assets/next-game-logo.png', status: 'Announced', platforms: 'PC', blurb: '...' },
];

const NEWS = [
  { game: 'coastline', tag: 'Coastline', title: 'Coastline revealed: our first open-world game', date: 'September 2026', art: 'n1' },
  { game: 'coastline', tag: 'Development', title: 'Every wall, every tower: how destruction works in Coastline', date: 'Coming soon', art: 'n2', label: 'DESTRUCTION' },
  { game: 'coastline', tag: 'Community', title: "Playtests are coming — here's how to get involved", date: 'Coming soon', art: 'n3', label: 'PLAYTEST' },
  { game: null, tag: 'Studio', title: 'Welcome to WetShore Studios', date: '2026', art: 'n4' },
];

const VIDEOS = [
  { game: 'coastline', title: 'WetShore Studios Presents… Coastline', src: 'assets/trailer.mp4', poster: 'assets/trailer-poster.jpg' },
  { game: 'coastline', title: 'Coastline — Logo Intro', src: 'assets/coastline-intro.mp4', poster: 'assets/coastline-intro-poster.jpg' },
];

const LOGO_SVG = `<svg viewBox="380 430 490 410" fill="currentColor" aria-hidden="true">
  <path d="M421 440H518V574L611 440H691V573L771 440H860L704 701Q655 695 609 678V570L536 683Q480 717 421 727Z"/>
  <path d="M380 748C440 760 490 735 530 713C570 695 615 697 657 728C620 725 590 740 555 765C510 797 475 805 440 795C410 785 390 765 380 748Z"/>
  <path d="M498 826C540 820 575 795 610 772C650 745 690 748 740 780C760 795 775 803 790 806C760 812 730 808 690 800C640 793 600 805 560 820C535 830 515 830 498 826Z"/>
  <path d="M793 648L810 696H864L822 728L838 778L793 749L750 778L765 728L723 697H776Z"/></svg>`;

const page = document.body.dataset.page || '';
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ---------- header ----------
const navEl = document.getElementById('site-nav');
if (navEl) {
  const active = (p) => (page === p ? ' is-current' : '');
  navEl.outerHTML = `
  <header class="nav" id="nav">
    <a class="brand" href="index.html" aria-label="WetShore Studios home">${LOGO_SVG}</a>
    <nav class="links" id="links" aria-label="Main">
      <div class="dropdown">
        <button class="link drop-toggle${page === 'games' || GAMES.some((g) => g.id === page) ? ' is-current' : ''}" aria-expanded="false">Games
          <svg class="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
        </button>
        <div class="drop-menu">
          ${GAMES.map((g) => `<a href="${g.page}"><img src="${g.logo}" alt=""><span>${esc(g.name)}<small>${esc(g.status)}</small></span></a>`).join('')}
          <a href="games.html" class="all-games"><span class="soon-box">＋</span><span>All games<small>Everything we're making</small></span></a>
        </div>
      </div>
      <a class="link${active('newswire')}" href="newswire.html">Newswire</a>
      <a class="link${active('videos')}" href="videos.html">Videos</a>
      <a class="link" href="${DISCORD_INVITE}" target="_blank" rel="noopener">Community <span class="arrow">↗</span></a>
      <a class="link${active('about')}" href="about.html">About</a>
    </nav>
    <div class="nav-right">
      <a class="pill-outline" data-discord>Join Discord</a>
      <button class="icon-btn menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </header>`;
}

// ---------- footer ----------
const footEl = document.getElementById('site-footer');
if (footEl) {
  footEl.outerHTML = `
  <footer class="footer">
    <div class="container footer-inner">
      <a class="brand" href="index.html" aria-label="WetShore Studios">${LOGO_SVG}</a>
      <nav class="footer-links" aria-label="Footer">
        <a href="games.html">Games</a>${GAMES.map((g) => `<a href="${g.page}">${esc(g.name)}</a>`).join('')}
        <a href="newswire.html">Newswire</a><a href="videos.html">Videos</a><a href="about.html">About</a>
        <a data-discord>Discord ↗</a>
      </nav>
      <p class="legal">© ${new Date().getFullYear()} WetShore Studios. All rights reserved.</p>
    </div>
  </footer>`;
}

// ---------- renderers ----------
const gameById = (id) => GAMES.find((g) => g.id === id);

function newsCard(n) {
  let art;
  if (n.art === 'n1' && gameById(n.game)) art = `<img src="${gameById(n.game).logo}" alt="">`;
  else if (n.art === 'n4') art = LOGO_SVG;
  else art = `<span>${esc(n.label || '')}</span>`;
  return `<article class="news reveal"><div class="news-img ${n.art}">${art}</div>
    <p class="tag">${esc(n.tag)}</p><h3>${esc(n.title)}</h3><time>${esc(n.date)}</time></article>`;
}
function gameCard(g) {
  return `<article class="game reveal">
    <a class="game-art" href="${g.page}"><img src="${g.logo}" alt="${esc(g.name)}"></a>
    <div class="game-body"><h3>${esc(g.name)}</h3><p>${esc(g.blurb)}</p>
      <div class="game-meta"><span class="badge">${esc(g.status)}</span><span>${esc(g.platforms)}</span></div>
      <a class="pill" href="${g.page}">View ${esc(g.name)}</a></div></article>`;
}
const soonCard = `<article class="game soon reveal"><div class="game-art empty"><span>?</span></div>
  <div class="game-body"><h3>Next project</h3><p>More WetShore games are planned. Stay tuned.</p>
  <div class="game-meta"><span class="badge dim">Coming later</span></div></div></article>`;
function videoCard(v) {
  return `<article class="video-card reveal"><div class="player"><video src="${v.src}"${v.poster ? ` poster="${v.poster}"` : ''} controls playsinline preload="metadata"></video></div>
    <h3>${esc(v.title)}</h3>${gameById(v.game) ? `<p class="tag">${esc(gameById(v.game).name)}</p>` : ''}</article>`;
}

document.querySelectorAll('[data-render]').forEach((el) => {
  const { render, game, limit } = el.dataset;
  const cap = (arr) => (limit ? arr.slice(0, Number(limit)) : arr);
  const byGame = (arr) => (game ? arr.filter((x) => x.game === game) : arr);
  if (render === 'news') el.innerHTML = cap(byGame(NEWS)).map(newsCard).join('');
  if (render === 'games') el.innerHTML = GAMES.map(gameCard).join('') + soonCard;
  if (render === 'videos') el.innerHTML = cap(byGame(VIDEOS)).map(videoCard).join('');
});

// ---------- discord links ----------
document.querySelectorAll('[data-discord]').forEach((a) => { a.href = DISCORD_INVITE; a.target = '_blank'; a.rel = 'noopener'; });

// ---------- nav behaviour ----------
const nav = document.getElementById('nav');
if (nav) {
  const solid = document.body.dataset.solidNav !== undefined;
  const onScroll = () => nav.classList.toggle('scrolled', solid || window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const menuBtn = document.getElementById('menuBtn');
  const links = document.getElementById('links');
  menuBtn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const dropdown = nav.querySelector('.dropdown');
  const dropToggle = dropdown.querySelector('.drop-toggle');
  dropToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = dropdown.classList.toggle('open');
    dropToggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) { dropdown.classList.remove('open'); dropToggle.setAttribute('aria-expanded', 'false'); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { dropdown.classList.remove('open'); links.classList.remove('open'); }
  });
}

// ---------- hero carousel (home page only) ----------
const slides = [...document.querySelectorAll('.slide')];
if (slides.length > 1) {
  const dotsWrap = document.getElementById('dots');
  const pauseBtn = document.getElementById('pauseBtn');
  const hero = document.querySelector('.hero');
  let index = 0, timer = null, paused = false, startedAt = 0, remaining = SLIDE_MS;

  const dots = slides.map((_, i) => {
    const b = document.createElement('button');
    b.className = 'dot';
    b.setAttribute('aria-label', `Go to slide ${i + 1}`);
    b.innerHTML = '<i></i>';
    b.addEventListener('click', () => goTo(i, true));
    dotsWrap.appendChild(b);
    return b;
  });
  const restartFill = () => {
    const fill = dots[index].querySelector('i');
    fill.style.animation = 'none'; void fill.offsetWidth; fill.style.animation = '';
    dotsWrap.style.setProperty('--dur', `${SLIDE_MS}ms`);
  };
  const schedule = (ms) => { clearTimeout(timer); startedAt = Date.now(); remaining = ms; timer = setTimeout(() => goTo(index + 1), ms); };
  function goTo(i, user = false) {
    slides[index].classList.remove('is-active'); dots[index].classList.remove('is-active');
    index = (i + slides.length) % slides.length;
    slides[index].classList.add('is-active'); dots[index].classList.add('is-active');
    restartFill();
    if (!paused) schedule(SLIDE_MS); else if (user) remaining = SLIDE_MS;
  }
  pauseBtn.addEventListener('click', () => {
    paused = !paused;
    pauseBtn.classList.toggle('paused', paused);
    hero.classList.toggle('paused-all', paused);
    pauseBtn.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
    if (paused) { clearTimeout(timer); remaining -= Date.now() - startedAt; } else schedule(Math.max(remaining, 300));
  });
  let touchX = null;
  hero.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) goTo(index + (dx < 0 ? 1 : -1), true);
    touchX = null;
  });
  dots[0].classList.add('is-active');
  restartFill();
  schedule(SLIDE_MS);
}

// ---------- reveal on scroll ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
