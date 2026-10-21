'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { Avatar } from 'panelui-web/avatar';
import { Soundwave } from 'panelui-web/soundwave';

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
  // Two side by side still fit on a phone, at a smaller diameter.
  const wide = useSyncExternalStore(subscribe, () => window.matchMedia(WIDE).matches, () => true);

  useEffect(() => {
    const timer = window.setTimeout(() => setTurn((value) => value + 1), TURNS[turn % TURNS.length]! * 1000);
    return () => window.clearTimeout(timer);
  }, [turn]);

  return (
    <div className="flex items-start justify-center gap-4 sm:gap-10">
      {PEOPLE.map((person, index) => {
        const speaking = turn % 2 === index;
        return (
          <div key={person.name} className="flex flex-col items-center gap-3">
            <Soundwave
              variant="radial"
              state={speaking ? 'speaking' : 'idle'}
              color={person.color}
              height={wide ? 168 : 128}
              label={`${person.name}, ${speaking ? 'speaking' : 'listening'}`}
            >
              <Soundwave.Center>
                <Avatar name={person.name} src={'src' in person ? person.src : undefined} color={person.color} size={wide ? 'xl' : 'lg'} />
              </Soundwave.Center>
            </Soundwave>
            <p className="flex flex-col items-center text-sm font-medium">
              {person.name}
              <span className="font-normal text-muted-foreground">{speaking ? 'Speaking' : 'Listening'}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
