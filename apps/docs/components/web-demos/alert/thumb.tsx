'use client';

import { Alert } from 'panelui-web/alert';
import { Button } from 'panelui-web/button';

export default function AlertThumb() {
  return (
    <div className="w-96 shrink-0 scale-[0.68]">
      <Alert tone="warning">
        <Alert.Icon />
        <Alert.Title>Storage is 90% full</Alert.Title>
        <Alert.Description>Uploads stop at 50 GB.</Alert.Description>
        <Alert.Actions>
          <Button size="sm" variant="ghost" tabIndex={-1}>
            Later
          </Button>
          <Button size="sm" tabIndex={-1}>
            Upgrade
          </Button>
        </Alert.Actions>
      </Alert>
    </div>
  );
}
