"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import HeroBackdrop from "@/components/HeroBackdrop";
import InteractiveCard from "@/components/InteractiveCard";
import SiteFooter from "@/components/SiteFooter";
import {
  fadeUpIn,
  MOTION_EASE,
  sectionRevealVariant,
  staggerContainerVariant,
} from "@/lib/motion";

const trustStrip = [
  "Call or text us directly",
  "Frequent progress updates",
  "Clear milestones + clean handoff",
];

const featuredStudioBuilds = [
  {
    title: "SaaS Starter",
    desc: "Auth + Billing + Dashboard foundation for teams who need a strong base quickly.",
  },
  {
    title: "Website Launch Kit",
    desc: "CMS + SEO + Performance setup for a site that is ready to rank and convert.",
  },
  {
    title: "Legacy Refresh",
    desc: "UI + speed upgrade for products that need polish without a full rewrite.",
  },
];

const serviceLanes = [
  {
    title: "Build something new",
    desc: "Websites, apps, and SaaS products built with clear scope and quality-first execution.",
  },
  {
    title: "Improve what you already have",
    desc: "Adapt and refactor existing code so your product gets better without starting over.",
  },
  {
    title: "Fix + polish + ship",
    desc: "Performance, bugs, reliability, and UX cleanup to get a product launch-ready.",
  },
];

const processSteps = [
  "Discovery",
  "Design",
  "Build",
  "Polish",
  "Launch",
];

