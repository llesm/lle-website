import type { ReactNode } from "react";

/**
 * InteractiveHoverButton — Magic UI "interactive-hover-button" pattern,
 * adapted to the LLE theme tokens.
 *
 * Idle:    [ • Label                    ]
 * Hover:   the accent dot scales up and floods the pill, the idle label
 *          slides right and fades, and a second label with an arrow
 *          glides in from the right.
 */

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

type Props = {
  children: ReactNode;
  /** Renders as an anchor when provided. */
  href?: string;
  type?: "button" | "submit";
  /** When present on an anchor, the default navigation is prevented so
   *  the SPA router can take over (the href stays in the DOM for SEO). */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  disabled?: boolean;
  /** Busy (sending) state — swaps the choreography for a pulsing dot. */
  busy?: boolean;
  busyLabel?: ReactNode;
  /** Size, border and padding classes, e.g. "border-ink px-8 py-4". */
  className?: string;
  /** Fill colour of the expanding dot. */
  dotClass?: string;
  /** Idle label colour. */
  textClass?: string;
  /** Hover (flooded) label colour. */
  hoverTextClass?: string;
};

export default function InteractiveHoverButton({
  children,
  href,
  type = "button",
  onClick,
  disabled = false,
  busy = false,
  busyLabel = "Sending…",
  className = "",
  dotClass = "bg-coral",
  textClass = "text-paper",
  hoverTextClass = "text-ink",
}: Props) {
  const rootClass = `group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border font-mono text-xs font-bold uppercase tracking-[0.16em] transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-70 ${className}`;

  const content = busy ? (
    <span className="relative z-10 flex items-center gap-3">
      <span className={`h-2 w-2 animate-blink rounded-full ${dotClass}`} />
      <span className={textClass}>{busyLabel}</span>
    </span>
  ) : (
    <>
      {/* idle layer — dot floods the pill, label exits right */}
      <span className="relative z-10 flex w-full items-center justify-center gap-3">
        <span
          className={`h-2 w-2 shrink-0 rounded-full transition-transform duration-300 ease-out group-hover:scale-[110] ${dotClass}`}
        />
        <span
          className={`transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 ${textClass}`}
        >
          {children}
        </span>
      </span>
      {/* hover layer — label + arrow glide in from the right */}
      <span
        className={`absolute inset-0 z-20 flex translate-x-8 items-center justify-center gap-2.5 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${hoverTextClass}`}
      >
        <span>{children}</span>
        <ArrowRightIcon className="h-3.5 w-3.5" />
      </span>
    </>
  );

  if (href && !disabled && !busy) {
    return (
      <a
        href={href}
        onClick={
          onClick
            ? (e) => {
                e.preventDefault();
                onClick(e);
              }
            : undefined
        }
        className={rootClass}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || busy}
      aria-busy={busy || undefined}
      className={rootClass}
    >
      {content}
    </button>
  );
}
