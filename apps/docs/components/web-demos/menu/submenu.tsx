import { Button } from 'panelui-web/button';
import { Menu } from 'panelui-web/menu';

export default function MenuSubmenu() {
  return (
    <Menu>
      <Menu.Trigger render={<Button variant="outline" />}>Open</Menu.Trigger>
      <Menu.Content>
        <Menu.Item>Rename</Menu.Item>
        <Menu.Sub>
          <Menu.SubTrigger>Move to</Menu.SubTrigger>
          <Menu.SubContent>
            <Menu.Item>Drafts</Menu.Item>
            <Menu.Item>Shared with me</Menu.Item>
            <Menu.Sub>
              <Menu.SubTrigger>Projects</Menu.SubTrigger>
              <Menu.SubContent>
                <Menu.Item>Spring launch</Menu.Item>
                <Menu.Item>Brand refresh</Menu.Item>
              </Menu.SubContent>
            </Menu.Sub>
          </Menu.SubContent>
        </Menu.Sub>
        <Menu.Item>Archive</Menu.Item>
      </Menu.Content>
    </Menu>
  );
}
