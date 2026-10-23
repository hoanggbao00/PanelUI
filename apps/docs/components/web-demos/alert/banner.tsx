'use client';

import { WrenchIcon } from 'lucide-react';
import { Alert } from 'panelui-web/alert';
import { Button } from 'panelui-web/button';
import { Frame } from 'panelui-web/frame';

const DEPLOYS = [
  { ref: 'main · 7f3e1d2', where: 'Production · 12 minutes ago' },
  { ref: 'feature/search-filters', where: 'Preview · 1 hour ago' },
];

export default function AlertBanner() {
  return (
    <div className="w-full max-w-xl overflow-hidden rounded-2xl border bg-background">
      <Alert tone="warning" variant="banner">
        <Alert.Icon>
          <WrenchIcon />
        </Alert.Icon>
        <Alert.Title>Deploys pause on Sunday</Alert.Title>
        <Alert.Actions>
          <Button size="sm" variant="ghost" className="h-7">
            Details
          </Button>
        </Alert.Actions>
        <Alert.Close />
      </Alert>
      <div className="p-4">
        <Frame>
          <Frame.Header>
            <Frame.Title>Deploys</Frame.Title>
          </Frame.Header>
          <Frame.Panel>
            {DEPLOYS.map((deploy) => (
              <Frame.Row key={deploy.ref}>
                <Frame.Content>
                  <Frame.Title as="p">{deploy.ref}</Frame.Title>
                  <Frame.Description>{deploy.where}</Frame.Description>
                </Frame.Content>
              </Frame.Row>
            ))}
          </Frame.Panel>
        </Frame>
      </div>
    </div>
  );
}
