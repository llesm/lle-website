import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "../lib/motion";
import { TESTIMONIALS } from "../lib/data";

const AVATAR_BG: Record<string, string> = {
  coral: "bg-coral",
  aqua: "bg-aqua",
  amber: "bg-amber",
};

/**
 * Long quotes get a tighter display size so every testimonial reads clean
 * and nothing ever overflows or clashes with the layout.
 */
function quoteSize(len: number): string {
  if (len < 200) return "text-2xl leading-snug sm:text-3xl md:text-[2.4rem]";
  if (len < 330) return "text-xl leading-snug sm:text-2xl md:text-[2rem]";
  return "text-lg leading-normal sm:text-xl md:text-[1.7rem] md:leading-[1.35]";
}

export default function Testimonials() {
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
    <section
      id="testimonials"
      className="scroll-mt-24 border-t border-ink/10 bg-paper-2 py-24 text-ink md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          dark
          kicker="Testimonials"
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
            <div className="relative min-h-[480px] md:min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={index}
                  initial={prm ? { opacity: 0 } : { opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={prm ? { opacity: 0 } : { opacity: 0, x: -40 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <blockquote
                    className={`font-display font-medium tracking-tight text-ink ${quoteSize(t.quote.length)}`}
                  >
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full font-display text-sm font-bold text-ink ${AVATAR_BG[t.accent]}`}
                    >
                      {t.name
                        .split(" ")
                        .filter((w) => /[a-zA-Z]/.test(w))
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <span>
                      <span className="block font-semibold">{t.name}</span>
                      {t.role ? (
                        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">
                          {t.role}
                        </span>
                      ) : null}
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
    </section>
  );
}
