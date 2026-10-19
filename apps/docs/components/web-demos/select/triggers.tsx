import { ArrowDownWideNarrowIcon, LayersIcon } from 'lucide-react';
import { Select } from 'panelui-web/select';

const SORTS = [
  { value: 'recent', label: 'Most recent' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'name', label: 'Name' },
];

const VIEWS = [
  { value: 'board', label: 'Board' },
  { value: 'list', label: 'List' },
  { value: 'calendar', label: 'Calendar' },
];

export default function SelectTriggers() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <div className="w-44">
        <Select items={SORTS} defaultValue="recent">
          <Select.Trigger aria-label="Sort">
            <Select.Value />
          </Select.Trigger>
          <Select.Content>
            {SORTS.map((sort) => (
              <Select.Item key={sort.value} value={sort.value}>
                {sort.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </div>
      <Select items={SORTS} defaultValue="name">
        <Select.Trigger variant="ghost" aria-label="Sort">
          <ArrowDownWideNarrowIcon />
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          {SORTS.map((sort) => (
            <Select.Item key={sort.value} value={sort.value}>
              {sort.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
      <Select items={VIEWS} defaultValue="board">
        <Select.Trigger variant="pill" aria-label="View">
          <LayersIcon />
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          {VIEWS.map((view) => (
            <Select.Item key={view.value} value={view.value}>
              {view.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  );
}
