'use client';

import { useRef, useState } from 'react';
import { Label } from 'panelui-web/label';
import { Switch } from 'panelui-web/switch';

/** Stands in for a request: a second to answer, and the second change of each setting fails. */
function save(attempt: number) {
  return new Promise<void>((resolve, reject) =>
    window.setTimeout(() => (attempt % 2 === 1 ? reject(new Error('offline')) : resolve()), 1100)
  );
}

function Setting({ title }: { title: string }) {
  const [on, setOn] = useState(false);
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const attempts = useRef(0);

  const change = async (next: boolean) => {
    // Shown at once, and put back if the save fails.
    setOn(next);
    setFailed(false);
    setPending(true);
    try {
      await save(attempts.current++);
    } catch {
      setOn(!next);
      setFailed(true);
    } finally {
      setPending(false);
    }
  };

  return (
    <Label invalid={failed}>
      <Label.Text>{title}</Label.Text>
      {failed ? <Label.Hint>Not saved, try again</Label.Hint> : pending ? <Label.Hint>Saving</Label.Hint> : null}
      <Label.Action>
        <Switch checked={on} onCheckedChange={change} pending={pending} />
      </Label.Action>
    </Label>
  );
}

export default function SwitchPending() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Setting title="Public profile" />
      <Setting title="Show me in search" />
    </div>
  );
}
