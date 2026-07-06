import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppLegalShell } from "@/components/AppLegalShell";
import { getAppLegal, legalSlugs } from "@/content/legal";

// Only real apps get a page; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return legalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const app = getAppLegal((await params).slug);
  return {
    title: app
      ? `${app.appName} Terms of Service | Surge Studios`
      : "Terms of Service | Surge Studios",
  };
}

export default async function AppTermsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const app = getAppLegal((await params).slug);
  if (!app) notFound();
  return <AppLegalShell appName={app.appName} doc={app.terms} />;
}
