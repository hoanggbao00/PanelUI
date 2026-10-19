'use client';

import { Textarea } from 'panelui-web/textarea';
import { useState } from 'react';

const LIMIT = 280;

export default function TextareaGrows() {
  const [text, setText] = useState('The release moved to Thursday. ');

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Textarea
        aria-label="Update"
        placeholder="What changed?"
        minRows={2}
        maxRows={6}
        maxLength={LIMIT}
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <p className="flex justify-between px-1 text-xs text-muted-foreground">
        <span>Grows to six lines, then scrolls.</span>
        <span className="tabular-nums">
          {text.length} / {LIMIT}
        </span>
      </p>
    </div>
  );
}
