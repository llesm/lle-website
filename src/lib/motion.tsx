import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { LOGO_CANDIDATES } from "./theme";

/* ------------------------------------------------------------------ */
/* Reveal — scroll-triggered rise + fade                               */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  y = 30,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const prm = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={prm ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* ScrambleWord — cycles words through a decode effect                 */
/* ------------------------------------------------------------------ */
const GLYPHS = "#%&*+<=>/\\_";

export function ScrambleWord({
  words,
  className,
}: {
  words: string[];
  className?: string;
}) {
  const prm = useReducedMotion();
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (prm) {
      const id = setInterval(
        () => setText((t) => words[(words.indexOf(t) + 1) % words.length] ?? words[0]),
        2600
      );
      return () => clearInterval(id);
    }
    let frameTimer: ReturnType<typeof setInterval> | null = null;
    let wi = 0;
    const wordTimer = setInterval(() => {
      wi = (wi + 1) % words.length;
      const word = words[wi];
      const total = Math.max(8, word.length + 5);
      let f = 0;
      if (frameTimer) clearInterval(frameTimer);
      frameTimer = setInterval(() => {
        f += 1;
        const resolved = Math.floor((f / total) * word.length);
        let out = "";
        for (let i = 0; i < word.length; i += 1) {
          out +=
            i < resolved
              ? word[i]
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setText(out);
        if (f >= total) {
          setText(word);
          if (frameTimer) clearInterval(frameTimer);
        }
      }, 52);
    }, 2600);
    return () => {
      clearInterval(wordTimer);
      if (frameTimer) clearInterval(frameTimer);
    };
  }, [prm, words]);

  return (
    <span className={className} aria-live="polite">
      {text}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* CountUp — number ticker on entering view                            */
/* ------------------------------------------------------------------ */
export function CountUp({
  to,
  suffix = "",
  decimals = 0,
  duration = 1700,
  className,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prm = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prm) {
      setVal(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setVal(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, prm]);

  return (
    <span ref={ref} className={className}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee — seamless horizontal loop                                  */
/* ------------------------------------------------------------------ */
export function Marquee({
  children,
  speed = 32,
  reverse = false,
  className,
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div
        className="marquee-track flex w-max items-center"
        style={
          {
            "--marquee-speed": `${speed}s`,
            animationDirection: reverse ? "reverse" : undefined,
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* RotatingBadge — circular text stamp                                 */
/* ------------------------------------------------------------------ */
export function RotatingBadge({ className }: { className?: string }) {
  return (
    <a
      href="#contact"
      aria-label="Start a project with LLE Social Media"
      className={`group relative block ${className ?? ""}`}
    >
      <svg viewBox="0 0 120 120" className="animate-spin-slow h-full w-full">
        <defs>
          <path
            id="lle-circle"
            d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
          />
        </defs>
        <text className="fill-paper font-mono text-[10.5px] uppercase tracking-[0.22em]">
          <textPath href="#lle-circle">
            Let's talk • LLE Social Media • Let's talk •
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 text-coral transition-transform duration-500 group-hover:rotate-90"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        >
          <path d="M12 3v18M3 12h18" />
          <path d="M12 3l3 3M12 3L9 6" />
        </svg>
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* LogoGlyph — the LLE brand mark, drawn from the uploaded logo image. */
/* Walks the candidate paths and hides itself if none of them load.    */
/* ------------------------------------------------------------------ */
export function LogoGlyph({ className }: { className?: string }) {
  const [idx, setIdx] = useState(0);
  if (idx >= LOGO_CANDIDATES.length) return null;
  return (
    <img
      src={LOGO_CANDIDATES[idx]}
      alt=""
      aria-hidden="true"
      onError={() => setIdx((i) => i + 1)}
      className={`inline-block shrink-0 select-none object-contain align-middle ${
        className ?? ""
      }`}
    />
  );
}

/* ------------------------------------------------------------------ */
/* SectionHeading — mono kicker + display title                        */
/* ------------------------------------------------------------------ */
export function SectionHeading({
  index,
  kicker,
  title,
  note,
  dark = false,
}: {
  index?: string;
  kicker: string;
  title: ReactNode;
  note?: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <Reveal>
          <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-coral">
            <LogoGlyph className="h-3.5 w-3.5" />
            ( {index ? `${index} — ` : ""}
            {kicker} )
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            className={`font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl ${
              dark ? "text-ink" : "text-paper"
            }`}
          >
            {title}
          </h2>
        </Reveal>
      </div>
      {note ? (
        <Reveal delay={0.16} className="md:col-span-4">
          <p
            className={`max-w-xs font-mono text-[13px] leading-relaxed ${
              dark ? "text-ink/60" : "text-mist"
            }`}
          >
            {note}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ServiceIcon — hand-drawn stroke icons per service                   */
/* ------------------------------------------------------------------ */
export function ServiceIcon({
  kind,
  className,
}: {
  kind: "web" | "cart" | "store" | "pulse" | "phone";
  className?: string;
}) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 48 48",
  };
  switch (kind) {
    case "web":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="5" y="8" width="38" height="30" rx="2.5" />
          <path d="M5 16h38" />
          <circle cx="10.5" cy="12" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="15.5" cy="12" r="1.4" fill="currentColor" stroke="none" />
          <path d="M11 24h12M11 29h18M11 33h8" />
          <path d="M31 22l6 5-6 5" />
          <path d="M18 42h12" />
        </svg>
      );
    case "cart":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M7 10h6l4.5 20h19l3.5-14H15" />
          <circle cx="19.5" cy="37" r="3" />
          <circle cx="33.5" cy="37" r="3" />
          <path d="M22 16.5l8 8M30 16.5l-8 8" />
        </svg>
      );
    case "store":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M8 18l2.5-9h27L40 18" />
          <path d="M8 18c0 2.6 2 4.6 4.6 4.6S17.2 20.6 17.2 18c0 2.6 2 4.6 4.6 4.6s4.6-2 4.6-4.6c0 2.6 2 4.6 4.6 4.6s4.6-2 4.6-4.6c0 2.6 2 4.6 4.6 4.6S40 20.6 40 18" />
          <path d="M10.5 22.6V40h27V22.6" />
          <path d="M18 40V29h12v11" />
          <path d="M31 26.5h3" />
        </svg>
      );
    case "pulse":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M24 41S7 30.5 7 18.5C7 12 12 8 17 8c3.4 0 6 1.8 7 4 1-2.2 3.6-4 7-4 5 0 10 4 10 10.5C41 30.5 24 41 24 41z" />
          <path d="M11 22h7l2.5-5 4 9 2.5-4H37" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="13" y="5" width="22" height="38" rx="4" />
          <path d="M20 9h8" />
          <path d="M19 20l-4 5 4 5M29 20l4 5-4 5" />
          <circle cx="24" cy="38.5" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/* SocialIcon — minimal brand glyphs for the footer / contact          */
/* ------------------------------------------------------------------ */
export function SocialIcon({
  name,
  className,
}: {
  name: "instagram" | "linkedin" | "x" | "behance" | "facebook" | "youtube";
  className?: string;
}) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
  };
  switch (name) {
    case "instagram":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
          <path d="M7.5 10.5V17M7.5 7.4v.2M11.5 17v-4a2.5 2.5 0 015 0v4" />
        </svg>
      );
    case "x":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M4.5 4.5l15 15M19.5 4.5l-6.2 6.2M10.7 13.3l-6.2 6.2" />
        </svg>
      );
    case "behance":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M3.5 6.5h6a3 3 0 010 6h-6zM3.5 12.5h6.8a3.2 3.2 0 010 6.4H3.5zM14.5 13.5h8a4 4 0 10-8 .5zM15 8h6" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M16.5 3.5h-2.7a4.3 4.3 0 00-4.3 4.3v2.7H7v3.6h2.5v6.4h3.6v-6.4h2.7l.7-3.6h-3.4V8.1c0-.7.6-1.3 1.3-1.3h2.1z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="2.5" y="5.5" width="19" height="13.5" rx="3.8" />
          <path d="M10.2 9.3l4.6 2.95-4.6 2.95z" />
        </svg>
      );
    default:
      return null;
  }
}
