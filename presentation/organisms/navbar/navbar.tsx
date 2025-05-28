"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/presentation/atoms/button/button";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Instagram,
  Facebook,
  Youtube,
  User,
  LogOut,
  Settings,
  MapPinned,
} from "lucide-react";
import { Logo } from "@/presentation/atoms/logo/logo";
import { NavCard } from "@/presentation/atoms/nav-card/nav-card";
import { NavAreaCard } from "@/presentation/atoms/nav-card/nav-area-card";
import { useUser } from "@/context/UserContext";
import AuthViewModel from "@/presentation/pages/auth/AuthViewModel"; // Import AuthViewModel
import { navItems } from "./navItems";
import { ProfileDrawer } from "@/presentation/atoms/drawer/drawer";

interface NavbarProps {
  className?: string;
}

const SocialLinks = () => (
  <div className="fixed bottom-5 right-8 flex gap-4">
    {[
      { icon: Facebook, href: "#" },
      { icon: Instagram, href: "#" },
      { icon: Youtube, href: "#" },
    ].map(({ icon: Icon, href }, idx) => (
      <a
        key={href + idx}
        href={href}
        className="w-8 h-8 rounded-full bg-[#8ECF0A] flex items-center justify-center text-[#060B20] hover:bg-[#8ab82e] transition-colors"
      >
        <Icon className="h-4 w-4" />
      </a>
    ))}
  </div>
);

const MobileUserProfile = ({ user, isMenuOpen }: { user: any; isMenuOpen: boolean }) => {
  if (!user || !isMenuOpen) return null;
  return (
    <div className="sm:hidden">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8ECF0A] via-[#39cac0] to-[#8ECF0A] flex items-center justify-center " />
        <div className="flex flex-col text-left">
          <span className="font-semibold text-[#060B20]">{user.name}</span>
          <span className="text-sm text-gray-500">{user.email}</span>
        </div>
      </div>
    </div>
  );
};

const MobileAuthButtons = ({
  isLoggedIn,
  handleLogout,
}: {
  isLoggedIn: boolean;
  handleLogout: () => void;
}) => (
  <div className="sm:hidden mb-20 flex flex-col gap-4 w-4/5">
    {isLoggedIn ? (
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
        <Link href="/register">
          <Button className="flex items-center gap-2 bg-[#f5f5f5] text-[#060B20] hover:bg-[#e5e5e5] rounded-lg py-3 px-4 max-[400px]:text-base text-lg font-semibold justify-start w-auto max-w-[200px]">
            <User className="h-5 w-5" />
            Register
          </Button>
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-2 text-black hover:text-white rounded-full py-3 px-4 max-[400px]:text-base text-lg font-semibold justify-start w-auto max-w-[200px]"
          style={{ background: "linear-gradient(135deg, #8ECF0A 0%, #2EBAC6 100%)" }}
        >
          <LogOut className="h-5 w-5" />
          Log In
        </Link>
      </>
    )}
  </div>
);

const DesktopAuthButtons = ({
  isLoggedIn,
  user,
  handleLogout,
  drawerOpen,
  setDrawerOpen,
  onOpenDrawer,
}: {
  isLoggedIn: boolean;
  user: any;
  handleLogout: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  onOpenDrawer: () => void;
}) => {
  if (!isLoggedIn) {
    return (
      <>
        <Link href="/register" className="hidden sm:block">
          <Button className="rounded-full bg-[#8ECF0A] text-[#060B20] hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] px-5 py-1 font-bold text-[14px] h-8 transition-all flex items-center justify-center">
            Register
          </Button>
        </Link>
        <Link
          href="/login"
          className="hidden sm:block rounded-full bg-white text-[#8ECF0A] border border-[#8ECF0A] hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] px-5 py-1 font-bold text-[14px] h-8 transition-all flex items-center justify-center"
        >
          Log In
        </Link>
      </>
    );
  }
  // Si está logueado, muestra solo el área de perfil clickeable
  return (
    <>
      <div
        className="hidden sm:flex items-center cursor-pointer bg-[#ebedf2] px-3 py-2 rounded-full gap-2 group"
        onClick={onOpenDrawer}
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#8ECF0A] via-[#39cac0] to-[#8ECF0A] flex items-center justify-center transition-all group-hover:shadow-[0_0_15px_rgba(142,207,10,0.7)]" />
        <span className="text-[#13103A] font-semibold text-[13px]">{user?.name || "User"}</span>
      </div>
      <ProfileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        profileName={user?.name}
        email={user?.email}
        phone={user?.phone}
      />
    </>
  );
};

