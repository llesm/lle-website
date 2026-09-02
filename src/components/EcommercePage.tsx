import { useEffect } from "react";
import { Reveal, SectionHeading } from "../lib/motion";
import { ECOMMERCE_BG_CANDIDATES } from "../lib/theme";
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
    icon: "layers" as const,
    title: "WordPress, WooCommerce & Smart Inventory",
    tag: "The flexible foundation",
    body: "Custom WooCommerce stores that are visually stunning, easy to manage and optimized for conversions, with real-time stock tracking, low-stock alerts, automated updates, product variations and bulk import/export for growing catalogs.",
  },
  {
    icon: "shield" as const,
    title: "Payment Gateways: Secure & Seamless",
    tag: "Razorpay · Stripe · PayPal",
    body: "Trusted gateways tuned for Indian and global buyers, covering cards, UPI, net banking and wallets, protected with SSL encryption, PCI DSS compliance and tokenization, plus auto-invoices and payment notifications.",
  },
  {
    icon: "rocket" as const,
    title: "Checkout Flows: Carts People Finish",
    tag: "Friction-free by design",
    body: "Clean, distraction-free checkouts with progress indicators, guest checkout, auto-filled addresses, saved payment methods and one-click reorder. We eliminate the steps that cause abandonment, because we design carts people actually finish.",
  },
  {
    icon: "globe" as const,
    title: "Tuned for Indian & Global Buyers",
    tag: "Multi-currency · GST & VAT",
    body: "Multi-currency pricing, localized payments, multi-language support, region-specific tax (GST/VAT) and shipping logic for domestic and international delivery add up to a store that appeals across borders and cultures.",
  },
];

const STEPS = [
  {
    title: "Understand",
    body: "Discovery into your catalog, pricing, customers and competitors builds a customer-centric foundation.",
  },
  {
    title: "Roadmap",
    body: "Sitemap, user journey, SEO and performance planning, all scalable as your catalog grows.",
  },
  {
    title: "Build",
    body: "WooCommerce setup, payments, inventory and checkout, engineered for conversion.",
  },
  {
    title: "Optimize",
    body: "Speed, caching, CDN, analytics and A/B testing. We optimize until the numbers sing.",
  },
  {
    title: "Launch",
    body: "Hosting, SSL and security configured, zero-downtime go-live, then training and support.",
  },
];

const SNAPSHOT = [
  { lead: "WordPress & WooCommerce Setup", body: "Custom online stores with powerful features." },
  { lead: "Payment Gateway Integration", body: "Secure transactions with Razorpay, Stripe, PayPal & more." },
  { lead: "Checkout Flow Optimization", body: "Frictionless carts that convert." },
  { lead: "Inventory Management", body: "Real-time stock tracking and automated updates." },
  { lead: "Performance Optimization", body: "Faster loading speeds and better conversions." },
  { lead: "Multi-Currency & Localization", body: "Tuned for Indian and global buyers." },
];

const FAQS = [
  {
    q: "Do you build e-commerce stores for all product types?",
    a: "Yes: physical products, digital downloads and service-based businesses across all industries.",
  },
  {
    q: "What payment gateways do you integrate?",
    a: "Razorpay, Stripe, PayPal and other region-specific options.",
  },
  {
    q: "Is my e-commerce store secure for online payments?",
    a: "Yes: SSL encryption, PCI DSS compliance and secure payment tokenization for complete safety.",
  },
  {
    q: "Can my store support both Indian and international buyers?",
    a: "Yes: multi-currency, localized payments and global shipping options for international reach.",
  },
  {
    q: "How long does it take to build an e-commerce website?",
    a: "Timelines vary with catalog size and features, but most stores are completed within 4 to 8 weeks.",
  },
];

