'use client';

import { Sources } from 'panelui-web/sources';

const PAGES = [
  { href: 'https://docs.mapkit.dev/tiles/caching', title: 'Caching map tiles offline' },
  { href: 'https://docs.mapkit.dev/tiles/limits', title: 'Tile request limits and quotas' },
  { href: 'https://github.com/mapkit-community/offline-packs/issues/214', title: 'Offline packs larger than 2 GB fail on iOS' },
  { href: 'https://cartography.stackexchange.com/q/40921', title: 'Pre-fetching tiles along a route' },
];

export default function SourcesList() {
  return (
    <Sources className="w-full max-w-xl">
      <Sources.Trigger icons={0} />
      <Sources.Content layout="list">
        {PAGES.map((page) => (
          <Sources.Source key={page.href} {...page} />
        ))}
      </Sources.Content>
      <p className="mt-3 text-[0.9375rem] leading-7">
        Download tiles for the route before setting off <Sources.Citation index={4} />, and keep each pack under 2 GB, which
        is where iOS starts to fail <Sources.Citation index={3} />.
      </p>
    </Sources>
  );
}
