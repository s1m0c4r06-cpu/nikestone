/* ============================================================
   NIKESTONE — script.js
   ============================================================ */

/* ============================================================
   CONFIG — REPLACE THESE BEFORE DEPLOYMENT
   ============================================================ */
const CONFIG = {
  // === FORM BACKEND ===
  // 1. Sign up at https://formspree.io (free tier: 50 submissions/month)
  // 2. Create a new form, copy the form ID (looks like "xrgjbpqd")
  // 3. Paste it below.
  // Alternatives: https://web3forms.com (use 'access_key'), https://getform.io
  FORM_ENDPOINT: "https://formspree.io/f/YOUR_FORM_ID_HERE",

  // === ANALYTICS (loaded only after cookie consent) ===
  // Set to your GA4 measurement ID (e.g. "G-XXXXXXXXXX") or leave empty.
  GA4_ID: ""
};

/* ============================================================
   PROJECT DATA — also used to enhance server-rendered gallery
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
   i18n — full IT / EN / FR / DE dictionaries
   ============================================================ */
const I18N = {
  it: {
    "nav.about":"Chi siamo","nav.stone":"La Pietra","nav.work":"Lavori","nav.process":"Metodo","nav.svc":"Servizi","nav.contact":"Contatti","nav.cta":"Preventivo",
    "hero.kicker":"Pietra di Luserna · Val Pellice, Piemonte","hero.h1a":"La pietra","hero.h1b":"che resta.","hero.sub":"Estraiamo, lavoriamo e posiamo Pietra di Luserna per architetture residenziali, edilizia pubblica e contesti storici. Quarant'anni di mestiere tra Piemonte, Francia e Svizzera.","hero.cta1":"Vedi i lavori","hero.cta2":"Richiedi preventivo","hero.meta1":"Château de Cachard","hero.meta2":"Boffres, Francia · 2014",
    "stat.1":"Anni di mestiere","stat.2":"Paesi attivi · IT · FR · CH","stat.3":"Pietra italiana","stat.4":"Età geologica",
    "about.ey":"Chi siamo","about.title":"Una tradizione di famiglia,<br><em>una nuova generazione.</em>","about.p1":"Nikestone nasce dall'incontro tra l'esperienza quarantennale di Mauro Angelino e la nuova generazione, guidata da suo figlio Massimo. Lavoriamo la Pietra di Luserna — la più pregiata roccia metamorfica del Piemonte — con la cura del mestiere tramandato e il rigore di chi conosce il cantiere contemporaneo.","about.p2":"Operiamo tra Italia, Francia e Svizzera. Le nostre opere sono a Crans-Montana, Chamonix, Alpe d'Huez, Marsiglia, Lugano e in numerose committenze private e pubbliche. Ogni progetto è seguito direttamente, dalla selezione del materiale in cava alla posa finale.","about.role":"Titolari · Bibiana, Torino","about.cap":"Collina d'Oro, Lugano · Gruppo Tarchini",
    "lus.ey":"La Pietra di Luserna","lus.title":"Una roccia<br><em>di trecento milioni di anni.</em>","lus.p1":"Estratta esclusivamente in Val Pellice, provincia di Torino, la Pietra di Luserna è una delle rocce metamorfiche più antiche e resistenti d'Europa. Riconosciuta a livello europeo come gneiss del Piemonte, è apprezzata da architetti e progettisti per la sua durata praticamente illimitata, la resistenza al gelo-disgelo e la coerenza cromatica nel tempo.","lus.p2":"La lavoriamo in ogni finitura — a spacco naturale, fiammata, sabbiata, levigata o lucida — per pavimentazioni esterne ed interne, rivestimenti murali, coperture in lose, scale monolitiche, davanzali e arredo su misura.","lus.s1":"Resistenza a compressione","lus.s2":"Assorbimento acqua","lus.s3":"Durezza","lus.s4":"Reazione al fuoco","lus.s5":"Resistenza al gelo","lus.s6":"Conformità norme",
    "port.ey":"Portfolio","port.title":"I nostri <em>cantieri</em>","port.all":"Tutti","port.pav":"Pavimentazioni","port.riv":"Rivestimenti","port.mur":"Murature","port.cop":"Coperture","port.spe":"Pezzi speciali","port.more":"Mostra altri lavori",
    "proc.ey":"Il nostro metodo","proc.title":"Come <em>lavoriamo</em>","proc.s1t":"Sopralluogo","proc.s1d":"Visita gratuita per analizzare il contesto, valutare la fattibilità tecnica e ascoltare l'esigenza del progettista o del committente.","proc.s2t":"Preventivo","proc.s2d":"Quotazione dettagliata con selezione del materiale, finitura, schema di posa e tempistiche. Trasporto incluso nel prezzo finale.","proc.s3t":"Fornitura","proc.s3d":"Selezione diretta in cava in Val Pellice, lavorazione su misura dei pezzi speciali, scheda tecnica e certificati di origine.","proc.s4t":"Posa","proc.s4d":"Squadra interna di posatori specializzati. Cantiere pulito, consegna nei tempi concordati, garanzia sul lavoro eseguito.",
    "svc.ey":"Lavorazioni","svc.title":"Cosa <em>realizziamo</em>","svc.1t":"Pavimentazioni esterne","svc.1d":"Lastricati, vialetti, piazze e terrazze in lastre, cubetti o ciottolato. Posa a giunto chiuso o ventaglio, su massetto armato o sabbia.","svc.2t":"Rivestimenti murali","svc.2d":"Facciate, muri di cinta e pareti interne. Pietra a spacco, listata o opus incertum regolarizzato, con pezzi angolari e architravi monolitici.","svc.3t":"Coperture in lose","svc.3d":"Manti di copertura tradizionali alpini in piode di Luserna. Durata centenaria, resistenza ai carichi di neve d'alta quota, integrazione con l'edilizia storica.","svc.4t":"Murature in pietra","svc.4d":"Muri portanti, di sostegno e a secco. Pietra strutturale di spessore variabile per basamenti, contenimenti e architettura alpina.","svc.5t":"Pavimenti interni","svc.5d":"Pavimentazioni di abitazioni, ville e spazi commerciali. Lastre a formati regolari, finitura levigata o lucida, posa coordinata con il legno e i metalli.","svc.6t":"Pezzi speciali","svc.6d":"Scale monolitiche, davanzali, soglie, coronamenti, mensole, camini, piani cucina, fontane e arredo su misura. Sagomatura a CNC e finitura a mano.",
    "cnt.ey":"Parla con noi","cnt.title":"Iniziamo<br><em>il tuo progetto.</em>","cnt.intro":"Per architetti, costruttori e privati. Sopralluogo e preventivo gratuiti su tutto il territorio italiano, francese e svizzero.","cnt.l1":"Sede","cnt.l2":"Telefono","cnt.l3":"Aree","cnt.italy":"Italia","cnt.france":"Francia",
    "f.name":"Nome *","f.sur":"Cognome *","f.tel":"Telefono","f.type":"Tipo di intervento *","f.country":"Paese","f.sel":"Seleziona…","f.sup":"Solo fornitura materiale","f.other":"Altro","f.msg":"Descrivi il progetto *","f.p1":"Ho letto e accetto l'","f.p2":"informativa privacy","f.p3":" (GDPR). *","f.send":"Invia richiesta","f.sending":"Invio in corso…","f.ok":"✓ Grazie. Ti risponderemo entro 24 ore.",
    "err.req":"Questo campo è obbligatorio.","err.email":"Inserisci un indirizzo email valido.","err.tel":"Numero di telefono non valido.","err.minmsg":"Descrivi il progetto in almeno 10 caratteri.","err.privacy":"Devi accettare l'informativa privacy per inviare la richiesta.","err.network":"⚠ Errore di connessione. Controlla la rete e riprova.","err.server":"⚠ Errore del server. Riprova tra qualche minuto o scrivi a info@nikestone.it.","err.config":"⚠ Form non configurato. Contattaci direttamente a info@nikestone.it.","err.fields":"⚠ Alcuni campi non sono compilati correttamente.",
    "ft.desc":"Fornitura, lavorazione e posa di Pietra di Luserna per architetti, costruttori e privati. Da Bibiana, Val Pellice, a tutta Italia, Francia e Svizzera.","ft.nav":"Navigazione","ft.svc":"Lavorazioni","ft.cont":"Contatti","ft.copy":"© 2026 Nikestone · P.IVA 00000000000 · Tutti i diritti riservati","ft.priv":"Privacy","ft.ck":"Cookie","ft.terms":"Termini",
    "ck.text":"Utilizziamo cookie tecnici essenziali. Con il tuo consenso, anche cookie analitici per migliorare il sito.","ck.more":"Maggiori informazioni","ck.dec":"Solo essenziali","ck.acc":"Accetto"
  },
  en: {
    "nav.about":"About","nav.stone":"The Stone","nav.work":"Projects","nav.process":"Method","nav.svc":"Services","nav.contact":"Contact","nav.cta":"Get a quote",
    "hero.kicker":"Luserna Stone · Val Pellice, Piedmont","hero.h1a":"The stone","hero.h1b":"that stays.","hero.sub":"We quarry, work and lay Luserna Stone for residential, public and heritage projects. Forty years of craftsmanship across Piedmont, France and Switzerland.","hero.cta1":"See our work","hero.cta2":"Request a quote","hero.meta1":"Château de Cachard","hero.meta2":"Boffres, France · 2014",
    "stat.1":"Years of craftsmanship","stat.2":"Active countries · IT · FR · CH","stat.3":"Italian stone","stat.4":"Geological age",
    "about.ey":"About us","about.title":"A family tradition,<br><em>a new generation.</em>","about.p1":"Nikestone is the meeting point between Mauro Angelino's forty years of experience and a new generation led by his son Massimo. We work Luserna Stone — Piedmont's most valuable metamorphic rock — with the care of a craft passed down and the rigour of a modern site.","about.p2":"We operate across Italy, France and Switzerland. Our work is in Crans-Montana, Chamonix, Alpe d'Huez, Marseille, Lugano and numerous private and public commissions. Every project is followed directly, from material selection at the quarry to final laying.","about.role":"Owners · Bibiana, Turin","about.cap":"Collina d'Oro, Lugano · Tarchini Group",
    "lus.ey":"Luserna Stone","lus.title":"A rock<br><em>three hundred million years old.</em>","lus.p1":"Quarried exclusively in Val Pellice, near Turin, Luserna Stone is one of the oldest and most resistant metamorphic rocks in Europe. Recognised across Europe as Piedmont gneiss, it is valued by architects for its near-limitless durability, frost-thaw resistance and consistent colour over time.","lus.p2":"We work it in every finish — split, flamed, sandblasted, honed or polished — for outdoor and indoor paving, wall cladding, roof slates, monolithic stairs, sills and custom elements.","lus.s1":"Compressive strength","lus.s2":"Water absorption","lus.s3":"Hardness","lus.s4":"Fire reaction","lus.s5":"Frost resistance","lus.s6":"Standards compliance",
    "port.ey":"Portfolio","port.title":"Our <em>projects</em>","port.all":"All","port.pav":"Paving","port.riv":"Cladding","port.mur":"Masonry","port.cop":"Roofing","port.spe":"Special","port.more":"Show more projects",
    "proc.ey":"Our method","proc.title":"How we <em>work</em>","proc.s1t":"Site visit","proc.s1d":"Free visit to assess the context, evaluate technical feasibility and listen to the designer or client.","proc.s2t":"Quote","proc.s2d":"Detailed quote with material selection, finish, laying pattern and timing. Transport included in the final price.","proc.s3t":"Supply","proc.s3d":"Direct selection at the Val Pellice quarry, custom processing of special pieces, technical sheet and origin certificates.","proc.s4t":"Laying","proc.s4d":"In-house specialised laying team. Clean site, on-time delivery, workmanship guarantee.",
    "svc.ey":"What we do","svc.title":"What we <em>build</em>","svc.1t":"Outdoor paving","svc.1d":"Pavements, driveways, squares and terraces in slabs, cubes or cobblestones. Tight joint or fan-pattern laying.","svc.2t":"Wall cladding","svc.2d":"Facades, boundary walls and interior walls. Split, coursed or regularised opus incertum, with corner and lintel pieces.","svc.3t":"Stone roofing","svc.3d":"Traditional Alpine roofs in Luserna slates. Century-long durability, resistance to snow loads, integration with historical buildings.","svc.4t":"Stone masonry","svc.4d":"Load-bearing, retaining and dry-stone walls. Structural stone of variable thickness for bases, retaining works and Alpine architecture.","svc.5t":"Indoor flooring","svc.5d":"Floors for homes, villas and commercial spaces. Regular-format slabs, honed or polished finish, coordinated with wood and metals.","svc.6t":"Custom pieces","svc.6d":"Monolithic stairs, sills, thresholds, copings, mantels, fireplaces, kitchen tops, fountains and bespoke elements. CNC shaping, hand finishing.",
    "cnt.ey":"Talk to us","cnt.title":"Let's start<br><em>your project.</em>","cnt.intro":"For architects, builders and private clients. Free site visit and quote across Italy, France and Switzerland.","cnt.l1":"Address","cnt.l2":"Phone","cnt.l3":"Areas","cnt.italy":"Italy","cnt.france":"France",
    "f.name":"First name *","f.sur":"Last name *","f.tel":"Phone","f.type":"Project type *","f.country":"Country","f.sel":"Select…","f.sup":"Material supply only","f.other":"Other","f.msg":"Describe your project *","f.p1":"I have read and accept the ","f.p2":"privacy policy","f.p3":" (GDPR). *","f.send":"Send request","f.sending":"Sending…","f.ok":"✓ Thank you. We will reply within 24 hours.",
    "err.req":"This field is required.","err.email":"Please enter a valid email address.","err.tel":"Invalid phone number.","err.minmsg":"Please describe your project in at least 10 characters.","err.privacy":"You must accept the privacy policy to send your request.","err.network":"⚠ Network error. Check your connection and retry.","err.server":"⚠ Server error. Please retry in a few minutes or write to info@nikestone.it.","err.config":"⚠ Form not configured. Please contact us directly at info@nikestone.it.","err.fields":"⚠ Some fields are not filled in correctly.",
    "ft.desc":"Supply, processing and laying of Luserna Stone for architects, builders and private clients. From Bibiana, Val Pellice, to Italy, France and Switzerland.","ft.nav":"Navigation","ft.svc":"Services","ft.cont":"Contact","ft.copy":"© 2026 Nikestone · VAT 00000000000 · All rights reserved","ft.priv":"Privacy","ft.ck":"Cookies","ft.terms":"Terms",
    "ck.text":"We use essential technical cookies. With your consent, also analytical cookies to improve the site.","ck.more":"More information","ck.dec":"Essentials only","ck.acc":"Accept"
  },
  fr: {
    "nav.about":"À propos","nav.stone":"La Pierre","nav.work":"Projets","nav.process":"Méthode","nav.svc":"Services","nav.contact":"Contact","nav.cta":"Devis",
    "hero.kicker":"Pierre de Luserne · Val Pellice, Piémont","hero.h1a":"La pierre","hero.h1b":"qui demeure.","hero.sub":"Nous extrayons, travaillons et posons la Pierre de Luserne pour l'architecture résidentielle, l'édifice public et les contextes historiques. Quarante ans de savoir-faire entre Piémont, France et Suisse.","hero.cta1":"Voir nos projets","hero.cta2":"Demander un devis","hero.meta1":"Château de Cachard","hero.meta2":"Boffres, France · 2014",
    "stat.1":"Années de métier","stat.2":"Pays actifs · IT · FR · CH","stat.3":"Pierre italienne","stat.4":"Âge géologique",
    "about.ey":"À propos","about.title":"Une tradition familiale,<br><em>une nouvelle génération.</em>","about.p1":"Nikestone est né de la rencontre entre les quarante années d'expérience de Mauro Angelino et la nouvelle génération, conduite par son fils Massimo. Nous travaillons la Pierre de Luserne — la plus précieuse des roches métamorphiques du Piémont — avec le soin d'un métier transmis et la rigueur d'un chantier contemporain.","about.p2":"Nous opérons entre l'Italie, la France et la Suisse. Nos réalisations se trouvent à Crans-Montana, Chamonix, Alpe d'Huez, Marseille, Lugano et auprès de nombreuses commandes privées et publiques. Chaque projet est suivi directement, de la sélection du matériau en carrière à la pose finale.","about.role":"Propriétaires · Bibiana, Turin","about.cap":"Collina d'Oro, Lugano · Groupe Tarchini",
    "lus.ey":"La Pierre de Luserne","lus.title":"Une roche<br><em>de trois cents millions d'années.</em>","lus.p1":"Extraite exclusivement dans le Val Pellice, près de Turin, la Pierre de Luserne est l'une des roches métamorphiques les plus anciennes et résistantes d'Europe. Reconnue au niveau européen comme gneiss du Piémont, elle est appréciée des architectes pour sa durabilité quasi illimitée, sa résistance au gel-dégel et sa cohérence chromatique dans le temps.","lus.p2":"Nous la travaillons dans toutes les finitions — éclatée, flammée, sablée, adoucie ou polie — pour pavages extérieurs et intérieurs, revêtements muraux, couvertures en lauzes, escaliers monolithiques, appuis et éléments sur mesure.","lus.s1":"Résistance à la compression","lus.s2":"Absorption d'eau","lus.s3":"Dureté","lus.s4":"Réaction au feu","lus.s5":"Résistance au gel","lus.s6":"Conformité normes",
    "port.ey":"Portfolio","port.title":"Nos <em>chantiers</em>","port.all":"Tous","port.pav":"Pavages","port.riv":"Revêtements","port.mur":"Maçonneries","port.cop":"Couvertures","port.spe":"Pièces spéciales","port.more":"Voir plus de projets",
    "proc.ey":"Notre méthode","proc.title":"Comment nous <em>travaillons</em>","proc.s1t":"Visite","proc.s1d":"Visite gratuite pour analyser le contexte, évaluer la faisabilité technique et écouter le concepteur ou le client.","proc.s2t":"Devis","proc.s2d":"Devis détaillé avec choix du matériau, finition, schéma de pose et calendrier. Transport inclus dans le prix final.","proc.s3t":"Fourniture","proc.s3d":"Sélection directe en carrière du Val Pellice, façonnage sur mesure des pièces spéciales, fiche technique et certificats d'origine.","proc.s4t":"Pose","proc.s4d":"Équipe de poseurs spécialisée interne. Chantier propre, livraison dans les délais, garantie sur le travail exécuté.",
    "svc.ey":"Réalisations","svc.title":"Ce que nous <em>construisons</em>","svc.1t":"Pavages extérieurs","svc.1d":"Dallages, allées, places et terrasses en dalles, pavés ou galets. Pose à joint serré ou en éventail, sur chape armée ou sable.","svc.2t":"Revêtements muraux","svc.2d":"Façades, murs de clôture et parois intérieures. Pierre éclatée, à assises ou opus incertum régularisé, avec pièces d'angle et linteaux monolithiques.","svc.3t":"Couvertures en lauzes","svc.3d":"Toitures alpines traditionnelles en lauzes de Luserne. Durabilité centenaire, résistance aux charges de neige d'altitude, intégration à l'édifice historique.","svc.4t":"Maçonneries en pierre","svc.4d":"Murs porteurs, de soutènement et en pierres sèches. Pierre structurelle d'épaisseur variable pour socles, soutènements et architecture alpine.","svc.5t":"Sols intérieurs","svc.5d":"Sols pour habitations, villas et espaces commerciaux. Dalles à format régulier, finition adoucie ou polie, pose coordonnée avec bois et métaux.","svc.6t":"Pièces spéciales","svc.6d":"Escaliers monolithiques, appuis, seuils, couvertines, tablettes, cheminées, plans de cuisine, fontaines et éléments sur mesure. Façonnage CNC, finition à la main.",
    "cnt.ey":"Parlons-en","cnt.title":"Commençons<br><em>votre projet.</em>","cnt.intro":"Pour architectes, constructeurs et particuliers. Visite et devis gratuits dans toute l'Italie, la France et la Suisse.","cnt.l1":"Siège","cnt.l2":"Téléphone","cnt.l3":"Zones","cnt.italy":"Italie","cnt.france":"France",
    "f.name":"Prénom *","f.sur":"Nom *","f.tel":"Téléphone","f.type":"Type de projet *","f.country":"Pays","f.sel":"Sélectionner…","f.sup":"Fourniture uniquement","f.other":"Autre","f.msg":"Décrivez votre projet *","f.p1":"J'ai lu et j'accepte la ","f.p2":"politique de confidentialité","f.p3":" (RGPD). *","f.send":"Envoyer la demande","f.sending":"Envoi en cours…","f.ok":"✓ Merci. Nous vous répondrons sous 24 heures.",
    "err.req":"Ce champ est obligatoire.","err.email":"Veuillez saisir une adresse email valide.","err.tel":"Numéro de téléphone invalide.","err.minmsg":"Veuillez décrire votre projet en au moins 10 caractères.","err.privacy":"Vous devez accepter la politique de confidentialité pour envoyer votre demande.","err.network":"⚠ Erreur réseau. Vérifiez votre connexion et réessayez.","err.server":"⚠ Erreur serveur. Réessayez dans quelques minutes ou écrivez à info@nikestone.it.","err.config":"⚠ Formulaire non configuré. Contactez-nous directement à info@nikestone.it.","err.fields":"⚠ Certains champs ne sont pas correctement remplis.",
    "ft.desc":"Fourniture, façonnage et pose de la Pierre de Luserne pour architectes, constructeurs et particuliers. De Bibiana, Val Pellice, à toute l'Italie, la France et la Suisse.","ft.nav":"Navigation","ft.svc":"Services","ft.cont":"Contact","ft.copy":"© 2026 Nikestone · TVA 00000000000 · Tous droits réservés","ft.priv":"Confidentialité","ft.ck":"Cookies","ft.terms":"Conditions",
    "ck.text":"Nous utilisons des cookies techniques essentiels. Avec votre consentement, également des cookies analytiques pour améliorer le site.","ck.more":"Plus d'informations","ck.dec":"Essentiels uniquement","ck.acc":"Accepter"
  },
  de: {
    "nav.about":"Über uns","nav.stone":"Der Stein","nav.work":"Projekte","nav.process":"Methode","nav.svc":"Leistungen","nav.contact":"Kontakt","nav.cta":"Angebot",
    "hero.kicker":"Luserna-Stein · Val Pellice, Piemont","hero.h1a":"Der Stein,","hero.h1b":"der bleibt.","hero.sub":"Wir gewinnen, bearbeiten und verlegen Luserna-Stein für Wohnbau, öffentliche Bauten und historische Kontexte. Vierzig Jahre Handwerk zwischen Piemont, Frankreich und der Schweiz.","hero.cta1":"Projekte ansehen","hero.cta2":"Angebot anfragen","hero.meta1":"Château de Cachard","hero.meta2":"Boffres, Frankreich · 2014",
    "stat.1":"Jahre Handwerk","stat.2":"Aktive Länder · IT · FR · CH","stat.3":"Italienischer Stein","stat.4":"Geologisches Alter",
    "about.ey":"Über uns","about.title":"Eine Familientradition,<br><em>eine neue Generation.</em>","about.p1":"Nikestone entstand aus der Begegnung zwischen der vierzigjährigen Erfahrung von Mauro Angelino und der neuen Generation unter Leitung seines Sohnes Massimo. Wir bearbeiten den Luserna-Stein — den wertvollsten metamorphen Stein des Piemonts — mit der Sorgfalt eines überlieferten Handwerks und der Strenge einer modernen Baustelle.","about.p2":"Wir arbeiten in Italien, Frankreich und der Schweiz. Unsere Werke befinden sich in Crans-Montana, Chamonix, Alpe d'Huez, Marseille, Lugano und in zahlreichen privaten und öffentlichen Aufträgen. Jedes Projekt wird direkt begleitet — von der Materialauswahl im Steinbruch bis zur endgültigen Verlegung.","about.role":"Inhaber · Bibiana, Turin","about.cap":"Collina d'Oro, Lugano · Tarchini-Gruppe",
    "lus.ey":"Der Luserna-Stein","lus.title":"Ein Gestein<br><em>von dreihundert Millionen Jahren.</em>","lus.p1":"Ausschließlich im Val Pellice bei Turin gewonnen, ist der Luserna-Stein eines der ältesten und widerstandsfähigsten metamorphen Gesteine Europas. Europaweit als Piemont-Gneis anerkannt, wird er von Architekten für seine nahezu unbegrenzte Haltbarkeit, Frost-Tau-Beständigkeit und gleichbleibende Farbe geschätzt.","lus.p2":"Wir bearbeiten ihn in allen Oberflächen — gespalten, geflammt, sandgestrahlt, geschliffen oder poliert — für Außen- und Innenbeläge, Wandverkleidungen, Dacheindeckungen, monolithische Treppen, Fensterbänke und Sonderanfertigungen.","lus.s1":"Druckfestigkeit","lus.s2":"Wasseraufnahme","lus.s3":"Härte","lus.s4":"Brandverhalten","lus.s5":"Frostbeständigkeit","lus.s6":"Normenkonformität",
    "port.ey":"Portfolio","port.title":"Unsere <em>Projekte</em>","port.all":"Alle","port.pav":"Bodenbeläge","port.riv":"Verkleidungen","port.mur":"Mauerwerk","port.cop":"Dächer","port.spe":"Sonderteile","port.more":"Weitere Projekte anzeigen",
    "proc.ey":"Unsere Methode","proc.title":"Wie wir <em>arbeiten</em>","proc.s1t":"Ortstermin","proc.s1d":"Kostenloser Besuch zur Analyse des Kontexts, zur Beurteilung der technischen Machbarkeit und zum Zuhören.","proc.s2t":"Angebot","proc.s2d":"Detailliertes Angebot mit Materialauswahl, Oberfläche, Verlegemuster und Zeitplan. Transport im Endpreis enthalten.","proc.s3t":"Lieferung","proc.s3d":"Direkte Auswahl im Steinbruch im Val Pellice, maßgefertigte Bearbeitung von Sonderteilen, technisches Datenblatt und Herkunftszertifikate.","proc.s4t":"Verlegung","proc.s4d":"Internes Fachteam für die Verlegung. Saubere Baustelle, termingerechte Lieferung, Gewährleistung auf die ausgeführte Arbeit.",
    "svc.ey":"Leistungen","svc.title":"Was wir <em>bauen</em>","svc.1t":"Außenbeläge","svc.1d":"Pflasterungen, Wege, Plätze und Terrassen in Platten, Würfeln oder Kopfsteinpflaster. Verlegung mit engen Fugen oder im Fächermuster.","svc.2t":"Wandverkleidungen","svc.2d":"Fassaden, Einfriedungen und Innenwände. Gespaltene Steine, geschichtet oder als regulierter opus incertum, mit Eck- und Sturzteilen.","svc.3t":"Dächer in Lauzen","svc.3d":"Traditionelle Alpendächer in Luserna-Lauzen. Jahrhundertelange Haltbarkeit, Beständigkeit gegen Schneelasten, Integration in historische Bauten.","svc.4t":"Mauerwerk in Stein","svc.4d":"Tragende, stützende und Trockenmauern. Strukturstein in variabler Stärke für Sockel, Stützmauern und Alpenarchitektur.","svc.5t":"Innenböden","svc.5d":"Böden für Wohnhäuser, Villen und Gewerbeflächen. Platten in regulären Formaten, geschliffen oder poliert, abgestimmt auf Holz und Metalle.","svc.6t":"Sonderteile","svc.6d":"Monolithische Treppen, Fensterbänke, Schwellen, Abdeckungen, Konsolen, Kamine, Küchenplatten, Brunnen und maßgefertigte Elemente. CNC-Formgebung, Handveredelung.",
    "cnt.ey":"Sprechen Sie mit uns","cnt.title":"Beginnen wir<br><em>Ihr Projekt.</em>","cnt.intro":"Für Architekten, Bauunternehmer und Privatkunden. Kostenloser Ortstermin und Angebot in ganz Italien, Frankreich und der Schweiz.","cnt.l1":"Sitz","cnt.l2":"Telefon","cnt.l3":"Gebiete","cnt.italy":"Italien","cnt.france":"Frankreich",
    "f.name":"Vorname *","f.sur":"Nachname *","f.tel":"Telefon","f.type":"Projekttyp *","f.country":"Land","f.sel":"Auswählen…","f.sup":"Nur Materiallieferung","f.other":"Andere","f.msg":"Beschreiben Sie Ihr Projekt *","f.p1":"Ich habe die ","f.p2":"Datenschutzerklärung","f.p3":" gelesen und akzeptiere sie (DSGVO). *","f.send":"Anfrage senden","f.sending":"Wird gesendet…","f.ok":"✓ Vielen Dank. Wir antworten innerhalb von 24 Stunden.",
    "err.req":"Dieses Feld ist erforderlich.","err.email":"Bitte geben Sie eine gültige E-Mail-Adresse ein.","err.tel":"Ungültige Telefonnummer.","err.minmsg":"Bitte beschreiben Sie Ihr Projekt in mindestens 10 Zeichen.","err.privacy":"Sie müssen die Datenschutzerklärung akzeptieren, um Ihre Anfrage zu senden.","err.network":"⚠ Netzwerkfehler. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es erneut.","err.server":"⚠ Serverfehler. Bitte versuchen Sie es in wenigen Minuten erneut oder schreiben Sie an info@nikestone.it.","err.config":"⚠ Formular nicht konfiguriert. Bitte kontaktieren Sie uns direkt unter info@nikestone.it.","err.fields":"⚠ Einige Felder sind nicht korrekt ausgefüllt.",
    "ft.desc":"Lieferung, Bearbeitung und Verlegung von Luserna-Stein für Architekten, Bauunternehmer und Privatkunden. Von Bibiana, Val Pellice, in ganz Italien, Frankreich und der Schweiz.","ft.nav":"Navigation","ft.svc":"Leistungen","ft.cont":"Kontakt","ft.copy":"© 2026 Nikestone · USt.-IdNr. 00000000000 · Alle Rechte vorbehalten","ft.priv":"Datenschutz","ft.ck":"Cookies","ft.terms":"AGB",
    "ck.text":"Wir verwenden technisch notwendige Cookies. Mit Ihrer Zustimmung auch Analyse-Cookies zur Verbesserung der Website.","ck.more":"Weitere Informationen","ck.dec":"Nur notwendige","ck.acc":"Akzeptieren"
  }
};

