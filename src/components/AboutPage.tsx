import { useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import InteractiveHoverButton from "./InteractiveHoverButton";
import Testimonials from "./Testimonials";
import {
  Asterisk,
  CountUp,
  Reveal,
  SectionHeading,
  ServiceIcon,
} from "../lib/motion";
import { ABOUT_BG_CANDIDATES } from "../lib/theme";
import { goSection } from "../lib/router";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */
const JOURNEY = [
  { value: 10, suffix: "+", label: "Years of experience in digital content & web design" },
  { value: 60, suffix: "+", label: "Successful projects delivered" },
  { value: 1200, suffix: "+", label: "Blogs written across healthcare & business niches" },
  { value: 100, suffix: "%", label: "Client satisfaction — we measure success by your growth" },
];

const TEAM = [
  {
    name: "S. Ganesh",
    role: "Marketing & Chief Idea Officer",
    accent: "text-coral",
    border: "hover:border-coral/60",
    image:
      "https://image.qwenlm.ai/generated-images/0811b1af-43ef-4241-aecb-d716a3eb1ae6/_result.png",
    bio: "With a sharp eye for strategy and a creative mind, Ganesh leads our marketing efforts and crafts compelling medical content and video scripts that educate, engage, and build trust. His deep understanding of the healthcare industry ensures every piece of content resonates with both patients and professionals. He is the visionary behind our most impactful campaigns.",
  },
  {
    name: "Migal G Arunadann",
    role: "Web & App Development Lead",
    accent: "text-aqua",
    border: "hover:border-aqua/60",
    image:
      "https://image.qwenlm.ai/generated-images/c1caee64-cdd1-4747-9f0e-aaed184c5148/_result.png",
    bio: "Migal brings designs to life with technical precision and creative flair. Specializing in WordPress, Shopify, e-commerce platforms, and Mobile App Development, he builds seamless, responsive digital experiences for businesses across all industries. From stunning websites to fully functional apps, Migal ensures your brand looks exceptional and performs flawlessly.",
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Listen", body: "We start by learning your goals, audience and challenges." },
  { num: "02", title: "Strategize", body: "A clear plan built around measurable outcomes." },
  { num: "03", title: "Create", body: "Content, design and code crafted with precision." },
  { num: "04", title: "Execute", body: "We launch on time, with zero guesswork." },
  { num: "05", title: "Engage", body: "We stay with you — engaging audiences, compounding results." },
];

const VALUES = [
  { title: "Excellence", body: "We never compromise on quality." },
  { title: "Integrity", body: "We build trust through honesty and transparency." },
  { title: "Innovation", body: "We stay ahead of digital trends to serve you better." },
  { title: "Client-Centricity", body: "Your success is our success." },
];

const HEALTHCARE_OFFERS = [
  "High-impact medical content",
  "Patient-centric posts",
  "Engaging videos for Facebook, Instagram & YouTube",
  "Authority-building content that earns trust",
];

const BUSINESS_OFFERS = [
  "Stunning responsive websites — WordPress, Shopify & custom HTML",
  "Fully functional e-commerce stores",
  "Powerful mobile apps that elevate your brand",
  "Scroll-stopping creatives & result-driven strategies",
];

/* ------------------------------------------------------------------ */
/* Letter-by-letter masked reveal                                      */
/* ------------------------------------------------------------------ */
function MaskedTitle({ text, className }: { text: string; className?: string }) {
  const prm = useReducedMotion();
  return (
    <span className={`flex flex-wrap justify-center ${className ?? ""}`}>
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="mr-[0.28em] flex overflow-hidden last:mr-0">
          {word.split("").map((ch, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              initial={prm ? { opacity: 0 } : { y: "112%" }}
              animate={prm ? { opacity: 1 } : { y: "0%" }}
              transition={{
                delay: 0.25 + (wi * 6 + ci) * 0.04,
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Hero — blurred brand backdrop with the About Us reveal              */
/* ------------------------------------------------------------------ */
function PageHero() {
  const prm = useReducedMotion();
  const [bgIdx, setBgIdx] = useState(0);
  const bgFailed = bgIdx >= ABOUT_BG_CANDIDATES.length;
  const { scrollY } = useScroll();
  const drift = useTransform(scrollY, [0, 700], [0, 90]);

  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-ink">
      {/* blurred brand backdrop */}
      {!bgFailed ? (
        <motion.div
          className="absolute inset-0"
          style={{ y: prm ? 0 : drift }}
        >
          <img
            src={ABOUT_BG_CANDIDATES[bgIdx]}
            alt=""
            aria-hidden="true"
            onError={() => setBgIdx((i) => i + 1)}
            className="h-full w-full scale-125 object-cover opacity-40 blur-3xl saturate-[0.85]"
          />
        </motion.div>
      ) : (
        <div className="grid-lines absolute inset-0 opacity-70" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/40 to-ink" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-coral/[0.08] blur-[130px]" />

      <div className="relative mx-auto max-w-5xl px-5 py-32 text-center md:px-8">
        <Reveal>
          <p className="mb-6 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.34em] text-paper/70">
            <Asterisk className="h-4 w-4 text-coral" />
            LLE Social Media — The Studio
          </p>
        </Reveal>

        <h1 className="font-display text-[17vw] font-bold uppercase leading-[0.95] tracking-tight text-paper sm:text-8xl md:text-[7.5rem]">
          <MaskedTitle text="About Us" />
        </h1>

        <Reveal delay={0.55}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-mist md:text-lg">
            The team behind brands that refuse to blend in — strategy,
            content, design and code under one roof, built to make your brand
            impossible to ignore.
          </p>
        </Reveal>

        <Reveal delay={0.7}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <InteractiveHoverButton
              onClick={() => goSection("contact")}
              className="border-coral px-7 py-4"
              dotClass="bg-coral"
              textClass="text-coral"
              hoverTextClass="text-ink"
            >
              Let Us Work Together
            </InteractiveHoverButton>
            <InteractiveHoverButton
              onClick={() =>
                document
                  .getElementById("who-we-are")
                  ?.scrollIntoView({ behavior: prm ? "auto" : "smooth" })
              }
              className="border-line px-7 py-4"
              dotClass="bg-paper"
              textClass="text-paper"
              hoverTextClass="text-ink"
            >
              Read Our Story
            </InteractiveHoverButton>
          </div>
        </Reveal>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <span className="animate-cue block text-coral">
          <svg
            viewBox="0 0 16 16"
            className="h-5 w-5"
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
/* Page sections                                                       */
/* ------------------------------------------------------------------ */
function WhoWeAre() {
  return (
    <section id="who-we-are" className="relative scroll-mt-24 overflow-hidden bg-ink py-24 md:py-32">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="01"
          kicker="Who we are"
          title={
            <>
              A passionate team building
              <br />
              <span className="text-coral">powerful online identities.</span>
            </>
          }
        />
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="font-display text-2xl font-medium leading-snug tracking-tight text-paper md:text-[1.8rem]">
              At LLE Social Media, we are a passionate team of digital
              strategists, content creators, designers and developers
              dedicated to transforming brands into powerful online
              identities.
            </p>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-mist">
              With over 10+ years of experience in digital content creation
              and website designing, we have built a reputation for excellence
              across industries. We specialize in serving medical
              professionals and the healthcare industry — crafting
              high-impact medical content, patient-centric posts and engaging
              videos for Facebook, Instagram, and YouTube.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist">
              We are here to make your brand{" "}
              <span className="text-paper">impossible to ignore.</span>
            </p>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="flex h-full flex-col justify-center gap-3 rounded-lg border border-line bg-ink-2 p-7 md:p-8">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.26em] text-aqua">
                The people inside LLE
              </p>
              {[
                "Digital Strategists",
                "Content Creators",
                "Designers",
                "Developers",
              ].map((role, i) => (
                <div
                  key={role}
                  className="group flex items-center gap-4 border-b border-line py-3 last:border-b-0"
                >
                  <span className="font-mono text-xs text-coral">
                    0{i + 1}
                  </span>
                  <span className="font-display text-xl font-medium tracking-tight text-paper/85 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-paper">
                    {role}
                  </span>
                  <Asterisk className="ml-auto h-3.5 w-3.5 text-line transition-all duration-500 group-hover:rotate-180 group-hover:text-coral" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="relative bg-paper py-24 text-ink md:py-32">
      <div className="grid-lines-dark pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-5xl px-5 text-center md:px-8">
        <Reveal>
          <p className="mb-6 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-coral">
            <Asterisk className="h-3.5 w-3.5" />
            ( 02 — Our Mission )
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            "To help businesses and healthcare professionals build a{" "}
            <span className="text-coral">commanding digital presence</span>{" "}
            that drives real results."
          </blockquote>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ink/70">
            We believe every brand has a unique story to tell, and we are
            committed to telling it boldly, clearly and effectively. Whether
            you are a doctor looking to connect with patients or a retailer
            aiming to scale online, we deliver strategies that educate, engage
            and convert.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function WhatWeOffer() {
  return (
    <section className="relative bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="03"
          kicker="What we offer"
          title={
            <>
              One studio,
              <br />
              <span className="text-aqua">every discipline covered.</span>
            </>
          }
          note="A comprehensive suite of digital services, tailored to meet diverse needs — from scroll-stopping creatives to result-driven strategies."
        />
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Healthcare */}
          <Reveal className="lg:col-span-7">
            <div className="group flex h-full flex-col rounded-lg border border-line bg-ink-2 p-8 transition-colors duration-500 hover:border-aqua/50 md:p-10">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.26em] text-aqua">
                  For healthcare professionals
                </p>
                <ServiceIcon kind="pulse" className="h-12 w-12 text-aqua transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight text-paper md:text-4xl">
                Content that heals
                <br />
                <span className="text-aqua">and converts.</span>
              </h3>
              <ul className="mt-8 space-y-4">
                {HEALTHCARE_OFFERS.map((o, i) => (
                  <li key={o} className="flex items-start gap-4">
                    <span className="mt-1 font-mono text-xs text-aqua">
                      0{i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-paper/80 md:text-base">
                      {o}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          {/* Business */}
          <Reveal delay={0.12} className="lg:col-span-5">
            <div className="group flex h-full flex-col rounded-lg border border-line bg-ink-2 p-8 transition-colors duration-500 hover:border-coral/50 md:p-10">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.26em] text-coral">
                  For every business
                </p>
                <ServiceIcon kind="web" className="h-12 w-12 text-coral transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight text-paper md:text-4xl">
                Build, sell,
                <br />
                <span className="text-coral">scale online.</span>
              </h3>
              <ul className="mt-8 space-y-4">
                {BUSINESS_OFFERS.map((o, i) => (
                  <li key={o} className="flex items-start gap-4">
                    <span className="mt-1 font-mono text-xs text-coral">
                      0{i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-paper/80 md:text-base">
                      {o}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function JourneyNumbers() {
  return (
    <section className="relative overflow-hidden bg-coral py-20 text-ink">
      <Asterisk className="pointer-events-none absolute -left-12 -bottom-12 h-56 w-56 text-ink/10" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="mb-3 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.28em] text-ink/70">
            <Asterisk className="h-3.5 w-3.5" />
            ( 04 — Our journey in numbers )
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mb-12 max-w-2xl font-display text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
            Behind every number is a story of collaboration, creativity and
            measurable impact — real partnerships and brands that transformed
            their digital presence.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {JOURNEY.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div
                className={`px-2 md:px-8 ${
                  i > 0 ? "lg:border-l lg:border-ink/25" : ""
                }`}
              >
                <p className="font-display text-5xl font-bold tracking-tight md:text-6xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-3 max-w-[15rem] font-mono text-[11px] font-bold uppercase leading-relaxed tracking-[0.14em] text-ink/70">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="relative bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="05"
          kicker="Meet our team"
          title={
            <>
              The minds behind
              <br />
              <span className="text-coral">your growth.</span>
            </>
          }
          note="Behind every successful project at LLE Social Media is a passionate team dedicated to your growth — diverse talents, one shared commitment to excellence."
        />
        <div className="grid gap-10 md:grid-cols-2">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.12} className={i === 1 ? "md:mt-20" : ""}>
              <article
                className={`group overflow-hidden rounded-lg border border-line bg-ink-2 transition-colors duration-500 ${m.border}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={m.image}
                    alt={`Portrait of ${m.name}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 font-display text-6xl font-bold text-paper/15">
                    0{i + 1}
                  </span>
                </div>
                <div className="p-7 md:p-8">
                  <h3 className="font-display text-3xl font-semibold tracking-tight text-paper">
                    {m.name}
                  </h3>
                  <p
                    className={`mt-1.5 font-mono text-[11px] uppercase tracking-[0.22em] ${m.accent}`}
                  >
                    {m.role}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-mist">
                    {m.bio}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function OurProcess() {
  return (
    <section className="relative bg-ink-2 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="06"
          kicker="Our process"
          title={
            <>
              Collaborative. Transparent.
              <br />
              <span className="text-aqua">Every step of the way.</span>
            </>
          }
          note="From concept to completion we keep you involved at every step, ensuring the final outcome exceeds your expectations."
        />
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.07} className="h-full">
              <div className="group flex h-full flex-col bg-ink-2 p-6 transition-colors duration-500 hover:bg-ink-3 md:p-7">
                <span className="text-stroke-thin font-display text-5xl font-bold transition-colors duration-500 group-hover:text-aqua group-hover:[-webkit-text-stroke:0px]">
                  {step.num}
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-paper">
                  {step.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">
                  {step.body}
                </p>
                <Asterisk className="mt-6 h-4 w-4 text-line transition-all duration-500 group-hover:rotate-180 group-hover:text-aqua" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoreValues() {
  return (
    <section className="relative bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="07"
          kicker="Our core values"
          title={
            <>
              What we stand for —
              <br />
              <span className="text-amber">non-negotiables.</span>
            </>
          }
        />
        <div className="border-t border-line">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="group relative grid items-baseline gap-2 overflow-hidden border-b border-line py-7 md:grid-cols-[5rem_1fr_2fr] md:gap-8 md:py-9">
                <span
                  className="absolute inset-y-0 left-0 w-0 bg-amber transition-all duration-500 ease-out group-hover:w-full"
                  aria-hidden="true"
                />
                <span className="relative font-mono text-sm text-mist transition-colors duration-300 group-hover:text-ink">
                  0{i + 1}
                </span>
                <h3 className="relative font-display text-3xl font-semibold tracking-tight text-paper transition-colors duration-300 group-hover:text-ink md:text-4xl">
                  {v.title}
                </h3>
                <p className="relative text-sm leading-relaxed text-mist transition-colors duration-300 group-hover:text-ink/80 md:text-base">
                  {v.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section className="relative overflow-hidden bg-ink-2 py-24 md:py-32">
      <div className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-aqua/[0.05] blur-[110px]" />
      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-aqua">
            <Asterisk className="h-3.5 w-3.5" />
            ( 08 — Where we are headed )
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-display text-3xl font-semibold leading-tight tracking-tight text-paper md:text-5xl">
            We envision a future where{" "}
            <span className="text-stroke">every brand</span> — regardless of
            size or industry — has the tools and strategies to{" "}
            <span className="text-aqua">thrive in the digital world.</span>
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-mist">
            We are constantly evolving, learning and innovating to bring you
            the best solutions. Our journey is just beginning — and we're
            excited to grow with you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function WorkTogether() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-coral/[0.08] blur-[120px]" />
      <div className="relative mx-auto max-w-5xl px-5 text-center md:px-8">
        <Reveal>
          <p className="mb-6 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-coral">
            <Asterisk className="h-3.5 w-3.5" />
            ( 09 — Let us work together )
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-paper sm:text-5xl md:text-6xl">
            We don't just make you visible.
            <br />
            <span className="text-coral">We make you unforgettable.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-mist md:text-lg">
            Ready to grow your brand and achieve digital dominance? Let us get
            started today — we would love to hear your story.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex justify-center">
            <InteractiveHoverButton
              onClick={() => goSection("contact")}
              className="border-coral px-9 py-4"
              dotClass="bg-coral"
              textClass="text-coral"
              hoverTextClass="text-ink"
            >
              Reach Out — Let's Get Started
            </InteractiveHoverButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function AboutPage() {
  return (
    <>
      <PageHero />
      <WhoWeAre />
      <Mission />
      <WhatWeOffer />
      <JourneyNumbers />
      <Team />
      <OurProcess />
      <CoreValues />
      <Vision />
      <Testimonials />
      <WorkTogether />
    </>
  );
}
