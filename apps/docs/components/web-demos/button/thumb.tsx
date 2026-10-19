import { SendIcon } from 'lucide-react';
import { Button } from 'panelui-web/button';

export default function ButtonThumb() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        <Button variant="outline">Preview</Button>
        <Button>
          <SendIcon />
          Publish
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm">
          Save draft
        </Button>
        <Button variant="ghost" size="sm">
          Cancel
        </Button>
      </div>
    </div>
  );
}
