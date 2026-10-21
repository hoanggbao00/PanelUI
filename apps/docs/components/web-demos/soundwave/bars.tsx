'use client';

import { Soundwave } from 'panelui-web/soundwave';

export default function SoundwaveBars() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      {/* Every bar takes a share of the level now. */}
      <Soundwave variant="bars" mode="static" height={56} />
      {/* A history that slides left, newest at the right edge. */}
      <Soundwave variant="bars" mode="scrolling" centered={false} bars={48} barWidth={3} height={40} fadeEdges />
    </div>
  );
}
