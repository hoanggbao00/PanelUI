'use client';

import { AlertDialog } from 'panelui-web/alert-dialog';

export default function AlertDialogThumb() {
  return (
    <div className="w-[26rem] shrink-0 scale-[0.6]">
      <AlertDialog>
        <AlertDialog.Content tone="destructive" inline>
          <AlertDialog.Title>Delete Orchard?</AlertDialog.Title>
          <AlertDialog.Description>Its 14 boards and their history go with it.</AlertDialog.Description>
          <AlertDialog.Footer>
            <AlertDialog.Cancel tabIndex={-1} />
            <AlertDialog.Action tabIndex={-1}>Delete project</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </div>
  );
}
