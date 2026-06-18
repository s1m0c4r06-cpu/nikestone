import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
const ROOT = 'C:/Users/Pietra/Desktop/nikestone-astro';

// 1) crop the worker off the left edge of piscine-1
const f = path.join(ROOT, 'src/assets/gallery/piscine/piscine-1.jpg');
const m = await sharp(f).metadata();
const left = Math.round(m.width * 0.14);
const tmp = f.replace('.jpg', '.tmp.jpg');
await sharp(f).extract({ left, top: 0, width: m.width - left, height: m.height }).jpeg({ quality: 90 }).toFile(tmp);
fs.renameSync(tmp, f);
console.log(`cropped piscine-1: ${m.width}x${m.height} -> ${m.width - left}x${m.height} (removed left ${left}px)`);

// 2) list any loose images in project root (potential chalet additions)
const loose = fs.readdirSync(ROOT).filter(x => /\.(jpe?g|png|webp)$/i.test(x));
console.log('LOOSE_ROOT_IMAGES=' + (loose.length ? loose.join(' | ') : 'NONE'));
