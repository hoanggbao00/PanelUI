'use client';

import { Canvas, type CanvasViewport } from 'panelui-web/canvas';
import { Flow } from 'panelui-web/flow';
import { useState } from 'react';

const STEPS = [
  { id: 'upload', title: 'Upload', detail: 'interview-04.mov', x: 0, y: 110 },
  { id: 'transcode', title: 'Transcode', detail: '1080p and 720p', x: 260, y: 110 },
  { id: 'captions', title: 'Captions', detail: 'English, Turkish', x: 520, y: 20 },
  { id: 'thumbnails', title: 'Thumbnails', detail: '12 frames', x: 520, y: 200 },
  { id: 'publish', title: 'Publish', detail: 'Friday, 10:00', x: 780, y: 110 },
];

export default function CanvasFlow() {
  const [viewport, setViewport] = useState<CanvasViewport>({ x: 0, y: 0, zoom: 1 });

  return (
    <Canvas viewport={viewport} className="h-[440px] w-full">
      {/* Wider than the default, since the graph is fitted below a zoom of 1. */}
      <Canvas.Pattern gap={18} size={1.1} />
      <Canvas.Spotlight />
      <Canvas.Content>
        <Flow
          fitViewOnMount
          fitViewPadding={40}
          onViewportChange={setViewport}
          label="Video pipeline"
          className="h-full rounded-none border-0 bg-transparent"
        >
          {STEPS.map((step) => (
            <Flow.Node key={step.id} id={step.id} position={{ x: step.x, y: step.y }} className="w-44">
              <Flow.NodeContent>
                <Flow.NodeTitle>{step.title}</Flow.NodeTitle>
                <Flow.NodeDescription>{step.detail}</Flow.NodeDescription>
              </Flow.NodeContent>
            </Flow.Node>
          ))}
          <Flow.Edge from="upload" to="transcode" arrow />
          <Flow.Edge from="transcode" to="captions" arrow />
          <Flow.Edge from="transcode" to="thumbnails" arrow />
          <Flow.Edge from="captions" to="publish" dashed animated arrow />
          <Flow.Edge from="thumbnails" to="publish" dashed animated arrow />
        </Flow>
      </Canvas.Content>
    </Canvas>
  );
}
