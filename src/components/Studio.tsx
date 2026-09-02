import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Asterisk, CountUp, Reveal, SectionHeading } from "../lib/motion";
import { FAQS, PROCESS, STATS } from "../lib/data";

/* ------------------------------------------------------------------ */
/* Process — sticky two-column                                         */
/* ------------------------------------------------------------------ */
export function Process() {
  return (
    <section id="process" className="relative bg-ink-2 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            index="03"
            kicker="How we work"
            title={
              <>
                A process with
                <br />
                zero <span className="text-aqua">guesswork.</span>
              </>
            }
          />
          <Reveal delay={0.1}>
            <p className="max-w-md text-base leading-relaxed text-mist">
              No black boxes, no "trust us" phases. You see the same staging
              link we see, the same metrics we read, and the same calendar we
              work from - Every single week.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-line px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-paper transition-all duration-300 hover:border-aqua hover:bg-aqua hover:text-ink"
            >
              Book a discovery call
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M2 8h11M9 4l4 4-4 4" />
              </svg>
            </a>
          </Reveal>
        </div>

        <div>
          {PROCESS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.06}>
              <div className="group border-t border-line py-10 transition-colors last:border-b hover:bg-ink/40">
                <div className="flex items-baseline gap-6">
                  <span className="text-stroke-thin font-display text-6xl font-bold md:text-7xl">
                    {step.num}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display text-3xl font-semibold tracking-tight text-paper transition-colors group-hover:text-aqua md:text-4xl">
                        {step.title}
                      </h3>
                      <Asterisk className="h-5 w-5 shrink-0 text-line transition-all duration-500 group-hover:rotate-180 group-hover:text-aqua" />
                    </div>
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-mist">
                      {step.body}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {step.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Stats band                                                          */
/* ------------------------------------------------------------------ */
export function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-coral py-16 text-ink">
      <Asterisk className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 text-ink/10" />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 md:px-8 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div
              className={`px-2 md:px-8 ${
                i > 0 ? "lg:border-l lg:border-ink/25" : ""
              }`}
            >
              <p className="font-display text-5xl font-bold tracking-tight md:text-6xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink/70">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */
export function Faq() {
  const [open, setOpen] = useState<number>(0);
  const prm = useReducedMotion();

  return (
    <section id="faq" className="relative bg-ink py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            index="05"
            kicker="FAQ"
            title={
              <>
                Straight
                <br />
                <span className="text-amber">answers.</span>
              </>
            }
          />
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-mist">
              Still curious? Write to us. A human replies within one business
              day, not a chatbot.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <div className="border-t border-line">
            {FAQS.map((f, i) => {
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
                        isOpen ? "text-amber" : "text-paper group-hover:text-amber"
                      }`}
                    >
                      {f.q}
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                        isOpen
                          ? "rotate-45 border-amber bg-amber text-ink"
                          : "border-line text-paper group-hover:border-amber group-hover:text-amber"
                      }`}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
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
        </div>
      </div>
    </section>
  );
}
