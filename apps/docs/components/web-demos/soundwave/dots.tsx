'use client';

import { Soundwave } from 'panelui-web/soundwave';

export default function SoundwaveDots() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      {/* Lit out from the middle, each column its own share of the level. */}
      <Soundwave variant="dots" color="success" height={64} />
      {/* A history, newest on the right, growing up from the bottom row. */}
      <Soundwave variant="dots" mode="scrolling" centered={false} color="chart-4" barWidth={3} barGap={2} height={40} />
    </div>
  );
}
