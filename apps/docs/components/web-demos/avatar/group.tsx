'use client';

import { Avatar } from 'panelui-web/avatar';

const READERS = [
  { name: 'Tomás Ferreira', photo: 'https://i.pravatar.cc/150?img=53' },
  { name: 'Ama Boateng' },
  { name: 'Lea Schmidt', photo: 'https://i.pravatar.cc/150?img=20' },
  { name: 'Nikhil Rao' },
  { name: 'Olga Petrova', photo: 'https://i.pravatar.cc/150?img=38' },
  { name: 'Sami Laine' },
  { name: 'Zoe Martin', photo: 'https://i.pravatar.cc/150?img=29' },
];

const TEAMS = ['Design', 'Platform', 'Growth', 'Support', 'Finance'];

export default function AvatarGroupDemo() {
  return (
    <div className="flex flex-col items-center gap-8">
      {/* Hover or tab into it and it opens up. Press the count to see the rest. */}
      <Avatar.Group max={4} size="lg" label="Read by">
        {READERS.map((reader) => (
          <Avatar key={reader.name} name={reader.name} src={reader.photo} />
        ))}
      </Avatar.Group>
      <Avatar.Group shape="square" label="Teams">
        {TEAMS.map((team) => (
          <Avatar key={team} name={team} />
        ))}
      </Avatar.Group>
    </div>
  );
}
