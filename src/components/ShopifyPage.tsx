import { useEffect } from "react";
import { Reveal, SectionHeading } from "../lib/motion";
import { SHOPIFY_BG_CANDIDATES } from "../lib/theme";
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

const PILLAR_ROWS = [
  {
    icon: "pen" as const,
    title: "Theme Customization — Make Your Brand Stand Out",
    tag: "Beyond the template",
    body: "We customize layouts, typography, color and imagery into a cohesive, memorable experience — optimized for usability, mobile responsiveness and speed, with custom sections tailored to your products and customers.",
  },
  {
    icon: "layers" as const,
    title: "App Stack Integration — Extend Functionality",
    tag: "Marketing · SEO · Reviews · Loyalty",
    body: "We curate and integrate the right apps — then make sure they work seamlessly together and with your theme, so your store becomes a powerful, feature-rich engine without slowing down.",
  },
  {
    icon: "share" as const,
    title: "Store Migrations — Move to Shopify with Ease",
    tag: "WooCommerce · Magento · BigCommerce",
    body: "End-to-end migrations of products, customers, order history and content — with data integrity and minimal downtime, then thorough post-migration testing so you transition confidently.",
  },
  {
    icon: "code" as const,
    title: "Headless Shopify — Ultimate Flexibility",
    tag: "React · Next.js · Vue",
    body: "We separate the frontend from the commerce backend for blazing-fast load times and complete creative freedom — a truly differentiated storefront with seamless CMS and third-party integration.",
  },
];

const STEPS = [
  {
    title: "Understand",
    body: "Discovery into your catalog, customers and market — a customer-centric foundation.",
  },
  {
    title: "Roadmap",
    body: "Store structure, theme, apps, SEO and performance — scalable as you grow.",
  },
  {
    title: "Build",
    body: "Theme customization, app stack, payments and checkout — engineered to convert.",
  },
  {
    title: "Optimize",
    body: "Speed, caching, analytics and A/B testing — we optimize until the numbers sing.",
  },
  {
    title: "Launch",
    body: "Domain, SSL and security configured, zero-downtime go-live, training and support.",
  },
];

const SNAPSHOT = [
  { lead: "Theme Customization", body: "Unique, brand-reflective store designs." },
  { lead: "App Stack Integration", body: "Curated apps for enhanced functionality." },
  { lead: "Store Migrations", body: "Seamless transition to Shopify from other platforms." },
  { lead: "Headless Shopify", body: "Ultimate flexibility and performance." },
  { lead: "Payment Gateway Integration", body: "Secure transactions with Razorpay, Stripe, PayPal & more." },
  { lead: "Checkout Optimization", body: "Frictionless carts that convert." },
];

const FAQS = [
  {
    q: "Is Shopify suitable for small businesses?",
    a: "Yes — Shopify suits businesses of all sizes, from startups to large enterprises, with scalable plans and features.",
  },
  {
    q: "What payment gateways do you integrate with Shopify?",
    a: "Shopify Payments, Razorpay, Stripe, PayPal and other region-specific options.",
  },
  {
    q: "Can I migrate my existing store to Shopify?",
    a: "Yes — we handle end-to-end migrations from WooCommerce, Magento, BigCommerce and other platforms.",
  },
  {
    q: "What is headless Shopify and is it right for me?",
    a: "Headless Shopify offers maximum flexibility and performance — ideal for businesses needing custom, high-performance storefronts.",
  },
  {
    q: "How long does it take to build a Shopify store?",
    a: "Timelines vary with customization and features, but most stores are completed within 3 to 6 weeks.",
  },
];

const WHY = [
  {
    icon: "rocket" as const,
    title: "Scalable, revenue-generating stores",
    body: "We don't just build stores — we build platforms that drive sales and grow your business.",
  },
  {
    icon: "globe" as const,
    title: "Current & capable",
    body: "On top of the latest Shopify features, app ecosystems and optimization strategies.",
  },
  {
    icon: "share" as const,
    title: "Client-centric",
    body: "First product, messy-store redo or full replatform — tailored to your goals.",
  },
  {
    icon: "shield" as const,
    title: "We make Shopify work for you",
    body: "10+ years of experience behind every store we ship.",
  },
];

