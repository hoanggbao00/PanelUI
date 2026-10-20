'use client';

import { Sources } from 'panelui-web/sources';

const PAGES = [
  { href: 'https://docs.mapkit.dev/tiles/caching', title: 'Caching map tiles offline', snippet: 'Packs are stored per style and zoom range.' },
  { href: 'https://github.com/mapkit-community/offline-packs/issues/214', title: 'Offline packs larger than 2 GB fail on iOS', snippet: 'Anything past 2 GB is dropped silently on download.' },
  { href: 'https://cartography.stackexchange.com/q/40921', title: 'Pre-fetching tiles along a route', snippet: 'Buffer the route by a kilometre and fetch zoom 10 to 15.' },
];

export default function SourcesNumbers() {
  return (
    <Sources className="w-full max-w-xl">
      <Sources.Trigger />
      <Sources.Content>
        {PAGES.map((page) => (
          <Sources.Source key={page.href} {...page} />
        ))}
      </Sources.Content>
      <p className="mt-3 text-[0.9375rem] leading-7">
        Download the tiles along your route before you set off
        <Sources.Citation index={3} />
        <Sources.Citation index={1} />, and keep each pack under 2 GB, which is where iOS starts to fail
        <Sources.Citation index={2} />.
      </p>
    </Sources>
  );
}
