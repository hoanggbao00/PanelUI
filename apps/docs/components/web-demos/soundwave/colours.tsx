'use client';

import { Soundwave } from 'panelui-web/soundwave';

const NOTE = [0.2, 0.45, 0.7, 0.5, 0.3, 0.65, 0.9, 0.75, 0.4, 0.25, 0.55, 0.8, 1, 0.7, 0.45, 0.3, 0.5, 0.35, 0.2, 0.15];

export default function SoundwaveColours() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      {/* Unset: the text colour of whatever it sits in. */}
      <Soundwave variant="bars" height={40} />
      <Soundwave variant="bars" height={40} color="info" />
      <Soundwave variant="dots" height={40} color="warning" />
      {/* A recording two-thirds played, with its own colour for the rest. */}
      <Soundwave variant="bars" height={32} bars={48} levels={NOTE} progress={0.66} color="success" trackColor="chart-3" />
      {/* Across the wave, left to right. */}
      <Soundwave variant="line" height={56} gradient={['chart-2', 'info', 'chart-4']} />
    </div>
  );
}
