'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from 'panelui-web/button';
import { Soundwave } from 'panelui-web/soundwave';

/** The stored shape of a 14-second note: forty numbers kept beside the file. */
const NOTE = [
  0.12, 0.3, 0.52, 0.7, 0.46, 0.28, 0.62, 0.86, 0.94, 0.72, 0.4, 0.22, 0.34, 0.58, 0.8, 0.66, 0.38, 0.18,
  0.1, 0.26, 0.48, 0.74, 0.9, 1, 0.82, 0.56, 0.32, 0.44, 0.68, 0.6, 0.36, 0.2, 0.42, 0.64, 0.5, 0.3, 0.16,
  0.24, 0.14, 0.08,
];
const LENGTH = 14;

function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="5" width="4" height="14" rx="1.25" />
      <rect x="14" y="5" width="4" height="14" rx="1.25" />
    </svg>
  );
}

export default function SoundwaveVoiceNote() {
  const [playing, setPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const started = useRef(0);

  // Stands in for an audio element's `currentTime`.
  useEffect(() => {
    if (!playing) return;
    started.current = performance.now() - seconds * 1000;
    const timer = window.setInterval(() => {
      const elapsed = (performance.now() - started.current) / 1000;
      if (elapsed >= LENGTH) {
        setPlaying(false);
        setSeconds(0);
      } else setSeconds(elapsed);
    }, 50);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const shown = Math.floor(playing || seconds ? seconds : LENGTH);
  return (
    <div className="flex w-full max-w-xs items-center gap-3">
      <Button
        size="icon"
        shape="pill"
        aria-label={playing ? 'Pause' : 'Play voice note'}
        onClick={() => setPlaying((value) => !value)}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </Button>
      <Soundwave
        variant="bars"
        levels={NOTE}
        progress={seconds / LENGTH}
        bars={40}
        barWidth={2.5}
        height={32}
        label="Voice note, 14 seconds"
        className="flex-1"
      />
      <span className="w-8 text-xs text-muted-foreground tabular-nums">0:{String(shown).padStart(2, '0')}</span>
    </div>
  );
}
