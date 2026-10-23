'use client';

import { Trash2Icon } from 'lucide-react';
import { AlertDialog } from 'panelui-web/alert-dialog';
import { Button } from 'panelui-web/button';

export default function AlertDialogHold() {
  return (
    <AlertDialog>
      <AlertDialog.Trigger render={<Button variant="destructive" />}>Erase workspace</AlertDialog.Trigger>
      <AlertDialog.Content tone="destructive">
        <AlertDialog.Media>
          <Trash2Icon />
        </AlertDialog.Media>
        <AlertDialog.Title>Erase the Northwind workspace?</AlertDialog.Title>
        <AlertDialog.Description>
          Every project, file and member is removed for good. Press and hold the button until it fills to go ahead.
        </AlertDialog.Description>
        <AlertDialog.Footer>
          <AlertDialog.Cancel />
          <AlertDialog.Action hold={1500}>Hold to erase</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
