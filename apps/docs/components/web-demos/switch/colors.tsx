'use client';

import { Label } from 'panelui-web/label';
import { Switch } from 'panelui-web/switch';

export default function SwitchColors() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Label>
        <Label.Text>Notifications</Label.Text>
        <Label.Action>
          <Switch defaultChecked />
        </Label.Action>
      </Label>
      <Label>
        <Label.Text>Automatic backups</Label.Text>
        <Label.Action>
          <Switch color="success" defaultChecked />
        </Label.Action>
      </Label>
      <Label>
        <Label.Text>Beta features</Label.Text>
        <Label.Action>
          <Switch color="info" defaultChecked />
        </Label.Action>
      </Label>
      <Label>
        <Label.Text>Delete files after 30 days</Label.Text>
        <Label.Action>
          <Switch color="destructive" defaultChecked />
        </Label.Action>
      </Label>
    </div>
  );
}
