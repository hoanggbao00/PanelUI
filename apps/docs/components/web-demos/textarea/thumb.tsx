import { Textarea } from 'panelui-web/textarea';

export default function TextareaThumb() {
  return (
    <div className="w-64">
      <Textarea
        aria-label="Note"
        minRows={3}
        defaultValue="The release moved to Thursday. Design review stays on Wednesday at two."
      />
    </div>
  );
}
