'use client';

import { Avatar } from 'panelui-web/avatar';
import { Button } from 'panelui-web/button';
import { Dialog } from 'panelui-web/dialog';
import { Frame } from 'panelui-web/frame';
import { Input } from 'panelui-web/input';
import { Select } from 'panelui-web/select';
import { useState } from 'react';

const ROLES = [
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
];

type Invite = { email: string; role: string };

export default function DialogInvite() {
  const [invites, setInvites] = useState<Invite[]>([
    { email: 'ines@quarry.dev', role: 'editor' },
    { email: 'tomas@quarry.dev', role: 'viewer' },
  ]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('editor');

  const add = () => {
    const next = email.trim();
    if (!next.includes('@') || invites.some((invite) => invite.email === next)) return;
    setInvites([...invites, { email: next, role }]);
    setEmail('');
  };

  return (
    <Dialog>
      <Dialog.Trigger render={<Button />}>Invite people</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header title="Invite to Quarry" description="They get an email with a link to join." />
        <Dialog.Body>
          <form
            className="flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              add();
            }}
          >
            <Input
              type="email"
              placeholder="name@company.com"
              aria-label="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="min-w-0 flex-1"
            />
            <Select items={ROLES} value={role} onValueChange={(value) => setRole(value as string)}>
              <Select.Trigger aria-label="Role" className="w-28">
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                {ROLES.map((item) => (
                  <Select.Item key={item.value} value={item.value}>
                    {item.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
            <Button type="submit" variant="outline">
              Add
            </Button>
          </form>
          <Frame variant="plain">
            <Frame.Panel>
              {invites.map((invite) => (
                <Frame.Row key={invite.email}>
                  <Frame.Media>
                    <Avatar name={invite.email} size="sm" />
                  </Frame.Media>
                  <Frame.Content>
                    <Frame.Title as="p">{invite.email}</Frame.Title>
                  </Frame.Content>
                  <Frame.Actions>
                    <Frame.Description>{invite.role === 'editor' ? 'Editor' : 'Viewer'}</Frame.Description>
                  </Frame.Actions>
                </Frame.Row>
              ))}
            </Frame.Panel>
          </Frame>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close render={<Button variant="secondary" />}>Cancel</Dialog.Close>
          <Dialog.Close render={<Button />}>
            Send {invites.length} {invites.length === 1 ? 'invite' : 'invites'}
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
