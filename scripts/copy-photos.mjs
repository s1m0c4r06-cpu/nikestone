import fs from 'fs';
import path from 'path';
const DIR = 'C:/Users/Pietra/Desktop/NIKESTONE/FOTO DALLA MACCHINA FOTOGRAFICA';
const OUT = 'C:/Users/Pietra/Desktop/nikestone-astro/src/assets';
const files = fs.readdirSync(DIR).filter(f => /\.(jpe?g|png|webp)$/i.test(f)).sort();
// index (1-based, matching the contact sheet) -> filename
const pick = idx => files[idx - 1];

const SEL = {
  piscine:        [152, 153, 154, 145, 146, 147],
  rivestimenti:   [117, 118, 123, 31, 128, 127],
  coperture:      [65, 69, 91, 70, 93, 94],
  pavimentazioni: [21, 33, 55, 22, 35, 139, 57],
  posa:           [137, 138, 150],
  feature:        [24, 105, 152, 85],
};

const manifest = {};
for (const [cat, idxs] of Object.entries(SEL)) {
  const dir = path.join(OUT, cat === 'feature' || cat === 'posa' ? cat : 'gallery/' + cat);
  fs.mkdirSync(dir, { recursive: true });
  manifest[cat] = [];
  idxs.forEach((idx, i) => {
    const src = pick(idx);
    if (!src) { console.log('MISSING idx ' + idx); return; }
    const ext = path.extname(src).toLowerCase().replace('.jpeg', '.jpg');
    const name = cat + '-' + (i + 1) + ext;
    fs.copyFileSync(path.join(DIR, src), path.join(dir, name));
    manifest[cat].push({ idx, src, out: name, bytes: fs.statSync(path.join(DIR, src)).size });
  });
}
fs.writeFileSync(path.join(OUT, '_manifest.json'), JSON.stringify(manifest, null, 2));
let total = 0, count = 0;
for (const cat of Object.keys(manifest)) for (const m of manifest[cat]) { total += m.bytes; count++; }
console.log('copied ' + count + ' photos, ' + (total / 1024 / 1024).toFixed(1) + ' MB raw (Astro will optimize)');
console.log(Object.fromEntries(Object.entries(manifest).map(([k, v]) => [k, v.length])));
