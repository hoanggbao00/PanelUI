'use client';

/**
 * Sources — the pages an answer was written from, and the marks in the answer
 * that say which page each claim rests on.
 *
 * ```tsx
 * <Sources status="done">
 *   <Sources.Trigger />
 *   <Sources.Content>
 *     {pages.map((page) => (
 *       <Sources.Source key={page.url} href={page.url} title={page.title} snippet={page.snippet} />
 *     ))}
 *   </Sources.Content>
 *   <p>
 *     Most often it is under-proofing, which{' '}
 *     <Sources.Citation index={1}>leaves a tight, gummy middle</Sources.Citation>.
 *   </p>
 * </Sources>
 * ```
 *
 * ## A line, not a gallery
 *
 * The answer is what is being read, so the pages behind it stay out of its
 * way: one quiet line above it, "Read 5 sources", that opens into a plain
 * list. While the search runs the list is open, and the pages arrive in it one
 * at a time; once the search is done, it folds back to the line.
 *
 * ## The line draws how much each page was leaned on
 *
 * The line starts with a bar for every page. A bar's height is how many times
 * the answer cites that page, so a glance tells an answer resting on one page
 * from one spread across five. A page that could not be read is an empty bar.
 *
 * ## A citation marks the words it supports
 *
 * A citation can wrap the claim it backs. Pointing at its number lights the
 * claim, its bar and its page, and opens a card of what the page says.
 * Pointing at a page in the list lights every claim that rests on it, so a
 * reader can see exactly which sentences a page is responsible for.
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
  useState,
  type ComponentProps,
  type FocusEvent,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { tv } from 'tailwind-variants';

export type SourcesStatus = 'searching' | 'done';

const EASE = 'ease-[cubic-bezier(0.2,0,0,1)]';

const sourcesVariants = tv({
  slots: {
    root: 'group/sources flex w-full min-w-0 flex-col',
    trigger: [
      'group/trigger flex w-fit max-w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-lg py-1 text-start text-sm text-muted-foreground outline-none',
      'transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    ],
    label: 'min-w-0 truncate',
    // While searching, a highlight sweeps through the words.
    labelSearching: [
      'text-transparent bg-[linear-gradient(90deg,var(--muted-foreground)_0%,var(--muted-foreground)_40%,var(--foreground)_50%,var(--muted-foreground)_60%,var(--muted-foreground)_100%)] bg-[length:250%_100%] bg-clip-text',
      'animate-[sources-shimmer_2.2s_linear_infinite] motion-reduce:animate-none motion-reduce:bg-none motion-reduce:text-muted-foreground',
    ],
    chevron: [
      'size-3.5 shrink-0 transition-transform duration-300 motion-reduce:transition-none rtl:-scale-x-100',
      'group-data-open/sources:rotate-90',
    ],
    bars: 'flex h-[1.125rem] shrink-0 items-end gap-[2.5px]',
    bar: [
      'w-1 rounded-full bg-muted-foreground/45',
      `transition-[height,background-color,opacity] duration-500 ${EASE} motion-reduce:transition-none`,
      'data-active:bg-foreground',
    ],
    fold: `grid transition-[grid-template-rows,opacity] duration-300 ${EASE} motion-reduce:transition-none`,
    foldInner: 'min-h-0 overflow-hidden',
    list: 'flex flex-col py-1.5 ps-px',
    // One page. A hairline down the start edge ties the list to the line above it.
    row: [
      'group/row relative flex min-w-0 gap-3 rounded-e-lg py-1.5 pe-2 ps-3 outline-none',
      "before:absolute before:inset-y-0 before:start-0 before:w-px before:bg-border before:content-['']",
      'transition-[background-color,opacity,translate] duration-300 starting:-translate-y-1 starting:opacity-0 motion-reduce:transition-none',
      'hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring',
      'data-active:bg-muted data-active:before:bg-foreground',
    ],
    number: 'w-4 shrink-0 pt-px text-end text-xs font-medium tabular-nums text-muted-foreground group-data-active/row:text-foreground',
    body: 'flex min-w-0 flex-1 flex-col',
    head: 'flex min-w-0 items-baseline gap-2 text-sm',
    title: 'min-w-0 truncate text-foreground group-data-unreachable/row:text-muted-foreground',
    host: 'shrink-0 truncate text-xs text-muted-foreground',
    snippet: 'truncate text-xs leading-5 text-muted-foreground',
    // How many times the answer cites it, as dots.
    uses: 'flex shrink-0 items-center gap-[3px] self-center',
    use: 'size-[5px] rounded-full bg-muted-foreground/50 group-data-active/row:bg-foreground',
    waiting: 'flex items-center gap-3 py-1.5 ps-3 text-sm',
    waitingBar: 'h-2 rounded-full bg-muted motion-safe:animate-pulse',
    // The words a citation backs. Lit when its page or its number is pointed at.
    // Plain at rest, so the answer reads as prose; marked like a highlighter when lit.
    claim: [
      'rounded-[3px] [box-decoration-break:clone] transition-[background-color,box-shadow] duration-200 motion-reduce:transition-none',
      'data-active:bg-[color-mix(in_oklab,var(--foreground)_9%,transparent)] data-active:shadow-[0_0_0_2px_color-mix(in_oklab,var(--foreground)_9%,transparent)]',
    ],
    mark: [
      'relative -top-[0.5em] inline cursor-pointer rounded-[3px] px-[0.2em] align-baseline text-[0.7em] font-semibold leading-[1.3] tabular-nums no-underline',
      'text-muted-foreground outline-none transition-colors duration-200',
      'hover:bg-[color-mix(in_oklab,var(--foreground)_9%,transparent)] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
      'data-active:bg-[color-mix(in_oklab,var(--foreground)_9%,transparent)] data-active:text-foreground data-popup-open:text-foreground',
    ],
    card: [
      'z-50 flex w-80 max-w-[calc(100vw-2rem)] origin-(--transform-origin) flex-col gap-2.5 rounded-2xl border bg-popover p-4 text-popover-foreground shadow-lg outline-none',
      'transition-[opacity,scale,translate] duration-150 ease-out data-starting-style:translate-y-1 data-starting-style:scale-[0.97] data-starting-style:opacity-0',
      'data-ending-style:opacity-0 motion-reduce:transition-none',
    ],
    cardHead: 'flex items-center justify-between gap-3 text-xs text-muted-foreground',
    cardTitle: 'text-sm font-medium leading-5',
    cardQuote: 'line-clamp-4 border-s-2 ps-3 text-[0.8125rem] leading-5 text-muted-foreground',
    cardFoot: 'flex items-center justify-between gap-3 border-t pt-2.5 text-xs text-muted-foreground',
    cardOpen: 'inline-flex items-center gap-1 font-medium text-foreground [&_svg]:size-3.5 rtl:[&_svg]:-scale-x-100',
  },
});

/* -------------------------------------------------------------------------- */
/* State                                                                      */
/* -------------------------------------------------------------------------- */

