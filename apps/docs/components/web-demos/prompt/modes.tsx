'use client';

import { BrainIcon, GitBranchIcon, GitPullRequestIcon, FolderGit2Icon, LaptopIcon, SparklesIcon, ZapIcon } from 'lucide-react';
import { Prompt, type PromptModelItem, type PromptTaskStatus } from 'panelui-web/prompt';
import { Tabs } from 'panelui-web/tabs';
import { useState } from 'react';

const MODELS: PromptModelItem[] = [
  { value: 'lumen', label: 'Lumen 4', icon: <SparklesIcon />, description: 'Balanced, for most questions' },
  { value: 'lumen-mini', label: 'Lumen 4 Mini', icon: <ZapIcon />, description: 'Quick answers to small asks' },
  { value: 'lumen-deep', label: 'Lumen 4 Deep', icon: <BrainIcon />, description: 'Slower, for hard problems' },
];

const MODES = [
  { value: 'connect', label: 'Banner' },
  { value: 'tasks', label: 'Tasks' },
  { value: 'writing', label: 'Writing' },
  { value: 'project', label: 'Project' },
];

const TASKS: [string, PromptTaskStatus][] = [
  ['Read the open pull requests', 'done'],
  ['Group the changes by area', 'done'],
  ['Draft the release notes', 'active'],
  ['Bump the version to 2.4.0', 'pending'],
  ['Tag the release', 'pending'],
];

export default function PromptModes() {
  // In an app this follows what the assistant is doing; here the tabs set it.
  const [mode, setMode] = useState('connect');

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-5">
      <Tabs value={mode} onValueChange={(value) => setMode(value as string)}>
        <Tabs.List aria-label="Prompt mode">
          {MODES.map((item) => (
            <Tabs.Trigger key={item.value} value={item.value}>
              {item.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs>
      <Prompt mode={mode} status={mode === 'writing' ? 'streaming' : 'idle'} onStop={() => setMode('project')}>
        <Prompt.Banner mode="connect">
          <FolderGit2Icon />
          <span className="truncate">Connect a repository to start working in it</span>
          <Prompt.BannerAction onClick={() => setMode('tasks')}>Connect</Prompt.BannerAction>
        </Prompt.Banner>
        <Prompt.Tasks mode="tasks" title="Preparing release 2.4.0">
          {TASKS.map(([task, status]) => (
            <Prompt.Task key={task} status={status}>
              {task}
            </Prompt.Task>
          ))}
        </Prompt.Tasks>
        <Prompt.Field>
          <Prompt.Textarea placeholder="Ask for a change or a follow-up" />
          <Prompt.Footer>
            <Prompt.Tools>
              <Prompt.Menu>
                <Prompt.AttachItem />
              </Prompt.Menu>
              <Prompt.Model items={MODELS} defaultValue="lumen-deep" variant="ghost" />
            </Prompt.Tools>
            <Prompt.Submit />
          </Prompt.Footer>
        </Prompt.Field>
        <Prompt.Status mode="writing">Writing the release notes</Prompt.Status>
        <Prompt.Context mode="project">
          <Prompt.ContextItem>
            <LaptopIcon />
            This machine
          </Prompt.ContextItem>
          <Prompt.ContextItem>
            <GitPullRequestIcon />
            #482
          </Prompt.ContextItem>
          <Prompt.ContextItem>
            <GitBranchIcon />
            release/2.4.0
          </Prompt.ContextItem>
        </Prompt.Context>
      </Prompt>
    </div>
  );
}
