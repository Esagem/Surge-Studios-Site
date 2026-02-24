import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

const serviceLanes = [
  {
    title: "Build something new",
    text: "MVPs, websites, apps, and SaaS products built with clear scope and quality-first execution.",
  },
  {
    title: "Improve what you already have",
    text: "Work inside your existing codebase for upgrades, refactors, and practical improvements.",
  },
  {
    title: "Fix + polish + ship",
    text: "Stability, performance, UX cleanup, and release-readiness for software that needs finishing passes.",
  },
];

const deliverables = [
  "Clear milestones and scope",
  "Design files (if applicable)",
  "Clean repo + documentation",
  "Deployment notes / handoff",
];

const faqs = [
  {
    q: "Timelines",
    a: "Timelines depend on scope, but we define milestones early so progress stays visible and predictable.",
  },
  {
    q: "Communication cadence",
    a: "Expect direct communication, frequent updates, and regular touchpoints throughout the build.",
  },
  {
    q: "Ownership / IP",
    a: "You own your product and code. We build for clean handoff, not lock-in.",
  },
  {
    q: "Tech stack flexibility",
    a: "We are flexible. We can work with your stack when it makes sense or recommend a simple path for speed.",
  },
  {
    q: "What happens after launch",
    a: "We can hand off cleanly, stay on for iteration, or support a short stabilization phase depending on needs.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <main className="page-section">
        <section className="mx-auto w-full max-w-6xl px-5 sm:px-6">
          <p className="hero-kicker text-xs">Services</p>
          <h1 className="display-heading mt-3 text-4xl font-semibold sm:text-6xl">
            Small team. High standards. Real communication<span className="text-[rgb(var(--accent))]">.</span>
          </h1>
          <p className="mt-5 max-w-3xl text-[rgb(var(--muted))]">
            We help teams launch new products, improve existing systems, and finish the quality work that often
            gets skipped.
          </p>
        </section>

        <section className="mx-auto mt-12 w-full max-w-6xl px-5 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {serviceLanes.map((lane) => (
              <article
                key={lane.title}
                className="rounded-3xl border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-7"
              >
                <h2 className="display-heading text-2xl font-semibold">{lane.title}</h2>
                <p className="mt-3 text-sm text-[rgb(var(--muted))]">{lane.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="takeoff" className="mx-auto mt-14 w-full max-w-6xl px-5 sm:px-6">
          <div className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-8 sm:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[rgba(var(--accent)/0.4)] bg-[rgba(var(--accent)/0.12)] px-3 py-1 text-xs font-medium">
                TakeOff
              </span>
              <span className="rounded-full border border-[rgba(var(--border)/0.9)] px-3 py-1 text-xs text-[rgb(var(--muted))]">
                Client Work
              </span>
            </div>
            <h2 className="display-heading mt-4 text-3xl font-semibold sm:text-4xl">
              Featured build snapshot
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[rgba(var(--border)/0.9)] p-5">
                <h3 className="text-base font-semibold">Overview</h3>
                <p className="mt-2 text-sm text-[rgb(var(--muted))]">
                  A quality-first product build with a tight timeline, focused scope, and an emphasis on a clean
                  launch experience.
                </p>
              </div>
              <div className="rounded-2xl border border-[rgba(var(--border)/0.9)] p-5">
                <h3 className="text-base font-semibold">The problem</h3>
                <p className="mt-2 text-sm text-[rgb(var(--muted))]">
                  The product needed a launch-ready experience with stable behavior and polished UX under real
                  delivery constraints.
                </p>
              </div>
              <div className="rounded-2xl border border-[rgba(var(--border)/0.9)] p-5">
                <h3 className="text-base font-semibold">The solution</h3>
                <p className="mt-2 text-sm text-[rgb(var(--muted))]">
                  We kept scope tight, treated polish as a real phase, and prioritized reliability and handoff
                  readiness.
                </p>
              </div>
              <div className="rounded-2xl border border-[rgba(var(--border)/0.9)] p-5">
                <h3 className="text-base font-semibold">Outcome</h3>
                <p className="mt-2 text-sm text-[rgb(var(--muted))]">
                  A cleaner launch, better confidence in the shipped experience, and a stronger base for
                  iteration after handoff.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 w-full max-w-6xl px-5 sm:px-6">
          <div className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-8 sm:p-10">
            <h2 className="display-heading text-3xl font-semibold sm:text-4xl">Deliverables</h2>
            <ul className="mt-5 grid gap-3 text-sm text-[rgb(var(--muted))] sm:grid-cols-2">
              {deliverables.map((item) => (
                <li key={item} className="rounded-xl border border-[rgba(var(--border)/0.9)] px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto mt-14 w-full max-w-6xl px-5 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-7">
              <h2 className="display-heading text-2xl font-semibold">Pricing approach</h2>
              <p className="mt-3 text-sm text-[rgb(var(--muted))]">
                Fixed-scope for tight MVPs when the scope is well defined and the constraints are clear.
              </p>
              <p className="mt-2 text-sm text-[rgb(var(--muted))]">
                Monthly engagement for ongoing iteration when priorities shift and you need steady velocity.
              </p>
            </div>
            <div className="rounded-3xl border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-7">
              <h2 className="display-heading text-2xl font-semibold">How we keep quality high</h2>
              <p className="mt-3 text-sm text-[rgb(var(--muted))]">
                Clear milestones, direct communication, and a dedicated polish phase keep the work fast without
                feeling unfinished.
              </p>
            </div>
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
              Bring the idea, the existing code, or the list of problems. We will help map the cleanest path to
              a solid launch.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact#book-a-call"
                className="rounded-2xl bg-[rgb(var(--fg))] px-5 py-3 text-sm font-medium !text-black [color:#000]"
              >
                Book a Call
              </Link>
              <Link
                href="/contact#quote"
                className="rounded-2xl border border-[rgba(var(--border)/0.9)] px-5 py-3 text-sm font-medium"
              >
                Request a quote
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
