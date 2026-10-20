import { Sources } from 'panelui-web/sources';

export default function SourcesThumb() {
  return (
    <Sources defaultOpen className="w-72">
      <Sources.Trigger />
      <Sources.Content>
        <Sources.Source href="https://breadlab.org/guides" title="Reading an under-proofed loaf" />
        <Sources.Source href="https://proofing.guide/temperature" title="Dough temperature and timing" />
      </Sources.Content>
    </Sources>
  );
}
