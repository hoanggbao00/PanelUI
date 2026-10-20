'use client';

import { RotateCcwIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { useState } from 'react';
import { Message } from 'panelui-web/message';

const ANSWER =
  'Scale everything by 1.5, then round to what a kitchen measures. 300 g flour, 3 eggs, 375 ml milk and a pinch more salt. Bake in two tins rather than one deep one, at the same 180 °C for 25 minutes.';


export default function MessageConversation() {
  const [rating, setRating] = useState<'up' | 'down' | null>(null);

  return (
    <div className="flex w-full max-w-xl flex-col gap-8">
      <Message from="user">
        <Message.Content>
          <Message.Bubble>
            <Message.BubbleContent>This sponge serves four. How do I make it for six?</Message.BubbleContent>
          </Message.Bubble>
        </Message.Content>
      </Message>

      <Message from="assistant">
        <Message.Content>
          <Message.Bubble>
            <Message.BubbleContent>
              <p>
                Multiply by <strong>1.5</strong> and round to what you can weigh:
              </p>
              <ul>
                <li>300 g self-raising flour</li>
                <li>3 eggs, where the original had two</li>
                <li>375 ml milk</li>
              </ul>
              <p>Bake in two tins rather than one deeper one, at the same 180 °C for about 25 minutes.</p>
            </Message.BubbleContent>
          </Message.Bubble>
          <Message.Actions>
            <Message.Action label="Copy" copy={ANSWER} />
            <Message.Action label="Good answer" pressed={rating === 'up'} onClick={() => setRating(rating === 'up' ? null : 'up')}>
              <ThumbsUpIcon />
            </Message.Action>
            <Message.Action label="Bad answer" pressed={rating === 'down'} onClick={() => setRating(rating === 'down' ? null : 'down')}>
              <ThumbsDownIcon />
            </Message.Action>
            <Message.Action label="Try again">
              <RotateCcwIcon />
            </Message.Action>
          </Message.Actions>
        </Message.Content>
      </Message>

      <Message from="user">
        <Message.Content>
          <Message.Bubble>
            <Message.BubbleContent>And without eggs?</Message.BubbleContent>
          </Message.Bubble>
        </Message.Content>
      </Message>

      <Message from="assistant" streaming>
        <Message.Content>
          <Message.Bubble>
            <Message.BubbleContent>
              <p>Use 3 tablespoons of aquafaba for each egg, whisked until it holds soft peaks. Fold it in last, and</p>
            </Message.BubbleContent>
          </Message.Bubble>
        </Message.Content>
      </Message>
    </div>
  );
}
