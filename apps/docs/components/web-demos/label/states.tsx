'use client';

import { useState } from 'react';
import { Input } from 'panelui-web/input';
import { Label } from 'panelui-web/label';

const TAKEN = ['admin', 'support', 'mira'];

export default function LabelStates() {
  const [handle, setHandle] = useState('mira');
  const taken = TAKEN.includes(handle.trim().toLowerCase());

  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="state-handle" invalid={taken}>
          <Label.Text>Username</Label.Text>
          <Label.Hint id="state-handle-hint">{taken ? 'Already taken' : 'Available'}</Label.Hint>
        </Label>
        <Input
          id="state-handle"
          value={handle}
          onChange={(event) => setHandle(event.target.value)}
          aria-invalid={taken}
          aria-describedby="state-handle-hint"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="state-plan" disabled>
          <Label.Text>Plan</Label.Text>
          <Label.Hint>Set by your organisation</Label.Hint>
        </Label>
        <Input id="state-plan" defaultValue="Team, annual" disabled />
      </div>
    </div>
  );
}
