import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

const studioBuilds = [
  {
    name: "SaaS Starter",
    summary: "Auth + Billing + Dashboard foundation for teams that need a strong base fast.",
    tags: ["Auth", "Billing", "Dashboard"],
  },
  {
    name: "Website Launch Kit",
    summary: "CMS + SEO + Performance setup for a site that looks sharp and ships cleanly.",
    tags: ["CMS", "SEO", "Performance"],
  },
  {
    name: "Legacy Refresh",
    summary: "UI + speed upgrade for products that need polish without a full rebuild.",
    tags: ["UI", "Speed", "Upgrade"],
  },
];

export default function PortfolioPage() {
  return (
    <>
      <main className="page-section">
        <section className="mx-auto w-full max-w-6xl px-5 sm:px-6">
          <p className="hero-kicker text-xs">Portfolio</p>
          <h1 className="display-heading mt-3 text-4xl font-semibold sm:text-6xl">
            See what we ship<span className="text-[rgb(var(--accent))]">.</span>
          </h1>
          <p className="mt-5 max-w-3xl text-[rgb(var(--muted))]">
            Real projects and studio builds that show quality and execution. We keep the line clear between
            client work and internal builds so you know what you are looking at.
          </p>
        </section>

        <section className="mx-auto mt-12 w-full max-w-6xl px-5 sm:px-6">
          <article className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-7 sm:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[rgba(var(--accent)/0.4)] bg-[rgba(var(--accent)/0.12)] px-3 py-1 text-xs font-medium">
                Featured case study
              </span>
              <span className="rounded-full border border-[rgba(var(--border)/0.9)] px-3 py-1 text-xs text-[rgb(var(--muted))]">
                Client Work
              </span>
            </div>
            <h2 className="display-heading mt-4 text-3xl font-semibold sm:text-4xl">TakeOff</h2>
            <p className="mt-3 max-w-3xl text-sm text-[rgb(var(--muted))] sm:text-base">
              Product and web execution focused on a clean launch experience, polished interactions, and a
              stable handoff. The deeper case study details live in Services for now.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/services#takeoff"
                className="rounded-2xl bg-[rgb(var(--fg))] px-5 py-3 text-sm font-medium !text-black [color:#000]"
              >
                View TakeOff details
              </Link>
              <Link
                href="/contact#book-a-call"
                className="rounded-2xl border border-[rgba(var(--border)/0.9)] px-5 py-3 text-sm font-medium"
              >
                Book a Call
              </Link>
            </div>
          </article>
        </section>

        <section className="mx-auto mt-14 w-full max-w-6xl px-5 sm:px-6">
          <p className="hero-kicker text-xs">Studio Builds</p>
          <h2 className="display-heading mt-2 text-3xl font-semibold sm:text-4xl">
            Internal builds, clearly labeled
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {studioBuilds.map((build) => (
              <article
                key={build.name}
                className="rounded-3xl border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-6"
              >
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[rgb(var(--muted))]">
                  Studio Build
                </p>
                <h3 className="display-heading mt-3 text-2xl font-semibold">{build.name}</h3>
                <p className="mt-3 text-sm text-[rgb(var(--muted))]">{build.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {build.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[rgba(var(--border)/0.9)] px-2.5 py-1 text-xs text-[rgb(var(--muted))]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-14 w-full max-w-6xl px-5 pb-16 sm:px-6">
          <div className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-8 sm:p-10">
            <h2 className="display-heading text-3xl font-semibold sm:text-4xl">
              Want something like this?
            </h2>
            <p className="mt-3 max-w-2xl text-[rgb(var(--muted))]">
              Tell us what you are building and where quality matters most. We will recommend a practical path
              to ship.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact#book-a-call"
                className="rounded-2xl bg-[rgb(var(--fg))] px-5 py-3 text-sm font-medium !text-black [color:#000]"
              >
                Book a Call
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
