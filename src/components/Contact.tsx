import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import InteractiveHoverButton from "./InteractiveHoverButton";
import { Asterisk, Reveal, SectionHeading, SocialIcon } from "../lib/motion";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SERVICES,
  SOCIALS,
} from "../lib/data";

const BUDGETS = [
  "Less than ₹10k",
  "₹10k–25k",
  "₹25k–60k",
  "₹60k–1L",
  "Above ₹1L",
];

type Errors = { name?: string; email?: string; message?: string };

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: SERVICES[0].title,
    budget: BUDGETS[1],
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Tell us who to reply to.";
    if (!/.+@.+\..+/.test(form.email)) next.email = "That email looks off.";
    if (form.message.trim().length < 10)
      next.message = "Give us a line or two about the project.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 1100);
  };

  const reset = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      service: SERVICES[0].title,
      budget: BUDGETS[1],
      message: "",
    });
    setErrors({});
    setStatus("idle");
  };

  const inputClass = (err?: string) =>
    `w-full border-b bg-transparent py-3 text-base text-ink placeholder:text-ink/35 transition-colors focus:outline-none ${
      err ? "border-coral" : "border-ink/25 focus:border-ink"
    }`;

  return (
    <section id="contact" className="relative overflow-hidden bg-ink-2 py-24 md:py-32">
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-coral/[0.08] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="06"
          kicker="Contact"
          title={
            <>
              Got a project?
              <br />
              Let's make it <span className="text-coral">real.</span>
              <Asterisk className="ml-3 inline h-8 w-8 text-coral md:h-12 md:w-12" />
            </>
          }
          note="We would love to hear about your business and your goals. Drop us a message and we will reply within a day."
        />

        <div className="grid gap-14 lg:grid-cols-12">
          {/* left — direct lines */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="space-y-1 border-t border-line">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="group flex items-center justify-between border-b border-line py-6"
                >
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.24em] text-mist">
                      Email
                    </span>
                    <span className="font-display text-xl font-medium text-paper transition-colors group-hover:text-coral md:text-2xl">
                      {CONTACT_EMAIL}
                    </span>
                  </span>
                  <ArrowUpRight />
                </a>
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                  className="group flex items-center justify-between border-b border-line py-6"
                >
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.24em] text-mist">
                      Call Us
                    </span>
                    <span className="font-display text-xl font-medium text-paper transition-colors group-hover:text-coral md:text-2xl">
                      {CONTACT_PHONE}
                    </span>
                  </span>
                  <ArrowUpRight />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-mist">
                <span className="animate-blink h-2 w-2 rounded-full bg-aqua" />
                Mon–Sat · 10:00–19:00 IST
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.26em] text-mist">
                  Follow the noise
                </p>
                <div className="flex gap-3">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.name}
                      className="grid h-12 w-12 place-items-center rounded-full border border-line text-paper/70 transition-all duration-300 hover:-translate-y-1.5 hover:border-coral hover:bg-coral hover:text-ink"
                    >
                      <SocialIcon name={s.icon} className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* right — the brief form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="relative bg-paper p-7 text-ink shadow-[12px_12px_0_0_rgba(255,77,46,0.9)] md:p-10">
                <AnimatePresence mode="wait">
                  {status === "sent" ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex min-h-[420px] flex-col items-center justify-center text-center"
                    >
                      <span className="grid h-20 w-20 place-items-center rounded-full bg-coral text-ink">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-9 w-9"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 12.5l5 5L20 6.5" />
                        </svg>
                      </span>
                      <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                        Brief received!
                      </h3>
                      <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/70">
                        Thanks, {form.name.split(" ")[0] || "friend"} — your
                        project brief is in our inbox. Expect a reply at{" "}
                        <span className="font-semibold">{form.email}</span>{" "}
                        within 24 hours.
                      </p>
                      <button
                        onClick={reset}
                        className="mt-8 rounded-full border border-ink px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 hover:bg-ink hover:text-paper"
                      >
                        Send another brief
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -14 }}
                      onSubmit={submit}
                      noValidate
                    >
                      <p className="mb-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.26em] text-ink/60">
                        <Asterisk className="h-3.5 w-3.5 text-coral" />
                        Project brief — 60 seconds
                      </p>

                      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="c-name"
                            className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60"
                          >
                            Your name *
                          </label>
                          <input
                            id="c-name"
                            value={form.name}
                            onChange={(e) => set("name")(e.target.value)}
                            placeholder="Migal Arunadann"
                            className={inputClass(errors.name)}
                          />
                          {errors.name && (
                            <p className="mt-1.5 font-mono text-[11px] text-coral">
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="c-email"
                            className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60"
                          >
                            Email *
                          </label>
                          <input
                            id="c-email"
                            type="email"
                            value={form.email}
                            onChange={(e) => set("email")(e.target.value)}
                            placeholder="migal@needil.com"
                            className={inputClass(errors.email)}
                          />
                          {errors.email && (
                            <p className="mt-1.5 font-mono text-[11px] text-coral">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="c-phone"
                            className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60"
                          >
                            Phone / WhatsApp
                          </label>
                          <input
                            id="c-phone"
                            value={form.phone}
                            onChange={(e) => set("phone")(e.target.value)}
                            placeholder="+91 ..."
                            className={inputClass()}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="c-service"
                            className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60"
                          >
                            What do you need?
                          </label>
                          <select
                            id="c-service"
                            value={form.service}
                            onChange={(e) => set("service")(e.target.value)}
                            className={`${inputClass()} appearance-none`}
                          >
                            {SERVICES.map((s) => (
                              <option key={s.id} value={s.title}>
                                {s.title}
                              </option>
                            ))}
                            <option>Something else entirely</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-8">
                        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">
                          Rough budget
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                          {BUDGETS.map((b) => (
                            <button
                              type="button"
                              key={b}
                              onClick={() => set("budget")(b)}
                              className={`rounded-full border px-4 py-2 font-mono text-xs transition-all duration-300 ${
                                form.budget === b
                                  ? "border-ink bg-ink text-paper"
                                  : "border-ink/30 text-ink/70 hover:border-ink"
                              }`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8">
                        <label
                          htmlFor="c-msg"
                          className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60"
                        >
                          About the project *
                        </label>
                        <textarea
                          id="c-msg"
                          rows={4}
                          value={form.message}
                          onChange={(e) => set("message")(e.target.value)}
                          placeholder="We sell X to Y, and we want our digital presence to finally match the quality of the product…"
                          className={`${inputClass(errors.message)} resize-none`}
                        />
                        {errors.message && (
                          <p className="mt-1.5 font-mono text-[11px] text-coral">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      <div className="mt-9 flex flex-wrap items-center justify-between gap-5">
                        <InteractiveHoverButton
                          type="submit"
                          busy={status === "sending"}
                          busyLabel="Sending…"
                          className="border-ink px-8 py-4"
                          dotClass="bg-ink"
                          textClass="text-ink"
                          hoverTextClass="text-paper"
                        >
                          Send the brief
                        </InteractiveHoverButton>
                        <p className="font-mono text-[11px] text-ink/50">
                          No spam, no retainers-push. Just a plan.
                        </p>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-5 w-5 text-paper/40 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-coral ${className ?? ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M3 13L13 3M6 3h7v7" />
    </svg>
  );
}
