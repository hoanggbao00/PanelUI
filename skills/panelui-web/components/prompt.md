# Prompt

A field for writing to an assistant, with its files, model and tools in one card.

```tsx
import { Prompt } from "@/components/panelui/prompt"
```

From npm the path is `panelui-web/prompt`. Install with `npx shadcn@latest add @panelui/prompt`.

## When to use it

Use it for the field a person writes to an assistant in: a question, an instruction, a follow-up. It holds the text, the files attached to it, the tools and model it goes to, and the button that sends it.

It does not talk to a model. `onSubmit` is handed the text and the files, and `status` is how you tell it what the answer is doing: `submitted` and `streaming` turn the send button into a stop button and open the status band, and `error` marks the field.

The field is a card, and what is said about it sits in bands the card overlaps: a banner above for something to do first, a status band below for the answer on its way, and an inset strip below for where the message is going. Each opens and closes with its `open` prop.

For one question asked from anywhere on a page, with the answer listed under it, use [Command Dock](/docs/web/components/command-dock).

## Usage

```tsx
<Prompt onSubmit={send} status={status} onStop={stop}>
  <Prompt.Field>
    <Prompt.Attachments />
    <Prompt.Textarea placeholder="Ask anything" />
    <Prompt.Footer>
      <Prompt.Tools>
        <Prompt.Attach />
        <Prompt.Model items={models} />
      </Prompt.Tools>
      <Prompt.Submit />
    </Prompt.Footer>
  </Prompt.Field>
  <Prompt.Status>Writing the answer</Prompt.Status>
</Prompt>
```

## Parts

```tsx
<Prompt>
  <Prompt.Banner>
    <Prompt.BannerAction />
  </Prompt.Banner>
  <Prompt.Field>
    <Prompt.Attachments />
    <Prompt.Textarea />
    <Prompt.Footer>
      <Prompt.Tools>
        <Prompt.Attach />
        <Prompt.ToolGroup>
          <Prompt.Tool />
        </Prompt.ToolGroup>
        <Prompt.Model />
      </Prompt.Tools>
      <Prompt.Submit />
    </Prompt.Footer>
  </Prompt.Field>
  <Prompt.Status />
  <Prompt.Context>
    <Prompt.ContextItem />
  </Prompt.Context>
  <Prompt.Hint />
</Prompt>
```

- `Prompt.Banner` — A band above the field for something to do first, such as connecting an account. It folds under the field when `open` is false.
- `Prompt.BannerAction` — The banner's button, at its end. It takes everything a [Button](/docs/web/components/button) does, `loading` included.
- `Prompt.Field` — The card that holds the text, the files and the footer. Files dropped on it are attached.
- `Prompt.Attachments` — The attached files: images as thumbnails, anything else as a chip with its name and size, each with a button to remove it. It takes no room while there are none.
- `Prompt.Textarea` — Where the message is written. It grows from two lines to ten. Enter sends, Shift+Enter starts a new line, and a pasted image is attached.
- `Prompt.Footer` — The row under the text, with the tools at its start and the submit button at its end.
- `Prompt.Tools` — A row of tools. It wraps onto a second line when the footer is narrow.
- `Prompt.Tool` — A round button holding an icon. `label` is what a screen reader and the tooltip call it, and `showLabel` writes it beside the icon. With `pressed` and `onPressedChange` it switches on and off.
- `Prompt.ToolGroup` — Tools set together in one well, with the pressed one raised out of it. Use it for modes where one is on at a time.
- `Prompt.Attach` — A tool that opens the file picker.
- `Prompt.Model` — Chooses the model. `items` are `{ value, label, icon, description }`, and the button shows the chosen one's icon and label. `variant="ghost"` has no edge.
- `Prompt.Submit` — Sends the message. While `status` is `submitted` or `streaming` it stops the answer instead, with a ring turning round it. With `onVoice`, it starts voice while the field is empty.
- `Prompt.Status` — A band under the field saying what the answer is doing. It opens while the prompt is busy unless `open` says otherwise.
- `Prompt.Context` — A strip under the field, inset from its edges, for where the message goes: a machine, a branch, a ticket.
- `Prompt.ContextItem` — One fact in the strip, with an icon before it. `onSelect` makes it a button.
- `Prompt.Hint` — A quiet line under the prompt. Without children it says that Shift+Enter starts a new line.

## Props

Every part also takes the props of the element it renders, and a `className`.

