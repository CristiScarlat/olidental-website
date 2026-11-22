// The MedAtlas claim flow checks ownership through a <meta> tag in the site's
// <head>; this keeps the tag in the document head and the /echipa sitemap date
// current after the team page changed.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

test('_document.js carries the MedAtlas verification meta tag in <Head>', () => {
  const source = readFileSync(join(root, 'pages', '_document.js'), 'utf8');
  const head = source.match(/<Head>([\s\S]*?)<\/Head>/);
  assert.ok(head, '<Head> block not found');
  assert.match(head[1], /<meta name="medatlas-site-verification" content="[\w-]{20,}" \/>/);
});

test('/echipa lastmod reflects the 22 November 2026 team change', () => {
  const source = readFileSync(join(root, 'utils', 'pageDates.js'), 'utf8');
  assert.match(source, /'\/echipa':\s*'2026-11-22'/);
});
