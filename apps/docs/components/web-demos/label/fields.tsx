'use client';

import { useState } from 'react';
import { Input } from 'panelui-web/input';
import { Label } from 'panelui-web/label';
import { Textarea } from 'panelui-web/textarea';

const LIMIT = 160;

export default function LabelFields() {
  const [note, setNote] = useState('');

  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="booking-name" required>
          Name
        </Label>
        <Input id="booking-name" autoComplete="name" required />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="booking-email" required>
          <Label.Text>Email</Label.Text>
          <Label.Hint>For the confirmation</Label.Hint>
        </Label>
        <Input id="booking-email" type="email" autoComplete="email" required />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="booking-note" optional>
          <Label.Text>Anything we should know</Label.Text>
          <Label.Action className="tabular-nums">
            {note.length}/{LIMIT}
          </Label.Action>
        </Label>
        <Textarea
          id="booking-note"
          maxLength={LIMIT}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="A high chair, an allergy, a birthday"
        />
      </div>
    </div>
  );
}
