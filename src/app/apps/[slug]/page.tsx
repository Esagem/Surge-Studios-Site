import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getApp, getApps } from "@/content/apps";

type Params = { params: Promise<{ slug: string }> };

// Statically generate one page per synced app at build time.
export function generateStaticParams() {
  return getApps().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};
  const title = app.tagline ? `${app.name} - ${app.tagline}` : app.name;
  return {
    title,
    description: app.description,
    keywords: app.keywords,
    openGraph: { title, description: app.description, type: "website" },
  };
}

function priceLabel(app: NonNullable<ReturnType<typeof getApp>>): string {
  if (!app.price) return "Free";
  const per =
    app.price.period === "P1Y"
      ? "/yr"
      : app.price.period === "P1M"
        ? "/mo"
        : "";
  const amount = `$${app.price.amount.toFixed(2)}`;
  if (app.model === "one_time") return `${amount} once`;
  return `${amount}${per}`;
}

export default async function AppPage({ params }: Params) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  const p = app.palette;
  const style = {
    "--accent": p.accent,
    "--accent-soft": p.accentSoft,
    "--panel": p.panel,
    "--glow": p.glow,
    "--ring": p.ring,
  } as CSSProperties;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    applicationCategory: app.category,
    offers: app.price
      ? { "@type": "Offer", price: app.price.amount, priceCurrency: "USD" }
      : { "@type": "Offer", price: 0, priceCurrency: "USD" },
  };

  return (
    <main style={style} className="mx-auto max-w-3xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        className="rounded-3xl p-10"
        style={{
          background: "var(--panel)",
          boxShadow: `0 40px 120px -40px var(--glow)`,
          border: `1px solid var(--ring)`,
        }}
      >
        <p
          className="text-xs uppercase tracking-widest"
          style={{ color: "var(--accent)" }}
        >
          {app.category}
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">{app.name}</h1>
        <p className="mt-3 text-lg text-white/70">{app.tagline}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {app.links.appStore && (
            <a
              href={app.links.appStore}
              className="rounded-full px-5 py-2 text-sm font-medium text-black"
              style={{ background: "var(--accent)" }}
            >
              App Store
            </a>
          )}
          <a
            href={app.links.playStore}
            className="rounded-full px-5 py-2 text-sm font-medium text-white"
            style={{ border: `1px solid var(--ring)` }}
          >
            Google Play
          </a>
          <span className="text-sm text-white/60">{priceLabel(app)}</span>
        </div>
      </section>

      <section className="mt-12 text-white/80">
        <p className="whitespace-pre-line leading-relaxed">{app.description}</p>
      </section>

      {/* Screenshots: drop images into content/apps/<slug>/shots and render here. */}

      <footer className="mt-16 flex gap-6 text-sm text-white/50">
        <Link href={app.links.privacy}>Privacy</Link>
        <Link href={app.links.terms}>Terms</Link>
      </footer>
    </main>
  );
}
