/**
 * A portal's content stops taking touches a frame before it is removed.
 *
 * Reported as #246: after a sheet or dialog closed, the first tap on the
 * screen behind it did nothing. Views Reanimated keeps on screen to finish an
 * exit animation keep their last props, so a full-screen backdrop went on
 * taking touches with no handler left to answer them.
 */
import assert from 'node:assert/strict';
import test from 'node:test';
import { PortalStore } from '../src/primitives/portal-store.ts';

function manualFrames() {
  const queue = new Set();
  const schedule = (callback) => {
    queue.add(callback);
    return () => queue.delete(callback);
  };
  const flush = () => {
    const due = [...queue];
    queue.clear();
    due.forEach((callback) => callback());
  };
  return { schedule, flush, size: () => queue.size };
}

test('unmount marks the entry leaving, then removes it on the next frame', () => {
  const frames = manualFrames();
  const store = new PortalStore(frames.schedule);
  let emits = 0;
  store.subscribe(() => emits++);

  store.mount('sheet', 'content');
  assert.deepEqual(store.getSnapshot().get('sheet'), { node: 'content', leaving: false });

  store.unmount('sheet');
  assert.deepEqual(store.getSnapshot().get('sheet'), { node: 'content', leaving: true });

  frames.flush();
  assert.equal(store.getSnapshot().has('sheet'), false);
  assert.equal(emits, 3);
});

test('a remount inside the leaving frame keeps the entry', () => {
  // StrictMode runs every effect cleanup and then the effect again.
  const frames = manualFrames();
  const store = new PortalStore(frames.schedule);

  store.mount('dialog', 'a');
  store.unmount('dialog');
  store.mount('dialog', 'b');
  assert.equal(frames.size(), 0);

  frames.flush();
  assert.deepEqual(store.getSnapshot().get('dialog'), { node: 'b', leaving: false });
});

test('unmounting twice, or something never mounted, does nothing more', () => {
  const frames = manualFrames();
  const store = new PortalStore(frames.schedule);
  let emits = 0;
  store.subscribe(() => emits++);

  store.unmount('nothing');
  assert.equal(emits, 0);

  store.mount('menu', 'x');
  store.unmount('menu');
  store.unmount('menu');
  assert.equal(frames.size(), 1);
  frames.flush();
  assert.equal(store.getSnapshot().size, 0);
});

test('each change is a new snapshot, so the host re-renders', () => {
  const frames = manualFrames();
  const store = new PortalStore(frames.schedule);
  const first = store.getSnapshot();
  store.mount('k', 1);
  const mounted = store.getSnapshot();
  store.unmount('k');
  assert.notEqual(first, mounted);
  assert.notEqual(mounted, store.getSnapshot());
});
