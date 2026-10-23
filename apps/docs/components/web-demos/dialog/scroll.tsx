'use client';

import { CheckIcon } from 'lucide-react';
import { Button } from 'panelui-web/button';
import { Dialog } from 'panelui-web/dialog';
import { Frame } from 'panelui-web/frame';
import { Input } from 'panelui-web/input';
import { useState } from 'react';

const ZONES = [
  ['Pacific/Honolulu', 'UTC−10'], ['America/Anchorage', 'UTC−9'], ['America/Los_Angeles', 'UTC−8'],
  ['America/Denver', 'UTC−7'], ['America/Mexico_City', 'UTC−6'], ['America/Chicago', 'UTC−6'],
  ['America/New_York', 'UTC−5'], ['America/Toronto', 'UTC−5'], ['America/Bogota', 'UTC−5'],
  ['America/Halifax', 'UTC−4'], ['America/Sao_Paulo', 'UTC−3'], ['America/Buenos_Aires', 'UTC−3'],
  ['Atlantic/Azores', 'UTC−1'], ['Europe/Lisbon', 'UTC+0'], ['Europe/London', 'UTC+0'],
  ['Africa/Lagos', 'UTC+1'], ['Europe/Madrid', 'UTC+1'], ['Europe/Paris', 'UTC+1'],
  ['Europe/Berlin', 'UTC+1'], ['Africa/Cairo', 'UTC+2'], ['Europe/Athens', 'UTC+2'],
  ['Africa/Nairobi', 'UTC+3'], ['Europe/Istanbul', 'UTC+3'], ['Asia/Riyadh', 'UTC+3'],
  ['Asia/Dubai', 'UTC+4'], ['Asia/Karachi', 'UTC+5'], ['Asia/Kolkata', 'UTC+5:30'],
  ['Asia/Dhaka', 'UTC+6'], ['Asia/Bangkok', 'UTC+7'], ['Asia/Singapore', 'UTC+8'],
  ['Asia/Shanghai', 'UTC+8'], ['Asia/Tokyo', 'UTC+9'], ['Asia/Seoul', 'UTC+9'],
  ['Australia/Sydney', 'UTC+10'], ['Pacific/Auckland', 'UTC+12'],
] as const;

const city = (zone: string) => zone.split('/').pop()!.replace(/_/g, ' ');

export default function DialogScroll() {
  const [open, setOpen] = useState(false);
  const [zone, setZone] = useState('Europe/Istanbul');
  const [query, setQuery] = useState('');
  const shown = ZONES.filter(([name]) => name.toLowerCase().replace(/_/g, ' ').includes(query.trim().toLowerCase()));

  return (
    <div className="flex flex-col items-center gap-3">
      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setQuery('');
        }}
      >
        <Dialog.Trigger render={<Button variant="outline" />}>Time zone: {city(zone)}</Dialog.Trigger>
        <Dialog.Content size="sm" showClose={false} className="h-[30rem]">
          <Dialog.Header title="Time zone" description="Meeting times are shown in it.">
            <Input
              type="search"
              placeholder="Search for a city"
              aria-label="Search for a city"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="mt-3"
            />
          </Dialog.Header>
          <Dialog.Body>
            <Frame variant="plain">
              <Frame.Panel>
                {shown.map(([name, offset]) => (
                  <Frame.Row
                    key={name}
                    aria-pressed={name === zone}
                    onClick={() => {
                      setZone(name);
                      setOpen(false);
                    }}
                  >
                    <Frame.Content>
                      <Frame.Title as="p">{city(name)}</Frame.Title>
                      <Frame.Description>{offset}</Frame.Description>
                    </Frame.Content>
                    {name === zone ? (
                      <Frame.Actions>
                        <CheckIcon className="size-4 text-primary" />
                      </Frame.Actions>
                    ) : null}
                  </Frame.Row>
                ))}
              </Frame.Panel>
            </Frame>
            {shown.length === 0 ? <p className="text-center text-sm text-muted-foreground">No city matches “{query}”.</p> : null}
          </Dialog.Body>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}