function t(key){ return (I18N[currentLang] && I18N[currentLang][key]) || I18N.it[key] || key; }

function applyI18n(lang){
  if(!I18N[lang]) return;
  currentLang = lang;
  const dict = I18N[lang];
  document.documentElement.lang = lang;
  document.documentElement.setAttribute("data-lang", lang);
  document.querySelectorAll("[data-i]").forEach(el => {
    const k = el.getAttribute("data-i");
    if (dict[k] !== undefined) el.innerHTML = dict[k];
  });
  document.querySelectorAll("[data-lang]").forEach(btn => {
    const isActive = btn.getAttribute("data-lang") === lang;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
  try { localStorage.setItem("nk_lang", lang); } catch(_) {}
}

/* ============================================================
   GALLERY — enhance server-rendered HTML
   ============================================================ */
const gallery = document.getElementById("gallery");
const loadMoreBtn = document.getElementById("loadMore");

function updateGalleryVisibility(){
  const items = Array.from(gallery.querySelectorAll(".proj"));
  const filtered = items.filter(el => currentFilter === "all" || el.dataset.cat === currentFilter);
  let shown = 0;
  items.forEach(el => {
    const matches = currentFilter === "all" || el.dataset.cat === currentFilter;
    if (!matches){
      el.setAttribute("data-hidden", "true");
    } else {
      if (shown < visibleCount){
        el.removeAttribute("data-hidden");
        shown++;
      } else {
        el.setAttribute("data-hidden", "true");
      }
    }
  });
  loadMoreBtn.hidden = filtered.length <= visibleCount;
}

// Bind filters
document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => {
      b.classList.remove("on");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("on");
    btn.setAttribute("aria-pressed", "true");
    currentFilter = btn.dataset.f;
    visibleCount = INITIAL_COUNT;
    updateGalleryVisibility();
  });
});

