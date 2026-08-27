import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Asterisk, Reveal, SectionHeading } from "../lib/motion";
import { TESTIMONIALS } from "../lib/data";

const OBSESSIONS = [
  "Outcomes over opinions — every project ships with KPIs attached",
  "Speed of execution — live staging links from week one",
  "Design that converts, not just decorates",
  "Content with compliance and trust baked in",
];

const INDUSTRIES = [
  "Healthcare & Clinics",
  "D2C & E-commerce",
  "SaaS & Fintech",
  "Real Estate",
  "Education",
];

/* ------------------------------------------------------------------ */
/* Testimonials — lives directly under the About content               */
/* ------------------------------------------------------------------ */
const AVATAR_BG: Record<string, string> = {
  coral: "bg-coral",
  aqua: "bg-aqua",
  amber: "bg-amber",
};

function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prm = useReducedMotion();
  const count = TESTIMONIALS.length;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (prm || paused) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % count), 5200);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [prm, paused, count]);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count);

  const t = TESTIMONIALS[index];

  return (
    <div
      className="border-t border-line bg-paper py-24 text-ink md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          dark
          kicker="Client love"
          title={
            <>
              Heard around
              <br />
              the <span className="text-coral">internet.</span>
            </>
          }
          note="Founders, doctors and CMOs — in their own words, after the dashboards moved."
        />

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="relative min-h-[280px] md:min-h-[240px]">
              <Asterisk className="absolute -left-2 -top-6 h-10 w-10 text-coral" />
              <AnimatePresence mode="wait">
                <motion.figure
                  key={index}
                  initial={prm ? { opacity: 0 } : { opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={prm ? { opacity: 0 } : { opacity: 0, x: -40 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <blockquote className="font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl md:text-[2.4rem]">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-full font-display text-sm font-bold text-ink ${AVATAR_BG[t.accent]}`}
                    >
                      {t.name
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <span>
                      <span className="block font-semibold">{t.name}</span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">
                        {t.role}
                      </span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-end justify-between gap-6 lg:col-span-4 lg:flex-col lg:items-end lg:justify-end">
            <p className="font-mono text-sm text-ink/50">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(count).padStart(2, "0")}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="grid h-12 w-12 place-items-center rounded-full border border-ink/30 text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-paper"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M14 8H3M7 4L3 8l4 4" />
                </svg>
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="grid h-12 w-12 place-items-center rounded-full border border-ink/30 text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-paper"
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
            </div>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-8 bg-coral"
                      : "w-3 bg-ink/25 hover:bg-ink/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* About section                                                       */
/* ------------------------------------------------------------------ */
export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-ink">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -right-40 top-40 h-[460px] w-[460px] rounded-full bg-amber/[0.05] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeading
          index="03"
          kicker="About"
          title={
            <>
              The studio behind brands
              <br />
              that refuse to <span className="text-coral">blend in.</span>
            </>
          }
          note="Twelve years, five crafts, one obsession — growth you can actually measure."
        />

        <div className="grid gap-14 lg:grid-cols-12">
          {/* narrative */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-display text-2xl font-medium leading-snug tracking-tight text-paper md:text-[1.9rem]">
                LLE Social Media started with a simple frustration: businesses
                were paying for beautiful websites that never showed up in the
                numbers.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-mist">
                So we built a studio where design, engineering and content sit
                in the same room — and every decision answers to a metric.
                Today we're the behind-the-scenes growth team for clinics, D2C
                brands and startups: designing websites, engineering
                e-commerce and Shopify stores, writing medical content
                patients trust, and shipping apps people keep.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-mist">
                No vanity deliverables, no jargon-filled decks. Just sharp
                strategy, honest timelines and dashboards that move —{" "}
                <span className="text-paper">
                  if it doesn't grow your business, we don't ship it.
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <a
                  href="#contact"
                  className="group flex items-center gap-3 rounded-full bg-coral px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:gap-5 hover:bg-paper"
                >
                  Start a project
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M2 8h11M9 4l4 4-4 4" />
                  </svg>
                </a>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-mist">
                  — Team LLE, New Delhi
                </p>
              </div>
            </Reveal>
          </div>

          {/* obsession list + industries */}
          <div className="lg:col-span-5">
            <Reveal delay={0.12}>
              <div className="rounded-lg border border-line bg-ink-2 p-7 md:p-8">
                <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-aqua">
                  <Asterisk className="h-3.5 w-3.5" />
                  What we obsess over
                </p>
                <ul className="space-y-4">
                  {OBSESSIONS.map((o, i) => (
                    <li key={o} className="group flex items-start gap-4">
                      <span className="mt-0.5 font-mono text-xs text-coral">
                        0{i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-paper/85 transition-colors group-hover:text-paper">
                        {o}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-line pt-7">
                  <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.26em] text-mist">
                    Industries we speak fluently
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {INDUSTRIES.map((ind) => (
                      <span
                        key={ind}
                        className="cursor-default rounded-full border border-line px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-paper/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-coral hover:text-coral"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* client love — part of the About story, directly below */}
      <Testimonials />
    </section>
  );
}
