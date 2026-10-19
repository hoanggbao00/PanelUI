'use client';

import { BrainIcon, SparklesIcon, ZapIcon } from 'lucide-react';
import { Prompt, type PromptRejectReason, type PromptModelItem } from 'panelui-web/prompt';
import { useEffect, useState } from 'react';

const MODELS: PromptModelItem[] = [
  { value: 'lumen', label: 'Lumen 4', icon: <SparklesIcon />, description: 'Balanced, for most questions' },
  { value: 'lumen-mini', label: 'Lumen 4 Mini', icon: <ZapIcon />, description: 'Quick answers to small asks' },
  { value: 'lumen-deep', label: 'Lumen 4 Deep', icon: <BrainIcon />, description: 'Slower, for hard problems' },
];

/** A small picture to attach, drawn here so the example needs no image file. */
async function drawSwatch(): Promise<File> {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 160;
  const context = canvas.getContext('2d')!;
  const style = getComputedStyle(document.documentElement);
  const colour = (token: string, fallback: string) => style.getPropertyValue(token).trim() || fallback;
  context.fillStyle = colour('--chart-2', '#6b8afd');
  context.fillRect(0, 0, 160, 160);
  context.fillStyle = colour('--chart-4', '#f5b84b');
  context.beginPath();
  context.arc(108, 56, 30, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = colour('--chart-1', '#2f4fd6');
  context.beginPath();
  context.moveTo(0, 160);
  context.lineTo(62, 84);
  context.lineTo(118, 160);
  context.fill();
  const blob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), 'image/png'));
  return new File([blob], 'homepage-hero.png', { type: 'image/png' });
}

const REASONS: Record<PromptRejectReason, string> = {
  accept: 'is not an image, a PDF or a spreadsheet',
  'max-files': 'is past the limit of four files',
};

export default function PromptAttachments() {
  const [files, setFiles] = useState<File[] | null>(null);
  const [rejected, setRejected] = useState<string | null>(null);

  // Made after mount: a canvas, and the files' object URLs, exist only in the browser.
  useEffect(() => {
    let live = true;
    drawSwatch().then((image) => {
      const sheet = new File(['month,visits\nAugust,1840\nSeptember,2215\n'], 'visits-by-month.csv', { type: 'text/csv' });
      if (live) setFiles([image, sheet]);
    });
    return () => {
      live = false;
    };
  }, []);

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      {files ? (
        <Prompt
          defaultFiles={files}
          defaultValue="Does the hero image match the September numbers?"
          accept="image/*,.pdf,.csv"
          maxFiles={4}
          onReject={(refused, reason) => setRejected(`${refused[0]?.name} ${REASONS[reason]}.`)}
        >
          <Prompt.Field>
            <Prompt.Attachments />
            <Prompt.Textarea placeholder="Drop files here, paste an image, or press the clip" />
            <Prompt.Footer>
              <Prompt.Tools>
                <Prompt.Attach />
                <Prompt.Model items={MODELS} />
              </Prompt.Tools>
              <Prompt.Submit />
            </Prompt.Footer>
          </Prompt.Field>
        </Prompt>
      ) : (
        <div className="h-[11.5rem]" />
      )}
      <p className="px-4 text-xs text-muted-foreground" aria-live="polite">
        {rejected ?? 'Images, PDFs and spreadsheets, up to four at a time.'}
      </p>
    </div>
  );
}