loadMoreBtn.addEventListener("click", () => {
  visibleCount += 12;
  updateGalleryVisibility();
});

// Bind click/keyboard on each project to open lightbox
gallery.querySelectorAll(".proj").forEach(el => {
  const idx = parseInt(el.dataset.idx, 10);
  el.addEventListener("click", () => openLb(idx));
  el.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " "){
      e.preventDefault();
      openLb(idx);
    }
  });
});

/* ============================================================
   LIGHTBOX with focus trap
   ============================================================ */
const lb = document.getElementById("lb");
const lbImg = document.getElementById("lbImg");
const lbTitle = document.getElementById("lbTitle");
const lbDesc = document.getElementById("lbDesc");
const lbCounter = document.getElementById("lbCounter");
let lbIdx = 0;
let lbReturnFocus = null;

function openLb(i){
  if (i < 0 || i >= PROJECTS.length) return;
  lbIdx = i;
  lbReturnFocus = document.activeElement;
  updateLb();
  lb.hidden = false;
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
  setTimeout(() => document.getElementById("lbClose").focus(), 50);
}
function updateLb(){
  const p = PROJECTS[lbIdx];
  lbImg.src = p.img;
  lbImg.alt = p.title;
  lbTitle.textContent = p.title;
  lbDesc.textContent = p.desc;
  lbCounter.textContent = `${String(lbIdx+1).padStart(2,"0")} / ${String(PROJECTS.length).padStart(2,"0")}`;
}
function closeLb(){
  lb.classList.remove("open");
  setTimeout(() => { lb.hidden = true; }, 250);
  document.body.style.overflow = "";
  if (lbReturnFocus && typeof lbReturnFocus.focus === "function") lbReturnFocus.focus();
}
function lbPrev(){ lbIdx = (lbIdx - 1 + PROJECTS.length) % PROJECTS.length; updateLb(); }
function lbNext(){ lbIdx = (lbIdx + 1) % PROJECTS.length; updateLb(); }

