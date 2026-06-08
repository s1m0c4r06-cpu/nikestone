/* ==========================================================
   NIKESTONE — SCRIPT.JS
   ========================================================== */
(function(){
'use strict';

document.addEventListener('DOMContentLoaded', init);

function init(){
  initNav();
  initMobileMenu();
  initReveals();
  initFormSelection();   // <-- fixes radio/checkbox selection (visible state)
  initSteppedForm();
  initLangSwitcher();
  initSmoothScroll();
  initPortfolioFilter();
  initLightbox();
  initScrollProgress();
  initStatCounters();
  initActiveNav();
  initMagnetic();
}

/* ------------------ NAV scroll state ------------------ */
function initNav(){
  const nav = document.getElementById('nav');
  if(!nav) return;
  let lastY = -1;
  function update(){
    const y = window.scrollY;
    if(y === lastY) return;
    lastY = y;
    nav.setAttribute('data-state', y > 30 ? 'scrolled' : 'top');
  }
  update();
  window.addEventListener('scroll', () => requestAnimationFrame(update), {passive:true});
}

/* ------------------ MOBILE MENU ------------------ */
function initMobileMenu(){
  const ham = document.getElementById('ham');
  const mob = document.getElementById('mob');
  if(!ham || !mob) return;
  const links = mob.querySelectorAll('a.mob-lnk, .mob-ig');

  function toggle(open){
    const o = (typeof open === 'boolean') ? open : !mob.classList.contains('is-open');
    mob.classList.toggle('is-open', o);
    ham.classList.toggle('is-open', o);
    ham.setAttribute('aria-expanded', o);
    mob.setAttribute('aria-hidden', !o);
    document.body.style.overflow = o ? 'hidden' : '';
  }
  ham.addEventListener('click', () => toggle());
  links.forEach(l => l.addEventListener('click', () => toggle(false)));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') toggle(false); });
}

/* ------------------ REVEAL ON SCROLL ------------------ */
function initReveals(){
  const items = document.querySelectorAll('.rev');
  if(!items.length) return;
  if(!('IntersectionObserver' in window)){
    items.forEach(el => el.classList.add('is-vis'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en, i) => {
      if(en.isIntersecting){
        // small stagger for siblings
        const sib = Array.from(en.target.parentElement?.children || []).filter(c => c.classList.contains('rev'));
        const idx = sib.indexOf(en.target);
        en.target.style.transitionDelay = (Math.min(idx, 5) * 80) + 'ms';
        en.target.classList.add('is-vis');
        io.unobserve(en.target);
      }
    });
  }, { rootMargin: '0px 0px -80px 0px', threshold: 0.05 });
  items.forEach(el => io.observe(el));
}

/* ------------------ MULTI-STEP FORM ------------------ */
function initSteppedForm(){
  const form = document.getElementById('contactForm');
  if(!form) return;

  const steps = form.querySelectorAll('.fstep');
  const fpSteps = form.querySelectorAll('.fp-step');
  const fpFills = form.querySelectorAll('.fp-fill');
  const fileInput = document.getElementById('fileInput');
  const fileDisplay = document.getElementById('fileDisplay');
  const msgBox = document.getElementById('formMsg');
  const replyHidden = document.getElementById('hReply');
  let current = 1;

  function setStep(n){
    if(n < 1 || n > steps.length) return;
    current = n;
    steps.forEach(s => s.classList.toggle('is-active', +s.dataset.step === n));
    fpSteps.forEach(s => {
      const v = +s.dataset.step;
      s.classList.toggle('active', v === n);
      s.classList.toggle('done', v < n);
    });
    // fill progress bars
    fpFills.forEach((f, i) => {
      f.style.width = (i < n - 1) ? '100%' : (i === n - 1 ? '50%' : '0%');
    });
    // scroll to top of form smoothly
    form.scrollIntoView({behavior:'smooth', block:'start'});
  }

  function validateStep(n){
    const step = form.querySelector('.fstep[data-step="' + n + '"]');
    if(!step) return true;
    const req = step.querySelectorAll('[required]');
    let ok = true;
    req.forEach(el => {
      if(el.type === 'radio'){
        const group = step.querySelectorAll('[name="' + el.name + '"]');
        const any = Array.from(group).some(r => r.checked);
        const choice = group[0].closest('.choice');
        if(!any){ ok = false; if(choice){ choice.classList.add('is-bad'); group.forEach(r=>r.addEventListener('change',()=>choice.classList.remove('is-bad'),{once:true})); } }
        else if(choice){ choice.classList.remove('is-bad'); }
      } else if(!el.value || (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value))){
        ok = false; markBad(el);
      } else clearBad(el);
    });
    if(!ok){
      showMsg('Compila i campi obbligatori per continuare.', 'err');
      setTimeout(() => msgBox.classList.remove('err'), 4000);
    }
    return ok;
  }

  function markBad(el){
    if(!el) return;
    el.style.borderColor = 'var(--err)';
    el.addEventListener('input', function clr(){ el.style.borderColor=''; el.removeEventListener('input', clr); }, {once:true});
    el.addEventListener('change', function clr(){ el.style.borderColor=''; el.removeEventListener('change', clr); }, {once:true});
  }
  function clearBad(el){ if(el) el.style.borderColor = ''; }

  function showMsg(text, kind){
    if(!msgBox) return;
    msgBox.textContent = text;
    msgBox.classList.remove('ok','err');
    msgBox.classList.add(kind);
  }

  // step navigation
  form.querySelectorAll('[data-next]').forEach(b => b.addEventListener('click', () => {
    if(validateStep(current)) setStep(+b.dataset.next);
  }));
  form.querySelectorAll('[data-prev]').forEach(b => b.addEventListener('click', () => setStep(+b.dataset.prev)));

  // file display
  if(fileInput && fileDisplay){
    fileDisplay.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
      const f = fileInput.files[0];
      if(!f){ fileDisplay.textContent = 'Nessun file selezionato'; return; }
      if(f.size > 20 * 1024 * 1024){
        fileDisplay.textContent = 'File troppo grande (max 20MB)';
        fileDisplay.style.color = 'var(--err)';
        fileInput.value = '';
        return;
      }
      fileDisplay.style.color = '';
      fileDisplay.textContent = '📎 ' + f.name + '  ·  ' + (f.size/1024/1024).toFixed(2) + ' MB';
    });
  }

  // submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(!validateStep(3)) return;

    // sync reply-to
    const emailF = form.querySelector('[name="email"]');
    if(emailF && replyHidden) replyHidden.value = emailF.value;

    const btn = form.querySelector('[type="submit"]');
    const ot = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Invio in corso…';
    showMsg('', '');

    try {
      const fd = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: fd,
        headers: { 'Accept':'application/json' }
      });
      if(res.ok){
        showMsg('Richiesta inviata. Un nostro responsabile vi contatterà entro 48 ore lavorative. Grazie.', 'ok');
        form.reset();
        if(fileDisplay) fileDisplay.textContent = 'Nessun file selezionato';
        setTimeout(() => setStep(1), 600);
      } else {
        const data = await res.json().catch(() => ({}));
        showMsg(data.error || 'Errore nell\'invio. Scrivici direttamente a massimoangelino23@gmail.com.', 'err');
      }
    } catch(err){
      showMsg('Errore di rete. Scrivici a massimoangelino23@gmail.com o chiamaci al +39 331 638 1673.', 'err');
    } finally {
      btn.disabled = false;
      btn.textContent = ot;
    }
  });
}

