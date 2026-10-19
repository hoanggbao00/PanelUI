import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { MailIcon, SearchIcon } from 'lucide-react';
import { Input } from 'panelui-web/input';

export default function InputFields() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Input.Group>
        <Input.Addon>
          <SearchIcon />
        </Input.Addon>
        <Input placeholder="Search the handbook" aria-label="Search the handbook" />
        <Input.Addon align="end">
          <kbd>⌘K</kbd>
        </Input.Addon>
      </Input.Group>
      <Field>
        <FieldLabel>Work email</FieldLabel>
        <Input.Group>
          <Input.Addon>
            <MailIcon />
          </Input.Addon>
          <Input type="email" placeholder="you@company.com" />
        </Input.Group>
        <FieldDescription>We send the receipt here.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel>Display name</FieldLabel>
        <Input defaultValue="Rosa Okafor" />
      </Field>
    </div>
  );
}
