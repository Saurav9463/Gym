import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? Math.min((scrollY / docH) * 100, 100) : 0);
    };
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
        className={`fixed top-0 w-full z-[1001] transition-all duration-400 ${
          scrolled || isOpen
            ? "bg-[#0d0a08]/90 backdrop-blur-2xl border-b border-white/[0.07] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Scroll progress */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-primary transition-all duration-100 z-50"
          style={{ width: `${scrollProgress}%`, boxShadow: "0 0 10px rgba(255,90,31,0.7)" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 sm:h-20 items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <span className="text-primary text-xl">⚡</span>
              <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white">
                KEVIN<span className="text-primary">FITNESS</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    location === link.path ? "text-primary" : "text-white/65 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300 ${location === link.path ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              ))}
              <Link
                href="/book"
                className="ml-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,90,31,0.5)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
              >
                Join Now
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 text-white hover:text-primary transition-colors z-[1002] shrink-0"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="mobile-menu-open fixed inset-0 z-[1000] bg-[#0d0a08]/98 backdrop-blur-2xl flex flex-col overflow-y-auto">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-primary/10 blur-3xl pointer-events-none" />
          <div className="pt-16 sm:pt-20" />
          <div className="flex flex-col items-center justify-center flex-1 py-10 space-y-1 px-6">
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                href={link.path}
                style={{ animationDelay: `${i * 50}ms` }}
                className={`w-full text-center py-4 text-2xl sm:text-3xl font-bold transition-all duration-200 border-b border-white/5 hover:text-primary ${
                  location === link.path ? "text-primary" : "text-white/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/book"
              className="mt-8 w-full py-4 bg-primary text-white text-xl font-bold rounded-full text-center hover:brightness-110 transition-all min-h-[54px] flex items-center justify-center shadow-[0_0_30px_rgba(255,90,31,0.35)]"
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