document.getElementById("lbClose").addEventListener("click", closeLb);
document.getElementById("lbPrev").addEventListener("click", lbPrev);
document.getElementById("lbNext").addEventListener("click", lbNext);
lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
document.addEventListener("keydown", e => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") closeLb();
  else if (e.key === "ArrowLeft") lbPrev();
  else if (e.key === "ArrowRight") lbNext();
  else if (e.key === "Tab"){
    // Simple focus trap
    const focusables = lb.querySelectorAll("button");
    const first = focusables[0], last = focusables[focusables.length-1];
    if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  }
});

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting){
      e.target.classList.add("in");
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".rev").forEach(el => revealObs.observe(el));

/* ============================================================
   NAV: scroll states + hero detection for legibility
   ============================================================ */
const navEl = document.getElementById("nav");
const heroEl = document.getElementById("top");
const bttBtn = document.getElementById("btt");

function onScroll(){
  const y = window.scrollY;
  navEl.classList.toggle("stuck", y > 30);
  // If hero still occupies viewport top, apply on-hero class for legibility tweaks
  if (heroEl){
    const heroBottom = heroEl.offsetTop + heroEl.offsetHeight - 80;
    navEl.classList.toggle("on-hero", y < heroBottom);
  }
  const showBtt = y > 600;
  bttBtn.classList.toggle("show", showBtt);
  bttBtn.hidden = !showBtt;
}
window.addEventListener("scroll", onScroll, { passive:true });
window.addEventListener("resize", onScroll, { passive:true });
onScroll();

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const href = a.getAttribute("href");
    if (href === "#" || href.length < 2) return;
    const target = document.querySelector(href);
    if (target){
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
function openMobile(){
  mob.classList.add("open");
  mob.removeAttribute("inert");
  ham.classList.add("open");
  ham.setAttribute("aria-expanded","true");
  document.body.style.overflow = "hidden";
}
function closeMobile(){
  mob.classList.remove("open");
  mob.setAttribute("inert", "");
  ham.classList.remove("open");
  ham.setAttribute("aria-expanded","false");
  document.body.style.overflow = "";
}
ham.addEventListener("click", () => {
  if (mob.classList.contains("open")) closeMobile(); else openMobile();
});

/* ============================================================
   LANGUAGE
   ============================================================ */
document.querySelectorAll("[data-lang]").forEach(btn => {
  btn.addEventListener("click", () => {
    applyI18n(btn.getAttribute("data-lang"));
    if (mob.classList.contains("open")) closeMobile();
  });
});
try {
  const saved = localStorage.getItem("nk_lang");
  if (saved && I18N[saved]) applyI18n(saved);
} catch(_) {}

/* ============================================================
   BACK TO TOP
   ============================================================ */
bttBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ============================================================
   FORM — per-field validation + REAL backend submission
   ============================================================ */
const form = document.getElementById("lead");
const fok = document.getElementById("fok");
const ferr = document.getElementById("ferr");
const fsub = document.getElementById("fsub");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TEL_RE = /^[+\d][\d\s().\-/]{5,}$/;

function setFieldError(fieldId, errKey){
  const input = document.getElementById(fieldId);
  const errEl = document.getElementById("err-" + fieldId);
  const wrap = input ? input.closest(".fg") : null;
  if (!errEl) return;
  if (errKey){
    errEl.textContent = t(errKey);
    if (wrap) wrap.classList.add("invalid");
    if (input) input.setAttribute("aria-invalid", "true");
  } else {
    errEl.textContent = "";
    if (wrap) wrap.classList.remove("invalid");
    if (input) input.removeAttribute("aria-invalid");
  }
}

function validateField(input){
  if (!input || !input.name) return true;
  const name = input.name;
  const value = (input.value || "").trim();
  const id = input.id;
  if (input.required && !value){
    setFieldError(id, "err.req");
    return false;
  }
  if (name === "email" && value && !EMAIL_RE.test(value)){
    setFieldError(id, "err.email");
    return false;
  }
  if (name === "telefono" && value && !TEL_RE.test(value)){
    setFieldError(id, "err.tel");
    return false;
  }
  if (name === "messaggio" && value && value.length < 10){
    setFieldError(id, "err.minmsg");
    return false;
  }
  setFieldError(id, null);
  return true;
}

// Live validation on blur (after first interaction)
form.querySelectorAll("input, select, textarea").forEach(input => {
  input.addEventListener("blur", () => {
    if (input.dataset.touched === "1") validateField(input);
  });
  input.addEventListener("input", () => {
    input.dataset.touched = "1";
    // Clear error as user types if previously invalid
    if (input.closest(".fg") && input.closest(".fg").classList.contains("invalid")){
      validateField(input);
    }
  });
});

function setFormError(msgKey){
  ferr.textContent = t(msgKey);
  ferr.classList.add("show");
  fok.classList.remove("show");
}
function clearFormMessages(){
  ferr.classList.remove("show"); ferr.textContent = "";
  fok.classList.remove("show");
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  clearFormMessages();

  // Honeypot
  const hp = form.querySelector('input[name="_gotcha"]');
  if (hp && hp.value) return; // silent drop bots

  // Per-field validate
  let ok = true;
  form.querySelectorAll("input[required], select[required], textarea[required]").forEach(input => {
    if (!validateField(input)) ok = false;
  });
  // Optional fields with value
  const tel = document.getElementById("ftel");
  if (tel.value && !validateField(tel)) ok = false;

  // Privacy
  const priv = document.getElementById("fpriv");
  if (!priv.checked){
    setFieldError("fpriv", "err.privacy");
    priv.focus();
    ok = false;
  } else {
    setFieldError("fpriv", null);
  }

  if (!ok){
    setFormError("err.fields");
    // Focus first invalid
    const firstInvalid = form.querySelector(".fg.invalid input, .fg.invalid select, .fg.invalid textarea");
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  // Config check
  if (!CONFIG.FORM_ENDPOINT || CONFIG.FORM_ENDPOINT.includes("YOUR_FORM_ID")){
    setFormError("err.config");
    console.warn("[Nikestone] Form endpoint not configured. Edit CONFIG.FORM_ENDPOINT in script.js");
    return;
  }

  // Submit
  fsub.setAttribute("data-loading", "true");
  fsub.disabled = true;
  fsub.setAttribute("aria-busy", "true");

  const payload = Object.fromEntries(new FormData(form));
  delete payload._gotcha; // don't send honeypot field
  payload.timestamp = new Date().toISOString();
  payload.lang = currentLang;
  payload.page_url = location.href;
  payload.user_agent = navigator.userAgent;

  try {
    const response = await fetch(CONFIG.FORM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok){
      fok.classList.add("show");
      form.reset();
      form.querySelectorAll(".fg.invalid").forEach(fg => fg.classList.remove("invalid"));
      form.querySelectorAll(".ferr-msg").forEach(e => e.textContent = "");
      // GA4 event after consent
      gaEvent("form_submit", { lang: currentLang });
    } else {
      // Try to read error details from response
      let detail = "";
      try {
        const data = await response.json();
        if (data && data.error) detail = data.error;
      } catch(_){}
      console.error("[Nikestone] Form server error:", response.status, detail);
      setFormError(response.status >= 500 ? "err.server" : "err.fields");
    }
  } catch (err) {
    console.error("[Nikestone] Form network error:", err);
    setFormError("err.network");
  } finally {
    fsub.removeAttribute("data-loading");
    fsub.disabled = false;
    fsub.removeAttribute("aria-busy");
  }
});

/* ============================================================
   COOKIE CONSENT — true script gating + no CLS + immediate
   ============================================================ */
const ck = document.getElementById("ck");
const ckAcc = document.getElementById("ckAcc");
const ckDec = document.getElementById("ckDec");

function showCookieBanner(){
  ck.hidden = false;
  document.documentElement.classList.add("ck-pending");
}
function hideCookieBanner(){
  ck.hidden = true;
  document.documentElement.classList.remove("ck-pending");
}

// Decide on load — IMMEDIATE, no setTimeout, banner space already reserved via .ck-pending
(function initCookies(){
  let consent = null;
  try { consent = localStorage.getItem("nk_ck"); } catch(_) {}
  if (consent === "all"){
    hideCookieBanner();
    loadAnalyticsScripts();
  } else if (consent === "essential"){
    hideCookieBanner();
    // No analytics loaded
  } else {
    showCookieBanner();
  }
})();

ckAcc.addEventListener("click", () => {
  try { localStorage.setItem("nk_ck", "all"); } catch(_) {}
  hideCookieBanner();
  loadAnalyticsScripts();
});
ckDec.addEventListener("click", () => {
  try { localStorage.setItem("nk_ck", "essential"); } catch(_) {}
  hideCookieBanner();
});

/* ============================================================
   ANALYTICS — loaded ONLY after explicit consent
   ============================================================
   No third-party script is loaded into the page before consent.
   For full GDPR compliance with multiple third-party trackers,
   consider a CMP like Iubenda or Cookiebot.
   ============================================================ */
let analyticsLoaded = false;
function loadAnalyticsScripts(){
  if (analyticsLoaded) return;
  if (!CONFIG.GA4_ID) return;
  analyticsLoaded = true;
  // Load Google Analytics 4 only after consent
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(CONFIG.GA4_ID);
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", CONFIG.GA4_ID, { anonymize_ip: true });
}
function gaEvent(name, params){
  if (typeof window.gtag === "function") window.gtag("event", name, params || {});
}
