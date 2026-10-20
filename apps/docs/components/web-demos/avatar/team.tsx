'use client';

import { Avatar, type AvatarStatus } from 'panelui-web/avatar';
import { Frame } from 'panelui-web/frame';

const TEAM: { name: string; role: string; status: AvatarStatus; photo?: string }[] = [
  { name: 'Ines Duarte', role: 'Art director', status: 'online', photo: 'https://i.pravatar.cc/150?img=5' },
  { name: 'Kofi Mensah', role: 'Illustrator', status: 'busy' },
  { name: 'Yuki Tanabe', role: 'Motion designer', status: 'away', photo: 'https://i.pravatar.cc/150?img=44' },
  { name: 'Ravi Patel', role: 'Producer', status: 'online', photo: 'https://i.pravatar.cc/150?img=59' },
  { name: 'Selma Berg', role: 'Copywriter', status: 'offline' },
];

const SAY: Record<AvatarStatus, string> = { online: 'Online', busy: 'In a meeting', away: 'Away', offline: 'Offline' };

export default function AvatarTeam() {
  return (
    <Frame className="w-full max-w-sm">
      <Frame.Header>
        <Frame.Title>Studio</Frame.Title>
        <Frame.Action>
          <Avatar.Group size="xs" max={3} label="Online now">
            {TEAM.filter((person) => person.status !== 'offline').map((person) => (
              <Avatar key={person.name} name={person.name} src={person.photo} />
            ))}
          </Avatar.Group>
        </Frame.Action>
      </Frame.Header>
      <Frame.Panel>
        {TEAM.map((person) => (
          <Frame.Row key={person.name}>
            <Frame.Media>
              <Avatar name={person.name} src={person.photo}>
                <Avatar.Badge status={person.status} />
              </Avatar>
            </Frame.Media>
            <Frame.Content>
              <Frame.Title as="p">{person.name}</Frame.Title>
              <Frame.Description>{person.role}</Frame.Description>
            </Frame.Content>
            <Frame.Actions className="text-xs text-muted-foreground">{SAY[person.status]}</Frame.Actions>
          </Frame.Row>
        ))}
      </Frame.Panel>
    </Frame>
  );
}
