'use client';

import { Card } from 'panelui-web/card';
import { Soundwave } from 'panelui-web/soundwave';

export default function SoundwaveAmbient() {
  return (
    <Card className="relative h-64 w-full max-w-sm justify-center overflow-hidden">
      <Soundwave variant="ambient" state="listening" />
      <Card.Header className="relative text-center">
        <Card.Title>Go ahead, I'm listening</Card.Title>
        <Card.Description>Ask about your week's schedule</Card.Description>
      </Card.Header>
    </Card>
  );
}