#### `PromptProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `value` | `string` | — | What is written in the field, when the caller holds it. |
| `defaultValue` | `string` | `''` | What the field starts with, when the caller does not hold it. |
| `onValueChange` | `(value: string) => void` | — | Called with what is written, each time it changes, and with `''` when it is sent. |
| `onSubmit` | `(message: PromptMessage) => void` | — | Called with the text and the files when the message is sent. |
| `status` | `PromptState` | `'idle'` | Where the answer is. `submitted` and `streaming` stop the field being sent and turn the submit button into a stop button; `error` marks the field. Default `idle`. |
| `onStop` | `() => void` | — | Called when the stop button is pressed. Without it, the button cannot be pressed while busy. |
| `disabled` | `boolean` | `false` | Turns the whole prompt off. |
| `defaultFiles` | `File[]` | — | Files attached to begin with, such as those of a message being edited and sent again. |
| `accept` | `string` | — | Which files can be attached, as for `<input type="file">`: `image/*,.pdf`. Default any. |
| `maxFiles` | `number` | — | How many files can be attached at once. Default no limit. |
| `onReject` | `(files: File[], reason: PromptRejectReason) => void` | — | Called with the files that were not taken, and why. |

#### `PromptBannerProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `open` | `boolean` | — | Whether it is shown. It folds under the field when it is not. Default `true`. |

#### `PromptStatusProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `open` | `boolean` | — | Whether it is shown. Default: while `status` is `submitted` or `streaming`. |
| `icon` | `ReactNode` | — | Something before the words: the model's mark, a tool's icon. |
| `spinner` | `boolean` | — | Whether a spinner turns at its end. Default `true`. |

#### `PromptContextItemProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `onSelect` | `() => void` | — | Called when it is pressed. Passing this makes the item a button. |

#### `PromptToolProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `label` | `string` | **required** | What it does, for a screen reader and for the tooltip. Shown beside the icon with `showLabel`. |
| `pressed` | `boolean` | — | Whether it is switched on, for a tool that stays on. Leave it out for one that acts once. |
| `onPressedChange` | `(pressed: boolean) => void` | — | Called with the new state when a tool with `pressed` is pressed. |
| `showLabel` | `boolean` | `false` | Writes the label beside the icon. |

#### `PromptToolGroupProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `label` | `string` | `'Model'` | What the tools have in common, for a screen reader. |

#### `PromptAttachProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `label` | `string` | `'Model'` | Default `Attach files`. |

#### `PromptModelProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `items` | `readonly PromptModelItem[]` | **required** | The models to choose from. |
| `value` | `string` | — | The chosen model, when the caller holds it. |
| `defaultValue` | `string` | — | The model chosen to begin with, when the caller does not hold it. |
| `onValueChange` | `(value: string) => void` | — | Called with the model's `value` when another is chosen. |
| `variant` | `'pill' \| 'ghost'` | `'pill'` | `pill` has an edge, like the tools beside it. `ghost` has none until hovered. Default `pill`. |
| `label` | `string` | `'Model'` | What a screen reader calls the button. Default `Model`. |
| `className` | `string` | — | — |

#### `PromptSubmitProps`

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `onVoice` | `() => void` | — | Makes the button a voice button while the field is empty. Called when it is pressed. |
| `listening` | `boolean` | `false` | Whether voice is being heard. The bars move while it is. |
| `sendLabel` | `string` | `'Send'` | What a screen reader calls the button while it sends. Default `Send`. |
| `stopLabel` | `string` | `'Stop'` | While it stops the answer. Default `Stop`. |
| `voiceLabel` | `string` | `'Speak'` | While it starts voice. Default `Speak`. |

## In a Server Component

`Prompt` is a client component. A Server Component cannot read `Prompt.Banner` off the import, so import each part by name: `PromptBanner`, `PromptBannerAction`, `PromptField`, `PromptAttachments`, `PromptTextarea`, `PromptFooter`, `PromptTools`, `PromptTool`, `PromptToolGroup`, `PromptAttach`, `PromptModel`, `PromptSubmit`, `PromptStatus`, `PromptContext`, `PromptContextItem`, `PromptHint`.

## Notes

#### Sending

Enter sends and Shift+Enter starts a new line. An Enter that ends a composition in an input method, as when typing Japanese or Chinese, is left to the input method. `onSubmit` is called with `{ text, files }`, the text trimmed, and the field and files are then cleared. Nothing is sent while there is no text and no file, or while `status` is `submitted` or `streaming`.

#### Controlled text

`value` and `onValueChange` hold the text from outside, to fill it from a suggestion or keep a draft. `onValueChange` is called with `''` when the message is sent.

