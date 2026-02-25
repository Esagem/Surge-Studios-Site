"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { PortfolioProject } from "@/content/portfolio";
import { MOTION_EASE, fadeUpIn } from "@/lib/motion";
import PortfolioMockFrame from "./PortfolioMockFrame";

type Props = {
  project: PortfolioProject;
  projectIndex: number;
  totalProjects: number;
  paused: boolean;
  onJumpToProject: (id: string) => void;
};

type ParallaxState = {
  x: number;
  y: number;
};

export default function PortfolioHero({
  project,
  projectIndex,
  totalProjects,
  paused,
  onJumpToProject,
}: Props) {
  const reduceMotion = useReducedMotion();
  const [parallax, setParallax] = useState<ParallaxState>({ x: 0, y: 0 });

  return (
    <section className="mx-auto w-full max-w-6xl px-5 pt-8 sm:px-6 sm:pt-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgba(10,10,12,0.75)] p-5 sm:p-7 lg:p-8">
        <div className="pointer-events-none absolute inset-0 opacity-[0.9]">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(60% 75% at 14% 12%, ${project.palette.glow}, transparent 72%),
                radial-gradient(40% 55% at 86% 22%, ${project.palette.glow}, transparent 75%)`,
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_28%,transparent_70%,rgba(255,255,255,0.02))]" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <motion.p className="hero-kicker text-xs" variants={fadeUpIn(0)} initial="hidden" animate="visible">
              Portfolio
            </motion.p>
            <motion.h1
              className="display-heading mt-3 text-4xl font-semibold sm:text-5xl lg:text-6xl"
              variants={fadeUpIn(0.05, 18)}
              initial="hidden"
              animate="visible"
            >
              Built to ship.
              <br />
              Built to feel finished
              <span style={{ color: project.palette.accent }}>.</span>
            </motion.h1>
            <motion.p
              className="mt-5 max-w-xl text-sm text-[rgb(var(--muted))] sm:text-base"
              variants={fadeUpIn(0.1, 18)}
              initial="hidden"
              animate="visible"
            >
              A TakeOff-first look at how Surge builds products and starter systems: polished interaction work,
              strong implementation choices, and reusable patterns that hold up after launch.
            </motion.p>

            <motion.div
              className="mt-6 flex flex-wrap items-center gap-3"
              variants={fadeUpIn(0.14, 16)}
              initial="hidden"
              animate="visible"
            >
              <button
                type="button"
                onClick={() => onJumpToProject(project.id)}
                className="rounded-2xl px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, ${project.palette.accent}, #ffffff)`,
                  boxShadow: `0 14px 32px ${project.palette.glow}`,
                }}
              >
                Jump to {project.name}
              </button>
              <Link
                href="/contact"
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium transition hover:bg-white/10"
              >
                Book a Call
              </Link>
            </motion.div>

            <motion.div
              className="mt-6 grid gap-3 sm:grid-cols-[auto_1fr]"
              variants={fadeUpIn(0.18, 12)}
              initial="hidden"
              animate="visible"
            >
              <div className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">Featured Now</p>
                <p className="mt-1 text-sm font-medium text-white">{project.name}</p>
                <p className="text-xs text-white/60">
                  {String(projectIndex + 1).padStart(2, "0")} / {String(totalProjects).padStart(2, "0")}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">Current Focus</p>
                <p className="mt-1 text-sm text-white/85">{project.heroAngle}</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="relative"
            onPointerMove={(event) => {
              if (reduceMotion) return;
              const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
              const px = (event.clientX - rect.left) / rect.width - 0.5;
              const py = (event.clientY - rect.top) / rect.height - 0.5;
              setParallax({ x: px * 12, y: py * 10 });
            }}
            onPointerLeave={() => setParallax({ x: 0, y: 0 })}
          >
            <div className="absolute inset-0 -z-10 rounded-[2rem] blur-3xl" style={{ background: `radial-gradient(55% 70% at 50% 40%, ${project.palette.glow}, transparent 80%)` }} />

            <div className="relative mx-auto max-w-[34rem] rounded-[1.8rem] border border-white/10 bg-[rgba(8,10,14,0.62)] p-3 sm:p-4">
              <motion.div
                className="pointer-events-none absolute inset-2 rounded-[1.35rem] border border-white/10"
                style={{
                  background:
                    "radial-gradient(120% 120% at 15% 10%, rgba(255,255,255,0.06), transparent 55%), linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                }}
                animate={
                  reduceMotion || paused
                    ? { rotate: 0 }
                    : {
                        rotate: 360,
                      }
                }
                transition={
                  reduceMotion || paused
                    ? undefined
                    : { repeat: Infinity, ease: "linear", duration: 26 }
                }
              />

              <motion.div
                className="pointer-events-none absolute inset-3 rounded-[1.2rem] border opacity-70"
                style={{ borderColor: project.palette.ring }}
                animate={reduceMotion ? undefined : { rotate: [0, -2, 0, 2, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: paused ? 0.001 : 9,
                  ease: MOTION_EASE,
                }}
              />

              <motion.div
                className="relative z-10"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        x: parallax.x,
                        y: parallax.y,
                        rotateX: parallax.y * -0.25,
                        rotateY: parallax.x * 0.22,
                      }
                }
                transition={{ duration: 0.22, ease: MOTION_EASE }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <PortfolioMockFrame
                  item={project.media[0]}
                  palette={project.palette}
                  className="min-h-[17rem] sm:min-h-[21rem]"
                />
              </motion.div>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span
                  className="rounded-full border px-3 py-1"
                  style={{ borderColor: project.palette.ring, background: project.palette.panel, color: project.palette.accent }}
                >
                  {project.category}
                </span>
                {project.internal ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/75">
                    Internal project
                  </span>
                ) : null}
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/75">
                  Stylized placeholders
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
