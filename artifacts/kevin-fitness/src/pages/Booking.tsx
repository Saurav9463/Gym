import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useLocation } from "wouter";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";

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
    notes: "",
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
        status: "Pending",
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

  const stepLabels = ["Select Plan", "Select Trainer", "Schedule", "Your Details"];

  if (success) {
    return (
      <div className="section-pad min-h-[80vh] bg-background flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-primary flex items-center justify-center mx-auto mb-6 sm:mb-8">
            <Check className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
          </div>
          <h1
            className="font-display mb-4"
            style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
          >
            Request Received
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mb-8">
            We've received your booking request. Our team will contact you shortly to confirm.
          </p>
          <a href="/" className="ghost-gold-btn px-8 py-3 min-h-[48px] inline-flex">Return Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="section-pad min-h-[80vh] bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-primary uppercase mb-4 block">
            Membership
          </span>
          <h1
            className="font-display"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
          >
            Book a <span className="text-primary italic">Session</span>
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 sm:mb-12">
          {/* Step labels — hidden on very small screens */}
          <div className="hidden xs:flex justify-between text-[10px] sm:text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
            {stepLabels.map((label, i) => (
              <span key={i} className={i + 1 === step ? "text-primary" : ""}>{label}</span>
            ))}
          </div>
          {/* Mobile: just show step N of 4 */}
          <div className="flex xs:hidden justify-between text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
            <span>Step {step} of 4</span>
            <span className="text-primary">{stepLabels[step - 1]}</span>
          </div>

          {/* Progress track */}
          <div className="w-full bg-border h-0.5 sm:h-1 flex">
            <div
              className="bg-primary h-full transition-all duration-400"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>

          {/* Step dots */}
          <div className="flex justify-between mt-2">
            {[1, 2, 3, 4].map(n => (
              <div
                key={n}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 transition-colors ${
                  n <= step ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="bg-card border border-border p-5 sm:p-8 lg:p-10">

          {/* STEP 1 — Select Plan */}
          {step === 1 && (
            <div className="space-y-5 sm:space-y-6 animate-in fade-in">
              <h2
                className="font-display"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
              >
                Select a Membership Plan
                <span className="text-muted-foreground text-lg sm:text-2xl ml-2">(Optional)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div
                  onClick={() => setFormData({ ...formData, planId: "" })}
                  className={`cursor-pointer p-4 sm:p-6 border-2 transition-colors min-h-[80px] flex flex-col justify-center ${
                    formData.planId === "" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <h3 className="font-display text-xl sm:text-2xl mb-1">No Plan</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Just booking a session or visit</p>
                </div>
                {plans.map(plan => (
                  <div
                    key={plan.id}
                    onClick={() => setFormData({ ...formData, planId: plan.id.toString() })}
                    className={`cursor-pointer p-4 sm:p-6 border-2 transition-colors min-h-[80px] flex flex-col justify-center ${
                      formData.planId === plan.id.toString() ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <h3 className="font-display text-xl sm:text-2xl mb-1">{plan.name}</h3>
                    <p className="text-xs sm:text-sm text-primary font-mono tracking-wider">₹{plan.price}/{plan.duration}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleNext}
                  className="bg-primary text-black font-display tracking-widest uppercase px-6 sm:px-8 py-3.5 hover:bg-white transition-colors flex items-center gap-2 min-h-[52px]"
                >
                  Continue <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — Select Trainer */}
          {step === 2 && (
            <div className="space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2
                className="font-display"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
              >
                Select a Trainer
                <span className="text-muted-foreground text-lg sm:text-2xl ml-2">(Optional)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div
                  onClick={() => setFormData({ ...formData, trainerId: "" })}
                  className={`cursor-pointer p-4 flex items-center gap-3 sm:gap-4 border-2 transition-colors min-h-[72px] ${
                    formData.trainerId === "" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-border flex items-center justify-center font-mono text-xs shrink-0">N/A</div>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl">Any / None</h3>
                    <p className="text-xs text-muted-foreground">General admission</p>
                  </div>
                </div>
                {trainers.map(trainer => (
                  <div
                    key={trainer.id}
                    onClick={() => setFormData({ ...formData, trainerId: trainer.id.toString() })}
                    className={`cursor-pointer p-4 flex items-center gap-3 sm:gap-4 border-2 transition-colors min-h-[72px] ${
                      formData.trainerId === trainer.id.toString() ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={trainer.photo_url || "/gallery1.png"}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover grayscale shrink-0"
                      alt={trainer.name}
                    />
                    <div>
                      <h3 className="font-display text-lg sm:text-xl">{trainer.name}</h3>
                      <p className="text-xs text-primary font-mono">{trainer.speciality}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between gap-3">
                <button onClick={handlePrev} className="ghost-gold-btn px-5 sm:px-8 py-3.5 min-h-[52px] flex items-center gap-1">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={handleNext}
                  className="bg-primary text-black font-display tracking-widest uppercase px-6 sm:px-8 py-3.5 hover:bg-white transition-colors flex items-center gap-2 min-h-[52px]"
                >
                  Continue <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — Schedule */}
          {step === 3 && (
            <div className="space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2
                className="font-display"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
              >
                When works for you?
              </h2>

              <div className="space-y-2">
                <label className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">Select Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-input border border-border p-3.5 sm:p-4 text-foreground focus:border-primary outline-none min-h-[52px]"
                  style={{ colorScheme: "dark" }}
                />
              </div>

              <div className="pt-2">
                <label className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground block mb-3 sm:mb-4">
                  Select Time
                </label>
                {/* 2 cols on mobile, 3 on sm+ */}
                <div className="grid grid-cols-2 xs:grid-cols-3 gap-2 sm:gap-3">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setFormData({ ...formData, time })}
                      className={`py-3 sm:py-3.5 text-xs sm:text-sm font-mono tracking-wider transition-colors border min-h-[48px] ${
                        formData.time === time
                          ? "bg-primary border-primary text-black"
                          : "border-border text-foreground hover:border-primary/50"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between gap-3">
                <button onClick={handlePrev} className="ghost-gold-btn px-5 sm:px-8 py-3.5 min-h-[52px] flex items-center gap-1">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!formData.date || !formData.time}
                  className="bg-primary text-black font-display tracking-widest uppercase px-6 sm:px-8 py-3.5 hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-50 min-h-[52px]"
                >
                  Continue <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 — Details */}
          {step === 4 && (
            <div className="space-y-4 sm:space-y-5 animate-in fade-in slide-in-from-right-4">
              <h2
                className="font-display mb-2"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
              >
                Your Details
              </h2>

              {[
                { label: "Full Name *", key: "name", type: "text", required: true },
                { label: "Email Address *", key: "email", type: "email", required: true },
                { label: "Phone Number *", key: "phone", type: "tel", required: true },
              ].map(field => (
                <div key={field.key} className="space-y-1.5">
                  <label className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground block">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    required={field.required}
                    value={(formData as any)[field.key]}
                    onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                    className="w-full bg-input border border-border p-3.5 focus:border-primary outline-none min-h-[52px]"
                  />
                </div>
              ))}

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground block">
                  Goals / Notes (optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-input border border-border p-3.5 focus:border-primary outline-none resize-none"
                ></textarea>
              </div>

              <div className="pt-4 flex flex-col xs:flex-row justify-between gap-3">
                <button
                  onClick={handlePrev}
                  disabled={loading}
                  className="ghost-gold-btn px-5 sm:px-8 py-3.5 min-h-[52px] flex items-center justify-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading || !formData.name || !formData.email || !formData.phone}
                  className="bg-primary text-black font-display tracking-widest uppercase px-6 sm:px-8 py-3.5 hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 min-h-[52px] flex-1 xs:flex-none"
                >
                  {loading ? "Submitting…" : "Confirm Booking"}
                  {!loading && <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
