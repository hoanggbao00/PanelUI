'use client';

import { SearchIcon } from 'lucide-react';
import { Button } from 'panelui-web/button';
import { Dialog } from 'panelui-web/dialog';
import { Input } from 'panelui-web/input';
import { useEffect, useState, type KeyboardEvent } from 'react';

const REGIONS: { name: string; zones: [string, string][] }[] = [
  {
    name: 'Americas',
    zones: [
      ['America/Anchorage', 'Anchorage'],
      ['America/Los_Angeles', 'Los Angeles'],
      ['America/Denver', 'Denver'],
      ['America/Mexico_City', 'Mexico City'],
      ['America/Chicago', 'Chicago'],
      ['America/Bogota', 'Bogotá'],
      ['America/New_York', 'New York'],
      ['America/Toronto', 'Toronto'],
      ['America/Halifax', 'Halifax'],
      ['America/Sao_Paulo', 'São Paulo'],
      ['America/Argentina/Buenos_Aires', 'Buenos Aires'],
    ],
  },
  {
    name: 'Europe',
    zones: [
      ['Europe/Lisbon', 'Lisbon'],
      ['Europe/London', 'London'],
      ['Europe/Madrid', 'Madrid'],
      ['Europe/Paris', 'Paris'],
      ['Europe/Berlin', 'Berlin'],
      ['Europe/Stockholm', 'Stockholm'],
      ['Europe/Athens', 'Athens'],
      ['Europe/Istanbul', 'Istanbul'],
      ['Europe/Moscow', 'Moscow'],
    ],
  },
  {
    name: 'Africa',
    zones: [
      ['Africa/Lagos', 'Lagos'],
      ['Africa/Cairo', 'Cairo'],
      ['Africa/Johannesburg', 'Johannesburg'],
      ['Africa/Nairobi', 'Nairobi'],
    ],
  },
  {
    name: 'Asia',
    zones: [
      ['Asia/Riyadh', 'Riyadh'],
      ['Asia/Dubai', 'Dubai'],
      ['Asia/Karachi', 'Karachi'],
      ['Asia/Kolkata', 'Kolkata'],
      ['Asia/Dhaka', 'Dhaka'],
      ['Asia/Bangkok', 'Bangkok'],
      ['Asia/Singapore', 'Singapore'],
      ['Asia/Shanghai', 'Shanghai'],
      ['Asia/Seoul', 'Seoul'],
      ['Asia/Tokyo', 'Tokyo'],
    ],
  },
  {
    name: 'Oceania',
    zones: [
      ['Pacific/Honolulu', 'Honolulu'],
      ['Australia/Perth', 'Perth'],
      ['Australia/Sydney', 'Sydney'],
      ['Pacific/Auckland', 'Auckland'],
    ],
  },
];

const CITY = Object.fromEntries(REGIONS.flatMap((region) => region.zones));

/** The time there now, and its offset from UTC, as the browser knows them today. */
function clock(zone: string, now: Date) {
  const time = new Intl.DateTimeFormat('en-GB', { timeZone: zone, hour: '2-digit', minute: '2-digit' }).format(now);
  const name = new Intl.DateTimeFormat('en-US', { timeZone: zone, timeZoneName: 'shortOffset' })
    .formatToParts(now)
    .find((part) => part.type === 'timeZoneName')?.value;
  const offset = (name ?? 'GMT').replace('GMT', 'UTC').replace('-', '−');
  return `${time} · ${offset}`;
}

export default function DialogScroll() {
  const [open, setOpen] = useState(false);
  const [zone, setZone] = useState('Europe/Istanbul');
  const [query, setQuery] = useState('');
  const [now, setNow] = useState(() => new Date());

  // The times move on while the list is open.
  useEffect(() => {
    if (!open) return;
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 15000);
    return () => window.clearInterval(timer);
  }, [open]);

  const needle = query.trim().toLowerCase();
  const regions = REGIONS.map((region) => ({
    ...region,
    zones: region.zones.filter(([, city]) => city.toLowerCase().includes(needle)),
  })).filter((region) => region.zones.length > 0);

  const choose = (next: string) => {
    setZone(next);
    setOpen(false);
  };

  // Down from the field goes into the list; Enter takes the first city found.
  const fromSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      document.querySelector<HTMLElement>('[data-slot=dialog-list-item]')?.focus();
    }
    if (event.key === 'Enter' && regions[0]) choose(regions[0].zones[0][0]);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery('');
      }}
    >
      <Dialog.Trigger render={<Button variant="outline" />}>Time zone: {CITY[zone]}</Dialog.Trigger>
      <Dialog.Content size="sm" showClose={false} className="h-[32rem]">
        <Dialog.Header title="Time zone" description="Meetings are shown in it.">
          <Input.Group className="mt-3">
            <Input.Addon>
              <SearchIcon />
            </Input.Addon>
            <Input
              type="search"
              placeholder="Search cities"
              aria-label="Search cities"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={fromSearch}
            />
          </Input.Group>
        </Dialog.Header>
        <Dialog.Body>
          {regions.length > 0 ? (
            <Dialog.List aria-label="Time zones">
              {regions.map((region) => (
                <Dialog.ListGroup key={region.name} label={region.name}>
                  {region.zones.map(([id, city]) => (
                    <Dialog.ListItem key={id} selected={id === zone} meta={clock(id, now)} onSelect={() => choose(id)}>
                      {city}
                    </Dialog.ListItem>
                  ))}
                </Dialog.ListGroup>
              ))}
            </Dialog.List>
          ) : (
            <p className="py-10 text-center text-sm text-muted-foreground">No city matches “{query.trim()}”.</p>
          )}
        </Dialog.Body>
      </Dialog.Content>
    </Dialog>
  );
}
