import { Message } from 'panelui-web/message';

export default function MessageThumb() {
  return (
    <div className="flex w-64 flex-col gap-4">
      <Message from="user">
        <Message.Content>
          <Message.Bubble>
            <Message.BubbleContent>Shorter, please.</Message.BubbleContent>
          </Message.Bubble>
        </Message.Content>
      </Message>
      <Message from="assistant">
        <Message.Content>
          <Message.Bubble>
            <Message.BubbleContent>Done: three lines, one idea each.</Message.BubbleContent>
          </Message.Bubble>
          <Message.Actions>
            <Message.Action label="Copy" copy="Done: three lines, one idea each." />
          </Message.Actions>
        </Message.Content>
      </Message>
    </div>
  );
}
