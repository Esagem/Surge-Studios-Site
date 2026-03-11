"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MOTION_EASE } from "@/lib/motion";
import { NAV_LINKS, PRIMARY_CTA } from "@/lib/site-nav";

export default function ScrollHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const headerLinks = NAV_LINKS;
  const ctaActive = pathname === "/contact";

  const toggleTheme = () => {
    const currentTheme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  };

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
        <div className="theme-header-shell pointer-events-auto rounded-2xl border px-3 py-2 backdrop-blur-xl sm:px-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <motion.div whileHover={reduceMotion ? undefined : { scale: 1.04 }}>
                <Image
                  src="/surge-logo.svg"
                  alt="Surge Studios logo"
                  width={40}
                  height={40}
                  className="theme-header-logo h-10 w-10 rounded-full border object-cover"
                  priority
                />
              </motion.div>
              <div className="leading-tight">
                <p className="theme-wordmark-kicker text-xs tracking-[0.2em]">SURGE</p>
                <p className="theme-wordmark-title text-sm font-semibold">Studios</p>
              </div>
            </Link>

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
                        <span aria-hidden className="theme-divider mx-1 text-sm">
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
                    ? "border-[rgba(var(--accent)/0.6)] bg-[rgba(var(--accent)/0.2)] text-[rgb(var(--header-text))]"
                    : "border-[rgba(var(--header-border)/0.2)] text-[rgb(var(--header-text))]"
                }`}
              >
                {PRIMARY_CTA.label}
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="theme-toggle"
                aria-label="Toggle color theme"
                onClick={toggleTheme}
              >
                <span className="theme-toggle-track" />
                <span className="theme-toggle-thumb" />
                <span
                  aria-hidden
                  className="theme-toggle-glyph theme-toggle-glyph-left"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                    <path d="M12 4.75v2.5M12 16.75v2.5M6.88 6.88l1.77 1.77M15.35 15.35l1.77 1.77M4.75 12h2.5M16.75 12h2.5M6.88 17.12l1.77-1.77M15.35 8.65l1.77-1.77" />
                    <circle cx="12" cy="12" r="3.25" />
                  </svg>
                </span>
                <span
                  aria-hidden
                  className="theme-toggle-glyph theme-toggle-glyph-right"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M20.2 14.3A8.4 8.4 0 0 1 9.7 3.8a.75.75 0 0 0-.92-.93A9.75 9.75 0 1 0 21.13 15.2a.75.75 0 0 0-.93-.9Z" />
                  </svg>
                </span>
                <span className="sr-only">Toggle color theme</span>
              </button>

              <button
                type="button"
                className="theme-menu-button inline-flex h-10 w-10 items-center justify-center rounded-xl min-[980px]:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-main-nav"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                <span className="text-lg leading-none">{menuOpen ? "x" : "="}</span>
              </button>
            </div>
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
                className={`mobile-nav-link mt-1 border border-[rgba(var(--header-border)/0.15)] ${
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
