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
            ? "bg-[#0c0d12]/92 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Scroll progress bar */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-primary transition-all duration-100 z-50"
          style={{ width: `${scrollProgress}%`, boxShadow: "0 0 8px rgba(201,30,57,0.7)" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 sm:h-20 items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              {/* Cut-corner logo mark */}
              <span
                className="w-7 h-7 bg-primary flex items-center justify-center shrink-0"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)" }}
              >
                <span className="text-white font-bold text-xs leading-none">KF</span>
              </span>
              <span
                className="font-display tracking-wider text-white"
                style={{ fontSize: "1.25rem", letterSpacing: "0.1em" }}
              >
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
                    location === link.path ? "text-primary" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1.5px] bg-primary transition-all duration-300 ${
                      location === link.path ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
              <Link
                href="/book"
                className="kf-btn-primary ml-2"
                style={{ fontSize: "0.85rem", padding: "10px 24px" }}
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
        <div className="mobile-menu-open fixed inset-0 z-[1000] bg-[#0c0d12]/98 backdrop-blur-2xl flex flex-col overflow-y-auto">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-primary/8 blur-3xl pointer-events-none" />
          <div className="pt-16 sm:pt-20" />
          <div className="flex flex-col items-center justify-center flex-1 py-10 space-y-0 px-6">
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                href={link.path}
                style={{ animationDelay: `${i * 50}ms` }}
                className={`w-full text-center py-5 font-display tracking-widest transition-all duration-200 border-b border-white/[0.06] ${
                  location === link.path
                    ? "text-primary"
                    : "text-white/75 hover:text-white"
                }`}
                onMouseEnter={undefined}
              >
                <span style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", letterSpacing: "0.12em" }}>
                  {link.name}
                </span>
              </Link>
            ))}
            <Link
              href="/book"
              className="kf-btn-primary mt-10 w-full justify-center"
              style={{ fontSize: "1.1rem", padding: "16px 36px" }}
            >
              Join Kevin Fitness
            </Link>
          </div>
          <div className="pb-8 text-center">
            <p className="text-[11px] text-white/20 tracking-[0.3em] uppercase font-mono">
              Jalandhar · Est. 2019 · 6 AM – 10 PM
            </p>
          </div>
        </div>
      )}
    </>
  );
}
