'use client';

import { Canvas } from 'panelui-web/canvas';

export default function CanvasLayers() {
  return (
    <Canvas className="h-[360px] w-full">
      <Canvas.Pattern variant="dots" gap={12} strength="18%" />
      <Canvas.Pattern variant="cross" gap={96} size={5} strength="45%" />
      <Canvas.Pattern variant="grid" gap={96} fade="bottom" />
    </Canvas>
  );
}
