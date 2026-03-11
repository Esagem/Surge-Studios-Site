import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | Surge Studios",
  description: "Terms of Service for Surge Studios websites, apps, and related services.",
};

const sections = [
  {
    title: "1. Scope",
    content: (
      <>
        <p>
          These Terms of Service govern your access to and use of websites, mobile applications,
          software products, and related services operated by Surge Studios LLC. In these Terms,
          &quot;Surge Studios,&quot; &quot;we,&quot; &quot;our,&quot; and &quot;us&quot; refer to Surge Studios
          LLC, and &quot;Services&quot; refers to any website, application, product, or service we own,
          operate, or make available under the Surge Studios name or one of our brands.
        </p>
        <p>
          Some Services may include additional product-specific rules, pricing terms, or disclosures.
          When they do, those additional terms supplement these Terms.
        </p>
      </>
    ),
  },
  {
    title: "2. Acceptance and Eligibility",
    content: (
      <>
        <p>
          By accessing or using our Services, you agree to these Terms. If you do not agree, do not
          use the Services.
        </p>
        <p>
          You must be legally able to enter into a binding agreement to use our Services on your own.
          If you are under the age of majority in your jurisdiction, you may use the Services only
          with the involvement of a parent or legal guardian, unless a specific Service states
          otherwise.
        </p>
      </>
    ),
  },
  {
    title: "3. Accounts",
    content: (
      <>
        <p>
          Some features require an account. You agree to provide accurate, current information and to
          keep it updated.
        </p>
        <p>
          You are responsible for safeguarding your credentials and for activity that occurs under
          your account. We may suspend or terminate accounts that appear to violate these Terms,
          misuse the Services, or create security or legal risk.
        </p>
      </>
    ),
  },
  {
    title: "4. Paid Services and Billing",
    content: (
      <>
        <p>
          Certain Services may require payment, including subscriptions or one-time purchases.
          Pricing, billing cycle, renewal terms, and included features will be shown at the time of
          purchase.
        </p>
        <p>
          If a Service is distributed through a third-party marketplace such as the Apple App Store or
          Google Play, billing, cancellation, and refund handling may be controlled by that platform.
          Except where required by law, purchases are final.
        </p>
      </>
    ),
  },
  {
    title: "5. Acceptable Use",
    content: (
      <>
        <p>You may not use the Services to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Violate any applicable law or regulation.</li>
          <li>Attempt unauthorized access to systems, accounts, or data.</li>
          <li>Interfere with reliability, availability, or performance of the Services.</li>
          <li>Upload or transmit malicious code, spam, or fraudulent content.</li>
          <li>Copy, reverse engineer, decompile, or misuse the Services except as allowed by law.</li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Health and Informational Disclaimers",
    content: (
      <>
        <p>
          Some Surge Studios products may include wellness, performance, productivity, or planning
          tools. Unless a product expressly states otherwise, our Services are provided for general
          informational purposes only and do not constitute medical, legal, financial, or other
          professional advice.
        </p>
        <p>
          If you use a Service in connection with exercise, training, or health-related activity, you
          do so voluntarily and assume the associated risks. Consult a qualified professional before
          relying on any health-related information or beginning a new exercise program.
        </p>
      </>
    ),
  },
  {
    title: "7. Intellectual Property",
    content: (
      <>
        <p>
          The Services, including software, code, designs, branding, trademarks, logos, text,
          graphics, and other content, are owned by Surge Studios LLC or its licensors and are
          protected by applicable intellectual property laws.
        </p>
        <p>
          We grant you a limited, non-exclusive, non-transferable, revocable license to use the
          Services for their intended purpose, subject to these Terms.
        </p>
      </>
    ),
  },
  {
    title: "8. Termination",
    content: (
      <>
        <p>
          We may suspend or terminate your access to any Service at any time if we reasonably believe
          you violated these Terms, created risk for other users, or exposed us to legal or security
          issues.
        </p>
        <p>
          You may stop using the Services at any time. Any provisions that should reasonably survive
          termination, including ownership, disclaimers, liability limits, and dispute terms, will
          remain in effect.
        </p>
      </>
    ),
  },
  {
    title: "9. Disclaimers and Limitation of Liability",
    content: (
      <>
        <p>
          To the fullest extent permitted by law, the Services are provided &quot;as is&quot; and
          &quot;as available&quot; without warranties of any kind, express or implied.
        </p>
        <p>
          To the fullest extent permitted by law, Surge Studios LLC will not be liable for indirect,
          incidental, special, consequential, exemplary, or punitive damages, or for any loss of
          profits, data, goodwill, or business interruption arising from or related to your use of the
          Services.
        </p>
        <p>
          If we are found liable for any claim, our total liability will not exceed the amount you
          paid to us for the applicable Service during the 12 months before the event giving rise to
          the claim.
        </p>
      </>
    ),
  },
  {
    title: "10. Governing Law",
    content: (
      <p>
        These Terms are governed by the laws of the State of Alabama, without regard to conflict of
        laws principles, unless applicable law requires otherwise.
      </p>
    ),
  },
  {
    title: "11. Updates",
    content: (
      <p>
        We may update these Terms from time to time. When we do, we will post the revised version on
        this page and update the effective date. Continued use of the Services after the revised Terms
        become effective means you accept the updated Terms.
      </p>
    ),
  },
] as const;

export default function TermsPage() {
  return (
    <LegalShell
      eyebrow="Legal"
      title="Terms of Service"
      effectiveDate="March 11, 2026"
      intro={
        <p>
          These Terms of Service apply across Surge Studios-owned websites, apps, and related
          services, including any current or future products we release under Surge Studios or its
          brands. Product-specific terms may add to these Terms when needed, but these core terms
          establish the baseline rules for using anything we operate.
        </p>
      }
      sections={sections}
    />
  );
}
