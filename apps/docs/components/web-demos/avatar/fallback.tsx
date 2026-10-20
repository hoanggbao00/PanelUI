import { BotIcon } from 'lucide-react';
import { Avatar } from 'panelui-web/avatar';

const NAMES = ['Aiko Mori', 'Bram de Vries', 'Chiara Rossi', 'Dmitri Volkov', 'Esi Owusu', 'Farah Nasser'];

export default function AvatarFallback() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Each name lands on its own colour, the same one every time. */}
      <div className="flex flex-wrap justify-center gap-3">
        {NAMES.map((name) => (
          <Avatar key={name} name={name} size="lg" />
        ))}
      </div>
      <div className="flex items-center gap-3">
        {/* A picture that fails to load shows the initials instead. */}
        <Avatar name="Gil Amsalem" src="https://example.invalid/gil.jpg" size="lg" />
        {/* Something that is not a person. */}
        <Avatar alt="Release bot" fallback={<BotIcon />} color="chart-2" shape="square" size="lg" />
        {/* No name at all. */}
        <Avatar alt="Guest" size="lg" />
      </div>
    </div>
  );
}
