'use client';

import { Alert } from 'panelui-web/alert';
import { AlertDialog } from 'panelui-web/alert-dialog';
import { Button } from 'panelui-web/button';
import { Label } from 'panelui-web/label';
import { Switch } from 'panelui-web/switch';
import { useState } from 'react';

export default function AlertDialogAsync() {
  const [fail, setFail] = useState(false);
  const [failed, setFailed] = useState(false);
  const [published, setPublished] = useState(false);

  const publish = () =>
    new Promise<void>((resolve, reject) => {
      setFailed(false);
      window.setTimeout(() => {
        if (fail) {
          setFailed(true);
          reject(new Error('The release server did not answer.'));
        } else {
          setPublished(true);
          resolve();
        }
      }, 1400);
    });

  return (
    <div className="flex flex-col items-center gap-4">
      <AlertDialog onOpenChange={(open) => open && setFailed(false)}>
        <AlertDialog.Trigger render={<Button />}>Publish 2.4.0</AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Publish version 2.4.0?</AlertDialog.Title>
          <AlertDialog.Description>It goes out to 18,400 installs over the next hour.</AlertDialog.Description>
          <Alert tone="destructive" variant="plain" open={failed} className="mt-1">
            <Alert.Icon />
            <Alert.Description>The release server did not answer. Nothing was published.</Alert.Description>
          </Alert>
          <AlertDialog.Footer>
            <AlertDialog.Cancel />
            <AlertDialog.Action onClick={publish}>{failed ? 'Try again' : 'Publish'}</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <Label>
        <Switch size="sm" checked={fail} onCheckedChange={setFail} />
        <Label.Text>Make the next attempt fail</Label.Text>
      </Label>
      <p className="text-xs text-muted-foreground" aria-live="polite">
        {published ? 'Version 2.4.0 is out.' : 'Nothing published yet.'}
      </p>
    </div>
  );
}
