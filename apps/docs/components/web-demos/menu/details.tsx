import { BellIcon, CalendarIcon, FolderIcon, MessageSquareIcon, TriangleAlertIcon } from 'lucide-react';
import { Button } from 'panelui-web/button';
import { Menu } from 'panelui-web/menu';

export default function MenuDetails() {
  return (
    <Menu>
      <Menu.Trigger render={<Button variant="outline" />}>Connections</Menu.Trigger>
      <Menu.Content className="w-80">
        <Menu.Item>
          <CalendarIcon />
          Calendar
          <Menu.Description>Book and move meetings</Menu.Description>
        </Menu.Item>
        <Menu.Item>
          <FolderIcon />
          Shared drive
          <Menu.Description>Read your team's files</Menu.Description>
          <Menu.Badge>
            <TriangleAlertIcon />
            Sign in
          </Menu.Badge>
        </Menu.Item>
        <Menu.Item>
          <MessageSquareIcon />
          Chat
          <Menu.Description>Post to channels</Menu.Description>
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item>
          <BellIcon />
          Notifications
          <Menu.Badge>3</Menu.Badge>
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}
