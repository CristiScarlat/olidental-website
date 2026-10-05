#!/usr/bin/env node
/**
 * One-time script: optimize the homepage hero carousel images.
 *
 * SCOPE: public/images/carouselHome/ ONLY. This path is intentionally
 * hardcoded — public/images/ as a whole is ~115MB and must never be
 * processed recursively by this script.
 *
 * For every raster image in the source directory, generates a resized,
 * compressed .webp copy alongside the original (same base name, .webp
 * extension). Originals are left in place on purpose: final cleanup of
 * the unused JPEG/PNG originals should only happen after the new .webp
 * files have been confirmed to render correctly on the site.
 *
 * Usage: node scripts/optimize-carousel-images.js
 */
const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = path.join(__dirname, '..', 'public', 'images', 'carouselHome');
// Carousel is displayed at ~412 CSS px on mobile but can render larger as a
// hero element on desktop; 900px covers that plus retina headroom without
// over-shrinking.
const MAX_WIDTH = 900;
const WEBP_QUALITY = 82;
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

async function assertSourceDirIsValid(dir) {
  const expectedSuffix = path.join('public', 'images', 'carouselHome');
  if (!dir.endsWith(expectedSuffix)) {
    throw new Error(`Refusing to run: source dir "${dir}" is not carouselHome.`);
  }

  const stats = await fs.stat(dir).catch(() => null);
  if (!stats || !stats.isDirectory()) {
    throw new Error(`Expected directory not found: ${dir}`);
  }
}

async function listImageFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => ALLOWED_EXTENSIONS.has(path.extname(name).toLowerCase()));
}

async function convertToWebp(dir, fileName) {
  const inputPath = path.join(dir, fileName);
  const outputName = `${path.parse(fileName).name}.webp`;
  const outputPath = path.join(dir, outputName);

  const originalStats = await fs.stat(inputPath);

  await sharp(inputPath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outputPath);

  const newStats = await fs.stat(outputPath);

  return {
    fileName,
    outputName,
    originalBytes: originalStats.size,
    newBytes: newStats.size,
  };
}

function logConversion(result) {
  const savedPct = (100 * (1 - result.newBytes / result.originalBytes)).toFixed(1);
  const originalKb = (result.originalBytes / 1024).toFixed(0);
  const newKb = (result.newBytes / 1024).toFixed(0);
  console.log(
    `  ${result.fileName} (${originalKb}KB) -> ${result.outputName} (${newKb}KB, -${savedPct}%)`
  );
}

async function main() {
  await assertSourceDirIsValid(SOURCE_DIR);

  const files = await listImageFiles(SOURCE_DIR);
  if (files.length === 0) {
    console.warn(`No image files found in ${SOURCE_DIR}; nothing to do.`);
    return;
  }

  console.log(
    `Optimizing ${files.length} image(s) in ${SOURCE_DIR} -> webp (max width ${MAX_WIDTH}px, quality ${WEBP_QUALITY})`
  );

  const results = [];
  const failures = [];
  for (const fileName of files) {
    try {
      const result = await convertToWebp(SOURCE_DIR, fileName);
      results.push(result);
      logConversion(result);
    } catch (error) {
      failures.push({ fileName, error });
      console.error(`  FAILED to convert ${fileName}:`, error.message);
    }
  }

  const totalOriginal = results.reduce((sum, r) => sum + r.originalBytes, 0);
  const totalNew = results.reduce((sum, r) => sum + r.newBytes, 0);

  console.log(`\nDone. ${results.length}/${files.length} converted, ${failures.length} failed.`);
  console.log(
    `Total original: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB, total webp: ${(totalNew / 1024 / 1024).toFixed(2)}MB`
  );

  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error('optimize-carousel-images.js failed:', error);
  process.exitCode = 1;
});
