export interface TocHeading {
  depth: number;
  slug: string;
  text: string;
}

export interface SectionNavItem {
  href: string;
  label: string;
  current?: boolean;
}

export interface SectionNavLink {
  href: string;
  eyebrow: string;
  label: string;
}

export interface SectionNavigation {
  label: string;
  currentLabel: string;
  items: SectionNavItem[];
  previous?: SectionNavLink;
  next?: SectionNavLink;
}
