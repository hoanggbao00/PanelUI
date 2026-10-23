'use client';

import { PlusIcon } from 'lucide-react';
import { Button } from 'panelui-web/button';
import { Canvas } from 'panelui-web/canvas';
import { Card } from 'panelui-web/card';

export default function CanvasCross() {
  return (
    <Canvas className="h-[360px] w-full">
      <Canvas.Pattern variant="cross" gap={32} fade="edges" />
      <Canvas.Content className="flex items-center justify-center p-6">
        <Card className="w-full max-w-xs">
          <Card.Header>
            <Card.Title>No boards yet</Card.Title>
            <Card.Description>A board holds the cards for one project. Start with one and invite people to it.</Card.Description>
          </Card.Header>
          <Card.Footer>
            <Button>
              <PlusIcon />
              New board
            </Button>
          </Card.Footer>
        </Card>
      </Canvas.Content>
    </Canvas>
  );
}
