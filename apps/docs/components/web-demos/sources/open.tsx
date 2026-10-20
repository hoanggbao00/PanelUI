'use client';

import { Sources } from 'panelui-web/sources';

const PAGES = [
  { href: 'https://railwatch.eu/night-trains/vienna', title: 'Night trains from Vienna, winter timetable', snippet: 'The Venice service runs nightly from 13 December, leaving at 21:27.' },
  { href: 'https://slowtrain.travel/couchettes', title: 'Couchette or sleeper: what you get', snippet: 'A six-berth couchette has no washbasin; a sleeper compartment has its own.' },
  { href: 'https://alpinepass.info/brenner', title: 'Crossing the Brenner by rail', snippet: 'Works close the line on some Saturday nights until March.' },
];

export default function SourcesOpen() {
  return (
    <Sources defaultOpen className="w-full max-w-xl">
      <Sources.Trigger />
      <Sources.Content>
        {PAGES.map((page) => (
          <Sources.Source key={page.href} {...page} />
        ))}
      </Sources.Content>
      <p className="mt-3 text-[0.9375rem] leading-7">
        Yes. <Sources.Citation index={1}>A night train leaves Vienna for Venice every night from 13 December</Sources.Citation>
        . Book a sleeper if you want a washbasin<Sources.Citation index={2} />, and check your date against{' '}
        <Sources.Citation index={3}>the Brenner works</Sources.Citation>, which{' '}
        <Sources.Citation index={1}>can move the departure</Sources.Citation>.
      </p>
    </Sources>
  );
}
