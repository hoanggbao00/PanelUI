'use client';

import { useState } from 'react';
import { Button } from 'panelui-web/button';
import { Input } from 'panelui-web/input';
import { Label } from 'panelui-web/label';
import { Tabs } from 'panelui-web/tabs';

const STEPS = ['Basket', 'Delivery', 'Payment'];

export default function TabsControlled() {
  const [step, setStep] = useState('Basket');
  const index = STEPS.indexOf(step);

  return (
    <Tabs value={step} onValueChange={(next) => setStep(next as string)} className="w-full max-w-sm">
      <Tabs.List aria-label="Checkout">
        {STEPS.map((name, at) => (
          <Tabs.Trigger key={name} value={name}>
            {at + 1}. {name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <Tabs.Content value="Basket" className="text-sm text-muted-foreground">
        Three items, £42.80.
      </Tabs.Content>
      <Tabs.Content value="Delivery" className="flex flex-col gap-2">
        <Label htmlFor="tabs-postcode" required>
          Postcode
        </Label>
        <Input id="tabs-postcode" placeholder="E8 3RL" required />
      </Tabs.Content>
      <Tabs.Content value="Payment" className="text-sm text-muted-foreground">
        Paid with the card ending 4417.
      </Tabs.Content>
      <div className="flex justify-between">
        <Button variant="outline" size="sm" disabled={index === 0} onClick={() => setStep(STEPS[index - 1]!)}>
          Back
        </Button>
        <Button size="sm" disabled={index === STEPS.length - 1} onClick={() => setStep(STEPS[index + 1]!)}>
          Next
        </Button>
      </div>
    </Tabs>
  );
}
