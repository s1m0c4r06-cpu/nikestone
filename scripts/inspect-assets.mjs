import sharp from 'sharp';
import path from 'path';
const ROOT = 'C:/Users/Pietra/Desktop/nikestone-astro';
const OUT = 'C:/Users/Pietra/AppData/Local/Temp/nk-test';
const logos = {
  vertical: path.join(ROOT, 'LOGO_NIKESTONE_VERSIONE_DEFINITIVA_VERTICALE_.jpg'),
  horizontal: 'C:/Users/Pietra/Desktop/NIKESTONE/LOGO/LOGO ORIZZONTALE DEFINITIVO.jpeg',
};
for (const [k, f] of Object.entries(logos)) {
  const m = await sharp(f).metadata();
  console.log(`LOGO ${k}: ${m.width}x${m.height} ${m.format} alpha=${m.hasAlpha}`);
  await sharp(f).resize({ width: 900, withoutEnlargement: true }).png().toFile(path.join(OUT, 'logo_' + k + '.png'));
}
const chalets = ['IMG_2730.JPG', 'IMG_2782.JPG', 'IMG_2791.JPG', 'IMG_2823.JPG', 'IMG_2827.JPG'];
const W = 360, H = 240;
const tiles = [];
for (let i = 0; i < chalets.length; i++) {
  const m = await sharp(path.join(ROOT, chalets[i])).metadata();
  console.log(`CHALET ${i + 1} ${chalets[i]}: ${m.width}x${m.height}`);
  tiles.push({ input: await sharp(path.join(ROOT, chalets[i])).resize(W, H, { fit: 'cover' }).toBuffer(), left: i * W, top: 0 });
}
await sharp({ create: { width: W * chalets.length, height: H, channels: 3, background: '#1a1a1a' } })
  .composite(tiles).png().toFile(path.join(OUT, 'chalets.png'));
console.log('previews written');
