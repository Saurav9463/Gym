import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLocation("/admin/login");
      } else {
        setSession(session);
      }
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) setLocation("/admin/login");
    });

    return () => subscription.unsubscribe();
  }, [setLocation]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) return null;

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Bookings", path: "/admin/bookings" },
    { label: "Plans", path: "/admin/plans" },
    { label: "Trainers", path: "/admin/trainers" },
    { label: "Gallery", path: "/admin/gallery" },
    { label: "Messages", path: "/admin/messages" },
    { label: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Mobile Sidebar Overlay */}
      {isMobile && isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-60 bg-[#111] border-r border-border flex flex-col transition-transform z-[101] 
          ${isMobile ? (isMobileOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}`}
      >
        <div className="p-6 border-b border-border flex justify-between items-center">
          <Link href="/admin/dashboard" className="font-display text-2xl tracking-wider">
            ADMIN<span className="text-primary">PANEL</span>
          </Link>
          {isMobile && (
            <button onClick={() => setIsMobileOpen(false)} className="text-muted-foreground hover:text-white">
              ✕
            </button>
          )}
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => isMobile && setIsMobileOpen(false)}
              className={`block px-4 py-3 text-sm font-mono tracking-wide uppercase transition-colors rounded-none ${
                location === item.path 
                  ? "bg-primary text-background font-bold" 
                  : "text-muted-foreground hover:bg-[#1a1a1a] hover:text-white border border-transparent"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button 
            onClick={handleSignOut}
            className="w-full px-4 py-3 text-sm font-mono text-destructive border border-destructive hover:bg-destructive hover:text-white transition-colors uppercase tracking-wide"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 min-h-screen flex flex-col ${!isMobile ? 'ml-60' : ''}`}>
        {isMobile && (
          <header className="h-16 border-b border-border flex items-center px-4 sticky top-0 bg-background z-[90]">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="text-white p-2 border border-border"
            >
              MENU
            </button>
          </header>
        )}
        <div className="p-4 sm:p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
