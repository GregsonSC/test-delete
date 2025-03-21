"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/presentation/atoms/button/button";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, Instagram, Facebook, Youtube } from "lucide-react";
import { Logo } from "@/presentation/atoms/logo/logo";
import { NavCard } from "@/presentation/atoms/nav-card/nav-card";
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownContent?: Array<{
    label: string;
    href: string;
    description: string;
    icon?: string;
  }>;
}

const navItems: NavItem[] = [
  {
    label: "Services",
    href: "#",
    hasDropdown: true,
    dropdownContent: [
      {
        label: "Web Design & Development",
        href: "/websites",
        description: "Custom websites that convert visitors into customers",
        icon: "/icons/default-service.svg"
      },
      {
        label: "Digital Marketing",
        href: "/marketing",
        description: "Strategies to grow your online presence and generate leads",
        icon: "/icons/default-service.svg"
      },
      {
        label: "Graphic Design",
        href: "/graphic-design",
        description: "Visual branding that captures your company's essence",
        icon: "/icons/default-service.svg"
      }
    ]
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    hasDropdown: true,
    dropdownContent: [
      {
        label: "Project One",
        href: "/portfolio/project-1",
        description: "E-commerce website development",
        icon: "/icons/portfolio-icon.svg"
      },
      {
        label: "Project Two",
        href: "/portfolio/project-2",
        description: "Corporate website redesign",
        icon: "/icons/portfolio-icon.svg"
      },
      {
        label: "Project Three",
        href: "/portfolio/project-3",
        description: "Mobile app development",
        icon: "/icons/portfolio-icon.svg"
      },
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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Function to handle mobile dropdown toggle
  const toggleMobileDropdown = (label: string) => {
    setMobileDropdowns(prev => ({
      // If clicking the same dropdown that's open, close it
      // Otherwise, only open the clicked dropdown
      [label]: !prev[label] ? true : false
    }));
  };

  return (
    <>
      <header className={cn(
        "w-full py-4 bg-[#191d22]",
        "lg:static",
        "fixed top-0 left-0",
        "lg:z-40 z-50",
        "lg:shadow-none shadow-lg",
        

      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between px-0 lg:px-8 py-0 lg:py-1.5">
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
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-[#8ECF0A] via-[#39cac0] to-[#8ECF0A] after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:bottom-[-27px] after:h-[2px] after:w-[120%] after:bg-gradient-to-r after:from-[#8ECF0A] after:via-[#39cac0] after:to-[#8ECF0A]" 
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
              
                <Button
                  className="rounded-full bg-[#8ECF0A] text-[#060B20] hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] px-5 py-1 font-bold text-[14px] h-8 transition-all flex items-center justify-center"
                >
                  Register
                </Button>

                <Button
                  className="rounded-full bg-white text-[#8ECF0A] border border-[#8ECF0A] hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] px-5 py-1 font-bold text-[14px] h-8 transition-all flex items-center justify-center"
                >
                  Log In
                </Button>
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
        <div className="container mx-auto px-4 md:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            {navItems.map((item) => (
              item.hasDropdown && (
                <div 
                  key={item.label}
                  className={cn(
                    "grid grid-cols-3 gap-8",
                    activeDropdown === item.label ? "" : "hidden"
                  )}
                >
                  {item.dropdownContent?.map((content) => (
                    <NavCard
                      key={content.href}
                      title={content.label}
                      description={content.description}
                      iconUrl={content.icon}
                      href={content.href}
                      onClick={() => setActiveDropdown(null)}
                      className="w-full"
                    />
                  ))}
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex pt-[72px]">
          <div className={cn(
            "bg-[#14171b] h-full p-8",
            "w-[30%] md:w-auto md:min-w-[200px]"
          )}>
            <div className="md:hidden opacity-65">
              <Image 
                src="/logo-alternative.png"
                alt="Logo"
                width={120}
                height={40}
                className="mb-8"
              />
            </div>
            <div className="hidden md:block opacity-65">
              <Logo className="mb-8" />
            </div>
          </div>

          <div className={cn(
            "bg-white h-full relative p-8",
            "w-[70%] md:flex-1"
          )}>
            <nav className="flex flex-col h-full justify-center max-w-[400px]">
              {navItems.map((item) => (
                <div key={item.href} className="py-4 border-b border-gray-200">
                  {item.hasDropdown ? (
                    <>
                      <button
                        className="group flex items-center w-full text-2xl font-semibold text-[#060B20]"
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
                        mobileDropdowns[item.label] ? "max-h-96 mt-4" : "max-h-0"
                      )}>
                        {item.dropdownContent?.map((content) => (
                          <Link
                            key={content.href}
                            href={content.href}
                            className="block py-2 text-lg text-[#060B20]/80 hover:text-[#8ECF0A]"
                          >
                            {content.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-2xl font-semibold text-[#060B20] hover:text-[#8ECF0A]"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="absolute bottom-8 right-8 flex gap-4">
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
      )}
    </>
  );
}
