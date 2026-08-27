import {
  Asterisk,
  CountUp,
  Reveal,
  RotatingBadge,
  ScrambleWord,
} from "../lib/motion";
import { IMG, STATS } from "../lib/data";

const WORDS = ["SELL.", "SCALE.", "CONVERT.", "LEAD."];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink">
      <div className="grid-lines pointer-events-none absolute inset-0" />
      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-40 top-24 h-[480px] w-[480px] rounded-full bg-coral/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-aqua/[0.06] blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-5 pt-32 md:px-8 md:pt-40">
        {/* meta row */}
        <Reveal>
          <div className="mb-10 flex flex-wrap items-center justify-start gap-4">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-paper/70">
              <Asterisk className="h-4 w-4 text-coral" />
              Digital growth studio
            </p>
          </div>
        </Reveal>

        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* headline */}
          <div className="lg:col-span-7">
            <h1 className="font-display font-bold uppercase leading-[0.92] tracking-tight">
              <Reveal delay={0.05}>
                <span className="block text-[15vw] text-paper sm:text-7xl lg:text-[6.4rem]">
                  We make
                </span>
              </Reveal>
              <Reveal delay={0.14}>
                <span className="text-stroke block text-[15vw] sm:text-7xl lg:text-[6.4rem]">
                  brands
                </span>
              </Reveal>
              <Reveal delay={0.23}>
                <span className="block text-[15vw] text-coral sm:text-7xl lg:text-[6.4rem]">
                  <ScrambleWord words={WORDS} />
                </span>
              </Reveal>
            </h1>

            <Reveal delay={0.32}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-mist md:text-lg">
                LLE Social Media designs and engineers Websites, E-commerce
                and Shopify Stores, Medical Content and Mobile Apps — built to
                be measured, and help grow businesses.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#about"
                  className="group flex items-center gap-3 rounded-full bg-coral px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:gap-5 hover:bg-paper"
                >
                  More on LLE Social Media
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
                <a
                  href="#work"
                  className="group flex items-center gap-3 rounded-full border border-line px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-paper transition-all duration-300 hover:border-paper hover:bg-paper hover:text-ink"
                >
                  See Our Works
                  <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                    ↓
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* visual */}
          <div className="relative lg:col-span-5">
            <Reveal delay={0.25} y={40}>
              <div className="group relative">
                <div className="absolute -inset-3 rotate-2 rounded-lg border border-line transition-transform duration-700 group-hover:rotate-0" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                  <img
                    src={IMG.hero}
                    alt="LLE Social Media — digital craft showcase"
                    className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.05]"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                </div>

                {/* floating chips */}
                <div className="animate-floaty absolute -left-4 top-8 flex items-center gap-2 rounded-full border border-line bg-ink/90 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-aqua backdrop-blur-sm sm:-left-10">
                  <Asterisk className="h-3 w-3" />
                  Medical Content Creation
                </div>
                <div className="animate-floaty-late absolute -right-3 bottom-24 rounded-full border border-line bg-ink/90 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-coral backdrop-blur-sm sm:-right-8">
                  Shopify · Woo · Native
                </div>
              </div>
            </Reveal>

            <RotatingBadge className="absolute -bottom-10 -left-6 h-28 w-28 sm:h-32 sm:w-32" />
          </div>
        </div>

        {/* stat strip */}
        <Reveal delay={0.15}>
          <div className="mt-24 grid grid-cols-2 gap-y-8 border-t border-line py-8 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`px-2 sm:px-6 ${
                  i > 0 ? "sm:border-l sm:border-line" : ""
                }`}
              >
                <p className="font-display text-4xl font-semibold text-paper md:text-5xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* scroll cue */}
        <div className="flex items-center justify-between pb-10 pt-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-mist">
            Scroll — the good stuff is below
          </p>
          <span className="animate-cue text-coral">
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
      </div>
    </section>
  );
}
