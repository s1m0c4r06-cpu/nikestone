// Nikestone — client runtime: i18n toggle, nav, mobile menu, reveal, motion, gallery, cookie
import { T, LANGS, type Lang } from '../i18n/translations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

document.documentElement.classList.add('js-ready');

const ready = (fn: () => void) =>
  document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);

// NB: l'avvio è in FONDO al file. Gli script type=module sono "deferred": quando questo
// modulo viene eseguito il DOM è già pronto, quindi ready() lancerebbe subito le init —
// ma alcune usano variabili top-level (revObserver, GA_ID) dichiarate più sotto → TDZ.
// Avviando in fondo, tutte le dichiarazioni del modulo sono già inizializzate.

/* ---------------- i18n ---------------- */
function applyLang(lang: Lang) {
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
  document.querySelectorAll<HTMLElement>('[data-i]').forEach((el) => {
    const key = el.dataset.i!;
    const entry = T[key];
    if (entry && entry[lang]) el.textContent = entry[lang];
  });
  // testi con markup inline (<strong>/<em>/<br>/<a>): innerHTML invece di textContent
  document.querySelectorAll<HTMLElement>('[data-ihtml]').forEach((el) => {
    const key = el.dataset.ihtml!;
    const entry = T[key];
    if (entry && entry[lang]) el.innerHTML = entry[lang];
  });
  // placeholder di input/textarea
  document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-iph]').forEach((el) => {
    const key = (el as HTMLElement).dataset.iph!;
    const entry = T[key];
    if (entry && entry[lang]) el.placeholder = entry[lang];
  });
  document.querySelectorAll<HTMLElement>('[data-lang]').forEach((b) =>
    b.classList.toggle('is-active', b.dataset.lang === lang)
  );
  // annuncio cambio lingua a screen reader (aria-live)
  let live = document.getElementById('nk-live');
  if (!live) {
    live = document.createElement('div');
    live.id = 'nk-live';
    live.className = 'visually-hidden';
    live.setAttribute('aria-live', 'polite');
    document.body.appendChild(live);
  }
  live.textContent = { it: 'Lingua: Italiano', fr: 'Langue : Français', en: 'Language: English', de: 'Sprache: Deutsch' }[lang] || lang;
  try { localStorage.setItem('nk_lang', lang); } catch {}
}
function initLang() {
  let lang: Lang = 'it';
  try {
    const s = localStorage.getItem('nk_lang') as Lang | null;
    if (s && (LANGS as string[]).includes(s)) lang = s;
  } catch {}
  // NB: :not(:root) esclude <html data-lang> (Base.astro). Senza, il click handler
  // verrebbe attaccato anche a <html> e il suo preventDefault romperebbe TUTTI i click
  // (submit form, link di navigazione…) perché ogni click bolla fino a <html>.
  document.querySelectorAll<HTMLElement>('[data-lang]:not(:root)').forEach((b) =>
    b.addEventListener('click', (e) => { e.preventDefault(); applyLang(b.dataset.lang as Lang); })
  );
  if (lang !== 'it') applyLang(lang);
  else document.querySelectorAll<HTMLElement>('[data-lang="it"]').forEach((b) => b.classList.add('is-active'));
}

/* ---------------- nav scroll state ---------------- */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  let last = -1;
  const upd = () => {
    const y = window.scrollY;
    if (y === last) return;
    last = y;
    nav.dataset.state = y > 30 ? 'scrolled' : 'top';
  };
  upd();
  window.addEventListener('scroll', () => requestAnimationFrame(upd), { passive: true });
}

