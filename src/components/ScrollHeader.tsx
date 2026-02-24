"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MOTION_EASE } from "@/lib/motion";
import MiniDinoGame from "@/components/MiniDinoGame";
import { NAV_LINKS, PRIMARY_CTA } from "@/lib/site-nav";

export default function ScrollHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const headerLinks = NAV_LINKS;
  const ctaActive = pathname === "/contact";

  return (
    <motion.header
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
      initial={false}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: 0.55,
              ease: MOTION_EASE,
            }
      }
    >
      <div className="mx-auto max-w-6xl">
        <div className="pointer-events-auto rounded-2xl border border-white/15 bg-[rgba(5,10,16,0.8)] px-3 py-2 backdrop-blur-xl sm:px-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <motion.div whileHover={reduceMotion ? undefined : { scale: 1.04 }}>
                <Image
                  src="/surge-logo.svg"
                  alt="Surge Studios logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border border-white/25 object-cover"
                  priority
                />
              </motion.div>
              <div className="leading-tight">
                <p className="text-xs tracking-[0.2em] text-white/70">SURGE</p>
                <p className="text-sm font-semibold text-white">Studios</p>
              </div>
            </Link>

            <div className="hidden min-w-0 flex-1 justify-center px-2 min-[560px]:flex">
              <div className="shrink-0 overflow-hidden rounded-xl">
                <MiniDinoGame width={210} height={40} showHint={false} />
              </div>
            </div>

            <div className="hidden items-center gap-2 min-[980px]:flex">
              <nav className="flex items-center" aria-label="Primary navigation">
                {headerLinks.map((item, index) => {
                  const active = pathname === item.href;
                  return (
                    <div key={item.href} className="flex items-center">
                      <Link
                        href={item.href}
                        className={`nav-link px-3 ${active ? "nav-link-active" : ""}`}
                        aria-current={active ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                      {index < headerLinks.length - 1 ? (
                        <span aria-hidden className="mx-1 text-sm text-white/35">
                          |
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </nav>
              <Link
                href={PRIMARY_CTA.href}
                className={`header-cta rounded-xl border px-3 py-2 text-sm font-medium transition ${
                  ctaActive
                    ? "border-[rgba(var(--accent)/0.6)] bg-[rgba(var(--accent)/0.2)] text-white"
                    : "border-white/20 text-white"
                }`}
              >
                {PRIMARY_CTA.label}
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 text-white min-[980px]:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-main-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className="text-lg leading-none">{menuOpen ? "x" : "="}</span>
            </button>
          </div>

          <motion.div
            id="mobile-main-nav"
            className="overflow-hidden min-[980px]:hidden"
            initial={false}
            animate={menuOpen ? "open" : "closed"}
            variants={{
              open: { height: "auto", opacity: 1, marginTop: 12 },
              closed: { height: 0, opacity: 0, marginTop: 0 },
            }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: MOTION_EASE }}
          >
            <nav className="mobile-nav-panel" aria-label="Mobile navigation">
              {headerLinks.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`mobile-nav-link ${active ? "mobile-nav-link-active" : ""}`}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href={PRIMARY_CTA.href}
                className={`mobile-nav-link mt-1 border border-white/15 ${
                  ctaActive ? "mobile-nav-link-active" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {PRIMARY_CTA.label}
              </Link>
            </nav>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
