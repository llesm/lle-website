import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Asterisk,
  Marquee,
  Reveal,
  ServiceIcon,
  SocialIcon,
} from "../lib/motion";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  NAV_LINKS,
  SERVICES,
  SOCIALS,
} from "../lib/data";
import { LOGO_CANDIDATES } from "../lib/theme";
import { goRouteHref, goSection, goServiceNav, isRouteHref } from "../lib/router";

/**
 * Anchor click handler for SPA navigation: sub-page paths (about-us,
 * medical-content, website-designing) are taken over by the router —
 * the href stays clean in the DOM for SEO; section anchors (#work…)
 * go through goSection so they also work from sub-pages.
 */
function navGo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (isRouteHref(href)) {
    e.preventDefault();
    goRouteHref(href);
    return;
  }
  e.preventDefault();
  goSection(href.replace(/^#/, ""));
}

const ACCENT_TEXT: Record<string, string> = {
  coral: "text-coral",
  aqua: "text-aqua",
  amber: "text-amber",
};
const ACCENT_BG: Record<string, string> = {
  coral: "bg-coral",
  aqua: "bg-aqua",
  amber: "bg-amber",
};

/* ------------------------------------------------------------------ */
/* LogoMark — uploaded logo (tries several paths), monogram fallback   */
/* ------------------------------------------------------------------ */
function LogoMark({ className }: { className?: string }) {
  const [idx, setIdx] = useState(0);
  if (idx >= LOGO_CANDIDATES.length) {
    // Fallback monogram — shown only until lle-LOGO2.png is placed in
    // the public/ folder. Deliberately designed, not a broken-image icon.
    return (
      <span
        className={`grid place-items-center overflow-hidden rounded-lg border border-coral/60 bg-ink-3 ${className ?? "h-10 w-10"}`}
      >
        <span className="relative grid place-items-center">
          <Asterisk className="absolute h-[130%] w-[130%] text-coral/15" />
          <span className="font-display text-[13px] font-extrabold tracking-tight text-coral">
            LLE
          </span>
        </span>
      </span>
    );
  }
  // Mounted on a light tile so the logo reads on the dark header whether
  // it ships with a white background or transparent artwork.
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-md bg-paper/95 p-1 shadow-[0_0_0_1px_rgba(244,243,238,0.12)] ${className ?? "h-10 w-10"}`}
    >
      <img
        src={LOGO_CANDIDATES[idx]}
        alt="LLE Social Media logo"
        onError={() => setIdx((i) => i + 1)}
        className="h-full w-full object-contain"
      />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Custom cursor — coral dot + lagging ring (fine pointers only)       */
/* ------------------------------------------------------------------ */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const prm = useReducedMotion();
  const [fine, setFine] = useState(false);

  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!fine || prm) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };
    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest(
        "a, button, [data-cursor], input, select, textarea, label"
      );
      targetScale = t ? 2.4 : 1;
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      scale += (targetScale - scale) * 0.18;
      if (dotRef.current)
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(loop);
    document.documentElement.classList.add("cursor-on");
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-on");
    };
  }, [fine, prm]);

  if (!fine || prm) return null;
  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[95] h-2 w-2 rounded-full bg-coral opacity-0"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[94] h-9 w-9 rounded-full border border-paper/50 opacity-0 transition-opacity duration-300"
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Nav — sticky bar, scroll progress, full-screen mobile menu          */
/* ------------------------------------------------------------------ */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(true);
  const moreRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      setScrolled(top > 30);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? top / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-ink/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        {/* scroll progress */}
        <div
          className="absolute left-0 top-0 h-[2px] bg-coral transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a
            href="#top"
            onClick={(e) => navGo(e, "#top")}
            className="group flex items-center gap-3"
            aria-label="LLE Social Media, home"
          >
            <LogoMark className="h-10 w-10 shrink-0 object-contain transition-transform duration-500 group-hover:scale-105" />
            <span className="leading-none">
              <span className="block font-display text-xl font-bold leading-none tracking-tight text-paper">
                LLE <span className="text-coral">Social Media</span>
              </span>
              <span className="mt-1 block -mr-[0.22em] font-mono text-[8px] uppercase leading-none tracking-[0.22em] text-mist">
                Listen | Learn | Engage
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => navGo(e, l.href)}
                  className="group relative font-mono text-xs uppercase tracking-[0.2em] text-paper/70 transition-colors hover:text-paper"
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-coral transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
              <li>
                <a
                  href="#contact"
                  onClick={(e) => navGo(e, "#contact")}
                  className="group relative font-mono text-xs uppercase tracking-[0.2em] text-paper/70 transition-colors hover:text-paper"
                >
                  Contact
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-coral transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
          </ul>

          <div className="flex items-center gap-3">
            {/* Explore More — page pulldown */}
            <div className="relative hidden sm:block" ref={moreRef}>
              <button
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                aria-haspopup="true"
                className="group flex items-center gap-2 rounded-full border border-coral bg-coral px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink transition-all duration-300 hover:bg-transparent hover:text-coral"
              >
                Explore More
                <svg
                  viewBox="0 0 16 16"
                  className={`h-3 w-3 transition-transform duration-300 ${
                    moreOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M3 6l5 5 5-5" />
                </svg>
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    onMouseMove={(e) => {
                      const spot = spotRef.current;
                      if (!spot) return;
                      const r = e.currentTarget.getBoundingClientRect();
                      spot.style.background = `radial-gradient(300px circle at ${
                        e.clientX - r.left
                      }px ${
                        e.clientY - r.top
                      }px, color-mix(in srgb, var(--color-coral) 9%, transparent), transparent 65%)`;
                    }}
                    className="absolute right-0 top-full z-[85] mt-3 w-[min(92vw,400px)] origin-top-right overflow-hidden rounded-lg border border-line bg-ink-2 shadow-[0_32px_90px_-18px_rgba(0,0,0,0.85)]"
                  >
                    <div
                      ref={spotRef}
                      className="pointer-events-none absolute inset-0 z-0"
                    />
                    <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
                    {/* faint brand watermark from the uploaded logo */}
                    <img
                      src={LOGO_CANDIDATES[0]}
                      alt=""
                      aria-hidden="true"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      className="pointer-events-none absolute -bottom-9 -right-9 h-44 w-44 -rotate-12 object-contain opacity-[0.06] grayscale select-none"
                    />

                    {/* header strip */}
                    <div className="relative flex items-center justify-between border-b border-line px-5 py-3">
                      <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-paper/70">
                        <Asterisk className="h-3 w-3 text-coral" />
                        Explore More
                      </p>
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-mist">
                        LLE · Menu
                      </p>
                    </div>

                    <div className="relative">
                      <nav className="max-h-[min(70vh,540px)] overflow-y-auto p-3">
                        <ul className="space-y-0.5">
                          {NAV_LINKS.map((l, i) =>
                            l.label === "Services" ? (
                              <motion.li
                                key={l.href}
                                initial={{ opacity: 0, x: -14 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: 0.04 + i * 0.045,
                                  duration: 0.35,
                                }}
                              >
                                <button
                                  onClick={() => setSvcOpen((v) => !v)}
                                  aria-expanded={svcOpen}
                                  className="group relative flex w-full items-center gap-3 overflow-hidden rounded-lg px-3 py-2.5 text-left"
                                >
                                  <span className="absolute inset-y-1.5 left-0 w-0.5 origin-top scale-y-0 rounded-full bg-coral transition-transform duration-300 group-hover:scale-y-100" />
                                  <span className="absolute inset-0 -translate-x-full rounded-lg bg-ink-3/70 transition-transform duration-300 ease-out group-hover:translate-x-0" />
                                  <span
                                    className={`relative font-mono text-[10px] transition-colors duration-300 ${
                                      svcOpen
                                        ? "text-coral"
                                        : "text-mist group-hover:text-coral"
                                    }`}
                                  >
                                    {String(i + 1).padStart(2, "0")}
                                  </span>
                                  <span
                                    className={`relative flex-1 font-display text-base font-semibold tracking-tight transition-all duration-300 group-hover:translate-x-1 ${
                                      svcOpen
                                        ? "text-coral"
                                        : "text-paper/85 group-hover:text-paper"
                                    }`}
                                  >
                                    {l.label}
                                  </span>
                                  <span
                                    className={`relative grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                                      svcOpen
                                        ? "rotate-90 border-coral bg-coral text-ink"
                                        : "border-line text-paper/60 group-hover:border-coral group-hover:text-coral"
                                    }`}
                                  >
                                    <svg
                                      viewBox="0 0 16 16"
                                      className="h-3 w-3"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                    >
                                      <path d="M6 3l5 5-5 5" />
                                    </svg>
                                  </span>
                                </button>

                                {/* services sub-menu */}
                                <AnimatePresence initial={false}>
                                  {svcOpen && (
                                    <motion.div
                                      key="svc-sub"
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{
                                        duration: 0.35,
                                        ease: [0.22, 1, 0.36, 1],
                                      }}
                                      className="overflow-hidden"
                                    >
                                      <div className="ml-[26px] mt-1 space-y-1.5 border-l border-line/70 pb-1 pl-4">
                                        {SERVICES.map((s, si) => (
                                          <motion.a
                                            key={s.id}
                                            href={`#${s.id}`}
                                            initial={{ opacity: 0, x: -12 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                              delay: 0.06 + si * 0.045,
                                              duration: 0.3,
                                            }}
                                            onClick={(e) => {
                                              e.preventDefault();
                                              setMoreOpen(false);
                                              goServiceNav(s.id);
                                            }}
                                            className="group/svc flex items-center gap-3 rounded-lg border border-line/60 bg-ink/60 px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-coral/40 hover:bg-ink"
                                          >
                                            <span className="shrink-0 rounded bg-ink-3 px-1.5 py-0.5 font-mono text-[10px] text-mist transition-colors duration-300 group-hover/svc:bg-coral group-hover/svc:text-ink">
                                              {s.num}
                                            </span>
                                            <span className="min-w-0 flex-1 truncate text-sm font-medium text-paper/85 transition-colors duration-300 group-hover/svc:text-paper">
                                              {s.title}
                                            </span>
                                            <span className="relative flex h-2 w-2 shrink-0">
                                              <span
                                                className={`absolute inline-flex h-full w-full rounded-full opacity-0 motion-safe:group-hover/svc:animate-ping motion-safe:group-hover/svc:opacity-70 ${ACCENT_BG[s.accent]}`}
                                              />
                                              <span
                                                className={`relative inline-flex h-2 w-2 rounded-full ${ACCENT_BG[s.accent]}`}
                                              />
                                            </span>
                                          </motion.a>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.li>
                            ) : (
                              <motion.li
                                key={l.href}
                                initial={{ opacity: 0, x: -14 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: 0.04 + i * 0.045,
                                  duration: 0.35,
                                }}
                              >
                                <a
                                  href={
                                    l.label === "About" ? "about-us" : l.href
                                  }
                                  onClick={(e) => {
                                    navGo(
                                      e,
                                      l.label === "About" ? "about-us" : l.href
                                    );
                                    setMoreOpen(false);
                                  }}
                                  className="group relative flex items-center gap-3 overflow-hidden rounded-lg px-3 py-2.5"
                                >
                                  <span className="absolute inset-y-1.5 left-0 w-0.5 origin-top scale-y-0 rounded-full bg-coral transition-transform duration-300 group-hover:scale-y-100" />
                                  <span className="absolute inset-0 -translate-x-full rounded-lg bg-ink-3/70 transition-transform duration-300 ease-out group-hover:translate-x-0" />
                                  <span className="relative font-mono text-[10px] text-mist transition-colors duration-300 group-hover:text-coral">
                                    {String(i + 1).padStart(2, "0")}
                                  </span>
                                  <span className="relative flex-1 font-display text-base font-medium tracking-tight text-paper/85 transition-all duration-300 group-hover:translate-x-1 group-hover:text-paper">
                                    {l.label}
                                  </span>
                                  <svg
                                    viewBox="0 0 16 16"
                                    className="relative h-3.5 w-3.5 -translate-x-2 text-coral opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  >
                                    <path d="M2 8h11M9 4l4 4-4 4" />
                                  </svg>
                                </a>
                              </motion.li>
                            )
                          )}
                        </ul>

                        {/* contact CTA */}
                        <motion.a
                          href="#contact"
                          onClick={(e) => {
                            navGo(e, "#contact");
                            setMoreOpen(false);
                          }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.32, duration: 0.35 }}
                          className="group relative mt-2.5 flex items-center justify-between overflow-hidden rounded-lg border border-coral/50 px-4 py-3"
                        >
                          <span className="absolute inset-0 origin-left scale-x-0 bg-coral transition-transform duration-300 ease-out group-hover:scale-x-100" />
                          <span className="relative font-display text-base font-semibold tracking-tight text-coral transition-colors duration-300 group-hover:text-ink">
                            Contact
                          </span>
                          <svg
                            viewBox="0 0 16 16"
                            className="relative h-4 w-4 text-coral transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:text-ink"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          >
                            <path d="M3 13L13 3M6 3h7v7" />
                          </svg>
                        </motion.a>
                      </nav>
                    </div>

                    {/* footer strip */}
                    <div className="relative flex items-center justify-between gap-3 border-t border-line bg-ink px-5 py-3.5">
                      <p className="min-w-0 font-mono text-[10px] leading-relaxed text-mist">
                        <span className="block truncate text-paper/80">
                          {CONTACT_EMAIL}
                        </span>
                        {CONTACT_PHONE}
                      </p>
                      <div className="flex shrink-0 items-center gap-1.5">
                        {SOCIALS.map((s) => (
                          <a
                            key={s.name}
                            href={s.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={s.name}
                            className="grid h-8 w-8 place-items-center rounded-full border border-line text-paper/60 transition-all duration-300 hover:-translate-y-1 hover:border-coral hover:bg-coral hover:text-ink"
                          >
                            <SocialIcon name={s.icon} className="h-3.5 w-3.5" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative z-[80] flex h-11 w-11 flex-col items-center justify-center gap-[7px] rounded-full border border-line transition-colors hover:border-coral lg:hidden"
            >
              <span
                className={`block h-[2px] w-5 bg-paper transition-all duration-300 ${
                  open ? "translate-y-[4.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-5 bg-paper transition-all duration-300 ${
                  open ? "-translate-y-[4.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[75] flex flex-col justify-center bg-ink-2 px-8 lg:hidden"
          >
            <div className="grid-lines pointer-events-none absolute inset-0" />
            <ul className="relative space-y-2">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
                >
                  <a
                    href={l.href}
                    onClick={(e) => {
                      navGo(e, l.href);
                      setOpen(false);
                    }}
                    className="group flex items-baseline gap-4 py-2"
                  >
                    <span className="font-mono text-xs text-coral">
                      0{i + 1}
                    </span>
                    <span className="font-display text-4xl font-semibold text-paper transition-colors group-hover:text-coral">
                      {l.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href="#contact"
              onClick={(e) => {
                navGo(e, "#contact");
                setOpen(false);
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="group relative mt-10 inline-flex w-max items-center gap-3 rounded-full bg-coral px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.14em] text-ink"
            >
              Contact
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
            </motion.a>
            <p className="relative mt-12 font-mono text-[11px] uppercase tracking-[0.24em] text-mist">
              {CONTACT_EMAIL}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */
export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (/.+@.+\..+/.test(email)) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const backToTop = () => goSection("top");

  return (
    <footer className="relative border-t border-line bg-ink">
      <Marquee speed={38} className="border-b border-line py-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="flex items-center gap-6 pr-6 font-display text-3xl font-semibold uppercase tracking-tight"
          >
            <span className="text-stroke-thin">Let's build something loud</span>
            <Asterisk className="h-6 w-6 text-coral" />
          </span>
        ))}
      </Marquee>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <a
            href="#top"
            onClick={(e) => navGo(e, "#top")}
            className="flex items-center gap-3"
          >
            <LogoMark className="h-12 w-12 shrink-0 object-contain" />
            <span className="leading-none">
              <span className="block font-display text-xl font-bold leading-none tracking-tight text-paper">
                LLE <span className="text-coral">Social Media</span>
              </span>
              <span className="mt-1 block -mr-[0.22em] font-mono text-[8px] uppercase leading-none tracking-[0.22em] text-mist">
                Listen | Learn | Engage
              </span>
            </span>
          </a>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
            We are a digital growth studio that builds websites, stores,
            healthcare content and mobile apps for brands ready to stand out.
          </p>
          <div className="mt-6 space-y-1 font-mono text-xs text-paper/70">
            <p>{CONTACT_EMAIL}</p>
            <p>{CONTACT_PHONE}</p>
            <p className="text-mist">Chennai, Tamil Nadu · serving worldwide</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.26em] text-mist">
            Sitemap
          </p>
          <ul className="space-y-2.5">
            {[...NAV_LINKS, { label: "Contact", href: "#contact" }].map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => navGo(e, l.href)}
                  className="group text-sm text-paper/80 transition-colors hover:text-coral"
                >
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-coral opacity-0 transition-opacity group-hover:opacity-100" />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.26em] text-mist">
            Services
          </p>
          <ul className="space-y-2.5">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goServiceNav(s.id);
                  }}
                  className="group flex items-center gap-2.5 text-sm text-paper/80 transition-colors hover:text-coral"
                >
                  <ServiceIcon
                    kind={s.icon}
                    className="h-4 w-4 text-coral/70 transition-colors group-hover:text-coral"
                  />
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.26em] text-mist">
            Growth notes
          </p>
          <p className="mb-4 text-sm leading-relaxed text-mist">
            Monthly insights. Tactics, teardowns and absolutely no fluff.
          </p>
          {subscribed ? (
            <p className="flex items-center gap-2 font-mono text-xs text-aqua">
              <Asterisk className="h-3.5 w-3.5" /> You're on the list. Talk
              soon.
            </p>
          ) : (
            <form onSubmit={subscribe} className="flex">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@brand.com"
                className="w-full rounded-l-full border border-line bg-ink-2 px-4 py-2.5 font-mono text-xs text-paper placeholder:text-mist/60 focus:border-coral focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="rounded-r-full border border-l-0 border-coral bg-coral px-4 text-ink transition-colors hover:bg-paper hover:border-paper"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M2 8h11M9 4l4 4-4 4" />
                </svg>
              </button>
            </form>
          )}
          <div className="mt-6 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-paper/70 transition-all duration-300 hover:-translate-y-1 hover:border-coral hover:text-coral"
              >
                <SocialIcon name={s.icon} className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row md:px-8">
          <p className="font-mono text-[11px] tracking-wide text-mist">
            © 2026 LLE Social Media. All rights reserved.
          </p>
          <p className="font-mono text-[11px] tracking-wide text-mist">
            Designed in Chennai, Tamil Nadu{" "}
            <span className="text-coral">✳</span>
          </p>
          <button
            onClick={backToTop}
            className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/70 transition-colors hover:text-coral"
          >
            Back to top
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M8 14V2M3 7l5-5 5 5" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Noise — film grain over everything                                  */
/* ------------------------------------------------------------------ */
export function Noise() {
  return <div className="noise-overlay" aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/* Reveal re-export guard (unused safety)                              */
/* ------------------------------------------------------------------ */
export { Reveal as _FooterReveal };