interface SourceEntry {
  index: number;
  href?: string;
  title?: string;
  snippet?: string;
  icon?: string;
  host: string;
  unreachable: boolean;
}

interface SourcesContextValue {
  status: SourcesStatus;
  query?: string;
  total: number;
  /** Shown: while searching, or when opened. */
  shown: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  listId: string;
  entries: Record<number, SourceEntry>;
  register: (entry: SourceEntry) => () => void;
  /** How many citations point at each page. */
  uses: Record<number, number>;
  cite: (index: number) => () => void;
  /** The page being pointed at, by its number, from anywhere. */
  active: number | null;
  setActive: (index: number | null) => void;
}

const SourcesContext = createContext<SourcesContextValue | null>(null);
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

/* -------------------------------------------------------------------------- */
/* Root                                                                       */
/* -------------------------------------------------------------------------- */

export interface SourcesProps extends ComponentProps<'div'> {
  /**
   * `searching` while pages are still being read: the list is open and they
   * arrive in it. `done` once it is final: the list folds to its line. Default `done`.
   */
  status?: SourcesStatus;
  /** What was searched for. Shown in the line while searching. */
  query?: string;
  /**
   * How many pages the search will read. While searching, the ones not in yet
   * hold their place in the list. Defaults to the number of sources given.
   */
  total?: number;
  /** Whether the list is open once the search is done, when you hold that. */
  open?: boolean;
  /** Whether the list starts open once the search is done. Default false. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Holds the pages and the answer that cites them. The answer goes inside it
 * too, so its citations can find their pages.
 */
function SourcesRoot({
  status = 'done',
  query,
  total,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ...props
}: SourcesProps) {
  const [entries, setEntries] = useState<Record<number, SourceEntry>>({});
  const [uses, setUses] = useState<Record<number, number>>({});
  const [ownOpen, setOwnOpen] = useState(defaultOpen);
  const [active, setActive] = useState<number | null>(null);
  const open = openProp ?? ownOpen;
  const listId = useId();

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

  const cite = useCallback((index: number) => {
    setUses((current) => ({ ...current, [index]: (current[index] ?? 0) + 1 }));
    return () => setUses((current) => ({ ...current, [index]: Math.max(0, (current[index] ?? 1) - 1) }));
  }, []);

  const count = Object.keys(entries).length;
  const shown = status === 'searching' || open;
  const context = useMemo<SourcesContextValue>(
    () => ({
      status,
      query,
      total: Math.max(total ?? 0, count),
      shown,
      open,
      setOpen,
      listId,
      entries,
      register,
      uses,
      cite,
      active,
      setActive,
    }),
    [status, query, total, count, shown, open, setOpen, listId, entries, register, uses, cite, active]
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
        data-open={shown ? '' : undefined}
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
/* Trigger                                                                    */
/* -------------------------------------------------------------------------- */

export interface SourcesTriggerProps extends Omit<ComponentProps<'button'>, 'children'> {
  /**
   * Replaces the words. By default they are "Searching “query”" while
   * searching and "Read 5 sources" once done.
   */
  children?: ReactNode;
}

/**
 * The line: a bar for each page, as tall as the page is cited, then what is
 * happening. Pressing it opens and folds the list.
 */
function SourcesTrigger({ children, className, onClick, ...props }: SourcesTriggerProps) {
  const sources = useSources('Sources.Trigger');
  const slots = sourcesVariants();
  const read = Object.values(sources.entries).filter((entry) => !entry.unreachable).length;
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
      aria-expanded={sources.shown}
      aria-controls={sources.listId}
      className={slots.trigger({ className })}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !searching) sources.setOpen(!sources.open);
      }}
      {...props}
    >
      <Bars />
      <span className={slots.label({ className: searching ? slots.labelSearching() : undefined })}>{words}</span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={slots.chevron()}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 6l6 6-6 6" />
      </svg>
    </button>
  );
}
SourcesTrigger.displayName = 'Sources.Trigger';

