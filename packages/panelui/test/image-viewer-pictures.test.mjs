import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { useViewerPictures } from '../src/components/image-viewer/image-viewer-pictures.ts';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const fill = { position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 };
const thumbSource = { uri: 'https://example.com/thumb.jpg' };
const fullSource = { uri: 'https://example.com/full.jpg' };

async function mount(source, full) {
  let value;
  function Harness() {
    value = useViewerPictures(source, full, fill);
    return null;
  }
  await act(async () => {
    TestRenderer.create(React.createElement(Harness));
  });
  return {
    get value() {
      return value;
    },
  };
}

test('the thumb and the full picture are handed their source, kind and style', async () => {
  const { thumb, full } = (await mount(thumbSource, fullSource)).value;
  assert.deepEqual(thumb, { kind: 'thumb', source: thumbSource, style: fill });
  assert.equal(full.kind, 'full');
  assert.equal(full.source, fullSource);
  // The full picture waits, transparent, over the thumb.
  assert.deepEqual(full.style, [fill, { opacity: 0 }]);
  assert.equal(typeof full.onLoad, 'function');
});

test("the full picture's onLoad fades it in", async () => {
  const pictures = await mount(thumbSource, fullSource);
  await act(async () => pictures.value.full.onLoad());
  assert.deepEqual(pictures.value.full.style, [fill, { opacity: 1 }]);
  assert.deepEqual(pictures.value.thumb.style, fill);
});

test('without a full picture there is only the thumb', async () => {
  const pictures = await mount(thumbSource, undefined);
  assert.equal(pictures.value.full, null);
  assert.equal(pictures.value.thumb.onLoad, undefined);
});

test('left out, renderPicture draws the same React Native Image as before', async () => {
  const source = await readFile(
    new URL('../src/components/image-viewer/index.tsx', import.meta.url),
    'utf8'
  );
  assert.match(source, /renderPicture = drawPicture,/);
  assert.match(
    source,
    /<Image\s+source=\{source\}\s+resizeMode="cover"\s+accessible=\{false\}\s+onLoad=\{onLoad\}\s+style=\{style\}\s+\/>/
  );
  assert.match(
    source,
    /\{renderPicture\(pictures\.thumb\)\}\s+\{pictures\.full \? renderPicture\(pictures\.full\) : null\}/
  );
});
