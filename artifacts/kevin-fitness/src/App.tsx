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

// A simple layout wrapper for public routes
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-background">
      <Navbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
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
