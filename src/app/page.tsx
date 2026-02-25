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

const featuredStudioBuilds = [
  {
    title: "SaaS Starter",
    desc: "Auth, billing, and dashboard foundations to get a product or internal tool moving quickly.",
  },
  {
    title: "Website Launch Kit",
    desc: "CMS, SEO, and performance setup for a marketing site that is ready to publish and grow.",
  },
  {
    title: "Legacy Refresh",
    desc: "UI cleanup and speed improvements for products that need a stronger front end without a rebuild.",
  },
];

const serviceLanes = [
  {
    title: "Build something new",
    desc: "New websites, apps, and SaaS products with focused scope and steady execution.",
  },
  {
    title: "Improve what you already have",
    desc: "Work inside your existing codebase to refactor, extend, and modernize without starting over.",
  },
  {
    title: "Fix + polish + ship",
    desc: "Performance, reliability, and UX cleanup to move a rough build toward release.",
  },
];

const processSteps = [
  "Discovery",
  "Design",
  "Build",
  "Polish",
  "Launch",
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
              <div className="flex h-full flex-col justify-center">
                <motion.p
                  variants={fadeUpIn(0.02, 16)}
                  className="hero-kicker text-xs font-medium text-[rgb(var(--muted))]"
                >
                  Surge Studios | Websites, apps, and internal product builds
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
                  We&apos;re a small team you can actually reach. You&apos;ll work directly with us, get
                  regular updates, and always know what is being built next.
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
                  <p className="text-xs font-medium text-[rgb(var(--muted))]">How we work</p>
                  <p className="display-heading mt-2 text-lg font-semibold">Quality first. Fast when it counts.</p>
                  <p className="mt-2 text-sm text-[rgb(var(--muted))]">
                    We plan in phases, build in short cycles, and leave you with something maintainable after
                    launch.
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
                eyebrow="Why Surge"
                title="The difference"
                desc="Small team, direct access, and visible progress from start to launch."
              />
            </motion.div>

            <motion.div
              className="mt-10 grid gap-6 md:grid-cols-3"
              variants={staggerContainerVariant(0.1)}
            >
              {[
                {
                  title: "Call or text us directly",
                  desc: "Small team, direct contact. No account-manager or middle-man.",
                },
                {
                  title: "Frequent progress updates",
                  desc: "Short updates and working demos so you can see momentum as it happens.",
                },
                {
                  title: "Clear milestones + clean handoff",
                  desc: "Clear scope upfront, documented decisions throughout, and a clean handoff at launch.",
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
                desc="Studio builds and project work, clearly labeled so you know what was made for internal use and what was built for others."
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
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[rgb(var(--muted))]">
                    Studio Build
                  </p>
                  <h3 className="display-heading mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                    TakeOff
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">
                    An internal Surge Studios build used to test workflows, sharpen UX details, and prove launch-ready patterns.
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
                        Studio Starter Kit
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
                desc="We can start from scratch, improve an existing codebase, or finish the work that gets a build ready to ship."
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
                desc="Discovery -> Design -> Build -> Polish -> Launch. Polish is scheduled work, not an afterthought."
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
                Tell us what you&apos;re building, what is blocking progress, and what needs to go live first.
                If it&apos;s a fit, we&apos;ll propose a simple next step.
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
