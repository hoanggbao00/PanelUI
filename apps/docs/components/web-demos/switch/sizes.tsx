'use client';

import { Switch, type SwitchSize } from 'panelui-web/switch';

const SIZES: SwitchSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export default function SwitchSizes() {
  return (
    <div className="flex items-center gap-5">
      {SIZES.map((size) => (
        <Switch key={size} size={size} label={`Size ${size}`} defaultChecked />
      ))}
    </div>
  );
}
