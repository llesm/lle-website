import { useEffect } from "react";
import { Reveal, SectionHeading } from "../lib/motion";
import { WEBDESIGN_BG_CANDIDATES } from "../lib/theme";
import { goSection } from "../lib/router";
import {
  CaseStudy,
  EditorialRow,
  ReasonList,
  ServiceCta,
  ServiceFaq,
  ServiceHero,
  Snapshot,
} from "./ServiceBlocks";

const WHY_REASONS = [
  {
    icon: "layers" as const,
    title: "Experiences, not just websites",
    body: "We build digital experiences that engage, convert and grow your business.",
  },
  {
    icon: "globe" as const,
    title: "Current & capable",
    body: "We stay on top of design trends, technologies and SEO so your site performs everywhere.",
  },
  {
    icon: "share" as const,
    title: "Client-centric",
    body: "We listen to your goals and tailor every solution to your unique needs.",
  },
  {
    icon: "shield" as const,
    title: "Cross-industry dedication",
    body: "Healthcare, retail or any sector gets the same dedication and expertise on every project.",
  },
];

const SERVICES = [
  { lead: "WordPress Website Design", body: "Flexible, scalable and easy to manage." },
  { lead: "HTML Website Design", body: "Lightweight, fast and custom-coded." },
  { lead: "React Website Design", body: "Dynamic, interactive and modern." },
  { lead: "Responsive Design", body: "Optimized for all devices and screen sizes." },
  { lead: "SEO Integration", body: "Built with SEO best practices from day one." },
  { lead: "Ongoing Maintenance", body: "Regular updates, security and performance optimization." },
];

const FAQS = [
  {
    q: "Do you design websites for all industries?",
    a: "Yes, we design websites for medical professionals, healthcare providers, retailers and general businesses across all sectors.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Timelines vary with complexity, but most websites are completed within 4 to 6 weeks from concept to launch. Simple websites are built within 3–5 working days.",
  },
  {
    q: "Do you offer website maintenance services?",
    a: "Yes, we provide ongoing maintenance, security updates and performance optimization to keep your website running smoothly.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Absolutely. We can revamp your current website with a fresh, modern design and improved functionality.",
  },
  {
    q: "Is my website mobile-friendly?",
    a: "Yes, all our websites are fully responsive and optimized for desktops, tablets and smartphones.",
  },
];

