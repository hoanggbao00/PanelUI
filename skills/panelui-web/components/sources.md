# Sources

The pages an answer was written from, and the numbered marks in the answer that point back at them.

```tsx
import { Sources } from "@/components/panelui/sources"
```

From npm the path is `panelui-web/sources`. Install with `npx shadcn@latest add @panelui/sources`.

## When to use it

Use it under an assistant's answer to show the pages the answer was written from. Each page has a number, and `Sources.Citation` puts that number in the answer where the page is used. Point at a citation and its page lights up in the list, with a card of what the page says. Point at a page and its citations light up.

While the search runs, set `status="searching"` with the `query`. The line says what is being searched for, a ruler fills a tick for each page read, and pages still to come hold their place as empty cards, so the list does not jump. Once the list is final, set `status="done"` and the line reads "Read 5 sources".

The answer has to sit inside `Sources`, because that is how its citations find their pages. When the answer is a [Message](/docs/web/components/message), put `Sources` inside its content.

## Usage

```tsx
<Sources status="done" query="sourdough dense crumb">
  <Sources.Trigger />
  <Sources.Content>
    {pages.map((page) => (
      <Sources.Source key={page.url} href={page.url} title={page.title} snippet={page.snippet} />
    ))}
  </Sources.Content>
  <p>
    Most often it is under-proofing <Sources.Citation index={1} />.
  </p>
</Sources>
```

## Parts

```tsx
<Sources>
  <Sources.Trigger />
  <Sources.Content>
    <Sources.Source />
  </Sources.Content>
  <Sources.Citation />
</Sources>
```

- `Sources.Trigger` — The line over the list: the sites' icons, what is happening, a ruler with a tick for each page, and a chevron. Pressing it folds the list away. `icons` sets how many site icons it stacks, and `0` hides them.
- `Sources.Content` — The pages, numbered by their place. `layout="cards"`, the default, is a row of cards that scrolls sideways and snaps, with arrows and a fade at the end that has more. `layout="list"` is a column of single lines. While searching, it adds an empty card for each page still to come, up to `total`.
- `Sources.Source` — One page: its number, the site's icon and name, its `title` and a `snippet` of what it says. It opens `href` in a new tab. With no `icon`, the site's first letter is drawn on a tint picked from its name. `unreachable` keeps a page that could not be read in the list, marked, with its tick in the ruler turned red.
- `Sources.Citation` — A numbered mark in the answer that points at the source with that `index`. Pointing at it or focusing it lights the source and opens a card with its title and snippet. Pressing it opens the page.

## Props

Every part also takes the props of the element it renders, and a `className`.

#### `SourcesProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `status` | `SourcesStatus` | `'done'` | `searching` while pages are still being read; `done` once the list is final. Default `done`. |
| `query` | `string` | — | What was searched for. Shown while searching. |
| `total` | `number` | — | How many pages the search will read. While searching, the ones not in yet hold their place as empty cards. Defaults to the number of sources given. |
| `open` | `boolean` | — | Whether the list is shown, when you hold that. |
| `defaultOpen` | `boolean` | `true` | Whether it starts shown. Default true. |
| `onOpenChange` | `(open: boolean) => void` | — | — |

#### `SourcesTriggerProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `icons` | `number` | — | How many site icons to stack before the words. Default 4; 0 for none. |

#### `SourcesContentProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `layout` | `SourcesLayout` | — | `cards`, a row that scrolls sideways, or `list`, a column of lines. Default `cards`. |

#### `SourcesSourceProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `href` | `string` | — | The page. Opened in a new tab. |
| `title` | `string` | — | What the page is called. Falls back to its host, which is a better label than a long URL. |
| `snippet` | `string` | — | A line or two from the page: what it says, as the answer used it. |
| `icon` | `string \| ReactNode` | — | The site's icon: an image URL or an element. Its first letter on a tint when left out. |
| `index` | `number` | — | Its number, which its citations use. Set for you by its place in `Sources.Content`. |
| `unreachable` | `boolean` | `false` | The page could not be read. It stays in the list, marked, and its tick turns red. |

#### `SourcesCitationProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `index` | `number` | **required** | The number of the source it points at. |

## In a Server Component

`Sources` is a client component. A Server Component cannot read `Sources.Trigger` off the import, so import each part by name: `SourcesTrigger`, `SourcesContent`, `SourcesSource`, `SourcesCitation`.

## Notes

#### Where the pages come from

With the AI SDK, the pages are the `source-url` parts of an assistant message: `part.url` is the `href` and `part.title` the `title`. Remove duplicates by URL first, because a model may cite the same page twice. A part with no title falls back to the page's host.

#### Numbers

A source is numbered by its place in `Sources.Content`, from 1. Pass `index` to number it yourself, for example when the model's citations already carry numbers.

#### Accessibility

The trigger is a button with `aria-expanded`. Each source is a link that says it opens in a new tab, and each citation is named "Source 2: its title". The citation's card opens on focus as well as on hover.

#### Reduced motion

With reduced motion turned on, the searching line does not shimmer, the ruler does not pulse, and the list folds without sliding.

## Example

```tsx
'use client';

import { RotateCcwIcon, SparklesIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Avatar } from '@/components/panelui/avatar';
import { Button } from '@/components/panelui/button';
import { Message } from '@/components/panelui/message';
import { Sources } from '@/components/panelui/sources';

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
```