/* ------------------ FORM SELECTION (radio/checkbox visible state) ------------------ */
/* Root fix: guarantees a visible "selected" state on every browser,
   independent of :has() / input::after support. */
function initFormSelection(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  const inputs = form.querySelectorAll('.opt input, .mopt input, .vopt input, .check input');
  function sync(input){
    const wrap = input.closest('.opt, .mopt, .vopt, .check');
    if(!wrap) return;
    if(input.type === 'radio'){
      // clear siblings in the same group, mark this one
      form.querySelectorAll('input[name="'+CSS.escape(input.name)+'"]').forEach(r => {
        const w = r.closest('.opt, .mopt, .vopt, .check');
        if(w) w.classList.toggle('is-checked', r.checked);
      });
    } else {
      wrap.classList.toggle('is-checked', input.checked);
    }
  }
  inputs.forEach(input => {
    input.addEventListener('change', () => sync(input));
    // also catch clicks on the wrapping label (belt & suspenders)
    const wrap = input.closest('.opt, .mopt, .vopt, .check');
    if(wrap) wrap.addEventListener('click', e => {
      if(e.target.tagName !== 'INPUT'){ /* let native toggle run, then sync */ }
      requestAnimationFrame(() => sync(input));
    });
    sync(input); // initial state (handles browser autofill/restore)
  });
}

