import Link from "next/link";

const fitChecklist = [
  "You have a clear business objective for this build.",
  "You want weekly progress demos and transparent scope decisions.",
  "You value clean handoff documentation and long-term maintainability.",
  "You are ready to make decisions quickly to keep momentum high.",
];

export default function ContactUsPage() {
  return (
    <main className="page-section">
      <section className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        <p className="hero-kicker text-xs">Contact Us</p>
        <h1 className="display-heading mt-3 text-4xl font-semibold sm:text-6xl">
          Tell us what you are building<span className="text-[rgb(var(--accent))]">.</span>
        </h1>
        <p className="mt-5 max-w-3xl text-[rgb(var(--muted))]">
          We typically respond within one business day. Share context, constraints, and timeline so we can
          propose the cleanest path to launch.
        </p>
      </section>

      <section className="mx-auto mt-12 w-full max-w-6xl px-5 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <form className="rounded-3xl border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-6 sm:p-8">
            <h2 className="display-heading text-2xl font-semibold">Project inquiry</h2>
            <p className="mt-2 text-sm text-[rgb(var(--muted))]">This form is a draft UI for now and does not submit yet.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm">
                Full name
                <input className="rounded-xl border border-[rgba(var(--border)/0.9)] bg-white/95 px-3 py-2 text-[rgb(var(--bg))] placeholder:text-slate-500" placeholder="Your name" />
              </label>
              <label className="grid gap-2 text-sm">
                Email
                <input type="email" className="rounded-xl border border-[rgba(var(--border)/0.9)] bg-white/95 px-3 py-2 text-[rgb(var(--bg))] placeholder:text-slate-500" placeholder="you@company.com" />
              </label>
              <label className="grid gap-2 text-sm">
                Company
                <input className="rounded-xl border border-[rgba(var(--border)/0.9)] bg-white/95 px-3 py-2 text-[rgb(var(--bg))] placeholder:text-slate-500" placeholder="Company name" />
              </label>
              <label className="grid gap-2 text-sm">
                Target timeline
                <select className="rounded-xl border border-[rgba(var(--border)/0.9)] bg-white/95 px-3 py-2 text-[rgb(var(--bg))]">
                  <option>2-4 weeks</option>
                  <option>1-2 months</option>
                  <option>2-4 months</option>
                  <option>Exploring timeline</option>
                </select>
              </label>
            </div>

            <label className="mt-4 grid gap-2 text-sm">
              Budget range
              <select className="rounded-xl border border-[rgba(var(--border)/0.9)] bg-white/95 px-3 py-2 text-[rgb(var(--bg))]">
                <option>$5k-$15k</option>
                <option>$15k-$35k</option>
                <option>$35k-$75k</option>
                <option>$75k+</option>
              </select>
            </label>

            <label className="mt-4 grid gap-2 text-sm">
              Project brief
              <textarea
                className="min-h-32 rounded-xl border border-[rgba(var(--border)/0.9)] bg-white/95 px-3 py-2 text-[rgb(var(--bg))] placeholder:text-slate-500"
                placeholder="What are you building, and what outcome matters most?"
              />
            </label>

            <button type="button" className="mt-6 rounded-2xl bg-[rgb(var(--fg))] px-5 py-3 text-sm font-medium text-[rgb(var(--bg))]">
              Submit Inquiry (UI only)
            </button>
          </form>

          <div className="grid gap-6">
            <aside className="rounded-3xl border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-6">
              <h2 className="display-heading text-2xl font-semibold">Direct contact</h2>
              <p className="mt-2 text-sm text-[rgb(var(--muted))]">
                Prefer direct email? Reach us at
                <span className="ml-1 font-semibold text-[rgb(var(--fg))]">hello@surgestudios.co</span>
              </p>
              <p className="mt-3 text-sm text-[rgb(var(--muted))]">Business hours: Monday-Friday, 9am-6pm ET.</p>
            </aside>

            <aside className="rounded-3xl border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-6">
              <h2 className="display-heading text-2xl font-semibold">Best fit checklist</h2>
              <ul className="mt-3 grid gap-2 text-sm text-[rgb(var(--muted))]">
                {fitChecklist.map((item) => (
                  <li key={item} className="rounded-xl border border-[rgba(var(--border)/0.9)] px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-6xl px-5 pb-16 sm:px-6">
        <div className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-8 sm:p-10">
          <h2 className="display-heading text-3xl font-semibold sm:text-4xl">What happens next?</h2>
          <p className="mt-3 max-w-3xl text-[rgb(var(--muted))]">
            We review fit, send a short follow-up, and if aligned, move into a focused scope call with clear
            milestones and delivery options.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/services" className="rounded-2xl border border-[rgba(var(--border)/0.9)] px-5 py-3 text-sm font-medium">
              Review Services
            </Link>
            <Link href="/portfolio" className="rounded-2xl border border-[rgba(var(--border)/0.9)] px-5 py-3 text-sm font-medium">
              See Portfolio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
