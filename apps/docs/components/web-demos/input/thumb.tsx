import { SearchIcon } from 'lucide-react';
import { Input } from 'panelui-web/input';

export default function InputThumb() {
  return (
    <div className="flex w-64 flex-col gap-3">
      <Input.Group>
        <Input.Addon>
          <SearchIcon />
        </Input.Addon>
        <Input placeholder="Search the handbook" aria-label="Search" />
        <Input.Addon align="end">
          <kbd>⌘K</kbd>
        </Input.Addon>
      </Input.Group>
      <Input defaultValue="Rosa Okafor" aria-label="Name" />
    </div>
  );
}
