"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/presentation/atoms/button/button";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "@/presentation/atoms/logo/logo";

const navItems = [
  { label: "Services", href: "#", hasDropdown: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const serviceItems = [
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
  {
    label: "Graphic Design",
    href: "/graphic-design",
    description: "Visual branding that captures your company's essence",
  },
  {
    label: "E-commerce Solutions",
    href: "/ecommerce",
    description: "Online stores that drive sales and revenue",
  },
  {
    label: "SEO Services",
    href: "/seo",
    description: "Improve your visibility in search engine results",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full py-4 z-50 absolute top-0 left-0 right-0">
      <div className="container flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <div
              key={item.href}
              className="relative"
              ref={item.hasDropdown ? servicesRef : undefined}
            >
              {item.hasDropdown ? (
                <button
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                    isServicesOpen ? "text-primary" : "text-white"
                  )}
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  onMouseEnter={() => setIsServicesOpen(true)}
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4" />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : "text-white"
                  )}
                >
                  {item.label}
                </Link>
              )}

              {/* Services dropdown */}
              {item.hasDropdown && isServicesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 bg-secondary border border-gray-800 rounded-md shadow-lg z-50"
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <div className="p-4 grid gap-3">
                    {serviceItems.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block group"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <div className="font-medium text-white group-hover:text-primary transition-colors">
                          {service.label}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{service.description}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full h-10 px-6 text-sm font-medium transition-colors border border-primary text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
          >
            Log In
          </Link>

          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-full h-10 px-6 text-sm font-medium transition-colors bg-primary text-secondary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
          >
            Register
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 bg-secondary z-50 border-t border-gray-800">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.href}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        className="flex items-center justify-between w-full text-sm font-medium text-white"
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isServicesOpen && (
                        <div className="mt-2 ml-4 space-y-2">
                          {serviceItems.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              className="block py-1 text-sm text-gray-300 hover:text-primary"
                              onClick={() => {
                                setIsServicesOpen(false);
                                setIsMenuOpen(false);
                              }}
                            >
                              {service.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === item.href ? "text-primary" : "text-white"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full h-10 w-full text-sm font-medium transition-colors border border-primary text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full h-10 w-full text-sm font-medium transition-colors bg-primary text-secondary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
