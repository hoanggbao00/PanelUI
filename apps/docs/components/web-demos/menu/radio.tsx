'use client';

import { Button } from 'panelui-web/button';
import { Menu } from 'panelui-web/menu';
import { useState } from 'react';

export default function MenuRadio() {
  const [density, setDensity] = useState('comfortable');

  return (
    <Menu>
      <Menu.Trigger render={<Button variant="outline" />}>Density</Menu.Trigger>
      <Menu.Content className="w-48">
        <Menu.Group>
          <Menu.GroupLabel>Row height</Menu.GroupLabel>
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
