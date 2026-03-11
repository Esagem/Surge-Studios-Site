import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Surge Studios",
  description: "Privacy Policy for Surge Studios websites, apps, and related services.",
};

const sections = [
  {
    title: "1. Scope",
    content: (
      <>
        <p>
          This Privacy Policy explains how Surge Studios LLC collects, uses, stores, and protects
          information when you use our websites, mobile applications, and related services.
        </p>
        <p>
          This policy applies broadly to any website, application, product, or service we make
          available under the Surge Studios name or one of our brands. If a specific product includes
          an additional privacy notice, that notice supplements this policy for that product.
        </p>
      </>
    ),
  },
  {
    title: "2. Information We Collect",
    content: (
      <>
        <p>Depending on the Service you use, we may collect:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Account information such as your name, email address, login details, and profile data.</li>
          <li>Content and activity you choose to submit, create, upload, or log inside a product.</li>
          <li>Transaction and subscription information related to purchases.</li>
          <li>Device, diagnostic, usage, and analytics information used to operate and improve Services.</li>
          <li>Communications you send to us through forms, support requests, or email.</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. How We Use Information",
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Provide, maintain, and improve our Services.</li>
        <li>Create and manage accounts.</li>
        <li>Process subscriptions, payments, and related support requests.</li>
        <li>Monitor reliability, security, and abuse prevention.</li>
        <li>Analyze usage patterns to improve product performance and user experience.</li>
        <li>Communicate with you about updates, support, and important service notices.</li>
      </ul>
    ),
  },
  {
    title: "4. Service Providers and Infrastructure",
    content: (
      <>
        <p>
          We may use trusted third-party service providers to host infrastructure, authenticate users,
          process payments, store data, and measure analytics.
        </p>
        <p>
          Those providers may vary across products and may include cloud hosting providers, analytics
          vendors, customer support platforms, authentication providers, and payment processors.
        </p>
      </>
    ),
  },
  {
    title: "5. Data Sharing",
    content: (
      <>
        <p>We do not sell your personal information.</p>
        <p>We may share information in limited circumstances, including:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>With service providers acting on our behalf.</li>
          <li>To comply with law, legal process, or enforceable government requests.</li>
          <li>To protect the rights, safety, security, and integrity of Surge Studios, users, or others.</li>
          <li>As part of a merger, acquisition, financing, or sale of business assets.</li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Data Retention",
    content: (
      <>
        <p>
          We retain information for as long as needed to provide the relevant Service, comply with
          legal obligations, resolve disputes, and enforce agreements.
        </p>
        <p>
          Retention periods may vary by product and the type of data involved. When you request
          deletion, we will handle the request in accordance with applicable law and our technical and
          operational obligations.
        </p>
      </>
    ),
  },
  {
    title: "7. Security",
    content: (
      <>
        <p>
          We use reasonable administrative, technical, and organizational safeguards to protect
          information under our control, including encrypted transmission where appropriate.
        </p>
        <p>No system is completely secure, and we cannot guarantee absolute security.</p>
      </>
    ),
  },
  {
    title: "8. Children",
    content: (
      <p>
        Our Services are not intended for children under 18 unless a product expressly states
        otherwise. We do not knowingly collect personal information from children in violation of
        applicable law.
      </p>
    ),
  },
  {
    title: "9. Your Rights",
    content: (
      <>
        <p>
          Depending on where you live, you may have rights to access, correct, delete, or restrict use
          of your personal information.
        </p>
        <p>
          To exercise those rights or request account deletion, contact us through the contact page on
          this website. We may need to verify your identity before completing a request.
        </p>
      </>
    ),
  },
  {
    title: "10. Updates",
    content: (
      <p>
        We may update this Privacy Policy from time to time. When we do, we will post the revised
        version here and update the effective date. Continued use of the Services after the revised
        policy becomes effective means you accept the updated policy.
      </p>
    ),
  },
] as const;

export default function PrivacyPage() {
  return (
    <LegalShell
      eyebrow="Legal"
      title="Privacy Policy"
      effectiveDate="March 11, 2026"
      intro={
        <p>
          This Privacy Policy is written to cover Surge Studios as a company, not just one app. It
          sets the default rules for how we handle data across current and future products, including
          products offered under Surge Studios brands, unless a product-specific notice says
          otherwise.
        </p>
      }
      sections={sections}
    />
  );
}
