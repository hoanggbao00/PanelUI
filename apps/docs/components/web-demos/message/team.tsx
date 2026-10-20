import { Message } from 'panelui-web/message';

export default function MessageTeam() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      {/* In a shared thread the person's name matters, so the header carries it. */}
      <Message.Group from="user">
        <Message>
          <Message.Content>
            <Message.Header>
              <strong>Noor Haddad</strong> 10:42
            </Message.Header>
            <Message.Bubble>
              <Message.BubbleContent>Summarise the launch thread for Ravi?</Message.BubbleContent>
            </Message.Bubble>
          </Message.Content>
        </Message>
        <Message>
          <Message.Content>
            <Message.Bubble>
              <Message.BubbleContent>Just the decisions, not the discussion.</Message.BubbleContent>
            </Message.Bubble>
            <Message.Footer>Seen by Ravi</Message.Footer>
          </Message.Content>
        </Message>
      </Message.Group>
      <Message from="assistant">
        <Message.Content>
          <Message.Header>
            <strong>Assistant</strong> read 46 messages
          </Message.Header>
          <Message.Bubble>
            <Message.BubbleContent>
              <ul>
                <li>Launch moves to Tuesday 3 November.</li>
                <li>Pricing stays as it is until January.</li>
                <li>Ravi owns the press note.</li>
              </ul>
            </Message.BubbleContent>
          </Message.Bubble>
          <Message.Footer>3 decisions · from 46 messages</Message.Footer>
        </Message.Content>
      </Message>
    </div>
  );
}
