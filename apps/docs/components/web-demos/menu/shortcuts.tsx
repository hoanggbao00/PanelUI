import { Button } from 'panelui-web/button';
import { Menu } from 'panelui-web/menu';

export default function MenuShortcuts() {
  return (
    <Menu>
      <Menu.Trigger render={<Button variant="outline" />}>Edit</Menu.Trigger>
      <Menu.Content className="w-48">
        <Menu.Item>
          Undo
          <Menu.Shortcut>⌘Z</Menu.Shortcut>
        </Menu.Item>
        <Menu.Item>
          Redo
          <Menu.Shortcut>⇧⌘Z</Menu.Shortcut>
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item>
          Cut
          <Menu.Shortcut>⌘X</Menu.Shortcut>
        </Menu.Item>
        <Menu.Item>
          Copy
          <Menu.Shortcut>⌘C</Menu.Shortcut>
        </Menu.Item>
        <Menu.Item>
          Paste
          <Menu.Shortcut>⌘V</Menu.Shortcut>
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}
