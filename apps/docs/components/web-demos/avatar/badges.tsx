import { BadgeCheckIcon } from 'lucide-react';
import { Avatar } from 'panelui-web/avatar';

export default function AvatarBadges() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-5">
        <Avatar name="Marta Silva" src="https://i.pravatar.cc/150?img=9" size="lg">
          <Avatar.Badge status="online" />
        </Avatar>
        <Avatar name="Omar Haddad" size="lg">
          <Avatar.Badge status="away" />
        </Avatar>
        <Avatar name="Pia Lund" src="https://i.pravatar.cc/150?img=16" size="lg">
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
      {/* The gap round a badge is cut, not painted, so it shows whatever is behind. */}
      <div className="flex items-center gap-5 rounded-2xl bg-linear-to-r from-chart-1/60 via-chart-3/50 to-chart-2/60 px-6 py-4">
        <Avatar name="Marta Silva" src="https://i.pravatar.cc/150?img=9" size="lg">
          <Avatar.Badge status="online" />
        </Avatar>
        <Avatar name="Omar Haddad" size="lg">
          <Avatar.Badge status="away" />
        </Avatar>
        <Avatar name="Quentin Roy" size="lg">
          <Avatar.Badge status="offline" />
        </Avatar>
      </div>
    </div>
  );
}
