import fs from 'fs';
import path from 'path';
const ROOT = 'C:/Users/Pietra/Desktop/nikestone-astro';
const CAM = 'C:/Users/Pietra/Desktop/NIKESTONE/FOTO DALLA MACCHINA FOTOGRAFICA';
const cam = fs.readdirSync(CAM).filter(f => /\.(jpe?g|png|webp)$/i.test(f)).sort();
const dir = path.join(ROOT, 'src/assets/gallery/piscine');
// wipe old piscine selection
fs.rmSync(dir, { recursive: true, force: true });
fs.mkdirSync(dir, { recursive: true });

const newPool = [
  'WhatsApp Image 2026-06-16 at 09.27.53 (2).jpeg',
  'WhatsApp Image 2026-06-16 at 09.27.53 (4).jpeg',
];
const out = [];
newPool.forEach((f, i) => {
  fs.copyFileSync(path.join(ROOT, f), path.join(dir, 'piscine-' + (i + 1) + '.jpg'));
  out.push({ src: f, out: 'piscine-' + (i + 1) + '.jpg' });
});
// camera real pools #152, #154 as extra
[152, 154].forEach((idx, i) => {
  fs.copyFileSync(path.join(CAM, cam[idx - 1]), path.join(dir, 'piscine-' + (i + 3) + '.jpg'));
  out.push({ idx, src: cam[idx - 1], out: 'piscine-' + (i + 3) + '.jpg' });
});

// update manifest
const mp = path.join(ROOT, 'src/assets/_manifest.json');
const man = JSON.parse(fs.readFileSync(mp, 'utf8'));
man.piscine = out;
fs.writeFileSync(mp, JSON.stringify(man, null, 2));
// tidy root (remove the loose jpeg uploads now copied)
newPool.forEach(f => { try { fs.rmSync(path.join(ROOT, f)); } catch (e) {} });
console.log('piscine set: ' + out.map(o => o.out).join(', '));
