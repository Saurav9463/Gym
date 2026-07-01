import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useLocation } from "wouter";
import { Check, ChevronRight } from "lucide-react";

export default function Booking() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialPlan = searchParams.get("plan");
  const initialTrainer = searchParams.get("trainer");

  const [step, setStep] = useState(1);
  const [plans, setPlans] = useState<any[]>([]);
  const [trainers, setTrainers] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    planId: initialPlan || "",
    trainerId: initialTrainer || "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    supabase.from("memberships").select("*").eq("active", true).then(({ data }) => setPlans(data ?? []));
    supabase.from("trainers").select("*").eq("active", true).then(({ data }) => setTrainers(data ?? []));
  }, []);

  const timeSlots = ["06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"];

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from("bookings").insert([{
        client_name: formData.name,
        client_email: formData.email,
        client_phone: formData.phone,
        plan_id: formData.planId ? parseInt(formData.planId) : null,
        trainer_id: formData.trainerId ? parseInt(formData.trainerId) : null,
        appointment_date: formData.date,
        appointment_time: formData.time,
        notes: formData.notes,
        status: 'Pending'
      }]);

      if (error) throw error;
      setSuccess(true);
      setStep(5);
    } catch (err: any) {
      console.error(err);
      alert("Failed to submit booking: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="py-24 min-h-[80vh] bg-background flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <div className="w-24 h-24 rounded-full border-2 border-primary flex items-center justify-center mx-auto mb-8">
            <Check className="w-12 h-12 text-primary" />
          </div>
          <h1 className="font-display text-5xl mb-4">Request Received</h1>
          <p className="text-muted-foreground mb-8">We've received your booking request. Our team will contact you shortly to confirm.</p>
          <a href="/" className="ghost-gold-btn px-8 py-3 inline-block">Return Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-24 min-h-[80vh] bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress */}
        <div className="mb-12">
          <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
            <span>Step {step} of 4</span>
            <span className="text-primary">{
              step === 1 ? "Select Plan" : 
              step === 2 ? "Select Trainer" : 
              step === 3 ? "Schedule" : "Details"
            }</span>
          </div>
          <div className="w-full bg-border h-1 flex">
            <div className="bg-primary h-full transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }}></div>
          </div>
        </div>

        <div className="bg-card border border-border p-6 md:p-10">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="font-display text-3xl md:text-4xl mb-6">Select a Membership Plan (Optional)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  onClick={() => setFormData({...formData, planId: ""})}
                  className={`cursor-pointer p-6 border transition-colors ${formData.planId === "" ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                >
                  <h3 className="font-display text-2xl mb-1">No Plan</h3>
                  <p className="text-sm text-muted-foreground">Just booking a session or visit</p>
                </div>
                {plans.map(plan => (
                  <div 
                    key={plan.id}
                    onClick={() => setFormData({...formData, planId: plan.id.toString()})}
                    className={`cursor-pointer p-6 border transition-colors ${formData.planId === plan.id.toString() ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                  >
                    <h3 className="font-display text-2xl mb-1">{plan.name}</h3>
                    <p className="text-sm text-primary font-mono tracking-wider">₹{plan.price}/{plan.duration}</p>
                  </div>
                ))}
              </div>
              <div className="pt-6 flex justify-end">
                <button onClick={handleNext} className="bg-primary text-background font-display tracking-widest uppercase px-8 py-3 hover:bg-white transition-colors flex items-center">
                  Continue <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="font-display text-3xl md:text-4xl mb-6">Select a Trainer (Optional)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  onClick={() => setFormData({...formData, trainerId: ""})}
                  className={`cursor-pointer p-4 flex items-center gap-4 border transition-colors ${formData.trainerId === "" ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                >
                  <div className="w-12 h-12 rounded-full bg-border flex items-center justify-center font-mono text-xs">N/A</div>
                  <div>
                    <h3 className="font-display text-xl">Any / None</h3>
                    <p className="text-xs text-muted-foreground">General admission</p>
                  </div>
                </div>
                {trainers.map(trainer => (
                  <div 
                    key={trainer.id}
                    onClick={() => setFormData({...formData, trainerId: trainer.id.toString()})}
                    className={`cursor-pointer p-4 flex items-center gap-4 border transition-colors ${formData.trainerId === trainer.id.toString() ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                  >
                    <img src={trainer.photo_url || "/gallery1.png"} className="w-12 h-12 rounded-full object-cover grayscale" alt={trainer.name} />
                    <div>
                      <h3 className="font-display text-xl">{trainer.name}</h3>
                      <p className="text-xs text-primary font-mono">{trainer.speciality}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-6 flex justify-between">
                <button onClick={handlePrev} className="ghost-gold-btn px-8 py-3">Back</button>
                <button onClick={handleNext} className="bg-primary text-background font-display tracking-widest uppercase px-8 py-3 hover:bg-white transition-colors flex items-center">
                  Continue <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="font-display text-3xl md:text-4xl mb-6">When works for you?</h2>
              
              <div className="space-y-4">
                <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Select Date</label>
                <input 
                  type="date" 
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-input border border-border p-4 text-foreground focus:border-primary outline-none"
                  style={{ colorScheme: 'dark' }}
                />
              </div>

              <div className="pt-4">
                <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-4">Select Time</label>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setFormData({...formData, time})}
                      className={`py-3 text-sm font-mono tracking-wider transition-colors border ${formData.time === time ? 'bg-primary border-primary text-background' : 'border-border text-foreground hover:border-primary/50'}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex justify-between">
                <button onClick={handlePrev} className="ghost-gold-btn px-8 py-3">Back</button>
                <button 
                  onClick={handleNext} 
                  disabled={!formData.date || !formData.time}
                  className="bg-primary text-background font-display tracking-widest uppercase px-8 py-3 hover:bg-white transition-colors flex items-center disabled:opacity-50"
                >
                  Continue <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="font-display text-3xl md:text-4xl mb-6">Your Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2">Full Name *</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-input border border-border p-3 focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2">Email Address *</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-input border border-border p-3 focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2">Phone Number *</label>
                  <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-input border border-border p-3 focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2">Any specific goals or notes?</label>
                  <textarea rows={3} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full bg-input border border-border p-3 focus:border-primary outline-none resize-none"></textarea>
                </div>
              </div>

              <div className="pt-6 flex justify-between">
                <button onClick={handlePrev} className="ghost-gold-btn px-8 py-3" disabled={loading}>Back</button>
                <button 
                  onClick={handleSubmit} 
                  disabled={loading || !formData.name || !formData.email || !formData.phone}
                  className="bg-primary text-background font-display tracking-widest uppercase px-8 py-3 hover:bg-white transition-colors flex items-center disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
