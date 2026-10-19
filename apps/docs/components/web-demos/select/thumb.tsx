import { Select } from 'panelui-web/select';

const PLANS = [
  { value: 'team', label: 'Team' },
  { value: 'studio', label: 'Studio' },
];

export default function SelectThumb() {
  return (
    <div className="w-56">
      <Select items={PLANS} defaultValue="team">
        <Select.Trigger aria-label="Plan">
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          {PLANS.map((plan) => (
            <Select.Item key={plan.value} value={plan.value}>
              {plan.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  );
}
