import { Asterisk, CountUp, Reveal, SectionHeading } from "../lib/motion";
import { ABOUT_PATH, goRoute } from "../lib/router";

const MINI_STATS = [
  { value: 10, suffix: "+", label: "Years of experience" },
  { value: 60, suffix: "+", label: "Projects delivered" },
  { value: 1200, suffix: "+", label: "Blogs written" },
  { value: 100, suffix: "%", label: "Client satisfaction" },
];

const VALUES = ["Excellence", "Integrity", "Innovation", "Client-Centricity"];

export default function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden border-t border-line bg-ink"
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -right-40 top-40 h-[460px] w-[460px] rounded-full bg-amber/[0.05] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-14 md:px-8 md:pb-32 md:pt-16">
        <SectionHeading
          index="01"
          kicker="About Us"
          title={
            <>
              We make brands
              <br />
              <span className="text-coral">impossible to ignore.</span>
            </>
          }
          note="10+ years, five crafts, one mission: a commanding digital presence that drives real results."
        />

        <div className="grid gap-14 lg:grid-cols-12">
          {/* narrative */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-display text-2xl font-medium leading-snug tracking-tight text-paper md:text-[1.9rem]">
                We are a passionate team of digital strategists, content
                creators, designers and developers, transforming brands into
                powerful online identities.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-mist">
                We specialize in serving medical professionals and the
                healthcare industry with high-impact content, patient-centric
                posts and engaging videos, while designing stunning websites,
                e-commerce stores and mobile apps for businesses across every
                industry.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-mist">
                Our mission is simple: tell your brand's story boldly, clearly
                and effectively,{" "}
                <span className="text-coral">
                  with strategies that educate, engage and convert.
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <a
                  href={ABOUT_PATH}
                  onClick={(e) => {
                    e.preventDefault();
                    goRoute("about-us");
                  }}
                  className="group flex items-center gap-3 rounded-full bg-coral px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:gap-5 hover:bg-paper"
                >
                  Read our full story
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
                  Team LLE · Chennai
                </p>
              </div>
            </Reveal>
          </div>

          {/* journey in numbers + values */}
          <div className="lg:col-span-5">
            <Reveal delay={0.12}>
              <div className="rounded-lg border border-line bg-ink-2 p-7 md:p-8">
                <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-aqua">
                  <Asterisk className="h-3.5 w-3.5" />
                  Our journey in numbers
                </p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-7">
                  {MINI_STATS.map((s) => (
                    <div key={s.label}>
                      <p className="font-display text-4xl font-semibold tracking-tight text-paper">
                        <CountUp to={s.value} suffix={s.suffix} />
                      </p>
                      <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-line pt-7">
                  <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.26em] text-mist">
                    Our core values
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {VALUES.map((v) => (
                      <span
                        key={v}
                        className="cursor-default rounded-full border border-line px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-paper/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-coral hover:text-coral"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
