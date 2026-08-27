export const IMG = {
  hero: "https://image.qwenlm.ai/generated-images/2d06bd5a-a3ac-41cd-8bc0-8ec6093c5418/_result.png",
  ecom: "https://image.qwenlm.ai/generated-images/c3cd909f-402a-4f97-9a2f-2542a677eac2/_result.png",
  medical:
    "https://image.qwenlm.ai/generated-images/c2ed5f2c-423e-4916-a118-863190a47b45/_result.png",
  app: "https://image.qwenlm.ai/generated-images/109d4291-3514-4b81-8d19-ab49944d168a/_result.png",
  shopify:
    "https://image.qwenlm.ai/generated-images/3329f776-5e3f-4b86-99fd-681fe2aed016/_result.png",
  web: "https://image.qwenlm.ai/generated-images/c8483764-e3c7-463d-a283-5c2ebb78995e/_result.png",
};

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export type Service = {
  id: string;
  num: string;
  title: string;
  tag: string;
  accent: "coral" | "aqua" | "amber";
  description: string;
  deliverables: string[];
  icon: "web" | "cart" | "store" | "pulse" | "phone";
};

export const SERVICES: Service[] = [
  {
    id: "website-designing",
    num: "01",
    title: "Website Designing",
    tag: "Design + Build",
    accent: "coral",
    icon: "web",
    description:
      "Our websites are designed and engineered around your brand voice — from wireframe to launch. Every layout is built to load fast, rank well and turn visitors into enquiries. The motive is not just to look good in the screens.",
    deliverables: [
      "UI/UX & wireframes",
      "Custom front-end build",
      "CMS integration",
      "SEO-ready architecture",
      "Speed optimisation",
      "Analytics & heatmaps",
    ],
  },
  {
    id: "ecommerce",
    num: "02",
    title: "E-Commerce Websites",
    tag: "Sell 24×7",
    accent: "aqua",
    icon: "cart",
    description:
      "WordPress online stores integrated with WooCommerce, Payment Gateways, Inventory Logic and Checkout Flows tuned for Indian and Global buyers. We design carts people actually finish and then optimise them until the numbers sing.",
    deliverables: [
      "WooCommerce / custom carts",
      "Payment gateway setup",
      "Catalogue & inventory logic",
      "Checkout CRO",
      "Abandoned-cart flows",
      "Order & CRM dashboards",
    ],
  },
  {
    id: "shopify",
    num: "03",
    title: "Shopify Websites",
    tag: "DTC Machine",
    accent: "amber",
    icon: "store",
    description:
      "Shopify stores built for scale — theme customisation, app stacks, migrations and headless builds. Whether you are launching your first product, redoing a messy online store, or replatforming an existing brick and mortar store, we make Shopify work for you.",
    deliverables: [
      "Store setup & theme design",
      "Headless / Hydrogen builds",
      "App stack & integrations",
      "Migration from any platform",
      "Subscription & bundle logic",
      "Conversion rate audits",
    ],
  },
  {
    id: "medical-content",
    num: "04",
    title: "Medical Content Creation",
    tag: "Trust, Verified",
    accent: "aqua",
    icon: "pulse",
    description:
      "Patient-first content for Doctors, Surgeons, Clinics, Hospitals, Pharma and Health-tech organizations — written with Qualified Medical content creators, checked for compliance and packaged for every channel. Authority-building content that ranks.",
    deliverables: [
      "Clinic & hospital websites",
      "Doctor-led social content",
      "Patient education articles",
      "Compliance Confirming Copywriting",
      "Medical video scripts",
      "Local SEO for practices",
    ],
  },
  {
    id: "app-development",
    num: "05",
    title: "App Development",
    tag: "Android",
    accent: "coral",
    icon: "phone",
    description:
      "Android apps that ship on time and survive real users. From MVP sprints to full product teams, we design, build and iterate apps clients love and serve their intended purposes.",
    deliverables: [
      "React Native / Flutter",
      "MVP in 6–10 weeks",
      "API & backend engineering",
      "Play Store launch",
      "Push & retention loops",
      "Post-launch care plans",
    ],
  },
];

export type Work = {
  client: string;
  sector: string;
  category: string;
  image: string;
  blurb: string;
  metrics: { value: string; label: string }[];
  tags: string[];
  span: "lg" | "sm" | "full";
  year: string;
};

export const WORKS: Work[] = [
  {
    client: "Koskii",
    sector: "Fashion D2C",
    category: "E-Commerce Website",
    image: IMG.ecom,
    blurb:
      "A headless storefront for a streetwear label drowning in cart abandonment. Rebuilt the journey around drops, size confidence and one-tap checkout.",
    metrics: [
      { value: "+212%", label: "Avg. order value" },
      { value: "1.4s", label: "Load time" },
    ],
    tags: ["Headless", "CRO", "Brand design"],
    span: "lg",
    year: "2025",
  },
  {
    client: "MediLeaf Clinics",
    sector: "Healthcare",
    category: "Medical Content",
    image: IMG.medical,
    blurb:
      "A 120-article patient-education engine plus doctor-led social content for a 6-location clinic chain — written with physicians, optimised for local search.",
    metrics: [{ value: "3.4×", label: "Organic traffic" }],
    tags: ["Healthcare SEO", "Content system"],
    span: "sm",
    year: "2025",
  },
  {
    client: "PulseFit",
    sector: "Fitness Tech",
    category: "App Development",
    image: IMG.app,
    blurb:
      "A habit-first fitness companion with adaptive plans and streak mechanics. Took it from napkin sketch to both app stores in nine weeks.",
    metrics: [{ value: "80k", label: "Downloads, yr 1" }],
    tags: ["React Native", "Product design"],
    span: "sm",
    year: "2024",
  },
  {
    client: "Verdana Skin",
    sector: "Skincare DTC",
    category: "Shopify Website",
    image: IMG.shopify,
    blurb:
      "Replatformed from WooCommerce to Shopify with a custom theme, quiz funnel and subscription bundles that turned one-time buyers into routines.",
    metrics: [{ value: "+190%", label: "Revenue in 6 mo" }],
    tags: ["Shopify Plus", "Subscriptions"],
    span: "lg",
    year: "2024",
  },
  {
    client: "Atelier North",
    sector: "Architecture",
    category: "Website Designing",
    image: IMG.web,
    blurb:
      "A monochrome portfolio site with oversized type and buttery case studies — designed to make a boutique studio feel twice its size.",
    metrics: [
      { value: "48%", label: "Visitor → lead rate" },
      { value: "99", label: "PageSpeed score" },
    ],
    tags: ["Web design", "Motion", "CMS"],
    span: "full",
    year: "2023",
  },
];

