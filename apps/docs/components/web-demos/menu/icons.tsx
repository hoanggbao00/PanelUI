import { DownloadIcon, PencilIcon, PrinterIcon, Share2Icon } from 'lucide-react';
import { Button } from 'panelui-web/button';
import { Menu } from 'panelui-web/menu';

export default function MenuIcons() {
  return (
    <Menu>
      <Menu.Trigger render={<Button variant="outline" />}>Document</Menu.Trigger>
      <Menu.Content>
        <Menu.Item>
          <PencilIcon />
          Rename
        </Menu.Item>
        <Menu.Item>
          <Share2Icon />
          Share
        </Menu.Item>
        <Menu.Item>
          <DownloadIcon />
          Download
        </Menu.Item>
        <Menu.Item>
          <PrinterIcon />
          Print
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}
