import { Avatar } from 'panelui-web/avatar';

export default function AvatarThumb() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar.Group size="lg" max={3}>
        <Avatar name="Ines Duarte" src="https://i.pravatar.cc/150?img=5" />
        <Avatar name="Kofi Mensah" />
        <Avatar name="Yuki Tanabe" src="https://i.pravatar.cc/150?img=44" />
        <Avatar name="Ravi Patel" />
        <Avatar name="Selma Berg" />
      </Avatar.Group>
    </div>
  );
}
