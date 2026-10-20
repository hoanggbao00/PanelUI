import { BadgeCheckIcon } from 'lucide-react';
import { Avatar } from 'panelui-web/avatar';

const ME = 'https://avatars.githubusercontent.com/u/127331761?v=4';

export default function AvatarBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5">
      <Avatar name="Khalid Abdi" src={ME} size="lg">
        <Avatar.Badge status="online" />
      </Avatar>
      <Avatar name="Omar Haddad" size="lg">
        <Avatar.Badge status="away" />
      </Avatar>
      <Avatar name="Pia Lund" size="lg">
        <Avatar.Badge status="busy" />
      </Avatar>
      <Avatar name="Quentin Roy" size="lg">
        <Avatar.Badge status="offline" />
      </Avatar>
      <Avatar name="Harbour Works" shape="square" size="lg">
        <Avatar.Badge color="chart-2" label="verified">
          <BadgeCheckIcon />
        </Avatar.Badge>
      </Avatar>
    </div>
  );
}