/* ---------------- mobile menu ---------------- */
function initMobile() {
  const ham = document.getElementById('ham');
  const mob = document.getElementById('mob');
  if (!ham || !mob) return;
  const toggle = (open?: boolean) => {
    const o = typeof open === 'boolean' ? open : !mob.classList.contains('is-open');
    mob.classList.toggle('is-open', o);
    ham.classList.toggle('is-open', o);
    ham.setAttribute('aria-expanded', String(o));
    document.body.style.overflow = o ? 'hidden' : '';
  };
  ham.addEventListener('click', () => toggle());
  mob.querySelectorAll('a').forEach((l) => l.addEventListener('click', () => toggle(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggle(false); });
}

/* ---------------- reveal (IO baseline) ---------------- */
let revObserver: IntersectionObserver | null = null;
function initReveal() {
  const items = document.querySelectorAll<HTMLElement>('.rev');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) { items.forEach((el) => el.classList.add('is-vis')); return; }
  revObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        const sib = Array.from(en.target.parentElement?.children || []).filter((c) => c.classList.contains('rev'));
        (en.target as HTMLElement).style.transitionDelay = Math.min(sib.indexOf(en.target), 5) * 120 + 'ms';
        en.target.classList.add('is-vis');
        revObserver!.unobserve(en.target);
      }
    });
  }, { rootMargin: '0px 0px -80px 0px', threshold: 0.05 });
  items.forEach((el) => revObserver!.observe(el));
}

/* ---------------- gallery "vedi altre" ---------------- */
function initGalleryMore() {
  document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((g) => {
    const items = Array.from(g.querySelectorAll<HTMLElement>('.gitem'));
    const limit = +(g.dataset.limit || 3);
    if (items.length <= limit) return;
    items.forEach((it, i) => { if (i >= limit) it.hidden = true; });
    const btn = g.parentElement?.querySelector<HTMLElement>('[data-more]');
    if (!btn) return;
    btn.hidden = false;
    btn.addEventListener('click', () => {
      items.forEach((it) => (it.hidden = false));
      btn.hidden = true;
      if (window.gsapReveal) window.gsapReveal(items.slice(limit));
    });
  });
}

