'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from 'panelui-web/button';
import { Soundwave, useMicrophone } from 'panelui-web/soundwave';

/** The stored shape of a 14-second note: forty numbers kept beside the file. */
const SAMPLE = [
  0.12, 0.3, 0.52, 0.7, 0.46, 0.28, 0.62, 0.86, 0.94, 0.72, 0.4, 0.22, 0.34, 0.58, 0.8, 0.66, 0.38, 0.18,
  0.1, 0.26, 0.48, 0.74, 0.9, 1, 0.82, 0.56, 0.32, 0.44, 0.68, 0.6, 0.36, 0.2, 0.42, 0.64, 0.5, 0.3, 0.16,
  0.24, 0.14, 0.08,
];
const BARS = 40;
const LONGEST = 30;

interface Note {
  levels: number[];
  seconds: number;
  /** The recording itself, once there is one. The sample note has no audio. */
  url?: string;
}

function Icon({ name }: { name: 'play' | 'pause' | 'mic' | 'stop' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      {name === 'play' ? <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /> : null}
      {name === 'pause' ? (
        <>
          <rect x="6" y="5" width="4" height="14" rx="1.25" />
          <rect x="14" y="5" width="4" height="14" rx="1.25" />
        </>
      ) : null}
      {name === 'stop' ? <rect x="6" y="6" width="12" height="12" rx="2.5" /> : null}
      {name === 'mic' ? (
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
        </g>
      ) : null}
    </svg>
  );
}

/** A recording's loudness, squeezed to `count` numbers: the peak of each slice. */
function shape(samples: number[], count: number) {
  if (!samples.length) return SAMPLE;
  return Array.from({ length: count }, (_, i) => {
    const from = Math.floor((i / count) * samples.length);
    const to = Math.max(from + 1, Math.floor(((i + 1) / count) * samples.length));
    return Math.max(...samples.slice(from, to));
  });
}

const clock = (seconds: number) => `0:${String(Math.floor(seconds)).padStart(2, '0')}`;

export default function SoundwaveVoiceNote() {
  const mic = useMicrophone();
  const [note, setNote] = useState<Note>({ levels: SAMPLE, seconds: 14 });
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const audio = useRef<HTMLAudioElement>(null);
  const recorder = useRef<MediaRecorder | null>(null);

  // While recording: sample the level a few times a second, and keep the audio.
  useEffect(() => {
    if (!recording || !mic.stream) return;
    const samples: number[] = [];
    const chunks: Blob[] = [];
    const started = performance.now();
    const media = typeof MediaRecorder === 'undefined' ? null : new MediaRecorder(mic.stream);
    recorder.current = media;
    media?.addEventListener('dataavailable', (event) => chunks.push(event.data));
    media?.start();
    const timer = window.setInterval(() => {
      samples.push(mic.level.current);
      const seconds = (performance.now() - started) / 1000;
      setElapsed(seconds);
      if (seconds >= LONGEST) setRecording(false);
    }, 100);
    return () => {
      window.clearInterval(timer);
      const seconds = (performance.now() - started) / 1000;
      const finish = () => {
        const url = chunks.length ? URL.createObjectURL(new Blob(chunks, { type: media?.mimeType })) : undefined;
        setNote((previous) => {
          if (previous.url) URL.revokeObjectURL(previous.url);
          return { levels: shape(samples, BARS), seconds, url };
        });
        mic.stop();
      };
      if (media && media.state !== 'inactive') {
        media.addEventListener('stop', finish, { once: true });
        media.stop();
      } else finish();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recording, mic.stream]);

  // Stands in for a real file's `currentTime` when the note has no audio.
  useEffect(() => {
    if (!playing || note.url) return;
    const started = performance.now() - position * note.seconds * 1000;
    const timer = window.setInterval(() => {
      const at = (performance.now() - started) / 1000 / note.seconds;
      if (at >= 1) {
        setPlaying(false);
        setPosition(0);
      } else setPosition(at);
    }, 50);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, note]);

  async function record() {
    audio.current?.pause();
    setPlaying(false);
    setPosition(0);
    setElapsed(0);
    await mic.start();
    setRecording(true);
  }

  function play() {
    const element = audio.current;
    if (note.url && element) {
      if (playing) element.pause();
      else void element.play();
      return;
    }
    setPlaying((value) => !value);
  }

  const time = recording ? elapsed : playing || position ? position * note.seconds : note.seconds;
  return (
    <div className="flex w-full max-w-sm items-center gap-3">
      {recording ? (
        <>
          <Button size="icon" shape="pill" variant="destructive" aria-label="Stop recording" onClick={() => setRecording(false)}>
            <Icon name="stop" />
          </Button>
          <Soundwave
            variant="bars"
            mode="scrolling"
            source={mic.stream}
            bars={BARS}
            barWidth={2.5}
            height={32}
            label="Recording"
            className="flex-1"
          />
        </>
      ) : (
        <>
          <Button size="icon" shape="pill" aria-label={playing ? 'Pause' : 'Play voice note'} onClick={play}>
            <Icon name={playing ? 'pause' : 'play'} />
          </Button>
          <Soundwave
            variant="bars"
            levels={note.levels}
            progress={position}
            bars={BARS}
            barWidth={2.5}
            height={32}
            label={`Voice note, ${Math.round(note.seconds)} seconds`}
            className="flex-1"
          />
        </>
      )}
      <span className="w-8 text-xs text-muted-foreground tabular-nums">{clock(time)}</span>
      {recording ? null : (
        <Button
          size="icon"
          shape="pill"
          variant="outline"
          aria-label="Record a new note"
          disabled={mic.status === 'requesting'}
          onClick={record}
        >
          <Icon name="mic" />
        </Button>
      )}
      {note.url ? (
        <audio
          ref={audio}
          src={note.url}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setPlaying(false);
            setPosition(0);
          }}
          onTimeUpdate={(event) => {
            const element = event.currentTarget;
            // A recorded file often reports no duration; the timer knows it.
            const length = Number.isFinite(element.duration) ? element.duration : note.seconds;
            setPosition(Math.min(1, element.currentTime / length));
          }}
        />
      ) : null}
    </div>
  );
}
