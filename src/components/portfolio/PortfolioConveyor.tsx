"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { PortfolioProject } from "@/content/portfolio";
import { MOTION_EASE } from "@/lib/motion";

type Props = {
  projects: PortfolioProject[];
  activeId: string;
  onHoverProject: (id: string | null) => void;
  onSelectProject: (id: string) => void;
  onInteractionChange: (interacting: boolean) => void;
};

function LogoTile({
  project,
  active,
  duplicate = false,
  onHoverProject,
  onSelectProject,
}: {
  project: PortfolioProject;
  active: boolean;
  duplicate?: boolean;
  onHoverProject: (id: string | null) => void;
  onSelectProject: (id: string) => void;
}) {
  const label = project.logoMode === "monogram"
    ? project.name
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : project.shortLabel;

  return (
    <motion.button
      type="button"
      onMouseEnter={() => onHoverProject(project.id)}
      onMouseLeave={() => onHoverProject(null)}
      onFocus={() => onHoverProject(project.id)}
      onBlur={() => onHoverProject(null)}
      onClick={() => onSelectProject(project.id)}
      className="group relative min-w-max rounded-2xl border px-4 py-3 text-left"
      style={{
        borderColor: active ? project.palette.ring : "rgba(255,255,255,0.08)",
        background: active ? project.palette.panel : "rgba(255,255,255,0.02)",
        boxShadow: active ? `0 0 0 1px ${project.palette.ring}, 0 0 28px ${project.palette.glow}` : "none",
      }}
      animate={active ? { scale: 1.06, y: -2 } : { scale: 1, y: 0 }}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.24, ease: MOTION_EASE }}
      aria-label={`Jump to ${project.name} section`}
      aria-current={active ? "true" : undefined}
      tabIndex={duplicate ? -1 : 0}
      aria-hidden={duplicate ? "true" : undefined}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 1px ${project.palette.ring}, 0 0 20px ${project.palette.glow}`,
        }}
      />
      <div className="relative flex items-center gap-3">
        <div
          className="grid h-9 min-w-9 place-items-center rounded-xl border text-xs font-semibold uppercase tracking-[0.14em]"
          style={{
            borderColor: project.palette.ring,
            background: `linear-gradient(150deg, ${project.palette.panel}, rgba(255,255,255,0.02))`,
            color: project.palette.accent,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05), 0 0 18px ${project.palette.glow}`,
          }}
        >
          {project.logoMode === "monogram" ? label : label.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">{project.shortLabel}</p>
          <p className="truncate text-[11px] uppercase tracking-[0.14em] text-white/55">{project.category}</p>
        </div>
        {active ? (
          <motion.span
            className="ml-1 h-2.5 w-2.5 rounded-full"
            style={{ background: project.palette.accent, boxShadow: `0 0 12px ${project.palette.glow}` }}
            animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.18, 1] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          />
        ) : null}
      </div>
    </motion.button>
  );
}

export default function PortfolioConveyor({
  projects,
  activeId,
  onHoverProject,
  onSelectProject,
  onInteractionChange,
}: Props) {
  const reduceMotion = useReducedMotion();
  const [interacting, setInteracting] = useState(false);
  const desktopLoop = useMemo(() => [...projects, ...projects], [projects]);

  useEffect(() => {
    onInteractionChange(interacting);
  }, [interacting, onInteractionChange]);

  const pause = reduceMotion || interacting;

  return (
    <section className="mx-auto mt-5 w-full max-w-6xl px-5 sm:px-6">
      <div className="rounded-[1.4rem] border border-[rgba(var(--border)/0.9)] bg-[rgba(12,12,16,0.65)] p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between gap-3 px-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
            Project Conveyor
          </p>
          <p className="text-xs text-white/45">Hover to preview. Click to jump.</p>
        </div>

        <div
          className="hidden overflow-hidden rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.02)] p-2 lg:block"
          onMouseEnter={() => setInteracting(true)}
          onMouseLeave={() => {
            setInteracting(false);
            onHoverProject(null);
          }}
          onFocusCapture={() => setInteracting(true)}
          onBlurCapture={(event) => {
            const next = event.relatedTarget;
            if (!next || !(next instanceof Node) || !event.currentTarget.contains(next)) {
              setInteracting(false);
              onHoverProject(null);
            }
          }}
        >
          <div
            className="portfolio-conveyor-track flex w-max items-center gap-3"
            style={{ animationPlayState: pause ? "paused" : "running" }}
          >
            {desktopLoop.map((project, i) => (
              <LogoTile
                key={`${project.id}-${i}`}
                project={project}
                active={activeId === project.id}
                duplicate={i >= projects.length}
                onHoverProject={onHoverProject}
                onSelectProject={onSelectProject}
              />
            ))}
          </div>
        </div>

        <div className="lg:hidden">
          <div className="flex snap-x gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {projects.map((project) => (
              <div key={project.id} className="snap-start">
                <LogoTile
                  project={project}
                  active={activeId === project.id}
                  onHoverProject={onHoverProject}
                  onSelectProject={onSelectProject}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .portfolio-conveyor-track {
          animation: conveyor-marquee 24s linear infinite;
          will-change: transform;
        }

        @keyframes conveyor-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
