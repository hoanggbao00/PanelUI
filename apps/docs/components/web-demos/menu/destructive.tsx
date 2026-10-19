import { ArchiveIcon, CopyIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { Button } from 'panelui-web/button';
import { Menu } from 'panelui-web/menu';

export default function MenuDestructive() {
  return (
    <Menu>
      <Menu.Trigger render={<Button variant="outline" />}>Project</Menu.Trigger>
      <Menu.Content>
        <Menu.Item>
          <PencilIcon />
          Rename
        </Menu.Item>
        <Menu.Item>
          <CopyIcon />
          Duplicate
        </Menu.Item>
        <Menu.Item>
          <ArchiveIcon />
          Archive
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item variant="destructive">
          <Trash2Icon />
          Delete project
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}