const expectations = [
  "Direct communication",
  "Weekly touchpoints",
  "Transparent progress",
  "Clean handoff",
];

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
        className={variant === "primary" ? "text-black/55" : "text-[rgba(var(--bg)/0.55)]"}
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
  const [heroEntranceComplete, setHeroEntranceComplete] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroExitY = useTransform(
    heroScrollProgress,
    isMobile ? [0.58, 1] : [0, 0.42],
    [0, -220]
  );
  const heroExitOpacity = useTransform(
    heroScrollProgress,
    isMobile ? [0.78, 1] : [0, 0.3],
    [1, 0]
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const timers: number[] = [];

    if (reduceMotion) {
      const completeTimer = window.setTimeout(() => setHeroEntranceComplete(true), 0);
      timers.push(completeTimer);
      return () => {
        timers.forEach((t) => window.clearTimeout(t));
      };
    }

    if (!isMobile) {
      const completeTimer = window.setTimeout(() => setHeroEntranceComplete(true), 0);
      timers.push(completeTimer);
      return () => {
        timers.forEach((t) => window.clearTimeout(t));
      };
    }

    timers.push(window.setTimeout(() => setHeroEntranceComplete(false), 0));
    timers.push(window.setTimeout(() => setHeroEntranceComplete(true), 1200));
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [isMobile, reduceMotion]);

  return (
    <>
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] items-center py-24 sm:min-h-[92vh] sm:py-10"
      >
        <HeroBackdrop />
        <Container>
          <motion.div
            className="rounded-[2rem] border border-white/10 bg-black/45 p-5 backdrop-blur-xl sm:rounded-[2.25rem] sm:p-12"
            initial={
              reduceMotion
                ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                : isMobile
                  ? { opacity: 0, y: -420, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, y: "-110vh", scale: 0.985, filter: "blur(10px)" }
            }
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : isMobile
                  ? { duration: 0.9, ease: MOTION_EASE, delay: 0.06 }
                  : { duration: 2, ease: MOTION_EASE, delay: 0.5 }
            }
            style={
              reduceMotion
                ? undefined
                : isMobile && !heroEntranceComplete
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
                  Surge Studios | Quality-first web + app builds
                </motion.p>

                <motion.h1
                  variants={fadeUpIn(0.08, 22)}
                  className="display-heading mt-4 text-3xl font-semibold tracking-tight sm:text-6xl"
                >
                  High-quality websites and apps, built with you
                  <span className="text-[rgb(var(--accent))]">.</span>
                </motion.h1>

                <motion.p
                  variants={fadeUpIn(0.16, 20)}
                  className="mt-5 max-w-xl text-base text-[rgb(var(--muted))]"
                >
                  We&apos;re a small team you can actually reach. You&apos;ll have our numbers, we&apos;ll
                  know your name, and you&apos;ll get frequent updates while we build something you&apos;re
                  proud to share.
                </motion.p>

                <motion.div
                  variants={fadeUpIn(0.24, 16)}
                  className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
                >
                  <Button href="/contact#book-a-call">Book a Call</Button>
                  <Button href="/portfolio" variant="ghost">
                    See what we ship
                  </Button>
                </motion.div>

                <motion.div
                  variants={fadeUpIn(0.3, 18)}
                  className="mt-10 grid gap-4 sm:grid-cols-3"
                >
                  {trustStrip.map((item) => (
                    <div key={item}>
                      <p className="text-sm font-semibold">{item}</p>
                    </div>
                  ))}
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
                  <p className="text-xs font-medium text-[rgb(var(--muted))]">How we work with clients</p>
                  <p className="display-heading mt-2 text-lg font-semibold">Quality first. Fast when it counts.</p>
                  <p className="mt-2 text-sm text-[rgb(var(--muted))]">
                    Discovery, design, build, and a real polish step before launch. You get direct communication
                    and a clean handoff when we wrap.
                  </p>

                  <div className="mt-6 grid gap-3">
                    {[
                      "Direct contact",
                      "Frequent progress updates",
                      "Transparent milestones",
                    ].map((line) => (
                      <div
                        key={line}
                        className="rounded-2xl border border-[rgba(var(--border)/0.9)] bg-[rgba(var(--fg)/0.03)] px-4 py-3 text-sm"
                      >
                        {line}
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-xs text-[rgb(var(--muted))]">
                    Swap in real screenshots and logos as content is finalized.
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
                eyebrow="Trust strip"
                title="Our real differentiator"
                desc="You can reach us directly, see progress frequently, and understand exactly how the build is moving."
              />
            </motion.div>

            <motion.div
              className="mt-10 grid gap-6 md:grid-cols-3"
              variants={staggerContainerVariant(0.1)}
            >
              {[
                {
                  title: "Call or text us directly",
                  desc: "Small team, direct contact. No account-manager relay layer.",
                },
                {
                  title: "Frequent progress updates",
                  desc: "Regular demos and updates so you always know what is done and what is next.",
                },
                {
                  title: "Clear milestones + clean handoff",
                  desc: "Scope clarity upfront, documented decisions, and handoff materials at launch.",
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
                eyebrow="Portfolio"
                title="Featured work"
                desc="Client work and studio builds, clearly labeled so you can see what was built for clients and what we built internally."
              />
              <div className="flex gap-3">
                <Button href="/portfolio" variant="ghost">
                  Portfolio
                </Button>
                <Button href="/contact#book-a-call">Book a Call</Button>
              </div>
            </motion.div>

            <motion.div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]" variants={staggerContainerVariant(0.1)}>
              <motion.div variants={sectionRevealVariant()}>
                <Card className="h-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-[rgba(var(--accent)/0.4)] bg-[rgba(var(--accent)/0.12)] px-3 py-1 text-xs font-medium">
                      Client Work
                    </span>
                    <span className="rounded-full border border-[rgba(var(--border)/0.9)] px-3 py-1 text-xs text-[rgb(var(--muted))]">
                      Case study details in Services
                    </span>
                  </div>
                  <h3 className="display-heading mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                    TakeOff
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">
                    A quality-first build focused on shipping a polished experience with clear milestones and a
                    clean handoff. We are keeping the full case study inside Services for now.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href="/services#takeoff">View TakeOff</Button>
                    <Button href="/portfolio" variant="ghost">
                      See all work
                    </Button>
                  </div>
                </Card>
              </motion.div>

              <motion.div className="grid gap-6" variants={staggerContainerVariant(0.08)}>
                {featuredStudioBuilds.map((build) => (
                  <motion.div key={build.title} variants={sectionRevealVariant()}>
                    <Card>
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[rgb(var(--muted))]">
                        Studio Build
                      </p>
                      <h3 className="display-heading mt-3 text-lg font-semibold tracking-tight">
                        {build.title}
                      </h3>
                      <p className="mt-2 text-sm text-[rgb(var(--muted))]">{build.desc}</p>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="py-12 sm:py-20" delay={0.07}>
        <Container>
          <motion.div variants={staggerContainerVariant(0.1)}>
            <motion.div variants={sectionRevealVariant()}>
              <SectionHeading
                eyebrow="What we do"
                title="Three ways we help"
                desc="We can build from scratch, improve what you already have, or finish the quality work that turns a rough build into something launch-ready."
              />
            </motion.div>
            <motion.div className="mt-10 grid gap-6 md:grid-cols-3" variants={staggerContainerVariant(0.1)}>
              {serviceLanes.map((lane) => (
                <motion.div key={lane.title} variants={sectionRevealVariant()}>
                  <Card>
                    <h3 className="text-base font-semibold">{lane.title}</h3>
                    <p className="mt-2 text-sm text-[rgb(var(--muted))]">{lane.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="py-12 sm:py-20" delay={0.08}>
        <Container>
          <motion.div variants={staggerContainerVariant(0.1)}>
            <motion.div variants={sectionRevealVariant()}>
              <SectionHeading
                eyebrow="How we work"
                title="A real polish step"
                desc="Discovery -> Design -> Build -> Polish -> Launch. The polish phase is a real part of the process, not a leftover if there is time."
              />
            </motion.div>
            <motion.div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" variants={staggerContainerVariant(0.08)}>
              {processSteps.map((step, index) => (
                <motion.div key={step} variants={sectionRevealVariant()}>
                  <Card className={step === "Polish" ? "ring-1 ring-[rgba(var(--accent)/0.45)]" : ""}>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-[rgb(var(--muted))]">
                      Step {index + 1}
                    </p>
                    <p className="mt-2 text-base font-semibold">{step}</p>
                    {step === "Polish" ? (
                      <p className="mt-2 text-sm text-[rgb(var(--muted))]">
                        QA, performance, bug fixes, and finish-detail passes before launch.
                      </p>
                    ) : (
                      <p className="mt-2 text-sm text-[rgb(var(--muted))]">
                        Clear outputs and decisions so the next step moves faster.
                      </p>
                    )}
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="py-12 sm:py-20" delay={0.09}>
        <Container>
          <motion.div variants={sectionRevealVariant()} className="rounded-[2.25rem] border border-[rgba(var(--border)/0.9)] p-6 sm:p-10">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="hero-kicker text-xs">Calendar integration</p>
                <h2 className="display-heading mt-2 text-3xl font-semibold sm:text-4xl">
                  Pick a time that works
                </h2>
                <p className="mt-3 max-w-xl text-[rgb(var(--muted))]">
                  Let people choose a time that works (Calendly). We keep it simple and follow up quickly.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/contact#book-a-call">Book a Call</Button>
                  <Button href="/contact" variant="ghost">
                    Contact page
                  </Button>
                </div>
              </div>

              <InteractiveCard className="rounded-2xl border border-[rgba(var(--border)/0.9)] bg-[rgba(12,18,28,0.82)] p-6">
                <div className="flex min-h-56 items-center justify-center rounded-2xl border border-dashed border-[rgba(var(--border)/0.9)] text-center text-sm text-[rgb(var(--muted))]">
                  Calendly embed placeholder
                </div>
                <p className="mt-4 text-xs text-[rgb(var(--muted))]">
                  Add the real embed when your booking link is finalized.
                </p>
              </InteractiveCard>
            </div>
          </motion.div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="py-12 sm:py-20" delay={0.1}>
        <Container>
          <motion.div variants={staggerContainerVariant(0.1)}>
            <motion.div variants={sectionRevealVariant()}>
              <SectionHeading
                eyebrow="Expectations"
                title="What you can expect working with us"
                desc="Until testimonials are in place, this section sets the working style and delivery expectations clearly."
              />
            </motion.div>
            <motion.div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]" variants={staggerContainerVariant(0.1)}>
              <motion.div variants={sectionRevealVariant()}>
                <Card className="h-full">
                  <h3 className="display-heading text-2xl font-semibold">Clear communication, real progress</h3>
                  <p className="mt-3 text-sm text-[rgb(var(--muted))]">
                    We work like a small team that is actually reachable. You get direct communication,
                    regular check-ins, and a transparent view of what is shipping.
                  </p>
                </Card>
              </motion.div>
              <motion.div variants={sectionRevealVariant()}>
                <Card className="h-full">
                  <ul className="grid gap-3 text-sm">
                    {expectations.map((item) => (
                      <li
                        key={item}
                        className="rounded-xl border border-[rgba(var(--border)/0.9)] px-4 py-3 text-[rgb(var(--muted))]"
                      >
                        <span className="font-medium text-[rgb(var(--fg))]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="py-12 sm:py-20" delay={0.12}>
        <Container>
          <motion.div
            variants={sectionRevealVariant()}
            className="rounded-[2.25rem] border border-[rgba(var(--border)/0.9)] p-6 sm:p-14"
          >
            <InteractiveCard className="rounded-[2rem] border border-white/10 bg-[rgba(12,18,28,0.82)] p-6 sm:p-10">
              <h2 className="display-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Tell us what you&apos;re building<span className="text-[rgb(var(--accent))]">.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-base text-[rgb(var(--muted))]">
                We&apos;ll help you define a clear scope and a practical path to launch. If it&apos;s a fit,
                we&apos;ll keep the next steps simple.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact#book-a-call">Book a Call</Button>
                <Button href="/portfolio" variant="ghost">
                  See what we ship
                </Button>
              </div>
            </InteractiveCard>
          </motion.div>
        </Container>
      </AnimatedSection>

      <SiteFooter />
    </>
  );
}
