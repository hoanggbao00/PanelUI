import { Avatar, type AvatarSize } from 'panelui-web/avatar';

const ME = 'https://avatars.githubusercontent.com/u/127331761?v=4';
const SIZES: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export default function AvatarSizes() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-end gap-4">
        {SIZES.map((size) => (
          <Avatar key={size} size={size} name="Khalid Abdi" src={ME} />
        ))}
      </div>
      <div className="flex items-end gap-4">
        {SIZES.map((size) => (
          <Avatar key={size} size={size} shape="square" name="Harbour Works" />
        ))}
      </div>
    </div>
  );
}
