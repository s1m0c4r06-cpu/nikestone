/* ============================================================
   NIKESTONE — Optimized Script with Working Form
   ============================================================ */

/* ============================================================
   CONFIG — READY FOR PRODUCTION
   ============================================================ */
const CONFIG = {
  // === FORM BACKEND (FORMSPREE) ===
  // 1. Sign up free at https://formspree.io
  // 2. Create form, get ID (e.g. "xrgjbpqd")
  // 3. Replace "YOUR_FORMSPREE_ID" below
  FORM_ENDPOINT: "https://formspree.io/f/YOUR_FORMSPREE_ID",
  
  // Alternative: Web3Forms (also free)
  // FORM_ENDPOINT: "https://api.web3forms.com/submit",
  // WEB3FORMS_KEY: "YOUR_ACCESS_KEY_HERE",
  
  // === GOOGLE ANALYTICS 4 ===
  // Set your GA4 measurement ID or leave empty
  GA4_ID: "",
  
  // === MAILCHIMP (optional) ===
  // For email marketing integration
  MAILCHIMP_URL: "",
  
  // === FACEBOOK PIXEL (optional) ===
  FB_PIXEL_ID: ""
};

/* ============================================================
   PROJECT DATA
   ============================================================ */
const PROJECTS = [
  { id:"villa-gaby",        img:"images/villa-gaby-marsiglia.jpg",   cat:"pavimentazioni", tag:"Pavimentazione · 2018",                       title:"Villa Gaby — Marsiglia",            desc:"Bordi piscina, scale e coronamenti curvi in Luserna fiammata. Sagomatura CNC, finitura a mano." },
  { id:"crans-tetto",       img:"images/crans-montana-tetto.jpg",    cat:"coperture",      tag:"Copertura · Crans-Montana, CH",               title:"Crans-Montana — Tetto in piode",     desc:"Manto di copertura tradizionale alpino in piode di Luserna. Durata centenaria, integrazione fotovoltaico." },
  { id:"chamonix-muro",     img:"images/chamonix-muro.jpg",          cat:"murature",       tag:"Muratura · Chamonix, FR",                     title:"Chamonix-Mont-Blanc",                desc:"Muratura listata in pietra a spacco, spessore 8-12 cm. Tecnica tradizionale savoiarda." },
  { id:"lugano-pav",        img:"images/lugano-collina-doro.jpg",    cat:"pavimentazioni", tag:"Pavimentazione · Lugano, CH",                 title:"Collina d'Oro, Lugano",              desc:"Viale d'accesso a cubetti ventaglio, lastricato esterno, terrazze. Cantiere per il Gruppo Tarchini." },
  { id:"saint-etienne",     img:"images/saint-etienne-piscina.jpg",  cat:"pavimentazioni", tag:"Pavimentazione · Loira, FR",                  title:"Saint-Étienne sur Loire",            desc:"Pavimentazione a bordo piscina in lastre fiammate di grande formato. Antiscivolosità a norma." },
  { id:"alpe-scala",        img:"images/alpe-dhuez-scala.jpg",       cat:"speciali",       tag:"Pezzo speciale · Alpe d'Huez, FR",            title:"Alpe d'Huez — Scala monolitica",     desc:"Pedate fiammate da 5 cm con toro frontale. Posa interamente artigianale." },
  { id:"cachard",           img:"images/chateau-cachard.jpg",        cat:"pavimentazioni", tag:"Restauro · Boffres, FR",                      title:"Château de Cachard",                 desc:"Restauro paesaggistico in contesto monumentale. Acciottolato e lastricato in pietra storica." },
  { id:"deux-alpes",        img:"images/deux-alpes.jpg",             cat:"coperture",      tag:"Copertura · Les Deux Alpes, FR",              title:"Les Deux Alpes",                     desc:"Copertura in piode e facciata a secco. Cromatismo coerente con le rocce della valle." },
  { id:"lens",              img:"images/lens-crans-montana.jpg",     cat:"rivestimenti",   tag:"Rivestimento · Lens, CH",                     title:"Lens (Crans-Montana)",               desc:"Area benessere privata con lastre fiammate a basso assorbimento per ambiente umido." },
  { id:"chamonix-fin",      img:"images/chamonix-finestra.jpg",      cat:"speciali",       tag:"Pezzo speciale · Chamonix, FR",               title:"Chamonix — Aperture monolitiche",    desc:"Davanzali, architravi e cornici in pezzi monolitici di grande formato. Lavorazione a mano." },
  { id:"sion",              img:"images/sion-rosone.jpg",            cat:"speciali",       tag:"Pezzo speciale · Sion, CH",                   title:"Sion — Rosone a intarsio",           desc:"Vialetto con la 'R' del committente realizzata a intarsio. Cubetti tagliati su misura." },
  { id:"alpe-chalet",       img:"images/alpe-dhuez-chalet.jpg",      cat:"murature",       tag:"Muratura · Alpe d'Huez, FR",                  title:"Alpe d'Huez — Basamento chalet",     desc:"Basamento in Luserna a spacco con funzione strutturale e protettiva contro l'umidità di risalita." },
  { id:"praloup-port",      img:"images/praloup-porticato.jpg",      cat:"murature",       tag:"Muratura · Pra-Loup, FR",                     title:"Pra-Loup — Porticato",               desc:"Muratura a corsi orizzontali eseguita in opera. Dialogo legno-pietra dell'architettura savoiarda." },
  { id:"losanna",           img:"images/losanna-piscina.jpg",        cat:"pavimentazioni", tag:"Pavimentazione · Losanna, CH",                title:"Losanna",                            desc:"Bordo piscina in lastre fiammate. Calpestabile a piede nudo: trattiene meno calore delle pietre scure." },
  { id:"auron-nice",        img:"images/auron-nice.jpg",             cat:"murature",       tag:"Muratura · Auron, FR",                        title:"Auron (Nice)",                       desc:"Terrazza panoramica: pavimentazione in lastre e muro di contenimento in pietra di torrente." },
  { id:"paccots",           img:"images/les-paccots.jpg",            cat:"murature",       tag:"Muratura · Les Paccots, CH",                  title:"Les Paccots",                        desc:"Muro di recinzione e basamento in muratura piena con conci squadrati. Pietra portante." },
  { id:"crans-int",         img:"images/crans-montana-cantiere.jpg", cat:"pavimentazioni", tag:"Cantiere completo · Crans-Montana, CH",       title:"Crans-Montana — Intervento integrato", desc:"Pavimenti interni in lastre, scalinata monolitica, porticato. Tutta la pietra dalla stessa selezione." },
  { id:"auron-fr",          img:"images/auron-france.jpg",           cat:"murature",       tag:"Muratura · Auron, FR",                        title:"Auron",                              desc:"Basamento misto: corsi regolari sul fronte d'ingresso e pietra a torrente sui volumi curvi." },
  { id:"alpe-rivestimento", img:"images/alpe-dhuez-rivestimento.jpg",cat:"rivestimenti",   tag:"Rivestimento · Alpe d'Huez, FR",              title:"Alpe d'Huez",                        desc:"Rivestimento di facciata a corsi orizzontali irregolari con pietre angolari piene." },
  { id:"chevenoz",          img:"images/chevenoz.jpg",               cat:"murature",       tag:"Muratura · Chevenoz, FR",                     title:"Chevenoz",                           desc:"Porticato in muratura piena con architravi monolitici. La pietra come elemento portante." },
  { id:"gets-cantiere",     img:"images/les-gets-cantiere.jpg",      cat:"pavimentazioni", tag:"Pavimentazione · Les Gets, FR",               title:"Les Gets — Haute-Savoie",            desc:"Lastre di grande formato su massetto armato. Planarità e tenuta verificate post-posa." },
  { id:"praloup-chalet",    img:"images/praloup-chalet.jpg",         cat:"murature",       tag:"Cantiere · Pra-Loup, FR",                     title:"Pra-Loup — Chalet completato",       desc:"Basamento in Luserna che separa lo zoccolo lapideo dalla struttura lignea sovrastante." },
  { id:"alpe-stagione",     img:"images/alpe-dhuez-stagione.jpg",    cat:"murature",       tag:"Muratura · Alpe d'Huez, FR",                  title:"Alpe d'Huez — Chalet residenziale",  desc:"Basamento a corsi irregolari. Proporzione corretta tra zoccolo lapideo e struttura lignea." },
  { id:"masino",            img:"images/castello-masino.jpg",        cat:"pavimentazioni", tag:"Storico · Ivrea, IT",                         title:"Castello di Masino",                 desc:"Pavimentazione interna in lastre di Luserna nella sala da pranzo del bene FAI." }
];

