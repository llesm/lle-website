import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Asterisk, Reveal } from "../lib/motion";
import InteractiveHoverButton from "./InteractiveHoverButton";
import { goSection } from "../lib/router";
import {
  REPO_BRANCH,
  REPO_NAME,
  REPO_OWNER,
  repoFileUrl,
  useFirstImage,
} from "../lib/theme";
import { CONTACT_EMAIL } from "../lib/data";

export type Accent = "coral" | "aqua" | "amber";

const ACCENT_TEXT: Record<Accent, string> = {
  coral: "text-coral",
  aqua: "text-aqua",
  amber: "text-amber",
};
const ACCENT_BG: Record<Accent, string> = {
  coral: "bg-coral",
  aqua: "bg-aqua",
  amber: "bg-amber",
};
const ACCENT_BORDER: Record<Accent, string> = {
  coral: "border-coral",
  aqua: "border-aqua",
  amber: "border-amber",
};
const ACCENT_GLOW: Record<Accent, string> = {
  coral: "bg-coral/[0.07]",
  aqua: "bg-aqua/[0.06]",
  amber: "bg-amber/[0.06]",
};
const ACCENT_HOVER_TEXT: Record<Accent, string> = {
  coral: "group-hover:text-coral",
  aqua: "group-hover:text-aqua",
  amber: "group-hover:text-amber",
};

/* ------------------------------------------------------------------ */
/* Glyph icons                                                         */
/* ------------------------------------------------------------------ */
export type GlyphKind =
  | "pen"
  | "share"
  | "play"
  | "code"
  | "atom"
  | "globe"
  | "check"
  | "layers"
  | "rocket"
  | "shield";

export function GlyphIcon({
  kind,
  className,
}: {
  kind: GlyphKind;
  className?: string;
}) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };
  switch (kind) {
    case "pen":
      return (
        <svg {...common}>
          <path d="M14.5 4.5l5 5L8 21H3v-5L14.5 4.5z" />
          <path d="M12.5 6.5l5 5" />
        </svg>
      );
    case "share":
      return (
        <svg {...common}>
          <circle cx="6" cy="12" r="2.6" />
          <circle cx="17.5" cy="5.5" r="2.6" />
          <circle cx="17.5" cy="18.5" r="2.6" />
          <path d="M8.4 10.7l6.8-4M8.4 13.3l6.8 4" />
        </svg>
      );
    case "play":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M10 8.5l6 3.5-6 3.5v-7z" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
          <path d="M13.5 5l-3 14" />
        </svg>
      );
    case "atom":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
          <ellipse cx="12" cy="12" rx="9.5" ry="4" />
          <ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(-60 12 12)" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
        </svg>
      );
    case "check":
      return (
        <svg {...common} strokeWidth={2.2}>
          <path d="M4.5 12.5l5 5L19.5 7" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="M12 3l9 5-9 5-9-5 9-5z" />
          <path d="M3 13l9 5 9-5" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...common}>
          <path d="M12 3c4 2 6 6 6 10l-3 3H9l-3-3c0-4 2-8 6-10z" />
          <path d="M9 16l-3 5 5-3M15 16l3 5-5-3" />
          <circle cx="12" cy="10" r="2" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
          <path d="M9 12l2.2 2.2L15.5 10" />
        </svg>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/* MaskedTitle — letter-by-letter masked reveal                        */
/* ------------------------------------------------------------------ */
export type Segment = { text: string; cls?: string };

