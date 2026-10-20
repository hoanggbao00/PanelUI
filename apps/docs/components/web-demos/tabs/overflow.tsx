'use client';

import { Tabs } from 'panelui-web/tabs';

const STATIONS = [
  'Lisbon',
  'Porto',
  'Coimbra',
  'Aveiro',
  'Braga',
  'Faro',
  'Évora',
  'Setúbal',
  'Viseu',
  'Guimarães',
  'Leiria',
  'Funchal',
];

export default function TabsOverflow() {
  return (
    <Tabs variant="pills" defaultValue="Lisbon" className="w-full max-w-sm">
      <Tabs.List aria-label="Station">
        {STATIONS.map((station) => (
          <Tabs.Trigger key={station} value={station}>
            {station}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {STATIONS.map((station, index) => (
        <Tabs.Content key={station} value={station} className="text-sm text-muted-foreground">
          {station}: next departure in {(index * 7) % 23 + 2} minutes.
        </Tabs.Content>
      ))}
    </Tabs>
  );
}
