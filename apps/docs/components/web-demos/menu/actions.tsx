'use client';

import {
  ArchiveIcon,
  CopyIcon,
  EllipsisIcon,
  LinkIcon,
  MailIcon,
  PencilIcon,
  Share2Icon,
  Trash2Icon,
  UsersIcon,
} from 'lucide-react';
import { Button } from 'panelui-web/button';
import { Menu } from 'panelui-web/menu';
import { useState } from 'react';

export default function MenuActions() {
  const [last, setLast] = useState<string | null>(null);
  const run = (action: string) => () => setLast(action);

  return (
    <div className="flex flex-col items-center gap-4">
      <Menu>
        <Menu.Trigger render={<Button variant="outline" />}>
          <EllipsisIcon />
          Document
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item onClick={run('Renamed')}>
            <PencilIcon />
            Rename
            <Menu.Shortcut>⌘R</Menu.Shortcut>
          </Menu.Item>
          <Menu.Item onClick={run('Duplicated')}>
            <CopyIcon />
            Duplicate
            <Menu.Shortcut>⌘D</Menu.Shortcut>
          </Menu.Item>
          <Menu.Sub>
            <Menu.SubTrigger>
              <Share2Icon />
              Share
            </Menu.SubTrigger>
            <Menu.SubContent>
              <Menu.Item onClick={run('Link copied')}>
                <LinkIcon />
                Copy link
              </Menu.Item>
              <Menu.Item onClick={run('Sent by email')}>
                <MailIcon />
                Send by email
              </Menu.Item>
              <Menu.Separator />
              <Menu.Item onClick={run('Opened sharing')}>
                <UsersIcon />
                Manage access
                <Menu.Badge>3</Menu.Badge>
              </Menu.Item>
            </Menu.SubContent>
          </Menu.Sub>
          <Menu.Separator />
          <Menu.Item onClick={run('Archived')}>
            <ArchiveIcon />
            Archive
          </Menu.Item>
          <Menu.Item variant="destructive" onClick={run('Deleted')}>
            <Trash2Icon />
            Delete
            <Menu.Shortcut>⌫</Menu.Shortcut>
          </Menu.Item>
        </Menu.Content>
      </Menu>
      <p className="text-xs text-muted-foreground" aria-live="polite">
        {last ?? 'Nothing chosen yet.'}
      </p>
    </div>
  );
}
