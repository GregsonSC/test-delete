"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/presentation/atoms/button/button";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, Instagram, Facebook, Youtube, User, LogOut, Settings, MapPinned } from "lucide-react";
import { Logo } from "@/presentation/atoms/logo/logo";
import { NavCard } from "@/presentation/atoms/nav-card/nav-card";
import { NavAreaCard } from "@/presentation/atoms/nav-card/nav-area-card";
import Image from "next/image";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

interface NavItem {
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

const navItems: NavItem[] = [
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
      // {
      //   label: "Graphic Design",
      //   href: "/graphic-design",
      //   description: "Visual branding that captures your company's essence",

      // }
    ]
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
              { name: "Graphic Design", href: "/service-areas/miami-dade/sunny-isles-beach/graphic-design" }
            ]
          },
          {
            name: "Coral Gables",
            href: "/service-areas/miami-dade/coral-gables",
            subLinks: [
              { name: "Websites", href: "/service-areas/miami-dade/coral-gables/websites" },
              { name: "Marketing", href: "/service-areas/miami-dade/coral-gables/marketing" },
              { name: "Graphic Design", href: "/service-areas/miami-dade/coral-gables/graphic-design" }
            ]
          },
          {
            name: "Key Biscayne",
            href: "/service-areas/miami-dade/key-biscayne",
            subLinks: [
              { name: "Websites", href: "/service-areas/miami-dade/key-biscayne/websites" },
              { name: "Marketing", href: "/service-areas/miami-dade/key-biscayne/marketing" },
              { name: "Graphic Design", href: "/service-areas/miami-dade/key-biscayne/graphic-design" }
            ]
          },
        ]
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
              { name: "Graphic Design", href: "/service-areas/broward/fort-lauderdale/graphic-design" }
            ]
          },
          {
            name: "Hollywood",
            href: "/service-areas/broward/hollywood",
            subLinks: [
              { name: "Websites", href: "/service-areas/broward/hollywood/websites" },
              { name: "Marketing", href: "/service-areas/broward/hollywood/marketing" },
              { name: "Graphic Design", href: "/service-areas/broward/hollywood/graphic-design" }
            ]
          },
          {
            name: "Pompano Beach",
            href: "/service-areas/broward/pompano-beach",
            subLinks: [
              { name: "Websites", href: "/service-areas/broward/pompano-beach/websites" },
              { name: "Marketing", href: "/service-areas/broward/pompano-beach/marketing" },
              { name: "Graphic Design", href: "/service-areas/broward/pompano-beach/graphic-design" }
            ]
          },
        ]
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
              { name: "Graphic Design", href: "/service-areas/palm-beach/west-palm-beach/graphic-design" }
            ]
          },
          {
            name: "Boca Raton",
            href: "/service-areas/palm-beach/boca-raton",
            subLinks: [
              { name: "Websites", href: "/service-areas/palm-beach/boca-raton/websites" },
              { name: "Marketing", href: "/service-areas/palm-beach/boca-raton/marketing" },
              { name: "Graphic Design", href: "/service-areas/palm-beach/boca-raton/graphic-design" }
            ]
          },
          {
            name: "Delray Beach",
            href: "/service-areas/palm-beach/delray-beach",
            subLinks: [
              { name: "Websites", href: "/service-areas/palm-beach/delray-beach/websites" },
              { name: "Marketing", href: "/service-areas/palm-beach/delray-beach/marketing" },
              { name: "Graphic Design", href: "/service-areas/palm-beach/delray-beach/graphic-design" }
            ]
          },
        ]
      }
    ]
  },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<Record<string, boolean>>({});
  const [areaDropdowns, setAreaDropdowns] = useState<Record<string, boolean>>({});
  const [isLogged, setIsLogged] = useState(false);
  const userName = "Name"; // This would come from your auth system

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Function to handle mobile dropdown toggle
  const toggleMobileDropdown = (label: string) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  // Function to handle area dropdown toggle
  const toggleAreaDropdown = (areaName: string) => {
    setAreaDropdowns(prev => ({
      ...prev,
      [areaName]: !prev[areaName]
    }));
  };

  // Function to handle login
  const handleLogin = () => {
    setIsLogged(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLogged(false);
  };

  return (
    <>
      <header className={cn(
        "w-full py-4",
        "lg:bg-[#020301] bg-[#191d22]", // Changed to transparent for desktop only
        "lg:static",
        "fixed top-0 left-0",
        "lg:z-40 z-50",
        "lg:shadow-none shadow-lg",
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between px-0 lg:px-8 py-0 lg:py-1.5 h-[40px]">
            <Logo />

            {/* Navigation - Hidden on mobile/tablet */}
            <nav className="hidden lg:flex gap-6 items-center">
              {navItems.map((item) => (
                <div key={item.href} className="relative">
                  {item.hasDropdown ? (
                    <button
                      className={cn(
                        "text-[15px] font-normal transition-colors hover:text-[#8ECF0A] flex items-center gap-1 relative",
                        activeDropdown === item.label
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-[#8ECF0A] via-[#39cac0] to-[#8ECF0A] after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:bottom-[-25px] after:h-[2px] after:w-[120%] after:bg-gradient-to-r after:from-[#8ECF0A] after:via-[#39cac0] after:to-[#8ECF0A]"
                          : "text-white"
                      )}
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    >
                      {item.label}
                      <span className={activeDropdown === item.label ? "text-[#8ECF0A]" : "text-white"}>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            activeDropdown === item.label && "rotate-180"
                          )}
                        />
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "text-[15px] font-normal transition-colors hover:text-[#8ECF0A] relative",
                        pathname === item.href
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-[#8ECF0A] via-[#39cac0] to-[#8ECF0A] after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:bottom-[-28.5px] after:h-[2px] after:w-[130%] after:bg-gradient-to-r after:from-[#8ECF0A] after:via-[#39cac0] after:to-[#8ECF0A]"
                          : "text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Auth buttons and mobile menu */}
            <div className="flex items-center gap-[20px] lg:gap-3">
              {/* Auth buttons - Different styling on mobile vs desktop */}
              <div className="hidden sm:flex gap-[20px]">
                {!isLogged ? (
                  <>
                    <Link href="/register" passHref>
                      <Button
                        className="rounded-full bg-[#8ECF0A] text-[#060B20] hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] px-5 py-1 font-bold text-[14px] h-8 transition-all flex items-center justify-center"
                      >
                        Register
                      </Button>
                    </Link>

                    <Button
                      onClick={handleLogin}
                      className="rounded-full bg-white text-[#8ECF0A] border border-[#8ECF0A] hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] px-5 py-1 font-bold text-[14px] h-8 transition-all flex items-center justify-center"
                    >
                      Log In
                    </Button>
                  </>
                ) : (
                  <Menubar className="border-0 bg-transparent">
                    <MenubarMenu>
                      <MenubarTrigger className="flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0 focus:bg-transparent data-[state=open]:bg-transparent h-8 min-h-0 group">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#8ECF0A] via-[#39cac0] to-[#8ECF0A] flex items-center justify-center transition-all group-hover:shadow-[0_0_15px_rgba(142,207,10,0.7)]">
                          {/* User icon removed */}
                        </div>
                        <span className="text-white font-semibold text-[14px]">{userName}</span>
                      </MenubarTrigger>
                      <MenubarContent className="rounded-md border-0 shadow-md">
                        <MenubarItem className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:text-black">
                          <User className="h-4 w-4" />
                          Profile
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem
                          className="flex items-center gap-2 cursor-pointer hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white"
                          onClick={handleLogout}
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                )}
              </div>

              {/* Mobile menu button - Hidden on desktop */}
              <Button
                variant="ghost"
                size="icon"
                className="text-white p-1 lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="stroke-[3]" /> : <Menu className="stroke-[3]" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dropdown genérico */}
      <div
        className={cn(
          "w-full bg-[#fafafa] shadow-lg overflow-hidden hidden lg:block",
          activeDropdown
            ? "transition-all duration-500 ease-in-out opacity-100 max-h-[1000px] transform-gpu"
            : "opacity-0 max-h-0"
        )}
      >
        <div className="container mx-auto px-4 md:px-8 py-12 pb-4">
          <div className="max-w-7xl mx-auto">
            {navItems.map((item) => (
              item.hasDropdown && (
                <div
                  key={item.label}
                  className={cn(
                    `grid grid-cols-${item.dropdownColumns} gap-8`,
                    activeDropdown === item.label ? "" : "hidden"
                  )}
                >
                  {item.dropdownContent?.map((content) => (
                    content.areaLinks ? (
                      <NavAreaCard
                        key={content.href}
                        title={content.label}
                        links={content.areaLinks.map(link => ({
                          name: link.name,
                          href: link.href,
                          subLinks: link.subLinks || []
                        }))}
                        onClick={() => setActiveDropdown(null)}
                        className="w-full"
                      />
                    ) : (
                      <NavCard
                        key={content.href}
                        title={content.label}
                        description={content.description}
                        iconUrl={content.icon}
                        href={content.href}
                        onClick={() => setActiveDropdown(null)}
                        className="w-full"
                      />
                    )
                  ))}
                </div>
              )
            ))}

            <div className="flex justify-end mt-8 mb-2">
              <Link href="/contact" passHref>
                <Button
                  className="rounded-full bg-[#99cc33] text-black hover:bg-[#8ab82e] hover:text-white hover:shadow-[0_0_15px_rgba(153,204,51,0.7)] px-8 py-3 font-bold text-lg transition-all"
                >
                  Get a free consultation!
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden flex pt-[72px] bg-black/80 backdrop-blur-sm transition-all duration-300 ease-out",
          isMenuOpen
            ? "opacity-100 pointer-events-auto scale-100"
            : "opacity-0 pointer-events-none scale-95"
        )}
        style={{
          transitionProperty: 'opacity, transform',
        }}
      >
        <div className={cn(
          "bg-[#14171b] h-full p-4 md:p-8",
          "w-[30%] max-[500px]:w-[20%] md:w-auto md:min-w-[200px]"
        )}>
          {/* <div className="md:hidden opacity-65">
            <Image
              src="/images/navbar/senavia-small.png"
              alt="Logo"
              width={40}
              height={40}
              className="mb-8"
            />
          </div> */}
          <div className="hidden md:block opacity-65">
            <Logo className="mb-8" />
          </div>
        </div>

        <div className={cn(
          "bg-white h-full relative p-8 flex flex-col justify-between overflow-y-auto",
          "w-[70%] max-[500px]:w-[80%] md:flex-1"
        )}>
          {/* User profile info for mobile only (< 640px) */}
          <div className="sm:hidden">
            {isLogged ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8ECF0A] via-[#39cac0] to-[#8ECF0A] flex items-center justify-center transition-all"></div>
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-[#060B20]">{userName}</span>
                  <span className="text-sm text-gray-500">user@example.com</span>
                </div>
              </div>
            ) : null}
          </div>

          <nav className="flex flex-col space-y-4 flex-1 justify-center py-8">
            {navItems.map((item) => (
              <div key={item.href} className="py-2 border-b border-gray-200 w-4/5">
                {item.hasDropdown ? (
                  <>
                    <button
                      className="group flex items-center w-full max-[400px]:text-xl text-2xl font-semibold text-[#060B20] text-left"
                      onClick={() => toggleMobileDropdown(item.label)}
                    >
                      <span className="flex-1 text-left flex items-center">
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "ml-2 h-5 w-5 transition-transform duration-300",
                            mobileDropdowns[item.label] && "rotate-180"
                          )}
                        />
                      </span>
                    </button>

                    <div className={cn(
                      "overflow-hidden transition-all duration-300",
                      mobileDropdowns[item.label] ? "mt-3 max-h-[500px] overflow-y-auto" : "max-h-0"
                    )}>
                      {item.dropdownContent?.map((content) => (
                        content.areaLinks ? (
                          <div key={content.href} className="mb-4">
                            <button
                              onClick={() => toggleAreaDropdown(content.label)}
                              className="w-full py-2 max-[400px]:text-base text-lg font-semibold text-[#060B20]/80 hover:text-[#8ECF0A] flex items-center justify-between"
                            >
                              <span>{content.label}</span>
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 transition-transform duration-300",
                                  areaDropdowns[content.label] && "rotate-180"
                                )}
                              />
                            </button>

                            <div className={cn(
                              "ml-4 overflow-hidden transition-all duration-300",
                              areaDropdowns[content.label] ? "max-h-[300px]" : "max-h-0"
                            )}>
                              {content.areaLinks.map(areaLink => (
                                <div key={areaLink.href} className="mb-2">
                                  <button
                                    onClick={() => toggleAreaDropdown(areaLink.name)}
                                    className="w-full py-1 max-[400px]:text-sm text-base text-[#060B20]/80 hover:text-[#8ECF0A] flex items-center justify-between"
                                  >
                                    <div className="flex items-center">
                                      <span className="w-5 h-5 mr-2 flex items-center justify-center">
                                        <MapPinned className="h-4 w-4" />
                                      </span>
                                      {areaLink.name}
                                    </div>
                                    <ChevronDown
                                      className={cn(
                                        "h-4 w-4 transition-transform duration-300",
                                        areaDropdowns[areaLink.name] && "rotate-180"
                                      )}
                                    />
                                  </button>

                                  {areaLink.subLinks && (
                                    <div className={cn(
                                      "ml-7 mt-1 flex flex-wrap gap-1 overflow-hidden transition-all duration-300",
                                      areaDropdowns[areaLink.name] ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
                                    )}>
                                      {areaLink.subLinks.map(subLink => (
                                        <Link
                                          key={subLink.href}
                                          href={subLink.href}
                                          className="inline-block py-1 px-3 max-[400px]:text-xs text-sm text-[#060B20]/70 hover:text-[#8ECF0A] rounded-full bg-[#f0f0f0]"
                                        >
                                          {subLink.name}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            key={content.href}
                            href={content.href}
                            className="block py-2 max-[400px]:text-base text-lg text-[#060B20]/80 hover:text-[#8ECF0A]"
                          >
                            {content.label}
                          </Link>
                        )
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block max-[400px]:text-xl text-2xl font-semibold text-[#060B20] hover:text-[#8ECF0A]"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Botones de Settings y Log Out o Register y Login - solo para móvil (<640px) */}
          <div className="sm:hidden mb-20 flex flex-col gap-4 w-4/5">
            {isLogged ? (
              <>
                <Button className="flex items-center gap-2 bg-[#f5f5f5] text-[#060B20] hover:bg-[#e5e5e5] rounded-lg py-3 px-4 max-[400px]:text-base text-lg font-semibold justify-start w-auto max-w-[200px]">
                  <Settings className="h-5 w-5" />
                  Settings
                </Button>

                <Button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-black hover:text-white rounded-full py-3 px-4 max-[400px]:text-base text-lg font-semibold justify-start w-auto max-w-[200px]"
                  style={{ background: "linear-gradient(135deg, #8ECF0A 0%, #2EBAC6 100%)" }}
                >
                  <LogOut className="h-5 w-5" />
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button className="flex items-center gap-2 bg-[#f5f5f5] text-[#060B20] hover:bg-[#e5e5e5] rounded-lg py-3 px-4 max-[400px]:text-base text-lg font-semibold justify-start w-auto max-w-[200px]">
                  <User className="h-5 w-5" />
                  Register
                </Button>
                <Button
                  onClick={handleLogin}
                  className="flex items-center gap-2 text-black hover:text-white rounded-full py-3 px-4 max-[400px]:text-base text-lg font-semibold justify-start w-auto max-w-[200px]"
                  style={{ background: "linear-gradient(135deg, #8ECF0A 0%, #2EBAC6 100%)" }}
                >
                  <LogOut className="h-5 w-5" />
                  Log In
                </Button>
              </>
            )}
          </div>

          <div className="fixed bottom-5 right-8 flex gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-[#8ECF0A] flex items-center justify-center text-[#060B20]">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-[#8ECF0A] flex items-center justify-center text-[#060B20]">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-[#8ECF0A] flex items-center justify-center text-[#060B20]">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
