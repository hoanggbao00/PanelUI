'use client';

import { Button } from 'panelui-web/button';
import { Soundwave, useMicrophone, type MicrophoneControls } from 'panelui-web/soundwave';

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

const NOTE = [0.2, 0.45, 0.7, 0.5, 0.3, 0.65, 0.9, 0.75, 0.4, 0.25, 0.55, 0.8, 1, 0.7, 0.45, 0.3, 0.5, 0.35, 0.2, 0.15];

export default function SoundwaveColours() {
  const mic = useMicrophone();
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6">
      {/* Unset: the text colour of whatever it sits in. */}
      <Soundwave variant="bars" height={40} source={mic.stream} />
      <Soundwave variant="bars" height={40} color="info" source={mic.stream} />
      <Soundwave variant="dots" height={40} color="warning" source={mic.stream} />
      {/* A recording two-thirds played, with its own colour for the rest. */}
      <Soundwave variant="bars" height={32} bars={48} levels={NOTE} progress={0.66} color="success" trackColor="chart-3" />
      {/* Across the wave, left to right. */}
      <Soundwave variant="line" height={56} gradient={['chart-2', 'info', 'chart-4']} source={mic.stream} />
      <MicButton mic={mic} />
    </div>
  );
}
