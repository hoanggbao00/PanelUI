'use client';

import { Avatar } from 'panelui-web/avatar';
import { Soundwave } from 'panelui-web/soundwave';

export default function SoundwaveRadial() {
  return (
    <Soundwave variant="radial" state="speaking" color="chart-2" label="Khalid Abdi, speaking">
      <Soundwave.Center>
        <Avatar name="Khalid Abdi" src="https://avatars.githubusercontent.com/u/127331761?v=4" size="xl" />
      </Soundwave.Center>
    </Soundwave>
  );
}
