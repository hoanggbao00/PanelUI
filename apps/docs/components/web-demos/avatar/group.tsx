'use client';

import { Avatar } from 'panelui-web/avatar';

const ME = 'https://avatars.githubusercontent.com/u/127331761?v=4';
const READERS = ['Tomás Ferreira', 'Ama Boateng', 'Lea Schmidt', 'Nikhil Rao', 'Olga Petrova', 'Sami Laine'];
const TEAMS = ['Design', 'Platform', 'Growth', 'Support', 'Finance'];

export default function AvatarGroupDemo() {
  return (
    <div className="flex flex-col items-center gap-8">
      {/* Hover or tab into it and it opens up. Press the count to see the rest. */}
      <Avatar.Group max={4} size="lg" label="Read by">
        <Avatar name="Khalid Abdi" src={ME} />
        {READERS.map((name) => (
          <Avatar key={name} name={name} />
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