export default function WebsiteDesignPage() {
  useEffect(() => {
    document.title = "Website Designing | LLE Social Media";
  }, []);

  return (
    <>
      <ServiceHero
        bgCandidates={WEBDESIGN_BG_CANDIDATES}
        kicker="Website Designing"
        segments={[
          { text: "Website", cls: "text-paper" },
          { text: "Designing", cls: "text-coral" },
        ]}
        tagline="Build Your Digital Identity."
        meta="WordPress · HTML · React"
        accent="coral"
        blurClass="blur-[6px]"
      />

      {/* Why it matters */}
      <section className="relative bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="01"
            kicker="Why website designing matters"
            title={
              <>
                Your website is your
                <br />
                <span className="text-coral">digital face.</span>
              </>
            }
            note="A professional website is no longer optional. It is essential."
          />
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="font-display text-2xl font-medium leading-snug tracking-tight text-paper md:text-[1.7rem]">
                Patients and customers judge your reliability by how your
                website looks and functions, often before they ever meet you.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-base leading-relaxed text-mist">
                A well-designed website builds credibility, communicates your
                brand values and converts visitors into loyal clients. A slow,
                outdated or confusing website drives people away, while a
                modern, responsive, user-friendly website invites them to stay
                and explore.
              </p>
              <p className="mt-5 text-base leading-relaxed text-mist">
                We design websites that are visually stunning, easy to navigate
                and optimized for performance, for healthcare professionals
                and businesses alike.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Discovery & strategy */}
      <section className="relative bg-ink-2 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="02"
            kicker="Discovery & strategy"
            title={
              <>
                We start with
                <br />
                <span className="text-coral">understanding.</span>
              </>
            }
          />
          <div className="border-b border-line">
            <EditorialRow
              num="01"
              icon="globe"
              accent="coral"
              tag="Brand, Goals & Audience"
              title="Understanding Your Brand"
              body="Every great website begins with a deep understanding of your brand, goals and audience. We run discovery sessions to learn your mission, services and unique selling points, analyze competitors and study your audience's behavior, so every design decision aligns with your vision."
            />
            <EditorialRow
              num="02"
              icon="layers"
              accent="coral"
              tag="A Roadmap for Success"
              title="Creating a Roadmap"
              body="We create a detailed sitemap for logical structure and easy navigation, and plan the user journey from landing to action. Our strategy covers content planning, SEO and technical requirements, presented for your feedback and approval before any design work begins."
            />
          </div>
        </div>
      </section>

      {/* Choose your stack */}
      <section className="relative bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="03"
            kicker="Choose your stack"
            title={
              <>
                Three ways to
                <br />
                <span className="text-coral">build it right.</span>
              </>
            }
          />
          <div className="border-b border-line">
            <EditorialRow
              num="03"
              icon="globe"
              accent="coral"
              tag="Flexible, Scalable, User-Friendly"
              title="WordPress"
              body="One of the world's most popular content management systems, and for good reason. We build powerful, scalable WordPress websites that are easy to manage, fully customizable with themes and plugins, fast, responsive and SEO-ready, from a simple blog to a complex multi-page platform."
            />
            <EditorialRow
              num="04"
              icon="code"
              accent="coral"
              tag="Lightweight, Fast, Custom-Coded"
              title="HTML"
              body="For clients who want complete control over code and performance. HTML websites are lightweight, fast-loading and highly secure. We write clean, semantic code that's easy to maintain, fully responsive and enhanced with CSS and JavaScript, giving you a unique site unconstrained by third-party themes or plugins."
            />
            <EditorialRow
              num="05"
              icon="atom"
              accent="coral"
              tag="Dynamic, Interactive, Modern"
              title="React"
              body="A powerful JavaScript library for dynamic, interactive interfaces. We build modern single-page applications with smooth, app-like experiences that are fast, capable of real-time updates and complex interactions, with reusable components that keep your entire site consistent and efficient."
            />
          </div>
        </div>
      </section>

      {/* From build to launch */}
      <section className="relative bg-ink-2 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="04"
            kicker="From build to launch"
            title={
              <>
                Crafted, tested,
                <br />
                <span className="text-coral">launched with confidence.</span>
              </>
            }
          />
          <div className="border-b border-line">
            <EditorialRow
              num="06"
              icon="pen"
              accent="coral"
              tag="Bringing Your Vision to Life"
              title="Design & Development"
              body="Our designers craft stunning visual mockups reflecting your brand: typography, color, imagery and layout. Once approved, our developers write clean, efficient code with scalability and performance in mind, keeping you in the loop with open communication throughout."
            />
            <EditorialRow
              num="07"
              icon="shield"
              accent="coral"
              tag="Ensuring Flawless Performance"
              title="Rigorous Testing"
              body="Before launch we test for cross-browser compatibility on Chrome, Firefox, Safari and Edge, and across desktops, tablets and smartphones. We check every link, form, image and interactive element, and run performance tests, so your website is polished, professional and ready."
            />
            <EditorialRow
              num="08"
              icon="rocket"
              accent="coral"
              tag="Going Live with Confidence"
              title="Launch & Support"
              body="We handle the entire deployment, from transferring files to configuring servers and domain settings, for a smooth transition with minimal downtime. Post-launch we provide training and documentation, and remain available for ongoing maintenance and updates."
            />
          </div>
        </div>
      </section>

      {/* Our work */}
      <section className="relative bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="05"
            kicker="Our work"
            title={
              <>
                Success <span className="text-coral">stories.</span>
              </>
            }
            note="A glimpse of how we've helped clients transform their digital presence through strategic website design."
          />
          <div className="space-y-24">
            <CaseStudy
              num="01"
              client="Needil"
              sector="Modern Healthcare Landing Page"
              accent="coral"
              folder="photos/needil/website"
              description="We designed and developed a modern, conversion-focused landing page for Needil, focused on presenting the brand clearly and engaging healthcare practitioners."
              did={[
                {
                  lead: "Modern, professional UI",
                  body: "Tailored to the healthcare industry with clear messaging and strategic call-to-actions.",
                },
                {
                  lead: "Responsive design",
                  body: "Flawless across mobile, tablet and desktop with a fast, smooth browsing experience.",
                },
                {
                  lead: "Built to convert",
                  body: "Designed to build trust and turn visitors into potential customers.",
                },
              ]}
              result="A clean and professional online presence that communicates Needil's value effectively and creates a strong first impression."
            />
            <CaseStudy
              num="02"
              client="Expert Dental Care"
              sector="Built with WordPress"
              accent="coral"
              reverse
              folder="photos/edc/website"
              description="Expert Dental Care is a trusted name in dental healthcare, known for advanced treatments and patient-friendly care. We collaborated to design a website that reassures and informs potential patients."
              did={[
                {
                  lead: "WordPress Development",
                  body: "A sleek, responsive website highlighting services, team and patient testimonials with clarity and elegance.",
                },
                {
                  lead: "Service Pages",
                  body: "Detailed pages explaining dental procedures in simple, patient-friendly language that eases common fears.",
                },
                {
                  lead: "Contact Integration",
                  body: "Easy-to-use contact forms and location maps, making it simple for patients to reach out and book.",
                },
              ]}
              result="Increased appointment bookings, higher patient confidence and a website that truly represents their expertise."
            />
          </div>
        </div>
      </section>

      {/* Why LLE */}
      <section className="relative bg-ink-2 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="06"
            kicker="Why LLE"
            title={
              <>
                Why LLE for
                <br />
                <span className="text-coral">website design?</span>
              </>
            }
            note="10+ years of website design and development. We understand what makes a website truly effective."
          />
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="font-display text-2xl font-medium leading-snug tracking-tight text-paper md:text-[1.7rem]">
                When you choose us, you choose quality, reliability and
                results.
              </p>
              <button
                onClick={() => goSection("contact")}
                className="mt-8 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-coral transition-colors hover:text-paper"
              >
                Start your project
                <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M2 8h11M9 4l4 4-4 4" />
                </svg>
              </button>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <ReasonList items={WHY_REASONS} accent="coral" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services snapshot */}
      <section className="relative bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="07"
            kicker="At a glance"
            title={
              <>
                Our website design
                <br />
                <span className="text-coral">services.</span>
              </>
            }
          />
          <Snapshot
            items={SERVICES}
            accent="coral"
            note="All services are customized to your industry and business goals."
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-ink-2 py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <SectionHeading
            index="08"
            kicker="FAQ"
            title={
              <>
                Questions,
                <br />
                <span className="text-coral">answered.</span>
              </>
            }
          />
          <ServiceFaq faqs={FAQS} accent="coral" />
        </div>
      </section>

      <ServiceCta
        accent="coral"
        title="Ready to build"
        highlight="your digital identity?"
        body="Your website is the cornerstone of your digital presence, and it deserves the best. Whether you need WordPress, custom HTML or a dynamic React application, let's bring your vision to life."
        buttonLabel="Get a quote"
      />
    </>
  );
}
