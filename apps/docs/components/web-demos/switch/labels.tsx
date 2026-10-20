'use client';

import { Label } from 'panelui-web/label';
import { Switch } from 'panelui-web/switch';

export default function SwitchLabels() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      {/* Wrapped in its label: the whole line is pressable. */}
      <Label>
        <Label.Text>Show week numbers</Label.Text>
        <Label.Action>
          <Switch defaultChecked />
        </Label.Action>
      </Label>
      <Label>
        <Label.Text>Start the week on Monday</Label.Text>
        <Label.Action>
          <Switch />
        </Label.Action>
      </Label>
      {/* A switch that is off and cannot be turned on fades its label with it. */}
      <Label>
        <Label.Text>Sync with the shared calendar</Label.Text>
        <Label.Hint>Ask an admin</Label.Hint>
        <Label.Action>
          <Switch disabled />
        </Label.Action>
      </Label>
    </div>
  );
}
