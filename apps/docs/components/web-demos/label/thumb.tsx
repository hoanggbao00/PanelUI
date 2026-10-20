import { Input } from 'panelui-web/input';
import { Label } from 'panelui-web/label';

export default function LabelThumb() {
  return (
    <div className="flex w-56 flex-col gap-2">
      <Label required>
        <Label.Text>Email</Label.Text>
        <Label.Action>
          <a href="#thumb">Why?</a>
        </Label.Action>
      </Label>
      <Input placeholder="you@company.com" aria-label="Email" />
    </div>
  );
}