const DesktopNav = ({ navItems, activeDropdown, setActiveDropdown, pathname }: any) => (
  <nav className="hidden lg:flex gap-6 items-center">
    {navItems.map((item: any) => (
      <div key={item.label + item.href} className="relative">
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
);

const MobileNav = ({
  navItems,
  mobileDropdowns,
  toggleMobileDropdown,
  areaDropdowns,
  toggleAreaDropdown,
}: any) => (
  <nav className="flex flex-col space-y-4 flex-1 justify-center py-8">
    {navItems.map((item: any) => (
      <div key={item.label + item.href} className="py-2 border-b border-gray-200 w-4/5">
        {item.hasDropdown ? (
          <MobileDropdown
            item={item}
            mobileDropdowns={mobileDropdowns}
            toggleMobileDropdown={toggleMobileDropdown}
            areaDropdowns={areaDropdowns}
            toggleAreaDropdown={toggleAreaDropdown}
          />
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
);

const MobileDropdown = ({
  item,
  mobileDropdowns,
  toggleMobileDropdown,
  areaDropdowns,
  toggleAreaDropdown,
}: any) => (
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

    <div
      className={cn(
        "overflow-hidden transition-all duration-300",
        mobileDropdowns[item.label] ? "mt-3 max-h-[500px]" : "max-h-0"
      )}
    >
      {item.dropdownContent?.map((content: any) =>
        content.areaLinks ? (
          <MobileAreaDropdown
            key={content.label + content.href}
            content={content}
            areaDropdowns={areaDropdowns}
            toggleAreaDropdown={toggleAreaDropdown}
          />
        ) : (
          <Link
            key={content.label + content.href}
            href={content.href}
            className="block py-2 max-[400px]:text-base text-lg text-[#060B20]/80 hover:text-[#8ECF0A]"
          >
            {content.label}
          </Link>
        )
      )}
    </div>
  </>
);

const MobileAreaDropdown = ({ content, areaDropdowns, toggleAreaDropdown }: any) => (
  <div className="mb-4">
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

    <div
      className={cn(
        "ml-4 overflow-hidden transition-all duration-300",
        areaDropdowns[content.label] ? "max-h-[300px]" : "max-h-0"
      )}
    >
      {content.areaLinks.map((areaLink: any) => (
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
            <div
              className={cn(
                "ml-7 mt-1 flex flex-wrap gap-1 overflow-hidden transition-all duration-300",
                areaDropdowns[areaLink.name] ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              {areaLink.subLinks.map((subLink: any) => (
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
);

const DesktopDropdown = ({ activeDropdown, navItems, setActiveDropdown }: any) => (
  <div
    className={cn(
      "w-full bg-[#fafafa] shadow-lg overflow-hidden hidden lg:block fixed left-0 top-[72px] z-[60]",
      activeDropdown
        ? "transition-all duration-500 ease-in-out opacity-100 max-h-[1000px] transform-gpu"
        : "opacity-0 max-h-0"
    )}
    style={{ width: "100vw" }}
  >
    <div className="container mx-auto px-4 md:px-8 py-12 pb-4">
      <div className="max-w-7xl mx-auto">
        {navItems.map(
          (item: any) =>
            item.hasDropdown && (
              <div
                key={item.label}
                className={cn(
                  "grid gap-8",
                  item.dropdownColumns === 1 && "grid-cols-1",
                  item.dropdownColumns === 2 && "grid-cols-2",
                  item.dropdownColumns === 3 && "grid-cols-3",
                  item.dropdownColumns === 4 && "grid-cols-4",
                  activeDropdown === item.label ? "" : "hidden"
                )}
              >
                {item.dropdownContent?.map((content: any) =>
                  content.areaLinks ? (
                    <NavAreaCard
                      key={content.label + content.href}
                      title={content.label}
                      links={content.areaLinks.map((link: any) => ({
                        name: link.name,
                        href: link.href,
                        subLinks: link.subLinks || [],
                      }))}
                      onClick={() => setActiveDropdown(null)}
                      className="w-full"
                    />
                  ) : (
                    <NavCard
                      key={content.label + content.href}
                      title={content.label}
                      description={content.description}
                      iconUrl={content.icon}
                      href={content.href}
                      onClick={() => setActiveDropdown(null)}
                      className="w-full"
                    />
                  )
                )}
              </div>
            )
        )}

        <div className="flex justify-end mt-8 mb-2">
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 py-3 text-[16px] font-[600] bg-[#8ECF0A] text-black hover:bg-[#8ab82e] hover:text-white hover:shadow-[0_0_15px_rgba(142,207,10,0.7)] transition-all"
          >
            <Link href="/contact">Get a free consultation!</Link>
          </Button>
        </div>
      </div>
    </div>
  </div>
);

// Botón hamburguesa animado clásico (X al abrir)
function HamburgerButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      className="relative w-9 h-9 flex flex-col items-center justify-center lg:hidden"
      onClick={onClick}
      aria-label="Toggle menu"
      type="button"
      style={{ outline: "none", border: "none" }}
    >
      {/* Línea superior */}
      <span
        className={`block absolute left-2 right-2 h-0.5 bg-white rounded transition-all duration-200 ${isOpen ? "top-5 rotate-45" : "top-3 rotate-0"}`}
      />
      {/* Línea central */}
      <span
        className={`block absolute left-2 right-2 h-0.5 bg-white rounded transition-all duration-200 ${isOpen ? "opacity-0" : "top-5 opacity-100"}`}
      />
      {/* Línea inferior */}
      <span
        className={`block absolute left-2 right-2 h-0.5 bg-white rounded transition-all duration-200 ${isOpen ? "top-5 -rotate-45" : "top-7 rotate-0"}`}
      />
    </button>
  );
}

export function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<Record<string, boolean>>({});
  const [areaDropdowns, setAreaDropdowns] = useState<Record<string, boolean>>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const { user, isLoggedIn, setUser, setIsLoggedIn } = useUser();
  console.log("userNavbar", user);
  const { logout: authLogout } = AuthViewModel();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Cierra los dropdowns móviles al cerrar el menú móvil
  useEffect(() => {
    if (!isMenuOpen) {
      setMobileDropdowns({});
      setAreaDropdowns({});
    }
  }, [isMenuOpen]);

  // Cierra los dropdowns de escritorio y móviles al cambiar de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setActiveDropdown(null);
      setMobileDropdowns({});
      setAreaDropdowns({});
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Detectar scroll para cambiar el fondo del navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0 && !hasScrolled) {
        setHasScrolled(true);
      } else if (scrollPosition === 0 && hasScrolled) {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const toggleAreaDropdown = (areaName: string) => {
    setAreaDropdowns((prev) => ({
      ...prev,
      [areaName]: !prev[areaName],
    }));
  };

  const handleLogout = async () => {
    const result = await authLogout();
    if (result.success) {
      setUser(null);
      setIsLoggedIn(false);
      window.location.href = "/login";
    } else {
      console.error("Logout failed:", result.message);
      alert(`Logout failed: ${result.message}`);
    }
  };

  // Nueva función para abrir el drawer y cerrar los dropdowns
  const handleOpenDrawer = () => {
    setActiveDropdown(null);
    setMobileDropdowns({});
    setAreaDropdowns({});
    setDrawerOpen(true);
  };

  return (
    <>
      <header
        className={cn(
          "w-full py-4 shadow-lg lg:shadow-none",
          hasScrolled && "bg-[#020301de]",
          "fixed top-0 left-0 z-50",
          className
        )}
      >
        <div className="w-full px-4 lg:px-8">
          <div className="flex items-center justify-between py-0 h-[40px]">
            <Logo />

            <DesktopNav
              navItems={navItems}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              pathname={pathname}
            />

            <div className="flex items-center gap-[20px] lg:gap-3">
              <DesktopAuthButtons
                isLoggedIn={isLoggedIn}
                user={user}
                handleLogout={handleLogout}
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                onOpenDrawer={handleOpenDrawer}
              />
              {/* Botón hamburguesa animado clásico */}
              <HamburgerButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)} />
            </div>
          </div>
        </div>
      </header>

      <DesktopDropdown
        activeDropdown={activeDropdown}
        navItems={navItems}
        setActiveDropdown={setActiveDropdown}
      />

      {/* Overlay y panel móvil solo se montan si isMenuOpen es true */}
      {isMenuOpen && (
        <div className="fixed left-0 right-0 z-[70] lg:hidden flex pt-0 top-[72px] h-[calc(100vh-72px)] bg-black/80 backdrop-blur-sm visible">
          <div
            className={cn(
              "bg-[#14171b] h-full p-4 md:p-8",
              "w-[30%] max-[500px]:w-[20%] md:w-auto md:min-w-[200px]"
            )}
          >
            <div className="hidden md:block opacity-65">
              <Logo className="mb-8" />
            </div>
          </div>

          <div
            className={cn(
              "bg-white h-full relative p-8 flex flex-col justify-between overflow-y-auto",
              "w-[70%] max-[500px]:w-[80%] md:flex-1"
            )}
          >
            <MobileUserProfile user={user} isMenuOpen={isMenuOpen} />

            <MobileNav
              navItems={navItems}
              mobileDropdowns={mobileDropdowns}
              toggleMobileDropdown={toggleMobileDropdown}
              areaDropdowns={areaDropdowns}
              toggleAreaDropdown={toggleAreaDropdown}
            />

            <MobileAuthButtons isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

            <SocialLinks />
          </div>
        </div>
      )}
    </>
  );
}
