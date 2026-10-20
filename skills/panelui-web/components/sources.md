# Sources

The pages an answer was written from, and which claim in it rests on which page.

```tsx
import { Sources } from "@/components/panelui/sources"
```

From npm the path is `panelui-web/sources`. Install with `npx shadcn@latest add @panelui/sources`.

## When to use it

Use it with an assistant's answer to show the pages the answer was written from, and which claim rests on which page.

It stays out of the answer's way. Once the search is done it is one line above the answer, "Read 5 sources", which opens into a list. The line begins with a bar for each page, as tall as the number of times the answer cites it, so you can see at a glance whether the answer leans on one page or several.

While the search runs, set `status="searching"` and pass the `query`. The list is open, the pages arrive in it one by one, and those still to come hold their place. Set `status="done"` when the list is final and it folds back to its line.

`Sources.Citation` goes in the answer after a claim. Wrap the claim in it, and pointing at the number lights the claim, its bar and its page, and opens a card of what the page says. Pointing at a page in the list lights every claim that rests on it. The answer has to sit inside `Sources` for its citations to find their pages.

## Usage

```tsx
<Sources status="done">
  <Sources.Trigger />
  <Sources.Content>
    {pages.map((page) => (
      <Sources.Source key={page.url} href={page.url} title={page.title} snippet={page.snippet} />
    ))}
  </Sources.Content>
  <p>
    Most often it is under-proofing, which{' '}
    <Sources.Citation index={1}>leaves a tight, gummy middle</Sources.Citation>.
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

- `Sources.Trigger` — The line: a bar for each page, then "Searching …" or "Read 5 sources", then a chevron. A bar is a dot until its page is read, and then grows with each citation of it. A page that could not be read is an empty bar. Pressing the line opens and folds the list once the search is done.
- `Sources.Content` — The list of pages, numbered by their place from 1. While searching, it is open, and it holds a place for each page still to come, up to `total`.
- `Sources.Source` — One page: its number, its `title`, its site and a line of what it says, the `snippet`. It opens `href` in a new tab. Dots at its end count how many times the answer cites it. `unreachable` keeps a page that could not be opened in the list, marked as such.
- `Sources.Citation` — The number of a page, set after a claim in the answer. Give it the claim as children to tie the two together: pointing at either lights both. Pointing at the number also opens a card with the page's title, its snippet and how many claims it backs. Pressing it opens the page.

## Props

Every part also takes the props of the element it renders, and a `className`.

#### `SourcesProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `status` | `SourcesStatus` | `'done'` | `searching` while pages are still being read: the list is open and they arrive in it. `done` once it is final: the list folds to its line. Default `done`. |
| `query` | `string` | — | What was searched for. Shown in the line while searching. |
| `total` | `number` | — | How many pages the search will read. While searching, the ones not in yet hold their place in the list. Defaults to the number of sources given. |
| `open` | `boolean` | — | Whether the list is open once the search is done, when you hold that. |
| `defaultOpen` | `boolean` | `false` | Whether the list starts open once the search is done. Default false. |
| `onOpenChange` | `(open: boolean) => void` | — | — |

#### `SourcesSourceProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `href` | `string` | — | The page. Opened in a new tab. |
| `title` | `string` | — | What the page is called. Falls back to its host. |
| `snippet` | `string` | — | A line from the page: what it says, as the answer used it. Shown under the title and in the citation's card. |
| `icon` | `string` | — | The site's icon, as an image URL. Shown in the citation's card. |
| `index` | `number` | — | Its number, which its citations use. Set for you by its place in `Sources.Content`. |
| `unreachable` | `boolean` | `false` | The page could not be read. It stays in the list, marked, and its bar is left empty. |

#### `SourcesCitationProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `index` | `number` | **required** | The number of the page it points at. |

## In a Server Component

`Sources` is a client component. A Server Component cannot read `Sources.Trigger` off the import, so import each part by name: `SourcesTrigger`, `SourcesContent`, `SourcesSource`, `SourcesCitation`.

## Notes

#### Where the pages come from

With the AI SDK, the pages are the `source-url` parts of an assistant message: `part.url` is the `href` and `part.title` the `title`. Remove duplicates by URL first, because a model can cite the same page twice. A page with no title falls back to its host.

#### Numbers

A source is numbered by its place in `Sources.Content`. Pass `index` to number it yourself, for example when the model's citations already carry numbers.

#### Accessibility

The line is a button with `aria-expanded`. Each source is a link that says it opens in a new tab and how many times it is cited. Each citation is named "Source 2: its title", and its card opens on focus as well as on hover.

#### Reduced motion

With reduced motion turned on, the searching line does not shimmer, and the bars and the list change without moving.

## Example

```tsx
'use client';

import { useEffect, useState } from 'react';
import { Sources } from '@/components/panelui/sources';

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
```
