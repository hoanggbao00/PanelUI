'use client';

import {
  BookTextIcon,
  BrainIcon,
  CalendarIcon,
  FolderIcon,
  GlobeIcon,
  PlusIcon,
  PlugIcon,
  ScrollTextIcon,
  SparklesIcon,
  TicketIcon,
  TriangleAlertIcon,
  ZapIcon,
} from 'lucide-react';
import { Menu } from 'panelui-web/menu';
import { Prompt, type PromptMessage, type PromptModelItem, type PromptState } from 'panelui-web/prompt';
import { useEffect, useRef, useState } from 'react';

const MODELS: PromptModelItem[] = [
  { value: 'lumen', label: 'Lumen 4', icon: <SparklesIcon />, description: 'Balanced, for most questions' },
  { value: 'lumen-mini', label: 'Lumen 4 Mini', icon: <ZapIcon />, description: 'Quick answers to small asks' },
  { value: 'lumen-deep', label: 'Lumen 4 Deep', icon: <BrainIcon />, description: 'Slower, for hard problems' },
];

const SKILLS = ['Weekly report', 'Release notes', 'Meeting brief', 'Code review'];

export default function PromptAsk() {
  const [status, setStatus] = useState<PromptState>('idle');
  const [search, setSearch] = useState(true);
  const [calendar, setCalendar] = useState(true);
  const [drive, setDrive] = useState(false);
  const [skill, setSkill] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  };
  useEffect(() => clear, []);

  // Stands in for a model: a moment to read the question, then a few seconds writing.
  const send = ({ text, files }: PromptMessage) => {
    clear();
    setListening(false);
    setSent(text || `${files.length} file${files.length === 1 ? '' : 's'}`);
    setStatus('submitted');
    timers.current.push(window.setTimeout(() => setStatus('streaming'), 1200));
    timers.current.push(window.setTimeout(() => setStatus('idle'), 4200));
  };

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Prompt
        onSubmit={send}
        status={status}
        onStop={() => {
          clear();
          setStatus('idle');
        }}
      >
        <Prompt.Field>
          <Prompt.Attachments />
          <Prompt.Textarea placeholder="Ask about your notes, or attach a file" />
          <Prompt.Footer>
            <Prompt.Tools>
              <Prompt.Menu>
                <Prompt.AttachItem />
                <Menu.Separator />
                <Menu.Sub>
                  <Menu.SubTrigger>
                    <BookTextIcon />
                    Skills
                  </Menu.SubTrigger>
                  <Menu.SubContent>
                    {SKILLS.map((name) => (
                      <Menu.Item key={name} onClick={() => setSkill(name)}>
                        <ScrollTextIcon />
                        {name}
                      </Menu.Item>
                    ))}
                    <Menu.Separator />
                    <Menu.Item>
                      <PlusIcon />
                      Browse skills
                    </Menu.Item>
                  </Menu.SubContent>
                </Menu.Sub>
                <Menu.Sub>
                  <Menu.SubTrigger
                    end={
                      drive ? null : (
                        <Menu.Badge>
                          <TriangleAlertIcon />1
                        </Menu.Badge>
                      )
                    }
                  >
                    <PlugIcon />
                    Connections
                  </Menu.SubTrigger>
                  <Menu.SubContent>
                    <Menu.CheckboxItem checked={calendar} onCheckedChange={setCalendar}>
                      <CalendarIcon />
                      Calendar
                    </Menu.CheckboxItem>
                    <Menu.CheckboxItem checked={drive} onCheckedChange={setDrive}>
                      <FolderIcon />
                      Shared drive
                    </Menu.CheckboxItem>
                    <Menu.Item disabled>
                      <TicketIcon />
                      Issue tracker
                    </Menu.Item>
                  </Menu.SubContent>
                </Menu.Sub>
              </Prompt.Menu>
              {/* A mode that stays in the footer and turns blue while it is on. */}
              <Prompt.Tool label="Search" showLabel pressed={search} onPressedChange={setSearch}>
                <GlobeIcon />
              </Prompt.Tool>
              {/* A skill chosen in the menu, pressed again to put it away. */}
              {skill ? (
                <Prompt.Tool label={skill} showLabel pressed onPressedChange={() => setSkill(null)} title={`Remove ${skill}`}>
                  <ScrollTextIcon />
                </Prompt.Tool>
              ) : null}
              <Prompt.Model items={MODELS} variant="ghost" />
            </Prompt.Tools>
            <Prompt.Submit onVoice={() => setListening((on) => !on)} listening={listening} />
          </Prompt.Footer>
        </Prompt.Field>
        <Prompt.Status icon={<SparklesIcon />}>
          {status === 'submitted' ? 'Reading your question' : 'Writing the answer'}
        </Prompt.Status>
      </Prompt>
      <p className="px-4 text-xs text-muted-foreground" aria-live="polite">
        {listening ? 'Listening…' : sent ? `Sent: ${sent}` : 'Nothing sent yet.'}
      </p>
    </div>
  );
}
