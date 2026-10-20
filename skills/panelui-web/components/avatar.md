# Avatar

A person or a team as a picture, or their initials in a colour of their own, with a badge and a group that opens up.

```tsx
import { Avatar } from "@/components/panelui/avatar"
```

From npm the path is `panelui-web/avatar`. Install with `npx shadcn@latest add @panelui/avatar`.

## When to use it

Use it to show who someone is: the author of a comment, the people on a team, who has read a document. It shows `src` once the picture has loaded, and until then, or if it never loads, the initials of `name`.

The initials sit on a tint of one of the theme's chart colours, picked from the name. The same person gets the same colour everywhere, so a list of people without pictures can still be told apart.

A badge and an overlapping avatar are cut out of the avatar beneath them, not drawn with a ring. The gap shows whatever the avatar sits on, so it works on a card, a tinted row or a photograph without a colour to match.

`name` is also what a screen reader says, with the badge's status after it. Pass `alt` when something else should be said.

## Usage

```tsx
<Avatar src="/photos/ines.jpg" name="Ines Duarte" />

<Avatar name="Kofi Mensah" size="lg">
  <Avatar.Badge status="online" />
</Avatar>

<Avatar.Group max={4} label="Read by">
  {people.map((person) => (
    <Avatar key={person.id} src={person.photo} name={person.name} />
  ))}
</Avatar.Group>
```

## Parts

```tsx
<Avatar>
  <Avatar.Badge />
</Avatar>

<Avatar.Group>
  <Avatar />
</Avatar.Group>
```

- `Avatar.Badge` — A dot or a small icon on the avatar's lower trailing edge. `status` draws a presence dot: `online`, `away`, `busy`, or a hollow `offline`. For an icon, such as a check on a verified account, pass the icon as children and a `color`. `label` is what a screen reader says after the name.
- `Avatar.Group` — A row of avatars overlapping one another. It sets the `size` and `shape` of every avatar in it. Hovered or focused, it opens up so each face can be seen whole. Past `max`, the rest are counted in a last circle that opens a list of their names.

## Props

Every part also takes the props of the element it renders, and a `className`.

#### `AvatarProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `src` | `string` | — | The picture. Without it, or until it has loaded, the initials show. |
| `name` | `string` | — | Who it is. Gives the initials, the colour and what a screen reader says. |
| `alt` | `string` | — | Read out in place of `name`, when that is not the right thing to say. |
| `size` | `AvatarSize` | — | Default `md`. In a group, the group's size. |
| `shape` | `AvatarShape` | `circle` | `circle` for people, `square` for teams, projects and things. Default `circle`. |
| `color` | `AvatarColor` | — | The tint behind the initials. Picked from `name` when left out. |
| `fallback` | `ReactNode` | — | In place of the initials, such as an icon for a team or a bot. |

#### `AvatarBadgeProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `status` | `AvatarStatus` | — | A presence dot in the colour that says it. Leave out for a badge of your own. |
| `color` | `AvatarColor` | — | For a badge with an icon in it: the fill behind the icon. |
| `label` | `string` | — | What a screen reader says after the name. Defaults to the status. |

#### `AvatarGroupProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `max` | `number` | — | How many to show. The rest are counted in a last circle that lists them. |
| `size` | `AvatarSize` | — | The size of every avatar in it. Default `md`. |
| `shape` | `AvatarShape` | `circle` | The shape of every avatar in it. Default `circle`. |
| `label` | `string` | — | What a screen reader calls the group, such as "Members". |

## In a Server Component

`Avatar` is a client component. A Server Component cannot read `Avatar.Badge` off the import, so import each part by name: `AvatarBadge`, `AvatarGroup`.

## Notes

#### Loading

The initials show from the start and the picture replaces them once it has loaded, so nothing flickers between an empty circle and a face.

#### Reduced motion

With reduced motion turned on, a group does not open up when hovered.

#### In a group

A group is a `role="group"`. Give it a `label` that says who the people are, such as "Members" or "Read by".

## Example

```tsx
'use client';

import { Avatar, type AvatarStatus } from '@/components/panelui/avatar';
import { Frame } from '@/components/panelui/frame';

const TEAM: { name: string; role: string; status: AvatarStatus; photo?: string }[] = [
  { name: 'Ines Duarte', role: 'Art director', status: 'online', photo: 'https://i.pravatar.cc/150?img=5' },
  { name: 'Kofi Mensah', role: 'Illustrator', status: 'busy' },
  { name: 'Yuki Tanabe', role: 'Motion designer', status: 'away', photo: 'https://i.pravatar.cc/150?img=44' },
  { name: 'Ravi Patel', role: 'Producer', status: 'online', photo: 'https://i.pravatar.cc/150?img=59' },
  { name: 'Selma Berg', role: 'Copywriter', status: 'offline' },
];

const SAY: Record<AvatarStatus, string> = { online: 'Online', busy: 'In a meeting', away: 'Away', offline: 'Offline' };

export default function AvatarTeam() {
  return (
    <Frame className="w-full max-w-sm">
      <Frame.Header>
        <Frame.Title>Studio</Frame.Title>
        <Frame.Action>
          <Avatar.Group size="xs" max={3} label="Online now">
            {TEAM.filter((person) => person.status !== 'offline').map((person) => (
              <Avatar key={person.name} name={person.name} src={person.photo} />
            ))}
          </Avatar.Group>
        </Frame.Action>
      </Frame.Header>
      <Frame.Panel>
        {TEAM.map((person) => (
          <Frame.Row key={person.name}>
            <Frame.Media>
              <Avatar name={person.name} src={person.photo}>
                <Avatar.Badge status={person.status} />
              </Avatar>
            </Frame.Media>
            <Frame.Content>
              <Frame.Title as="p">{person.name}</Frame.Title>
              <Frame.Description>{person.role}</Frame.Description>
            </Frame.Content>
            <Frame.Actions className="text-xs text-muted-foreground">{SAY[person.status]}</Frame.Actions>
          </Frame.Row>
        ))}
      </Frame.Panel>
    </Frame>
  );
}
```