export function MaskedTitle({
  segments,
  className,
}: {
  segments: Segment[];
  className?: string;
}) {
  const prm = useReducedMotion();
  let order = 0;
  return (
    <span
      className={`flex flex-wrap items-baseline justify-center gap-x-[0.24em] ${
        className ?? ""
      }`}
    >
      {segments.map((seg, si) => (
        <span key={si} className={`flex overflow-hidden ${seg.cls ?? ""}`}>
          {seg.text.split("").map((ch, ci) => {
            const delay = 0.25 + order * 0.045;
            order += 1;
            return (
              <motion.span
                key={ci}
                className="inline-block"
                initial={prm ? { opacity: 0 } : { y: "112%" }}
                animate={prm ? { opacity: 1 } : { y: "0%" }}
                transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {ch}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* ServiceHero — blurred brand backdrop + masked title + tagline       */
/* ------------------------------------------------------------------ */
export function ServiceHero({
  bgCandidates,
  kicker,
  segments,
  tagline,
  meta,
  accent = "coral",
  titleClass = "text-[16vw] sm:text-7xl md:text-[8rem]",
  blurClass = "blur-[10px]",
}: {
  bgCandidates: string[];
  kicker: string;
  segments: Segment[];
  tagline: string;
  meta?: string;
  accent?: Accent;
  titleClass?: string;
  blurClass?: string;
}) {
  const bg = useFirstImage(bgCandidates);
  return (
    <section className="relative flex min-h-[94vh] items-center justify-center overflow-hidden bg-ink">
      {/* blurred brand backdrop */}
      {bg ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={bg}
            alt=""
            aria-hidden="true"
            className={`h-full w-full scale-110 object-cover saturate-[1.05] ${blurClass}`}
          />
        </motion.div>
      ) : (
        <div className="grid-lines absolute inset-0 opacity-70" />
      )}
      <div className="grid-lines absolute inset-0 opacity-25" />
      <div
        className={`pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-[130px] ${ACCENT_GLOW[accent]}`}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-28 text-center">
        <Reveal>
          <p className="mb-6 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.34em] text-paper/70">
            <Asterisk className={`h-4 w-4 ${ACCENT_TEXT[accent]}`} />
            {kicker}
            <Asterisk className={`h-4 w-4 ${ACCENT_TEXT[accent]}`} />
          </p>
        </Reveal>

        <h1
          className={`font-poster uppercase leading-[0.92] tracking-[0.01em] drop-shadow-[0_12px_48px_rgba(0,0,0,0.55)] ${titleClass}`}
        >
          <MaskedTitle segments={segments} />
        </h1>

        <Reveal delay={0.85}>
          <div className="mx-auto mt-8 flex max-w-md items-center gap-4">
            <span className="h-px flex-1 bg-paper/25" />
            <p
              className={`font-mono text-[11px] uppercase tracking-[0.3em] ${ACCENT_TEXT[accent]}`}
            >
              {tagline}
            </p>
            <span className="h-px flex-1 bg-paper/25" />
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <InteractiveHoverButton
              onClick={() => goSection("contact")}
              className={`${ACCENT_BORDER[accent]} px-7 py-4`}
              dotClass={ACCENT_BG[accent]}
              textClass={ACCENT_TEXT[accent]}
              hoverTextClass="text-ink"
            >
              Start a project
            </InteractiveHoverButton>
            <InteractiveHoverButton
              onClick={() => goSection("services")}
              className="border-line px-7 py-4"
              dotClass="bg-paper"
              textClass="text-paper"
              hoverTextClass="text-ink"
            >
              All services
            </InteractiveHoverButton>
          </div>
        </Reveal>

        {meta ? (
          <Reveal delay={1.1}>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.26em] text-paper/45">
              {meta}
            </p>
          </Reveal>
        ) : null}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <span className="animate-cue block text-coral">
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M8 2v11M3 9l5 5 5-5" />
          </svg>
        </span>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FolderCarousel — automated, interactive screenshot carousel fed by  */
/* a folder in the public repo.                                        */
/* ------------------------------------------------------------------ */
const IMG_EXT = /\.(png|jpe?g|webp|gif|svg)$/i;
const sortByName = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true });

/** List image files in a repo folder. Tries the GitHub contents API first,
 *  then falls back to the jsDelivr flat-tree API — which has no tight rate
 *  limit — so carousels never go dark when the GitHub API is throttled. */
async function fetchFolderImages(folder: string): Promise<string[]> {
  const prefix = folder.replace(/^\/+|\/+$/g, "") + "/";

  // Source 1 — GitHub contents API
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${prefix}?ref=${REPO_BRANCH}`,
      { headers: { Accept: "application/vnd.github+json" } }
    );
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length) {
        return data
          .filter((f) => f.type === "file" && IMG_EXT.test(f.name))
          .sort((a, b) => sortByName(a.name, b.name))
          .map((f) => repoFileUrl(f.path));
      }
    }
  } catch {
    /* fall through to jsDelivr */
  }

  // Source 2 — jsDelivr flat package tree
  try {
    const res = await fetch(
      `https://data.jsdelivr.com/v1/packages/gh/${REPO_OWNER}/${REPO_NAME}@${REPO_BRANCH}/flat`
    );
    if (!res.ok) return [];
    const data = await res.json();
    const files: { name: string }[] = Array.isArray(data?.files)
      ? data.files
      : [];
    return files
      .map((f) => f.name)
      .filter((name) => {
        if (!name.startsWith(prefix) || !IMG_EXT.test(name)) return false;
        // direct children only — no deeper nesting
        return !name.slice(prefix.length).includes("/");
      })
      .sort(sortByName)
      .map((name) => repoFileUrl(name));
  } catch {
    return [];
  }
}

/** Minimal phone device chrome used by the carousel's phone stage. */
function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-full aspect-[9/19]">
      <div className="absolute inset-0 rounded-[1.7rem] border border-line bg-ink p-[6px]">
        <div className="relative h-full w-full overflow-hidden rounded-[1.3rem] bg-ink-2">
          {src ? (
            <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function FolderCarousel({
  folder,
  label,
  accent = "coral",
  aspect = "aspect-[16/10]",
  frame = "screen",
}: {
  folder: string;
  label: string;
  accent?: Accent;
  aspect?: string;
  /** "screen" — full-bleed landscape frame (websites/blogs).
   *  "phone" — portrait device mockup stage for mobile screenshots. */
  frame?: "screen" | "phone";
}) {
  const [images, setImages] = useState<string[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "empty">(
    "loading"
  );
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prm = useReducedMotion();
  const touchX = useRef<number | null>(null);
  const isPhone = frame === "phone";

  useEffect(() => {
    let alive = true;
    fetchFolderImages(folder).then((imgs) => {
      if (!alive) return;
      setImages(imgs);
      setStatus(imgs.length ? "ready" : "empty");
    });
    return () => {
      alive = false;
    };
  }, [folder]);

  const count = images.length;

  useEffect(() => {
    if (status !== "ready" || paused || prm || count < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 4200);
    return () => clearInterval(t);
  }, [status, paused, prm, count]);

  const go = (d: number) => setIndex((i) => (i + d + count) % count);

  return (
    <div>
      {/* viewport */}
      <div
        className={`group/car relative ${
          isPhone ? "aspect-[4/5] sm:aspect-[16/10]" : aspect
        } overflow-hidden rounded-lg border border-line bg-ink-2`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerDown={(e) => {
          touchX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (touchX.current === null) return;
          const dx = e.clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
        }}
      >
        {status === "loading" && (
          <div className="shimmer absolute inset-0 grid place-items-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-mist">
              Loading screenshots…
            </span>
          </div>
        )}

        {status === "empty" && (
          <div className="absolute inset-0 grid place-items-center p-8 text-center">
            <div>
              <GlyphIcon
                kind="layers"
                className={`mx-auto h-10 w-10 ${ACCENT_TEXT[accent]}`}
              />
              <p className="mt-4 font-display text-lg font-semibold text-paper">
                Screenshots on the way
              </p>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-mist">
                We're polishing the visuals for {label}. Check back shortly.
              </p>
            </div>
          </div>
        )}

        {status === "ready" && (
          <>
            {isPhone ? (
              /* ---- phone stage ---- */
              <div className="absolute inset-0">
                {/* stage atmosphere */}
                <div className="grid-lines absolute inset-0 opacity-40" />
                <div
                  className={`absolute left-1/2 top-1/2 h-[70%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${ACCENT_GLOW[accent]}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-transparent to-ink-2/60" />

                {/* ghost devices (prev / next) */}
                {count > 1 && (
                  <>
                    <div className="absolute left-[4%] top-1/2 hidden h-[230px] -translate-y-1/2 -rotate-6 opacity-25 blur-[1px] sm:block lg:h-[270px] lg:left-[8%]">
                      <PhoneFrame
                        src={images[(index - 1 + count) % count]}
                        alt=""
                      />
                    </div>
                    <div className="absolute right-[4%] top-1/2 hidden h-[230px] -translate-y-1/2 rotate-6 opacity-25 blur-[1px] sm:block lg:h-[270px] lg:right-[8%]">
                      <PhoneFrame
                        src={images[(index + 1) % count]}
                        alt=""
                      />
                    </div>
                  </>
                )}

                {/* hero device */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-floaty relative z-10 h-[300px] sm:h-[380px] lg:h-[440px]">
                    <div className="absolute -inset-x-10 -bottom-8 h-12 rounded-[100%] bg-black/60 blur-2xl" />
                    <div
                      className={`absolute -inset-6 rounded-[3rem] blur-2xl ${ACCENT_GLOW[accent]}`}
                    />
                    <div className="relative h-full aspect-[9/19]">
                      {/* hardware buttons */}
                      <span className="absolute -right-[3px] top-[22%] h-12 w-[3px] rounded-r-md bg-ink-3" />
                      <span className="absolute -right-[3px] top-[36%] h-8 w-[3px] rounded-r-md bg-ink-3" />
                      <span className="absolute -left-[3px] top-[28%] h-9 w-[3px] rounded-l-md bg-ink-3" />
                      {/* bezel */}
                      <div className="absolute inset-0 rounded-[2.4rem] border border-paper/10 bg-gradient-to-b from-ink-3 to-ink p-[9px] shadow-[0_36px_90px_-24px_rgba(0,0,0,0.95)]">
                        <div className="relative h-full w-full overflow-hidden rounded-[1.8rem] bg-ink">
                          <span className="absolute left-1/2 top-2 z-20 h-[9px] w-14 -translate-x-1/2 rounded-full bg-ink-3" />
                          <AnimatePresence initial={false}>
                            <motion.img
                              key={images[index]}
                              src={images[index]}
                              alt={`${label} — screenshot ${index + 1} of ${count}`}
                              className="kenburns absolute inset-0 h-full w-full object-cover"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                            />
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ---- full-bleed screen ---- */
              <AnimatePresence initial={false}>
                <motion.img
                  key={images[index]}
                  src={images[index]}
                  alt={`${label} — screenshot ${index + 1} of ${count}`}
                  className="kenburns absolute inset-0 h-full w-full bg-ink-2 object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </AnimatePresence>
            )}

            {/* top meta */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-ink/80 to-transparent px-4 pb-6 pt-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/85">
                {label}
              </p>
              <p className="font-mono text-[10px] tracking-[0.2em] text-paper/70">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(count).padStart(2, "0")}
              </p>
            </div>

            {/* arrows */}
            {count > 1 && (
              <>
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink/70 text-paper opacity-0 backdrop-blur transition-all duration-300 hover:border-coral hover:bg-coral hover:text-ink group-hover/car:opacity-100 focus-visible:opacity-100"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M14 8H3M7 4L3 8l4 4" />
                  </svg>
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink/70 text-paper opacity-0 backdrop-blur transition-all duration-300 hover:border-coral hover:bg-coral hover:text-ink group-hover/car:opacity-100 focus-visible:opacity-100"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M2 8h11M9 4l4 4-4 4" />
                  </svg>
                </button>
              </>
            )}

            {/* progress bar */}
            {count > 1 && (
              <div className="absolute inset-x-0 bottom-0 h-[3px] bg-ink/60">
                <motion.div
                  key={index}
                  className={`h-full ${ACCENT_BG[accent]}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4.2, ease: "linear" }}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* thumbnails */}
      {status === "ready" && count > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setIndex(i)}
              aria-label={`Go to screenshot ${i + 1}`}
              className={`relative shrink-0 overflow-hidden rounded-md border transition-all duration-300 ${
                isPhone ? "h-24 w-12" : "h-14 w-20"
              } ${
                i === index
                  ? `${ACCENT_BORDER[accent]} opacity-100`
                  : "border-line opacity-50 hover:opacity-90"
              }`}
            >
              <img
                src={src}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* EditorialRow — numbered editorial row (not a card grid)             */
/* ------------------------------------------------------------------ */
export function EditorialRow({
  num,
  icon,
  title,
  tag,
  body,
  accent = "coral",
}: {
  num: string;
  icon: GlyphKind;
  title: string;
  tag?: string;
  body: string;
  accent?: Accent;
}) {
  return (
    <Reveal>
      <div className="group grid gap-6 border-t border-line py-10 transition-colors hover:bg-ink-2/60 md:grid-cols-12 md:items-start md:gap-8 md:py-12">
        <div className="flex items-center gap-5 md:col-span-3 md:flex-col md:items-start md:gap-4">
          <span className="text-stroke-thin font-display text-6xl font-bold md:text-7xl">
            {num}
          </span>
          <span
            className={`grid h-14 w-14 place-items-center rounded-lg border border-line bg-ink-2 ${ACCENT_TEXT[accent]} transition-all duration-500 group-hover:-rotate-6 group-hover:scale-105`}
          >
            <GlyphIcon kind={icon} className="h-7 w-7" />
          </span>
        </div>
        <div className="md:col-span-4">
          {tag ? (
            <p
              className={`mb-2 font-mono text-[10px] uppercase tracking-[0.24em] ${ACCENT_TEXT[accent]}`}
            >
              {tag}
            </p>
          ) : null}
          <h3 className="font-display text-2xl font-semibold tracking-tight text-paper md:text-3xl">
            {title}
          </h3>
        </div>
        <div className="md:col-span-5">
          <p className="text-justify text-sm leading-relaxed text-mist hyphens-auto md:text-base">
            {body}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* CaseStudy — client story + deliverables + result + carousel         */
/* ------------------------------------------------------------------ */
export type DidItem = { lead: string; body: string };

export function CaseStudy({
  num,
  client,
  sector,
  description,
  did,
  result,
  folder,
  accent = "coral",
  reverse = false,
  frame = "screen",
}: {
  num: string;
  client: string;
  sector: string;
  description: string;
  did: DidItem[];
  result: string;
  folder: string;
  accent?: Accent;
  reverse?: boolean;
  /** "screen" for website/blog shots, "phone" for mobile screenshots. */
  frame?: "screen" | "phone";
}) {
  return (
    <Reveal>
      <article className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className={`lg:col-span-5 ${reverse ? "lg:order-2" : ""}`}>
          <div className="flex items-baseline gap-4">
            <span
              className={`font-display text-5xl font-bold ${ACCENT_TEXT[accent]}`}
            >
              {num}
            </span>
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-paper md:text-3xl">
                {client}
              </h3>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-mist">
                {sector}
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-mist md:text-base">
            {description}
          </p>

          <p className="mb-3 mt-6 font-mono text-[11px] uppercase tracking-[0.24em] text-paper/70">
            What we did
          </p>
          <ul className="space-y-3">
            {did.map((d) => (
              <li
                key={d.lead}
                className="flex gap-3 text-sm leading-relaxed text-mist"
              >
                <GlyphIcon
                  kind="check"
                  className={`mt-0.5 h-4 w-4 shrink-0 ${ACCENT_TEXT[accent]}`}
                />
                <span>
                  <strong className="font-semibold text-paper">{d.lead}:</strong>{" "}
                  {d.body}
                </span>
              </li>
            ))}
          </ul>

          <div
            className={`mt-6 rounded-r-lg border-l-2 bg-ink-2 p-5 ${ACCENT_BORDER[accent]}`}
          >
            <p
              className={`font-mono text-[10px] uppercase tracking-[0.24em] ${ACCENT_TEXT[accent]}`}
            >
              The result
            </p>
            <p className="mt-2 text-sm leading-relaxed text-paper/85">
              {result}
            </p>
          </div>
        </div>

        <div className={`lg:col-span-7 ${reverse ? "lg:order-1" : ""}`}>
          <FolderCarousel
            folder={folder}
            label={client}
            accent={accent}
            frame={frame}
          />
        </div>
      </article>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* ServiceFaq — accordion                                              */
/* ------------------------------------------------------------------ */
export function ServiceFaq({
  faqs,
  accent = "coral",
}: {
  faqs: { q: string; a: string }[];
  accent?: Accent;
}) {
  const [open, setOpen] = useState(0);
  const prm = useReducedMotion();
  return (
    <div className="border-t border-line">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-line">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span
                className={`font-display text-lg font-medium tracking-tight transition-colors md:text-xl ${
                  isOpen
                    ? ACCENT_TEXT[accent]
                    : `text-paper ${ACCENT_HOVER_TEXT[accent]}`
                }`}
              >
                {f.q}
              </span>
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                  isOpen
                    ? `rotate-45 ${ACCENT_BORDER[accent]} ${ACCENT_BG[accent]} text-ink`
                    : `border-line text-paper ${ACCENT_HOVER_TEXT[accent]}`
                }`}
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M8 2v12M2 8h12" />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 text-sm leading-relaxed text-mist md:text-base">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Snapshot — ledger-style checklist of services                       */
/* ------------------------------------------------------------------ */
export function Snapshot({
  items,
  note,
  accent = "coral",
}: {
  items: { lead: string; body: string }[];
  note?: string;
  accent?: Accent;
}) {
  return (
    <div>
      <div className="border-t border-line">
        {items.map((it) => (
          <div
            key={it.lead}
            className="group flex items-start gap-4 border-b border-line py-4 transition-colors hover:bg-ink-2/60"
          >
            <GlyphIcon
              kind="check"
              className={`mt-0.5 h-5 w-5 shrink-0 ${ACCENT_TEXT[accent]}`}
            />
            <p className="text-sm leading-relaxed text-mist md:text-base">
              <strong className="font-semibold text-paper">{it.lead}</strong>
              {" — "}
              {it.body}
            </p>
          </div>
        ))}
      </div>
      {note ? (
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-mist">
          {note}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* StepStrip — numbered process steps on a connecting line             */
/* ------------------------------------------------------------------ */
export function StepStrip({
  steps,
  accent = "coral",
}: {
  steps: { title: string; body: string }[];
  accent?: Accent;
}) {
  const dot = {
    coral: "group-hover:border-coral group-hover:bg-coral",
    aqua: "group-hover:border-aqua group-hover:bg-aqua",
    amber: "group-hover:border-amber group-hover:bg-amber",
  }[accent];
  return (
    <div className="relative grid gap-10 md:grid-cols-5 md:gap-6">
      <div className="absolute left-0 right-0 top-[22px] hidden h-px bg-line md:block" />
      {steps.map((s, i) => (
        <Reveal key={s.title} delay={i * 0.08}>
          <div className="group relative">
            <span
              className={`relative z-10 grid h-11 w-11 place-items-center rounded-full border-2 border-line bg-ink font-mono text-xs font-bold text-paper transition-all duration-300 group-hover:text-ink ${dot}`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3
              className={`mt-5 font-display text-xl font-semibold tracking-tight text-paper transition-colors ${ACCENT_HOVER_TEXT[accent]}`}
            >
              {s.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">{s.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ReasonList — ledger of differentiators with icons                   */
/* ------------------------------------------------------------------ */
export function ReasonList({
  items,
  accent = "coral",
}: {
  items: { icon: GlyphKind; title: string; body: string }[];
  accent?: Accent;
}) {
  return (
    <div className="border-t border-line">
      {items.map((r) => (
        <div
          key={r.title}
          className="group flex items-start gap-4 border-b border-line py-5 transition-colors hover:bg-ink-2/60"
        >
          <span
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-line bg-ink-2 ${ACCENT_TEXT[accent]} transition-transform duration-300 group-hover:-rotate-6`}
          >
            <GlyphIcon kind={r.icon} className="h-5 w-5" />
          </span>
          <div>
            <h4 className="font-display text-lg font-semibold tracking-tight text-paper">
              {r.title}
            </h4>
            <p className="mt-1 text-sm leading-relaxed text-mist">{r.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ServiceCta — closing call-to-action band                            */
/* ------------------------------------------------------------------ */
export function ServiceCta({
  title,
  highlight,
  body,
  buttonLabel,
  accent = "coral",
}: {
  title: string;
  highlight: string;
  body: ReactNode;
  buttonLabel: string;
  accent?: Accent;
}) {
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] ${ACCENT_GLOW[accent]}`}
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <Reveal>
          <p
            className={`mb-5 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.3em] ${ACCENT_TEXT[accent]}`}
          >
            <Asterisk className="h-4 w-4" />
            Let's work together
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight text-paper sm:text-5xl md:text-6xl">
            {title} <span className={ACCENT_TEXT[accent]}>{highlight}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-mist md:text-lg">
            {body}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <InteractiveHoverButton
              onClick={() => goSection("contact")}
              className={`${ACCENT_BORDER[accent]} px-8 py-4`}
              dotClass={ACCENT_BG[accent]}
              textClass={ACCENT_TEXT[accent]}
              hoverTextClass="text-ink"
            >
              {buttonLabel}
            </InteractiveHoverButton>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group flex items-center gap-3 rounded-full border border-line px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-paper transition-all duration-300 hover:border-paper hover:bg-paper hover:text-ink"
            >
              {CONTACT_EMAIL}
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M3 13L13 3M6 3h7v7" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
