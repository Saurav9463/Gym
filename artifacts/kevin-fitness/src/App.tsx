import { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Public Layout
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Public Pages
import Home from "@/pages/Home";
import Memberships from "@/pages/Memberships";
import Trainers from "@/pages/Trainers";
import Gallery from "@/pages/Gallery";
import Schedule from "@/pages/Schedule";
import Contact from "@/pages/Contact";
import Booking from "@/pages/Booking";

// Admin Pages
import AdminLayout from "@/pages/admin/Layout";
import Login from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import BookingsAdmin from "@/pages/admin/Bookings";
import PlansAdmin from "@/pages/admin/Plans";
import TrainersAdmin from "@/pages/admin/TrainersAdmin";
import MessagesAdmin from "@/pages/admin/Messages";
import SettingsAdmin from "@/pages/admin/Settings";

import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function WhatsAppFAB() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href="https://wa.me/919041981234?text=Hi%20Kevin%20Fitness%2C%20I%27d%20like%20to%20know%20more%20about%20your%20memberships."
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="whatsapp-fab"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.8)",
        transition: "opacity 0.4s ease, transform 0.4s ease, box-shadow 0.2s ease",
      }}
    >
      {/* WhatsApp SVG icon */}
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 2C8.268 2 2 8.268 2 16c0 2.67.705 5.176 1.938 7.338L2 30l6.868-1.8A13.944 13.944 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z"
          fill="white"
        />
        <path
          d="M22.406 19.625c-.347-.174-2.056-1.015-2.375-1.13-.319-.114-.552-.174-.785.174-.232.347-.9 1.13-1.103 1.363-.202.232-.405.26-.752.087-.347-.174-1.466-.54-2.79-1.72a10.468 10.468 0 01-1.93-2.4c-.202-.347-.022-.535.152-.708.157-.156.347-.406.52-.609.174-.203.232-.347.347-.58.115-.232.058-.435-.029-.609-.087-.174-.785-1.89-1.074-2.588-.283-.68-.57-.587-.785-.598-.202-.01-.435-.012-.667-.012a1.28 1.28 0 00-.928.435c-.318.347-1.218 1.19-1.218 2.9 0 1.711 1.247 3.363 1.42 3.595.174.232 2.453 3.747 5.944 5.254.831.358 1.48.572 1.986.733.834.265 1.594.228 2.195.138.67-.1 2.056-.84 2.347-1.652.29-.812.29-1.508.203-1.652-.086-.145-.318-.232-.666-.406z"
          fill="#25D366"
        />
      </svg>
    </a>
  );
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-background">
      <Navbar />
      <main className="flex-1 pt-16 sm:pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      {/* Admin Routes */}
      <Route path="/admin/login" component={Login} />
      <Route path="/admin">
        {() => (
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        )}
      </Route>
      <Route path="/admin/dashboard">
        {() => (
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        )}
      </Route>
      <Route path="/admin/bookings">
        {() => (
          <AdminLayout>
            <BookingsAdmin />
          </AdminLayout>
        )}
      </Route>
      <Route path="/admin/plans">
        {() => (
          <AdminLayout>
            <PlansAdmin />
          </AdminLayout>
        )}
      </Route>
      <Route path="/admin/trainers">
        {() => (
          <AdminLayout>
            <TrainersAdmin />
          </AdminLayout>
        )}
      </Route>
      <Route path="/admin/messages">
        {() => (
          <AdminLayout>
            <MessagesAdmin />
          </AdminLayout>
        )}
      </Route>
      <Route path="/admin/settings">
        {() => (
          <AdminLayout>
            <SettingsAdmin />
          </AdminLayout>
        )}
      </Route>

      {/* Public Routes */}
      <Route path="/">
        {() => (
          <PublicLayout>
            <Home />
          </PublicLayout>
        )}
      </Route>
      <Route path="/memberships">
        {() => (
          <PublicLayout>
            <Memberships />
          </PublicLayout>
        )}
      </Route>
      <Route path="/trainers">
        {() => (
          <PublicLayout>
            <Trainers />
          </PublicLayout>
        )}
      </Route>
      <Route path="/gallery">
        {() => (
          <PublicLayout>
            <Gallery />
          </PublicLayout>
        )}
      </Route>
      <Route path="/schedule">
        {() => (
          <PublicLayout>
            <Schedule />
          </PublicLayout>
        )}
      </Route>
      <Route path="/contact">
        {() => (
          <PublicLayout>
            <Contact />
          </PublicLayout>
        )}
      </Route>
      <Route path="/book">
        {() => (
          <PublicLayout>
            <Booking />
          </PublicLayout>
        )}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
