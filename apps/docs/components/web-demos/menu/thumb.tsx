import { EllipsisIcon, PencilIcon } from 'lucide-react';
import { Button } from 'panelui-web/button';
import { Menu } from 'panelui-web/menu';

export default function MenuThumb() {
  return (
    <div className="flex gap-2">
      <Menu>
        <Menu.Trigger render={<Button variant="outline" />}>
          <PencilIcon />
          Edit
        </Menu.Trigger>
      </Menu>
      <Menu>
        <Menu.Trigger render={<Button variant="outline" size="icon" aria-label="More" />}>
          <EllipsisIcon />
        </Menu.Trigger>
      </Menu>
    </div>
  );
}
