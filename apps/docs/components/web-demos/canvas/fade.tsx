'use client';

import { Canvas } from 'panelui-web/canvas';
import { Prompt } from 'panelui-web/prompt';

export default function CanvasFade() {
  return (
    <Canvas className="h-[380px] w-full">
      <Canvas.Pattern fade="edges" gap={16} size={1} />
      <Canvas.Content className="flex items-center justify-center p-6">
        <Prompt className="max-w-md">
          <Prompt.Field>
            <Prompt.Textarea placeholder="What should we build today?" />
            <Prompt.Footer>
              <Prompt.Tools>
                <Prompt.Attach />
              </Prompt.Tools>
              <Prompt.Submit />
            </Prompt.Footer>
          </Prompt.Field>
        </Prompt>
      </Canvas.Content>
    </Canvas>
  );
}
