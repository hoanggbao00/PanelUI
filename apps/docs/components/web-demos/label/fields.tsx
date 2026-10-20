'use client';

import { useState } from 'react';
import { Button } from 'panelui-web/button';
import { Card } from 'panelui-web/card';
import { Input } from 'panelui-web/input';
import { Label } from 'panelui-web/label';
import { Textarea } from 'panelui-web/textarea';

const LIMIT = 160;

export default function LabelFields() {
  const [note, setNote] = useState('');

  return (
    <Card className="w-full max-w-sm">
      <Card.Header>
        <Card.Title>Book a table</Card.Title>
        <Card.Description>Saturday 24 October · four people · 19:30</Card.Description>
      </Card.Header>
      <Card.Content className="flex flex-col gap-5">
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
          <Label htmlFor="booking-phone" optional>
            Phone
          </Label>
          <Input id="booking-phone" type="tel" autoComplete="tel" />
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
      </Card.Content>
      <Card.Footer>
        <Button className="w-full">Book the table</Button>
      </Card.Footer>
    </Card>
  );
}