/* ------------------ PORTFOLIO FILTER ------------------ */
function initPortfolioFilter(){
  const chips = document.querySelectorAll('.pf-chip');
  if(!chips.length) return;
  const heads  = document.querySelectorAll('[data-pf-head]');
  const groups = document.querySelectorAll('[data-pf-group]');
  chips.forEach(chip => chip.addEventListener('click', () => {
    const f = chip.dataset.filter;
    chips.forEach(c => c.classList.toggle('is-active', c === chip));
    const show = (key) => (f === 'all' || f === key);
    heads.forEach(h => h.hidden = !show(h.dataset.pfHead));
    groups.forEach(g => {
      const on = show(g.dataset.pfGroup);
      g.hidden = !on;
      if(on) g.querySelectorAll('.gitem').forEach((it,i) => {
        it.classList.remove('pf-in'); void it.offsetWidth;
        it.style.animationDelay = Math.min(i,8)*40 + 'ms';
        it.classList.add('pf-in');
      });
    });
  }));
}

/* ------------------ LIGHTBOX ------------------ */
function initLightbox(){
  const lb = document.getElementById('lightbox');
  if(!lb) return;
  const img = document.getElementById('lbImg');
  const count = document.getElementById('lbCount');
  const btnClose = document.getElementById('lbClose');
  const btnPrev = document.getElementById('lbPrev');
  const btnNext = document.getElementById('lbNext');
  let items = [], idx = 0;

  function visibleItems(){
    return Array.from(document.querySelectorAll('.gallery:not([hidden]) .gitem img'));
  }
  function open(i){
    items = visibleItems();
    idx = i;
    show();
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function show(){
    const el = items[idx];
    if(!el) return;
    img.src = el.currentSrc || el.src;
    img.alt = el.alt || '';
    count.textContent = (idx+1) + ' / ' + items.length;
  }
  function close(){
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    img.src = '';
  }
  function move(d){ idx = (idx + d + items.length) % items.length; show(); }

  document.addEventListener('click', e => {
    const fig = e.target.closest('.gitem');
    if(!fig) return;
    const imgs = visibleItems();
    const i = imgs.indexOf(fig.querySelector('img'));
    if(i > -1) open(i);
  });
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => move(-1));
  btnNext.addEventListener('click', () => move(1));
  lb.addEventListener('click', e => { if(e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if(!lb.classList.contains('is-open')) return;
    if(e.key === 'Escape') close();
    else if(e.key === 'ArrowLeft') move(-1);
    else if(e.key === 'ArrowRight') move(1);
  });
  // swipe
  let sx = 0;
  lb.addEventListener('touchstart', e => sx = e.touches[0].clientX, {passive:true});
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if(Math.abs(dx) > 50) move(dx < 0 ? 1 : -1);
  }, {passive:true});
}

/* ------------------ SCROLL PROGRESS ------------------ */
function initScrollProgress(){
  const bar = document.createElement('div');
  bar.className = 'scroll-prog';
  document.body.appendChild(bar);
  function upd(){
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  }
  upd();
  window.addEventListener('scroll', () => requestAnimationFrame(upd), {passive:true});
}

