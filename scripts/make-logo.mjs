import sharp from 'sharp';
import fs from 'fs';
const SRC = 'C:/Users/Pietra/Desktop/NIKESTONE/LOGO/LOGO ORIZZONTALE DEFINITIVO.jpeg';
const PUB = 'C:/Users/Pietra/Desktop/nikestone-astro/public';
fs.mkdirSync(PUB, { recursive: true });
// trim the uniform cream margin, sharpen a touch, export crisp PNG (retina height)
await sharp(SRC).trim({ threshold: 12 }).resize({ height: 320, withoutEnlargement: true })
  .sharpen({ sigma: 0.6 }).png({ compressionLevel: 9 }).toFile(PUB + '/logo.png');
const m = await sharp(PUB + '/logo.png').metadata();
console.log('logo.png ' + m.width + 'x' + m.height);
