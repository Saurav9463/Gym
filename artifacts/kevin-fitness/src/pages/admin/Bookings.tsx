import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const { data } = await supabase.from("bookings").select(`
      *,
      plan:memberships(name),
      trainer:trainers(name)
    `).order("created_at", { ascending: false });
    setBookings(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (!error) {
      fetchBookings();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'text-yellow-500 border-yellow-500/20 bg-yellow-500/10';
      case 'Confirmed': return 'text-success border-success/20 bg-success/10';
      case 'Completed': return 'text-primary border-primary/20 bg-primary/10';
      case 'Cancelled': return 'text-destructive border-destructive/20 bg-destructive/10';
      default: return 'text-muted-foreground border-border bg-background';
    }
  };

  if (loading) return <div className="p-8 text-center text-muted-foreground font-mono">Loading bookings...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 border-b border-border pb-4">
        <h1 className="font-display text-4xl text-foreground">Bookings Manager</h1>
      </div>

      {isMobile ? (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div key={booking.id} className="bg-card border border-border p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-sans font-bold text-lg">{booking.client_name}</h3>
                  <p className="font-mono text-sm text-muted-foreground">{booking.client_phone}</p>
                </div>
                <span className={`px-2 py-1 font-mono text-xs uppercase tracking-wider border ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 font-mono text-sm mb-4">
                <div>
                  <span className="text-muted-foreground text-xs uppercase block">Date & Time</span>
                  {booking.appointment_date} <br/> {booking.appointment_time}
                </div>
                <div>
                  <span className="text-muted-foreground text-xs uppercase block">Interest</span>
                  {booking.plan?.name || booking.trainer?.name || 'General'}
                </div>
              </div>

              {booking.notes && (
                <div className="mb-4 text-primary font-serif italic text-sm border-l border-primary pl-3 py-1">
                  "{booking.notes}"
                </div>
              )}

              <select 
                value={booking.status}
                onChange={(e) => updateStatus(booking.id, e.target.value)}
                className="w-full bg-input border border-border p-2 text-sm font-mono focus:border-primary outline-none"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#111] border-b border-border">
                <th className="p-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Client</th>
                <th className="p-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Contact</th>
                <th className="p-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Interest</th>
                <th className="p-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Schedule</th>
                <th className="p-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.map(booking => (
                <tr key={booking.id} className="hover:bg-[#151515] transition-colors">
                  <td className="p-4">
                    <div className="font-bold">{booking.client_name}</div>
                    {booking.notes && <div className="text-primary font-serif italic text-xs mt-1">"{booking.notes}"</div>}
                  </td>
                  <td className="p-4 font-mono text-sm">
                    {booking.client_phone}<br/>
                    <span className="text-muted-foreground text-xs">{booking.client_email}</span>
                  </td>
                  <td className="p-4 font-mono text-sm">
                    {booking.plan?.name && <div className="text-primary">Plan: {booking.plan.name}</div>}
                    {booking.trainer?.name && <div>Trainer: {booking.trainer.name}</div>}
                    {!booking.plan?.name && !booking.trainer?.name && 'General'}
                  </td>
                  <td className="p-4 font-mono text-sm">
                    {booking.appointment_date}<br/>
                    <span className="text-muted-foreground">{booking.appointment_time}</span>
                  </td>
                  <td className="p-4">
                    <select 
                      value={booking.status}
                      onChange={(e) => updateStatus(booking.id, e.target.value)}
                      className={`bg-transparent border border-border p-2 text-sm font-mono outline-none ${getStatusColor(booking.status)}`}
                    >
                      <option value="Pending" className="bg-background text-foreground">Pending</option>
                      <option value="Confirmed" className="bg-background text-foreground">Confirmed</option>
                      <option value="Completed" className="bg-background text-foreground">Completed</option>
                      <option value="Cancelled" className="bg-background text-foreground">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
