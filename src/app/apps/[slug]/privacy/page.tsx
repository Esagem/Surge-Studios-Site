import { LegalPageView, legalParams, legalMetadata } from "../../_legal";

export const generateStaticParams = () => legalParams();
export const generateMetadata = legalMetadata("privacy");

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <LegalPageView slug={slug} kind="privacy" />;
}
