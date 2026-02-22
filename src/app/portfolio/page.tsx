import Link from "next/link";

const projects = [
  {
    name: "Surge Launchpad",
    problem: "Early founders needed a launch-ready MVP without months of setup overhead.",
    outcome: "Shipped production MVP in 6 weeks with analytics, billing, and onboarding.",
    tags: ["MVP", "SaaS", "Launch"],
  },
  {
    name: "Studio Portfolio OS",
    problem: "Creative teams lacked a system for turning finished work into pipeline content.",
    outcome: "Built a reusable case-study engine that improved lead quality and close rate.",
    tags: ["Web", "Brand", "CMS"],
  },
  {
    name: "Ops Dashboard",
    problem: "Internal operations were tracked across disconnected spreadsheets.",
    outcome: "Unified reporting dashboard with role views and weekly executive summary exports.",
    tags: ["Internal Tools", "Data", "Automation"],
  },
  {
    name: "Subscription Platform",
    problem: "Manual renewals and poor retention visibility were slowing revenue growth.",
    outcome: "Implemented subscription lifecycle flows with churn alerts and recovery campaigns.",
    tags: ["Billing", "Lifecycle", "Retention"],
  },
  {
    name: "Client Portal",
    problem: "Service clients had no self-serve visibility into project and delivery status.",
    outcome: "Delivered secure portal with milestones, deliverables, and communication feed.",
    tags: ["Portal", "B2B", "Delivery"],
  },
  {
    name: "Booking Experience",
    problem: "Drop-off in booking flow reduced conversion on paid traffic.",
    outcome: "Redesigned flow and cut checkout friction, increasing completed bookings by 29%.",
    tags: ["Conversion", "UX", "Performance"],
  },
];

const process = [
  {
    title: "Discovery",
    text: "Align goals, constraints, and delivery scope before a single feature is built.",
  },
  {
    title: "Build",
    text: "Ship in weekly milestones with demo-ready progress and clear tradeoff logs.",
  },
  {
    title: "Launch",
    text: "Harden, instrument, and handoff with docs so your team owns outcomes long-term.",
  },
];

export default function PortfolioPage() {
  return (
    <main className="page-section">
      <section className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        <p className="hero-kicker text-xs">Selected Work</p>
        <h1 className="display-heading mt-3 text-4xl font-semibold sm:text-6xl">
          Portfolio built for outcomes, not vanity<span className="text-[rgb(var(--accent))]">.</span>
        </h1>
        <p className="mt-5 max-w-3xl text-[rgb(var(--muted))]">
          These are representative builds showing how we scope, execute, and launch under real constraints.
          Each engagement balances product polish with business traction.
        </p>
      </section>

      <section className="mx-auto mt-12 w-full max-w-6xl px-5 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article key={project.name} className="rounded-3xl border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-6">
              <h2 className="display-heading text-2xl font-semibold">{project.name}</h2>
              <p className="mt-3 text-sm text-[rgb(var(--muted))]">
                <span className="font-semibold text-[rgb(var(--fg))]">Problem:</span> {project.problem}
              </p>
              <p className="mt-2 text-sm text-[rgb(var(--muted))]">
                <span className="font-semibold text-[rgb(var(--fg))]">Outcome:</span> {project.outcome}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[rgba(var(--border)/0.9)] px-2.5 py-1 text-xs text-[rgb(var(--muted))]">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-6xl px-5 sm:px-6">
        <div className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-8 sm:p-10">
          <h2 className="display-heading text-3xl font-semibold sm:text-4xl">How we run builds</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {process.map((step) => (
              <div key={step.title} className="rounded-2xl border border-[rgba(var(--border)/0.9)] p-5">
                <p className="text-base font-semibold">{step.title}</p>
                <p className="mt-2 text-sm text-[rgb(var(--muted))]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-6xl px-5 pb-16 sm:px-6">
        <div className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-8 sm:p-10">
          <h2 className="display-heading text-3xl font-semibold sm:text-4xl">
            Need this level of execution for your product?
          </h2>
          <p className="mt-3 max-w-2xl text-[rgb(var(--muted))]">
            Share your roadmap and constraints. We will map a scoped path to launch and show what can ship first.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact-us" className="rounded-2xl bg-[rgb(var(--fg))] px-5 py-3 text-sm font-medium !text-black [color:#000]">
              Contact Us
            </Link>
            <Link href="/services" className="rounded-2xl border border-[rgba(var(--border)/0.9)] px-5 py-3 text-sm font-medium">
              View Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
