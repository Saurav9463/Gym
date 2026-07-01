import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit2, Trash2, X } from "lucide-react";

export default function TrainersAdmin() {
  const [trainers, setTrainers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState<any>(null);

  const emptyTrainer = {
    name: "",
    role: "",
    bio: "",
    speciality: "",
    certifications: "",
    photo_url: "",
    years_experience: 0,
    active: true
  };

  const [formData, setFormData] = useState(emptyTrainer);

  const fetchTrainers = async () => {
    setLoading(true);
    const { data } = await supabase.from("trainers").select("*").order("name");
    setTrainers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const openEdit = (trainer: any) => {
    setEditingTrainer(trainer);
    setFormData({
      name: trainer.name,
      role: trainer.role,
      bio: trainer.bio,
      speciality: trainer.speciality,
      certifications: trainer.certifications,
      photo_url: trainer.photo_url || "",
      years_experience: trainer.years_experience,
      active: trainer.active !== false
    });
    setModalOpen(true);
  };

  const openNew = () => {
    setEditingTrainer(null);
    setFormData(emptyTrainer);
    setModalOpen(true);
  };

  const saveTrainer = async () => {
    const payload = {
      name: formData.name,
      role: formData.role,
      bio: formData.bio,
      speciality: formData.speciality,
      certifications: formData.certifications,
      photo_url: formData.photo_url,
      years_experience: parseInt(formData.years_experience as any) || 0,
      active: formData.active
    };

    if (editingTrainer) {
      await supabase.from("trainers").update(payload).eq("id", editingTrainer.id);
    } else {
      await supabase.from("trainers").insert([payload]);
    }
    
    setModalOpen(false);
    fetchTrainers();
  };

  const deleteTrainer = async (id: number) => {
    if (confirm("Are you sure you want to delete this trainer?")) {
      await supabase.from("trainers").delete().eq("id", id);
      fetchTrainers();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 border-b border-border pb-4 flex justify-between items-end">
        <h1 className="font-display text-4xl text-foreground">Trainers Manager</h1>
        <button onClick={openNew} className="bg-primary text-background px-4 py-2 font-display uppercase tracking-widest flex items-center hover:bg-white transition-colors">
          <Plus className="w-4 h-4 mr-2" /> Add Trainer
        </button>
      </div>

      {loading ? (
        <div className="text-center font-mono text-muted-foreground p-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainers.map(trainer => (
            <div key={trainer.id} className={`bg-card border flex flex-col sm:flex-row ${trainer.active ? 'border-border' : 'border-destructive/30 opacity-60'}`}>
              <div className="w-full sm:w-32 h-48 sm:h-auto shrink-0 bg-[#0a0a0a]">
                {trainer.photo_url ? (
                  <img src={trainer.photo_url} alt={trainer.name} className="w-full h-full object-cover grayscale" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-xs text-muted-foreground">No Photo</div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-display text-2xl mb-1">{trainer.name}</h3>
                    <p className="font-mono text-xs text-primary uppercase">{trainer.speciality}</p>
                  </div>
                  {!trainer.active && <span className="text-destructive font-mono text-[10px] uppercase tracking-widest">Inactive</span>}
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{trainer.bio}</p>
                
                <div className="flex gap-2 pt-4 border-t border-border mt-auto">
                  <button onClick={() => openEdit(trainer)} className="flex-1 ghost-gold-btn py-1.5 flex justify-center items-center font-sans text-sm tracking-normal capitalize">
                    <Edit2 className="w-4 h-4 mr-2" /> Edit
                  </button>
                  <button onClick={() => deleteTrainer(trainer.id)} className="flex-1 border border-destructive text-destructive hover:bg-destructive hover:text-white transition-colors py-1.5 flex justify-center items-center font-sans text-sm">
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="bg-card border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ position: 'relative' }}>
            <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-center z-10">
              <h2 className="font-display text-2xl">{editingTrainer ? 'Edit Trainer' : 'New Trainer'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-input border border-border p-3 focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Role</label>
                  <input type="text" placeholder="e.g. Head Trainer" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-input border border-border p-3 focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Speciality</label>
                  <input type="text" placeholder="e.g. Strength & Conditioning" value={formData.speciality} onChange={e => setFormData({...formData, speciality: e.target.value})} className="w-full bg-input border border-border p-3 focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Years Experience</label>
                  <input type="number" value={formData.years_experience} onChange={e => setFormData({...formData, years_experience: parseInt(e.target.value) || 0})} className="w-full bg-input border border-border p-3 focus:border-primary outline-none" />
                </div>
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Bio</label>
                <textarea rows={3} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full bg-input border border-border p-3 focus:border-primary outline-none resize-none"></textarea>
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Certifications</label>
                <input type="text" placeholder="Comma separated list" value={formData.certifications} onChange={e => setFormData({...formData, certifications: e.target.value})} className="w-full bg-input border border-border p-3 focus:border-primary outline-none" />
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Photo URL</label>
                <input type="text" placeholder="https://..." value={formData.photo_url} onChange={e => setFormData({...formData, photo_url: e.target.value})} className="w-full bg-input border border-border p-3 focus:border-primary outline-none" />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.active} onChange={e => setFormData({...formData, active: e.target.checked})} className="w-5 h-5 accent-primary" />
                  <span className="font-mono text-sm uppercase">Active (Visible on website)</span>
                </label>
              </div>
            </div>

            <div className="sticky bottom-0 bg-card border-t border-border p-6 flex justify-end">
              <button onClick={saveTrainer} className="bg-primary text-background font-display tracking-widest uppercase px-8 py-3 hover:bg-white transition-colors">
                Save Trainer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
