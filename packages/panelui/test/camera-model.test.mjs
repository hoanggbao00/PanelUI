import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CAMERA_TIMERS,
  activeStop,
  clampZoom,
  flashIn,
  formatDuration,
  nextFlash,
  nextTimer,
  recordingProgress,
  stepZoom,
  stillFlash,
  torchFor,
  zoomFromPinch,
  zoomFromTrack,
} from '../src/components/camera/camera-model.ts';

test('Camera keeps zoom on the range expo-camera takes', () => {
  assert.equal(clampZoom(0.4), 0.4);
  assert.equal(clampZoom(-0.2), 0);
  assert.equal(clampZoom(1.7), 1);
  assert.equal(clampZoom(Number.NaN), 0);
  assert.equal(clampZoom(Number.POSITIVE_INFINITY), 0);
});

test('Camera adds a pinch to the zoom it started from, so pinching back returns there', () => {
  assert.equal(zoomFromPinch(0.2, 1), 0.2);
  assert.equal(zoomFromPinch(0, 2), 0.5);
  assert.ok(Math.abs(zoomFromPinch(0.3, 0.5) - 0.05) < 1e-9);
  assert.equal(zoomFromPinch(0.9, 3), 1);
  assert.equal(zoomFromPinch(0.1, 0.2), 0);
});

test('Camera reads the zoom bar left to right, from nothing to the most', () => {
  assert.equal(zoomFromTrack(0, 200), 0);
  assert.equal(zoomFromTrack(50, 200), 0.25);
  assert.equal(zoomFromTrack(260, 200), 1);
  assert.equal(zoomFromTrack(-10, 200), 0);
  assert.equal(zoomFromTrack(40, 0), 0);
});

test('Camera steps zoom for a screen reader in tenths, without drifting', () => {
  assert.equal(stepZoom(0, 1), 0.1);
  assert.equal(stepZoom(0.2, 1), 0.3);
  assert.equal(stepZoom(0.95, 1), 1);
  assert.equal(stepZoom(0.05, -1), 0);
  let zoom = 0;
  for (let i = 0; i < 7; i += 1) zoom = stepZoom(zoom, 1);
  assert.equal(zoom, 0.7);
});

test('Camera marks the zoom stop it is at, and none between them', () => {
  const stops = [{ value: 0 }, { value: 0.15 }, { value: 0.4 }];
  assert.equal(activeStop(0, stops), 0);
  assert.equal(activeStop(0.151, stops), 1);
  assert.equal(activeStop(0.3, stops), -1);
  assert.equal(activeStop(0.4, stops), 2);
  assert.equal(activeStop(0, []), -1);
});

test('Camera shows a recording clock as mm:ss, and h:mm:ss past an hour', () => {
  assert.equal(formatDuration(0), '00:00');
  assert.equal(formatDuration(999), '00:00');
  assert.equal(formatDuration(1000), '00:01');
  assert.equal(formatDuration(65_400), '01:05');
  assert.equal(formatDuration(3_599_000), '59:59');
  assert.equal(formatDuration(3_661_000), '1:01:01');
  assert.equal(formatDuration(-5), '00:00');
  assert.equal(formatDuration(Number.NaN), '00:00');
});

test('Camera cycles the flash off, auto, on for a photo, and off, on for a video', () => {
  assert.equal(nextFlash('photo', 'off'), 'auto');
  assert.equal(nextFlash('photo', 'auto'), 'on');
  assert.equal(nextFlash('photo', 'on'), 'off');
  assert.equal(nextFlash('video', 'off'), 'on');
  assert.equal(nextFlash('video', 'on'), 'off');
  // A video has no auto, so a photo's auto reads as off there and steps to on.
  assert.equal(flashIn('video', 'auto'), 'off');
  assert.equal(nextFlash('video', 'auto'), 'on');
  assert.equal(flashIn('photo', 'auto'), 'auto');
});

test('Camera lights a video with the torch, and only while it records', () => {
  assert.equal(stillFlash('photo', 'on'), 'on');
  assert.equal(stillFlash('video', 'on'), 'off');
  assert.equal(torchFor('video', 'on', true), true);
  assert.equal(torchFor('video', 'on', false), false);
  assert.equal(torchFor('video', 'off', true), false);
  assert.equal(torchFor('photo', 'on', true), false);
});

test('Camera steps the self-timer off, 3 s, 10 s and back', () => {
  assert.deepEqual(CAMERA_TIMERS, [0, 3, 10]);
  assert.equal(nextTimer(0), 3);
  assert.equal(nextTimer(3), 10);
  assert.equal(nextTimer(10), 0);
});

test('Camera fills a capped recording towards its cap, and leaves an uncapped one empty', () => {
  assert.equal(recordingProgress(7_500, 15), 0.5);
  assert.equal(recordingProgress(20_000, 15), 1);
  assert.equal(recordingProgress(-100, 15), 0);
  assert.equal(recordingProgress(7_500), 0);
  assert.equal(recordingProgress(7_500, 0), 0);
});
