import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');
const scrim = await read('../src/primitives/scrim.tsx');
const viewer = await read('../src/components/image-viewer/index.tsx');

test('Scrim takes the dim over its blur as a prop, faint by default, on both blur paths', () => {
  assert.match(scrim, /blurDimClassName = 'bg-black\/10'/);
  // The fading blur and the progress-driven blur both draw it; neither keeps a literal.
  assert.equal(scrim.match(/className=\{blurDimClassName\}/g)?.length, 2);
  assert.doesNotMatch(scrim, /className="[^"]*bg-black\/10/);
});

test('ImageViewer takes its backdrop dim from `dimClassName`, defaulting to today', () => {
  assert.match(viewer, /^\s+dimClassName\?: string;$/m);
  // Without blur: the caller's dim or the viewer's own `bg-black/60`.
  assert.match(viewer, /dimClassName=\{dimClassName \?\? 'bg-black\/60'\}/);
  // Over the blur: the caller's dim, or left to Scrim's faint default.
  assert.match(viewer, /blurDimClassName=\{dimClassName\}/);
});
