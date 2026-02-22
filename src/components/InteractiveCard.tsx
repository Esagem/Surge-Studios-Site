"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cardHoverVariant } from "@/lib/motion";

export default function InteractiveCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`interactive-card ${className}`}
      variants={cardHoverVariant}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      style={reduceMotion ? undefined : { transformStyle: "flat" }}
    >
      {children}
    </motion.div>
  );
}
