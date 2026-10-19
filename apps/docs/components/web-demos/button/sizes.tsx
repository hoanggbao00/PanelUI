import { PlusIcon, SendIcon } from 'lucide-react';
import { Button } from 'panelui-web/button';

export default function ButtonSizes() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="icon-sm" variant="outline" aria-label="Add">
          <PlusIcon />
        </Button>
        <Button size="icon" variant="outline" aria-label="Add">
          <PlusIcon />
        </Button>
        <Button size="icon-lg" variant="outline" aria-label="Add">
          <PlusIcon />
        </Button>
        <Button shape="pill">
          <SendIcon />
          Send invite
        </Button>
        <Button size="icon" shape="pill" aria-label="Send">
          <SendIcon />
        </Button>
      </div>
    </div>
  );
}