#### The submit button

It has three jobs and changes between them in place, so it never moves under the pointer. It sends while the prompt is idle. It stops the answer while `status` is `submitted` or `streaming`, calling `onStop`, and it cannot be pressed then if `onStop` is not given. With `onVoice` it is a voice button while the field is empty, and its bars move while `listening` is true.

#### Files

Files arrive from `Prompt.Attach`, from a paste and from a drop on the field. `accept` takes the same rules as a file input's, such as `image/*,.pdf`, and `maxFiles` caps how many are held at once. Files that are not taken are passed to `onReject` with the reason, `accept` or `max-files`, so you can say why. Images get a thumbnail from an object URL, which is released when the file is removed.

#### Bands

`Prompt.Banner` and `Prompt.Status` open and close by their `open` prop, folding under the card, and nothing inside a closed band can be focused. The status band opens by itself while the prompt is busy. Its words are lit by a sweep that stops when reduced motion is asked for.

#### Screen readers

The text field is called "Message" unless you give it an `aria-label`. Each tool's `label` is its name, a pressed tool is announced as pressed, and the submit button's name follows its job: Send, Stop or Speak. The status band is a live region, so what it says is read as it changes.

## Example

```tsx
'use client';

import { BrainIcon, GlobeIcon, LightbulbIcon, ShapesIcon, SparklesIcon, ZapIcon } from 'lucide-react';
import { Prompt, type PromptMessage, type PromptState, type PromptModelItem } from '@/components/panelui/prompt';
import { useEffect, useRef, useState } from 'react';

const MODELS: PromptModelItem[] = [
  { value: 'lumen', label: 'Lumen 4', icon: <SparklesIcon />, description: 'Balanced, for most questions' },
  { value: 'lumen-mini', label: 'Lumen 4 Mini', icon: <ZapIcon />, description: 'Quick answers to small asks' },
  { value: 'lumen-deep', label: 'Lumen 4 Deep', icon: <BrainIcon />, description: 'Slower, for hard problems' },
];

type Mode = 'search' | 'think' | 'draw' | null;

export default function PromptAsk() {
  const [status, setStatus] = useState<PromptState>('idle');
  const [mode, setMode] = useState<Mode>('search');
  const [listening, setListening] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  };
  useEffect(() => clear, []);

  // Stands in for a model: a moment to read the question, then a few seconds writing.
  const send = ({ text, files }: PromptMessage) => {
    clear();
    setListening(false);
    setSent(text || `${files.length} file${files.length === 1 ? '' : 's'}`);
    setStatus('submitted');
    timers.current.push(window.setTimeout(() => setStatus('streaming'), 1200));
    timers.current.push(window.setTimeout(() => setStatus('idle'), 4200));
  };

  const toggle = (next: Exclude<Mode, null>) => (on: boolean) => setMode(on ? next : null);

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Prompt
        onSubmit={send}
        status={status}
        onStop={() => {
          clear();
          setStatus('idle');
        }}
      >
        <Prompt.Field>
          <Prompt.Attachments />
          <Prompt.Textarea placeholder="Ask about your notes, or attach a file" />
          <Prompt.Footer>
            <Prompt.Tools>
              <Prompt.Attach />
              <Prompt.ToolGroup label="Mode">
                <Prompt.Tool label="Search the web" pressed={mode === 'search'} onPressedChange={toggle('search')}>
                  <GlobeIcon />
                </Prompt.Tool>
                <Prompt.Tool label="Think it through" pressed={mode === 'think'} onPressedChange={toggle('think')}>
                  <LightbulbIcon />
                </Prompt.Tool>
                <Prompt.Tool label="Sketch a diagram" pressed={mode === 'draw'} onPressedChange={toggle('draw')}>
                  <ShapesIcon />
                </Prompt.Tool>
              </Prompt.ToolGroup>
              <Prompt.Model items={MODELS} />
            </Prompt.Tools>
            <Prompt.Submit onVoice={() => setListening((on) => !on)} listening={listening} />
          </Prompt.Footer>
        </Prompt.Field>
        <Prompt.Status icon={<SparklesIcon />}>
          {status === 'submitted' ? 'Reading your question' : 'Writing the answer'}
        </Prompt.Status>
      </Prompt>
      <p className="px-4 text-xs text-muted-foreground" aria-live="polite">
        {listening ? 'Listening…' : sent ? `Sent: ${sent}` : 'Nothing sent yet.'}
      </p>
    </div>
  );
}
```
