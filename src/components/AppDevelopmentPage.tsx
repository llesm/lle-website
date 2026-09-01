import { useEffect } from "react";
import { Reveal, SectionHeading } from "../lib/motion";
import { APPDEV_BG_CANDIDATES } from "../lib/theme";
import {
  CaseStudy,
  EditorialRow,
  ReasonList,
  ServiceCta,
  ServiceFaq,
  ServiceHero,
  Snapshot,
  StepStrip,
} from "./ServiceBlocks";

const TECH_ROWS = [
  {
    icon: "rocket" as const,
    title: "Android — Reach the Largest Mobile Audience",
    tag: "Native · Java / Kotlin",
    body: "Android powers over 70% of the world's smartphones. We develop robust, feature-rich Android applications using native technologies that deliver exceptional performance, adhering to Google's design guidelines and optimized across screen sizes and device configurations — from simple utilities to complex enterprise solutions.",
  },
  {
    icon: "layers" as const,
    title: "Flutter — Beautiful, Fast, Cross-Platform",
    tag: "Single codebase · Android + iOS",
    body: "Google's UI toolkit for building beautifully natively-compiled apps from a single codebase. Hot reload lets us iterate fast; pixel-perfect customizable UIs reflect your brand. One codebase, consistent performance on both platforms — less time, less cost, the same exceptional quality.",
  },
  {
    icon: "code" as const,
    title: "React Native — High-Performance, Near-Native",
    tag: "JavaScript + React",
    body: "Fast, responsive, feature-rich apps that feel genuinely native. React Native's component architecture drives code reusability, cutting development and maintenance effort, while native components keep performance where it needs to be. The best of both worlds.",
  },
];

const STEPS = [
  {
    title: "Understand",
    body: "Discovery sessions map your idea, goals and users — behaviors, pain points and competitor gaps.",
  },
  {
    title: "Roadmap",
    body: "Architecture, features, timelines and milestones — an MVP that delivers maximum value first.",
  },
  {
    title: "Engineer",
    body: "Databases, security and custom features built for scale — MySQL, Firebase, AI, payments, IoT.",
  },
  {
    title: "Test",
    body: "Functional, usability, performance and security testing across devices and network conditions.",
  },
  {
    title: "Launch",
    body: "Play Store submission, server configuration and go-live checks — then ongoing updates.",
  },
];

const SNAPSHOT = [
  { lead: "Android App Development", body: "Native Android apps with exceptional performance." },
  { lead: "Flutter UI/UX Design", body: "Beautiful cross-platform apps from a single codebase." },
  { lead: "React Native Development", body: "High-performance, near-native apps for both platforms." },
  { lead: "Database Management", body: "Secure, scalable and efficient database solutions." },
  { lead: "Compliance & Security", body: "HIPAA, DPDP, GDPR and PCI DSS compliant solutions." },
  { lead: "Custom Features", body: "Tailored functionalities as per your unique requirements." },
];

const FAQS = [
  {
    q: "Do you develop apps for both Android and iOS?",
    a: "As of now we develop native Android apps using Java/Kotlin, and cross-platform apps using Flutter and React Native.",
  },
  {
    q: "What industries do you develop apps for?",
    a: "We develop apps for healthcare, retail, e-commerce, education, logistics and general businesses across all sectors.",
  },
  {
    q: "How long does it take to develop a mobile app?",
    a: "Timelines vary based on app complexity and features, but most apps are completed within 3 to 6 months from concept to launch.",
  },
  {
    q: "Do you ensure data security and compliance?",
    a: "Yes — we implement industry-standard security measures and ensure compliance with HIPAA, DPDP, GDPR and other relevant regulations.",
  },
  {
    q: "Do you offer post-launch support and maintenance?",
    a: "Yes, we provide ongoing support, updates and maintenance to keep your app running smoothly and securely.",
  },
];

const WHY = [
  {
    icon: "layers" as const,
    title: "Experiences that retain",
    body: "We don't just build apps — we build digital experiences that engage, retain and grow your user base.",
  },
  {
    icon: "globe" as const,
    title: "Current & capable",
    body: "Latest technologies, design trends and security practices — apps that perform exceptionally.",
  },
  {
    icon: "share" as const,
    title: "Client-centric",
    body: "We listen to your goals and tailor every solution to your unique needs.",
  },
  {
    icon: "shield" as const,
    title: "Cross-industry dedication",
    body: "Healthcare, retail or any industry — the same dedication and expertise on every project.",
  },
];

