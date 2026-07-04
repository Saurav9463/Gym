import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { MapPin, Phone, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("messages").insert([{
        name: formData.name,
        email: formData.email,
        message: formData.message,
        read: false,
      }]);

      if (error) throw error;

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      toast({ title: "Message Sent", description: "We'll get back to you as soon as possible." });
    } catch (err: any) {
      toast({ variant: "destructive", title: "Error", description: err.message || "Failed to send message." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-pad min-h-[80vh] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-primary uppercase mb-4 block">
            Reach Out
          </span>
          <h1
            className="font-display mb-4 sm:mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Get in <span className="text-primary italic">Touch</span>
          </h1>
          <div className="w-16 sm:w-24 h-1 bg-primary mx-auto mb-6 sm:mb-8"></div>
          <p className="text-muted-foreground text-base sm:text-lg px-2">
            Have a question or want to visit? Reach out and we'll handle the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">

          {/* Contact Info */}
          <div className="space-y-8 sm:space-y-12">
            <div>
              <h3
                className="font-display mb-6 sm:mb-8"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
              >
                Gym Location
              </h3>
              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-11 h-11 bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground/80 text-sm sm:text-base leading-relaxed">
                      Shoor Market, Jalandhar - Kala Sanghian Rd,<br />
                      Chamiara, Punjab 144002
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-11 h-11 bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <a
                    href="tel:+919041981234"
                    className="font-mono text-foreground/80 text-sm sm:text-base hover:text-primary transition-colors"
                  >
                    090419 81234
                  </a>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-11 h-11 bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-mono font-bold text-foreground/80 text-sm sm:text-base">Monday – Sunday</p>
                    <p className="font-mono text-muted-foreground text-sm mt-1">6:00 AM – 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-[220px] sm:h-[300px] w-full bg-card border border-border overflow-hidden">
              <a
                href="https://maps.google.com/?q=Kevin+Fitness+Jalandhar"
                target="_blank"
                rel="noreferrer"
                className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] text-muted-foreground p-4 text-center hover:bg-[#0f0f0f] transition-colors group"
              >
                <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-3 sm:mb-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                <p className="font-mono uppercase tracking-widest text-xs sm:text-sm mb-1">View on Google Maps</p>
                <span className="text-primary text-sm font-mono">Tap to open ↗</span>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card border border-border p-6 sm:p-8 lg:p-12">
            {success ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-5 py-12">
                <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-primary flex items-center justify-center">
                  <Send className="w-7 h-7 sm:w-10 sm:h-10 text-primary" />
                </div>
                <h3 className="font-display text-3xl sm:text-4xl">Message Received</h3>
                <p className="text-muted-foreground text-sm sm:text-base">We'll be in touch shortly.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="ghost-gold-btn px-8 py-3 mt-4 min-h-[48px]"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <h3
                  className="font-display mb-6 sm:mb-8"
                  style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
                >
                  Drop a Line
                </h3>

                <div className="space-y-2">
                  <label className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-input border border-border px-4 py-3.5 text-foreground focus:border-primary focus:outline-none transition-colors rounded-none min-h-[52px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">Email</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-input border border-border px-4 py-3.5 text-foreground focus:border-primary focus:outline-none transition-colors rounded-none min-h-[52px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-input border border-border px-4 py-3.5 text-foreground focus:border-primary focus:outline-none transition-colors rounded-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white font-display tracking-widest uppercase py-4 hover:bg-white transition-colors flex items-center justify-center disabled:opacity-50 min-h-[56px] text-base sm:text-lg mt-2"
                >
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
