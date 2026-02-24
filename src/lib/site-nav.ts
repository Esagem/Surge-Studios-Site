export type NavItem = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Our Story", href: "/our-story" },
];

export const PRIMARY_CTA: NavItem = {
  label: "Book a Call",
  href: "/contact",
};
