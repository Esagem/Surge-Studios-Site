import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(var(--border)/0.9)] bg-[rgba(10,10,12,0.8)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-8">
          <div>
            <p className="hero-kicker text-xs">Surge Studios LLC</p>
            <div className="mt-3 grid gap-2 text-sm text-[rgb(var(--muted))]">
              <Link href="/terms">Terms of Service</Link>
              <Link href="/privacy">Privacy Policy</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[rgba(var(--border)/0.9)] pt-4 text-center text-xs text-[rgb(var(--muted))]">
          <p>© 2026 Surge Studios LLC</p>
        </div>
      </div>
    </footer>
  );
}
