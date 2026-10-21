'use client';

import { Soundwave } from 'panelui-web/soundwave';

export default function SoundwaveLine() {
  return <Soundwave variant="line" state="speaking" height={96} color="primary" className="max-w-md" />;
}
