import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [stats, setStats] = useState({
    bookings: 0,
    pending: 0,
    confirmed: 0,
    members: 0,
    plans: 0,
    trainers: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [
        { data: bookings },
        { data: memberships },
        { data: trainers }
      ] = await Promise.all([
        supabase.from("bookings").select("*"),
        supabase.from("memberships").select("*"),
        supabase.from("trainers").select("*")
      ]);

      const allBookings = bookings || [];
      
      setStats({
        bookings: allBookings.length,
        pending: allBookings.filter(b => b.status === 'Pending').length,
        confirmed: allBookings.filter(b => b.status === 'Confirmed').length,
        members: 500, // Hardcoded for demo
        plans: (memberships || []).length,
        trainers: (trainers || []).length
      });
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Bookings", value: stats.bookings },
    { label: "Pending Requests", value: stats.pending, highlight: true },
    { label: "Confirmed", value: stats.confirmed },
    { label: "Active Members", value: `${stats.members}+` },
    { label: "Total Plans", value: stats.plans },
    { label: "Trainers", value: stats.trainers }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="mb-8 border-b border-border pb-4">
        <h1 className="font-display text-4xl text-foreground">Dashboard</h1>
        <p className="text-muted-foreground font-mono text-sm mt-1">Overview of gym activities</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className={`bg-card border ${stat.highlight ? 'border-primary shadow-[0_0_15px_rgba(232,197,71,0.1)]' : 'border-border'} p-6`}>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">{stat.label}</p>
            <p className={`font-sans text-4xl font-bold ${stat.highlight ? 'text-primary' : 'text-foreground'}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
