'use client';

import { Button } from 'panelui-web/button';
import { Dialog } from 'panelui-web/dialog';
import { Input } from 'panelui-web/input';

export default function DialogThumb() {
  return (
    <div className="w-[24rem] shrink-0 scale-[0.62]">
      <Dialog>
        <Dialog.Content inline size="sm">
          <Dialog.Header title="Rename board" description="Everyone on the board sees it." />
          <Dialog.Body>
            <Input defaultValue="Spring launch" aria-label="Name" tabIndex={-1} />
          </Dialog.Body>
          <Dialog.Footer>
            <Button variant="secondary" tabIndex={-1}>
              Cancel
            </Button>
            <Button tabIndex={-1}>Save</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}
