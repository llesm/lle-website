import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Asterisk,
  Marquee,
  Reveal,
  SectionHeading,
  ServiceIcon,
} from "../lib/motion";
import { SERVICES, WORKS, type Work } from "../lib/data";

const TICKER = [
  "Website Design",
  "E-Commerce",
  "Shopify",
  "Medical Content",
  "App Development",
  "Social Growth",
];

/* ------------------------------------------------------------------ */
/* Big outline ticker between hero and services                        */
/* ------------------------------------------------------------------ */
function ServiceTicker() {
  return (
    <div className="overflow-hidden border-b border-line bg-ink py-6">
      <Marquee speed={40}>
        {TICKER.map((t, i) => (
          <span key={t} className="flex items-center gap-8 pr-8">
            <span
              className={`font-display text-5xl font-bold uppercase tracking-tight md:text-7xl ${
                i % 2 === 0 ? "text-paper" : "text-stroke text-paper"
              }`}
            >
              {t}
            </span>
            <Asterisk
              className={`h-8 w-8 md:h-10 md:w-10 ${
                i % 3 === 0 ? "text-coral" : i % 3 === 1 ? "text-aqua" : "text-amber"
              }`}
            />
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Services accordion                                                  */
/* ------------------------------------------------------------------ */
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

function ServicesAccordion() {
  const [open, setOpen] = useState<number>(0);
  const prm = useReducedMotion();

  return (
    <div className="border-t border-line">
      {SERVICES.map((s, i) => {
        const isOpen = open === i;
        return (
          <div key={s.id} className="border-b border-line">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-7 text-left md:grid-cols-[4rem_1fr_auto_3rem] md:gap-8 md:py-9"
            >
              <span
                className={`font-mono text-sm transition-colors ${
                  isOpen ? "text-coral" : "text-mist"
                }`}
              >
                {s.num}
              </span>
              <span
                className={`font-display text-2xl font-semibold tracking-tight transition-all duration-300 sm:text-3xl md:text-5xl ${
                  isOpen
                    ? "text-paper"
                    : "text-paper/60 group-hover:translate-x-2 group-hover:text-paper"
                }`}
              >
                {s.title}
              </span>
              <span
                className={`hidden rounded-full border border-line px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] md:block ${
                  ACCENT_TEXT[s.accent]
                }`}
              >
                {s.tag}
              </span>
              <span className="flex justify-end">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-500 md:h-12 md:w-12 ${
                    isOpen
                      ? "rotate-45 border-coral bg-coral text-ink"
                      : "border-line text-paper group-hover:border-coral group-hover:text-coral"
                  }`}
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M8 2v12M2 8h12" />
                  </svg>
                </span>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={prm ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-8 pb-10 md:grid-cols-12 md:pl-[4rem]">
                    <div className="md:col-span-6">
                      <p className="max-w-xl text-base leading-relaxed text-mist">
                        {s.description}
                      </p>
                      <a
                        href="#contact"
                        className={`group/link mt-6 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] ${ACCENT_TEXT[s.accent]}`}
                      >
                        Start here
                        <svg
                          viewBox="0 0 16 16"
                          className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <path d="M3 13L13 3M6 3h7v7" />
                        </svg>
                      </a>
                    </div>
                    <div className="md:col-span-4">
                      <div className="flex flex-wrap gap-2">
                        {s.deliverables.map((d) => (
                          <span
                            key={d}
                            className="rounded-full border border-line px-3.5 py-1.5 text-xs text-paper/75 transition-colors hover:border-paper/40 hover:text-paper"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="hidden md:col-span-2 md:block">
                      <div
                        className={`grid aspect-square place-items-center rounded-lg ${ACCENT_BG[s.accent]} text-ink`}
                      >
                        <ServiceIcon kind={s.icon} className="h-16 w-16" />
                      </div>
                    </div>
                  </div>
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
/* Work card                                                           */
/* ------------------------------------------------------------------ */
function WorkCard({ work, index }: { work: Work; index: number }) {
  const spanClass =
    work.span === "full"
      ? "md:col-span-12"
      : work.span === "lg"
        ? "md:col-span-7"
        : "md:col-span-5";

  return (
    <Reveal
      delay={(index % 2) * 0.1}
      className={`group ${spanClass}`}
    >
      <article className="flex h-full flex-col border border-ink/15 bg-paper transition-shadow duration-500 hover:shadow-[10px_10px_0_0_rgba(15,18,16,0.9)]">
        <div className="relative overflow-hidden">
          <img
            src={work.image}
            alt={`${work.client} — ${work.category} case study`}
            loading="lazy"
            className={`w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06] ${
              work.span === "sm" ? "aspect-[4/3]" : "aspect-[16/10]"
            }`}
          />
          <div className="absolute left-4 top-4 flex gap-2">
            <span className="rounded-full bg-ink px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper">
              {work.category}
            </span>
          </div>
          <span className="absolute right-4 top-4 rounded-full bg-paper px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
            {work.year}
          </span>
          <div className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-3 place-items-center rounded-full bg-coral text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M3 13L13 3M6 3h7v7" />
            </svg>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              {work.client}
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
              {work.sector}
            </p>
          </div>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
            {work.blurb}
          </p>

          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 border-t border-ink/15 pt-5">
            {work.metrics.map((m) => (
              <div key={m.label}>
                <p className="font-display text-2xl font-semibold text-coral">
                  {m.value}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">
                  {m.label}
                </p>
              </div>
            ))}
            <div className="ml-auto flex flex-wrap items-center gap-1.5">
              {work.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-ink/20 px-3 py-1 text-[11px] text-ink/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Section shell                                                       */
/* ------------------------------------------------------------------ */
export default function Services() {
  return (
    <>
      <ServiceTicker />

      <section id="services" className="relative bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="01"
            kicker="What we do"
            title={
              <>
                Services built to
                <br />
                <span className="text-coral">make noise.</span>
              </>
            }
            note="Five disciplines, one obsession: digital presence that pays for itself. Open a row to see exactly what ships."
          />
          <ServicesAccordion />
        </div>
      </section>

      <section id="work" className="relative bg-paper py-24 text-ink md:py-32">
        <div className="grid-lines-dark pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            dark
            index="02"
            kicker="Selected work"
            title={
              <>
                Proof, not
                <br />
                <span className="relative inline-block">
                  promises.
                  <Asterisk className="absolute -right-7 -top-2 h-5 w-5 text-coral" />
                </span>
              </>
            }
            note="A slice of recent launches — every number below was measured on a real dashboard, not estimated in a deck."
          />
          <div className="grid gap-8 md:grid-cols-12">
            {WORKS.map((w, i) => (
              <WorkCard key={w.client} work={w} index={i} />
            ))}
          </div>
          <Reveal className="mt-14 text-center">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full border border-ink px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:bg-ink hover:text-paper"
            >
              Your project could be next
              <Asterisk className="h-3.5 w-3.5 text-coral transition-transform duration-500 group-hover:rotate-180" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