/* ------------------ STAT COUNTERS ------------------ */
function initStatCounters(){
  const nums = document.querySelectorAll('.stat strong');
  if(!nums.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if(!en.isIntersecting) return;
      const el = en.target;
      const raw = el.textContent.trim();
      const m = raw.match(/(\d+)/);
      if(m){
        const target = +m[1];
        const suffix = raw.replace(m[1], '');
        let cur = 0, steps = 28, inc = Math.max(1, Math.ceil(target/steps));
        const tick = () => {
          cur = Math.min(target, cur + inc);
          el.textContent = cur + suffix;
          if(cur < target) requestAnimationFrame(tick);
        };
        tick();
      }
      io.unobserve(el);
    });
  }, {threshold:.6});
  nums.forEach(n => io.observe(n));
}

/* ------------------ ACTIVE NAV (scroll spy) ------------------ */
function initActiveNav(){
  const links = Array.from(document.querySelectorAll('.primary a[href^="#"]'));
  if(!links.length || !('IntersectionObserver' in window)) return;
  const map = new Map();
  links.forEach(a => { const s = document.querySelector(a.getAttribute('href')); if(s) map.set(s, a); });
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if(en.isIntersecting){
        links.forEach(l => l.classList.remove('is-current'));
        const a = map.get(en.target);
        if(a) a.classList.add('is-current');
      }
    });
  }, {rootMargin:'-45% 0px -50% 0px'});
  map.forEach((a, s) => io.observe(s));
}

