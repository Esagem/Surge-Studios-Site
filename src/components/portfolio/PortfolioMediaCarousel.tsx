"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import InteractiveCard from "@/components/InteractiveCard";
import { MOTION_EASE } from "@/lib/motion";
import type { PortfolioProject } from "@/content/portfolio";
import PortfolioMockFrame from "./PortfolioMockFrame";

type Props = {
  project: PortfolioProject;
};

export default function PortfolioMediaCarousel({ project }: Props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const items = project.media;
  const activeItem = items[index];

  const goTo = (nextIndex: number) => {
    const normalized = (nextIndex + items.length) % items.length;
    setDirection(normalized > index ? 1 : normalized < index ? -1 : direction);
    setIndex(normalized);
  };

  const step = (delta: number) => {
    const next = (index + delta + items.length) % items.length;
    setDirection(delta >= 0 ? 1 : -1);
    setIndex(next);
  };

  return (
    <InteractiveCard className="rounded-[1.75rem] border p-4 sm:p-5">
      <div
        className="group relative"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          }
        }}
        aria-label={`${project.name} media carousel`}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[1.2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1px ${project.palette.ring}, 0 0 48px ${project.palette.glow}` }}
        />

        <div className="relative overflow-hidden rounded-[1.2rem] border border-white/10 bg-[rgba(8,10,14,0.55)] p-2 sm:p-3">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={activeItem.id}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction > 0 ? 18 : -18, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction > 0 ? -12 : 12, scale: 0.992 }}
              transition={{ duration: reduceMotion ? 0.16 : 0.42, ease: MOTION_EASE }}
            >
              <PortfolioMockFrame item={activeItem} palette={project.palette} />
            </motion.div>
          </AnimatePresence>

          {items.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                className="absolute left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-[rgba(10,12,16,0.8)] text-sm text-white/90 transition hover:scale-105 hover:bg-white/10 sm:grid"
                aria-label={`Previous ${project.name} mockup`}
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="absolute right-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-[rgba(10,12,16,0.8)] text-sm text-white/90 transition hover:scale-105 hover:bg-white/10 sm:grid"
                aria-label={`Next ${project.name} mockup`}
              >
                →
              </button>
            </>
          ) : null}
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-white">{activeItem.title}</p>
            <p className="text-xs text-[rgb(var(--muted))]">
              {activeItem.caption ?? "Placeholder visual for structure, flow, and presentation direction."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {items.map((item, chipIndex) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(chipIndex)}
                className="h-2.5 rounded-full transition-all"
                style={{
                  width: chipIndex === index ? 28 : 10,
                  background:
                    chipIndex === index ? `linear-gradient(to right, ${project.palette.accentSoft}, ${project.palette.accent})` : "rgba(255,255,255,0.14)",
                  boxShadow: chipIndex === index ? `0 0 14px ${project.palette.glow}` : "none",
                }}
                aria-label={`Go to ${project.name} media item ${chipIndex + 1}`}
                aria-current={chipIndex === index ? "true" : undefined}
              />
            ))}
          </div>
        </div>

        {items.length > 1 ? (
          <div className="mt-4 flex snap-x gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map((item, thumbIndex) => {
              const selected = thumbIndex === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(thumbIndex)}
                  className="group/thumb relative min-w-[9.5rem] snap-start rounded-2xl border p-1.5 text-left transition sm:min-w-[10.75rem]"
                  style={{
                    borderColor: selected ? project.palette.ring : "rgba(255,255,255,0.08)",
                    background: selected ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.018)",
                    boxShadow: selected ? `0 0 0 1px ${project.palette.ring}, 0 0 24px ${project.palette.glow}` : "none",
                  }}
                  aria-label={`Preview ${item.title}`}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover/thumb:opacity-100" style={{ boxShadow: `inset 0 0 0 1px ${project.palette.ring}` }} />
                  <div className="h-[5.4rem]">
                    <PortfolioMockFrame item={item} palette={project.palette} compact className="h-full p-2" />
                  </div>
                  <p className="mt-2 truncate px-1 text-[11px] uppercase tracking-[0.14em] text-white/60">{item.title}</p>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </InteractiveCard>
  );
}
