'use client';

import { KeyboardIcon } from 'lucide-react';
import { Alert } from 'panelui-web/alert';
import { Button } from 'panelui-web/button';
import { useState } from 'react';

export default function AlertDismiss() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex w-full max-w-md flex-col items-start gap-3">
      <Alert tone="success" open={open} onOpenChange={setOpen} className="w-full">
        <Alert.Icon>
          <KeyboardIcon />
        </Alert.Icon>
        <Alert.Title>Keyboard shortcuts are here</Alert.Title>
        <Alert.Description>Press ? anywhere in the app to see all of them.</Alert.Description>
        <Alert.Close />
      </Alert>
      <Button variant="outline" size="sm" disabled={open} onClick={() => setOpen(true)}>
        Show it again
      </Button>
    </div>
  );
}