export default function ShopifyPage() {
  useEffect(() => {
    document.title = "Shopify Website Design — LLE Social Media";
  }, []);

  return (
    <>
      <ServiceHero
        bgCandidates={SHOPIFY_BG_CANDIDATES}
        kicker="Shopify Website Design"
        segments={[
          { text: "Built for", cls: "text-paper" },
          { text: "Scale", cls: "text-amber" },
        ]}
        tagline="Your Shopify store should grow with your business — and scale effortlessly."
        meta="Themes · Apps · Migrations · Headless"
        accent="amber"
      />

      {/* Why it matters */}
      <section className="relative bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="01"
            kicker="Why Shopify matters"
            title={
              <>
                The platform trusted
                <br />
                by <span className="text-amber">millions.</span>
              </>
            }
            note="Powerful, reliable, and ready to scale with you."
          />
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="font-display text-2xl font-medium leading-snug tracking-tight text-paper md:text-[1.7rem]">
                Whether you're launching your first product, redoing a messy
                store, or replatforming a brick-and-mortar business — Shopify
                gives you the flexibility and scalability you need.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-base leading-relaxed text-mist">
                A well-designed Shopify store builds credibility, streamlines
                operations and drives sales with minimal friction. Customers
                expect fast load times, intuitive navigation and seamless
                checkout.
              </p>
              <p className="mt-5 text-base leading-relaxed text-mist">
                We design Shopify stores that are visually stunning,
                functionally robust and optimized for conversions.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative bg-ink-2 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="02"
            kicker="What we do with Shopify"
            title={
              <>
                Every lever,
                <br />
                <span className="text-amber">pulled for you.</span>
              </>
            }
          />
          <div className="space-y-6">
            {PILLAR_ROWS.map((r, i) => (
              <EditorialRow
                key={r.title}
                num={`0${i + 1}`}
                icon={r.icon}
                title={r.title}
                tag={r.tag}
                body={r.body}
                accent="amber"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="03"
            kicker="From theme to launch"
            title={
              <>
                The build,
                <br />
                <span className="text-amber">end to end.</span>
              </>
            }
          />
          <StepStrip steps={STEPS} accent="amber" />
        </div>
      </section>

      {/* Work — placeholder for upcoming screenshots */}
      <section className="relative bg-ink-2 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="04"
            kicker="Our work"
            title={
              <>
                Success stories,
                <br />
                <span className="text-amber">on the way.</span>
              </>
            }
            note="Shopify case studies and screenshots are being added soon — check back shortly."
          />
          <CaseStudy
            num="01"
            client="Your store could be next"
            sector="Shopify · Coming soon"
            description="We're preparing a showcase of Shopify stores we've customized, migrated and launched — with screenshots, revenue results and the strategy behind each build. Until then, this space is reserved for the numbers that matter."
            did={[
              {
                lead: "Live store walkthroughs",
                body: "Screenshots and flows from real client stores, once published.",
              },
              {
                lead: "Revenue results",
                body: "The measurable impact of every store we ship.",
              },
            ]}
            result="Want your Shopify store featured here? Let's build it together."
            folder="shopify/work"
            accent="amber"
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
                Stores built to
                <br />
                <span className="text-amber">scale.</span>
              </>
            }
          />
          <ReasonList items={WHY} accent="amber" />
        </div>
      </section>

      {/* Snapshot */}
      <section className="relative bg-ink-2 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="06"
            kicker="Our Shopify services"
            title={
              <>
                A quick
                <br />
                <span className="text-amber">snapshot.</span>
              </>
            }
            note="All services are customized to your industry and business goals."
          />
          <Snapshot items={SNAPSHOT} accent="amber" />
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
                <span className="text-amber">answers.</span>
              </>
            }
          />
          <ServiceFaq faqs={FAQS} accent="amber" />
        </div>
      </section>

      {/* CTA */}
      <ServiceCta
        title="Ready to build"
        highlight="your Shopify store?"
        body="First product, messy-store redo or full replatform — we have the expertise to deliver. Secure, scalable and optimized for conversions. Get in touch and take the first step toward e-commerce success."
        buttonLabel="Start your store"
        accent="amber"
      />
    </>
  );
}
