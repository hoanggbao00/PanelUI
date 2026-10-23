'use client';

import { Canvas } from 'panelui-web/canvas';
import { Kpi } from 'panelui-web/kpi';

const SIGNUPS = [42, 48, 45, 51, 58, 56, 63, 71, 69, 78];

export default function CanvasGrid() {
  return (
    <Canvas className="h-[360px] w-full">
      <Canvas.Pattern variant="grid" major={5} />
      <Canvas.Content className="flex items-center justify-center p-6">
        <Kpi surface className="w-80">
          <Kpi.Content layout="inline">
            <Kpi.Stat>
              <Kpi.Title>Sign-ups this week</Kpi.Title>
              <Kpi.Value>1,284</Kpi.Value>
              <Kpi.Trend value={12.4} />
            </Kpi.Stat>
            <Kpi.Chart data={SIGNUPS} color="info" inline style={{ width: 110 }} />
          </Kpi.Content>
        </Kpi>
      </Canvas.Content>
    </Canvas>
  );
}