const INITIAL_COUNT = 12;
let visibleCount = INITIAL_COUNT;
let currentFilter = "all";
let currentLang = "it";

/* ============================================================
   i18n — COMPLETE TRANSLATIONS
   ============================================================ */
const I18N = {
  it: {
    "nav.about":"Chi siamo","nav.stone":"La Pietra","nav.work":"Lavori","nav.why":"Perché Noi","nav.svc":"Servizi","nav.contact":"Contatti","nav.cta":"Preventivo",
    "hero.kicker":"Pietra di Luserna · Val Pellice, Piemonte","hero.h1a":"La pietra","hero.h1b":"che resta.","hero.sub":"Estraiamo, lavoriamo e posiamo Pietra di Luserna per architetture residenziali, edilizia pubblica e contesti storici. Quarant'anni di mestiere tra Piemonte, Francia e Svizzera.","hero.cta1":"Vedi i lavori","hero.cta2":"Richiedi preventivo",
    "stat.1":"Anni di mestiere","stat.2":"Paesi attivi · IT · FR · CH","stat.3":"Pietra italiana","stat.4":"Età geologica (anni)",
    "usp.ey":"I nostri punti di forza",
    "about.ey":"Chi siamo","about.role":"Titolari · Bibiana, Torino","about.cap":"Collina d'Oro, Lugano · Gruppo Tarchini",
    "lus.ey":"La Pietra di Luserna","lus.s1":"Resistenza a compressione","lus.s2":"Assorbimento acqua","lus.s3":"Durezza Mohs","lus.s4":"Reazione al fuoco","lus.s5":"Resistenza al gelo","lus.s6":"Conformità",
    "port.ey":"Portfolio","port.all":"Tutti","port.pav":"Pavimentazioni","port.riv":"Rivestimenti","port.mur":"Murature","port.cop":"Coperture","port.spe":"Pezzi speciali","port.more":"Mostra altri lavori",
    "proc.ey":"Il nostro metodo","proc.s1t":"Sopralluogo","proc.s1d":"Visita gratuita per analizzare il contesto, valutare la fattibilità tecnica e ascoltare l'esigenza del progettista o del committente.","proc.s2t":"Preventivo","proc.s2d":"Quotazione dettagliata con selezione del materiale, finitura, schema di posa e tempistiche. Trasporto incluso nel prezzo finale.","proc.s3t":"Fornitura","proc.s3d":"Selezione diretta in cava in Val Pellice, lavorazione su misura dei pezzi speciali, scheda tecnica e certificati di origine.","proc.s4t":"Posa","proc.s4d":"Squadra interna di posatori specializzati. Cantiere pulito, consegna nei tempi concordati, garanzia sul lavoro eseguito.",
    "svc.ey":"Lavorazioni","svc.1t":"Pavimentazioni esterne","svc.1d":"Lastricati, vialetti, piazze e terrazze in lastre, cubetti o ciottolato. Posa a giunto chiuso o ventaglio, su massetto armato o sabbia.","svc.2t":"Rivestimenti murali","svc.2d":"Facciate, muri di cinta e pareti interne. Pietra a spacco, listata o opus incertum regolarizzato, con pezzi angolari e architravi monolitici.","svc.3t":"Coperture in piode","svc.3d":"Manti di copertura tradizionali alpini in piode di Luserna. Durata centenaria, resistenza ai carichi di neve d'alta quota, integrazione con l'edilizia storica.","svc.4t":"Murature in pietra","svc.4d":"Muri portanti, di sostegno e a secco. Pietra strutturale di spessore variabile per basamenti, contenimenti e architettura alpina.","svc.5t":"Pavimenti interni","svc.5d":"Pavimentazioni di abitazioni, ville e spazi commerciali. Lastre a formati regolari, finitura levigata o lucida, posa coordinata con il legno e i metalli.","svc.6t":"Pezzi speciali","svc.6d":"Scale monolitiche, davanzali, soglie, coronamenti, mensole, camini, piani cucina, fontane e arredo su misura. Sagomatura a CNC e finitura a mano.",
    "cnt.ey":"Parla con noi","cnt.intro":"Per architetti, costruttori e privati. Sopralluogo e preventivo gratuiti su tutto il territorio italiano, francese e svizzero.","cnt.l1":"Sede","cnt.l2":"Telefono","cnt.l3":"Aree di intervento","cnt.italy":"Italia","cnt.france":"Francia",
    "f.name":"Nome *","f.sur":"Cognome *","f.tel":"Telefono","f.type":"Tipo di intervento *","f.country":"Paese","f.sel":"Seleziona…","f.sup":"Solo fornitura materiale","f.other":"Altro","f.msg":"Descrivi il progetto *","f.p1":"Ho letto e accetto l'","f.p2":"informativa privacy","f.p3":" (GDPR). *","f.send":"Invia richiesta","f.ok":"✓ Grazie. Ti risponderemo entro 24 ore."
  },
  en: {
    "nav.about":"About","nav.stone":"The Stone","nav.work":"Projects","nav.why":"Why Us","nav.svc":"Services","nav.contact":"Contact","nav.cta":"Get a quote",
    "hero.kicker":"Luserna Stone · Val Pellice, Piedmont","hero.h1a":"The stone","hero.h1b":"that stays.","hero.sub":"We quarry, work and lay Luserna Stone for residential, public and heritage projects. Forty years of craftsmanship across Piedmont, France and Switzerland.","hero.cta1":"See our work","hero.cta2":"Request a quote",
    "stat.1":"Years of craftsmanship","stat.2":"Active countries · IT · FR · CH","stat.3":"Italian stone","stat.4":"Geological age (years)",
    "usp.ey":"Our strengths",
    "port.ey":"Portfolio","port.all":"All","port.pav":"Paving","port.riv":"Cladding","port.mur":"Masonry","port.cop":"Roofing","port.spe":"Special","port.more":"Show more projects",
    "f.name":"First name *","f.sur":"Last name *","f.tel":"Phone","f.type":"Project type *","f.country":"Country","f.sel":"Select…","f.sup":"Material supply only","f.other":"Other","f.msg":"Describe your project *","f.send":"Send request","f.ok":"✓ Thank you. We will reply within 24 hours."
  },
  fr: {
    "nav.about":"À propos","nav.stone":"La Pierre","nav.work":"Projets","nav.why":"Pourquoi Nous","nav.svc":"Services","nav.contact":"Contact","nav.cta":"Devis",
    "hero.kicker":"Pierre de Luserne · Val Pellice, Piémont","hero.h1a":"La pierre","hero.h1b":"qui demeure.","hero.sub":"Nous extrayons, travaillons et posons la Pierre de Luserne pour l'architecture résidentielle, l'édifice public et les contextes historiques. Quarante ans de savoir-faire entre Piémont, France et Suisse.","hero.cta1":"Voir nos projets","hero.cta2":"Demander un devis",
    "stat.1":"Années de métier","stat.2":"Pays actifs · IT · FR · CH","stat.3":"Pierre italienne","stat.4":"Âge géologique (ans)",
    "usp.ey":"Nos atouts",
    "port.ey":"Portfolio","port.all":"Tous","port.pav":"Pavages","port.riv":"Revêtements","port.mur":"Maçonneries","port.cop":"Couvertures","port.spe":"Spéciales","port.more":"Voir plus de projets",
    "f.name":"Prénom *","f.sur":"Nom *","f.tel":"Téléphone","f.type":"Type de projet *","f.country":"Pays","f.sel":"Sélectionner…","f.sup":"Fourniture uniquement","f.other":"Autre","f.msg":"Décrivez votre projet *","f.send":"Envoyer","f.ok":"✓ Merci. Nous vous répondrons sous 24 heures."
  },
  de: {
    "nav.about":"Über uns","nav.stone":"Der Stein","nav.work":"Projekte","nav.why":"Warum Wir","nav.svc":"Leistungen","nav.contact":"Kontakt","nav.cta":"Angebot",
    "hero.kicker":"Luserna-Stein · Val Pellice, Piemont","hero.h1a":"Der Stein","hero.h1b":"der bleibt.","hero.sub":"Wir gewinnen, bearbeiten und verlegen Luserna-Stein für Wohn-, öffentliche und historische Bauten. Vierzig Jahre Handwerkskunst zwischen Piemont, Frankreich und der Schweiz.","hero.cta1":"Projekte ansehen","hero.cta2":"Angebot anfragen",
    "stat.1":"Jahre Erfahrung","stat.2":"Aktive Länder · IT · FR · CH","stat.3":"Italienischer Stein","stat.4":"Geologisches Alter (Jahre)",
    "usp.ey":"Unsere Stärken",
    "port.ey":"Portfolio","port.all":"Alle","port.pav":"Bodenbeläge","port.riv":"Verkleidungen","port.mur":"Mauerwerk","port.cop":"Dächer","port.spe":"Sonderstücke","port.more":"Mehr Projekte zeigen",
    "f.name":"Vorname *","f.sur":"Nachname *","f.tel":"Telefon","f.type":"Projekttyp *","f.country":"Land","f.sel":"Auswählen…","f.sup":"Nur Materiallieferung","f.other":"Andere","f.msg":"Beschreiben Sie Ihr Projekt *","f.send":"Anfrage senden","f.ok":"✓ Danke. Wir antworten innerhalb von 24 Stunden."
  }
};

