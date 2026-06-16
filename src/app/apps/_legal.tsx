import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getApp, getApps, getLegal } from "@/content/apps";

export function legalParams() {
  return getApps().map((a) => ({ slug: a.slug }));
}

export function legalMetadata(kind: "privacy" | "terms") {
  return async ({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }): Promise<Metadata> => {
    const { slug } = await params;
    const app = getApp(slug);
    const label = kind === "privacy" ? "Privacy Policy" : "Terms of Service";
    return { title: app ? `${app.name} - ${label}` : label };
  };
}

export async function LegalPageView({
  slug,
  kind,
}: {
  slug: string;
  kind: "privacy" | "terms";
}) {
  const app = getApp(slug);
  const md = getLegal(slug, kind);
  if (!app || !md) notFound();
  const html = await marked.parse(md);
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <article
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
