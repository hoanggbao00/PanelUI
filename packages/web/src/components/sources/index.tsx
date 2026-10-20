'use client';

/**
 * Sources — the pages an answer was written from, and the numbered marks in
 * the answer that point back at them.
 *
 * ```tsx
 * <Sources status="done" query="tide times holy island">
 *   <Sources.Trigger />
 *   <Sources.Content>
 *     {results.map((result) => (
 *       <Sources.Source key={result.url} href={result.url} title={result.title} snippet={result.snippet} />
 *     ))}
 *   </Sources.Content>
 *   <p>
 *     The causeway opens two hours after high water <Sources.Citation index={1} />.
 *   </p>
 * </Sources>
 * ```
 *
 * ## One number, two places
 *
 * Every source has a number, and a citation in the answer is that number.
 * The two are linked both ways: point at a citation and its source lights up
 * in the list, with a card of what it says; point at a source and every place
 * the answer leans on it lights up. A reader checking a claim should not have
 * to count along a row of cards to find the third one.
 *
 * ## The search is shown while it runs
 *
 * With `status="searching"` the line says what is being searched for, and a
 * ruler of ticks, one for each page, fills as each is read. Pages that have
 * not arrived yet hold their place in the list as empty cards, so the list
 * does not jump as they come in. A page that could not be read is still
 * listed, and its tick is marked, so a short answer can be told apart from a
 * search that failed.
 *
 * ## Only what fits, then the rest on request
 *
 * The cards sit in one row that scrolls sideways and snaps to each card.
 * Arrows at its ends step along it, and the end with more is faded. The
 * line above folds the row away entirely.
 */
import { PreviewCard } from '@base-ui/react/preview-card';
import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type FocusEvent,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { tv } from 'tailwind-variants';

export type SourcesStatus = 'searching' | 'done';
export type SourcesLayout = 'cards' | 'list';

const TINTS = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'] as const;

