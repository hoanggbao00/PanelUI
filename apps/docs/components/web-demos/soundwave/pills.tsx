'use client';

import { Soundwave } from 'panelui-web/soundwave';

export default function SoundwavePills() {
  return <Soundwave variant="pills" state="listening" height={112} barWidth={30} barGap={12} />;
}
