/**
 * Overlays stop taking touches as soon as they start to leave (#246).
 *
 * Every overlay outlives its `open` for a moment: the sheet until its exit
 * spring settles, the image viewer until the picture flies home, and the rest
 * for as long as Reanimated keeps their `exiting` views on screen. Whatever is
 * left over has to let a tap through to the screen behind it.
 */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

const portal = await read('../src/primitives/portal.tsx');
const sheet = await read('../src/components/bottom-sheet/index.tsx');
const viewer = await read('../src/components/image-viewer/index.tsx');

test('the portal host stops a leaving entry taking touches', () => {
  assert.match(portal, /import \{ PortalStore \} from '\.\/portal-store';/);
  assert.match(portal, /pointerEvents=\{leaving \? 'none' : 'box-none'\}/);
  // The prop has to live on a real view to do anything.
  assert.match(portal, /collapsable=\{false\}/);
});

test('the sheet takes no touches while it leaves, a fling included', () => {
  assert.match(sheet, /pointerEvents=\{open && !flung \? 'auto' : 'none'\}/);
  assert.match(
    sheet,
    /DISMISS_VELOCITY\)\s*\) \{\s*runOnJS\(setFlung\)\(true\);/
  );
  assert.match(sheet, /if \(open\) \{\s*cancelAnimation\(translateY\);\s*setFlung\(false\);/);
});

test('the image viewer takes no touches once it is closing', () => {
  assert.match(viewer, /pointerEvents=\{open \? 'auto' : 'none'\}/);
});

test('a copied Portal ships the same store', async () => {
  const item = JSON.parse(await read('../../../apps/docs/public/r/portal.json'));
  const copied = item.files.map((file) => file.content).join('\n');
  assert.match(copied, /pointerEvents=\{leaving \? 'none' : 'box-none'\}/);
  const deps = JSON.stringify(item.registryDependencies ?? []);
  assert.match(deps, /portal-store/);
});
