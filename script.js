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
  initSteppedForm();
  initMap();
  initLangSwitcher();
  initCatalogPrefill();
  initSmoothScroll();
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
        if(!any){ ok = false; markBad(group[0].closest('.choice')); }
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

/* ------------------ LEAFLET MAP ------------------ */
function initMap(){
  const el = document.getElementById('map');
  if(!el || typeof L === 'undefined') {
    // try again after Leaflet loads
    if(el) setTimeout(initMap, 400);
    return;
  }
  const lat = 44.7867, lng = 7.2587;
  const map = L.map(el, {
    center: [45.7, 6.6],
    zoom: 7,
    scrollWheelZoom: false,
    zoomControl: true,
    attributionControl: true
  });

  // CartoDB Positron — clean, luxury b/w aesthetic, no API key
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OSM</a> · © <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // labels overlay
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
    opacity: .9
  }).addTo(map);

  // custom marker — bronze diamond
  const icon = L.divIcon({
    className: 'nk-marker',
    html: '<div style="width:18px;height:18px;background:#c4a572;border:2px solid #0c2135;transform:rotate(45deg);box-shadow:0 2px 8px rgba(12,33,53,.4)"></div>',
    iconSize: [22,22],
    iconAnchor: [11,11]
  });
  L.marker([lat, lng], { icon: icon }).addTo(map)
    .bindPopup('<strong>Nikestone</strong><br>Via Bagnolo 23<br>10060 Bibiana (TO)')
    .openPopup();
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

/* ------------------ CATALOG PREFILL ------------------ */
function initCatalogPrefill(){
  document.querySelectorAll('.cat-card[data-cat]').forEach(c => {
    c.addEventListener('click', () => {
      const tag = c.dataset.cat;
      const noteFld = document.querySelector('textarea[name="note"]');
      if(noteFld){
        const labels = {
          dimora:'Richiesta brochure DIMORA (ville · attici · interni di pregio).',
          montagna:'Richiesta brochure MONTAGNA (chalet di lusso · coperture in lose · esterni).',
          '3d':'Interesse per visualizzazioni 3D dei progetti.'
        };
        if(labels[tag] && !noteFld.value.includes(labels[tag])){
          noteFld.value = (noteFld.value ? noteFld.value + '\n\n' : '') + labels[tag];
        }
      }
    });
  });
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
