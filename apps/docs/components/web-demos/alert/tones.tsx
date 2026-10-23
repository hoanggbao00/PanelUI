'use client';

import { Alert, type AlertTone } from 'panelui-web/alert';

const MESSAGES: { tone: AlertTone; title: string; description: string }[] = [
  { tone: 'neutral', title: 'Drafts are kept for 30 days', description: 'After that they are cleared from the editor.' },
  { tone: 'info', title: 'A new editor is ready', description: 'It loads the next time you open a document.' },
  { tone: 'success', title: 'Your export is ready', description: '412 rows were written to orders-october.csv.' },
  { tone: 'warning', title: 'Storage is 90% full', description: 'Uploads stop at 50 GB. Clear out old files or move to a larger plan.' },
  { tone: 'destructive', title: 'The import stopped at row 1,204', description: 'A date in column C could not be read.' },
];

export default function AlertTones() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {MESSAGES.map((message) => (
        <Alert key={message.tone} tone={message.tone}>
          <Alert.Icon />
          <Alert.Title>{message.title}</Alert.Title>
          <Alert.Description>{message.description}</Alert.Description>
        </Alert>
      ))}
    </div>
  );
}
