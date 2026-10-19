'use client';

import { SlidersHorizontalIcon } from 'lucide-react';
import { Button } from 'panelui-web/button';
import { Menu } from 'panelui-web/menu';
import { useState } from 'react';

export default function MenuChecks() {
  const [columns, setColumns] = useState({ owner: true, due: true, estimate: false });
  const [density, setDensity] = useState('comfortable');
  const toggle = (key: keyof typeof columns) => (on: boolean) => setColumns((c) => ({ ...c, [key]: on }));

  return (
    <Menu>
      <Menu.Trigger render={<Button variant="outline" />}>
        <SlidersHorizontalIcon />
        View
      </Menu.Trigger>
      <Menu.Content className="w-56">
        <Menu.Group>
          <Menu.GroupLabel>Columns</Menu.GroupLabel>
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
        <Menu.Separator />
        <Menu.Group>
          <Menu.GroupLabel>Density</Menu.GroupLabel>
          <Menu.RadioGroup value={density} onValueChange={setDensity}>
            <Menu.RadioItem value="compact">Compact</Menu.RadioItem>
            <Menu.RadioItem value="comfortable">Comfortable</Menu.RadioItem>
            <Menu.RadioItem value="spacious">Spacious</Menu.RadioItem>
          </Menu.RadioGroup>
        </Menu.Group>
      </Menu.Content>
    </Menu>
  );
}