const WHY = [
  {
    icon: "rocket" as const,
    title: "Revenue-generating platforms",
    body: "We don't just build websites. We build platforms that drive sales and grow your business.",
  },
  {
    icon: "globe" as const,
    title: "Current & capable",
    body: "On top of e-commerce trends, payment technologies and conversion optimization strategies.",
  },
  {
    icon: "share" as const,
    title: "Client-centric",
    body: "First store or an upgrade, you get the same dedication and expertise on every project.",
  },
  {
    icon: "shield" as const,
    title: "Quality, reliability, results",
    body: "10+ years of experience behind every store we launch.",
  },
];

export default function EcommercePage() {
  useEffect(() => {
    document.title = "E-Commerce Website Design | LLE Social Media";
  }, []);

  return (
    <>
      <ServiceHero
        bgCandidates={ECOMMERCE_BG_CANDIDATES}
        kicker="E-Commerce Website Design"
        segments={[
          { text: "Sell with", cls: "text-paper" },
          { text: "Confidence", cls: "text-aqua" },
        ]}
        tagline="Your online store should work as hard as you do."
        meta="WooCommerce · Payments · CRO"
        accent="aqua"
      />

      {/* Why it matters */}
      <section className="relative bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="01"
            kicker="Why e-commerce design matters"
            title={
              <>
                Your store is your
                <br />
                <span className="text-aqua">digital storefront.</span>
              </>
            }
            note="It directly shapes how customers perceive your brand, and whether they buy."
          />
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="font-display text-2xl font-medium leading-snug tracking-tight text-paper md:text-[1.7rem]">
                Poor design, slow loads or confusing navigation mean abandoned
                carts and lost revenue. Customers expect seamless browsing,
                secure payments and fast checkout.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <p className="text-base leading-relaxed text-mist">
                A well-designed store builds trust, simplifies shopping and
                converts visitors into paying customers. With the global
                e-commerce market growing rapidly, a professional, user-friendly
                store is essential to business success.
              </p>
              <p className="mt-5 text-base leading-relaxed text-mist">
                We design e-commerce websites that are visually appealing,
                functionally robust and optimized for maximum conversions.
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
            kicker="What makes a store sell"
            title={
              <>
                Built to
                <br />
                <span className="text-aqua">convert.</span>
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
                accent="aqua"
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
            kicker="From catalog to checkout"
            title={
              <>
                The build,
                <br />
                <span className="text-aqua">end to end.</span>
              </>
            }
          />
          <StepStrip steps={STEPS} accent="aqua" />
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
                <span className="text-aqua">on the way.</span>
              </>
            }
            note="E-commerce case studies and screenshots are being added soon. Check back shortly."
          />
          <CaseStudy
            num="01"
            client="Your store could be next"
            sector="E-Commerce · Coming soon"
            description="We're preparing a showcase of online stores we've designed and launched, complete with screenshots, conversion results and the strategy behind each build. Until then, this space is reserved for the numbers that matter."
            did={[
              {
                lead: "Live store walkthroughs",
                body: "Screenshots and flows from real client stores, once published.",
              },
              {
                lead: "Conversion results",
                body: "The measurable impact of every build we ship.",
              },
            ]}
            result="Want your store featured here? Let's build it together."
            folder="ecommerce/work"
            accent="aqua"
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
                <span className="text-aqua">sell.</span>
              </>
            }
          />
          <ReasonList items={WHY} accent="aqua" />
        </div>
      </section>

      {/* Snapshot */}
      <section className="relative bg-ink-2 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="06"
            kicker="Our e-commerce services"
            title={
              <>
                A quick
                <br />
                <span className="text-aqua">snapshot.</span>
              </>
            }
            note="All services are customized to your industry and business goals."
          />
          <Snapshot items={SNAPSHOT} accent="aqua" />
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
                <span className="text-aqua">answers.</span>
              </>
            }
          />
          <ServiceFaq faqs={FAQS} accent="aqua" />
        </div>
      </section>

      {/* CTA */}
      <ServiceCta
        title="Ready to launch"
        highlight="your online store?"
        body="Whether you're a retailer, manufacturer or service provider, we build online stores that sell. Secure, scalable and optimized for conversions. Get in touch and take the first step toward e-commerce success."
        buttonLabel="Start your store"
        accent="aqua"
      />
    </>
  );
}
