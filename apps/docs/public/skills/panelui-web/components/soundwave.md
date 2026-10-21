# Soundwave

A voice drawn while an app listens: capsules, bars, a line, a field of dots, spokes round a person, or rings of dots.

```tsx
import { Soundwave } from "@/components/panelui/soundwave"
```

From npm the path is `panelui-web/soundwave`. Install with `npx shadcn@latest add @panelui/soundwave`.

## When to use it

Use it to show that an app is hearing someone, or that someone is speaking: over a microphone button, in a recording row, beside each person on a call, or behind a whole voice screen.

It draws a level and does not record one. Your app owns the microphone and passes a number from 0 to 1, so there is no audio dependency here, and the same wave works with a live meter, a remote speaker's level or a stored recording.

With no level it runs its own motion for the current `state`, which is enough to build and review a voice screen before any audio exists.

For a spinner while an answer is being written, use a loader. For a recording's length and position alone, a progress bar is clearer.

## Usage

```tsx
<Soundwave variant="dots" state="listening" level={level} />

<Soundwave variant="radial" state="speaking">
  <Soundwave.Center>
    <Avatar name="Khalid Abdi" size="xl" />
  </Soundwave.Center>
</Soundwave>
```

## Parts

```tsx
<Soundwave>
  <Soundwave.Center />
</Soundwave>
```

- `Soundwave.Center` — What sits in the middle of a `radial` or `ring` wave, such as an avatar or a figure. It is sized to the hole and centred in it. The other looks have no middle and do not use it.

## Props

Every part also takes the props of the element it renders, and a `className`.

#### `SoundwaveProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `variant` | `SoundwaveVariant` | `'pills'` | Which look to draw: `pills` for a few capsules over a microphone button, `bars` for a metering strip, `line` for a travelling wave, `ambient` for a glow that fills its parent, `dots` for a field of dots lit into a wave, `radial` for spokes around a centre, and `ring` for rings of dots lit outward by angle. |
| `state` | `SoundwaveState` | `'listening'` | What the app is doing. With no `level` it picks the motion the wave runs on its own, and it always sets what a screen reader announces. |
| `level` | `number \| RefObject<number \| null>` | — | How loud the input is now, from 0 to 1. Pass a ref and write each reading into `ref.current` to keep updates out of React entirely. Leave it out and the wave runs its own motion for `state`. |
| `levels` | `readonly number[]` | — | Fixed values, 0 to 1 each: the stored shape of a recording, a frequency analysis, or one value per angle for `ring` (24 for the hours of a day). Resampled to the bar count, and drawn still rather than animated. |
| `progress` | `number` | — | How far a recording has played, from 0 to 1. Bars and dots behind it keep full ink and the rest are dimmed. `bars` and `dots`, with `levels`. |
| `bars` | `number` | — | How many capsules, bars or spokes, or how many angles for `ring`. `dots` fits as many columns as the width allows. |
| `barWidth` | `number` | — | Capsule or bar width, the stroke of `line` and `radial`, or the size of a dot. |
| `barGap` | `number` | — | Space between capsules, or between dots. `bars` spaces itself across the width. |
| `height` | `number` | — | Drawing height. For `radial` and `ring` it is the diameter. `ambient` fills its parent instead. |
| `mode` | `'static' \| 'scrolling'` | `'static'` | `static` gives every bar a share of the current level; `scrolling` keeps a history that slides across, newest at the trailing edge. `bars` and `dots`. |
| `centered` | `boolean` | `true` | Grow bars and dots from the middle out rather than up from the bottom. Default `true`. |
| `fadeEdges` | `boolean` | `false` | Fade a strip out at both ends, so it does not stop at a hard edge. |
| `sensitivity` | `number` | `1` | Multiplier on the incoming level, applied before it is capped at 1. Default `1`. |
| `speed` | `number` | `1` | Multiplier on the wave's own tempo, including how fast a history scrolls. Default `1`. |
| `color` | `SoundwaveColor` | — | The ink, as a role from the theme. Left unset the wave is drawn in the text colour of whatever it sits in, which is right on most surfaces; `ambient` defaults to `info`, since a glow in the text colour reads as a shadow. |
| `gradient` | `readonly SoundwaveColor[]` | — | Colours across the wave instead of one ink, as theme roles: left to right for the strips, up from the bottom for `ambient`. |
| `trackColor` | `SoundwaveColor` | — | The colour of the unlit dots in `dots` and `ring`, and of the part of a recording not yet played in `bars`. Defaults to the ink, faint. |
| `paused` | `boolean` | `false` | Hold the current frame. |
| `label` | `string` | — | What a screen reader calls it. Defaults to the state: "Listening". |

## Notes

#### Driving it

`level` is a number from 0 to 1, or a ref holding one. A meter reports dozens of times a second, so for a live microphone use a ref: putting each reading in React state re-renders everything above the wave on every reading. A number is right for something slow, such as a speaking flag from a server.

The level is smoothed with a fast rise and a slow fall, so the wave jumps on a syllable and settles gently instead of flickering on every sample. `sensitivity` multiplies the level before it is capped at 1, for a quiet source.

#### Drawing

Each look is one or two SVG paths, and every dot is a round end on a line of no length, so a field of several hundred dots is a single path. Each frame rewrites those paths and changes no React state.

The strips (`bars`, `line` and `dots`) take the width of their container, so give the container a width. `pills`, `radial` and `ring` size themselves from their props.

#### When it stops

The wave stops drawing when it is scrolled out of view or its tab is hidden, and starts again when it comes back. `paused` holds the current frame. With reduced motion turned on, the wave holds a still frame instead of moving.

A wave with `levels` and no `scrolling` never animates, so a list of twenty voice notes costs nothing until one plays.

#### Screen readers

The wave is one image, announced by its state ("Listening"). Pass `label` to say more, such as who is speaking. What is inside `Soundwave.Center` is part of that image and is not read separately.

## Example

```tsx
'use client';

import { Soundwave } from '@/components/panelui/soundwave';

export default function SoundwaveOverview() {
  return <Soundwave variant="dots" color="info" height={72} className="max-w-md" />;
}
```
