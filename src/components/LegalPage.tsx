import type { ReactNode } from "react";
import Link from "next/link";
import InteractiveCard from "@/components/InteractiveCard";
import SiteFooter from "@/components/SiteFooter";

type LegalSection = {
  title: string;
  content: ReactNode;
};

type LegalShellProps = {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  effectiveDate: string;
  sections: readonly LegalSection[];
};

export function LegalShell({
  eyebrow,
  title,
  intro,
  effectiveDate,
  sections,
}: LegalShellProps) {
  return (
    <>
      <main className="page-section">
        <section className="mx-auto w-full max-w-4xl px-5 sm:px-6">
          <p className="hero-kicker text-xs">{eyebrow}</p>
          <h1 className="display-heading mt-3 text-4xl font-semibold sm:text-6xl">
            {title}
            <span className="text-[rgb(var(--accent))]">.</span>
          </h1>
          <p className="mt-5 text-sm uppercase tracking-[0.18em] text-[rgb(var(--muted))]">
            Effective {effectiveDate}
          </p>
          <InteractiveCard className="mt-6 rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-6 text-[rgb(var(--muted))] sm:p-8">
            {intro}
          </InteractiveCard>
        </section>

        <section className="mx-auto mt-10 w-full max-w-4xl px-5 pb-16 sm:px-6">
          <div className="grid gap-6">
            {sections.map((section) => (
              <InteractiveCard
                key={section.title}
                className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-6 sm:p-8"
              >
                <h2 className="display-heading text-2xl font-semibold sm:text-3xl">{section.title}</h2>
                <div className="mt-4 space-y-4 text-[rgb(var(--muted))]">{section.content}</div>
              </InteractiveCard>
            ))}

            <InteractiveCard className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-6 text-sm text-[rgb(var(--muted))] sm:p-8">
              <p>
                Questions about these legal terms can be sent through our{" "}
                <Link
                  className="text-[rgb(var(--fg))] underline decoration-[rgba(var(--accent)/0.6)] underline-offset-4"
                  href="/contact"
                >
                  contact page
                </Link>
                .
              </p>
            </InteractiveCard>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
