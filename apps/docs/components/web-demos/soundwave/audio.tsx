'use client';

import { useState } from 'react';
import { Button } from 'panelui-web/button';
import { Soundwave, useMicrophone } from 'panelui-web/soundwave';

export default function SoundwaveAudio() {
  // An element in state rather than a ref, so the wave hears about it once it mounts.
  const [player, setPlayer] = useState<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const mic = useMicrophone();

  // Whichever is making sound now: the microphone, the file, or neither.
  const source = mic.active ? mic.stream : playing ? player : null;

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6">
      <Soundwave variant="dots" color="chart-2" height={64} source={source} state={source ? 'speaking' : 'idle'} />
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          size="sm"
          shape="pill"
          variant={playing ? 'default' : 'outline'}
          onClick={() => {
            mic.stop();
            if (playing) player?.pause();
            else void player?.play();
          }}
        >
          {playing ? 'Pause the clip' : 'Play a clip'}
        </Button>
        <Button
          size="sm"
          shape="pill"
          variant={mic.active ? 'default' : 'outline'}
          disabled={mic.status === 'requesting'}
          onClick={() => {
            player?.pause();
            mic.toggle();
          }}
        >
          {mic.active ? 'Stop listening' : 'Use the microphone'}
        </Button>
      </div>
      {mic.status === 'denied' || mic.status === 'unsupported' ? (
        <p className="text-xs text-muted-foreground">No microphone, or permission was refused.</p>
      ) : null}
      <audio
        ref={setPlayer}
        src="/audio/soundwave-sample.mp3"
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}
