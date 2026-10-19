import { Button } from 'panelui-web/button';
import { Menu } from 'panelui-web/menu';

export default function MenuDemo() {
  return (
    <Menu>
      <Menu.Trigger render={<Button variant="outline" />}>Open</Menu.Trigger>
      <Menu.Content className="w-56">
        <Menu.Group>
          <Menu.GroupLabel>Workspace</Menu.GroupLabel>
          <Menu.Item>
            Profile
            <Menu.Shortcut>⇧⌘P</Menu.Shortcut>
          </Menu.Item>
          <Menu.Item>
            Plan and billing
            <Menu.Shortcut>⌘B</Menu.Shortcut>
          </Menu.Item>
          <Menu.Item>
            Preferences
            <Menu.Shortcut>⌘,</Menu.Shortcut>
          </Menu.Item>
        </Menu.Group>
        <Menu.Separator />
        <Menu.Group>
          <Menu.Item>Members</Menu.Item>
          <Menu.Sub>
            <Menu.SubTrigger>Invite people</Menu.SubTrigger>
            <Menu.SubContent>
              <Menu.Item>By email</Menu.Item>
              <Menu.Item>With a link</Menu.Item>
              <Menu.Separator />
              <Menu.Item>From another workspace</Menu.Item>
            </Menu.SubContent>
          </Menu.Sub>
          <Menu.Item>
            New project
            <Menu.Shortcut>⌘N</Menu.Shortcut>
          </Menu.Item>
        </Menu.Group>
        <Menu.Separator />
        <Menu.Item>Help centre</Menu.Item>
        <Menu.Item disabled>Status page</Menu.Item>
        <Menu.Separator />
        <Menu.Item>
          Sign out
          <Menu.Shortcut>⇧⌘Q</Menu.Shortcut>
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}
