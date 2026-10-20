import { FileSpreadsheetIcon } from 'lucide-react';
import { Message } from 'panelui-web/message';

export default function MessageAttachmentsDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <Message from="user">
        <Message.Content>
          <Message.Attachments>
            <Message.Attachment name="Shelf, before" src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=60" />
            <Message.Attachment name="Stock count.xlsx" meta="Spreadsheet · 48 KB" icon={<FileSpreadsheetIcon />} />
          </Message.Attachments>
          <Message.Bubble>
            <Message.BubbleContent>Which of these are we about to run out of?</Message.BubbleContent>
          </Message.Bubble>
        </Message.Content>
      </Message>
      <Message from="assistant">
        <Message.Content>
          <Message.Bubble>
            <Message.BubbleContent>
              <p>
                Two lines are below a week of stock: <strong>linen cushions</strong> (4 left, 9 sold a week) and the{' '}
                <strong>oak side table</strong> (1 left). Everything on the shelf in the photo has more than a month.
              </p>
            </Message.BubbleContent>
          </Message.Bubble>
        </Message.Content>
      </Message>
    </div>
  );
}
