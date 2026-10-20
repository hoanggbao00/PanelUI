import { Avatar } from 'panelui-web/avatar';

const ME = 'https://avatars.githubusercontent.com/u/127331761?v=4';

export default function AvatarThumb() {
  return (
    <Avatar.Group size="lg" max={3}>
      <Avatar name="Khalid Abdi" src={ME} />
      <Avatar name="Kofi Mensah" />
      <Avatar name="Yuki Tanabe" />
      <Avatar name="Ravi Patel" />
      <Avatar name="Selma Berg" />
    </Avatar.Group>
  );
}
