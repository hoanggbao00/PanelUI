'use client';

import { CheckIcon } from 'lucide-react';
import { Button } from 'panelui-web/button';
import { useState } from 'react';

export default function ButtonLoading() {
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle');

  const save = () => {
    setState('saving');
    window.setTimeout(() => setState('saved'), 1600);
    window.setTimeout(() => setState('idle'), 3400);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button loading={state === 'saving'} onClick={save}>
        {state === 'saved' ? (
          <>
            <CheckIcon />
            Saved
          </>
        ) : (
          'Save changes'
        )}
      </Button>
      <Button variant="outline" loading>
        Uploading
      </Button>
    </div>
  );
}