const sourcesVariants = tv({
  slots: {
    root: 'group/sources flex w-full min-w-0 flex-col',
    trigger: [
      'group/trigger -mx-2 flex w-fit max-w-[calc(100%+1rem)] min-w-0 cursor-pointer items-center gap-2.5 rounded-xl px-2 py-1.5 text-start text-sm outline-none',
      'transition-colors hover:bg-muted/70 focus-visible:ring-2 focus-visible:ring-ring',
    ],
    label: 'min-w-0 truncate font-medium text-foreground',
    // While searching, a highlight sweeps through the words, as a status line does.
    labelSearching: [
      'text-transparent bg-[linear-gradient(90deg,var(--muted-foreground)_0%,var(--muted-foreground)_40%,var(--foreground)_50%,var(--muted-foreground)_60%,var(--muted-foreground)_100%)] bg-[length:250%_100%] bg-clip-text',
      'animate-[sources-shimmer_2.2s_linear_infinite] motion-reduce:animate-none motion-reduce:bg-none motion-reduce:text-muted-foreground',
    ],
    stack: 'flex shrink-0 items-center -space-x-1.5 empty:hidden',
    stackIcon: 'ring-2 ring-background transition-[scale,opacity] duration-300 starting:scale-50 starting:opacity-0',
    ruler: 'flex h-3.5 shrink-0 items-end gap-[3px]',
    tick: 'w-[3px] rounded-full transition-[height,background-color] duration-300 ease-out motion-reduce:transition-none',
    chevron:
      'size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-data-open/sources:rotate-180 motion-reduce:transition-none',
    // A grid row from nothing to its own height, so folding animates without measuring.
    fold: 'grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none',
    foldInner: 'min-h-0 overflow-hidden',
    strip: 'relative mt-2',
    track: [
      'flex snap-x snap-proximity scroll-px-0.5 gap-2 overflow-x-auto p-0.5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
      'data-overflow-start:[--fade-start:2.5rem] data-overflow-end:[--fade-end:2.5rem]',
      '[mask-image:linear-gradient(to_right,transparent,#000_var(--fade-start,0px),#000_calc(100%-var(--fade-end,0px)),transparent)]',
    ],
    step: [
      'absolute top-1/2 z-10 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm outline-none',
      'transition-[opacity,scale,color] duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:scale-90',
      'pointer-coarse:hidden data-hidden:pointer-events-none data-hidden:scale-75 data-hidden:opacity-0 [&_svg]:size-4',
    ],
    card: [
      'group/card relative flex w-56 shrink-0 snap-start flex-col gap-2 rounded-2xl border bg-card p-3 text-card-foreground outline-none',
      'transition-[border-color,box-shadow,background-color,opacity,translate] duration-200',
      'starting:translate-y-1 starting:opacity-0 motion-reduce:transition-none',
      'hover:border-foreground/20 focus-visible:ring-2 focus-visible:ring-ring',
      // Lit when one of its citations is pointed at.
      'data-active:border-[color-mix(in_oklab,var(--primary)_45%,transparent)] data-active:bg-[color-mix(in_oklab,var(--primary)_5%,var(--card))]',
      'data-unreachable:bg-muted/40',
    ],
    cardHead: 'flex min-w-0 items-center gap-2 text-xs text-muted-foreground',
    host: 'min-w-0 flex-1 truncate',
    title: 'line-clamp-2 text-sm font-medium leading-5 text-foreground group-data-unreachable/card:text-muted-foreground',
    snippet: 'line-clamp-2 text-xs leading-[1.125rem] text-muted-foreground',
    unreachable: 'text-xs text-[var(--destructive)]',
    skeleton: 'flex w-56 shrink-0 snap-start flex-col gap-2.5 rounded-2xl border border-dashed p-3',
    bar: 'h-2.5 rounded-full bg-muted motion-safe:animate-pulse',
    list: 'mt-1.5 flex flex-col',
    row: [
      'group/card -mx-2 flex min-w-0 items-center gap-3 rounded-xl px-2 py-2 text-sm outline-none',
      'transition-colors hover:bg-muted/70 focus-visible:ring-2 focus-visible:ring-ring',
      'starting:opacity-0 motion-reduce:transition-none',
      'data-active:bg-[color-mix(in_oklab,var(--primary)_7%,transparent)]',
    ],
    rowTitle: 'min-w-0 flex-1 truncate text-foreground group-data-unreachable/card:text-muted-foreground',
    rowHost: 'max-w-[40%] shrink-0 truncate text-xs text-muted-foreground',
    rowArrow:
      'size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/card:opacity-100 group-focus-visible/card:opacity-100',
    // The number a source and its citations share.
    number: [
      'inline-flex h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-[5px] px-1 text-[0.6875rem] font-semibold leading-none tabular-nums',
      'bg-muted text-muted-foreground transition-colors duration-200',
      'group-data-active/card:bg-primary group-data-active/card:text-primary-foreground',
    ],
    icon: [
      'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[30%] font-semibold uppercase leading-none',
      'bg-[color-mix(in_oklab,var(--site)_20%,var(--card))] text-[color-mix(in_oklab,var(--site)_75%,var(--foreground))]',
    ],
    citation: [
      'mx-0.5 inline-flex h-[1.15rem] min-w-[1.15rem] cursor-pointer items-center justify-center gap-1 rounded-md px-1 align-[0.12em] text-[0.6875rem] font-semibold leading-none tabular-nums no-underline',
      'bg-muted text-muted-foreground outline-none transition-colors duration-200',
      'hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring',
      'data-active:bg-primary data-active:text-primary-foreground data-popup-open:bg-primary data-popup-open:text-primary-foreground',
    ],
    preview: [
      'z-50 flex w-72 origin-(--transform-origin) flex-col gap-2 rounded-2xl border bg-popover p-3.5 text-popover-foreground shadow-lg outline-none',
      'transition-[opacity,scale,translate] duration-150 ease-out data-starting-style:translate-y-1 data-starting-style:scale-95 data-starting-style:opacity-0',
      'data-ending-style:scale-95 data-ending-style:opacity-0 motion-reduce:transition-none',
    ],
    previewTitle: 'text-sm font-medium leading-5',
    previewSnippet: 'line-clamp-4 text-[0.8125rem] leading-5 text-muted-foreground',
  },
  variants: {
    size: {
      sm: { icon: 'size-4 text-[0.5625rem]' },
      md: { icon: 'size-5 text-[0.625rem]' },
      lg: { icon: 'size-6 text-[0.6875rem]' },
    },
  },
  defaultVariants: { size: 'md' },
});

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

