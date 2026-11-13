import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

// utils/uiConstants.js is a large module with extensionless imports, so the
// team data is read as text; commented-out members (former staff) are dropped.
const activeTeamSource = () => {
  const source = read('utils/uiConstants.js');
  const start = source.indexOf('export const teamCards');
  const end = source.indexOf('\n];', start);
  return source
    .slice(start, end)
    .split('\n')
    .filter((line) => !/^\s*\/\//.test(line))
    .join('\n');
};

test('every team photo exists as a JPEG and as its WebP twin, in the 2:3 size the pages expect', async () => {
  const sharp = (await import('sharp')).default;
  const photos = [...activeTeamSource().matchAll(/thumbnail: '([^']+)'/g)].map((m) => m[1]);
  assert.ok(photos.length >= 8, `found only ${photos.length} team photos`);
  for (const photo of photos) {
    const jpg = path.join(ROOT, 'public', photo);
    const webp = jpg.replace(/\.jpe?g$/i, '.webp');
    assert.ok(fs.existsSync(jpg), `missing ${photo}`);
    assert.ok(fs.existsSync(webp), `missing the WebP twin of ${photo}`);
    if (photo.endsWith('-2026.jpg')) {
      const { width, height } = await sharp(webp).metadata();
      assert.deepEqual([width, height], [833, 1250], photo);
    }
  }
});

test('the experience stated on a doctor\'s own page matches the bio on /echipa', () => {
  const team = activeTeamSource();
  const profiles = read('utils/doctorProfiles.js');
  assert.match(team, /În cei 20 de ani de experiență de practică stomatologică, Dr\. Paula/);
  assert.match(profiles, /cu 20 de ani de experiență în stomatologie/);
  assert.match(profiles, /value: '20 de ani'/);
  assert.match(team, /Medic dentist cu experiență de peste 23 de ani/);
  assert.match(profiles, /Medic dentist cu peste 23 de ani de experiență/);
  assert.match(profiles, /value: '23\+ ani'/);
  for (const stale of ['17 ani', '20+ ani', 'peste 20 de ani', 'peste 20 ani']) {
    assert.ok(!profiles.includes(stale), `doctorProfiles.js still says "${stale}"`);
  }
});

test('the three assistants got the three extra years the clinic asked for', () => {
  const team = activeTeamSource();
  assert.match(team, /Adela[\s\S]*?experiență de peste 10 ani/);
  assert.match(team, /Andreea[\s\S]*?experiență de peste 8 ani/);
  assert.match(team, /Bianca[\s\S]*?experiență de 15 ani/);
});

test('professional titles stay the ones confirmed in the CMSR register (no "primar" without a certificate)', () => {
  const team = activeTeamSource();
  assert.ok(!/primar/i.test(team), 'a "primar" grade was added to the team data');
});
