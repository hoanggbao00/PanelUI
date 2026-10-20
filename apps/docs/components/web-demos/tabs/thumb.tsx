'use client';

import { Tabs } from 'panelui-web/tabs';

export default function TabsThumb() {
  return (
    <Tabs defaultValue="week">
      <Tabs.List aria-label="Range">
        <Tabs.Trigger value="day">Day</Tabs.Trigger>
        <Tabs.Trigger value="week">Week</Tabs.Trigger>
        <Tabs.Trigger value="month">Month</Tabs.Trigger>
      </Tabs.List>
    </Tabs>
  );
}