interface SourceEntry {
  index: number;
  href?: string;
  title?: string;
  snippet?: string;
  icon?: string | ReactNode;
  host: string;
  unreachable: boolean;
}

interface SourcesContextValue {
  status: SourcesStatus;
  query?: string;
  total: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  contentId: string;
  entries: Record<number, SourceEntry>;
  register: (entry: SourceEntry) => () => void;
  /** The number being pointed at, in the list or in the answer. */
  active: number | null;
  /** Where it is being pointed at: a citation brings its source into view. */
  activeFrom: 'source' | 'citation' | null;
  setActive: (index: number | null, from?: 'source' | 'citation') => void;
}

const SourcesContext = createContext<SourcesContextValue | null>(null);
/** The number `Sources.Content` gives a source by its place, when it has none of its own. */
const PlaceContext = createContext<number | null>(null);

function useSources(part: string): SourcesContextValue {
  const context = useContext(SourcesContext);
  if (!context) throw new Error(`${part} must be used inside <Sources>.`);
  return context;
}

/** The host of a URL, without "www.", and without throwing on a bad one. */
function hostOf(href: string | undefined): string {
  if (!href) return '';
  try {
    return new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return href.replace(/^[a-z]+:\/\//i, '').split(/[/?#]/)[0]!.replace(/^www\./, '');
  }
}

function tintOf(host: string): string {
  let hash = 0;
  for (const char of host) hash = (hash * 31 + char.codePointAt(0)!) | 0;
  return `var(--${TINTS[Math.abs(hash) % TINTS.length]})`;
}

/* -------------------------------------------------------------------------- */
/* Root                                                                       */
/* -------------------------------------------------------------------------- */

export interface SourcesProps extends ComponentProps<'div'> {
  /** `searching` while pages are still being read; `done` once the list is final. Default `done`. */
  status?: SourcesStatus;
  /** What was searched for. Shown while searching. */
  query?: string;
  /**
   * How many pages the search will read. While searching, the ones not in yet
   * hold their place as empty cards. Defaults to the number of sources given.
   */
  total?: number;
  /** Whether the list is shown, when you hold that. */
  open?: boolean;
  /** Whether it starts shown. Default true. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Holds the sources and the answer that cites them. Put the answer inside it
 * too, so its `Sources.Citation`s can find their sources.
 */
function SourcesRoot({
  status = 'done',
  query,
  total,
  open: openProp,
  defaultOpen = true,
  onOpenChange,
  className,
  children,
  ...props
}: SourcesProps) {
  const [entries, setEntries] = useState<Record<number, SourceEntry>>({});
  const [ownOpen, setOwnOpen] = useState(defaultOpen);
  const [pointed, setPointed] = useState<{ index: number | null; from: 'source' | 'citation' | null }>({
    index: null,
    from: null,
  });
  const setActive = useCallback(
    (index: number | null, from: 'source' | 'citation' = 'source') =>
      setPointed(index === null ? { index: null, from: null } : { index, from }),
    []
  );
  const open = openProp ?? ownOpen;
  const contentId = useId();

  const setOpen = useCallback(
    (next: boolean) => {
      if (openProp === undefined) setOwnOpen(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange]
  );

  const register = useCallback((entry: SourceEntry) => {
    setEntries((current) => ({ ...current, [entry.index]: entry }));
    return () =>
      setEntries((current) => {
        if (current[entry.index] !== entry) return current;
        const { [entry.index]: _gone, ...rest } = current;
        return rest;
      });
  }, []);

  const count = Object.keys(entries).length;
  const context = useMemo<SourcesContextValue>(
    () => ({
      status,
      query,
      total: Math.max(total ?? 0, count),
      open,
      setOpen,
      contentId,
      entries,
      register,
      active: pointed.index,
      activeFrom: pointed.from,
      setActive,
    }),
    [status, query, total, count, open, setOpen, contentId, entries, register, pointed, setActive]
  );

  return (
    <SourcesContext.Provider value={context}>
      {/* The sweep for the searching line. Inline, so the component brings its own keyframes. */}
      <style href="panelui-sources-shimmer" precedence="default">
        {'@keyframes sources-shimmer{from{background-position:100% 0}to{background-position:-150% 0}}'}
      </style>
      <div
        data-slot="sources"
        data-status={status}
        data-open={open ? '' : undefined}
        className={sourcesVariants().root({ className })}
        {...props}
      >
        {children}
      </div>
    </SourcesContext.Provider>
  );
}
SourcesRoot.displayName = 'Sources';

/* -------------------------------------------------------------------------- */
/* Site icon                                                                  */
/* -------------------------------------------------------------------------- */

/** The site's own icon when one is given, or its first letter on a tint picked from its name. */
function SiteIcon({
  host,
  icon,
  size = 'md',
  className,
}: {
  host: string;
  icon?: string | ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const slots = sourcesVariants({ size });
  const style = { ['--site' as string]: tintOf(host) };
  if (typeof icon === 'string' && !failed) {
    return (
      <span aria-hidden="true" className={slots.icon({ className })} style={style}>
        <img src={icon} alt="" className="size-full object-cover" onError={() => setFailed(true)} />
      </span>
    );
  }
  return (
    <span aria-hidden="true" className={slots.icon({ className })} style={style}>
      {icon && typeof icon !== 'string' ? icon : (host[0] ?? '·')}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Trigger                                                                    */
/* -------------------------------------------------------------------------- */

export interface SourcesTriggerProps extends Omit<ComponentProps<'button'>, 'children'> {
  /**
   * Replaces the words. By default it is "Searching “query”" while searching
   * and "Read 6 sources" once done.
   */
  children?: ReactNode;
  /** How many site icons to stack before the words. Default 4; 0 for none. */
  icons?: number;
}

/**
 * The line over the list: the sites, what is happening, a ruler with a tick
 * for each page, and a chevron. Pressing it folds the list.
 */
function SourcesTrigger({ children, icons = 4, className, onClick, ...props }: SourcesTriggerProps) {
  const sources = useSources('Sources.Trigger');
  const slots = sourcesVariants();
  const list = Object.values(sources.entries).sort((a, b) => a.index - b.index);
  const read = list.length;
  const searching = sources.status === 'searching';
  const words =
    children ??
    (searching
      ? sources.query
        ? `Searching “${sources.query}”`
        : 'Searching'
      : `Read ${read} ${read === 1 ? 'source' : 'sources'}`);

  return (
    <button
      type="button"
      data-slot="sources-trigger"
      aria-expanded={sources.open}
      aria-controls={sources.contentId}
      className={slots.trigger({ className })}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) sources.setOpen(!sources.open);
      }}
      {...props}
    >
      {icons > 0 ? (
        <span className={slots.stack()}>
          {list.slice(0, icons).map((entry) => (
            <SiteIcon key={entry.index} host={entry.host} icon={entry.icon} className={slots.stackIcon()} />
          ))}
        </span>
      ) : null}
      <span className={slots.label({ className: searching ? slots.labelSearching() : undefined })}>{words}</span>
      <Ruler />
      <svg viewBox="0 0 24 24" aria-hidden="true" className={slots.chevron()} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}
SourcesTrigger.displayName = 'Sources.Trigger';

/** A tick for each page: tall and dark once read, short and pale before, red where it failed. */
function Ruler() {
  const sources = useSources('Sources.Trigger');
  const slots = sourcesVariants();
  if (sources.total === 0) return null;
  const ticks = Array.from({ length: Math.min(sources.total, 24) }, (_, at) => sources.entries[at + 1]);
  const next = ticks.findIndex((entry) => !entry);
  return (
    <span aria-hidden="true" className={slots.ruler()}>
      {ticks.map((entry, at) => (
        <span
          key={at}
          className={slots.tick({
            className: entry
              ? entry.unreachable
                ? 'h-full bg-[var(--destructive)]'
                : 'h-full bg-foreground/70'
              : at === next && sources.status === 'searching'
                ? 'h-2/3 bg-muted-foreground/60 motion-safe:animate-pulse'
                : 'h-1/3 bg-muted-foreground/30',
          })}
        />
      ))}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */

export interface SourcesContentProps extends ComponentProps<'div'> {
  /** `cards`, a row that scrolls sideways, or `list`, a column of lines. Default `cards`. */
  layout?: SourcesLayout;
}

/** The sources, folded away when the trigger is pressed. Each child is numbered by its place. */
function SourcesContent({ layout = 'cards', className, children, ...props }: SourcesContentProps) {
  const sources = useSources('Sources.Content');
  const slots = sourcesVariants();
  const items = Children.toArray(children).filter(isValidElement) as ReactElement[];
  const numbered = items.map((child, at) => (
    <PlaceContext.Provider key={child.key ?? at} value={at + 1}>
      {child}
    </PlaceContext.Provider>
  ));
  // Pages still being read hold their place. Keyed by the place they hold, so
  // when a page arrives its own placeholder goes and the others stay put;
  // keyed from zero, each would slide along and drag the scroll with it.
  const waiting = sources.status === 'searching' ? Math.max(0, sources.total - items.length) : 0;
  const placeholders = Array.from({ length: waiting }, (_, at) =>
    layout === 'cards' ? (
      <div key={`waiting-${items.length + at}`} aria-hidden="true" className={slots.skeleton()}>
        <span className={slots.bar({ className: 'w-1/3' })} />
        <span className={slots.bar({ className: 'w-11/12' })} />
        <span className={slots.bar({ className: 'w-2/3' })} />
      </div>
    ) : (
      <div key={`waiting-${items.length + at}`} aria-hidden="true" className="flex items-center gap-3 py-2.5">
        <span className={slots.bar({ className: 'size-5 rounded-md' })} />
        <span className={slots.bar({ className: 'w-1/2' })} />
      </div>
    )
  );

  return (
    <div
      className={slots.fold()}
      style={{ gridTemplateRows: sources.open ? '1fr' : '0fr', opacity: sources.open ? 1 : 0 }}
      inert={!sources.open}
    >
      <div className={slots.foldInner()}>
        {layout === 'cards' ? (
          <Strip id={sources.contentId} className={className} {...props}>
            {numbered}
            {placeholders}
          </Strip>
        ) : (
          <LayoutContext.Provider value="list">
            <div
              id={sources.contentId}
              role="list"
              data-slot="sources-content"
              data-layout="list"
              className={slots.list({ className })}
              {...props}
            >
              {numbered}
              {placeholders}
            </div>
          </LayoutContext.Provider>
        )}
      </div>
    </div>
  );
}
SourcesContent.displayName = 'Sources.Content';

const LayoutContext = createContext<SourcesLayout>('cards');

/** The sideways row, with fades and arrows at the ends that have more. */
function Strip({ className, children, ...props }: ComponentProps<'div'>) {
  const slots = sourcesVariants();
  const track = useRef<HTMLDivElement>(null);
  const [ends, setEnds] = useState({ start: false, end: false });

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const read = () => {
      const start = node.scrollLeft > 1;
      const end = node.scrollLeft + node.clientWidth < node.scrollWidth - 1;
      setEnds((current) => (current.start === start && current.end === end ? current : { start, end }));
    };
    read();
    node.addEventListener('scroll', read, { passive: true });
    const observer = new ResizeObserver(read);
    observer.observe(node);
    for (const child of node.children) observer.observe(child);
    return () => {
      node.removeEventListener('scroll', read);
      observer.disconnect();
    };
  }, [children]);

  const step = (direction: 1 | -1) => {
    const node = track.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <LayoutContext.Provider value="cards">
      <div className={slots.strip()}>
        <div
          ref={track}
          role="list"
          data-slot="sources-content"
          data-layout="cards"
          data-overflow-start={ends.start ? '' : undefined}
          data-overflow-end={ends.end ? '' : undefined}
          className={slots.track({ className })}
          {...props}
        >
          {children}
        </div>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          data-hidden={ends.start ? undefined : ''}
          className={slots.step({ className: '-start-2' })}
          onClick={() => step(-1)}
        >
          <Arrow flip />
        </button>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          data-hidden={ends.end ? undefined : ''}
          className={slots.step({ className: '-end-2' })}
          onClick={() => step(1)}
        >
          <Arrow />
        </button>
      </div>
    </LayoutContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/* Source                                                                     */
/* -------------------------------------------------------------------------- */

export interface SourcesSourceProps extends Omit<ComponentProps<'a'>, 'title' | 'children'> {
  /** The page. Opened in a new tab. */
  href?: string;
  /** What the page is called. Falls back to its host, which is a better label than a long URL. */
  title?: string;
  /** A line or two from the page: what it says, as the answer used it. */
  snippet?: string;
  /** The site's icon: an image URL or an element. Its first letter on a tint when left out. */
  icon?: string | ReactNode;
  /** Its number, which its citations use. Set for you by its place in `Sources.Content`. */
  index?: number;
  /** The page could not be read. It stays in the list, marked, and its tick turns red. */
  unreachable?: boolean;
}

/** One page: its number, its site, its title and what it says. */
function SourcesSource({
  href,
  title,
  snippet,
  icon,
  index: indexProp,
  unreachable = false,
  className,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...props
}: SourcesSourceProps) {
  const sources = useSources('Sources.Source');
  const place = useContext(PlaceContext);
  const layout = useContext(LayoutContext);
  const slots = sourcesVariants();
  const index = indexProp ?? place ?? 1;
  const host = hostOf(href) || title || 'source';
  const { register, setActive } = sources;

  // An icon given as an element is a new object on every render, so it is
  // compared by kind, not by identity; otherwise registering would re-render
  // the root, which re-renders this, which registers again.
  const iconKey = typeof icon === 'string' ? icon : icon ? 'element' : '';
  useEffect(
    () => register({ index, href, title, snippet, icon, host, unreachable }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [register, index, href, title, snippet, iconKey, host, unreachable]
  );

  const name = title || host;
  const lit = sources.active === index;
  const element = useRef<HTMLAnchorElement>(null);

  // A citation pointed at brings its card into view, scrolling the row and
  // never the page.
  useEffect(() => {
    if (!lit || sources.activeFrom !== 'citation' || layout !== 'cards') return;
    const card = element.current;
    const track = card?.parentElement;
    if (!card || !track) return;
    const box = card.getBoundingClientRect();
    const row = track.getBoundingClientRect();
    if (box.left >= row.left + 16 && box.right <= row.right - 16) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: box.left - row.left - (row.width - box.width) / 2, behavior: reduce ? 'auto' : 'smooth' });
  }, [lit, sources.activeFrom, layout]);
  const shared = {
    href: unreachable ? undefined : href,
    target: unreachable ? undefined : '_blank',
    rel: unreachable ? undefined : 'noreferrer',
    role: 'listitem',
    'data-slot': 'sources-source',
    'data-index': index,
    'data-active': lit ? '' : undefined,
    'data-unreachable': unreachable ? '' : undefined,
    'aria-disabled': unreachable || undefined,
    onPointerEnter: (event: PointerEvent<HTMLAnchorElement>) => {
      onPointerEnter?.(event);
      setActive(index);
    },
    onPointerLeave: (event: PointerEvent<HTMLAnchorElement>) => {
      onPointerLeave?.(event);
      setActive(null);
    },
    onFocus: (event: FocusEvent<HTMLAnchorElement>) => {
      onFocus?.(event);
      setActive(index);
    },
    onBlur: (event: FocusEvent<HTMLAnchorElement>) => {
      onBlur?.(event);
      setActive(null);
    },
    ...props,
  };
  const newTab = unreachable ? null : <span className="sr-only"> (opens in a new tab)</span>;

  if (layout === 'list') {
    return (
      <a ref={element} {...shared} className={slots.row({ className })}>
        <span className={slots.number()}>{index}</span>
        <SiteIcon host={host} icon={icon} />
        <span className={slots.rowTitle()}>
          {name}
          {newTab}
        </span>
        <span className={slots.rowHost()}>{unreachable ? 'Could not be read' : host}</span>
        <Arrow external className={slots.rowArrow()} />
      </a>
    );
  }

  return (
    <a ref={element} {...shared} className={slots.card({ className })}>
      <span className={slots.cardHead()}>
        <span className={slots.number()}>{index}</span>
        <SiteIcon host={host} icon={icon} size="sm" />
        <span className={slots.host()}>{host}</span>
      </span>
      <span className={slots.title()}>
        {name}
        {newTab}
      </span>
      {unreachable ? (
        <span className={slots.unreachable()}>Could not be read</span>
      ) : snippet ? (
        <span className={slots.snippet()}>{snippet}</span>
      ) : null}
    </a>
  );
}
SourcesSource.displayName = 'Sources.Source';

/* -------------------------------------------------------------------------- */
/* Citation                                                                   */
/* -------------------------------------------------------------------------- */

export interface SourcesCitationProps extends Omit<ComponentProps<'a'>, 'children'> {
  /** The number of the source it points at. */
  index: number;
  /** In place of the number, such as the site's name. */
  children?: ReactNode;
}

/**
 * A numbered mark in the answer. Pointing at it lights its source in the
 * list and opens a card of what the source says; pressing it opens the page.
 */
function SourcesCitation({ index, children, className, ...props }: SourcesCitationProps) {
  const sources = useSources('Sources.Citation');
  const slots = sourcesVariants();
  const entry = sources.entries[index];
  const lit = sources.active === index;
  const label = entry ? `Source ${index}: ${entry.title || entry.host}` : `Source ${index}`;

  return (
    <PreviewCard.Root
      onOpenChange={(open) => sources.setActive(open ? index : null, 'citation')}
    >
      <PreviewCard.Trigger
        href={entry?.unreachable ? undefined : entry?.href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        data-slot="sources-citation"
        data-active={lit ? '' : undefined}
        className={slots.citation({ className })}
        delay={250}
        closeDelay={120}
        onPointerEnter={() => sources.setActive(index, 'citation')}
        onPointerLeave={() => sources.setActive(null)}
        {...props}
      >
        {children ?? index}
      </PreviewCard.Trigger>
      {entry ? (
        <PreviewCard.Portal>
          <PreviewCard.Positioner side="top" sideOffset={8} className="z-50">
            <PreviewCard.Popup className={slots.preview()}>
              <span className={slots.cardHead()}>
                <span className={slots.number({ className: 'bg-primary text-primary-foreground' })}>{index}</span>
                <SiteIcon host={entry.host} icon={entry.icon} size="sm" />
                <span className={slots.host()}>{entry.host}</span>
              </span>
              <span className={slots.previewTitle()}>{entry.title || entry.host}</span>
              {entry.unreachable ? (
                <span className={slots.unreachable()}>Could not be read</span>
              ) : entry.snippet ? (
                <span className={slots.previewSnippet()}>{entry.snippet}</span>
              ) : null}
            </PreviewCard.Popup>
          </PreviewCard.Positioner>
        </PreviewCard.Portal>
      ) : null}
    </PreviewCard.Root>
  );
}
SourcesCitation.displayName = 'Sources.Citation';

/* -------------------------------------------------------------------------- */
/* Glyphs                                                                     */
/* -------------------------------------------------------------------------- */

function Arrow({ flip = false, external = false, className }: { flip?: boolean; external?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={[flip ? '-scale-x-100 rtl:scale-x-100' : 'rtl:-scale-x-100', className].filter(Boolean).join(' ')}
    >
      {external ? <path d="M7 17L17 7M9 7h8v8" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

export const Sources = Object.assign(SourcesRoot, {
  Trigger: SourcesTrigger,
  Content: SourcesContent,
  Source: SourcesSource,
  Citation: SourcesCitation,
});

export { SourcesTrigger, SourcesContent, SourcesSource, SourcesCitation };
