# Tabs

A few views of one thing, one at a time, chosen from a row of tabs whose marker slides to the one chosen.

```tsx
import { Tabs } from "@/components/panelui/tabs"
```

From npm the path is `panelui-web/tabs`. Install with `npx shadcn@latest add @panelui/tabs`.

## When to use it

Use it to switch between a few views of the same thing: the overview, activity and files of one project, the sections of a settings page, a range on a chart. Only the chosen view is shown, and the others are a press away.

The views have to be peers. When one step leads to the next, use a sequence of steps instead. When the views are separate pages a reader should be able to link to, use links.

Tabs works best with two to six tabs. More than fit the row scroll sideways, with the end that has more faded, so a long row stays one line.

## Usage

```tsx
<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="activity">
      Activity <Tabs.Badge>3</Tabs.Badge>
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview">…</Tabs.Content>
  <Tabs.Content value="activity">…</Tabs.Content>
</Tabs>
```

## Parts

```tsx
<Tabs>
  <Tabs.List>
    <Tabs.Trigger>
      <Tabs.Badge />
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content />
</Tabs>
```

- `Tabs.List` — The row of tabs, and the marker under the chosen one. Give it an `aria-label` when nothing on the page names the tabs. It scrolls sideways when the tabs do not fit.
- `Tabs.Trigger` — One tab. Its `value` names the `Tabs.Content` it shows. An icon and a `Tabs.Badge` can sit beside the label. `disabled` keeps it from being chosen.
- `Tabs.Badge` — A count beside a tab's label: unread, open, waiting. It follows the tab's colour when the tab is chosen.
- `Tabs.Content` — What one tab shows. Only the chosen one is in the page; `keepMounted` keeps the others there, hidden, for content that is expensive to build again.

## Props

Every part also takes the props of the element it renders, and a `className`.

#### `TabsProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `variant` | `TabsVariant` | `segmented` | How the tabs are drawn. Default `segmented`. |
| `className` | `string` | — | — |

#### `TabsListProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `className` | `string` | — | — |

#### `TabsTriggerProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `className` | `string` | — | — |

#### `TabsContentProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `className` | `string` | — | — |

## In a Server Component

`Tabs` is a client component. A Server Component cannot read `Tabs.List` off the import, so import each part by name: `TabsList`, `TabsTrigger`, `TabsBadge`, `TabsContent`.

## Notes

#### Keyboard

The arrow keys move focus between tabs, Home and End go to the first and last, and Enter or Space chooses the one focused. Pass `activateOnFocus` to `Tabs.List` to choose a tab as soon as it is reached.

#### Reduced motion

With reduced motion turned on, the marker and the new view appear in place without sliding.

#### Built on

The tabs are the Base UI tabs, which the package depends on directly.

## Example

```tsx
'use client';

import { FileTextIcon, ImageIcon, SheetIcon } from 'lucide-react';
import { Avatar } from '@/components/panelui/avatar';
import { Card } from '@/components/panelui/card';
import { Frame } from '@/components/panelui/frame';
import { Stat } from '@/components/panelui/stat';
import { Tabs } from '@/components/panelui/tabs';

const ACTIVITY = [
  { who: 'Ines Duarte', what: 'moved “Cover” to review', when: '4 min' },
  { who: 'Kofi Mensah', what: 'uploaded 12 illustrations', when: '1 h' },
  { who: 'Ravi Patel', what: 'set the print date to 9 November', when: '3 h' },
];

const FILES = [
  { name: 'Brief.pdf', size: '240 KB', Icon: FileTextIcon },
  { name: 'Cover, v4.png', size: '8.1 MB', Icon: ImageIcon },
  { name: 'Print schedule.xlsx', size: '36 KB', Icon: SheetIcon },
];

export default function TabsProject() {
  return (
    <Card className="w-full max-w-md">
      <Card.Header>
        <Card.Title>Autumn catalogue</Card.Title>
        <Card.Description>Print run of 4,000 · due 9 November</Card.Description>
      </Card.Header>
      <Card.Content>
        <Tabs defaultValue="overview">
          <Tabs.List>
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="activity">
              Activity <Tabs.Badge>3</Tabs.Badge>
            </Tabs.Trigger>
            <Tabs.Trigger value="files">Files</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="overview" className="grid grid-cols-2 gap-3">
            <Stat>
              <Stat.Content>
                <Stat.Label>Pages done</Stat.Label>
                <Stat.Value>
                  38<Stat.Unit>of 64</Stat.Unit>
                </Stat.Value>
              </Stat.Content>
            </Stat>
            <Stat>
              <Stat.Content>
                <Stat.Label>Days to print</Stat.Label>
                <Stat.Value>20</Stat.Value>
              </Stat.Content>
            </Stat>
          </Tabs.Content>
          <Tabs.Content value="activity">
            <Frame variant="plain">
              <Frame.Panel>
                {ACTIVITY.map((item) => (
                  <Frame.Row key={item.what}>
                    <Frame.Media>
                      <Avatar name={item.who} size="sm" />
                    </Frame.Media>
                    <Frame.Content>
                      <Frame.Title as="p">{item.who}</Frame.Title>
                      <Frame.Description>{item.what}</Frame.Description>
                    </Frame.Content>
                    <Frame.Actions className="text-xs text-muted-foreground">{item.when}</Frame.Actions>
                  </Frame.Row>
                ))}
              </Frame.Panel>
            </Frame>
          </Tabs.Content>
          <Tabs.Content value="files">
            <Frame variant="plain">
              <Frame.Panel>
                {FILES.map(({ name, size, Icon }) => (
                  <Frame.Row key={name} href="#files" chevron>
                    <Frame.Media className="text-muted-foreground">
                      <Icon className="size-4" />
                    </Frame.Media>
                    <Frame.Content>
                      <Frame.Title as="p">{name}</Frame.Title>
                      <Frame.Description>{size}</Frame.Description>
                    </Frame.Content>
                  </Frame.Row>
                ))}
              </Frame.Panel>
            </Frame>
          </Tabs.Content>
        </Tabs>
      </Card.Content>
    </Card>
  );
}
```
