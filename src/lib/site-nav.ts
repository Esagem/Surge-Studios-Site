export type NavItem = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Mission", href: "/mission" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact Us", href: "/contact-us" },
];

export const PRIMARY_CTA: NavItem = {
  label: "Contact Us",
  href: "/contact-us",
};
