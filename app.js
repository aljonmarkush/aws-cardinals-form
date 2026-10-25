/* AWS Learning Club – Cardinals · site logic */
(function () {
  'use strict';

  /* ---------- Editable config ---------- */
  var CONFIG = {
    // Fill these in. Empty values are hidden or shown as placeholders.
    lead: {
      name: '',      // example: 'Juan Dela Cruz'
      photo: '',     // example: './lead.jpg' (put the image file in this folder)
      message: ''    // optional short quote from the Lead
    },
    links: {
      Facebook: '',
      Instagram: '',
      LinkedIn: '',
      TikTok: '',
      Email: '' // example: 'mailto:cardinals@example.com'
    }
  };

  /* ---------- Content (summarized from the Constitution and By-Laws) ---------- */
  var OFFICES = [
    {
      id: 'exec', name: 'Executive Leadership', sub: 'Lead, Co-Lead, Executive Secretary',
      note: 'Makes the big decisions, plans and runs the club, and keeps it true to its mission of bringing students together.',
      roles: [
        { title: 'Lead', summary: 'The highest-ranking officer, responsible for the direction and governance of the whole club.',
          duties: ['Presides over Executive Leadership meetings and coordinates all officers', 'Sets direction for plans, programs and projects and sees them implemented', 'Represents Cardinals in meetings, partnerships and conferences when authorized', 'Oversees turnover of records, accounts and digital platforms to the next officers'] },
        { title: 'Co-Lead', summary: 'Works beside the Lead to run day-to-day operations.',
          duties: ['Monitors programs and projects with the Chief and Vice Chief Officers', 'Helps resolve operational concerns and keeps officers coordinated', 'Promotes collaboration among members from different schools', 'Steps in when the Lead is temporarily unavailable, per the succession rules'] },
        { title: 'Executive Secretary', summary: 'Keeps the club organized, documented and on record.',
          duties: ['Prepares minutes, notices, agendas and official correspondence', 'Maintains the roster, resolutions, reports and membership documents', 'Helps prepare accomplishment reports and proposals', 'Handles filing, safekeeping and turnover of documents'] }
      ]
    },
    {
      id: 'finance', name: 'Finance and Resource', sub: 'Chief Finance Officer, Vice Chiefs',
      note: 'Looks after the club’s money and makes sure every peso is used for an authorized purpose.',
      roles: [
        { title: 'Chief Finance Officer', abbr: 'CFO', summary: 'Leads the office and owns budgeting, resources and financial accountability.',
          duties: ['Builds budgets for programs, projects and operations', 'Tracks income, expenses and keeps receipts, vouchers and liquidations', 'Presents periodic financial reports to the Executive Leadership', 'Helps develop fundraising and sponsorship efforts'] },
        { title: 'Vice Chief Finance Officers', abbr: 'Vice CFO', summary: 'Support the CFO and can take delegated duties when authorized.',
          duties: ['Help prepare budgets, reports and financial documents', 'Organize records, and process liquidation and reimbursement papers', 'Support fundraising and sponsorship activities when assigned', 'Work with project teams on their financial needs'] }
      ]
    },
    {
      id: 'ops', name: 'Operations and Events', sub: 'Chief and Vice Chief Operations Officer',
      note: 'Turns plans into events that actually happen, on time, within budget, and safely.',
      roles: [
        { title: 'Chief Operations Officer and Vice Chief Operations Officer', abbr: 'COO / Vice-COO', summary: 'Oversee how programs, projects and events are carried out.',
          duties: ['Write operational plans that match approved programs', 'Coordinate venues, equipment, schedules, materials and people', 'Plan, run and evaluate events; lead project teams and volunteers', 'Manage risks and safety, keep quality high, and stay within budget', 'Provide documentation for accomplishment reports and evaluations'] }
      ]
    },
    {
      id: 'marketing', name: 'Marketing and Management', sub: 'Chief and Vice Chief Marketing Officer',
      note: 'Gets the word out and builds the club’s voice and reputation online.',
      roles: [
        { title: 'Chief Marketing Officer and Vice Chief Marketing Officer', abbr: 'CMO / Vice-CMO', summary: 'Own publicity, promotions, audience engagement and the digital presence of Cardinals.',
          duties: ['Manage official social media so content fits the club’s identity', 'Plan marketing strategies and online campaigns for every program', 'Reach students across every school and program', 'Work with the Creatives office on timely promotional materials', 'Keep official accounts secure with safe credential and access practices'] }
      ]
    },
    {
      id: 'relations', name: 'Relations and Communications', sub: 'Chief and Vice Chief Relations Officer',
      note: 'Builds the bridges to schools, partners, speakers and sponsors.',
      roles: [
        { title: 'Chief Relations Officer and Vice Chief Relations Officer', abbr: 'CRO / Vice-CRO', summary: 'Oversee external relations, partnerships and school-to-school coordination.',
          duties: ['Find and coordinate with resource speakers, partners and sponsors', 'Build partnerships with schools, student groups, government, industry and tech communities', 'Handle official letters, invitations and proposals professionally', 'Prepare and organize partnership proposals and agreements', 'Protect contacts and sensitive partnership information'] }
      ]
    },
    {
      id: 'creatives', name: 'Creatives and Multimedia', sub: 'Design, photo, video and editing',
      note: 'Shapes how Cardinals looks, sounds and is remembered.',
      roles: [
        { title: 'Chief Creatives Officer and Vice Chief Creatives Officer', abbr: 'CCO / Vice-CCO', summary: 'Set the creative direction and visual identity.',
          duties: ['Create publication materials, graphics and layouts', 'Keep branding and design standards consistent', 'Develop creative concepts for campaigns, programs and events', 'Prepare presentations, infographics and documentation layouts'] },
        { title: 'Chief Creatives Multimedia Officer', abbr: 'CCMO', summary: 'Leads photography, videography, editing and digital documentation.',
          duties: ['Plan multimedia coverage for programs and events', 'Coordinate photographers and videographers during activities', 'Supervise editing and check quality of multimedia outputs', 'Keep an organized digital archive of official files'] },
        { title: 'Associate Vice Chief Creatives Officer, Photography', summary: 'The club’s photographer at official activities.',
          duties: ['Cover official activities for documentation and promotion', 'Organize, back up and submit photos to the multimedia team'] },
        { title: 'Associate Vice Chief Creatives Officer, Editor', summary: 'Edits and polishes photos, graphics and videos. Two editor positions are available.',
          duties: ['Edit assigned materials to approved creative and branding standards', 'Prepare publication-ready and documentation-ready files', 'Keep working files and final outputs organized'], slots: 'Two positions' },
        { title: 'Associate Vice Chief Creatives Officer, Videography', summary: 'Captures and produces the club’s video content.',
          duties: ['Plan and shoot video coverage with the CCMO', 'Organize and submit footage for storage and post-production', 'Help produce official video materials'] }
      ]
    },
    {
      id: 'advisory', name: 'Advisory and Consultancy', sub: 'Adviser and Consultant',
      note: 'These seats guide the club but are not part of the Executive Leadership, so they are not open for this application.',
      roles: [
        { title: 'Organization Adviser', summary: 'Provides guidance, mentorship and institutional support.',
          duties: ['Recommends improvements to plans, programs and policies', 'Helps the club follow institutional policies and procedures', 'Mentors officers and members in leadership and governance'] },
        { title: 'Consultant', summary: 'Brings specialized academic, technical or industry expertise.',
          duties: ['Advises on projects, workshops and training activities', 'Mentors officers and members in their field', 'Helps shape industry-oriented learning opportunities'] }
      ]
    }
  ];

  var BENEFITS = [
    { cls: 'hot', icon: 'book', title: 'Learn by building', text: 'Join workshops, study sessions and hands-on projects around AWS, cloud and technology, and grow alongside students who want to learn the same things.' },
    { icon: 'users', title: 'A wide student network', text: 'Meet and collaborate with students from different schools and programs.' },
    { cls: 'paper', icon: 'compass', title: 'Mentorship', text: 'Get guidance from the Organization Adviser and Consultants with real expertise.' },
    { icon: 'briefcase', title: 'Industry doors', text: 'Meet speakers, partners and sponsors through the Relations office.' },
    { cls: 'hot', icon: 'award', title: 'Leadership for your resume', text: 'Run a real office, manage a budget, plan an event or lead a campaign. You leave with responsibilities you can talk about in any interview.' },
    { cls: 'paper', icon: 'globe', title: 'Portfolio-ready work', text: 'Designs, videos, events, proposals and reports you helped create are proof of what you can do.' },
    { icon: 'shield', title: 'Responsible tech culture', text: 'Practice professionalism, integrity and safe handling of accounts and data from day one.' }
  ];

  var ICONS = {
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    compass: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/>',
    briefcase: '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>'
  };

  var FAQS = [
    ['Who can apply?', 'Everyone. Cardinals is open to all students, whatever your school, program or year level.'],
    ['How do I apply?', 'Fill out the application form in the Apply section. If it does not load on the page, use the Open in new tab button.'],
    ['Do I need AWS experience?', 'No. The club exists to help students learn. Tell us what you have done so far and what you want to learn.'],
    ['Can I apply for Adviser or Consultant?', 'No. Advisers and Consultants guide the club in an advisory capacity and are not part of the Executive Leadership.'],
    ['Which role should I choose?', 'Open the Roles section, read the duties of each office, and pick the one that matches your strengths. Creatives, marketing, operations, finance and relations all need different skills.']
  ];

  /* ---------- Helpers ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  /* ---------- Loader ---------- */
  (function loader() {
    var L = $('#loader');
    function finish() { root.classList.add('ready'); if (L) { L.classList.add('done'); setTimeout(function () { L.remove(); }, 1100); } }
    if (reduce || !L) { if (L) L.remove(); root.classList.add('ready'); return; }
    var num = $('#ldNum'), bar = $('#ldBar'), t0 = performance.now(), dur = 1500;
    (function step(t) {
      var p = clamp((t - t0) / dur, 0, 1), e = 1 - Math.pow(1 - p, 3);
      num.textContent = Math.round(e * 100); bar.style.width = (e * 100) + '%';
      if (p < 1) requestAnimationFrame(step); else setTimeout(finish, 250);
    })(t0);
  })();

  /* ---------- Smooth scrolling (eased wheel + anchor scrolling) ---------- */
  var smooth = (function () {
    var api = { scrollTo: function (y) { window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' }); } };
    if (reduce || !finePointer) return api;
    root.classList.add('smooth');
    var target = window.scrollY, current = window.scrollY, running = false;
    function max() { return document.documentElement.scrollHeight - window.innerHeight; }
    function tick() {
      current += (target - current) * 0.09;
      if (Math.abs(target - current) < 0.4) { current = target; running = false; }
      window.scrollTo(0, current);
      if (running) requestAnimationFrame(tick);
    }
    function go(y) { target = clamp(y, 0, max()); if (!running) { running = true; current = window.scrollY; requestAnimationFrame(tick); } }
    function scrollableAncestor(n) {
      while (n && n !== document.body && n !== root) {
        if (n.scrollHeight > n.clientHeight + 1) { var oy = getComputedStyle(n).overflowY; if (oy === 'auto' || oy === 'scroll') return true; }
        n = n.parentElement;
      }
      return false;
    }
    window.addEventListener('wheel', function (e) {
      if (e.ctrlKey || e.defaultPrevented || scrollableAncestor(e.target)) return;
      e.preventDefault();
      go((running ? target : window.scrollY) + e.deltaY * (e.deltaMode === 1 ? 34 : 1));
    }, { passive: false });
    window.addEventListener('scroll', function () { if (!running) { target = current = window.scrollY; } }, { passive: true });
    api.scrollTo = go;
    return api;
  })();

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (id.length < 2) return;
    var t = document.getElementById(id.slice(1)); if (!t) return;
    e.preventDefault();
    smooth.scrollTo(t.getBoundingClientRect().top + window.scrollY - 70);
    if (history.replaceState) history.replaceState(null, '', id);
  });

  /* ---------- Starfield ---------- */
  (function stars() {
    var c = $('#stars'), x = c.getContext('2d');
    var w, h, dpr, list = [], mx = 0, my = 0, tx = 0, ty = 0, shoot = null, nextShoot = 3000;
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.width = innerWidth * dpr; h = c.height = innerHeight * dpr;
      c.style.width = innerWidth + 'px'; c.style.height = innerHeight + 'px';
      var n = Math.min(260, Math.floor(innerWidth * innerHeight / 6500));
      list = [];
      for (var i = 0; i < n; i++) list.push({ x: Math.random() * w, y: Math.random() * h, z: Math.random() * .85 + .15, t: Math.random() * 6.28, red: Math.random() > .92 });
    }
    function frame(t) {
      x.clearRect(0, 0, w, h);
      mx += (tx - mx) * .05; my += (ty - my) * .05;
      var sy = (window.scrollY || 0) * dpr;
      for (var i = 0; i < list.length; i++) {
        var s = list[i];
        var px = ((s.x + mx * s.z * 40 * dpr) % w + w) % w;
        var py = ((s.y - sy * s.z * .18 + my * s.z * 40 * dpr) % h + h) % h;
        var a = .35 + .65 * Math.abs(Math.sin(t / 900 * s.z + s.t));
        var r = (s.z * 1.6 + .3) * dpr;
        x.globalAlpha = a * (.4 + s.z * .6);
        x.fillStyle = s.red ? '#FF4D5E' : '#fff';
        x.fillRect(px, py, r * 1.6, r * 1.6);
      }
      x.globalAlpha = 1;
      if (!shoot && t > nextShoot) { shoot = { x: Math.random() * w * .8, y: Math.random() * h * .4, l: 0 }; nextShoot = t + 5000 + Math.random() * 6000; }
      if (shoot) {
        shoot.l += 14 * dpr; shoot.x += 12 * dpr; shoot.y += 6 * dpr;
        var g = x.createLinearGradient(shoot.x, shoot.y, shoot.x - shoot.l * 2, shoot.y - shoot.l);
        g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(1, 'rgba(235,28,45,0)');
        x.strokeStyle = g; x.lineWidth = 2 * dpr; x.beginPath();
        x.moveTo(shoot.x, shoot.y); x.lineTo(shoot.x - shoot.l * 2, shoot.y - shoot.l); x.stroke();
        if (shoot.x > w + 200 || shoot.l > 260 * dpr) shoot = null;
      }
      if (!reduce) requestAnimationFrame(frame);
    }
    size();
    window.addEventListener('resize', size);
    window.addEventListener('pointermove', function (e) { tx = (e.clientX / innerWidth - .5) * 2; ty = (e.clientY / innerHeight - .5) * 2; });
    requestAnimationFrame(frame);
  })();

  /* ---------- Nav, progress, parallax ---------- */
  var nav = $('#nav'), prog = $('#progress'), art = $('#heroArt'), bg = $('#heroBg');
  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle('stuck', y > 40);
    var m = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = 'scaleX(' + (m > 0 ? y / m : 0) + ')';
    if (!reduce && y < innerHeight * 1.2) {
      art.style.translate = '0 ' + (y * .12) + 'px';
      bg.style.setProperty('--bgx', (-y * .25) + 'px');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* mascot tilt */
  var mascot = $('.mascot');
  if (!reduce && finePointer) {
    art.addEventListener('pointermove', function (e) {
      var b = art.getBoundingClientRect();
      var dx = (e.clientX - b.left) / b.width - .5, dy = (e.clientY - b.top) / b.height - .5;
      mascot.style.transform = 'rotateY(' + dx * 18 + 'deg) rotateX(' + (-dy * 18) + 'deg) scale(1.05)';
    });
    art.addEventListener('pointerleave', function () { mascot.style.transform = ''; });
  }

  /* ---------- Cursor ring, magnetic buttons, spotlight ---------- */
  if (finePointer && !reduce) {
    var cur = $('#cursor'), cx = 0, cy = 0, px = 0, py = 0;
    window.addEventListener('pointermove', function (e) { cx = e.clientX; cy = e.clientY; cur.classList.add('on'); });
    document.addEventListener('pointerleave', function () { cur.classList.remove('on'); });
    (function loop() { px += (cx - px) * .18; py += (cy - py) * .18; cur.style.transform = 'translate(' + px + 'px,' + py + 'px)'; requestAnimationFrame(loop); })();
    document.addEventListener('pointerover', function (e) { cur.classList.toggle('big', !!(e.target.closest && e.target.closest('a,button,.tab,.q button,.slide'))); });

    document.addEventListener('pointermove', function (e) {
      var b = e.target.closest && e.target.closest('.btn');
      $$('.btn').forEach(function (n) { if (n !== b) { n.style.removeProperty('--mx'); n.style.removeProperty('--my'); } });
      if (b) { var r = b.getBoundingClientRect(); b.style.setProperty('--mx', ((e.clientX - r.left - r.width / 2) * .25) + 'px'); b.style.setProperty('--my', ((e.clientY - r.top - r.height / 2) * .35) + 'px'); }
    });
  }
  document.addEventListener('pointermove', function (e) {
    var s = e.target.closest && e.target.closest('.spot'); if (!s) return;
    var r = s.getBoundingClientRect(); s.style.setProperty('--x', (e.clientX - r.left) + 'px'); s.style.setProperty('--y', (e.clientY - r.top) + 'px');
  });

  /* ---------- Titles split into words, scroll reveal ---------- */
  $$('.split-title').forEach(function (h) {
    var words = h.textContent.trim().split(/\s+/);
    h.setAttribute('aria-label', h.textContent.trim());
    h.innerHTML = words.map(function (w, i) { return '<span class="w" aria-hidden="true"><span style="--i:' + i + '">' + esc(w) + '</span></span>'; }).join('');
  });
  var io = null;
  if ('IntersectionObserver' in window && !reduce) {
    io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  }
  function watch(n) { if (io) io.observe(n); else n.classList.add('in'); }
  $$('.reveal,.split-title').forEach(watch);

  /* ---------- Lead ---------- */
  (function lead() {
    var L = CONFIG.lead, nm = $('#leadName'), ph = $('#leadPhoto'), q = $('#leadQuote');
    if (L.name) nm.textContent = L.name; else { nm.textContent = 'Name of the Lead'; nm.classList.add('empty'); }
    if (L.photo) { var im = el('img', 'ph'); im.src = L.photo; im.alt = 'Portrait of ' + (L.name || 'the Lead'); ph.appendChild(im); }
    else { var f = el('img', 'fallback'); f.src = './logo-512.png'; f.alt = ''; ph.appendChild(f); }
    if (L.message) { q.textContent = '“' + L.message + '”'; q.hidden = false; }
  })();

  /* ---------- Roles explorer ---------- */
  var tabs = $('#tabs'), panel = $('#panel');
  function renderOffice(o) {
    panel.innerHTML = '';
    panel.appendChild(el('p', 'office-note', esc(o.note)));
    o.roles.forEach(function (r, i) {
      var card = el('article', 'role spot');
      card.style.animationDelay = (i * 80) + 'ms';
      card.innerHTML =
        '<h4>' + esc(r.title) + (r.abbr ? '<span class="abbr">' + esc(r.abbr) + '</span>' : '') + '</h4>' +
        '<p>' + esc(r.summary) + '</p>' +
        '<ul>' + r.duties.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>' +
        (r.slots ? '<div class="slots">' + esc(r.slots) + '</div>' : '');
      panel.appendChild(card);
    });
  }
  OFFICES.forEach(function (o, i) {
    var b = el('button', 'tab', esc(o.name) + '<small>' + esc(o.sub) + '</small>');
    b.type = 'button'; b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', i === 0 ? 'true' : 'false'); b.id = 'tab-' + o.id;
    b.addEventListener('click', function () {
      $$('.tab', tabs).forEach(function (t) { t.setAttribute('aria-selected', 'false'); });
      b.setAttribute('aria-selected', 'true');
      renderOffice(o);
    });
    tabs.appendChild(b);
  });
  renderOffice(OFFICES[0]);

  /* ---------- Benefits carousel ---------- */
  (function carousel() {
    var vp = $('#vp'), rail = $('#rail'), dotsBox = $('#dots'), barEl = $('#cBar'), wrap = $('#carousel');
    var slides = BENEFITS.map(function (b, i) {
      var s = el('article', 'slide spot ' + (b.cls || ''),
        '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[b.icon] + '</svg><div><h3>' + esc(b.title) + '</h3><p>' + esc(b.text) + '</p></div>');
      s.setAttribute('role', 'group'); s.setAttribute('aria-roledescription', 'slide'); s.setAttribute('aria-label', (i + 1) + ' of ' + BENEFITS.length);
      rail.appendChild(s); return s;
    });
    var dots = slides.map(function (s, i) {
      var d = el('button'); d.type = 'button'; d.setAttribute('aria-label', 'Go to benefit ' + (i + 1));
      d.addEventListener('click', function () { go(i, true); }); dotsBox.appendChild(d); return d;
    });
    var idx = 0, step = 0, maxOff = 0, off = 0, dragging = false, startX = 0, startOff = 0, lastX = 0, lastT = 0, vel = 0, moved = false;
    var DUR = 5400, elapsed = 0, hover = false, visible = false, lastFrame = 0;

    function measure() {
      var gap = parseFloat(getComputedStyle(rail).columnGap) || 22;
      step = slides[0].offsetWidth + gap;
      maxOff = Math.max(0, rail.scrollWidth - vp.clientWidth);
    }
    function render(animate) {
      off = clamp(idx * step, 0, maxOff);
      rail.classList.toggle('nodrag', !animate);
      rail.style.transform = 'translateX(' + (-off) + 'px)';
      slides.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
      dots.forEach(function (d, i) { if (i === idx) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
    }
    function go(i, user) {
      idx = (i + slides.length) % slides.length; elapsed = 0; render(true);
      if (user) elapsed = -1200; // short grace after manual use
    }
    $('#prev').addEventListener('click', function () { go(idx - 1, true); });
    $('#next').addEventListener('click', function () { go(idx + 1, true); });
    wrap.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') go(idx - 1, true); if (e.key === 'ArrowRight') go(idx + 1, true); });
    slides.forEach(function (s, i) { s.addEventListener('click', function () { if (!moved && i !== idx) go(i, true); }); });

    vp.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      dragging = true; moved = false; startX = lastX = e.clientX; startOff = off; vel = 0; lastT = performance.now();
      vp.classList.add('drag'); rail.classList.add('nodrag');
    });
    window.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - startX; if (Math.abs(dx) > 6) moved = true;
      var now = performance.now(); vel = (e.clientX - lastX) / Math.max(1, now - lastT); lastX = e.clientX; lastT = now;
      var o = startOff - dx; if (o < 0) o *= .35; if (o > maxOff) o = maxOff + (o - maxOff) * .35;
      rail.style.transform = 'translateX(' + (-o) + 'px)';
    });
    function release(e) {
      if (!dragging) return; dragging = false; vp.classList.remove('drag');
      var dx = e.clientX - startX;
      var next = idx;
      if (Math.abs(dx) > step * .18 || Math.abs(vel) > .5) next = idx + (dx < 0 ? 1 : -1);
      idx = clamp(next, 0, slides.length - 1); elapsed = -1200; render(true);
      setTimeout(function () { moved = false; }, 0);
    }
    window.addEventListener('pointerup', release); window.addEventListener('pointercancel', release);
    vp.addEventListener('dragstart', function (e) { e.preventDefault(); });

    wrap.addEventListener('pointerenter', function () { hover = true; });
    wrap.addEventListener('pointerleave', function () { hover = false; });
    wrap.addEventListener('focusin', function () { hover = true; });
    wrap.addEventListener('focusout', function () { hover = false; });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: .25 }).observe(wrap); else visible = true;

    (function auto(t) {
      var dt = Math.min(64, t - (lastFrame || t)); lastFrame = t;
      if (!reduce && visible && !hover && !dragging && !document.hidden) elapsed += dt;
      var p = clamp(elapsed / DUR, 0, 1); barEl.style.width = (p * 100) + '%';
      if (elapsed >= DUR) go(idx + 1, false);
      requestAnimationFrame(auto);
    })(0);

    measure(); render(false);
    window.addEventListener('resize', function () { measure(); render(false); });
    window.addEventListener('load', function () { measure(); render(false); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { measure(); render(false); });
  })();

  /* ---------- FAQ ---------- */
  var faq = $('#faqList');
  FAQS.forEach(function (f) {
    var q = el('div', 'q'); q.dataset.open = 'false';
    q.innerHTML = '<button type="button" aria-expanded="false">' + esc(f[0]) + '</button><div class="a"><div><p>' + esc(f[1]) + '</p></div></div>';
    var btn = $('button', q);
    btn.addEventListener('click', function () { var open = q.dataset.open !== 'true'; q.dataset.open = open; btn.setAttribute('aria-expanded', open); });
    faq.appendChild(q);
  });

  /* ---------- Application form frame ---------- */
  (function formFrame() {
    var f = $('#formFrame'), box = f.parentElement;
    f.addEventListener('load', function () { box.classList.add('loaded'); });
    setTimeout(function () { /* keep skeleton hint visible if the frame is blocked */ }, 0);
  })();

  /* ---------- Mobile menu, active link, back to top ---------- */
  (function chrome() {
    var mb = $('#menuBtn'), mn = $('#mobileNav'), tt = $('#toTop');
    function setMenu(o) { nav.classList.toggle('open', o); mn.classList.toggle('open', o); mb.setAttribute('aria-expanded', o); mb.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); }
    mb.addEventListener('click', function () { setMenu(!mn.classList.contains('open')); });
    mn.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    tt.addEventListener('click', function () { smooth.scrollTo(0); });
    window.addEventListener('scroll', function () { tt.classList.toggle('show', window.scrollY > innerHeight * .8); }, { passive: true });
    if ('IntersectionObserver' in window) {
      var links = $$('.links a');
      var so = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id); });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      ['about', 'lead', 'roles', 'benefits', 'faq'].forEach(function (id) { var s = document.getElementById(id); if (s) so.observe(s); });
    }
  })();

  /* ---------- Footer ---------- */
  $('#year-now').textContent = new Date().getFullYear();
  var soc = $('#socials');
  Object.keys(CONFIG.links).forEach(function (k) {
    if (!CONFIG.links[k]) return;
    var a = el('a', '', esc(k)); a.href = CONFIG.links[k]; a.target = '_blank'; a.rel = 'noopener'; soc.appendChild(a);
  });
  if (!soc.children.length) soc.remove();
})();
