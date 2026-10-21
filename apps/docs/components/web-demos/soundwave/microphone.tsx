'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from 'panelui-web/button';
import { Soundwave } from 'panelui-web/soundwave';

type Status = 'off' | 'asking' | 'on' | 'refused';

export default function SoundwaveMicrophone() {
  const level = useRef(0);
  const [status, setStatus] = useState<Status>('off');
  const stopRef = useRef<() => void>(() => {});

  useEffect(() => () => stopRef.current(), []);

  async function start() {
    setStatus('asking');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const context = new AudioContext();
      const analyser = context.createAnalyser();
      analyser.fftSize = 512;
      context.createMediaStreamSource(stream).connect(analyser);
      const samples = new Float32Array(analyser.fftSize);
      let frame = 0;
      const read = () => {
        analyser.getFloatTimeDomainData(samples);
        let sum = 0;
        for (const sample of samples) sum += sample * sample;
        // Loudness in dBFS is negative and logarithmic; the wave wants 0 to 1.
        const db = 20 * Math.log10(Math.sqrt(sum / samples.length) || 1e-8);
        level.current = Math.max(0, Math.min(1, (db + 60) / 50));
        frame = requestAnimationFrame(read);
      };
      read();
      stopRef.current = () => {
        cancelAnimationFrame(frame);
        stream.getTracks().forEach((track) => track.stop());
        void context.close();
        level.current = 0;
      };
      setStatus('on');
    } catch {
      setStatus('refused');
    }
  }

  function stop() {
    stopRef.current();
    stopRef.current = () => {};
    setStatus('off');
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* With no level the wave runs its own motion, so it is never blank. */}
      <Soundwave
        variant="pills"
        level={status === 'on' ? level : undefined}
        state={status === 'on' ? 'listening' : 'idle'}
        sensitivity={1.4}
        height={96}
      />
      <Button variant={status === 'on' ? 'outline' : 'default'} onClick={status === 'on' ? stop : start} disabled={status === 'asking'}>
        {status === 'on' ? 'Stop' : 'Use my microphone'}
      </Button>
      <p aria-live="polite" className="text-xs text-muted-foreground">
        {status === 'refused'
          ? 'No microphone, or permission was refused.'
          : status === 'on'
            ? 'Nothing is recorded or sent anywhere.'
            : 'The level is read in this page and goes nowhere.'}
      </p>
    </div>
  );
}
