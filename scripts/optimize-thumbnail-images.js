#!/usr/bin/env node
/**
 * One-time script: WebP copies of the JPEG thumbnails the site displays
 * (before/after cases, the /zambete gallery, procedure cases, the /servicii
 * carousel and team photos).
 *
 * SCOPE: only `thumbnail_*.jpg|jpeg` files inside the directories listed in
 * SOURCE_DIRS (and their sub-folders). public/images/ as a whole is ~115MB of
 * originals that must not be touched.
 *
 * Each `thumbnail_X.JPG` gets a `thumbnail_X.webp` next to it, same pixel size
 * (pages set width/height from it). Originals stay: the JSON-LD and older
 * links still point at them. utils/images.js `toWebp()` maps the paths.
 *
 * Usage: node scripts/optimize-thumbnail-images.js
 */
const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

const IMAGES_ROOT = path.join(__dirname, '..', 'public', 'images');
const SOURCE_DIRS = [
  'beforeAfter',
  'carouselServices',
  'team',
  'services/1_estetica_zambetului',
  'services/1_fatete_si_coroane_cazuri',
  'services/1_restaurari_protetice_estetice_cazuri',
  'services/2_inserare_de_implanturi_si_aditii_de_os',
  'services/2_restaurari_protetice_pe_implanturi_cazuri',
  'services/3_restaurari_extinse_pe_dinti_naturali_si_implanturi_cazuri',
  'services/3_tratamente_mixte_endodontice_parodontale_si_protetice_cazuri',
];
const WEBP_QUALITY = 80;
const THUMBNAIL_PATTERN = /^thumbnail_.+\.jpe?g$/i;

async function listThumbnails(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return listThumbnails(fullPath);
      }
      return entry.isFile() && THUMBNAIL_PATTERN.test(entry.name) ? [fullPath] : [];
    })
  );
  return nested.flat();
}

async function convertToWebp(inputPath) {
  const outputPath = inputPath.replace(/\.jpe?g$/i, '.webp');
  await sharp(inputPath).rotate().webp({ quality: WEBP_QUALITY }).toFile(outputPath);
  const [before, after] = await Promise.all([fs.stat(inputPath), fs.stat(outputPath)]);
  return { before: before.size, after: after.size };
}

async function main() {
  const totals = { files: 0, before: 0, after: 0 };
  for (const relativeDir of SOURCE_DIRS) {
    const dir = path.join(IMAGES_ROOT, relativeDir);
    const stats = await fs.stat(dir).catch(() => null);
    if (!stats || !stats.isDirectory()) {
      throw new Error(`Expected directory not found: ${dir}`);
    }

    const files = await listThumbnails(dir);
    for (const file of files) {
      const result = await convertToWebp(file);
      totals.files += 1;
      totals.before += result.before;
      totals.after += result.after;
    }
    console.log(`${relativeDir}: ${files.length} thumbnails`);
  }

  const savedPct = totals.before > 0 ? (100 * (1 - totals.after / totals.before)).toFixed(1) : '0';
  console.log(
    `Done: ${totals.files} files, ${(totals.before / 1024).toFixed(0)}KB -> ${(totals.after / 1024).toFixed(0)}KB (-${savedPct}%)`
  );
}

main().catch((error) => {
  console.error('Thumbnail optimization failed:', error);
  process.exit(1);
});
