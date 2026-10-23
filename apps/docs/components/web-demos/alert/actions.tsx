'use client';

import { CreditCardIcon } from 'lucide-react';
import { Alert } from 'panelui-web/alert';
import { Button } from 'panelui-web/button';

export default function AlertWithActions() {
  return (
    <Alert tone="destructive" className="w-full max-w-md">
      <Alert.Icon>
        <CreditCardIcon />
      </Alert.Icon>
      <Alert.Title>Your payment did not go through</Alert.Title>
      <Alert.Description>The card ending 4242 was declined. Update it by 14 November to keep the Team plan.</Alert.Description>
      <Alert.Actions>
        <Button size="sm" variant="ghost">
          Remind me later
        </Button>
        <Button size="sm">Update card</Button>
      </Alert.Actions>
    </Alert>
  );
}
