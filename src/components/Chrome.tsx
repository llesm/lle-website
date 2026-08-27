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

/* ------------------------------------------------------------------ */
/* LogoMark — uploaded logo (tries several paths), monogram fallback   */
/* ------------------------------------------------------------------ */
function LogoMark({ className }: { className?: string }) {
  const [idx, setIdx] = useState(0);
  if (idx >= LOGO_CANDIDATES.length) {
    return (
      <span
        className={`grid place-items-center rounded-lg bg-coral text-ink ${className ?? "h-10 w-10"}`}
      >
        <Asterisk className="h-1/2 w-1/2" />
      </span>
    );
  }
  return (
    <img
      src={LOGO_CANDIDATES[idx]}
      alt="LLE Social Media logo"
      onError={() => setIdx((i) => i + 1)}
      className={className}
    />
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
  const moreRef = useRef<HTMLDivElement>(null);

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
            className="group flex items-center gap-3"
            aria-label="LLE Social Media — home"
          >
            <LogoMark className="h-10 w-10 shrink-0 object-contain transition-transform duration-500 group-hover:scale-105" />
            <span className="leading-none">
              <span className="block font-display text-lg font-bold tracking-tight text-paper">
                LLE <span className="text-coral">Social Media</span>
              </span>
              <span className="mt-1.5 block font-mono text-[9px] uppercase tracking-[0.32em] text-mist">
                Digital Growth Studio
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative font-mono text-xs uppercase tracking-[0.2em] text-paper/70 transition-colors hover:text-paper"
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-coral transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
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
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 top-full z-[85] mt-3 w-64 overflow-hidden rounded-xl border border-line bg-ink-2 shadow-2xl shadow-black/60"
                  >
                    {[...NAV_LINKS, { label: "Contact", href: "#contact" }].map(
                      (l, i) => (
                        <a
                          key={l.href}
                          href={l.href}
                          onClick={() => setMoreOpen(false)}
                          className="group/item flex items-center justify-between px-5 py-3 text-sm text-paper/80 transition-colors hover:bg-ink-3 hover:text-paper"
                        >
                          <span className="flex items-center gap-3">
                            <span className="font-mono text-[10px] text-coral">
                              0{i + 1}
                            </span>
                            {l.label}
                          </span>
                          <svg
                            viewBox="0 0 16 16"
                            className="h-3 w-3 text-coral opacity-0 transition-all duration-300 group-hover/item:translate-x-0.5 group-hover/item:opacity-100"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          >
                            <path d="M2 8h11M9 4l4 4-4 4" />
                          </svg>
                        </a>
                      )
                    )}
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
                    onClick={() => setOpen(false)}
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
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="relative mt-10 inline-flex w-max items-center gap-3 rounded-full bg-coral px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.14em] text-ink"
            >
              Start a project
              <Asterisk className="h-4 w-4" />
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

  const backToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });

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
          <a href="#top" className="flex items-center gap-3">
            <LogoMark className="h-12 w-12 shrink-0 object-contain" />
            <span className="leading-none">
              <span className="block font-display text-xl font-bold tracking-tight text-paper">
                LLE <span className="text-coral">Social Media</span>
              </span>
              <span className="mt-1.5 block font-mono text-[9px] uppercase tracking-[0.32em] text-mist">
                Digital Growth Studio
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
            <p className="text-mist">Chennai, Tamil Nadu — serving worldwide</p>
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
                  href="#services"
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
            © 2026 LLE Social Media — All rights reserved.
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
