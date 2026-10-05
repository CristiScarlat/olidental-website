#!/usr/bin/env node
/**
 * Generates the images other sites show when olidental.ro is shared or
 * indexed:
 *
 * 1. public/images/logo-olidental-clinic.jpg, rebuilt from the transparent
 *    WebP logo on a white background. (The previous JPEG had been converted
 *    from a transparent PNG and its transparent areas had turned into solid
 *    colour blocks.) Used by the Dentist structured data.
 * 2. public/images/og/olidental-clinic-1200x630.jpg, the default social-share
 *    image (og:image) for every page that doesn't pass its own: the
 *    reception photo cropped to 1200×630, the size Facebook, WhatsApp and
 *    LinkedIn expect, with the logo on a white panel. The logo exists only
 *    as a 345×100 raster, so it is placed at its native size to stay sharp.
 *
 * Usage: node scripts/generate-share-images.js
 */
const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const LOGO_WEBP = path.join(IMAGES_DIR, 'logo-olidental-clinic.webp');
const LOGO_JPEG = path.join(IMAGES_DIR, 'logo-olidental-clinic.jpg');
const PHOTO = path.join(IMAGES_DIR, 'carouselHome', 'thumbnail_20.jpg');
const OG_IMAGE = path.join(IMAGES_DIR, 'og', 'olidental-clinic-1200x630.jpg');

const WHITE = '#ffffff';
const OG_SIZE = { width: 1200, height: 630 };
const PANEL = { left: 48, top: 408, width: 440, height: 150, radius: 22, shadow: 18 };
const JPEG_QUALITY = 88;

function panelSvg() {
  const { width, height, radius, shadow } = PANEL;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width + shadow * 2}" height="${height + shadow * 2}">
      <defs><filter id="s" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${shadow / 2}"/></filter></defs>
      <rect x="${shadow}" y="${shadow + 4}" width="${width}" height="${height}" rx="${radius}" fill="#1f2a24" opacity="0.28" filter="url(#s)"/>
      <rect x="${shadow}" y="${shadow}" width="${width}" height="${height}" rx="${radius}" fill="${WHITE}"/>
    </svg>`
  );
}

function logRelative(file, info) {
  console.log(`${path.relative(IMAGES_DIR, file)}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}

async function writeLogoJpeg() {
  const info = await sharp(LOGO_WEBP)
    .flatten({ background: WHITE })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(LOGO_JPEG);
  logRelative(LOGO_JPEG, info);
}

async function writeOgImage() {
  const logo = await sharp(LOGO_WEBP).png().toBuffer({ resolveWithObject: true });
  const logoLeft = PANEL.left + Math.round((PANEL.width - logo.info.width) / 2);
  const logoTop = PANEL.top + Math.round((PANEL.height - logo.info.height) / 2);

  await fs.mkdir(path.dirname(OG_IMAGE), { recursive: true });
  const info = await sharp(PHOTO)
    .resize({ ...OG_SIZE, fit: 'cover', position: 'centre' })
    .composite([
      { input: panelSvg(), left: PANEL.left - PANEL.shadow, top: PANEL.top - PANEL.shadow },
      { input: logo.data, left: logoLeft, top: logoTop },
    ])
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(OG_IMAGE);
  logRelative(OG_IMAGE, info);
}

async function main() {
  await writeLogoJpeg();
  await writeOgImage();
}

main().catch((error) => {
  console.error('generate-share-images.js failed:', error);
  process.exitCode = 1;
});
