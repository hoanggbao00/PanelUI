'use client';

import { Sources } from 'panelui-web/sources';

export default function SourcesUnreachable() {
  return (
    <Sources query="council tax band appeal deadline" className="w-full max-w-xl">
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
          title="Council tax: when you can challenge your band"
          snippet="After six months, an appeal needs evidence that the band was wrong from the start."
        />
      </Sources.Content>
    </Sources>
  );
}
