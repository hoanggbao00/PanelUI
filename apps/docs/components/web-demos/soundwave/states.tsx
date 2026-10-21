'use client';

import { useState } from 'react';
import { Button } from 'panelui-web/button';
import { Soundwave, useMicrophone, type MicrophoneControls, type SoundwaveState } from 'panelui-web/soundwave';
import { Tabs } from 'panelui-web/tabs';

function MicIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  );
}

function MicButton({ mic }: { mic: MicrophoneControls }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        variant={mic.active ? 'default' : 'outline'}
        size="sm"
        shape="pill"
        aria-pressed={mic.active}
        disabled={mic.status === 'requesting'}
        onClick={mic.toggle}
      >
        <MicIcon />
        {mic.active ? 'Stop listening' : 'Try it with your voice'}
      </Button>
      {mic.status === 'denied' || mic.status === 'unsupported' ? (
        <p className="text-xs text-muted-foreground">No microphone, or permission was refused.</p>
      ) : null}
    </div>
  );
}

const STATES: SoundwaveState[] = ['idle', 'listening', 'thinking', 'speaking'];

export default function SoundwaveStates() {
  const [state, setState] = useState<SoundwaveState>('listening');
  const mic = useMicrophone();
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6">
      {/* A live source replaces the motion; the state still sets what is announced. */}
      <Soundwave variant="pills" state={state} height={96} source={mic.stream} />
      <Tabs value={state} onValueChange={(value) => setState(value as SoundwaveState)}>
        <Tabs.List aria-label="State">
          {STATES.map((value) => (
            <Tabs.Trigger key={value} value={value} className="capitalize">
              {value}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs>
      <MicButton mic={mic} />
    </div>
  );
}
