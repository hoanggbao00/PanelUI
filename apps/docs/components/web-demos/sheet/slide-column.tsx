'use client';

import { PanelLeftIcon } from 'lucide-react';
import { Button } from 'panelui-web/button';
import { Sheet } from 'panelui-web/sheet';
import { useState } from 'react';

type Slide =
  | { kind: 'title'; title: string; byline: string }
  | { kind: 'bars'; title: string; bars: [string, number][] }
  | { kind: 'list'; title: string; items: string[] }
  | { kind: 'figure'; title: string; value: string; note: string }
  | { kind: 'columns'; title: string; columns: [string, string][] }
  | { kind: 'end'; title: string };

const SLIDES: Slide[] = [
  { kind: 'title', title: 'Q3 review', byline: 'Harbour team · October' },
  { kind: 'bars', title: 'Bookings by month', bars: [['Jul', 0.55], ['Aug', 0.72], ['Sep', 0.94]] },
  { kind: 'list', title: 'What shipped', items: ['Shared calendars', 'Offline check-in', 'Faster search'] },
  { kind: 'figure', title: 'Guests who came back', value: '68%', note: 'up from 61% in Q2' },
  { kind: 'columns', title: 'Next quarter', columns: [['Billing', 'Split payments'], ['Mobile', 'Boarding passes'], ['Ops', 'Night shifts']] },
  { kind: 'end', title: 'Questions?' },
];

const CHART = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)'];

/** One slide, drawn in units of its own width, so it reads at whatever size the column gives it. */
function SlideArt({ slide }: { slide: Slide }) {
  return (
    // The outer box is the container the drawing's units are measured against.
    <div className="size-full bg-card text-card-foreground [container-type:inline-size]">
      <div className="flex size-full flex-col p-[6cqw]">
      {slide.kind === 'title' ? (
        <div className="my-auto flex flex-col gap-[2cqw]">
          <div className="h-[1.2cqw] w-[12cqw] rounded-full bg-primary" />
          <p className="text-[9cqw] font-semibold leading-none tracking-tight">{slide.title}</p>
          <p className="text-[3.4cqw] text-muted-foreground">{slide.byline}</p>
        </div>
      ) : slide.kind === 'end' ? (
        <p className="m-auto text-[8cqw] font-semibold tracking-tight">{slide.title}</p>
      ) : (
        <>
          <p className="text-[4.6cqw] font-semibold leading-tight">{slide.title}</p>
          {slide.kind === 'bars' ? (
            <div className="mt-auto flex h-[30cqw] items-end gap-[4cqw]">
              {slide.bars.map(([month, value], at) => (
                <div key={month} className="flex h-full flex-1 flex-col items-center justify-end gap-[1.5cqw]">
                  <div className="w-full rounded-[1.4cqw]" style={{ height: `${value * 100}%`, background: CHART[at] }} />
                  <span className="text-[2.6cqw] text-muted-foreground">{month}</span>
                </div>
              ))}
            </div>
          ) : null}
          {slide.kind === 'list' ? (
            <ul className="mt-[5cqw] flex flex-col gap-[3cqw]">
              {slide.items.map((item, at) => (
                <li key={item} className="flex items-center gap-[2.5cqw] text-[3.6cqw]">
                  <span className="size-[2cqw] shrink-0 rounded-full" style={{ background: CHART[at] }} />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
          {slide.kind === 'figure' ? (
            <div className="my-auto flex flex-col gap-[1cqw]">
              <p className="text-[16cqw] font-semibold leading-none tracking-tight" style={{ color: 'var(--chart-2)' }}>
                {slide.value}
              </p>
              <p className="text-[3.2cqw] text-muted-foreground">{slide.note}</p>
            </div>
          ) : null}
          {slide.kind === 'columns' ? (
            <div className="mt-auto grid grid-cols-3 gap-[3cqw]">
              {slide.columns.map(([area, plan], at) => (
                <div key={area} className="flex flex-col gap-[1.2cqw] rounded-[2cqw] bg-muted p-[3cqw]">
                  <span className="h-[1cqw] w-[6cqw] rounded-full" style={{ background: CHART[at] }} />
                  <span className="text-[3.2cqw] font-medium">{area}</span>
                  <span className="text-[2.6cqw] text-muted-foreground">{plan}</span>
                </div>
              ))}
            </div>
          ) : null}
        </>
      )}
      </div>
    </div>
  );
}

export default function SheetSlideColumn() {
  const [current, setCurrent] = useState(0);

  return (
    <Sheet side="left">
      <Sheet.Trigger render={<Button variant="outline" />}>
        <PanelLeftIcon />
        Slides
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header title="Q3 review" description={`${SLIDES.length} slides`} />
        <Sheet.Slides snap={false} index={current} onIndexChange={setCurrent}>
          {SLIDES.map((slide) => (
            <Sheet.Slide key={slide.title} label={slide.title}>
              <SlideArt slide={slide} />
            </Sheet.Slide>
          ))}
        </Sheet.Slides>
      </Sheet.Content>
    </Sheet>
  );
}
