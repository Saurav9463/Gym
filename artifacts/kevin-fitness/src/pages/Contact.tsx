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
        read: false
      }]);

      if (error) throw error;

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      toast({
        title: "Message Sent",
        description: "We'll get back to you as soon as possible.",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || "Failed to send message.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 min-h-[80vh] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-display text-5xl md:text-7xl mb-6">Get in <span className="text-primary">Touch</span></h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-muted-foreground text-lg">Have a question or want to visit? Reach out and we'll handle the rest.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div className="space-y-12">
            <div>
              <h3 className="font-display text-3xl mb-8">Gym Location</h3>
              <div className="space-y-6 text-lg">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-primary mt-1 mr-4 shrink-0" />
                  <p className="text-foreground/80">Shoor Market, Jalandhar - Kala Sanghian Rd,<br/>Chamiara, Punjab 144002</p>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-primary mr-4 shrink-0" />
                  <p className="font-mono text-foreground/80">090419 81234</p>
                </div>
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-primary mt-1 mr-4 shrink-0" />
                  <div>
                    <p className="font-mono font-bold text-foreground/80">Monday - Sunday</p>
                    <p className="font-mono text-muted-foreground mt-1">6:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[300px] w-full bg-card border border-border">
              {/* Fake Map for design */}
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] text-muted-foreground p-4 text-center">
                <MapPin className="w-12 h-12 text-primary mb-4 opacity-50" />
                <p className="font-mono uppercase tracking-widest text-sm mb-2">View on Google Maps</p>
                <a href="https://maps.google.com/?q=Kevin+Fitness+Jalandhar" target="_blank" rel="noreferrer" className="text-primary hover:underline">Click Here</a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card border border-border p-8 md:p-12">
            {success ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                <div className="w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center">
                  <Send className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display text-4xl">Message Received</h3>
                <p className="text-muted-foreground">We'll be in touch shortly.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="ghost-gold-btn px-8 py-3 mt-4"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-display text-3xl mb-8">Drop a Line</h3>
                
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Name</label>
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-input border border-border px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors rounded-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Email</label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-input border border-border px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors rounded-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                  <textarea 
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-input border border-border px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors rounded-none resize-none"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-background font-display tracking-widest uppercase py-4 hover:bg-white transition-colors flex items-center justify-center disabled:opacity-50 mt-4"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
