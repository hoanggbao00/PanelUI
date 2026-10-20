'use client';

import { LampDeskIcon, RouterIcon, SpeakerIcon, ThermometerIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Flow } from 'panelui-web/flow';

function Device({ icon, name, detail }: { icon: ReactNode; name: string; detail: string }) {
  return (
    <Flow.NodeContent className="flex items-center gap-2.5 px-3 py-2.5 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground">
      {icon}
      <span className="min-w-0">
        <Flow.NodeTitle>{name}</Flow.NodeTitle>
        <Flow.NodeDescription className="text-xs">{detail}</Flow.NodeDescription>
      </span>
    </Flow.NodeContent>
  );
}

export default function FlowConfine() {
  return (
    <div className="h-[28rem] w-full">
      <Flow fitViewOnMount fitViewPadding={36} label="Smart home" className="h-full rounded-none border-0">
        <Flow.Background variant="dots" />

        <Flow.Node id="hub" position={{ x: 0, y: 120 }} className="w-40">
          <Device icon={<RouterIcon />} name="Hub" detail="Hallway" />
        </Flow.Node>

        {/* Nodes inside a group are placed relative to it, and the group needs a
            size because they do not lay it out. */}
        <Flow.Group id="living" label="Living room" position={{ x: 250, y: 0 }} size={{ width: 300, height: 180 }}>
          {/* Can be moved round the room, but not out of it. */}
          <Flow.Node id="lamp" confine position={{ x: 16, y: 44 }} className="w-36">
            <Device icon={<LampDeskIcon />} name="Lamp" detail="Drag me" />
          </Flow.Node>
          {/* Fixed to the wall: dragging it moves the room. */}
          <Flow.Node id="thermostat" pinned position={{ x: 140, y: 112 }} className="w-36">
            <Device icon={<ThermometerIcon />} name="Thermostat" detail="Pinned" />
          </Flow.Node>
        </Flow.Group>

        <Flow.Group id="kitchen" label="Kitchen" position={{ x: 250, y: 230 }} size={{ width: 300, height: 130 }}>
          <Flow.Node id="speaker" confine position={{ x: 120, y: 50 }} className="w-36">
            <Device icon={<SpeakerIcon />} name="Speaker" detail="Drag me" />
          </Flow.Node>
        </Flow.Group>

        <Flow.Edge from="hub" to="lamp" variant="smoothstep" arrow color="info" />
        <Flow.Edge from="hub" to="thermostat" variant="smoothstep" arrow color="info" />
        <Flow.Edge from="hub" to="speaker" variant="smoothstep" arrow color="info" />
        <Flow.Controls position="bottom-left" lock={false} />
      </Flow>
    </div>
  );
}
