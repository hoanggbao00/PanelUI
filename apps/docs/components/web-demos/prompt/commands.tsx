'use client';

import {
  ALargeSmallIcon,
  BrainIcon,
  LanguagesIcon,
  ListTreeIcon,
  SparklesIcon,
  TableIcon,
  TextQuoteIcon,
  WandSparklesIcon,
  ZapIcon,
} from 'lucide-react';
import { Prompt, type PromptCommandItem, type PromptModelItem } from 'panelui-web/prompt';
import { useState } from 'react';

const MODELS: PromptModelItem[] = [
  { value: 'lumen', label: 'Lumen 4', icon: <SparklesIcon />, description: 'Balanced, for most questions' },
  { value: 'lumen-mini', label: 'Lumen 4 Mini', icon: <ZapIcon />, description: 'Quick answers to small asks' },
  { value: 'lumen-deep', label: 'Lumen 4 Deep', icon: <BrainIcon />, description: 'Slower, for hard problems' },
];

const COMMANDS: PromptCommandItem[] = [
  { value: 'summarise', icon: <TextQuoteIcon />, description: 'Cut it down to the points that matter' },
  { value: 'translate', icon: <LanguagesIcon />, description: 'Into any language, keeping the tone' },
  { value: 'rewrite', icon: <WandSparklesIcon />, description: 'Same meaning, clearer words' },
  { value: 'outline', icon: <ListTreeIcon />, description: 'Headings and bullets to start from' },
  { value: 'table', icon: <TableIcon />, description: 'Turn a list into rows and columns' },
  { value: 'shorter', icon: <ALargeSmallIcon />, description: 'Half the length, nothing lost' },
];

export default function PromptCommands() {
  const [command, setCommand] = useState<PromptCommandItem | null>(null);

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      {/* Opens on the trigger, so the list is showing before anything is typed. */}
      <Prompt defaultValue="/">
        <Prompt.Commands items={COMMANDS} onSelect={setCommand} />
        <Prompt.Field>
          <Prompt.Textarea placeholder="Type / for commands" />
          <Prompt.Footer>
            <Prompt.Tools>
              <Prompt.Menu>
                <Prompt.AttachItem />
              </Prompt.Menu>
              {command ? (
                <Prompt.Tool label={`/${command.value}`} showLabel pressed onPressedChange={() => setCommand(null)}>
                  {command.icon}
                </Prompt.Tool>
              ) : null}
              <Prompt.Model items={MODELS} variant="ghost" />
            </Prompt.Tools>
            <Prompt.Submit />
          </Prompt.Footer>
        </Prompt.Field>
      </Prompt>
      <p className="px-4 text-xs text-muted-foreground">Arrow keys to move, Enter or Tab to choose, Escape to close.</p>
    </div>
  );
}
