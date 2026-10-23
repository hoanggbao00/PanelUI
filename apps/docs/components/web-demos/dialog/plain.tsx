'use client';

import { Button } from 'panelui-web/button';
import { Dialog } from 'panelui-web/dialog';
import { Input } from 'panelui-web/input';
import { Label } from 'panelui-web/label';
import { Select } from 'panelui-web/select';

const COUNTRIES = [
  { value: 'pt', label: 'Portugal' },
  { value: 'es', label: 'Spain' },
  { value: 'tr', label: 'Türkiye' },
  { value: 'gb', label: 'United Kingdom' },
];

export default function DialogPlain() {
  return (
    <Dialog>
      <Dialog.Trigger render={<Button variant="outline" />}>Edit shipping address</Dialog.Trigger>
      <Dialog.Content variant="plain" size="lg">
        <Dialog.Header title="Shipping address" description="Orders placed from now on are sent here." />
        <Dialog.Body className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="ship-name">
              <Label.Text>Full name</Label.Text>
            </Label>
            <Input id="ship-name" defaultValue="Mira Castell" autoComplete="name" />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="ship-street">
              <Label.Text>Street and number</Label.Text>
            </Label>
            <Input id="ship-street" defaultValue="Rua das Flores 48" autoComplete="address-line1" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ship-city">
              <Label.Text>City</Label.Text>
            </Label>
            <Input id="ship-city" defaultValue="Porto" autoComplete="address-level2" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ship-code">
              <Label.Text>Postcode</Label.Text>
            </Label>
            <Input id="ship-code" defaultValue="4050-262" autoComplete="postal-code" />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label>
              <Label.Text>Country</Label.Text>
            </Label>
            <Select items={COUNTRIES} defaultValue="pt">
              <Select.Trigger aria-label="Country">
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                {COUNTRIES.map((item) => (
                  <Select.Item key={item.value} value={item.value}>
                    {item.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close render={<Button variant="ghost" />}>Cancel</Dialog.Close>
          <Dialog.Close render={<Button />}>Save address</Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
