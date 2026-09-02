import { useEffect } from "react";
import { Reveal, SectionHeading } from "../lib/motion";
import { MEDICAL_BG_CANDIDATES } from "../lib/theme";
import { goSection } from "../lib/router";
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

const WHY_REASONS = [
  {
    icon: "pen" as const,
    title: "Research, verify, tailor",
    body: "We don't just write. We research and tailor every piece to your specialty and audience.",
  },
  {
    icon: "globe" as const,
    title: "Always current",
    body: "We stay on top of medical trends, SEO practices and social algorithms to keep content effective.",
  },
  {
    icon: "shield" as const,
    title: "Ethical & compliant",
    body: "We respect patient privacy and ensure all content complies with healthcare regulations.",
  },
  {
    icon: "share" as const,
    title: "Genuine passion",
    body: "We genuinely care about helping doctors, surgeons and hospitals connect with patients.",
  },
];

const PROCESS = [
  {
    title: "Consult",
    body: "An in-depth consultation to understand your practice, goals and target audience.",
  },
  {
    title: "Research",
    body: "Thorough research to identify the topics and keywords your patients search for.",
  },
  {
    title: "Craft",
    body: "Compelling blogs, posts and scripts with your brand voice and patient needs up front.",
  },
  {
    title: "Review",
    body: "Rigorous review for accuracy, clarity and impact before anything is delivered.",
  },
  {
    title: "Track",
    body: "We track performance metrics and continuously refine the strategy.",
  },
];

const SERVICES = [
  { lead: "Medical Blog Writing", body: "SEO-optimized, patient-centric articles." },
  { lead: "Social Media Posts", body: "Creative designs + compelling copy for Facebook & Instagram." },
  { lead: "Video Production", body: "Scriptwriting, shooting and editing for Instagram, YouTube & Facebook." },
  { lead: "Patient Education Materials", body: "Infographics, brochures and guides." },
  { lead: "Content Strategy", body: "Tailored plans to achieve your specific goals." },
];

const FAQS = [
  {
    q: "Do you understand medical terminology?",
    a: "Yes. Our team has extensive experience writing for healthcare professionals and uses accurate medical terminology in all content.",
  },
  {
    q: "Is the content compliant with healthcare regulations?",
    a: "Absolutely. We adhere to all ethical guidelines and ensure your content is compliant with advertising and privacy standards.",
  },
  {
    q: "How often should I post medical blogs?",
    a: "We recommend 2–4 blogs per month for optimal SEO results, but we customize frequency based on your goals and capacity.",
  },
  {
    q: "Do you handle video shoots at our clinic / hospitals?",
    a: "Yes, we manage everything from shooting at your location to editing and publishing across platforms.",
  },
  {
    q: "How long does it take to see results?",
    a: "Results vary, but consistent content creation typically shows improved engagement and visibility within 3–6 months.",
  },
];

