// Types mirroring surge.manifest.yaml. See surge.manifest.schema.md for the
// authoritative schema. Only the fields the site consumes are typed in detail.

export type Manifest = {
  schema: number;
  identity: {
    slug: string;
    name: string;
    tagline?: string;
    bundle_id_ios: string;
    package_android: string;
  };
  studio?: { name?: string; support_email?: string; marketing_site?: string };
  brand?: {
    palette?: { accent?: string; accent_soft?: string; panel?: string };
    logo_mode?: "wordmark" | "monogram";
    fonts?: { display?: string; text?: string };
  };
  monetization: {
    entitlement: string;
    model: "subscription" | "one_time" | "hybrid";
    trial?: { type: string; duration_days?: number };
    products?: {
      id: string;
      type: string;
      period?: string;
      reference_price?: number;
      default?: boolean;
    }[];
    gates?: string[];
  };
  legal?: {
    privacy_url?: string;
    terms_url?: string;
    data_practices?: Record<string, boolean>;
  };
  store?: {
    category?: string;
    age_rating?: string;
    keywords?: string[];
    short_description?: string;
    full_description?: string;
    app_store_id?: string; // add once Apple assigns it
  };
  integrations?: { firebase_project?: string };
};

// Normalized shape the site renders. Everything here is derived from a Manifest.
export type AppEntry = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  keywords: string[];
  model: Manifest["monetization"]["model"];
  price: { amount: number; period: string } | null;
  palette: {
    accent: string;
    accentSoft: string;
    panel: string;
    glow: string;
    ring: string;
  };
  logoMode: "wordmark" | "monogram";
  links: {
    privacy: string;
    terms: string;
    appStore: string | null;
    playStore: string;
  };
};
