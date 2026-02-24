import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Our Story", href: "/our-story" },
  { label: "Contact", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(var(--border)/0.9)] bg-[rgba(10,10,12,0.8)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr_1fr]">
          <div>
            <p className="hero-kicker text-xs">Surge Studios</p>
            <p className="mt-3 max-w-sm text-sm text-[rgb(var(--muted))]">
              Quality-first websites and apps with direct communication, clear milestones, and a clean handoff.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">Links</p>
            <ul className="mt-3 grid gap-2 text-sm text-[rgb(var(--muted))]">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Contact</p>
            <div className="mt-3 grid gap-2 text-sm text-[rgb(var(--muted))]">
              <p>hello@surgestudios.co</p>
              <p>Small team. Direct contact.</p>
              <p>Frequent progress updates.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[rgba(var(--border)/0.9)] pt-4 text-xs text-[rgb(var(--muted))]">
          <p>Surge Studios</p>
        </div>
      </div>
    </footer>
  );
}
