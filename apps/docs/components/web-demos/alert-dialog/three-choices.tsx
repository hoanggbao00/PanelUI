'use client';

import { AlertDialog } from 'panelui-web/alert-dialog';
import { Button } from 'panelui-web/button';
import { useState } from 'react';

export default function AlertDialogThreeChoices() {
  const [last, setLast] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-4">
      <AlertDialog>
        <AlertDialog.Trigger render={<Button variant="outline" />}>Close the roadmap</AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Save your changes to Q4 roadmap?</AlertDialog.Title>
          <AlertDialog.Description>You moved three items and renamed a lane since the last save.</AlertDialog.Description>
          <AlertDialog.Footer>
            <AlertDialog.Action tone="destructive" variant="soft" onClick={() => setLast('Changes discarded.')}>
              Discard
            </AlertDialog.Action>
            <AlertDialog.Cancel />
            <AlertDialog.Action onClick={() => setLast('Changes saved.')}>Save</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <p className="text-xs text-muted-foreground" aria-live="polite">
        {last ?? 'Nothing chosen yet.'}
      </p>
    </div>
  );
}
