'use client';

import { BrainIcon, GlobeIcon, LightbulbIcon, ShapesIcon, SparklesIcon, ZapIcon } from 'lucide-react';
import { Prompt, type PromptMessage, type PromptState, type PromptModelItem } from 'panelui-web/prompt';
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