export default function MedicalContentPage() {
  useEffect(() => {
    document.title = "Medical Content Creation | LLE Social Media";
  }, []);

  return (
    <>
      <ServiceHero
        bgCandidates={MEDICAL_BG_CANDIDATES}
        kicker="Medical Content Creation"
        segments={[
          { text: "Medical", cls: "text-paper" },
          { text: "Content", cls: "text-aqua" },
          { text: "Creation", cls: "text-stroke text-paper" },
        ]}
        tagline="Educate. Engage. Build Trust."
        meta="Healthcare content, handled with care"
        accent="aqua"
        titleClass="text-[13vw] sm:text-6xl md:text-[7rem]"
      />

      {/* Why it matters */}
      <section className="relative bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="01"
            kicker="Why medical content matters"
            title={
              <>
                Content isn't just marketing.
                <br />
                It's a <span className="text-aqua">responsibility.</span>
              </>
            }
            note="When it comes to health, trust is everything."
          />
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="font-display text-2xl font-medium leading-snug tracking-tight text-paper md:text-[1.7rem]">
                Patients turn to the internet before they ever step into a
                clinic. Your online content shapes first impressions,
                influences decisions and builds the foundation of trust.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-base leading-relaxed text-mist">
                Accurate, empathetic and informative content can reassure
                anxious patients, answer critical health questions and position
                you as a credible authority in the healthcare field. Poor or
                generic content, on the other hand, can erode trust quickly.
              </p>
              <p className="mt-5 text-base leading-relaxed text-mist">
                That's why we create medical content that balances clinical
                accuracy with compassionate communication, helping you connect
                with patients on a human level while maintaining the
                professionalism your practice demands.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="relative bg-ink-2 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="02"
            kicker="What we create"
            title={
              <>
                Three ways we make
                <br />
                your expertise <span className="text-aqua">heard.</span>
              </>
            }
          />
          <div className="border-b border-line">
            <EditorialRow
              num="01"
              icon="pen"
              accent="aqua"
              tag="Inform. Educate. Inspire."
              title="Medical Blog Writing"
              body="Medical blogs are one of the most powerful tools to establish your expertise and improve your search rankings. We write well-researched, SEO-optimized posts, from common symptoms and treatment options to preventive care and post-surgery recovery. Our team understands medical terminology, ethical guidelines and patient psychology, so every piece is accurate and accessible. We don't just write for search engines; we write for people seeking answers."
            />
            <EditorialRow
              num="02"
              icon="share"
              accent="aqua"
              tag="Connect & Convert"
              title="Social Media Content"
              body="Facebook and Instagram humanize your practice and let you engage patients personally. We create scroll-stopping content like carousels, infographics, patient-education cards and interactive posts that simplify complex medical information into digestible visuals. Our copy is professional yet warm, celebrating patient stories and health tips while staying strictly compliant with healthcare advertising guidelines."
            />
            <EditorialRow
              num="03"
              icon="play"
              accent="aqua"
              tag="From Script to Screen"
              title="Video Creation"
              body="Video is the most engaging form of content today, and in healthcare it is a game-changer. We offer end-to-end production: conceptualization, scriptwriting, shooting and post-production. Whether it's a doctor's introduction, patient testimonial or treatment explainer, we bring your vision to life with cinematic quality, optimized for Instagram Reels, YouTube and Facebook."
            />
          </div>
        </div>
      </section>

      {/* Our work */}
      <section className="relative bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="03"
            kicker="Our work"
            title={
              <>
                Success <span className="text-aqua">stories.</span>
              </>
            }
            note="A glimpse of how we've helped healthcare clients transform their digital presence."
          />
          <div className="space-y-24">
            <CaseStudy
              num="01"
              client="Springfield Wellness Centre"
              sector="Holistic wellness & patient-centric care"
              accent="aqua"
              folder="photos/sfw/blog"
              description="Springfield Wellness Centre is a premier healthcare facility dedicated to holistic wellness and patient-centric care. We partnered with them to elevate their digital presence through a comprehensive content strategy."
              did={[
                {
                  lead: "Medical Blog Writing",
                  body: "50+ SEO-optimized posts covering wellness topics, treatment options and preventive healthcare, helping them rank higher and attract more patients.",
                },
                {
                  lead: "Social Media Management",
                  body: "Engaging Facebook and Instagram posts that educated followers, shared patient success stories and promoted health-awareness campaigns.",
                },
                {
                  lead: "Video Production",
                  body: "Doctor introductions, facility walkthroughs and patient testimonials, optimized for Reels, YouTube and Facebook.",
                },
              ]}
              result="A significant boost in patient inquiries, increased social following and a stronger brand presence in the wellness community."
            />
            <CaseStudy
              num="02"
              client="Expert Dental Care"
              sector="Advanced, patient-friendly dentistry"
              accent="aqua"
              reverse
              folder="photos/edc/blogs"
              description="Expert Dental Care is a trusted name in dental healthcare, known for advanced treatments and patient-friendly care. We collaborated to create content that educates patients and builds confidence in their services."
              did={[
                {
                  lead: "Medical Blog Writing",
                  body: "Informative blogs on dental procedures, oral-hygiene tips and treatment guides that address common patient fears and questions.",
                },
                {
                  lead: "Social Media Content",
                  body: "Visually appealing posts, infographics and educational carousels that simplified dental procedures and encouraged engagement.",
                },
                {
                  lead: "Video Production",
                  body: "Treatment explainers, doctor profiles and patient testimonials that help potential patients feel informed and reassured.",
                },
              ]}
              result="Enhanced patient trust, higher appointment bookings and a vibrant social community that actively engages with their content."
            />
          </div>
        </div>
      </section>

      {/* Why LLE */}
      <section className="relative bg-ink-2 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="04"
            kicker="Why LLE"
            title={
              <>
                Why LLE for
                <br />
                <span className="text-aqua">medical content?</span>
              </>
            }
            note="10+ years of healthcare content creation. We understand what sets medical professionals apart."
          />
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="font-display text-2xl font-medium leading-snug tracking-tight text-paper md:text-[1.7rem]">
                When you choose us, you choose a partner committed to your
                success and your patients' well-being.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <ReasonList items={WHY_REASONS} accent="aqua" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="05"
            kicker="How we work"
            title={
              <>
                Content that works,
                <br />
                <span className="text-aqua">step by step.</span>
              </>
            }
            note="Simple, transparent and results-driven. From start to finish we keep you involved and informed."
          />
          <StepStrip steps={PROCESS} accent="aqua" />
        </div>
      </section>

      {/* Services snapshot */}
      <section className="relative bg-ink-2 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="06"
            kicker="At a glance"
            title={
              <>
                Our medical content
                <br />
                <span className="text-aqua">services.</span>
              </>
            }
          />
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <Snapshot
                items={SERVICES}
                accent="aqua"
                note="All services are customized to your specialty, whether you are a cardiologist, dermatologist, surgeon or hospital network."
              />
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-5">
              <div className="rounded-lg border border-line bg-ink p-7 md:p-8">
                <p className="font-display text-xl font-semibold tracking-tight text-paper">
                  Not sure where to start?
                </p>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  Tell us about your practice and goals. We'll recommend the
                  right mix of blogs, social and video to get you noticed.
                </p>
                <button
                  onClick={() => goSection("contact")}
                  className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-aqua transition-colors hover:text-paper"
                >
                  Talk to us
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M2 8h11M9 4l4 4-4 4" />
                  </svg>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <SectionHeading
            index="07"
            kicker="FAQ"
            title={
              <>
                Questions,
                <br />
                <span className="text-aqua">answered.</span>
              </>
            }
          />
          <ServiceFaq faqs={FAQS} accent="aqua" />
        </div>
      </section>

      <ServiceCta
        accent="aqua"
        title="Ready to elevate"
        highlight="your medical brand?"
        body="Your content is the voice of your practice, so make it count. Whether you need blogs, social posts or professional videos, let's create medical content that truly makes a difference."
        buttonLabel="Get in touch"
      />
    </>
  );
}
