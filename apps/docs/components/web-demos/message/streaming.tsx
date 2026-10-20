'use client';

import { RotateCcwIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'panelui-web/button';
import { Message } from 'panelui-web/message';

const REPLY =
  'The tide is lowest at 14:12 today, at 0.6 metres. The causeway is usually walkable for about two hours either side, so leave the island by 15:40 at the latest.';

type Phase = 'thinking' | 'writing' | 'done';

export default function MessageStreaming() {
  const [phase, setPhase] = useState<Phase>('thinking');
  const [words, setWords] = useState(0);
  const [run, setRun] = useState(0);
  const timer = useRef<number | undefined>(undefined);

  // Stands in for a model: a moment to look the tides up, then a word at a time.
  useEffect(() => {
    const all = REPLY.split(' ').length;
    setPhase('thinking');
    setWords(0);
    let count = 0;
    timer.current = window.setTimeout(function next() {
      setPhase('writing');
      count += 1 + Math.floor(Math.random() * 2);
      setWords(Math.min(count, all));
      if (count < all) timer.current = window.setTimeout(next, 60 + Math.random() * 90);
      else setPhase('done');
    }, 1600);
    return () => window.clearTimeout(timer.current);
  }, [run]);

  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <Message from="user">
        <Message.Content>
          <Message.Bubble>
            <Message.BubbleContent>When can I walk back from the island today?</Message.BubbleContent>
          </Message.Bubble>
        </Message.Content>
      </Message>
      <Message from="assistant" streaming={phase === 'writing'}>
        <Message.Content>
          {phase === 'thinking' ? (
            <Message.Status>Checking today’s tide table</Message.Status>
          ) : (
            <Message.Bubble>
              <Message.BubbleContent>{REPLY.split(' ').slice(0, words).join(' ')}</Message.BubbleContent>
            </Message.Bubble>
          )}
          {phase === 'done' ? (
            <Message.Actions>
              <Message.Action label="Copy" copy={REPLY} />
            </Message.Actions>
          ) : null}
        </Message.Content>
      </Message>
      <Button variant="outline" size="sm" className="self-start" onClick={() => setRun(run + 1)}>
        <RotateCcwIcon /> Replay
      </Button>
    </div>
  );
}
