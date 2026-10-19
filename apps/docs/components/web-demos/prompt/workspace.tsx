'use client';

import { AtSignIcon, BrainIcon, GitBranchIcon, GitPullRequestIcon, LaptopIcon, SparklesIcon, TerminalIcon, ZapIcon } from 'lucide-react';
import { Menu } from 'panelui-web/menu';
import { Prompt, type PromptModelItem } from 'panelui-web/prompt';
import { Select } from 'panelui-web/select';

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
  return (
    <div className="w-full max-w-xl">
      <Prompt>
        <Prompt.Field>
          <Prompt.Textarea placeholder="Ask for a change, follow up, or attach a screenshot" />
          <Prompt.Footer>
            <Prompt.Tools>
              <Prompt.Menu>
                <Prompt.AttachItem>Add a screenshot</Prompt.AttachItem>
                <Menu.Item>
                  <AtSignIcon />
                  Mention a file
                  <Menu.Shortcut>@</Menu.Shortcut>
                </Menu.Item>
                <Menu.Item>
                  <TerminalIcon />
                  Add terminal output
                </Menu.Item>
              </Prompt.Menu>
              <Prompt.Model items={MODELS} variant="ghost" />
            </Prompt.Tools>
            <Prompt.Tools>
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
