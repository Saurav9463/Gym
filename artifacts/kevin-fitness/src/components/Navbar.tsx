import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Dumbbell } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Memberships", path: "/memberships" },
    { name: "Trainers", path: "/trainers" },
    { name: "Schedule", path: "/schedule" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[1001] transition-all duration-300 ${
          scrolled || isOpen
            ? "bg-background/98 backdrop-blur-md border-b border-border shadow-md"
            : "bg-background/80 backdrop-blur border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 sm:h-20 items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <Dumbbell className="text-primary w-6 h-6 sm:w-8 sm:h-8 group-hover:rotate-12 transition-transform" />
              <span className="font-display text-xl sm:text-2xl tracking-wider text-foreground">
                KEVIN<span className="text-primary">FITNESS</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-medium tracking-wide uppercase font-display transition-colors hover:text-primary whitespace-nowrap ${
                    location === link.path ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/book"
                className="ml-2 px-5 py-2.5 bg-primary text-black font-display tracking-widest uppercase hover:bg-white transition-all min-h-[44px] flex items-center whitespace-nowrap"
              >
                Join Now
              </Link>
            </div>

            {/* Mobile Toggle — 44×44 touch target */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center w-11 h-11 text-foreground hover:text-primary transition-colors z-[1002] shrink-0"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="mobile-menu-open fixed inset-0 z-[1000] bg-background flex flex-col overflow-y-auto">
          {/* Top padding to clear navbar */}
          <div className="pt-16 sm:pt-20" />

          <div className="flex flex-col items-center justify-center flex-1 py-10 space-y-2 px-6">
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                href={link.path}
                style={{ animationDelay: `${i * 60}ms` }}
                className={`w-full text-center py-4 text-3xl sm:text-4xl font-display tracking-widest uppercase transition-colors border-b border-border/30 hover:text-primary ${
                  location === link.path ? "text-primary" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/book"
              className="mt-6 w-full py-5 bg-primary text-black text-2xl font-display tracking-widest uppercase text-center hover:bg-white transition-all min-h-[56px] flex items-center justify-center"
            >
              Join Now
            </Link>
          </div>

          {/* Footer hint */}
          <div className="pb-8 text-center">
            <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
              Open 6 AM – 10 PM · Daily
            </p>
          </div>
        </div>
      )}
    </>
  );
}
