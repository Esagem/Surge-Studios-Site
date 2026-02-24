import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

const principles = [
  {
    title: "Clarity",
    text: "We make scope, tradeoffs, and next steps explicit so you always know what is happening.",
  },
  {
    title: "Craft",
    text: "We care about the last 10% because that is what makes software feel finished.",
  },
  {
    title: "Speed",
    text: "We move quickly when it counts, without skipping the polish that protects trust.",
  },
  {
    title: "Flexibility",
    text: "We can build new systems, work inside existing code, or improve what is already there.",
  },
  {
    title: "Communication",
    text: "You work directly with us, with frequent updates and fast responses when decisions matter.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <main className="page-section">
        <section className="mx-auto w-full max-w-6xl px-5 sm:px-6">
          <p className="hero-kicker text-xs">Our Story</p>
          <h1 className="display-heading mt-3 text-4xl font-semibold sm:text-6xl">
            Why Surge exists<span className="text-[rgb(var(--accent))]">.</span>
          </h1>
          <p className="mt-5 max-w-3xl text-[rgb(var(--muted))]">
            Surge was built for founders and teams who want strong execution without disappearing into an agency
            process. We keep the work direct, down to earth, and focused on shipping something you are proud to
            share.
          </p>
        </section>

        <section className="mx-auto mt-12 w-full max-w-6xl px-5 sm:px-6">
          <div className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-8 sm:p-10">
            <h2 className="display-heading text-3xl font-semibold sm:text-4xl">How we work</h2>
            <p className="mt-4 max-w-4xl text-[rgb(var(--muted))]">
              We combine clarity, craft, speed, flexibility, and communication in one process. That means
              tighter scope, cleaner builds, and fewer surprises during launch.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {principles.map((principle) => (
                <article
                  key={principle.title}
                  className="rounded-2xl border border-[rgba(var(--border)/0.9)] p-5"
                >
                  <h3 className="text-base font-semibold">{principle.title}</h3>
                  <p className="mt-2 text-sm text-[rgb(var(--muted))]">{principle.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 w-full max-w-6xl px-5 sm:px-6">
          <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
            <div className="rounded-3xl border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-7">
              <h2 className="display-heading text-3xl font-semibold sm:text-4xl">Who you work with</h2>
              <p className="mt-3 text-[rgb(var(--muted))]">
                A small team you can actually reach. You will have direct contact, straightforward updates, and
                people who know your project context without handoffs between layers.
              </p>
            </div>
            <div className="rounded-3xl border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-7">
              <h2 className="display-heading text-2xl font-semibold">What that feels like</h2>
              <ul className="mt-4 grid gap-3 text-sm text-[rgb(var(--muted))]">
                <li className="rounded-xl border border-[rgba(var(--border)/0.9)] px-4 py-3">Clear decisions</li>
                <li className="rounded-xl border border-[rgba(var(--border)/0.9)] px-4 py-3">Frequent updates</li>
                <li className="rounded-xl border border-[rgba(var(--border)/0.9)] px-4 py-3">Flexible execution</li>
                <li className="rounded-xl border border-[rgba(var(--border)/0.9)] px-4 py-3">Quality-first polish</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 w-full max-w-6xl px-5 pb-16 sm:px-6">
          <div className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-8 sm:p-10">
            <h2 className="display-heading text-3xl font-semibold sm:text-4xl">
              If you want a team that actually picks up, let&apos;s talk.
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact#book-a-call"
                className="rounded-2xl bg-[rgb(var(--fg))] px-5 py-3 text-sm font-medium !text-black [color:#000]"
              >
                Book a Call
              </Link>
              <Link
                href="/services"
                className="rounded-2xl border border-[rgba(var(--border)/0.9)] px-5 py-3 text-sm font-medium"
              >
                View Services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