/* ------------------ MAGNETIC BUTTONS ------------------ */
function initMagnetic(){
  if(matchMedia('(hover:none)').matches || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  document.querySelectorAll('.btn-solid, .btn-on-dark').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      btn.style.transform = 'translate(' + x*0.18 + 'px,' + (y*0.18 - 2) + 'px)';
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

/* ------------------ LANG SWITCHER (IT/FR) ------------------ */
const TRANSLATIONS = {
  it: {
    'nav.about':'Chi siamo','nav.stone':'La Pietra','nav.work':'Lavori','nav.process':'Metodo',
    'nav.svc':'Servizi','nav.catalog':'Cataloghi','nav.contact':'Contatti','nav.cta':'Preventivo',
    'hero.kicker':'Pietra di Luserna · Val Pellice, Piemonte',
    'hero.h1a':'La pietra','hero.h1b':'che resta.',
    'hero.sub':'Lavoriamo e posiamo Pietra di Luserna per chalet di lusso, ville private e progetti d\'autore. Quarant\'anni di mestiere artigianale tra Piemonte, Alpi francesi e Svizzera.',
    'hero.cta1':'Vedi i lavori','hero.cta2':'Inizia il tuo progetto',
    'about.kicker':'Chi siamo',
    'about.h':'Una bottega artigiana ai piedi del Monviso.',
    'about.p1':'Nikestone nasce dalle mani dei fratelli Massimo e Mauro Angelino: quattro decenni di pietra lavorata e posata in cantieri tra Piemonte, Francia e Svizzera. Non estraiamo, non passiamo alla CNC: scegliamo i blocchi in cava, li tagliamo e li posiamo a mano, secondo l\'arte del muratore di pietra che è sempre stata di famiglia.',
    'about.p2':'Lavoriamo per chi non accetta scorciatoie: architetti, interior designer, general contractor e committenti privati che vogliono superfici autentiche, non rivestimenti finti. Ogni progetto è un dialogo: blocchi selezionati uno a uno, finiture concordate, posa in cantiere senza intermediari.',
    'about.sign':'— Massimo & Mauro Angelino',
    'luserna.kicker':'La Pietra di Luserna',
    'luserna.h':'Uno gneiss antico, nobile per natura.',
    'portfolio.kicker':'Lavori realizzati',
    'portfolio.h':'Selezione di progetti tra Italia, Francia e Svizzera.',
    'process.kicker':'Metodo',
    'process.h':'Dalla cava al cantiere, senza intermediari.',
    'services.kicker':'Servizi & lavorazioni',
    'services.h':'Quello che facciamo, fatto a regola d\'arte.',
    'cataloghi.kicker':'Cataloghi',
    'cataloghi.h':'Brochure e visualizzazioni per architetti e committenti.',
    'cataloghi.lead':'Materiali di riferimento per progettisti, studi di architettura e clienti privati. Disponibili in italiano e francese, su richiesta tramite il form contatti.',
    'contact.kicker':'Contatti',
    'contact.h':'Inizia il tuo progetto su misura.'
  },
  fr: {
    'nav.about':'À propos','nav.stone':'La Pierre','nav.work':'Réalisations','nav.process':'Méthode',
    'nav.svc':'Services','nav.catalog':'Catalogues','nav.contact':'Contact','nav.cta':'Devis',
    'hero.kicker':'Pierre de Luserne · Val Pellice, Piémont',
    'hero.h1a':'La pierre','hero.h1b':'qui demeure.',
    'hero.sub':'Nous taillons et posons la Pierre de Luserne pour chalets de prestige, villas privées et projets d\'auteur. Quarante ans de savoir-faire artisanal entre Piémont, Alpes françaises et Suisse.',
    'hero.cta1':'Voir les réalisations','hero.cta2':'Commencer votre projet',
    'about.kicker':'À propos',
    'about.h':'Un atelier artisanal au pied du Mont Viso.',
    'about.p1':'Nikestone est né des mains des frères Massimo et Mauro Angelino : quatre décennies de pierre travaillée et posée sur des chantiers entre le Piémont, la France et la Suisse. Nous n\'extrayons pas, nous ne passons pas à la CNC : nous choisissons les blocs en carrière, les coupons et les posons à la main, selon l\'art du tailleur de pierre transmis dans la famille.',
    'about.p2':'Nous travaillons pour ceux qui refusent les raccourcis : architectes, designers d\'intérieur, general contractors et maîtres d\'ouvrage privés qui veulent des surfaces authentiques, non des revêtements imités. Chaque projet est un dialogue : blocs sélectionnés un par un, finitions concertées, pose sur chantier sans intermédiaires.',
    'about.sign':'— Massimo & Mauro Angelino',
    'luserna.kicker':'La Pierre de Luserne',
    'luserna.h':'Un gneiss ancien, noble par nature.',
    'portfolio.kicker':'Réalisations',
    'portfolio.h':'Sélection de projets entre Italie, France et Suisse.',
    'process.kicker':'Méthode',
    'process.h':'De la carrière au chantier, sans intermédiaires.',
    'services.kicker':'Services & ouvrages',
    'services.h':'Ce que nous faisons, fait dans les règles de l\'art.',
    'cataloghi.kicker':'Catalogues',
    'cataloghi.h':'Brochures et visualisations pour architectes et maîtres d\'ouvrage.',
    'cataloghi.lead':'Documents de référence pour concepteurs, cabinets d\'architecture et clients privés. Disponibles en italien et en français, sur demande via le formulaire de contact.',
    'contact.kicker':'Contact',
    'contact.h':'Commencez votre projet sur mesure.'
  }
};

function initLangSwitcher(){
  const buttons = document.querySelectorAll('[data-lang]');
  buttons.forEach(b => b.addEventListener('click', e => {
    e.preventDefault();
    const lang = b.dataset.lang;
    setLang(lang);
  }));
  // restore from storage
  try {
    const stored = localStorage.getItem('nk_lang');
    if(stored && TRANSLATIONS[stored]) setLang(stored);
  } catch(e){}
}

function setLang(lang){
  if(!TRANSLATIONS[lang]) return;
  const dict = TRANSLATIONS[lang];
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
  document.querySelectorAll('[data-i]').forEach(el => {
    const k = el.dataset.i;
    if(dict[k]) el.textContent = dict[k];
  });
  document.querySelectorAll('[data-lang]').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  try { localStorage.setItem('nk_lang', lang); } catch(e){}
}

/* ------------------ SMOOTH SCROLL (offset for sticky nav) ------------------ */
function initSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if(id === '#' || id.length < 2) return;
      const t = document.querySelector(id);
      if(!t) return;
      e.preventDefault();
      const navH = document.getElementById('nav')?.offsetHeight || 0;
      const top = t.getBoundingClientRect().top + window.scrollY - navH + 1;
      window.scrollTo({ top, behavior: 'smooth' });
      if(history.pushState) history.pushState(null, '', id);
    });
  });
}

})();
