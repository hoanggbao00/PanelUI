'use client';

import { BrainIcon, SparklesIcon, ZapIcon } from 'lucide-react';
import { Prompt, type PromptModelItem } from 'panelui-web/prompt';
import { useEffect, useState } from 'react';

const MODELS: PromptModelItem[] = [
  { value: 'lumen', label: 'Lumen 4', icon: <SparklesIcon />, description: 'Balanced, for most questions' },
  { value: 'lumen-mini', label: 'Lumen 4 Mini', icon: <ZapIcon />, description: 'Quick answers to small asks' },
  { value: 'lumen-deep', label: 'Lumen 4 Deep', icon: <BrainIcon />, description: 'Slower, for hard problems' },
];

/** What is "heard". A real app would get these words from speech to text as they arrive. */
const WORDS = 'Find a table for four near the office on Friday, somewhere quiet enough to talk'.split(' ');

export default function PromptVoice() {
  const [recording, setRecording] = useState(true);
  const [heard, setHeard] = useState(0);
  const [text, setText] = useState('');

  // The words arrive one at a time while recording, after a moment of silence.
  useEffect(() => {
    if (!recording || heard >= WORDS.length) return;
    const timer = window.setTimeout(() => setHeard((count) => count + 1), heard === 0 ? 1400 : 320);
    return () => window.clearTimeout(timer);
  }, [recording, heard]);

  const start = () => {
    setHeard(0);
    setRecording(true);
  };

  return (
    <div className="w-full max-w-xl">
      <Prompt value={text} onValueChange={setText}>
        <Prompt.Field>
          {recording ? (
            <Prompt.Recorder
              transcript={WORDS.slice(0, heard).join(' ')}
              onCancel={() => setRecording(false)}
              onDone={() => {
                setRecording(false);
                setText(WORDS.slice(0, Math.max(heard, 1)).join(' '));
              }}
            />
          ) : (
            <>
              <Prompt.Textarea placeholder="Ask anything, or press the wave to talk" />
              <Prompt.Footer>
                <Prompt.Tools>
                  <Prompt.Menu>
                    <Prompt.AttachItem />
                  </Prompt.Menu>
                  <Prompt.Model items={MODELS} variant="ghost" />
                </Prompt.Tools>
                <Prompt.Submit onVoice={start} />
              </Prompt.Footer>
            </>
          )}
        </Prompt.Field>
      </Prompt>
    </div>
  );
}
