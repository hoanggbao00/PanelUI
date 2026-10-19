'use client';

import { BrainIcon, GlobeIcon, LightbulbIcon, ShapesIcon, SparklesIcon, ZapIcon } from 'lucide-react';
import { Prompt, type PromptModelItem } from 'panelui-web/prompt';

const MODELS: PromptModelItem[] = [
  { value: 'lumen', label: 'Lumen 4', icon: <SparklesIcon />, description: 'Balanced, for most questions' },
  { value: 'lumen-mini', label: 'Lumen 4 Mini', icon: <ZapIcon />, description: 'Quick answers to small asks' },
  { value: 'lumen-deep', label: 'Lumen 4 Deep', icon: <BrainIcon />, description: 'Slower, for hard problems' },
];

export default function PromptThumb() {
  return (
    <div className="w-[24rem] shrink-0 scale-[0.66]">
      <Prompt defaultValue="Summarise this week's support tickets">
        <Prompt.Field>
          <Prompt.Textarea minRows={1} />
          <Prompt.Footer>
            <Prompt.Tools>
              <Prompt.Attach />
              <Prompt.ToolGroup label="Mode">
                <Prompt.Tool label="Search the web" pressed>
                  <GlobeIcon />
                </Prompt.Tool>
                <Prompt.Tool label="Think it through" pressed={false}>
                  <LightbulbIcon />
                </Prompt.Tool>
                <Prompt.Tool label="Sketch a diagram" pressed={false}>
                  <ShapesIcon />
                </Prompt.Tool>
              </Prompt.ToolGroup>
              <Prompt.Model items={MODELS} />
            </Prompt.Tools>
            <Prompt.Submit />
          </Prompt.Footer>
        </Prompt.Field>
      </Prompt>
    </div>
  );
}
