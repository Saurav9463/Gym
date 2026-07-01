import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Save } from "lucide-react";

const SETTINGS_FIELDS = [
  { section: "General Information", fields: [
    { key: "gym_name", label: "Gym Name", type: "text", placeholder: "Kevin Fitness" },
    { key: "tagline", label: "Tagline", type: "text", placeholder: "Stronger Than Excuses" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Spacious workout spot with cardio facilities and weight machines alongside diet guidance." },
  ]},
  { section: "Contact & Location", fields: [
    { key: "phone", label: "Phone Number", type: "text", placeholder: "090419 81234" },
    { key: "email", label: "Email Address", type: "email", placeholder: "contact@kevinfitness.com" },
    { key: "address", label: "Address", type: "text", placeholder: "Shoor Market, Jalandhar - Kala Sanghian Rd, Chamiara, Punjab 144002" },
    { key: "hours_weekday", label: "Weekday Hours", type: "text", placeholder: "6:00 AM - 10:00 PM" },
    { key: "hours_weekend", label: "Weekend Hours", type: "text", placeholder: "6:00 AM - 10:00 PM" },
  ]},
  { section: "Social Media Links", fields: [
    { key: "instagram", label: "Instagram URL", type: "text", placeholder: "https://instagram.com/kevinfitness" },
    { key: "facebook", label: "Facebook URL", type: "text", placeholder: "https://facebook.com/kevinfitness" },
    { key: "whatsapp", label: "WhatsApp Number", type: "text", placeholder: "919041981234" },
    { key: "youtube", label: "YouTube URL", type: "text", placeholder: "https://youtube.com/@kevinfitness" },
  ]},
];

export default function SettingsAdmin() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    const { data } = await supabase.from("settings").select("*");
    if (data) {
      const map: Record<string, string> = {};
      data.forEach((item: any) => { map[item.key] = item.value; });
      setSettings(map);
    }
    setLoading(false);
  };

  useEffect(() => { fetchSettings(); }, []);

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = async () => {
    setSaving(true);
    const upserts = Object.entries(settings).map(([key, value]) => ({ key, value }));
    for (const item of upserts) {
      await supabase.from("settings").upsert(item, { onConflict: "key" });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
          data-testid="button-save-settings"
        >
          <Save className="w-5 h-5 mr-2" />
          {saving ? "Saving..." : saved ? "Saved!" : "Save All"}
        </button>
      </div>

      <div className="space-y-8">
        {SETTINGS_FIELDS.map(({ section, fields }) => (
          <div key={section} className="bg-card border border-border p-6 md:p-8">
            <h3 className="font-display text-2xl mb-6 text-primary border-b border-border pb-3">{section}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map(({ key, label, type, placeholder }) => (
                <div key={key} className={type === "textarea" ? "md:col-span-2" : ""}>
                  <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                    {label}
                  </label>
                  {type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={settings[key] ?? ""}
                      onChange={e => handleChange(key, e.target.value)}
                      placeholder={placeholder}
                      className="w-full bg-input border border-border p-3 focus:border-primary outline-none resize-none"
                      data-testid={`input-${key}`}
                    />
                  ) : (
                    <input
                      type={type}
                      value={settings[key] ?? ""}
                      onChange={e => handleChange(key, e.target.value)}
                      placeholder={placeholder}
                      className="w-full bg-input border border-border p-3 focus:border-primary outline-none"
                      data-testid={`input-${key}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {saved && (
        <div className="fixed bottom-6 right-6 bg-primary text-background font-mono text-sm px-6 py-3 uppercase tracking-widest shadow-lg" style={{ zIndex: 9999 }}>
          Settings saved successfully.
        </div>
      )}
    </div>
  );
}
