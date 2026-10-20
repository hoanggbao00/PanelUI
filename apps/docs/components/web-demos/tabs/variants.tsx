'use client';

import { Tabs, type TabsVariant } from 'panelui-web/tabs';

const VARIANTS: TabsVariant[] = ['segmented', 'underline', 'pills'];
const RANGES = ['Day', 'Week', 'Month', 'Year'];

export default function TabsVariants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      {VARIANTS.map((variant) => (
        <Tabs key={variant} variant={variant} defaultValue="Week">
          <Tabs.List aria-label={`Range, ${variant}`}>
            {RANGES.map((range) => (
              <Tabs.Trigger key={range} value={range}>
                {range}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs>
      ))}
    </div>
  );
}
