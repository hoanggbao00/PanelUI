'use client';

import { Flow, type FlowColor } from 'panelui-web/flow';

/** A trip being planned, and the five things it needs. */
const BRANCHES: { id: string; title: string; detail: string; x: number; y: number; color: FlowColor }[] = [
  { id: 'travel', title: 'Getting there', detail: 'Train, 2 h 50 min', x: -300, y: -150, color: 'primary' },
  { id: 'stay', title: 'Where to stay', detail: 'Three shortlisted', x: 280, y: -170, color: 'info' },
  { id: 'food', title: 'Food', detail: 'Market on Saturday', x: 340, y: 40, color: 'success' },
  { id: 'walks', title: 'Walks', detail: 'Coast path, 11 km', x: -320, y: 120, color: 'warning' },
  { id: 'budget', title: 'Budget', detail: '£640 for two', x: -20, y: 200, color: 'destructive' },
];

export default function FlowMindMap() {
  return (
    <div className="h-[28rem] w-full">
      <Flow fitViewOnMount fitViewPadding={36} label="Trip plan" className="h-full rounded-none border-0">
        <Flow.Background variant="cross" gap={32} />
        <Flow.Node id="trip" position={{ x: -100, y: -36 }} className="w-56 rounded-3xl">
          <Flow.NodeContent className="px-6 py-4 text-center">
            <Flow.NodeTitle className="text-base">A weekend in Porto</Flow.NodeTitle>
            <Flow.NodeDescription>14–16 November</Flow.NodeDescription>
          </Flow.NodeContent>
        </Flow.Node>

        {BRANCHES.map((branch) => (
          <Flow.Node key={branch.id} id={branch.id} position={{ x: branch.x, y: branch.y }} className="w-44">
            <Flow.NodeContent>
              <Flow.NodeTitle>{branch.title}</Flow.NodeTitle>
              <Flow.NodeDescription>{branch.detail}</Flow.NodeDescription>
            </Flow.NodeContent>
          </Flow.Node>
        ))}

        {/* Curves with no fixed sides: drag a branch round the centre and its
            edge leaves from the face that now points at it. */}
        {BRANCHES.map((branch) => (
          <Flow.Edge key={branch.id} from="trip" to={branch.id} variant="bezier" color={branch.color} width={2.5} />
        ))}
        <Flow.Controls position="top-left" zoom={false} lock={false} />
      </Flow>
    </div>
  );
}
