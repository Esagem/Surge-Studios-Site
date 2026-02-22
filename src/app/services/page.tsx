import Link from "next/link";

const pillars = [
  {
    title: "MVP Delivery",
    text: "From idea to usable product with lean scope, product-grade polish, and clear launch criteria.",
  },
  {
    title: "SaaS Product Builds",
    text: "Core feature delivery, billing foundations, and scalable UX patterns for long-term growth.",
  },
  {
    title: "Product Redesign",
    text: "Restructure user journeys, sharpen interface systems, and improve conversion-critical flows.",
  },
  {
    title: "Launch Hardening",
    text: "Performance, QA, analytics, and deployment readiness so launches are stable and measurable.",
  },
];

const model = [
  "Scope alignment workshop before implementation",
  "Weekly milestone demos with transparent progress",
  "Shared backlog and decision log across the engagement",
  "Final handoff package with docs and operational notes",
];

const faqs = [
  {
    q: "How fast can we start?",
    a: "Most engagements begin within 1-2 weeks after scope alignment and timeline approval.",
  },
  {
    q: "How do you price projects?",
    a: "We scope by milestone and deliverables, then price by phase so tradeoffs stay explicit.",
  },
  {
    q: "How often do we communicate?",
    a: "You get weekly demos, async updates in shared channels, and direct access for blockers.",
  },
  {
    q: "Do you support after launch?",
    a: "Yes. We offer stabilization and enhancement cycles based on your product priorities.",
  },
];

export default function ServicesPage() {
  return (
    <main className="page-section">
      <section className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        <p className="hero-kicker text-xs">Services</p>
        <h1 className="display-heading mt-3 text-4xl font-semibold sm:text-6xl">
          Product services designed to ship with confidence<span className="text-[rgb(var(--accent))]">.</span>
        </h1>
        <p className="mt-5 max-w-3xl text-[rgb(var(--muted))]">
          We partner with founders and teams who need disciplined execution, visible progress, and a clean path
          from concept to launch.
        </p>
      </section>

      <section className="mx-auto mt-12 w-full max-w-6xl px-5 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="rounded-3xl border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-7">
              <h2 className="display-heading text-2xl font-semibold">{pillar.title}</h2>
              <p className="mt-3 text-sm text-[rgb(var(--muted))]">{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-6xl px-5 sm:px-6">
        <div className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-8 sm:p-10">
          <h2 className="display-heading text-3xl font-semibold sm:text-4xl">Engagement model</h2>
          <ul className="mt-5 grid gap-3 text-sm text-[rgb(var(--muted))] sm:grid-cols-2">
            {model.map((item) => (
              <li key={item} className="rounded-xl border border-[rgba(var(--border)/0.9)] px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-6xl px-5 sm:px-6">
        <div className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-8 sm:p-10">
          <h2 className="display-heading text-3xl font-semibold sm:text-4xl">FAQ</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.q} className="rounded-2xl border border-[rgba(var(--border)/0.9)] p-5">
                <h3 className="text-base font-semibold">{faq.q}</h3>
                <p className="mt-2 text-sm text-[rgb(var(--muted))]">{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-6xl px-5 pb-16 sm:px-6">
        <div className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-8 sm:p-10">
          <h2 className="display-heading text-3xl font-semibold sm:text-4xl">Ready to scope your build?</h2>
          <p className="mt-3 max-w-2xl text-[rgb(var(--muted))]">
            Tell us what you are building and where you are blocked. We will propose a practical path to launch.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact-us" className="rounded-2xl bg-[rgb(var(--fg))] px-5 py-3 text-sm font-medium !text-black [color:#000]">
              Contact Us
            </Link>
            <Link href="/portfolio" className="rounded-2xl border border-[rgba(var(--border)/0.9)] px-5 py-3 text-sm font-medium">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
