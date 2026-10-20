'use client';

import { RotateCcwIcon, SparklesIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Avatar } from 'panelui-web/avatar';
import { Button } from 'panelui-web/button';
import { Message } from 'panelui-web/message';
import { Sources } from 'panelui-web/sources';

const QUERY = 'sourdough dense crumb causes';

const PAGES = [
  {
    href: 'https://breadlab.org/guides/underproofed-dough',
    title: 'Reading an under-proofed loaf',
    snippet: 'A tight, gummy crumb with a few large holes near the top is the usual sign the dough went into the oven too early.',
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
    snippet: 'Below about 11% protein, the dough struggles to hold the gas a long fermentation makes.',
  },
];

type Phase = 'searching' | 'writing' | 'done';

export default function SourcesAnswer() {
  const [run, setRun] = useState(0);
  const [found, setFound] = useState(0);
  const [phase, setPhase] = useState<Phase>('searching');

  // Stands in for a model: the pages arrive one at a time, then the answer.
  useEffect(() => {
    setFound(0);
    setPhase('searching');
    const timers: number[] = [];
    PAGES.forEach((_, at) => timers.push(window.setTimeout(() => setFound(at + 1), 700 + at * 550)));
    timers.push(window.setTimeout(() => setPhase('writing'), 700 + PAGES.length * 550));
    timers.push(window.setTimeout(() => setPhase('done'), 1600 + PAGES.length * 550));
    return () => timers.forEach(window.clearTimeout);
  }, [run]);

  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <Message from="user">
        <Message.Content>
          <Message.Bubble>
            <Message.BubbleContent>Why is my sourdough always dense in the middle?</Message.BubbleContent>
          </Message.Bubble>
        </Message.Content>
      </Message>

      <Message from="assistant" streaming={phase === 'writing'}>
        <Message.Avatar>
          <Avatar alt="Assistant" shape="square" size="sm" color="chart-3" fallback={<SparklesIcon />} />
        </Message.Avatar>
        <Message.Content className="gap-3">
          {/* The answer sits inside Sources, so its citations can find their pages. */}
          <Sources status={phase === 'searching' ? 'searching' : 'done'} query={QUERY} total={PAGES.length}>
            <Sources.Trigger />
            <Sources.Content>
              {PAGES.slice(0, found).map((page) => (
                <Sources.Source key={page.href} {...page} />
              ))}
            </Sources.Content>
            {phase !== 'searching' ? (
              <Message.Bubble className="mt-3">
                <Message.BubbleContent>
                  <p>
                    Most often it is under-proofing: the dough is baked before it has risen enough, which leaves a
                    tight, gummy middle <Sources.Citation index={1} />. Two things usually cause it.
                  </p>
                  <ul>
                    <li>
                      A slow starter. It should double within six hours of a feed <Sources.Citation index={2} />.
                    </li>
                    <li>
                      A cool kitchen. Each 2 °C cooler adds about an hour to the rise <Sources.Citation index={3} />
                      <Sources.Citation index={4} />.
                    </li>
                  </ul>
                  <p>
                    Let the bulk rise go until the dough is about half again as big, however long that takes. If it still
                    spreads flat, try a flour with more protein <Sources.Citation index={5} />.
                  </p>
                </Message.BubbleContent>
              </Message.Bubble>
            ) : null}
          </Sources>
        </Message.Content>
      </Message>

      <Button variant="outline" size="sm" className="self-start" onClick={() => setRun(run + 1)}>
        <RotateCcwIcon /> Replay
      </Button>
    </div>
  );
}