/**
 * A bar for each page. Before a page is read it is a dot; read, it stands as
 * tall as the number of times it is cited, so the answer's weight can be seen.
 */
function Bars() {
  const sources = useSources('Sources.Trigger');
  const slots = sourcesVariants();
  if (sources.total === 0) return null;
  const count = Math.min(sources.total, 16);
  return (
    <span aria-hidden="true" className={slots.bars()}>
      {Array.from({ length: count }, (_, at) => {
        const index = at + 1;
        const entry = sources.entries[index];
        const uses = sources.uses[index] ?? 0;
        // A dot before it is read, a stub once read, and a step for each citation, up to four.
        const height = !entry ? 4 : entry.unreachable ? 7 : 7 + Math.min(uses, 4) * 2.75;
        return (
          <span
            key={index}
            data-active={sources.active === index ? '' : undefined}
            className={slots.bar({
              className: entry?.unreachable
                ? 'bg-transparent ring-1 ring-inset ring-muted-foreground/50'
                : !entry
                  ? 'opacity-50'
                  : undefined,
            })}
            style={{ height }}
          />
        );
      })}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Content and Source                                                         */
/* -------------------------------------------------------------------------- */

export interface SourcesContentProps extends ComponentProps<'div'> {}

/** The list of pages, numbered by their place. Open while searching and when opened. */
function SourcesContent({ className, children, ...props }: SourcesContentProps) {
  const sources = useSources('Sources.Content');
  const slots = sourcesVariants();
  const items = Children.toArray(children).filter(isValidElement) as ReactElement[];
  const waiting = sources.status === 'searching' ? Math.max(0, sources.total - items.length) : 0;

  return (
    <div
      className={slots.fold()}
      style={{ gridTemplateRows: sources.shown ? '1fr' : '0fr', opacity: sources.shown ? 1 : 0 }}
      inert={!sources.shown}
    >
      <div className={slots.foldInner()}>
        <div id={sources.listId} role="list" data-slot="sources-content" className={slots.list({ className })} {...props}>
          {items.map((child, at) => (
            <PlaceContext.Provider key={child.key ?? at} value={at + 1}>
              {child}
            </PlaceContext.Provider>
          ))}
          {/* Pages still to come hold their place, keyed by it, so arrivals do not shift the rest. */}
          {Array.from({ length: waiting }, (_, at) => (
            <div key={`waiting-${items.length + at}`} aria-hidden="true" className={slots.waiting()}>
              <span className={slots.number({ className: 'opacity-50' })}>{items.length + at + 1}</span>
              <span className={slots.waitingBar({ className: at === 0 ? 'w-40' : 'w-24 opacity-60' })} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
SourcesContent.displayName = 'Sources.Content';

export interface SourcesSourceProps extends Omit<ComponentProps<'a'>, 'title' | 'children'> {
  /** The page. Opened in a new tab. */
  href?: string;
  /** What the page is called. Falls back to its host. */
  title?: string;
  /** A line from the page: what it says, as the answer used it. Shown under the title and in the citation's card. */
  snippet?: string;
  /** The site's icon, as an image URL. Shown in the citation's card. */
  icon?: string;
  /** Its number, which its citations use. Set for you by its place in `Sources.Content`. */
  index?: number;
  /** The page could not be read. It stays in the list, marked, and its bar is left empty. */
  unreachable?: boolean;
}

/** One page: its number, its title, its site and a line of what it says. */
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
  const slots = sourcesVariants();
  const index = indexProp ?? place ?? 1;
  const host = hostOf(href) || title || 'source';
  const { register, setActive } = sources;

  useEffect(
    () => register({ index, href, title, snippet, icon, host, unreachable }),
    [register, index, href, title, snippet, icon, host, unreachable]
  );

  const uses = sources.uses[index] ?? 0;
  return (
    <a
      href={unreachable ? undefined : href}
      target={unreachable ? undefined : '_blank'}
      rel={unreachable ? undefined : 'noreferrer'}
      role="listitem"
      aria-disabled={unreachable || undefined}
      data-slot="sources-source"
      data-index={index}
      data-active={sources.active === index ? '' : undefined}
      data-unreachable={unreachable ? '' : undefined}
      className={slots.row({ className })}
      onPointerEnter={(event: PointerEvent<HTMLAnchorElement>) => {
        onPointerEnter?.(event);
        setActive(index);
      }}
      onPointerLeave={(event: PointerEvent<HTMLAnchorElement>) => {
        onPointerLeave?.(event);
        setActive(null);
      }}
      onFocus={(event: FocusEvent<HTMLAnchorElement>) => {
        onFocus?.(event);
        setActive(index);
      }}
      onBlur={(event: FocusEvent<HTMLAnchorElement>) => {
        onBlur?.(event);
        setActive(null);
      }}
      {...props}
    >
      <span className={slots.number()}>{index}</span>
      <span className={slots.body()}>
        <span className={slots.head()}>
          <span className={slots.title()}>
            {title || host}
            {unreachable ? null : <span className="sr-only"> (opens in a new tab)</span>}
          </span>
          <span className={slots.host()}>{host}</span>
          {uses > 0 ? (
            <span className={slots.uses()} title={`Cited ${uses} ${uses === 1 ? 'time' : 'times'}`}>
              {Array.from({ length: Math.min(uses, 5) }, (_, at) => (
                <span key={at} className={slots.use()} />
              ))}
              <span className="sr-only">
                , cited {uses} {uses === 1 ? 'time' : 'times'}
              </span>
            </span>
          ) : null}
        </span>
        {unreachable ? (
          <span className={slots.snippet()}>Could not be opened</span>
        ) : snippet ? (
          <span className={slots.snippet()}>{snippet}</span>
        ) : null}
      </span>
    </a>
  );
}
SourcesSource.displayName = 'Sources.Source';

/* -------------------------------------------------------------------------- */
/* Citation                                                                   */
/* -------------------------------------------------------------------------- */

export interface SourcesCitationProps extends Omit<ComponentProps<'a'>, 'children'> {
  /** The number of the page it points at. */
  index: number;
  /**
   * The words it supports. They are lit with the page when either is pointed
   * at. Leave out for a number on its own.
   */
  children?: ReactNode;
}

/**
 * A number in the answer, after the claim it backs. Pointing at it lights the
 * claim and its page and opens a card of what the page says; pressing it
 * opens the page.
 */
function SourcesCitation({ index, children, className, ...props }: SourcesCitationProps) {
  const sources = useSources('Sources.Citation');
  const slots = sourcesVariants();
  const entry = sources.entries[index];
  const lit = sources.active === index;
  const uses = sources.uses[index] ?? 0;
  const { cite, setActive } = sources;

  useEffect(() => cite(index), [cite, index]);

  const mark = (
    <PreviewCard.Root onOpenChange={(open) => setActive(open ? index : null)}>
      <PreviewCard.Trigger
        href={entry?.unreachable ? undefined : entry?.href}
        target="_blank"
        rel="noreferrer"
        aria-label={entry ? `Source ${index}: ${entry.title || entry.host}` : `Source ${index}`}
        data-slot="sources-citation"
        data-active={lit ? '' : undefined}
        className={slots.mark({ className })}
        delay={200}
        closeDelay={120}
        onPointerEnter={() => setActive(index)}
        onPointerLeave={() => setActive(null)}
        {...props}
      >
        {index}
      </PreviewCard.Trigger>
      {entry ? (
        <PreviewCard.Portal>
          <PreviewCard.Positioner side="top" sideOffset={8} className="z-50">
            <PreviewCard.Popup className={slots.card()}>
              <span className={slots.cardHead()}>
                <span className="flex min-w-0 items-center gap-1.5">
                  {entry.icon ? <img src={entry.icon} alt="" className="size-3.5 rounded-sm" /> : null}
                  <span className="truncate">{entry.host}</span>
                </span>
                <span className="tabular-nums">Source {index}</span>
              </span>
              <span className={slots.cardTitle()}>{entry.title || entry.host}</span>
              {entry.unreachable ? (
                <span className={slots.cardQuote()}>This page could not be opened while answering.</span>
              ) : entry.snippet ? (
                <span className={slots.cardQuote()}>{entry.snippet}</span>
              ) : null}
              <span className={slots.cardFoot()}>
                <span className="tabular-nums">
                  Backs {uses} {uses === 1 ? 'claim' : 'claims'} here
                </span>
                {entry.unreachable ? null : (
                  <span className={slots.cardOpen()}>
                    Open
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </span>
                )}
              </span>
            </PreviewCard.Popup>
          </PreviewCard.Positioner>
        </PreviewCard.Portal>
      ) : null}
    </PreviewCard.Root>
  );

  if (children === undefined) return mark;
  return (
    <>
      <span
        data-slot="sources-claim"
        data-active={lit ? '' : undefined}
        className={slots.claim()}
        onPointerEnter={() => setActive(index)}
        onPointerLeave={() => setActive(null)}
      >
        {children}
      </span>
      {mark}
    </>
  );
}
SourcesCitation.displayName = 'Sources.Citation';

export const Sources = Object.assign(SourcesRoot, {
  Trigger: SourcesTrigger,
  Content: SourcesContent,
  Source: SourcesSource,
  Citation: SourcesCitation,
});

export { SourcesTrigger, SourcesContent, SourcesSource, SourcesCitation };