export type Step = {
  num: string;
  title: string;
  body: string;
  tags: string[];
};

export const PROCESS: Step[] = [
  {
    num: "01",
    title: "Discover",
    body: "We start with your numbers, not our opinions. Stakeholder interviews, analytics teardown and competitor mapping give us a sharp picture of where growth is hiding.",
    tags: ["Audit", "Research", "KPI map"],
  },
  {
    num: "02",
    title: "Design",
    body: "Strategy becomes a visual system — wireframes, moodboards and prototypes you can click before a single line of production code is written.",
    tags: ["Wireframes", "Design system", "Prototype"],
  },
  {
    num: "03",
    title: "Build",
    body: "Weekly sprints with a live staging link from day three. You watch the site or app come together in real time and steer it with us, not after us.",
    tags: ["Sprints", "Staging link", "QA"],
  },
  {
    num: "04",
    title: "Grow",
    body: "Launch is the starting line. CRO experiments, content engines and performance loops keep compounding results quarter after quarter.",
    tags: ["CRO", "SEO", "Retention"],
  },
];

export const STATS = [
  { value: 60, suffix: "+", label: "Projects Shipped" },
  { value: 97, suffix: "%", label: "Client Retention" },
  { value: 1200, suffix: "+", label: "Blogs Written" },
  { value: 12, suffix: " yrs", label: "In the Game" },
];

export const TESTIMONIALS = [
  {
    quote:
      "LLE rebuilt our Shopify store and quietly tripled our conversion rate in two months. They talk in numbers, not jargon — it felt like hiring an in-house team overnight.",
    name: "Ananya Verma",
    role: "Founder, Verdana Skin",
    accent: "coral",
  },
  {
    quote:
      "Medical content is a minefield of compliance and trust. Their writers worked directly with our doctors and produced content patients actually thank us for.",
    name: "Dr. Rohan Mehta",
    role: "Director, MediLeaf Clinics",
    accent: "aqua",
  },
  {
    quote:
      "From Figma to both app stores in nine weeks, with a staging build on my phone every Friday. I've worked with four agencies — none came close to this cadence.",
    name: "Kabir Anand",
    role: "CEO, PulseFit",
    accent: "amber",
  },
  {
    quote:
      "Our new website made a six-person studio look like a sixty-person one. Enquiry volume nearly doubled, and the leads are bigger, better-fit projects.",
    name: "Sara Kulkarni",
    role: "Partner, Atelier North",
    accent: "coral",
  },
  {
    quote:
      "They don't just hand over a website and vanish. The monthly growth reviews are where the real money gets made — every suggestion is backed by data.",
    name: "Vikram Shah",
    role: "CMO, Nimbus Pay",
    accent: "aqua",
  },
];

export const FAQS = [
  {
    q: "How long does a typical website take?",
    a: "A focused business website ships in 3–5 weeks; e-commerce and Shopify builds usually run 5–8 weeks depending on catalogue size and integrations. You get a live staging link from the first week, so there are no big-bang reveals.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes — roughly a third of our clients are pre-Series A. We offer scoped MVP packages for apps and lean launch stores for D2C brands, so you validate fast without over-building.",
  },
  {
    q: "Is your medical content compliance-safe?",
    a: "Every healthcare piece is drafted from clinician-reviewed briefs, checked against advertising norms for medical services, and approved by your team before publishing. We write to build trust, never to overclaim.",
  },
  {
    q: "What does a project cost?",
    a: "Websites start around ₹60k, Shopify builds around ₹90k, content retainers around ₹35k/month, and app MVPs around ₹4L. Every quote is fixed-scope — no surprise invoices, ever.",
  },
  {
    q: "Will you maintain the site after launch?",
    a: "That's the plan. Growth care retainers cover hosting, updates, security, backups and a monthly experiment roadmap — because a website should appreciate, not depreciate.",
  },
  {
    q: "Can you take over a project another agency abandoned?",
    a: "Happily, and often. We run a code-and-content audit first, give you an honest fix-vs-rebuild recommendation, and then take ownership of the roadmap.",
  },
];

export const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { name: "X", href: "https://x.com", icon: "x" },
  { name: "Behance", href: "https://behance.net", icon: "behance" },
] as const;

export const CONTACT_EMAIL = "hello@llesocial.media";
export const CONTACT_PHONE = "+91 98100 45210";
