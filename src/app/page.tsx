"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import HeroBackdrop from "@/components/HeroBackdrop";
import InteractiveCard from "@/components/InteractiveCard";
import {
  fadeUpIn,
  MOTION_EASE,
  sectionRevealVariant,
  staggerContainerVariant,
} from "@/lib/motion";

function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">{children}</div>;
}

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <InteractiveCard
      className={`rounded-3xl border border-[rgb(var(--border))] p-6 shadow-sm ${className}`}
    >
      {children}
    </InteractiveCard>
  );
}

function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  const base =
    "inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition duration-300 focus-visible:outline-none sm:w-auto";
  const styles =
    variant === "primary"
      ? "bg-[rgb(var(--fg))] !text-black [color:#000] hover:translate-y-[-1px] hover:shadow-[0_8px_20px_rgba(180,220,255,0.2)] active:translate-y-[0px]"
      : "border border-[rgb(var(--border))] text-[rgb(var(--fg))] hover:bg-[rgba(var(--fg)/0.08)]";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
      <span
        aria-hidden
        className={
          variant === "primary" ? "text-black/55" : "text-[rgba(var(--bg)/0.55)]"
        }
      >
        &gt;
      </span>
    </Link>
  );
}

function SectionHeading({
  eyebrow,
  title,
  desc,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="hero-kicker text-xs font-medium text-[rgb(var(--muted))]">{eyebrow}</p>
      ) : null}
      <h2 className="display-heading mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        {title}
        <span className="text-[rgb(var(--accent))]">.</span>
      </h2>
      {desc ? (
        <p className="mt-4 text-base leading-relaxed text-[rgb(var(--muted))]">{desc}</p>
      ) : null}
    </div>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroExitY = useTransform(
    heroScrollProgress,
    isMobile ? [0.22, 0.78] : [0, 0.42],
    [0, -220]
  );
  const heroExitOpacity = useTransform(
    heroScrollProgress,
    isMobile ? [0.32, 0.82] : [0, 0.3],
    [1, 0]
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <section ref={heroRef} className="relative flex min-h-[100svh] items-center py-24 sm:min-h-[92vh] sm:py-10">
        <HeroBackdrop />
        <Container>
          <motion.div
            className="rounded-[2rem] border border-white/10 bg-black/45 p-5 backdrop-blur-xl sm:rounded-[2.25rem] sm:p-12"
            initial={
              reduceMotion
                ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, y: "-110vh", scale: 0.985, filter: "blur(10px)" }
            }
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 2, ease: MOTION_EASE, delay: 0.5 }
            }
            style={
              reduceMotion
                ? undefined
                : {
                    y: heroExitY,
                    opacity: heroExitOpacity,
                  }
            }
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainerVariant(0.08, reduceMotion ? 0 : 0.2)}
              className="grid gap-8 sm:gap-10 md:grid-cols-2 md:items-center"
            >
              <div>
                <motion.p
                  variants={fadeUpIn(0.02, 16)}
                  className="hero-kicker text-xs font-medium text-[rgb(var(--muted))]"
                >
                  Surge Studios | Apps | SaaS | MVPs
                </motion.p>

                <motion.h1
                  variants={fadeUpIn(0.08, 22)}
                  className="display-heading mt-4 text-3xl font-semibold tracking-tight sm:text-6xl"
                >
                  We build small products that ship fast and feel premium
                  <span className="text-[rgb(var(--accent))]">.</span>
                </motion.h1>

                <motion.p
                  variants={fadeUpIn(0.16, 20)}
                  className="mt-5 max-w-xl text-base text-[rgb(var(--muted))]"
                >
                  Calm, disciplined product execution. Clear scope, weekly demos, and clean
                  handoff.
                </motion.p>

                <motion.div
                  variants={fadeUpIn(0.24, 16)}
                  className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
                >
                  <Button href="/contact-us">Contact Us</Button>
                  <Button href="/portfolio" variant="ghost">
                    View Portfolio
                  </Button>
                </motion.div>

                <motion.div
                  variants={fadeUpIn(0.3, 18)}
                  className="mt-10 grid gap-4 sm:grid-cols-3"
                >
                  <div>
                    <p className="text-sm font-semibold">Weekly demos</p>
                    <p className="text-sm text-[rgb(var(--muted))]">Always visible progress.</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Disciplined scope</p>
                    <p className="text-sm text-[rgb(var(--muted))]">Milestones and deliverables.</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Clean handoff</p>
                    <p className="text-sm text-[rgb(var(--muted))]">Docs and repo ownership.</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                variants={fadeUpIn(0.18, 20)}
                className="relative"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -5, 0],
                      }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                      }
                }
              >
                <Card className="bg-[rgba(12,19,30,0.82)]">
                  <p className="text-xs font-medium text-[rgb(var(--muted))]">Featured build</p>
                  <p className="display-heading mt-2 text-lg font-semibold">
                    Portfolio and Case Study System
                  </p>
                  <p className="mt-2 text-sm text-[rgb(var(--muted))]">
                    A reusable framework for showcasing projects with outcomes, process, and
                    credibility.
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="h-20 rounded-2xl bg-[rgba(var(--fg)/0.06)]" />
                    <div className="h-20 rounded-2xl bg-[rgba(var(--fg)/0.06)]" />
                    <div className="h-20 rounded-2xl bg-[rgba(var(--fg)/0.06)]" />
                  </div>

                  <p className="mt-4 text-xs text-[rgb(var(--muted))]">
                    Replace these blocks with real screenshots later.
                  </p>
                </Card>

                <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[rgba(var(--accent)/0.16)] blur-2xl" />
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <AnimatedSection className="py-12 sm:py-20" delay={0.04}>
        <Container>
          <motion.div variants={staggerContainerVariant(0.1, 0.06)}>
            <motion.div variants={sectionRevealVariant(0)}>
              <SectionHeading
                eyebrow="Why teams choose Surge"
                title="Clarity, built in"
                desc="Founders get burned by vague scope and invisible progress. We prevent that with simple safeguards."
              />
            </motion.div>

            <motion.div className="mt-10 grid gap-6 md:grid-cols-3" variants={staggerContainerVariant(0.1)}>
              {[
                {
                  title: "No ghosting",
                  desc: "Weekly demos and a shared backlog. You always know what is done and what is next.",
                },
                {
                  title: "No vague scope",
                  desc: "Milestones with deliverables. Decisions documented. No surprises late in the build.",
                },
                {
                  title: "No messy handoff",
                  desc: "Clean repo, docs, and deployment notes. You own the product.",
                },
              ].map((item) => (
                <motion.div key={item.title} variants={sectionRevealVariant()}>
                  <Card>
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-[rgb(var(--muted))]">{item.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="py-12 sm:py-20" delay={0.06}>
        <Container>
          <motion.div variants={staggerContainerVariant(0.1, 0.08)}>
            <motion.div
              className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
              variants={sectionRevealVariant()}
            >
              <SectionHeading
                eyebrow="Selected work"
                title="Proof you can scan"
                desc="Curated projects that show craft, scope discipline, and launch readiness."
              />
              <div className="flex gap-3">
                <Button href="/portfolio" variant="ghost">
                  All Projects
                </Button>
                <Button href="/contact-us">Start a build</Button>
              </div>
            </motion.div>

            <motion.div className="mt-10 grid gap-6 md:grid-cols-3" variants={staggerContainerVariant(0.1)}>
              {[
                {
                  t: "Surge Launchpad",
                  d: "A fast MVP pipeline for shipping polished products.",
                  tags: ["SaaS", "MVP"],
                },
                {
                  t: "Studio Portfolio",
                  d: "A portfolio framework built for credibility and conversion.",
                  tags: ["Web", "Brand"],
                },
                {
                  t: "Internal Product",
                  d: "A proving ground product focused on shipping discipline.",
                  tags: ["Prototype", "Launch"],
                },
              ].map((x) => (
                <motion.div key={x.t} variants={sectionRevealVariant()}>
                  <Link href="/portfolio" className="group block h-full">
                    <Card className="h-full">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="display-heading text-lg font-semibold tracking-tight">{x.t}</h3>
                        <span className="text-[rgb(var(--accent))] opacity-70 transition group-hover:opacity-100">
                          &gt;
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">{x.d}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {x.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-[rgba(var(--border)/0.9)] px-2.5 py-1 text-xs text-[rgb(var(--muted))]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="py-12 sm:py-20" delay={0.08}>
        <Container>
          <motion.div variants={sectionRevealVariant()} className="rounded-[2.25rem] border border-[rgba(var(--border)/0.9)] p-6 sm:p-14">
            <InteractiveCard className="rounded-[2rem] border border-white/10 bg-[rgba(12,18,28,0.82)] p-6 sm:p-10">
              <h2 className="display-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Tell us what you are building<span className="text-[rgb(var(--accent))]">.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-base text-[rgb(var(--muted))]">
                We will help you define a clean scope and get to a confident launch. If it is a fit,
                we will propose a simple plan.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact-us">Contact Us</Button>
                <Button href="/portfolio" variant="ghost">
                  View Portfolio
                </Button>
              </div>
            </InteractiveCard>
          </motion.div>
        </Container>
      </AnimatedSection>
    </>
  );
}
