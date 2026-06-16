import "server-only";
import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import type { Manifest, AppEntry } from "./manifest";

const APPS_DIR = path.join(process.cwd(), "content", "apps");

function rgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function manifestToEntry(m: Manifest): AppEntry {
  const accent = m.brand?.palette?.accent ?? "#75D8FF";
  const accentSoft = m.brand?.palette?.accent_soft ?? "#2B89D8";
  const panel = m.brand?.palette?.panel ?? "#0E1B27";
  const def =
    m.monetization.products?.find((p) => p.default) ??
    m.monetization.products?.[0];
  const slug = m.identity.slug;

  return {
    slug,
    name: m.identity.name,
    tagline: m.identity.tagline ?? "",
    description: m.store?.full_description?.trim() ?? m.identity.tagline ?? "",
    category: m.store?.category ?? "App",
    keywords: m.store?.keywords ?? [],
    model: m.monetization.model,
    price:
      def?.reference_price != null
        ? { amount: def.reference_price, period: def.period ?? "" }
        : null,
    palette: {
      accent,
      accentSoft,
      panel,
      glow: rgba(accent, 0.24),
      ring: rgba(accent, 0.34),
    },
    logoMode: m.brand?.logo_mode ?? "wordmark",
    links: {
      privacy: m.legal?.privacy_url ?? `/apps/${slug}/privacy`,
      terms: m.legal?.terms_url ?? `/apps/${slug}/terms`,
      appStore: m.store?.app_store_id
        ? `https://apps.apple.com/app/id${m.store.app_store_id}`
        : null,
      playStore: `https://play.google.com/store/apps/details?id=${m.identity.package_android}`,
    },
  };
}

function readManifest(slug: string): Manifest | null {
  const file = path.join(APPS_DIR, slug, "surge.manifest.yaml");
  if (!fs.existsSync(file)) return null;
  return parse(fs.readFileSync(file, "utf8")) as Manifest;
}

/** Every app that has a synced manifest, alphabetical. */
export function getApps(): AppEntry[] {
  if (!fs.existsSync(APPS_DIR)) return [];
  return fs
    .readdirSync(APPS_DIR)
    .map(readManifest)
    .filter((m): m is Manifest => m != null)
    .map(manifestToEntry)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getApp(slug: string): AppEntry | null {
  const m = readManifest(slug);
  return m ? manifestToEntry(m) : null;
}

/** Raw legal markdown synced from the app repo, or null. */
export function getLegal(slug: string, kind: "privacy" | "terms"): string | null {
  const file = path.join(APPS_DIR, slug, "legal", `${kind}.md`);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
}
