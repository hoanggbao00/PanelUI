'use client';

import { Switch } from 'panelui-web/switch';

export default function SwitchThumb() {
  return (
    <div className="flex items-center gap-4">
      <Switch label="Off" size="lg" />
      <Switch label="On" size="lg" defaultChecked />
    </div>
  );
}
