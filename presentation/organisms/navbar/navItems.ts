export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownColumns?: number;
  dropdownContent?: Array<{
    label: string;
    href: string;
    description: string;
    icon?: string;
    areaLinks?: Array<{
      name: string;
      href: string;
      subLinks?: Array<{
        name: string;
        href: string;
      }>;
    }>;
  }>;
}

export const navItems: NavItem[] = [
  {
    label: "Services",
    href: "#",
    hasDropdown: true,
    dropdownColumns: 2,
    dropdownContent: [
      {
        label: "Web Design & Development",
        href: "/websites",
        description: "Custom websites that convert visitors into customers",
      },
      {
        label: "Digital Marketing",
        href: "/marketing",
        description: "Strategies to grow your online presence and generate leads",
      },
    ],
  },
  {
    label: "Service Areas",
    href: "/service-areas",
    hasDropdown: true,
    dropdownColumns: 3,
    dropdownContent: [
      {
        label: "Miami-Dade County",
        href: "/service-areas/miami-dade",
        description: "Service areas in Miami-Dade County",
        icon: "/images/navbar/location.svg",
        areaLinks: [
          {
            name: "Sunny Isles Beach",
            href: "/service-areas/miami-dade/sunny-isles-beach",
            subLinks: [
              { name: "Websites", href: "/service-areas/miami-dade/sunny-isles-beach/websites" },
              { name: "Marketing", href: "/service-areas/miami-dade/sunny-isles-beach/marketing" },
            ],
          },
          {
            name: "Coral Gables",
            href: "/service-areas/miami-dade/coral-gables",
            subLinks: [
              { name: "Websites", href: "/service-areas/miami-dade/coral-gables/websites" },
              { name: "Marketing", href: "/service-areas/miami-dade/coral-gables/marketing" },
            ],
          },
          {
            name: "Key Biscayne",
            href: "/service-areas/miami-dade/key-biscayne",
            subLinks: [
              { name: "Websites", href: "/service-areas/miami-dade/key-biscayne/websites" },
              { name: "Marketing", href: "/service-areas/miami-dade/key-biscayne/marketing" },
            ],
          },
        ],
      },
      {
        label: "Broward County",
        href: "/service-areas/broward",
        description: "Service areas in Broward County",
        icon: "/images/navbar/location.svg",
        areaLinks: [
          {
            name: "Fort Lauderdale",
            href: "/service-areas/broward/fort-lauderdale",
            subLinks: [
              { name: "Websites", href: "/service-areas/broward/fort-lauderdale/websites" },
              { name: "Marketing", href: "/service-areas/broward/fort-lauderdale/marketing" },
            ],
          },
          {
            name: "Hollywood",
            href: "/service-areas/broward/hollywood",
            subLinks: [
              { name: "Websites", href: "/service-areas/broward/hollywood/websites" },
              { name: "Marketing", href: "/service-areas/broward/hollywood/marketing" },
            ],
          },
          {
            name: "Pompano Beach",
            href: "/service-areas/broward/pompano-beach",
            subLinks: [
              { name: "Websites", href: "/service-areas/broward/pompano-beach/websites" },
              { name: "Marketing", href: "/service-areas/broward/pompano-beach/marketing" },
            ],
          },
        ],
      },
      {
        label: "Palm Beach County",
        href: "/service-areas/palm-beach",
        description: "Service areas in Palm Beach County",
        icon: "/images/navbar/location.svg",
        areaLinks: [
          {
            name: "West Palm Beach",
            href: "/service-areas/palm-beach/west-palm-beach",
            subLinks: [
              { name: "Websites", href: "/service-areas/palm-beach/west-palm-beach/websites" },
              { name: "Marketing", href: "/service-areas/palm-beach/west-palm-beach/marketing" },
            ],
          },
          {
            name: "Boca Raton",
            href: "/service-areas/palm-beach/boca-raton",
            subLinks: [
              { name: "Websites", href: "/service-areas/palm-beach/boca-raton/websites" },
              { name: "Marketing", href: "/service-areas/palm-beach/boca-raton/marketing" },
            ],
          },
          {
            name: "Delray Beach",
            href: "/service-areas/palm-beach/delray-beach",
            subLinks: [
              { name: "Websites", href: "/service-areas/palm-beach/delray-beach/websites" },
              { name: "Marketing", href: "/service-areas/palm-beach/delray-beach/marketing" },
            ],
          },
        ],
      },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About Us", href: "/about" },
];
