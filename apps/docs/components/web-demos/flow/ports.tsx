'use client';

import { Flow } from 'panelui-web/flow';

export default function FlowPorts() {
  return (
    <div className="h-[28rem] w-full">
      <Flow fitViewOnMount fitViewPadding={40} label="Photo uploads" className="h-full rounded-none border-0">
        <Flow.Background variant="cross" gap={26} />

        <Flow.Node id="upload" position={{ x: 0, y: 90 }} className="w-48">
          <Flow.NodeContent>
            <Flow.NodeTitle>upload</Flow.NodeTitle>
            <Flow.NodeDescription>Checks type and size</Flow.NodeDescription>
          </Flow.NodeContent>
          {/* Two ports on one face, kept apart by their offsets. */}
          <Flow.Handle id="ok" position="right" offset={0.3} />
          <Flow.Handle id="rejected" position="right" offset={0.75} />
        </Flow.Node>

        <Flow.Node id="resize" position={{ x: 290, y: 0 }} className="w-44">
          <Flow.NodeHeader>
            <Flow.NodeDescription>Accepted</Flow.NodeDescription>
            <Flow.NodeBadge color="success">ok</Flow.NodeBadge>
          </Flow.NodeHeader>
          <Flow.NodeContent>
            <Flow.NodeTitle>resize</Flow.NodeTitle>
          </Flow.NodeContent>
          <Flow.Handle id="in" position="left" />
          <Flow.Handle id="out" position="right" />
        </Flow.Node>

        <Flow.Node id="review" position={{ x: 290, y: 200 }} className="w-44">
          <Flow.NodeHeader>
            <Flow.NodeDescription>Rejected</Flow.NodeDescription>
            <Flow.NodeBadge color="destructive">held</Flow.NodeBadge>
          </Flow.NodeHeader>
          <Flow.NodeContent>
            <Flow.NodeTitle>review</Flow.NodeTitle>
          </Flow.NodeContent>
          <Flow.Handle id="in" position="left" />
          <Flow.Handle id="out" position="right" />
        </Flow.Node>

        {/* A port on every face. The top and bottom ones have nothing wired to
            them yet, and still read as somewhere to wire. */}
        <Flow.Node id="gallery" position={{ x: 570, y: 70 }} className="w-52">
          <Flow.NodeHeader>
            <Flow.NodeDescription>Four ports</Flow.NodeDescription>
          </Flow.NodeHeader>
          <Flow.NodeContent>
            <Flow.NodeTitle>gallery</Flow.NodeTitle>
            <Flow.NodeDescription>new · approved on the left</Flow.NodeDescription>
          </Flow.NodeContent>
          <Flow.Handle id="new" position="left" offset={0.35} />
          <Flow.Handle id="approved" position="left" offset={0.75} />
          <Flow.Handle id="feed" position="top" />
          <Flow.Handle id="archive" position="bottom" />
        </Flow.Node>

        {/* `node.handle` pins each end to a port, so the faces stay put however
            the nodes are dragged. */}
        <Flow.Edge from="upload.ok" to="resize.in" variant="smoothstep" arrow />
        <Flow.Edge from="upload.rejected" to="review.in" variant="smoothstep" dashed arrow color="destructive" />
        <Flow.Edge from="resize.out" to="gallery.new" variant="smoothstep" arrow />
        <Flow.Edge from="review.out" to="gallery.approved" variant="smoothstep" dashed arrow />
        <Flow.Controls position="top-left" lock={false} />
      </Flow>
    </div>
  );
}
