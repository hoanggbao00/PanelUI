'use client';

import { BrainIcon, GitBranchIcon, GitPullRequestIcon, LaptopIcon, ListChecksIcon, SparklesIcon, ZapIcon } from 'lucide-react';
import { Prompt, type PromptModelItem } from 'panelui-web/prompt';
import { Select } from 'panelui-web/select';
import { useState } from 'react';

const MODELS: PromptModelItem[] = [
  { value: 'lumen', label: 'Lumen 4', icon: <SparklesIcon />, description: 'Balanced, for most questions' },
  { value: 'lumen-mini', label: 'Lumen 4 Mini', icon: <ZapIcon />, description: 'Quick answers to small asks' },
  { value: 'lumen-deep', label: 'Lumen 4 Deep', icon: <BrainIcon />, description: 'Slower, for hard problems' },
];

const BRANCHES = [
  { value: 'feat/prompt', label: 'feat/prompt-footer-tools' },
  { value: 'fix/planet', label: 'fix/planet-stacking' },
  { value: 'main', label: 'main' },
];

export default function PromptWorkspace() {
  const [plan, setPlan] = useState(false);

  return (
    <div className="w-full max-w-xl">
      <Prompt>
        <Prompt.Field>
          <Prompt.Textarea placeholder="Ask for a change, follow up, or attach a screenshot" />
          <Prompt.Footer>
            <Prompt.Tools>
              <Prompt.Model items={MODELS} variant="ghost" />
              <Prompt.Tool label="Plan first" showLabel variant="ghost" pressed={plan} onPressedChange={setPlan}>
                <ListChecksIcon />
              </Prompt.Tool>
            </Prompt.Tools>
            <Prompt.Tools>
              <Prompt.Attach variant="ghost" />
              <Prompt.Submit />
            </Prompt.Tools>
          </Prompt.Footer>
        </Prompt.Field>
        <Prompt.Context>
          <Prompt.ContextItem>
            <LaptopIcon />
            This machine
          </Prompt.ContextItem>
          <Prompt.ContextItem>
            <GitPullRequestIcon />
            #482
          </Prompt.ContextItem>
          <Select items={BRANCHES} defaultValue="feat/prompt">
            <Select.Trigger variant="ghost" size="sm" aria-label="Branch" className="-my-1 ms-auto h-7 max-w-52 text-xs">
              <GitBranchIcon className="size-3.5" />
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              {BRANCHES.map((branch) => (
                <Select.Item key={branch.value} value={branch.value}>
                  {branch.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </Prompt.Context>
      </Prompt>
    </div>
  );
}
