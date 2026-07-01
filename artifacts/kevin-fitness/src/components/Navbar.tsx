import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Dumbbell } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

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
      <nav className="fixed top-0 w-full z-[1001] bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Dumbbell className="text-primary w-8 h-8 group-hover:rotate-12 transition-transform" />
              <span className="font-display text-2xl tracking-wider text-foreground">
                KEVIN<span className="text-primary">FITNESS</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-medium tracking-wide uppercase font-display transition-colors hover:text-primary ${
                    location === link.path ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/book"
                className="px-6 py-2 bg-primary text-black font-display tracking-widest uppercase hover:bg-white transition-all"
              >
                Join Now
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center z-[1002]">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground hover:text-primary transition-colors p-2"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[1000] bg-background flex flex-col items-center justify-center space-y-8 pt-20">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-4xl font-display tracking-widest uppercase transition-colors hover:text-primary ${
                location === link.path ? "text-primary" : "text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/book"
            className="mt-8 px-12 py-4 border border-primary text-primary text-2xl font-display tracking-widest uppercase hover:bg-primary hover:text-background transition-all"
          >
            Join Now
          </Link>
        </div>
      )}
    </>
  );
}
