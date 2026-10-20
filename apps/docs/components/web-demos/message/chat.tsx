'use client';

import { useEffect, useRef, useState } from 'react';
import { Message } from 'panelui-web/message';
import { Prompt, type PromptMessage, type PromptState } from 'panelui-web/prompt';

interface Turn {
  id: number;
  from: 'user' | 'assistant';
  text: string;
}

const REPLIES = [
  'Good question. Start with the smallest change that tells you something: one page, one week, one number to watch.',
  'I would write it down first. A plan that only lives in your head changes every time you look at it.',
  'Two options: do it now and accept a rough first version, or wait until Friday and do it properly. Both are fine; pick on purpose.',
];

export default function MessageChat() {
  const [turns, setTurns] = useState<Turn[]>([
    { id: 0, from: 'assistant', text: 'Ask me anything. I will answer with something short.' },
  ]);
  const [status, setStatus] = useState<PromptState>('idle');
  const timer = useRef<number | undefined>(undefined);
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  // Keeps the newest turn in view. The column is scrolled, not the page.
  useEffect(() => {
    const column = scroller.current;
    if (column) column.scrollTop = column.scrollHeight;
  }, [turns, status]);

  // Stands in for a model: a pause, then the reply a few words at a time.
  const send = ({ text }: PromptMessage) => {
    if (!text.trim()) return;
    const reply = REPLIES[turns.length % REPLIES.length]!;
    const id = turns.length + 1;
    setTurns((all) => [...all, { id, from: 'user', text }, { id: id + 1, from: 'assistant', text: '' }]);
    setStatus('submitted');
    const words = reply.split(' ');
    let count = 0;
    timer.current = window.setTimeout(function next() {
      setStatus('streaming');
      count += 2;
      setTurns((all) => all.map((turn) => (turn.id === id + 1 ? { ...turn, text: words.slice(0, count).join(' ') } : turn)));
      if (count < words.length) timer.current = window.setTimeout(next, 90);
      else setStatus('idle');
    }, 900);
  };

  return (
    <div className="flex h-[30rem] w-full max-w-xl flex-col gap-4">
      <div ref={scroller} className="-mx-2 flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-2 pt-2">
        {turns.map((turn, index) => {
          const last = index === turns.length - 1;
          const writing = last && turn.from === 'assistant' && status !== 'idle';
          return (
            <Message key={turn.id} from={turn.from} streaming={writing && status === 'streaming'}>
              <Message.Content>
                {writing && status === 'submitted' ? (
                  <Message.Status>Thinking</Message.Status>
                ) : (
                  <Message.Bubble>
                    <Message.BubbleContent>{turn.text}</Message.BubbleContent>
                  </Message.Bubble>
                )}
                {turn.from === 'assistant' && !writing && index > 0 ? (
                  <Message.Actions reveal={last ? 'always' : 'hover'}>
                    <Message.Action label="Copy" copy={turn.text} />
                  </Message.Actions>
                ) : null}
              </Message.Content>
            </Message>
          );
        })}
      </div>
      <Prompt onSubmit={send} status={status} onStop={() => (window.clearTimeout(timer.current), setStatus('idle'))}>
        <Prompt.Field>
          <Prompt.Textarea placeholder="Ask something" />
          <Prompt.Footer>
            <Prompt.Tools />
            <Prompt.Submit />
          </Prompt.Footer>
        </Prompt.Field>
      </Prompt>
    </div>
  );
}
