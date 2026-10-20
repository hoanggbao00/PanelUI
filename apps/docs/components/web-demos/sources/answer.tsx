'use client';

import { useEffect, useState } from 'react';
import { Sources } from 'panelui-web/sources';

const PAGES = [
  {
    href: 'https://breadlab.org/guides/underproofed-dough',
    title: 'Reading an under-proofed loaf',
    snippet: 'A tight, gummy crumb with a few large holes near the top means the dough went into the oven too early.',
  },
  {
    href: 'https://flourandwater.co/notes/starter-strength',
    title: 'How strong does a starter need to be?',
    snippet: 'A starter should double within six hours of feeding at room temperature before it can raise a loaf.',
  },
  {
    href: 'https://proofing.guide/temperature',
    title: 'Dough temperature and timing',
    snippet: 'Every 2 °C cooler adds roughly an hour to bulk fermentation.',
  },
  {
    href: 'https://crumbshot.forum/t/dense-loaf-help/8812',
    title: 'Dense loaf every time, what am I missing?',
    snippet: 'Turned out my kitchen was 18 °C. Bulk took nine hours, not five.',
  },
  {
    href: 'https://millersalmanac.com/flour/protein',
    title: 'Protein content in bread flour',
    snippet: 'Below about 11% protein, dough struggles to hold the gas a long rise makes.',
  },
];

export default function SourcesAnswer() {
  // Stands in for a model: the pages arrive one at a time, then the answer.
  const [found, setFound] = useState(0);
  useEffect(() => {
    const timers = PAGES.map((_, at) => window.setTimeout(() => setFound(at + 1), 600 + at * 500));
    return () => timers.forEach(window.clearTimeout);
  }, []);
  const done = found === PAGES.length;

  return (
    <Sources
      status={done ? 'done' : 'searching'}
      query="sourdough dense crumb"
      total={PAGES.length}
      className="w-full max-w-xl"
    >
      <Sources.Trigger />
      <Sources.Content>
        {PAGES.slice(0, found).map((page) => (
          <Sources.Source key={page.href} {...page} />
        ))}
      </Sources.Content>
      {done ? (
        <div className="mt-3 flex flex-col gap-3 text-[0.9375rem] leading-7 transition-opacity duration-500 starting:opacity-0">
          <p>
            Most often it is under-proofing: the dough is baked before it has risen enough, which{' '}
            <Sources.Citation index={1}>leaves a tight, gummy middle</Sources.Citation>. Two things usually cause it. A
            starter that is too slow <Sources.Citation index={2}>should double within six hours of a feed</Sources.Citation>
            , and a cool kitchen stretches the rise, since{' '}
            <Sources.Citation index={3}>each 2 °C cooler adds about an hour</Sources.Citation>
            <Sources.Citation index={4} />.
          </p>
          <p>
            Let the dough rise until it is about half again as big, however long that takes
            <Sources.Citation index={3} />. If it still spreads flat,{' '}
            <Sources.Citation index={5}>try a flour with more protein</Sources.Citation>.
          </p>
        </div>
      ) : null}
    </Sources>
  );
}
