'use client';

import { useState } from 'react';
import { Soundwave, type SoundwaveState } from 'panelui-web/soundwave';
import { Tabs } from 'panelui-web/tabs';

const STATES: SoundwaveState[] = ['idle', 'listening', 'thinking', 'speaking'];

export default function SoundwaveStates() {
  const [state, setState] = useState<SoundwaveState>('listening');
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-8">
      <Soundwave variant="pills" state={state} height={96} />
      <Tabs value={state} onValueChange={(value) => setState(value as SoundwaveState)}>
        <Tabs.List aria-label="State">
          {STATES.map((value) => (
            <Tabs.Trigger key={value} value={value} className="capitalize">
              {value}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs>
    </div>
  );
}
