'use client';

import { FileTextIcon, ImageIcon, SheetIcon } from 'lucide-react';
import { Avatar } from 'panelui-web/avatar';
import { Card } from 'panelui-web/card';
import { Frame } from 'panelui-web/frame';
import { Stat } from 'panelui-web/stat';
import { Tabs } from 'panelui-web/tabs';

const ACTIVITY = [
  { who: 'Ines Duarte', what: 'moved “Cover” to review', when: '4 min' },
  { who: 'Kofi Mensah', what: 'uploaded 12 illustrations', when: '1 h' },
  { who: 'Ravi Patel', what: 'set the print date to 9 November', when: '3 h' },
];

const FILES = [
  { name: 'Brief.pdf', size: '240 KB', Icon: FileTextIcon },
  { name: 'Cover, v4.png', size: '8.1 MB', Icon: ImageIcon },
  { name: 'Print schedule.xlsx', size: '36 KB', Icon: SheetIcon },
];

export default function TabsProject() {
  return (
    <Card className="w-full max-w-md">
      <Card.Header>
        <Card.Title>Autumn catalogue</Card.Title>
        <Card.Description>Print run of 4,000 · due 9 November</Card.Description>
      </Card.Header>
      <Card.Content>
        <Tabs defaultValue="overview">
          <Tabs.List>
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="activity">
              Activity <Tabs.Badge>3</Tabs.Badge>
            </Tabs.Trigger>
            <Tabs.Trigger value="files">Files</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="overview" className="grid grid-cols-2 gap-3">
            <Stat>
              <Stat.Content>
                <Stat.Label>Pages done</Stat.Label>
                <Stat.Value>
                  38<Stat.Unit>of 64</Stat.Unit>
                </Stat.Value>
              </Stat.Content>
            </Stat>
            <Stat>
              <Stat.Content>
                <Stat.Label>Days to print</Stat.Label>
                <Stat.Value>20</Stat.Value>
              </Stat.Content>
            </Stat>
          </Tabs.Content>
          <Tabs.Content value="activity">
            <Frame variant="plain">
              <Frame.Panel>
                {ACTIVITY.map((item) => (
                  <Frame.Row key={item.what}>
                    <Frame.Media>
                      <Avatar name={item.who} size="sm" />
                    </Frame.Media>
                    <Frame.Content>
                      <Frame.Title as="p">{item.who}</Frame.Title>
                      <Frame.Description>{item.what}</Frame.Description>
                    </Frame.Content>
                    <Frame.Actions className="text-xs text-muted-foreground">{item.when}</Frame.Actions>
                  </Frame.Row>
                ))}
              </Frame.Panel>
            </Frame>
          </Tabs.Content>
          <Tabs.Content value="files">
            <Frame variant="plain">
              <Frame.Panel>
                {FILES.map(({ name, size, Icon }) => (
                  <Frame.Row key={name} href="#files" chevron>
                    <Frame.Media className="text-muted-foreground">
                      <Icon className="size-4" />
                    </Frame.Media>
                    <Frame.Content>
                      <Frame.Title as="p">{name}</Frame.Title>
                      <Frame.Description>{size}</Frame.Description>
                    </Frame.Content>
                  </Frame.Row>
                ))}
              </Frame.Panel>
            </Frame>
          </Tabs.Content>
        </Tabs>
      </Card.Content>
    </Card>
  );
}
