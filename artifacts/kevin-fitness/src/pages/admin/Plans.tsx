import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit2, Trash2, X } from "lucide-react";

export default function PlansAdmin() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);

  const emptyPlan = {
    name: "",
    price: 0,
    duration: "month",
    features: [""],
    popular: false,
    active: true
  };

  const [formData, setFormData] = useState(emptyPlan);

  const fetchPlans = async () => {
    setLoading(true);
    const { data } = await supabase.from("memberships").select("*").order("price");
    setPlans(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const openEdit = (plan: any) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price,
      duration: plan.duration,
      features: plan.features || [""],
      popular: plan.popular || false,
      active: plan.active !== false
    });
    setModalOpen(true);
  };

  const openNew = () => {
    setEditingPlan(null);
    setFormData(emptyPlan);
    setModalOpen(true);
  };

  const savePlan = async () => {
    const payload = {
      name: formData.name,
      price: parseInt(formData.price as any),
      duration: formData.duration,
      features: formData.features.filter((f: string) => f.trim() !== ""),
      popular: formData.popular,
      active: formData.active
    };

    if (editingPlan) {
      await supabase.from("memberships").update(payload).eq("id", editingPlan.id);
    } else {
      await supabase.from("memberships").insert([payload]);
    }
    
    setModalOpen(false);
    fetchPlans();
  };

  const deletePlan = async (id: number) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      await supabase.from("memberships").delete().eq("id", id);
      fetchPlans();
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 border-b border-border pb-4 flex justify-between items-end">
        <h1 className="font-display text-4xl text-foreground">Plans Manager</h1>
        <button onClick={openNew} className="bg-primary text-background px-4 py-2 font-display uppercase tracking-widest flex items-center hover:bg-white transition-colors">
          <Plus className="w-4 h-4 mr-2" /> Add Plan
        </button>
      </div>

      {loading ? (
        <div className="text-center font-mono text-muted-foreground p-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map(plan => (
            <div key={plan.id} className={`bg-card border p-6 flex flex-col ${plan.active ? 'border-border' : 'border-destructive/30 opacity-60'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-display text-2xl mb-1">{plan.name} {plan.popular && <span className="text-primary text-xs ml-2 uppercase font-mono tracking-widest border border-primary px-1">Popular</span>}</h3>
                  <p className="font-mono text-xl text-primary">₹{plan.price} <span className="text-muted-foreground text-sm">/{plan.duration}</span></p>
                </div>
                {!plan.active && <span className="text-destructive font-mono text-xs uppercase tracking-widest">Inactive</span>}
              </div>
              
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features?.map((f: string, i: number) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-border mt-1.5 mr-2 shrink-0"></div>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex gap-2 pt-4 border-t border-border mt-auto">
                <button onClick={() => openEdit(plan)} className="flex-1 ghost-gold-btn py-2 flex justify-center items-center font-sans text-sm tracking-normal capitalize">
                  <Edit2 className="w-4 h-4 mr-2" /> Edit
                </button>
                <button onClick={() => deletePlan(plan.id)} className="flex-1 border border-destructive text-destructive hover:bg-destructive hover:text-white transition-colors py-2 flex justify-center items-center font-sans text-sm">
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal - fixed positioning inline styles as requested */}
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="bg-card border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ position: 'relative' }}>
            <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-center z-10">
              <h2 className="font-display text-2xl">{editingPlan ? 'Edit Plan' : 'New Plan'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-input border border-border p-3 focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Price (₹)</label>
                  <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseInt(e.target.value) || 0})} className="w-full bg-input border border-border p-3 focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Duration</label>
                  <input type="text" placeholder="e.g. month, 3 months" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full bg-input border border-border p-3 focus:border-primary outline-none" />
                </div>
                <div className="flex flex-col justify-end space-y-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.popular} onChange={e => setFormData({...formData, popular: e.target.checked})} className="w-5 h-5 accent-primary" />
                    <span className="font-mono text-sm uppercase">Mark as Popular</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.active} onChange={e => setFormData({...formData, active: e.target.checked})} className="w-5 h-5 accent-primary" />
                    <span className="font-mono text-sm uppercase">Active (Visible)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4 block">Features</label>
                <div className="space-y-3">
                  {formData.features.map((feature: string, i: number) => (
                    <div key={i} className="flex gap-2">
                      <input type="text" value={feature} onChange={e => handleFeatureChange(i, e.target.value)} className="flex-1 bg-input border border-border p-3 focus:border-primary outline-none" placeholder={`Feature ${i+1}`} />
                      <button onClick={() => removeFeature(i)} className="p-3 border border-destructive text-destructive hover:bg-destructive hover:text-white transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button onClick={addFeature} className="ghost-gold-btn px-4 py-2 font-sans text-sm tracking-normal capitalize flex items-center">
                    <Plus className="w-4 h-4 mr-2" /> Add Feature
                  </button>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-card border-t border-border p-6 flex justify-end">
              <button onClick={savePlan} className="bg-primary text-background font-display tracking-widest uppercase px-8 py-3 hover:bg-white transition-colors">
                Save Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