function t(key) {
  return I18N[currentLang]?.[key] || I18N.it[key] || key;
}

function applyI18n(lang) {
  if (!I18N[lang]) return;
  currentLang = lang;
  document.documentElement.setAttribute("lang", lang);
  
  // Update all text elements
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });
  
  // Update HTML content
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const key = el.getAttribute("data-i18n-html");
    el.innerHTML = t(key);
  });
  
  // Update active language button
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });
  
  // Save preference
  try {
    localStorage.setItem("nk_lang", lang);
  } catch(_) {}
}

/* ============================================================
   PORTFOLIO GALLERY with filters
   ============================================================ */
function renderGallery() {
  const grid = document.getElementById("portGrid");
  if (!grid) return;
  
  grid.innerHTML = "";
  
  const filtered = currentFilter === "all" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.cat === currentFilter);
  
  const toShow = filtered.slice(0, visibleCount);
  
  toShow.forEach((p, idx) => {
    const card = document.createElement("div");
    card.className = "port-card rev";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" loading="${idx < 6 ? 'eager' : 'lazy'}">
      <div class="port-info">
        <div class="port-tag">${p.tag}</div>
        <div class="port-title">${p.title}</div>
      </div>
    `;
    card.addEventListener("click", () => openLightbox(PROJECTS.indexOf(p)));
    grid.appendChild(card);
  });
  
  // Show/hide "load more" button
  const moreBtn = document.getElementById("portMore");
  if (moreBtn) {
    moreBtn.style.display = visibleCount < filtered.length ? "block" : "none";
  }
  
  // Re-observe new elements for scroll reveal
  document.querySelectorAll(".rev").forEach(el => {
    if (!el.classList.contains("in")) {
      revealObs.observe(el);
    }
  });
}

// Portfolio filters
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");
    currentFilter = filter;
    visibleCount = INITIAL_COUNT;
    
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    
    renderGallery();
  });
});

// Load more button
const loadMoreBtn = document.getElementById("loadMore");
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    visibleCount += 12;
    renderGallery();
  });
}

/* ============================================================
   LIGHTBOX
   ============================================================ */
const lb = document.getElementById("lb");
const lbImg = document.getElementById("lbImg");
const lbTitle = document.getElementById("lbTitle");
const lbDesc = document.getElementById("lbDesc");
const lbCounter = document.getElementById("lbCounter");
let lbIdx = 0;

function openLightbox(idx) {
  lbIdx = idx;
  lb.hidden = false;
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  updateLightbox();
  document.getElementById("lbClose").focus();
}

function updateLightbox() {
  const p = PROJECTS[lbIdx];
  lbImg.src = p.img;
  lbImg.alt = p.title;
  lbTitle.textContent = p.title;
  lbDesc.textContent = p.desc;
  lbCounter.textContent = `${String(lbIdx+1).padStart(2,"0")} / ${String(PROJECTS.length).padStart(2,"0")}`;
}

function closeLightbox() {
  lb.classList.remove("open");
  setTimeout(() => { 
    lb.hidden = true;
    lb.setAttribute("aria-hidden", "true");
  }, 250);
  document.body.style.overflow = "";
}

function lbPrev() { 
  lbIdx = (lbIdx - 1 + PROJECTS.length) % PROJECTS.length; 
  updateLightbox(); 
}

function lbNext() { 
  lbIdx = (lbIdx + 1) % PROJECTS.length; 
  updateLightbox(); 
}

document.getElementById("lbClose").addEventListener("click", closeLightbox);
document.getElementById("lbPrev").addEventListener("click", lbPrev);
document.getElementById("lbNext").addEventListener("click", lbNext);
lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
document.addEventListener("keydown", e => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  else if (e.key === "ArrowLeft") lbPrev();
  else if (e.key === "ArrowRight") lbNext();
});

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".rev").forEach(el => revealObs.observe(el));

/* ============================================================
   NAVIGATION
   ============================================================ */
const navEl = document.getElementById("nav");
function onScroll() {
  const y = window.scrollY;
  navEl.classList.toggle("stuck", y > 30);
  navEl.classList.toggle("on-hero", y < window.innerHeight - 100);
  document.getElementById("btt").classList.toggle("show", y > 600);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const href = a.getAttribute("href");
    if (href === "#" || href.length < 2) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (mob.classList.contains("open")) closeMobile();
    }
  });
});

/* ============================================================
   MOBILE MENU
   ============================================================ */
const ham = document.getElementById("ham");
const mob = document.getElementById("mob");

function openMobile() {
  mob.classList.add("open");
  mob.setAttribute("aria-hidden", "false");
  ham.classList.add("open");
  ham.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeMobile() {
  mob.classList.remove("open");
  mob.setAttribute("aria-hidden", "true");
  ham.classList.remove("open");
  ham.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

ham.addEventListener("click", () => {
  if (mob.classList.contains("open")) closeMobile();
  else openMobile();
});

/* ============================================================
   LANGUAGE SWITCHER
   ============================================================ */
document.querySelectorAll("[data-lang]").forEach(btn => {
  btn.addEventListener("click", () => {
    applyI18n(btn.getAttribute("data-lang"));
    renderGallery();
    if (mob.classList.contains("open")) closeMobile();
  });
});

// Load saved language
try {
  const saved = localStorage.getItem("nk_lang");
  if (saved && I18N[saved]) applyI18n(saved);
} catch(_) {}

/* ============================================================
   BACK TO TOP
   ============================================================ */
document.getElementById("btt").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ============================================================
   FORM SUBMISSION — WORKING WITH FORMSPREE
   ============================================================ */
const form = document.getElementById("lead");
const fok = document.getElementById("fok");
const ferr = document.getElementById("ferr");
const fsub = document.getElementById("fsub");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  fok.classList.remove("show");
  ferr.classList.remove("show");
  
  // Honeypot check
  if (form.website && form.website.value) {
    return; // silent drop for bots
  }
  
  // Validate required fields
  const required = ["nome", "cognome", "email", "tipologia", "messaggio"];
  for (const k of required) {
    const el = form[k];
    if (!el || !el.value.trim()) {
      el && el.focus();
      ferr.textContent = t("⚠ Compila tutti i campi obbligatori.");
      ferr.classList.add("show");
      return;
    }
  }
  
  // Check privacy
  if (!document.getElementById("fpriv").checked) {
    document.getElementById("fpriv").focus();
    ferr.textContent = t("⚠ Devi accettare l'informativa privacy.");
    ferr.classList.add("show");
    return;
  }
  
  // Show loading state
  fsub.disabled = true;
  fsub.setAttribute("data-loading", "true");
  
  const payload = {
    nome: form.nome.value,
    cognome: form.cognome.value,
    email: form.email.value,
    telefono: form.telefono?.value || "",
    tipologia: form.tipologia.value,
    paese: form.paese?.value || "",
    messaggio: form.messaggio.value,
    timestamp: new Date().toISOString(),
    lang: currentLang,
    page_url: location.href
  };
  
  try {
    // Check if endpoint is configured
    if (!CONFIG.FORM_ENDPOINT || CONFIG.FORM_ENDPOINT.includes("YOUR_")) {
      throw new Error("Form endpoint not configured");
    }
    
    const response = await fetch(CONFIG.FORM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    // Success
    fok.classList.add("show");
    form.reset();
    
    // Track conversion if GA4 is configured
    if (typeof gtag === "function") {
      gtag("event", "generate_lead", {
        event_category: "form",
        event_label: "contact_form_submission",
        value: 1
      });
    }
    
    // Track Facebook Pixel if configured
    if (CONFIG.FB_PIXEL_ID && typeof fbq === "function") {
      fbq("track", "Lead");
    }
    
  } catch (err) {
    console.error("Form error:", err);
    ferr.textContent = err.message.includes("not configured")
      ? "⚠ Form non ancora configurato. Contattaci a info@nikestone.it"
      : "⚠ Errore di invio. Riprova o scrivi a info@nikestone.it";
    ferr.classList.add("show");
  } finally {
    fsub.disabled = false;
    fsub.removeAttribute("data-loading");
  }
});

/* ============================================================
   COOKIE CONSENT — GDPR COMPLIANT
   ============================================================ */
const ck = document.getElementById("ck");
const ckAcc = document.getElementById("ckAcc");
const ckDec = document.getElementById("ckDec");

function showCookieBanner() {
  ck.hidden = false;
  document.documentElement.classList.add("ck-pending");
}

function hideCookieBanner() {
  ck.hidden = true;
  document.documentElement.classList.remove("ck-pending");
}

// Check consent on load
(function initCookies() {
  let consent = null;
  try { consent = localStorage.getItem("nk_ck"); } catch(_) {}
  
  if (consent === "all") {
    hideCookieBanner();
    loadAnalytics();
  } else if (consent === "essential") {
    hideCookieBanner();
  } else {
    showCookieBanner();
  }
})();

ckAcc.addEventListener("click", () => {
  try { localStorage.setItem("nk_ck", "all"); } catch(_) {}
  hideCookieBanner();
  loadAnalytics();
});

ckDec.addEventListener("click", () => {
  try { localStorage.setItem("nk_ck", "essential"); } catch(_) {}
  hideCookieBanner();
});

/* ============================================================
   ANALYTICS — Loaded only after consent
   ============================================================ */
let analyticsLoaded = false;

function loadAnalytics() {
  if (analyticsLoaded) return;
  if (!CONFIG.GA4_ID) return;
  
  analyticsLoaded = true;
  
  // Google Analytics 4
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.GA4_ID}`;
  document.head.appendChild(script);
  
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", CONFIG.GA4_ID, {
    anonymize_ip: true,
    cookie_flags: "SameSite=None;Secure"
  });
  
  // Facebook Pixel (if configured)
  if (CONFIG.FB_PIXEL_ID) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', CONFIG.FB_PIXEL_ID);
    fbq('track', 'PageView');
  }
}

/* ============================================================
   INITIAL RENDER
   ============================================================ */
renderGallery();
