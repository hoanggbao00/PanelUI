'use client';

import { Soundwave } from 'panelui-web/soundwave';
import { Stat } from 'panelui-web/stat';

/** Minutes of voice input in each hour of one day, from midnight, scaled 0–1 against the busiest hour. */
const DAY = [
  0.04, 0.02, 0.02, 0.03, 0.05, 0.12, 0.3, 0.55, 0.82, 0.9, 0.74, 0.62, 0.48, 0.58, 0.7, 0.66, 0.6, 1, 0.86,
  0.64, 0.42, 0.3, 0.16, 0.08,
];

export default function SoundwaveRing() {
  return (
    <Soundwave variant="ring" levels={DAY} color="chart-1" label="Voice input by hour, busiest at 5 pm">
      <Soundwave.Center>
        <Stat>
          <Stat.Content className="items-center">
            <Stat.Value size="sm">
              3<Stat.Unit>h</Stat.Unit> 40<Stat.Unit>m</Stat.Unit>
            </Stat.Value>
            <Stat.Label>spoken today</Stat.Label>
          </Stat.Content>
        </Stat>
      </Soundwave.Center>
    </Soundwave>
  );
}
