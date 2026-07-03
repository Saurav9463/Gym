import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

const CATEGORIES = ["EQUIPMENT", "CLASSES", "TRANSFORMATIONS"];

export default function GalleryAdmin() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ image_url: "", category: CATEGORIES[0] });

  const fetchImages = async () => {
    setLoading(true);
    const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
    setImages(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const openNew = () => {
    setFormData({ image_url: "", category: CATEGORIES[0] });
    setModalOpen(true);
  };

  const saveImage = async () => {
    if (!formData.image_url) return; // upload must finish first
    setSaving(true);
    await supabase.from("gallery").insert([{
      image_url: formData.image_url,
      category: formData.category,
    }]);
    setSaving(false);
    setModalOpen(false);
    fetchImages();
  };

  const deleteImage = async (id: string) => {
    if (confirm("Remove this image from the gallery?")) {
      await supabase.from("gallery").delete().eq("id", id);
      fetchImages();
      // Note: this removes the database row so it disappears from the site
      // immediately. The file itself stays in Storage — that's fine, it's
      // just unused space, and avoids accidentally breaking anything that
      // might still reference the same file elsewhere.
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 border-b border-border pb-4 flex justify-between items-end">
        <h1 className="font-display text-4xl text-foreground">Gallery Manager</h1>
        <button onClick={openNew} className="bg-primary text-background px-4 py-2 font-display uppercase tracking-widest flex items-center hover:bg-white transition-colors">
          <Plus className="w-4 h-4 mr-2" /> Add Image
        </button>
      </div>

      {loading ? (
        <div className="text-center font-mono text-muted-foreground p-8">Loading...</div>
      ) : images.length === 0 ? (
        <div className="text-center font-mono text-muted-foreground p-8 border border-dashed border-border">
          No gallery images yet. Click "Add Image" to upload your first one.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map(img => (
            <div key={img.id} className="bg-card border border-border group relative">
              <div className="aspect-square bg-[#0a0a0a] overflow-hidden">
                <img src={img.image_url} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-2 flex items-center justify-between gap-2">
                <span className="font-mono text-[9px] text-primary uppercase tracking-widest truncate">
                  {img.category}
                </span>
                <button
                  onClick={() => deleteImage(img.id)}
                  className="text-destructive hover:text-white hover:bg-destructive p-1 transition-colors shrink-0"
                  aria-label="Delete image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="bg-card border border-border w-full max-w-md" style={{ position: 'relative' }}>
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="font-display text-2xl">Add Gallery Image</h2>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <ImageUpload
                value={formData.image_url}
                onChange={url => setFormData({ ...formData, image_url: url })}
                folder="gallery"
                label="Photo"
              />

              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-input border border-border p-3 focus:border-primary outline-none"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-6 border-t border-border flex justify-end">
              <button
                onClick={saveImage}
                disabled={!formData.image_url || saving}
                className="bg-primary text-background font-display tracking-widest uppercase px-8 py-3 hover:bg-white transition-colors disabled:opacity-50"
              >
                {saving ? "Saving…" : "Add to Gallery"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
