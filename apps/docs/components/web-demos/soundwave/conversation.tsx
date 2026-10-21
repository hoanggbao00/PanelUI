'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { Avatar } from 'panelui-web/avatar';
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
        {mic.active ? 'Leave the call' : 'Speak as Khalid'}
      </Button>
      {mic.status === 'denied' || mic.status === 'unsupported' ? (
        <p className="text-xs text-muted-foreground">No microphone, or permission was refused.</p>
      ) : null}
    </div>
  );
}

const PEOPLE = [
  { name: 'Khalid Abdi', src: 'https://avatars.githubusercontent.com/u/127331761?v=4', color: 'chart-2' },
  { name: 'Rhea Lindqvist', color: 'chart-4' },
] as const;

/** How long each turn lasts, in seconds: people do not take turns on a beat. */
const TURNS = [4.2, 3.1, 5.4, 2.6, 3.8, 4.6];

const WIDE = '(min-width: 480px)';
const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(WIDE);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};

export default function SoundwaveConversation() {
  const [turn, setTurn] = useState(0);
  const mic = useMicrophone();
  // Two side by side still fit on a phone, at a smaller diameter.
  const wide = useSyncExternalStore(subscribe, () => window.matchMedia(WIDE).matches, () => true);

  // Turns pass on their own until you join; then your own voice drives Khalid's wave.
  useEffect(() => {
    if (mic.active) return;
    const timer = window.setTimeout(() => setTurn((value) => value + 1), TURNS[turn % TURNS.length]! * 1000);
    return () => window.clearTimeout(timer);
  }, [turn, mic.active]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-start justify-center gap-4 sm:gap-10">
        {PEOPLE.map((person, index) => {
          const live = mic.active && index === 0;
          const speaking = mic.active ? live : turn % 2 === index;
          return (
            <div key={person.name} className="flex flex-col items-center gap-3">
              <Soundwave
                variant="radial"
                state={speaking ? 'speaking' : 'idle'}
                source={live ? mic.stream : null}
                color={person.color}
                height={wide ? 168 : 128}
                label={`${person.name}, ${speaking ? 'speaking' : 'listening'}`}
              >
                <Soundwave.Center>
                  <Avatar
                    name={person.name}
                    src={'src' in person ? person.src : undefined}
                    color={person.color}
                    size={wide ? 'xl' : 'lg'}
                  />
                </Soundwave.Center>
              </Soundwave>
              <p className="flex flex-col items-center text-sm font-medium">
                {person.name}
                <span className="font-normal text-muted-foreground">
                  {live ? 'You' : speaking ? 'Speaking' : 'Listening'}
                </span>
              </p>
            </div>
          );
        })}
      </div>
      <MicButton mic={mic} />
    </div>
  );
}
