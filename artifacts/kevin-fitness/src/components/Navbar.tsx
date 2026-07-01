import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Dumbbell } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        className={`fixed top-0 w-full z-[1001] transition-all duration-500 ${
          scrolled || isOpen
            ? "bg-black/95 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 sm:h-20 items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <Dumbbell className="text-primary w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-display text-xl sm:text-2xl tracking-wider text-white">
                KEVIN<span className="text-primary">FITNESS</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-5 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`nav-link-underline text-[11px] lg:text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-200 ${
                    location === link.path ? "text-primary active" : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/book"
                className="ml-2 px-5 py-2.5 bg-primary text-black font-display text-sm tracking-widest uppercase hover:bg-white transition-all duration-300 min-h-[44px] flex items-center hover:shadow-[0_0_20px_rgba(245,200,0,0.4)] hover:-translate-y-0.5"
              >
                Join Now
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center w-11 h-11 text-white hover:text-primary transition-colors z-[1002] shrink-0"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="mobile-menu-open fixed inset-0 z-[1000] bg-black/98 backdrop-blur-xl flex flex-col overflow-y-auto">
          <div className="pt-16 sm:pt-20" />
          <div className="flex flex-col items-center justify-center flex-1 py-10 space-y-1 px-6">
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                href={link.path}
                style={{ animationDelay: `${i * 50}ms` }}
                className={`w-full text-center py-4 text-3xl sm:text-4xl font-display tracking-widest uppercase transition-all duration-200 border-b border-white/5 hover:text-primary hover:pl-4 ${
                  location === link.path ? "text-primary" : "text-white/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/book"
              className="mt-8 w-full py-5 bg-primary text-black text-2xl font-display tracking-widest uppercase text-center hover:bg-white transition-all min-h-[56px] flex items-center justify-center"
            >
              Join Now
            </Link>
          </div>
          <div className="pb-8 text-center">
            <p className="text-xs text-white/25 tracking-widest uppercase font-mono">Open 6 AM – 10 PM · Daily</p>
          </div>
        </div>
      )}
    </>
  );
}
