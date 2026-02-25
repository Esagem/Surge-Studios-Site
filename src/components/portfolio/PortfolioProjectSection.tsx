import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import InteractiveCard from "@/components/InteractiveCard";
import type { PortfolioProject } from "@/content/portfolio";
import PortfolioMediaCarousel from "./PortfolioMediaCarousel";
import PortfolioStickyHeader from "./PortfolioStickyHeader";

type Props = {
  project: PortfolioProject;
  index: number;
  isActive: boolean;
  progress: number;
};

function ListBlock({
  title,
  items,
  accent,
}: {
  title: string;
  items: string[];
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/4 p-4 sm:p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: accent }}>
        {title}
      </p>
      <ul className="mt-3 grid gap-2.5 text-sm text-white/82">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-white/45" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PortfolioProjectSection({ project, index, isActive, progress }: Props) {
  return (
    <AnimatedSection className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-6 sm:py-12" delay={index * 0.04}>
      <section id={`project-${project.id}`} className="relative scroll-mt-28">
        <div
          className="pointer-events-none absolute inset-x-0 top-10 -z-10 h-56 rounded-[2rem] blur-3xl"
          style={{
            background: `radial-gradient(60% 100% at 20% 35%, ${project.palette.glow}, transparent 72%),
              radial-gradient(45% 85% at 88% 70%, ${project.palette.glow}, transparent 70%)`,
            opacity: isActive ? 0.95 : 0.55,
          }}
        />

        <div className="grid gap-6 lg:grid-cols-[19.5rem_minmax(0,1fr)] lg:items-start lg:gap-7">
          <PortfolioStickyHeader project={project} index={index} isActive={isActive} progress={progress} />

          <div className="grid gap-6">
            <PortfolioMediaCarousel project={project} />

            <InteractiveCard className="rounded-[1.75rem] border p-5 sm:p-6">
              <div className="grid gap-6">
                <div className="rounded-2xl border border-white/10 bg-white/4 p-4 sm:p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: project.palette.accent }}>
                    Overview
                  </p>
                  <p className="mt-3 text-sm text-white/80 sm:text-[15px]">{project.summary}</p>
                </div>

                <div className="grid gap-4 xl:grid-cols-2">
                  <ListBlock title="Work Done" items={project.workDone} accent={project.palette.accent} />
                  <ListBlock title="Standout Decisions" items={project.standoutDecisions} accent={project.palette.accent} />
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/4 p-4 sm:p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: project.palette.accent }}>
                    Outcome Highlights
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {project.outcomeHighlights.map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border p-3 text-sm text-white/84"
                        style={{
                          borderColor: project.palette.ring,
                          background: `linear-gradient(160deg, ${project.palette.panel}, rgba(255,255,255,0.02))`,
                          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.03), 0 0 20px ${project.palette.glow}`,
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.025)] p-4">
                  <div>
                    <p className="text-sm font-medium text-white">Want something in this lane?</p>
                    <p className="text-xs text-[rgb(var(--muted))]">
                      We can adapt this approach to your product, timeline, and constraints.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="rounded-xl border px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5"
                    style={{
                      borderColor: project.palette.ring,
                      background: project.palette.panel,
                      boxShadow: `0 0 18px ${project.palette.glow}`,
                    }}
                  >
                    Book a Call
                  </Link>
                </div>
              </div>
            </InteractiveCard>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
