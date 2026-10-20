'use client';

import { DatabaseIcon, GlobeIcon, MailIcon, ServerIcon, ZapIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Flow } from 'panelui-web/flow';

function Service({ icon, name, detail, up = true }: { icon: ReactNode; name: string; detail: string; up?: boolean }) {
  return (
    <>
      <Flow.NodeHeader>
        <span className="flex items-center gap-2 text-muted-foreground [&_svg]:size-4">
          {icon}
          <Flow.NodeDescription>Service</Flow.NodeDescription>
        </span>
        <Flow.NodeBadge color={up ? 'success' : 'warning'}>{up ? 'Healthy' : 'Degraded'}</Flow.NodeBadge>
      </Flow.NodeHeader>
      <Flow.NodeContent>
        <Flow.NodeTitle>{name}</Flow.NodeTitle>
        <Flow.NodeDescription>{detail}</Flow.NodeDescription>
      </Flow.NodeContent>
    </>
  );
}

export default function FlowMap() {
  return (
    <div className="h-[28rem] w-full">
      <Flow fitViewOnMount fitViewPadding={40} label="Newsletter service" className="h-full rounded-none border-0">
        <Flow.Background variant="dots" />
        <Flow.Node id="site" position={{ x: 0, y: 120 }} className="w-52">
          <Service icon={<GlobeIcon />} name="site" detail="Sign-up pages" />
        </Flow.Node>
        <Flow.Node id="api" position={{ x: 300, y: 120 }} className="w-52">
          <Service icon={<ServerIcon />} name="api" detail="Three instances" />
        </Flow.Node>
        <Flow.Node id="db" position={{ x: 600, y: 0 }} className="w-52">
          <Service icon={<DatabaseIcon />} name="subscribers-db" detail="48,210 rows" />
        </Flow.Node>
        <Flow.Node id="cache" position={{ x: 600, y: 250 }} className="w-52">
          <Service icon={<ZapIcon />} name="cache" detail="92% hit rate" />
        </Flow.Node>
        <Flow.Node id="mailer" position={{ x: 300, y: 340 }} className="w-52">
          <Service icon={<MailIcon />} name="mailer" detail="Sending issue 112" up={false} />
        </Flow.Node>

        {/* No sides are named, so each edge leaves from whichever face faces the
            other node now. Drag one across another and watch them turn. */}
        <Flow.Edge from="site" to="api" variant="smoothstep" arrow />
        <Flow.Edge from="api" to="db" variant="smoothstep" arrow />
        <Flow.Edge from="api" to="cache" variant="smoothstep" dashed arrow />
        <Flow.Edge from="api" to="mailer" variant="smoothstep" animated arrow color="warning" />
        <Flow.Controls position="top-left" lock={false} />
      </Flow>
    </div>
  );
}
