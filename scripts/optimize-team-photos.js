#!/usr/bin/env node
/**
 * Resizes the clinic's team portraits (received 2026-11-12 through WeTransfer,
 * about 4 MB each) into the web copies used by /echipa, the doctors' pages,
 * the homepage and the blog's founder box.
 *
 * For every job it writes, into public/images/team/:
 *   - <out>.jpg   833x1250, the file utils/uiConstants.js points at (it is also
 *                 the image URL in the Person JSON-LD)
 *   - <out>.webp  same size, what the pages actually serve (utils/images.js toWebp)
 *
 * The output names end in "-2026" on purpose: /images is cached for 30 days at
 * Cloudflare, so a new name makes the new photo show up at once. The old files
 * stay where they are. Originals are never modified, and sharp drops the EXIF
 * data (camera, date) from the copies.
 *
 * Usage: node scripts/optimize-team-photos.js "<folder with the original photos>"
 */
const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'team');
const SIZE = { width: 833, height: 1250 };
const JPEG_QUALITY = 82;
const WEBP_QUALITY = 80;

const JOBS = [
  { source: 'dr. Oli.jpg', out: 'thumbnail_Dr.-Olimpiu-L.-Karancsi-2026' },
  { source: 'dr. Paula Derban.jpg', out: 'thumbnail_dr.-Paula-Derban-2026' },
  { source: 'dr. Anda Nicola.jpg', out: 'thumbnail_dr.-Anda-Nicola-2026' },
  { source: 'as. Adela Dăogaru.jpg', out: 'thumbnail_Adela-Daogaru-2026' },
  { source: 'as. Andreea Chifa.jpg', out: 'thumbnail_Chifa-Andreea-2026' },
  { source: 'as. Bianca Bircioaga.jpg', out: 'thumbnail_Bircioaga-Bianca-2026' },
];

async function runJob(sourceDir, job) {
  const input = path.join(sourceDir, job.source);
  const stats = await fs.stat(input).catch(() => null);
  if (!stats || !stats.isFile()) {
    throw new Error(`Source photo not found: ${input}`);
  }
  // The portraits are 2:3 already, so "cover" only rounds the size: the
  // framing the photographer chose is kept.
  const base = () => sharp(input).rotate().resize({ ...SIZE, fit: 'cover', position: 'centre' });
  const jpg = await base().jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(path.join(OUT_DIR, `${job.out}.jpg`));
  const webp = await base().webp({ quality: WEBP_QUALITY }).toFile(path.join(OUT_DIR, `${job.out}.webp`));
  console.log(`${job.source}\n  ${job.out}.jpg  ${jpg.width}x${jpg.height}  ${Math.round(jpg.size / 1024)}KB`);
  console.log(`  ${job.out}.webp ${webp.width}x${webp.height}  ${Math.round(webp.size / 1024)}KB`);
}

async function main() {
  const sourceDir = process.argv[2];
  if (!sourceDir) {
    throw new Error('Pass the folder with the original photos as the first argument.');
  }
  await fs.mkdir(OUT_DIR, { recursive: true });
  const failures = [];
  for (const job of JOBS) {
    try {
      await runJob(sourceDir, job);
    } catch (error) {
      failures.push(job.source);
      console.error(`  FAILED ${job.source}: ${error.message}`);
    }
  }
  console.log(`\nDone. ${JOBS.length - failures.length}/${JOBS.length} photos written.`);
  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error('optimize-team-photos.js failed:', error.message);
  process.exitCode = 1;
});
