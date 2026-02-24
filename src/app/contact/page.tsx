import SiteFooter from "@/components/SiteFooter";

export default function ContactPage() {
  return (
    <>
      <main className="page-section">
        <section className="mx-auto w-full max-w-6xl px-5 sm:px-6">
          <p className="hero-kicker text-xs">Contact</p>
          <h1 className="display-heading mt-3 text-4xl font-semibold sm:text-6xl">
            Reach out. We&apos;ll keep it simple<span className="text-[rgb(var(--accent))]">.</span>
          </h1>
          <p className="mt-5 max-w-3xl text-[rgb(var(--muted))]">
            Book a call if you want to talk it through live. If you prefer, send a short form with your
            timeline and goals and we will follow up quickly.
          </p>
        </section>

        <section id="book-a-call" className="mx-auto mt-12 w-full max-w-6xl px-5 sm:px-6">
          <div className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="hero-kicker text-xs">Calendly (Primary)</p>
                <h2 className="display-heading mt-2 text-3xl font-semibold sm:text-4xl">
                  Pick a time that works
                </h2>
                <p className="mt-3 max-w-2xl text-[rgb(var(--muted))]">
                  We keep scheduling simple and follow up quickly. Drop your Calendly embed or booking link here
                  when you are ready.
                </p>
                <div className="mt-5 flex min-h-64 items-center justify-center rounded-2xl border border-dashed border-[rgba(var(--border)/0.9)] bg-[rgba(255,255,255,0.02)] p-6 text-center text-sm text-[rgb(var(--muted))]">
                  Calendly embed placeholder
                </div>
              </div>

              <aside className="rounded-2xl border border-[rgba(var(--border)/0.9)] p-5">
                <h3 className="text-base font-semibold">What to include</h3>
                <ul className="mt-3 grid gap-2 text-sm text-[rgb(var(--muted))]">
                  <li className="rounded-xl border border-[rgba(var(--border)/0.9)] px-3 py-2">
                    What you&apos;re building
                  </li>
                  <li className="rounded-xl border border-[rgba(var(--border)/0.9)] px-3 py-2">Timeline</li>
                  <li className="rounded-xl border border-[rgba(var(--border)/0.9)] px-3 py-2">
                    Budget range (optional)
                  </li>
                  <li className="rounded-xl border border-[rgba(var(--border)/0.9)] px-3 py-2">
                    Links or wireframes (if any)
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section id="quote" className="mx-auto mt-14 w-full max-w-6xl px-5 sm:px-6">
          <div className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="hero-kicker text-xs">Short Form (Secondary)</p>
                <h2 className="display-heading mt-2 text-3xl font-semibold sm:text-4xl">Send a quick brief</h2>
              </div>
              <p className="text-xs text-[rgb(var(--muted))]">UI only for now</p>
            </div>

            <form className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  Name
                  <input
                    className="rounded-xl border border-[rgba(var(--border)/0.9)] bg-white/95 px-3 py-2 text-[rgb(var(--bg))] placeholder:text-slate-500"
                    placeholder="Your name"
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  Email
                  <input
                    type="email"
                    className="rounded-xl border border-[rgba(var(--border)/0.9)] bg-white/95 px-3 py-2 text-[rgb(var(--bg))] placeholder:text-slate-500"
                    placeholder="you@company.com"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm">
                What are you building?
                <textarea
                  className="min-h-28 rounded-xl border border-[rgba(var(--border)/0.9)] bg-white/95 px-3 py-2 text-[rgb(var(--bg))] placeholder:text-slate-500"
                  placeholder="Website, app, SaaS, refactor, or cleanup work"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  Timeline
                  <select className="rounded-xl border border-[rgba(var(--border)/0.9)] bg-white/95 px-3 py-2 text-[rgb(var(--bg))]">
                    <option>ASAP (2-4 weeks)</option>
                    <option>1-2 months</option>
                    <option>2-4 months</option>
                    <option>Exploring timeline</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm">
                  Budget range (optional)
                  <select className="rounded-xl border border-[rgba(var(--border)/0.9)] bg-white/95 px-3 py-2 text-[rgb(var(--bg))]">
                    <option>Under $10k</option>
                    <option>$10k-$25k</option>
                    <option>$25k-$50k</option>
                    <option>$50k+</option>
                    <option>Not sure yet</option>
                  </select>
                </label>
              </div>

              <label className="grid gap-2 text-sm">
                Links / wireframes (if any)
                <input
                  className="rounded-xl border border-[rgba(var(--border)/0.9)] bg-white/95 px-3 py-2 text-[rgb(var(--bg))] placeholder:text-slate-500"
                  placeholder="Figma, Loom, site link, docs"
                />
              </label>

              <button
                type="button"
                className="mt-2 w-full rounded-2xl bg-[rgb(var(--fg))] px-5 py-3 text-sm font-medium text-[rgb(var(--bg))] sm:w-auto"
              >
                Request a quote (UI only)
              </button>
            </form>
          </div>
        </section>

        <section className="mx-auto mt-14 w-full max-w-6xl px-5 pb-16 sm:px-6">
          <div className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-8 sm:p-10">
            <h2 className="display-heading text-3xl font-semibold sm:text-4xl">What happens next</h2>
            <p className="mt-3 max-w-3xl text-[rgb(var(--muted))]">
              Honest response expectation: we review fit, reply quickly, and tell you whether we are a good
              match. If it is a fit, we move into a short scope conversation with clear milestones.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