export default function AppDevelopmentPage() {
  useEffect(() => {
    document.title = "Mobile App Development — LLE Social Media";
  }, []);

  return (
    <>
      <ServiceHero
        bgCandidates={APPDEV_BG_CANDIDATES}
        kicker="Mobile App Development"
        segments={[
          { text: "Take Your", cls: "text-paper" },
          { text: "Brand Mobile", cls: "text-coral" },
        ]}
        tagline="Functional. Engaging. Built for long-term success."
        meta="Android · Flutter · React Native"
        accent="coral"
      />

      {/* Why it matters */}
      <section className="relative bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="01"
            kicker="Why mobile app development matters"
            title={
              <>
                A dedicated app is no
                <br />
                longer a <span className="text-coral">luxury.</span>
              </>
            }
            note="In a mobile-first world, it is a necessity."
          />
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="font-display text-2xl font-medium leading-snug tracking-tight text-paper md:text-[1.7rem]">
                Apps build stronger relationships through personalization,
                push notifications and seamless interactions — anytime,
                anywhere.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-base leading-relaxed text-mist">
                For healthcare providers, apps enable easy appointment booking,
                teleconsultations and patient record access. For businesses,
                they drive sales, enhance brand loyalty and surface valuable
                user insights. A well-designed app sets you apart and
                positions your brand as modern and customer-centric.
              </p>
              <p className="mt-5 text-base leading-relaxed text-mist">
                We build apps that are functional, engaging and built for
                long-term success.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="relative bg-ink-2 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="02"
            kicker="The platforms"
            title={
              <>
                Native depth,
                <br />
                <span className="text-coral">cross-platform reach.</span>
              </>
            }
          />
          <div className="space-y-6">
            {TECH_ROWS.map((r, i) => (
              <EditorialRow
                key={r.title}
                num={`0${i + 1}`}
                icon={r.icon}
                title={r.title}
                tag={r.tag}
                body={r.body}
                accent="coral"
              />
            ))}
          </div>
        </div>
      </section>

      {/* The build, end to end */}
      <section className="relative bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="03"
            kicker="From idea to Play Store"
            title={
              <>
                The build,
                <br />
                <span className="text-coral">end to end.</span>
              </>
            }
            note="Secure databases, HIPAA/DPDP/GDPR compliance and custom features — all under one roof."
          />
          <StepStrip steps={STEPS} accent="coral" />
        </div>
      </section>

      {/* Featured app — Needil */}
      <section className="relative bg-ink-2 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="04"
            kicker="Featured app"
            title={
              <>
                In production.
                <br />
                <span className="text-coral">In real clinics.</span>
              </>
            }
            note="This is not a demo — it runs live every day."
          />
          <CaseStudy
            num="01"
            client="Needil"
            sector="Patient Management System · Healthcare"
            description="A dedicated patient management system built for acupuncturists and other session-based treatment practitioners — designed around how clinics actually run their day, from intake to follow-up."
            did={[
              {
                lead: "Session-based workflow",
                body: "Appointments, treatment sessions and follow-ups modelled for acupuncturists and therapy-led practices.",
              },
              {
                lead: "Patient records",
                body: "Complete histories, treatment notes and progress tracking in one secure place.",
              },
              {
                lead: "Real-time operation",
                body: "Built for live clinical use — fast, reliable and dependable during a working day.",
              },
            ]}
            result="Currently in production — used in real time by over 10 doctors across their daily practice."
            folder="needil/app"
            accent="coral"
          />
        </div>
      </section>

      {/* Why LLE */}
      <section className="relative bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="05"
            kicker="Why LLE Social Media"
            title={
              <>
                Apps built to be
                <br />
                <span className="text-coral">kept.</span>
              </>
            }
          />
          <ReasonList items={WHY} accent="coral" />
        </div>
      </section>

      {/* Snapshot */}
      <section className="relative bg-ink-2 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="06"
            kicker="Our app development services"
            title={
              <>
                A quick
                <br />
                <span className="text-coral">snapshot.</span>
              </>
            }
            note="All services are customized to your industry and business goals."
          />
          <Snapshot items={SNAPSHOT} accent="coral" />
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="07"
            kicker="Frequently asked questions"
            title={
              <>
                Straight
                <br />
                <span className="text-coral">answers.</span>
              </>
            }
          />
          <ServiceFaq faqs={FAQS} accent="coral" />
        </div>
      </section>

      {/* CTA */}
      <ServiceCta
        title="Ready to build"
        highlight="your mobile app?"
        body="Whether you need a native Android app, a cross-platform Flutter app or a React Native solution — we bring your vision to life, secure, scalable and tailored to you. Get in touch and take the first step toward mobile excellence."
        buttonLabel="Start your app"
        accent="coral"
      />
    </>
  );
}
