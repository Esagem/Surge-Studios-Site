import Link from "next/link";

const values = [
  {
    title: "Clarity over noise",
    text: "We make scope, decisions, and tradeoffs explicit so teams can move without ambiguity.",
  },
  {
    title: "Speed with discipline",
    text: "Shipping fast matters only when quality, maintainability, and user trust are preserved.",
  },
  {
    title: "Ownership by default",
    text: "Every build is designed for clean handoff so clients own both the product and momentum.",
  },
];

const principles = [
  "Scope every build around measurable outcomes, not feature volume.",
  "Show progress weekly so stakeholders never guess where delivery stands.",
  "Document decisions as they happen to reduce rework and handoff friction.",
  "Treat launch as the midpoint, not the finish line.",
];

export default function MissionPage() {
  return (
    <main className="page-section">
      <section className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        <p className="hero-kicker text-xs">Mission</p>
        <h1 className="display-heading mt-3 text-4xl font-semibold sm:text-6xl">
          Build products that earn trust from day one<span className="text-[rgb(var(--accent))]">.</span>
        </h1>
        <p className="mt-5 max-w-3xl text-[rgb(var(--muted))]">
          Surge Studios started from one frustration: good ideas were dying in vague scope, slow execution, and
          messy delivery. Our mission is to replace that chaos with a calm, disciplined path to launch.
        </p>
      </section>

      <section className="mx-auto mt-12 w-full max-w-6xl px-5 sm:px-6">
        <div className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-8 sm:p-10">
          <h2 className="display-heading text-3xl font-semibold sm:text-4xl">Our story</h2>
          <p className="mt-4 max-w-4xl text-[rgb(var(--muted))]">
            We built Surge for founders and operators who care about execution quality as much as speed. Instead
            of bloated timelines and unclear expectations, we run focused milestones, weekly demos, and transparent
            delivery. The goal is simple: launch confidently, learn quickly, and keep building from a strong base.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-6xl px-5 sm:px-6">
        <h2 className="display-heading text-3xl font-semibold sm:text-4xl">Core values</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className="rounded-3xl border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-6">
              <h3 className="text-lg font-semibold">{value.title}</h3>
              <p className="mt-3 text-sm text-[rgb(var(--muted))]">{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-6xl px-5 sm:px-6">
        <div className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-8 sm:p-10">
          <h2 className="display-heading text-3xl font-semibold sm:text-4xl">Operating principles</h2>
          <ul className="mt-5 grid gap-3 text-sm text-[rgb(var(--muted))] md:grid-cols-2">
            {principles.map((principle) => (
              <li key={principle} className="rounded-xl border border-[rgba(var(--border)/0.9)] px-4 py-3">
                {principle}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-6xl px-5 pb-16 sm:px-6">
        <div className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-8 sm:p-10">
          <h2 className="display-heading text-3xl font-semibold sm:text-4xl">The promise</h2>
          <p className="mt-3 max-w-2xl text-[rgb(var(--muted))]">
            You will always know what we are building, why we are building it, and what happens next.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact-us" className="rounded-2xl bg-[rgb(var(--fg))] px-5 py-3 text-sm font-medium !text-black [color:#000]">
              Start a Conversation
            </Link>
            <Link href="/services" className="rounded-2xl border border-[rgba(var(--border)/0.9)] px-5 py-3 text-sm font-medium">
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
