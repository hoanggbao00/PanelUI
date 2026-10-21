'use client';

import { Button } from 'panelui-web/button';
import { Soundwave, useMicrophone, type MicrophoneControls } from 'panelui-web/soundwave';
import { Stat } from 'panelui-web/stat';

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

/** Minutes of voice input in each hour of one day, from midnight, scaled 0–1 against the busiest hour. */
const DAY = [
  0.04, 0.02, 0.02, 0.03, 0.05, 0.12, 0.3, 0.55, 0.82, 0.9, 0.74, 0.62, 0.48, 0.58, 0.7, 0.66, 0.6, 1, 0.86,
  0.64, 0.42, 0.3, 0.16, 0.08,
];

export default function SoundwaveRing() {
  const mic = useMicrophone();
  return (
    <div className="flex flex-col items-center gap-5">
      {/* The day's shape, held still, until the microphone takes over. */}
      <Soundwave
        variant="ring"
        levels={mic.active ? undefined : DAY}
        source={mic.stream}
        color="chart-1"
        label={mic.active ? 'Your voice, live' : 'Voice input by hour, busiest at 5 pm'}
      >
        <Soundwave.Center>
          <Stat>
            <Stat.Content className="items-center">
              {mic.active ? (
                <Stat.Value size="sm">Live</Stat.Value>
              ) : (
                <Stat.Value size="sm">
                  3<Stat.Unit>h</Stat.Unit> 40<Stat.Unit>m</Stat.Unit>
                </Stat.Value>
              )}
              <Stat.Label>{mic.active ? 'your voice' : 'spoken today'}</Stat.Label>
            </Stat.Content>
          </Stat>
        </Soundwave.Center>
      </Soundwave>
      <MicButton mic={mic} />
    </div>
  );
}
