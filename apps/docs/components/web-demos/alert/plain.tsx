'use client';

import { Alert } from 'panelui-web/alert';
import { Button } from 'panelui-web/button';
import { Input } from 'panelui-web/input';
import { Label } from 'panelui-web/label';

export default function AlertPlain() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="plain-email">
          <Label.Text>New email address</Label.Text>
        </Label>
        <Input id="plain-email" type="email" defaultValue="sam@larkspur.studio" />
        <Alert tone="info" variant="plain">
          <Alert.Icon />
          <Alert.Description>We will send a link to the new address. Until it is opened, you sign in with the old one.</Alert.Description>
        </Alert>
      </div>
      <Alert tone="warning" variant="plain">
        <Alert.Icon />
        <Alert.Title>This key stops working on Friday</Alert.Title>
        <Alert.Description>Requests signed with it will be refused from 00:00 UTC.</Alert.Description>
        <Alert.Actions>
          <Button size="sm" variant="outline">
            Create a new key
          </Button>
        </Alert.Actions>
      </Alert>
    </div>
  );
}