/* ---------------- lightbox ---------------- */
function initLightbox() {
  const galleries = document.querySelectorAll<HTMLElement>('[data-gallery]');
  if (!galleries.length) return;

  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-label', 'Galleria immagini');
  lb.setAttribute('aria-hidden', 'true');
  lb.innerHTML =
    '<button class="lb-close" aria-label="Chiudi">&times;</button>' +
    '<button class="lb-nav lb-prev" aria-label="Immagine precedente">&lsaquo;</button>' +
    '<figure class="lb-stage"><img alt=""><figcaption class="lb-count"></figcaption></figure>' +
    '<button class="lb-nav lb-next" aria-label="Immagine successiva">&rsaquo;</button>';
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('img') as HTMLImageElement;
  const lbCount = lb.querySelector('.lb-count') as HTMLElement;
  let group: HTMLImageElement[] = [];
  let idx = 0;

  const show = (i: number) => {
    idx = (i + group.length) % group.length;
    const im = group[idx];
    lbImg.src = im.dataset.full || im.currentSrc || im.src;
    lbImg.alt = im.alt;
    lbCount.textContent = `${idx + 1} / ${group.length}`;
  };
  const open = (imgs: HTMLImageElement[], i: number) => {
    group = imgs;
    show(i);
    lb.classList.add('show');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    lb.classList.remove('show');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  galleries.forEach((g) => {
    const imgs = Array.from(g.querySelectorAll<HTMLImageElement>('.gitem img'));
    g.querySelectorAll<HTMLElement>('.gitem').forEach((fig, i) => {
      fig.style.cursor = 'zoom-in';
      fig.addEventListener('click', () => open(imgs, i));
    });
  });

  lb.querySelector('.lb-close')!.addEventListener('click', close);
  lb.querySelector('.lb-prev')!.addEventListener('click', (e) => { e.stopPropagation(); show(idx - 1); });
  lb.querySelector('.lb-next')!.addEventListener('click', (e) => { e.stopPropagation(); show(idx + 1); });
  lb.addEventListener('click', (e) => { if (e.target === lb || (e.target as HTMLElement).classList.contains('lb-stage')) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('show')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
  });
}

/* ---------------- contact form (multi-step, logica validata) ---------------- */
function initContactForm() {
  const form = document.getElementById('contactForm') as HTMLFormElement | null;
  if (!form) return;

  const MSGS: Record<string, { step: string; sending: string; ok: string; err: string; pick: string; big: string }> = {
    it: {
      step: 'Compila i campi obbligatori evidenziati per continuare.',
      sending: 'Invio in corso…',
      ok: '✓ Richiesta inviata! Ti ricontattiamo entro 48 ore lavorative. Grazie.',
      err: 'Invio non riuscito. Scrivici a massimoangelino23@gmail.com o chiamaci al +39 331 638 1673.',
      pick: '📎 Scegli file…',
      big: 'File troppo grande (max 20MB)',
    },
    fr: {
      step: 'Veuillez remplir les champs obligatoires en surbrillance pour continuer.',
      sending: 'Envoi en cours…',
      ok: '✓ Demande envoyée ! Nous vous recontactons sous 48 heures ouvrées. Merci.',
      err: "Échec de l'envoi. Écrivez-nous à massimoangelino23@gmail.com ou appelez le +39 331 638 1673.",
      pick: '📎 Choisir un fichier…',
      big: 'Fichier trop volumineux (max 20 Mo)',
    },
    en: {
      step: 'Please fill in the highlighted required fields to continue.',
      sending: 'Sending…',
      ok: '✓ Request sent! We will get back to you within 48 working hours. Thank you.',
      err: 'Sending failed. Write to us at massimoangelino23@gmail.com or call +39 331 638 1673.',
      pick: '📎 Choose file…',
      big: 'File too large (max 20MB)',
    },
    de: {
      step: 'Bitte füllen Sie die markierten Pflichtfelder aus, um fortzufahren.',
      sending: 'Wird gesendet…',
      ok: '✓ Anfrage gesendet! Wir melden uns innerhalb von 48 Arbeitsstunden. Danke.',
      err: 'Senden fehlgeschlagen. Schreiben Sie an massimoangelino23@gmail.com oder rufen Sie +39 331 638 1673 an.',
      pick: '📎 Datei wählen…',
      big: 'Datei zu groß (max. 20 MB)',
    },
  };
  // funzione (non costante): risolve la lingua al momento dell'uso → segue il toggle live
  const L = () => MSGS[document.documentElement.lang] || MSGS.it;

  const OPT_SEL = '.opt input, .mopt input, .vopt input, .check input';
  const WRAP_SEL = '.opt, .mopt, .vopt, .check';

  // stato visivo selezione: SOLO via change nativo (le <label> native gestiscono l'input)
  function syncWrap(input: HTMLInputElement) {
    const wrap = input.closest(WRAP_SEL);
    if (input.type === 'radio') {
      form!.querySelectorAll<HTMLInputElement>('input[name="' + CSS.escape(input.name) + '"]').forEach((r) => {
        const w = r.closest(WRAP_SEL);
        if (w) w.classList.toggle('is-checked', r.checked);
      });
    } else if (wrap) {
      wrap.classList.toggle('is-checked', input.checked);
    }
  }
  form.addEventListener('change', (e) => {
    const t = e.target as HTMLInputElement;
    if (t.matches(OPT_SEL)) syncWrap(t);
  });
  form.querySelectorAll<HTMLInputElement>(OPT_SEL).forEach((i) => { if (i.checked) syncWrap(i); });

  const steps = form.querySelectorAll<HTMLElement>('.fstep');
  const fpSteps = form.querySelectorAll<HTMLElement>('.fp-step');
  const fpFills = form.querySelectorAll<HTMLElement>('.fp-fill');
  const msgBox = document.getElementById('formMsg');
  const replyHidden = document.getElementById('hReply') as HTMLInputElement | null;
  const total = steps.length;
  let current = 1;

  function setStep(n: number) {
    if (n < 1 || n > total) return;
    current = n;
    steps.forEach((s) => s.classList.toggle('is-active', +s.dataset.step! === n));
    fpSteps.forEach((s) => {
      const v = +s.dataset.step!;
      s.classList.toggle('active', v === n);
      s.classList.toggle('done', v < n);
    });
    fpFills.forEach((f, i) => { f.style.width = (i < n - 1) ? '100%' : (i === n - 1 ? '50%' : '0%'); });
    const top = form!.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  function markBad(el: HTMLElement) {
    el.style.borderColor = 'var(--err)';
    const clr = () => { el.style.borderColor = ''; el.removeEventListener('input', clr); el.removeEventListener('change', clr); };
    el.addEventListener('input', clr); el.addEventListener('change', clr);
  }
  function clearBad(el: HTMLElement) { el.style.borderColor = ''; }

  function stepMsgBox(n: number) {
    const step = form!.querySelector('.fstep[data-step="' + n + '"]');
    if (!step) return null;
    let box = step.querySelector('.step-err') as HTMLElement | null;
    if (!box) {
      box = document.createElement('div');
      box.className = 'step-err';
      box.setAttribute('role', 'alert');
      const nav = step.querySelector('.fstep-nav');
      if (nav) step.insertBefore(box, nav); else step.appendChild(box);
    }
    return box;
  }
  function showStepMsg(n: number, text: string) { const b = stepMsgBox(n); if (b) b.textContent = text; }

  // checkbox validato via .checked (NON .value); radio via group.some(.checked); testo via value+regex
  function validateStep(n: number) {
    const step = form!.querySelector('.fstep[data-step="' + n + '"]');
    if (!step) return true;
    let ok = true;
    const seenRadio = new Set<string>();
    step.querySelectorAll<HTMLInputElement>('[required]').forEach((el) => {
      if (el.type === 'radio') {
        if (seenRadio.has(el.name)) return;
        seenRadio.add(el.name);
        const group = step.querySelectorAll<HTMLInputElement>('input[name="' + CSS.escape(el.name) + '"]');
        const any = Array.from(group).some((r) => r.checked);
        const choice = el.closest('.choice');
        if (!any) { ok = false; if (choice) choice.classList.add('is-bad'); }
        else if (choice) { choice.classList.remove('is-bad'); }
      } else if (el.type === 'checkbox') {
        const wrap = el.closest(WRAP_SEL) || el.parentElement;
        if (!el.checked) { ok = false; if (wrap) wrap.classList.add('is-bad'); }
        else if (wrap) { wrap.classList.remove('is-bad'); }
      } else {
        const bad = !el.value.trim() || (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value));
        if (bad) { ok = false; markBad(el); } else clearBad(el);
      }
    });
    showStepMsg(n, ok ? '' : L().step);
    return ok;
  }

  function showMsg(text: string, kind: string) {
    if (!msgBox) return;
    msgBox.textContent = text;
    msgBox.classList.remove('ok', 'err');
    if (kind) msgBox.classList.add(kind);
  }

  // pulisci errore gruppo appena si sceglie
  form.addEventListener('change', (e) => {
    const t = e.target as HTMLElement;
    if (t.matches(OPT_SEL)) {
      const c = t.closest('.choice'); if (c) c.classList.remove('is-bad');
      const w = t.closest('.check'); if (w) w.classList.remove('is-bad');
    }
  });

  form.querySelectorAll<HTMLElement>('[data-next]').forEach((b) => b.addEventListener('click', () => {
    if (validateStep(current)) setStep(+b.dataset.next!);
  }));
  form.querySelectorAll<HTMLElement>('[data-prev]').forEach((b) => b.addEventListener('click', () => setStep(+b.dataset.prev!)));

  const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
  const fileDisplay = document.getElementById('fileDisplay');
  if (fileInput && fileDisplay) {
    fileDisplay.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
      const f = fileInput.files && fileInput.files[0];
      if (!f) { fileDisplay.textContent = L().pick; return; }
      if (f.size > 20 * 1024 * 1024) {
        fileDisplay.textContent = L().big;
        (fileDisplay as HTMLElement).style.color = 'var(--err)';
        fileInput.value = '';
        return;
      }
      (fileDisplay as HTMLElement).style.color = '';
      fileDisplay.textContent = '📎 ' + f.name + '  ·  ' + (f.size / 1024 / 1024).toFixed(2) + ' MB';
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    for (let s = 1; s <= total; s++) { if (!validateStep(s)) { setStep(s); return; } }
    const emailF = form.querySelector<HTMLInputElement>('[name="email"]');
    if (emailF && replyHidden) replyHidden.value = emailF.value;
    const btn = form.querySelector<HTMLButtonElement>('[type="submit"]')!;
    const ot = btn.textContent;
    btn.disabled = true;
    btn.setAttribute('aria-busy', 'true');
    btn.textContent = L().sending;
    showMsg('', '');
    try {
      const fd = new FormData(form);
      await fetch(form.action, { method: 'POST', mode: 'no-cors', body: fd });
      showMsg(L().ok, 'ok');
      form.reset();
      if (fileDisplay) { fileDisplay.textContent = L().pick; (fileDisplay as HTMLElement).style.color = ''; }
      form.querySelectorAll('.is-checked').forEach((w) => w.classList.remove('is-checked'));
      for (let s = 1; s <= total; s++) showStepMsg(s, '');
      setStep(1);
    } catch (err) {
      showMsg(L().err, 'err');
    } finally {
      btn.disabled = false;
      btn.removeAttribute('aria-busy');
      btn.textContent = ot;
    }
  });
}

