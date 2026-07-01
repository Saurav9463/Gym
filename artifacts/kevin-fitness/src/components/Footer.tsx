import { Link } from "wouter";
import { Dumbbell, MapPin, Phone, Clock, Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <Dumbbell className="text-primary w-8 h-8" />
              <span className="font-display text-3xl tracking-wider text-foreground">
                KEVIN<span className="text-primary">FITNESS</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs mt-4">
              Spacious workout spot with cardio facilities and weight machines alongside diet guidance. Stronger Than Excuses.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl tracking-wider mb-6 text-foreground">Quick Links</h4>
            <ul className="space-y-3 text-muted-foreground font-mono text-sm">
              <li><Link href="/memberships" className="hover:text-primary transition-colors uppercase">Memberships</Link></li>
              <li><Link href="/trainers" className="hover:text-primary transition-colors uppercase">Our Trainers</Link></li>
              <li><Link href="/schedule" className="hover:text-primary transition-colors uppercase">Class Schedule</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors uppercase">Gallery</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl tracking-wider mb-6 text-foreground">Contact</h4>
            <ul className="space-y-4 text-muted-foreground text-sm">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Shoor Market, Jalandhar - Kala Sanghian Rd, Chamiara, Punjab 144002</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="font-mono">090419 81234</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-xl tracking-wider mb-6 text-foreground">Hours</h4>
            <ul className="space-y-4 text-muted-foreground text-sm">
              <li className="flex gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Monday - Sunday</p>
                  <p className="font-mono mt-1">6:00 AM - 10:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground font-mono">
          <p>&copy; {new Date().getFullYear()} Kevin Fitness. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
