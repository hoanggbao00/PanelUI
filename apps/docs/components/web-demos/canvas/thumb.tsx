'use client';

import { Canvas } from 'panelui-web/canvas';
import { useEffect, useState } from 'react';

export default function CanvasThumb() {
  const [position, setPosition] = useState({ x: 140, y: 90 });

  // The gallery card takes no pointer, so the light drifts on its own here.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      setPosition({ x: 140 + Math.sin(t * 0.9) * 90, y: 90 + Math.sin(t * 1.4) * 45 });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <Canvas className="h-44 w-72 rounded-2xl border">
      <Canvas.Pattern />
      <Canvas.Spotlight radius={70} position={position} />
    </Canvas>
  );
}
