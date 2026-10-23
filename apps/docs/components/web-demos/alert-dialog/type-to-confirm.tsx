'use client';

import { AlertDialog } from 'panelui-web/alert-dialog';
import { Button } from 'panelui-web/button';
import { Input } from 'panelui-web/input';
import { Label } from 'panelui-web/label';
import { useState } from 'react';

const NAME = 'harbour-api';

export default function AlertDialogTypeToConfirm() {
  const [typed, setTyped] = useState('');

  return (
    <AlertDialog dismissible={false} onOpenChange={(open) => !open && setTyped('')}>
      <AlertDialog.Trigger render={<Button variant="destructive" />}>Delete repository</AlertDialog.Trigger>
      <AlertDialog.Content tone="destructive">
        <AlertDialog.Title>Delete {NAME}?</AlertDialog.Title>
        <AlertDialog.Description>Its 1,284 commits, issues and releases go with it.</AlertDialog.Description>
        <div className="mt-2 flex flex-col gap-2">
          <Label htmlFor="confirm-name">
            <Label.Text>
              Type <span className="font-mono">{NAME}</span> to confirm
            </Label.Text>
          </Label>
          <Input
            id="confirm-name"
            autoComplete="off"
            spellCheck={false}
            className="font-mono"
            value={typed}
            onChange={(event) => setTyped(event.target.value)}
          />
        </div>
        <AlertDialog.Footer>
          <AlertDialog.Cancel />
          <AlertDialog.Action disabled={typed !== NAME}>Delete</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
