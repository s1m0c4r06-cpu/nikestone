/* ============================================================
   NIKESTONE — Multi-Page Script
   ============================================================ */

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

/* ============================================================
   PORTFOLIO GALLERY
   ============================================================ */
function renderGallery() {
  const grid = document.getElementById("portGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const filtered = currentFilter === "all" ? PROJECTS : PROJECTS.filter(p => p.cat === currentFilter);
  const toShow = filtered.slice(0, visibleCount);

  toShow.forEach((p, idx) => {
    const card = document.createElement("div");
    card.className = "proj rev";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title} - posa artigianale pietra di luserna" loading="${idx < 6 ? 'eager' : 'lazy'}">
      <div class="proj-info">
        <div class="proj-tag">${p.tag}</div>
        <div class="proj-name">${p.title}</div>
        <div class="proj-desc">${p.desc}</div>
      </div>
    `;
    card.addEventListener("click", () => openLightbox(PROJECTS.indexOf(p)));
    grid.appendChild(card);
  });

  const moreBtn = document.getElementById("loadMore");
  if (moreBtn) {
    moreBtn.style.display = visibleCount < filtered.length ? "inline-flex" : "none";
  }

  // Re-observe new elements
  document.querySelectorAll(".rev").forEach(el => {
    if (!el.classList.contains("in")) revealObs.observe(el);
  });
}

/* Filter buttons */
document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");
    currentFilter = filter;
    visibleCount = INITIAL_COUNT;
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("on"));
    btn.classList.add("on");
    renderGallery();
  });
});

/* Load more */
document.addEventListener("click", e => {
  const loadMoreBtn = e.target.closest("#loadMore");
  if (loadMoreBtn) {
    visibleCount += 12;
    renderGallery();
  }
});

/* ============================================================
   LIGHTBOX
   ============================================================ */
const lb = document.getElementById("lb");
if (lb) {
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
    if (typeof gtag === "function") gtag("event", "view_item", { event_category: "lightbox", event_label: PROJECTS[lbIdx].title });
  }
  window.openLightbox = openLightbox;

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
    setTimeout(() => { lb.hidden = true; lb.setAttribute("aria-hidden", "true"); }, 250);
    document.body.style.overflow = "";
  }

  function lbPrev() { lbIdx = (lbIdx - 1 + PROJECTS.length) % PROJECTS.length; updateLightbox(); }
  function lbNext() { lbIdx = (lbIdx + 1) % PROJECTS.length; updateLightbox(); }

  document.getElementById("lbClose")?.addEventListener("click", closeLightbox);
  document.getElementById("lbPrev")?.addEventListener("click", lbPrev);
  document.getElementById("lbNext")?.addEventListener("click", lbNext);
  lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") lbPrev();
    else if (e.key === "ArrowRight") lbNext();
  });
}

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
   NAVIGATION — Sticky
   ============================================================ */
const navEl = document.getElementById("nav");
function onScroll() {
  const y = window.scrollY;
  if (navEl) navEl.classList.toggle("stuck", y > 30);
  const btt = document.getElementById("btt");
  if (btt) btt.classList.toggle("show", y > 600);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Smooth scroll */
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
  if (!mob || !ham) return;
  mob.classList.add("open");
  mob.setAttribute("aria-hidden", "false");
  ham.classList.add("open");
  ham.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}
function closeMobile() {
  if (!mob || !ham) return;
  mob.classList.remove("open");
  mob.setAttribute("aria-hidden", "true");
  ham.classList.remove("open");
  ham.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

if (ham) {
  ham.addEventListener("click", () => {
    if (mob.classList.contains("open")) closeMobile();
    else openMobile();
  });
}

/* Close mobile on link click */
document.querySelectorAll(".mob-menu a").forEach(a => {
  a.addEventListener("click", () => closeMobile());
});

/* ============================================================
   BACK TO TOP
   ============================================================ */
document.getElementById("btt")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ============================================================
   MULTI-STEP FORM
   ============================================================ */
let currentStep = 1;
const totalSteps = 3;

function updateStepIndicators() {
  document.querySelectorAll(".form-step-indicator").forEach(ind => {
    const step = parseInt(ind.getAttribute("data-step"));
    ind.classList.remove("active", "completed");
    if (step === currentStep) ind.classList.add("active");
    else if (step < currentStep) ind.classList.add("completed");
  });
}

function showStep(step) {
  document.querySelectorAll(".form-step").forEach(s => {
    const sNum = parseInt(s.getAttribute("data-step"));
    if (sNum === step) {
      s.classList.remove("hidden");
      s.style.opacity = "0";
      s.style.transform = "translateX(20px)";
      requestAnimationFrame(() => {
        s.style.transition = "opacity .4s ease, transform .4s ease";
        s.style.opacity = "1";
        s.style.transform = "none";
      });
    } else {
      s.classList.add("hidden");
    }
  });
  currentStep = step;
  updateStepIndicators();
}

function nextStep(step) {
  // Validate current step
  const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
  const requiredFields = currentFormStep?.querySelectorAll("[required]");
  let valid = true;
  requiredFields?.forEach(f => {
    if (!f.value.trim()) {
      f.style.borderColor = "var(--error)";
      valid = false;
      f.addEventListener("input", () => { f.style.borderColor = ""; }, { once: true });
    }
  });

  // Check privacy on step 3
  if (currentStep === 2 && step === 3) {
    // Allow navigation to step 3
  }

  if (!valid) {
    const err = document.getElementById("ferr");
    if (err) { err.textContent = "Compila tutti i campi obbligatori."; err.classList.add("show"); }
    return;
  }

  const err = document.getElementById("ferr");
  if (err) err.classList.remove("show");
  showStep(step);

  if (typeof gtag === "function") gtag("event", "form_step", { event_category: "form", event_label: "step_" + step });
}
window.nextStep = nextStep;

function prevStep(step) {
  showStep(step);
}
window.prevStep = prevStep;

/* File Upload — Drag & Drop */
const fileUploadArea = document.getElementById("fileUploadArea");
const fileInput = document.getElementById("fileupload");
const fileList = document.getElementById("fileList");
let uploadedFiles = [];

if (fileUploadArea && fileInput) {
  fileUploadArea.addEventListener("click", () => fileInput.click());

  fileUploadArea.addEventListener("dragover", e => {
    e.preventDefault();
    fileUploadArea.classList.add("dragover");
  });
  fileUploadArea.addEventListener("dragleave", () => {
    fileUploadArea.classList.remove("dragover");
  });
  fileUploadArea.addEventListener("drop", e => {
    e.preventDefault();
    fileUploadArea.classList.remove("dragover");
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener("change", e => {
    handleFiles(e.target.files);
  });
}

function handleFiles(files) {
  Array.from(files).forEach(file => {
    if (file.size > 20 * 1024 * 1024) {
      alert(`Il file "${file.name}" supera i 20MB.`);
      return;
    }
    uploadedFiles.push(file);
  });
  renderFileList();
}

function renderFileList() {
  if (!fileList) return;
  fileList.innerHTML = "";
  uploadedFiles.forEach((file, idx) => {
    const item = document.createElement("div");
    item.className = "file-item";
    item.innerHTML = `<span>${file.name} (${(file.size/1024/1024).toFixed(2)} MB)</span><button type="button" onclick="removeFile(${idx})">Rimuovi</button>`;
    fileList.appendChild(item);
  });
}
window.removeFile = function(idx) {
  uploadedFiles.splice(idx, 1);
  renderFileList();
};

/* Multi-step form submission */
const multiForm = document.getElementById("multiStepForm");
if (multiForm) {
  multiForm.addEventListener("submit", async e => {
    e.preventDefault();
    const fok = document.getElementById("fok");
    const ferr = document.getElementById("ferr");
    const fsub = document.getElementById("fsub");
    fok?.classList.remove("show");
    ferr?.classList.remove("show");

    // Check privacy
    if (!document.getElementById("fpriv")?.checked) {
      if (ferr) { ferr.textContent = "Devi accettare l'informativa privacy."; ferr.classList.add("show"); }
      return;
    }

    if (fsub) { fsub.disabled = true; fsub.setAttribute("data-loading", "true"); }

    // Build FormData
    const formData = new FormData(multiForm);
    uploadedFiles.forEach(f => formData.append("attachment", f));

    try {
      const response = await fetch(multiForm.action, { method: "POST", body: formData, headers: { "Accept": "application/json" } });
      if (response.ok) {
        fok?.classList.add("show");
        multiForm.reset();
        uploadedFiles = [];
        renderFileList();
        showStep(1);
        if (typeof gtag === "function") gtag("event", "generate_lead", { event_category: "form", event_label: "multistep_form", value: 1 });
      } else {
        throw new Error("HTTP " + response.status);
      }
    } catch (err) {
      if (ferr) { ferr.textContent = "Errore di invio. Riprova o scrivi a massimoangelino23@gmail.com"; ferr.classList.add("show"); }
    } finally {
      if (fsub) { fsub.disabled = false; fsub.removeAttribute("data-loading"); }
    }
  });
}

/* ============================================================
   STANDARD FORM (index page)
   ============================================================ */
const standardForm = document.querySelector("form.lead:not(.multi-step-form)");
if (standardForm && !standardForm.id?.includes("multi")) {
  standardForm.addEventListener("submit", async e => {
    e.preventDefault();
    const fok = document.getElementById("fok");
    const ferr = document.getElementById("ferr");
    const fsub = document.getElementById("fsub");
    fok?.classList.remove("show");
    ferr?.classList.remove("show");

    if (!document.getElementById("fpriv")?.checked) {
      if (ferr) { ferr.textContent = "Devi accettare l'informativa privacy."; ferr.classList.add("show"); }
      return;
    }

    if (fsub) { fsub.disabled = true; fsub.setAttribute("data-loading", "true"); }

    try {
      const response = await fetch(standardForm.action, {
        method: "POST",
        body: new FormData(standardForm),
        headers: { "Accept": "application/json" }
      });
      if (response.ok) {
        fok?.classList.add("show");
        standardForm.reset();
        if (typeof gtag === "function") gtag("event", "generate_lead", { event_category: "form", event_label: "contact_form", value: 1 });
      } else {
        throw new Error("HTTP " + response.status);
      }
    } catch (err) {
      if (ferr) { ferr.textContent = "Errore di invio. Riprova o scrivi a massimoangelino23@gmail.com"; ferr.classList.add("show"); }
    } finally {
      if (fsub) { fsub.disabled = false; fsub.removeAttribute("data-loading"); }
    }
  });
}

/* ============================================================
   COOKIE CONSENT
   ============================================================ */
const ck = document.getElementById("ck");
const ckAcc = document.getElementById("ckAcc");
const ckDec = document.getElementById("ckDec");

function showCookieBanner() { if (ck) { ck.hidden = false; } }
function hideCookieBanner() { if (ck) { ck.hidden = true; } }

(function initCookies() {
  let consent = null;
  try { consent = localStorage.getItem("nk_ck"); } catch(_) {}
  if (consent === "all") { hideCookieBanner(); }
  else if (consent === "essential") { hideCookieBanner(); }
  else { showCookieBanner(); }
})();

if (ckAcc) {
  ckAcc.addEventListener("click", () => {
    try { localStorage.setItem("nk_ck", "all"); } catch(_) {}
    hideCookieBanner();
  });
}
if (ckDec) {
  ckDec.addEventListener("click", () => {
    try { localStorage.setItem("nk_ck", "essential"); } catch(_) {}
    hideCookieBanner();
  });
}

/* ============================================================
   INITIAL RENDER
   ============================================================ */
renderGallery();
