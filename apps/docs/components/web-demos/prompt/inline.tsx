'use client';

import {
  BookImageIcon,
  GlobeIcon,
  ImagePlusIcon,
  LightbulbIcon,
  MicIcon,
  PenToolIcon,
  TelescopeIcon,
} from 'lucide-react';
import { Menu } from 'panelui-web/menu';
import { Prompt } from 'panelui-web/prompt';
import { useState } from 'react';

export default function PromptInline() {
  const [think, setThink] = useState(false);
  const [search, setSearch] = useState(false);

  return (
    <div className="w-full max-w-2xl">
      <Prompt>
        <Prompt.Field layout="inline">
          <Prompt.Attachments />
          <Prompt.Menu width="field" side="bottom">
            <Prompt.AttachItem shortcut={null}>
              Add files
              <Menu.Description>From this computer</Menu.Description>
            </Prompt.AttachItem>
            <Menu.Item>
              <BookImageIcon />
              Pick from library
              <Menu.Description>Files you have shared before</Menu.Description>
            </Menu.Item>
            <Menu.Item>
              <ImagePlusIcon />
              Make an image
              <Menu.Description>Describe it and get a picture</Menu.Description>
            </Menu.Item>
            <Menu.Separator />
            <Menu.CheckboxItem checked={search} onCheckedChange={setSearch}>
              <GlobeIcon />
              Search the web
              <Menu.Description>Fresh results, with sources</Menu.Description>
            </Menu.CheckboxItem>
            <Menu.Item>
              <TelescopeIcon />
              Research
              <Menu.Description>A long report with citations</Menu.Description>
            </Menu.Item>
            <Menu.Item>
              <PenToolIcon />
              Sketch
              <Menu.Description>Draw something and attach it</Menu.Description>
            </Menu.Item>
          </Prompt.Menu>
          <Prompt.Textarea minRows={1} maxRows={8} placeholder="Message Lumen" />
          <Prompt.Tool label="Think" showLabel variant="ghost" pressed={think} onPressedChange={setThink}>
            <LightbulbIcon />
          </Prompt.Tool>
          <Prompt.Tool label="Dictate" variant="ghost">
            <MicIcon />
          </Prompt.Tool>
          <Prompt.Submit onVoice={() => {}} />
        </Prompt.Field>
      </Prompt>
    </div>
  );
}
