'use client';

import { Button } from 'panelui-web/button';
import { Menu } from 'panelui-web/menu';
import { useState } from 'react';

export default function MenuCheckboxes() {
  const [columns, setColumns] = useState({ owner: true, due: true, estimate: false });
  const toggle = (key: keyof typeof columns) => (on: boolean) => setColumns((current) => ({ ...current, [key]: on }));

  return (
    <Menu>
      <Menu.Trigger render={<Button variant="outline" />}>Columns</Menu.Trigger>
      <Menu.Content className="w-48">
        <Menu.Group>
          <Menu.GroupLabel>Show</Menu.GroupLabel>
          <Menu.CheckboxItem checked={columns.owner} onCheckedChange={toggle('owner')}>
            Owner
          </Menu.CheckboxItem>
          <Menu.CheckboxItem checked={columns.due} onCheckedChange={toggle('due')}>
            Due date
          </Menu.CheckboxItem>
          <Menu.CheckboxItem checked={columns.estimate} onCheckedChange={toggle('estimate')}>
            Estimate
          </Menu.CheckboxItem>
        </Menu.Group>
      </Menu.Content>
    </Menu>
  );
}
