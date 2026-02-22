"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { sectionRevealVariant } from "@/lib/motion";

export default function AnimatedSection({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  if (reduceMotion) {
    return <section className={className}>{children}</section>;
  }

  return (
    <motion.section
      className={className}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      variants={sectionRevealVariant(delay)}
      viewport={
        isMobile
          ? { amount: 0.14, margin: "-4% 0px -4% 0px" }
          : { amount: 0.25, margin: "-10% 0px -10% 0px" }
      }
      onViewportEnter={() => setActive(true)}
      onViewportLeave={() => {
        if (!isMobile) setActive(false);
      }}
    >
      {children}
    </motion.section>
  );
}
