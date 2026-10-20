'use client';

import { Message } from 'panelui-web/message';
import { Sources } from 'panelui-web/sources';

export default function SourcesInMessage() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <Message from="user">
        <Message.Content>
          <Message.Bubble>
            <Message.BubbleContent>Can I walk to Holy Island this afternoon?</Message.BubbleContent>
          </Message.Bubble>
        </Message.Content>
      </Message>
      <Message from="assistant">
        <Message.Content>
          {/* Sources sits inside the answer's content, round the text it cites. */}
          <Sources>
            <Sources.Trigger />
            <Sources.Content>
              <Sources.Source href="https://tides.example/holy-island" title="Safe crossing times, this week" snippet="Today: safe until 13:10, then from 20:35." />
              <Sources.Source href="https://causeway.example/advice" title="Before you cross" snippet="Allow an hour on foot for the Pilgrims’ Way." />
            </Sources.Content>
            <Message.Bubble className="mt-2">
              <Message.BubbleContent>
                <p>
                  Not on foot after lunch. <Sources.Citation index={1}>The causeway is safe until 13:10</Sources.Citation>,
                  and <Sources.Citation index={2}>the walk takes about an hour</Sources.Citation>, so you would need to
                  leave by noon. It opens again at 20:35<Sources.Citation index={1} />.
                </p>
              </Message.BubbleContent>
            </Message.Bubble>
          </Sources>
        </Message.Content>
      </Message>
    </div>
  );
}
