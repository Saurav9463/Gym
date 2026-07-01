import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Save } from "lucide-react";

export default function SettingsAdmin() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    const { data } = await supabase.from("settings").select("*");
    
    if (data) {
      const settingsMap: Record<string, string> = {};
      data.forEach(item => {
        settingsMap[item.key] = item.value;
      });
      setSettings(settingsMap);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = async () => {
    setSaving(true);
    
    const upserts = Object.entries(settings).map(([key, value]) => ({
      key,
      value
    }));

    // Perform upserts sequentially
    for (const item of upserts) {
      await supabase.from("settings").upsert(item);
    }

    setSaving(false);
    alert("Settings saved successfully.");
  };

  if (loading) return <div className="p-8 text-center text-muted-foreground font-mono">Loading settings...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 border-b border-border pb-4 flex justify-between items-end">
        <h1 className="font-display text-4xl text-foreground">Gym Settings</h1>
        <button 
          onClick={saveSettings} 
          disabled={saving}
          className="bg-primary text-background px-6 py-3 font-display uppercase tracking-widest flex items-center hover:bg-white transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5 mr-2" /> {saving ? 'Saving...' : 'Save All'}
        </button>
      </div>

      <div className="bg-card border border-border p-6 md:p-8 space-y-8">
        <div>
          <h3 className="font-display text-2xl mb-4 text-primary">General Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Gym Name</label>
              <input 
                type="text" 
                value={settings.gym_name || "Kevin Fitness"} 
                onChange={e => handleChange("gym_name", e.target.value)} 
                className="w-full bg-input border border-border p-3 focus:border-primary outline-none" 
              />
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Tagline</label>
              <input 
                type="text" 
                value={settings.tagline || "Stronger Than Excuses"} 
                onChange={e => handleChange("tagline", e.target.value)} 
                className="w-full bg-input border border-border p-3 focus:border-primary outline-none" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Description</label>
              <textarea 
                rows={3}
                value={settings.description || "Spacious workout spot with cardio facilities and weight machines alongside diet guidance."} 
                onChange={e => handleChange("description", e.target.value)} 
                className="w-full bg-input border border-border p-3 focus:border-primary outline-none resize-none" 
              />
            </div>
          </div>
        </div>

        <div className="h-px bg-border w-full"></div>

        <div>
          <h3 className="font-display text-2xl mb-4 text-primary">Contact & Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Phone Number</label>
              <input 
                type="text" 
                value={settings.phone || "090419 81234"} 
                onChange={e => handleChange("phone", e.target.value)} 
                className="w-full bg-input border border-border p-3 focus:border-primary outline-none" 
              />
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Email Address</label>
              <input 
                type="email" 
                value={settings.email || "contact@kevinfitness.com"} 
                onChange={e => handleChange("email", e.target.value)} 
                className="w-full bg-input border border-border p-3 focus:border-primary outline-none" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Address</label>
              <input 
                type="text" 
                value={settings.address || "Shoor Market, Jalandhar - Kala Sanghian Rd, Chamiara, Punjab 144002"} 
                onChange={e => handleChange("address", e.target.value)} 
                className="w-full bg-input border border-border p-3 focus:border-primary outline-none" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Opening Hours</label>
              <input 
                type="text" 
                value={settings.hours || "Open 6am–10pm daily"} 
                onChange={e => handleChange("hours", e.target.value)} 
                className="w-full bg-input border border-border p-3 focus:border-primary outline-none" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
