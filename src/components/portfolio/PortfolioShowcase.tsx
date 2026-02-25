"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import InteractiveCard from "@/components/InteractiveCard";
import { PORTFOLIO_PROJECTS } from "@/content/portfolio";
import PortfolioConveyor from "./PortfolioConveyor";
import PortfolioHero from "./PortfolioHero";
import PortfolioProjectSection from "./PortfolioProjectSection";

export default function PortfolioShowcase() {
  const projects = PORTFOLIO_PROJECTS;
  const [selectedId, setSelectedId] = useState(projects[0]?.id ?? "");
  const [hoverPreviewId, setHoverPreviewId] = useState<string | null>(null);
  const [conveyorInteracting, setConveyorInteracting] = useState(false);
  const [progressById, setProgressById] = useState<Record<string, number>>(() =>
    Object.fromEntries(projects.map((project) => [project.id, 0]))
  );

  const activeId = hoverPreviewId ?? selectedId;
  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeId) ?? projects[0],
    [activeId, projects]
  );

  useEffect(() => {
    const sectionEls = projects
      .map((project) => document.getElementById(`project-${project.id}`))
      .filter(Boolean) as HTMLElement[];

    if (!sectionEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const sectionId = visible?.target.id;
        if (!sectionId) return;
        const nextProjectId = sectionId.replace(/^project-/, "");
        setSelectedId((prev) => (prev === nextProjectId ? prev : nextProjectId));
      },
      {
        rootMargin: "-18% 0px -48% 0px",
        threshold: [0.12, 0.24, 0.4, 0.65],
      }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projects]);

  useEffect(() => {
    if (!projects.length) return;

    let frame = 0;

    const updateProgress = () => {
      const viewportHeight = window.innerHeight;
      const topOffset = 132;
      const bottomOffset = Math.min(220, Math.max(120, viewportHeight * 0.22));

      setProgressById((prev) => {
        let changed = false;
        const next: Record<string, number> = { ...prev };

        for (const project of projects) {
          const el = document.getElementById(`project-${project.id}`);
          if (!el) continue;

          const rect = el.getBoundingClientRect();
          const total = rect.height + viewportHeight - topOffset - bottomOffset;
          const raw = (viewportHeight - bottomOffset - rect.top) / Math.max(total, 1);
          const progress = Math.max(0, Math.min(1, raw));

          if (Math.abs((prev[project.id] ?? 0) - progress) > 0.01) {
            next[project.id] = progress;
            changed = true;
          }
        }

        return changed ? next : prev;
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateProgress();
      });
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [projects]);

  const jumpToProject = (id: string) => {
    setSelectedId(id);
    setHoverPreviewId(null);
    document.getElementById(`project-${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!activeProject) return null;

  return (
    <main className="page-section pb-8 sm:pb-12">
      <PortfolioHero
        project={activeProject}
        projectIndex={projects.findIndex((project) => project.id === activeProject.id)}
        totalProjects={projects.length}
        paused={conveyorInteracting}
        onJumpToProject={jumpToProject}
      />

      <PortfolioConveyor
        projects={projects}
        activeId={activeId}
        onHoverProject={setHoverPreviewId}
        onSelectProject={jumpToProject}
        onInteractionChange={setConveyorInteracting}
      />

      <section className="mt-8 sm:mt-10">
        {projects.map((project, index) => (
          <PortfolioProjectSection
            key={project.id}
            project={project}
            index={index}
            isActive={selectedId === project.id}
            progress={progressById[project.id] ?? 0}
          />
        ))}
      </section>

      <AnimatedSection className="mx-auto mt-4 w-full max-w-6xl px-5 pb-8 sm:px-6 sm:pb-12">
        <InteractiveCard className="rounded-[2rem] border p-6 sm:p-8">
          <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-[rgba(255,255,255,0.02)] p-5 sm:p-6">
            <div className="pointer-events-none absolute inset-0 opacity-85">
              <div className="absolute inset-0 bg-[radial-gradient(55%_85%_at_14%_18%,rgba(var(--accent)/0.16),transparent_70%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(35%_55%_at_88%_72%,rgba(255,255,255,0.06),transparent_70%)]" />
            </div>
            <div className="relative flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="hero-kicker text-xs">Build With Us</p>
                <h2 className="display-heading mt-2 text-3xl font-semibold sm:text-4xl">
                  Want this level of detail in your product?
                </h2>
                <p className="mt-3 text-sm text-[rgb(var(--muted))] sm:text-base">
                  We can start from a fresh build, adapt one of these starter systems, or upgrade what you already
                  have. The goal is the same: ship something people trust using.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="rounded-2xl bg-[rgb(var(--fg))] px-5 py-3 text-sm font-semibold !text-black [color:#000]"
                >
                  Book a Call
                </Link>
                <Link
                  href="/services"
                  className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium transition hover:bg-white/10"
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </InteractiveCard>
      </AnimatedSection>
    </main>
  );
}
