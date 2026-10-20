import { Avatar, type AvatarSize } from 'panelui-web/avatar';

const SIZES: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export default function AvatarSizes() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-end gap-4">
        {SIZES.map((size) => (
          <Avatar key={size} size={size} name="Lena Okoro" src="https://i.pravatar.cc/150?img=25" />
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
