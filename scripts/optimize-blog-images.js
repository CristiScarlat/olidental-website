#!/usr/bin/env node
/**
 * Generates the resized images used by blog articles.
 *
 * Each job reads ONE existing high-resolution photo from public/images/
 * and writes web-sized copies into public/images/blog/<slug>/:
 *   - <name>-<width>.webp for every width in `widths` (for <img srcSet>)
 *   - og-1200x630.jpg when `og` is true (social-share preview, the size
 *     Facebook/WhatsApp/LinkedIn expect; JPEG for widest compatibility)
 *
 * Originals are never modified. Add a job here when a new article needs
 * images, then re-run the script.
 *
 * Usage: node scripts/optimize-blog-images.js
 */
const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const WEBP_QUALITY = 80;
const OG_SIZE = { width: 1200, height: 630 };
const OG_JPEG_QUALITY = 82;

const JOBS = [
  {
    source: 'carouselHome/thumbnail_20.jpg',
    outDir: 'blog/povestea-olidental-clinic',
    name: 'receptie',
    widths: [1600, 1200, 800],
    og: true,
  },
  {
    source: 'carouselHome/thumbnail_1.JPG',
    outDir: 'blog/povestea-olidental-clinic',
    name: 'echipa',
    widths: [1200, 800],
    og: false,
  },
  {
    source: 'carouselHome/thumbnail_10.jpg',
    outDir: 'blog/de-ce-sa-alegi-olidental-clinic',
    name: 'analiza-zambet',
    widths: [1600, 1200, 800],
    og: true,
  },
  {
    source: 'carouselHome/thumbnail_19.jpg',
    outDir: 'blog/de-ce-sa-alegi-olidental-clinic',
    name: 'radiologie',
    widths: [1200, 800],
    og: false,
  },
  {
    source: 'carouselHome/thumbnail_12.jpg',
    outDir: 'blog/de-ce-sa-alegi-olidental-clinic',
    name: 'microscop',
    widths: [1200, 800],
    og: false,
  },
];

async function assertFileExists(filePath) {
  const stats = await fs.stat(filePath).catch(() => null);
  if (!stats || !stats.isFile()) {
    throw new Error(`Source image not found: ${filePath}`);
  }
}

async function writeWebp(inputPath, outputPath, width) {
  const info = await sharp(inputPath)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outputPath);
  return info;
}

async function writeOgImage(inputPath, outputPath) {
  const info = await sharp(inputPath)
    .rotate()
    .resize({ ...OG_SIZE, fit: 'cover', position: 'centre' })
    .jpeg({ quality: OG_JPEG_QUALITY, mozjpeg: true })
    .toFile(outputPath);
  return info;
}

function logOutput(outputPath, info) {
  const relative = path.relative(IMAGES_DIR, outputPath);
  const kb = (info.size / 1024).toFixed(0);
  console.log(`  ${relative}  ${info.width}x${info.height}  ${kb}KB`);
}

async function runJob(job) {
  const inputPath = path.join(IMAGES_DIR, job.source);
  const outDir = path.join(IMAGES_DIR, job.outDir);
  await assertFileExists(inputPath);
  await fs.mkdir(outDir, { recursive: true });

  console.log(`${job.source}:`);
  for (const width of job.widths) {
    const outputPath = path.join(outDir, `${job.name}-${width}.webp`);
    logOutput(outputPath, await writeWebp(inputPath, outputPath, width));
  }

  if (job.og) {
    const outputPath = path.join(outDir, `og-${OG_SIZE.width}x${OG_SIZE.height}.jpg`);
    logOutput(outputPath, await writeOgImage(inputPath, outputPath));
  }
}

async function main() {
  const failures = [];
  for (const job of JOBS) {
    try {
      await runJob(job);
    } catch (error) {
      failures.push(job.source);
      console.error(`  FAILED ${job.source}: ${error.message}`);
    }
  }

  console.log(`\nDone. ${JOBS.length - failures.length}/${JOBS.length} jobs succeeded.`);
  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error('optimize-blog-images.js failed:', error);
  process.exitCode = 1;
});
