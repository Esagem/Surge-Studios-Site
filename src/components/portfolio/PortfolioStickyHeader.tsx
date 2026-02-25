"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PortfolioProject } from "@/content/portfolio";
import { MOTION_EASE } from "@/lib/motion";

type Props = {
  project: PortfolioProject;
  index: number;
  isActive: boolean;
  progress: number;
};

export default function PortfolioStickyHeader({ project, index, isActive, progress }: Props) {
  const reduceMotion = useReducedMotion();
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const progressPercent = Math.max(8, Math.round(clampedProgress * 100));
  const progressLabel = clampedProgress >= 0.995 ? "Completed" : isActive ? "Active section" : clampedProgress > 0 ? "In progress" : "Queued";

  return (
    <div
      className="rounded-[1.6rem] border bg-[rgba(10,12,16,0.6)] p-4 backdrop-blur-sm sm:p-5 lg:sticky lg:top-24 lg:h-fit lg:self-start"
      style={{
        borderColor: project.palette.ring,
        boxShadow: isActive ? `0 0 0 1px ${project.palette.ring}, 0 0 30px ${project.palette.glow}` : "none",
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
          style={{ borderColor: project.palette.ring, color: project.palette.accent }}
        >
          {project.category}
        </span>
        <span className="text-xs text-white/45">0{index + 1}</span>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2">
          <h2 className="display-heading text-2xl font-semibold sm:text-3xl">{project.name}</h2>
          {isActive ? (
            <motion.span
              className="inline-grid h-5 w-5 place-items-center rounded-md border text-[10px] leading-none"
              style={{ borderColor: project.palette.ring, color: project.palette.accent, background: project.palette.panel }}
              animate={reduceMotion ? undefined : { rotate: [0, 8, -6, 0], scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: MOTION_EASE }}
              aria-hidden="true"
            >
              *
            </motion.span>
          ) : null}
        </div>
        <p className="mt-3 text-sm text-[rgb(var(--muted))]">{project.summary}</p>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.16em]">
          <span className="text-white/55">{progressLabel}</span>
          {project.internal ? <span className="text-white/45">Internal</span> : null}
        </div>
        <div className="h-1.5 rounded-full bg-white/8">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(to right, ${project.palette.accentSoft}, ${project.palette.accent})`,
              boxShadow: `0 0 14px ${project.palette.glow}`,
            }}
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.45, ease: MOTION_EASE }}
          />
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-3">
        <p className="text-[11px] uppercase tracking-[0.16em] text-white/55">Why it matters</p>
        <p className="mt-2 text-sm text-white/80">{project.heroAngle}</p>
      </div>
    </div>
  );
}
