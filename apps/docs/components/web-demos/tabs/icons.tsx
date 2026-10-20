'use client';

import { ArchiveIcon, AtSignIcon, InboxIcon, SendIcon } from 'lucide-react';
import { Tabs } from 'panelui-web/tabs';

export default function TabsIcons() {
  return (
    <Tabs variant="underline" defaultValue="inbox" className="w-full max-w-lg">
      <Tabs.List aria-label="Mail">
        <Tabs.Trigger value="inbox">
          <InboxIcon /> Inbox <Tabs.Badge>14</Tabs.Badge>
        </Tabs.Trigger>
        <Tabs.Trigger value="mentions">
          <AtSignIcon /> Mentions <Tabs.Badge>2</Tabs.Badge>
        </Tabs.Trigger>
        <Tabs.Trigger value="sent">
          <SendIcon /> Sent
        </Tabs.Trigger>
        <Tabs.Trigger value="archive">
          <ArchiveIcon /> Archive
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="inbox" className="text-sm text-muted-foreground">
        Fourteen unread, the oldest from Monday.
      </Tabs.Content>
      <Tabs.Content value="mentions" className="text-sm text-muted-foreground">
        Two threads mention you.
      </Tabs.Content>
      <Tabs.Content value="sent" className="text-sm text-muted-foreground">
        Last sent yesterday at 18:12.
      </Tabs.Content>
      <Tabs.Content value="archive" className="text-sm text-muted-foreground">
        1,208 archived conversations.
      </Tabs.Content>
    </Tabs>
  );
}
