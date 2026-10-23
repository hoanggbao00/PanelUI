'use client';

import { LogOutIcon } from 'lucide-react';
import { AlertDialog } from 'panelui-web/alert-dialog';
import { Button } from 'panelui-web/button';

export default function AlertDialogWithMedia() {
  return (
    <AlertDialog>
      <AlertDialog.Trigger render={<Button variant="outline" />}>Sign out everywhere</AlertDialog.Trigger>
      <AlertDialog.Content tone="warning" size="sm">
        <AlertDialog.Media>
          <LogOutIcon />
        </AlertDialog.Media>
        <AlertDialog.Title>Sign out everywhere?</AlertDialog.Title>
        <AlertDialog.Description>You will be signed out on 4 devices, this one included.</AlertDialog.Description>
        <AlertDialog.Footer>
          <AlertDialog.Cancel />
          <AlertDialog.Action>Sign out</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
