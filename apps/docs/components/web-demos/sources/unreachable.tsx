'use client';

import { Sources } from 'panelui-web/sources';

export default function SourcesUnreachable() {
  return (
    <Sources defaultOpen className="w-full max-w-xl">
      <Sources.Trigger />
      <Sources.Content>
        <Sources.Source
          href="https://localgov.example/council-tax/appeals"
          title="Challenging your council tax band"
          snippet="You can appeal within six months of moving into a property."
        />
        <Sources.Source href="https://valuation.example/bands/lookup" title="Band lookup service" unreachable />
        <Sources.Source
          href="https://citizensguide.example/housing/council-tax"
          title="When you can challenge your band"
          snippet="After six months, an appeal needs evidence that the band was wrong from the start."
        />
      </Sources.Content>
      <p className="mt-3 text-[0.9375rem] leading-7">
        <Sources.Citation index={1}>You have six months from moving in</Sources.Citation>. After that,{' '}
        <Sources.Citation index={3}>you need evidence the band was wrong from the start</Sources.Citation>.
      </p>
    </Sources>
  );
}
