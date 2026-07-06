import Link from "next/link";
import { LegalShell } from "@/components/LegalPage";
import type { LegalDoc } from "@/content/legal";

/// Renders a generated per-app LegalDoc through the shared studio LegalShell,
/// so an app's policy looks and reads like the rest of the Surge site.
export function AppLegalShell({
  appName,
  doc,
}: {
  appName: string;
  doc: LegalDoc;
}) {
  const effectiveDate = doc.eyebrow.replace(/^Last updated:\s*/i, "");
  const sections = doc.sections.map((section) => ({
    title: section.heading,
    content: (
      <>
        {section.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </>
    ),
  }));

  return (
    <LegalShell
      eyebrow={`${appName} · Legal`}
      title={doc.title}
      effectiveDate={effectiveDate}
      intro={
        <>
          <p>{doc.intro}</p>
          <p>
            {appName} is owned and operated by Surge Studios LLC. This notice
            supplements the master{" "}
            <Link
              className="text-[rgb(var(--fg))] underline decoration-[rgba(var(--accent)/0.6)] underline-offset-4"
              href="/privacy"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              className="text-[rgb(var(--fg))] underline decoration-[rgba(var(--accent)/0.6)] underline-offset-4"
              href="/terms"
            >
              Terms of Service
            </Link>
            , which apply to every Surge Studios product.
          </p>
        </>
      }
      sections={sections}
    />
  );
}