/* ---------------- cookie ---------------- */
const GA_ID = 'G-2T5CZNKVLH';
function loadAnalytics() {
  const w = window as any;
  if (w.__ga) return; w.__ga = true;
  const s = document.createElement('script');
  s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () { w.dataLayer.push(arguments); };
  w.gtag('js', new Date());
  w.gtag('config', GA_ID);
}
function initCookie() {
  const bar = document.getElementById('cookie');
  let consent = false;
  try { consent = localStorage.getItem('nk_cookie') === '1'; } catch {}
  if (consent) { loadAnalytics(); return; }   // GA only after consent (GDPR)
  if (!bar) return;
  bar.classList.add('show');
  bar.querySelectorAll<HTMLElement>('[data-cookie]').forEach((b) =>
    b.addEventListener('click', () => {
      try { localStorage.setItem('nk_cookie', '1'); } catch {}
      bar.classList.remove('show');
      loadAnalytics();
    })
  );
}

/* ---------------- motion (GSAP + Lenis) ---------------- */
declare global { interface Window { __lenis?: Lenis; gsapReveal?: (els: Element[]) => void; } }
function initMotion() {
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('gsap-on');

  // Lenis smooth scroll
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  window.__lenis = lenis;

  const EASE = 'expo.out';

  // hero figura (mix B+C): scale-in al load + parallax leggero (clip in .hero-fig-img)
  const heroFigImg = document.querySelector('.hero-fig-img img');
  if (heroFigImg) {
    gsap.fromTo(heroFigImg, { scale: 1.14 }, { scale: 1, duration: 1.8, ease: EASE });
    gsap.fromTo(heroFigImg, { yPercent: -5 }, { yPercent: 5, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }

  // page-hero parallax
  document.querySelectorAll<HTMLElement>('.page-hero-bg').forEach((bg) =>
    gsap.fromTo(bg, { yPercent: -8 }, { yPercent: 16, ease: 'none',
      scrollTrigger: { trigger: bg.closest('.page-hero'), start: 'top top', end: 'bottom top', scrub: true } })
  );

  // reveals via GSAP (IO already revealed above-fold; this enriches)
  if (revObserver) revObserver.disconnect();
  window.gsapReveal = (els: Element[]) =>
    gsap.fromTo(els, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: EASE, stagger: 0.12, overwrite: true });
  ScrollTrigger.batch('.rev', {
    start: 'top 88%',
    onEnter: (b) => gsap.fromTo(b, { y: 44, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: EASE, stagger: 0.12, overwrite: true }),
    once: true,
  });

  // stat counters
  ScrollTrigger.batch('.stat strong', {
    start: 'top 85%', once: true,
    onEnter: (b) => (b as HTMLElement[]).forEach((el) => {
      const m = el.textContent!.trim().match(/(\d+)/);
      if (!m) return;
      const target = +m[1], suffix = el.textContent!.replace(m[1], '');
      const o = { v: 0 };
      gsap.to(o, { v: target, duration: 1.6, ease: 'power2.out', onUpdate: () => (el.textContent = Math.round(o.v) + suffix) });
    }),
  });

  ScrollTrigger.refresh();
}

/* ---------------- avvio (in fondo: tutte le dichiarazioni del modulo sono pronte) ---------------- */
ready(() => {
  initLang();
  initNav();
  initMobile();
  initReveal();
  initGalleryMore();
  initLightbox();
  initContactForm();
  initCookie();
  initMotion();
});
