'use client';

import { BrainIcon, SparklesIcon, ZapIcon } from 'lucide-react';
import { Prompt, type PromptState, type PromptModelItem } from 'panelui-web/prompt';
import { useEffect, useRef, useState } from 'react';

const MODELS: PromptModelItem[] = [
  { value: 'lumen', label: 'Lumen 4', icon: <SparklesIcon />, description: 'Balanced, for most questions' },
  { value: 'lumen-mini', label: 'Lumen 4 Mini', icon: <ZapIcon />, description: 'Quick answers to small asks' },
  { value: 'lumen-deep', label: 'Lumen 4 Deep', icon: <BrainIcon />, description: 'Slower, for hard problems' },
];

export default function PromptThinking() {
  // Busy from the start, so the page opens on the state this example is about.
  const [status, setStatus] = useState<PromptState>('streaming');
  const timer = useRef<number | undefined>(undefined);

  const run = () => {
    window.clearTimeout(timer.current);
    setStatus('submitted');
    timer.current = window.setTimeout(() => setStatus('streaming'), 1000);
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Prompt status={status} onStop={() => setStatus('idle')} onSubmit={run}>
        <Prompt.Field>
          <Prompt.Textarea placeholder="Hang on, the answer is still being written" />
          <Prompt.Footer>
            <Prompt.Tools>
              <Prompt.Attach />
              <Prompt.Model items={MODELS} defaultValue="lumen-deep" />
            </Prompt.Tools>
            <Prompt.Submit />
          </Prompt.Footer>
        </Prompt.Field>
        <Prompt.Status icon={<SparklesIcon />}>
          {status === 'submitted' ? 'Reading the question' : 'Thinking about the trade-offs'}
        </Prompt.Status>
      </Prompt>
      <p className="px-4 text-xs text-muted-foreground" aria-live="polite">
        {status === 'idle' ? 'Stopped. Send anything to start again.' : 'Press the stop button to end the answer.'}
      </p>
    </div>
  );
}
