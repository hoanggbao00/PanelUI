'use client';

import { BrainIcon, CalendarIcon, CheckIcon, GlobeIcon, LightbulbIcon, SparklesIcon, ZapIcon } from 'lucide-react';
import { Menu } from 'panelui-web/menu';
import { Prompt, type PromptModelItem } from 'panelui-web/prompt';
import { useState } from 'react';

const MODELS: PromptModelItem[] = [
  { value: 'lumen', label: 'Lumen 4', icon: <SparklesIcon />, description: 'Balanced, for most questions' },
  { value: 'lumen-mini', label: 'Lumen 4 Mini', icon: <ZapIcon />, description: 'Quick answers to small asks' },
  { value: 'lumen-deep', label: 'Lumen 4 Deep', icon: <BrainIcon />, description: 'Slower, for hard problems' },
];

export default function PromptBanner() {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [search, setSearch] = useState(true);
  const [think, setThink] = useState(false);

  const connect = () => {
    setConnecting(true);
    window.setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 1100);
  };

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Prompt defaultValue="Move Thursday's design review to Friday at ten, and let everyone on it know">
        <Prompt.Banner open={!connected}>
          <CalendarIcon />
          <span className="truncate">Connect your calendar to book and move meetings</span>
          <Prompt.BannerAction loading={connecting} onClick={connect}>
            Connect
          </Prompt.BannerAction>
        </Prompt.Banner>
        <Prompt.Field>
          <Prompt.Textarea placeholder="Ask anything" />
          <Prompt.Footer>
            <Prompt.Tools>
              <Prompt.Menu>
                <Prompt.AttachItem />
                <Menu.Separator />
                <Menu.CheckboxItem checked={search} onCheckedChange={setSearch}>
                  <GlobeIcon />
                  Search the web
                </Menu.CheckboxItem>
                <Menu.CheckboxItem checked={think} onCheckedChange={setThink}>
                  <LightbulbIcon />
                  Think longer
                </Menu.CheckboxItem>
              </Prompt.Menu>
              {search ? (
                <Prompt.Tool label="Search" showLabel pressed onPressedChange={setSearch}>
                  <GlobeIcon />
                </Prompt.Tool>
              ) : null}
              {think ? (
                <Prompt.Tool label="Think" showLabel pressed onPressedChange={setThink}>
                  <LightbulbIcon />
                </Prompt.Tool>
              ) : null}
              <Prompt.Model items={MODELS} variant="ghost" />
            </Prompt.Tools>
            <Prompt.Submit />
          </Prompt.Footer>
        </Prompt.Field>
        <Prompt.Hint />
      </Prompt>
      <p className="px-4 text-xs text-muted-foreground" aria-live="polite">
        {connected ? (
          <span className="inline-flex items-center gap-1.5">
            <CheckIcon className="size-3.5" /> Calendar connected.
          </span>
        ) : (
          'Press Connect to see the banner fold away.'
        )}
      </p>
    </div>
  );
}
