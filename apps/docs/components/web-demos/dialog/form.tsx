'use client';

import { Button } from 'panelui-web/button';
import { Dialog } from 'panelui-web/dialog';
import { Input } from 'panelui-web/input';
import { Label } from 'panelui-web/label';
import { Select } from 'panelui-web/select';
import { Textarea } from 'panelui-web/textarea';
import { useState } from 'react';

const VISIBILITY = [
  { value: 'team', label: 'Everyone in the team' },
  { value: 'private', label: 'Only people I invite' },
];

export default function DialogForm() {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [missing, setMissing] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setMissing(false);
      }}
      dismissible={false}
    >
      <Dialog.Trigger render={<Button />}>New project</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header title="New project" description="You can change all of this later in its settings." />
        <Dialog.Body>
          <form
            id="new-project"
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              const name = String(new FormData(event.currentTarget).get('name') ?? '').trim();
              setMissing(name === '');
              if (name === '') return;
              setSaving(true);
              window.setTimeout(() => {
                setSaving(false);
                setOpen(false);
              }, 1100);
            }}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="project-name" required invalid={missing}>
                <Label.Text>Name</Label.Text>
                {missing ? <Label.Hint>Give it a name</Label.Hint> : null}
              </Label>
              <Input id="project-name" name="name" placeholder="Harbour redesign" aria-invalid={missing || undefined} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="project-address">
                <Label.Text>Address</Label.Text>
              </Label>
              <Input.Group>
                <Input.Addon className="border-e pe-3">quarry.app/</Input.Addon>
                <Input id="project-address" placeholder="harbour" />
              </Input.Group>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="project-about" optional>
                <Label.Text>What it is for</Label.Text>
              </Label>
              <Textarea id="project-about" minRows={2} maxRows={5} placeholder="A line or two for the people you invite" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>
                <Label.Text>Who can see it</Label.Text>
              </Label>
              <Select items={VISIBILITY} defaultValue="team">
                <Select.Trigger aria-label="Who can see it">
                  <Select.Value />
                </Select.Trigger>
                <Select.Content>
                  {VISIBILITY.map((item) => (
                    <Select.Item key={item.value} value={item.value}>
                      {item.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </div>
          </form>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close render={<Button variant="secondary" />} disabled={saving}>
            Cancel
          </Dialog.Close>
          <Button type="submit" form="new-project" loading={saving}>
            Create project
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
