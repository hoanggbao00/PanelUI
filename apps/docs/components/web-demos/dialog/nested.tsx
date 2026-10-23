'use client';

import { Button } from 'panelui-web/button';
import { Dialog } from 'panelui-web/dialog';
import { Input } from 'panelui-web/input';
import { Label } from 'panelui-web/label';
import { useState } from 'react';

export default function DialogNested() {
  const [email, setEmail] = useState('mira@castell.studio');
  const [changeOpen, setChangeOpen] = useState(false);

  return (
    <Dialog>
      <Dialog.Trigger render={<Button variant="outline" />}>Edit profile</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header title="Profile" description="How you appear to the people you work with." />
        <Dialog.Body>
          <div className="flex flex-col gap-2">
            <Label htmlFor="profile-name">
              <Label.Text>Name</Label.Text>
            </Label>
            <Input id="profile-name" defaultValue="Mira Castell" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="profile-email">
              <Label.Text>Email</Label.Text>
              <Label.Action>
                <Dialog open={changeOpen} onOpenChange={setChangeOpen}>
                  <Dialog.Trigger render={<Button variant="ghost" size="sm" className="-my-1 h-6 px-1.5 text-xs" />}>
                    Change
                  </Dialog.Trigger>
                  <Dialog.Content size="sm">
                    <Dialog.Header title="Change email" description="We send a code to check the new address." />
                    <Dialog.Body>
                      <form
                        id="change-email"
                        className="flex flex-col gap-4"
                        onSubmit={(event) => {
                          event.preventDefault();
                          const next = String(new FormData(event.currentTarget).get('email') ?? '').trim();
                          if (next.includes('@')) setEmail(next);
                          setChangeOpen(false);
                        }}
                      >
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="new-email">
                            <Label.Text>New email</Label.Text>
                          </Label>
                          <Input id="new-email" name="email" type="email" placeholder="you@example.com" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="email-password">
                            <Label.Text>Your password</Label.Text>
                          </Label>
                          <Input id="email-password" type="password" autoComplete="current-password" />
                        </div>
                      </form>
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.Close render={<Button variant="secondary" />}>Back</Dialog.Close>
                      <Button type="submit" form="change-email">
                        Send code
                      </Button>
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog>
              </Label.Action>
            </Label>
            <Input id="profile-email" value={email} readOnly />
          </div>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close render={<Button variant="secondary" />}>Cancel</Dialog.Close>
          <Dialog.Close render={<Button />}>Save profile</Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
