import { useState, useEffect } from "react";
import { Link } from "wouter";
import { supabase } from "@/lib/supabase";
import { Check } from "lucide-react";

export default function Memberships() {
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("memberships").select("*").eq("active", true).order("price").then(({ data }) => {
      if (data && data.length > 0) {
        setPlans(data);
      } else {
        setPlans([
          { id: 1, name: "Monthly", price: 1200, duration: "month", features: ["Weight training", "Cardio equipment", "Locker room"], popular: false },
          { id: 2, name: "Quarterly", price: 3200, duration: "3 months", features: ["Everything in Monthly", "Diet guidance"], popular: true },
          { id: 3, name: "Half-Yearly", price: 5500, duration: "6 months", features: ["Everything in Quarterly", "Personal trainer session/month"], popular: false },
          { id: 4, name: "Annual", price: 9000, duration: "year", features: ["All-inclusive", "Priority trainer access", "Body analysis"], popular: false }
        ]);
      }
    });
  }, []);

  return (
    <div className="py-24 min-h-[80vh] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-display text-5xl md:text-7xl mb-6">Choose Your <span className="text-primary">Weapon</span></h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-muted-foreground text-lg">No hidden fees, no complicated contracts. Just straightforward plans to get you results.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`bg-card border ${plan.popular ? 'border-primary scale-105 shadow-[0_0_30px_rgba(232,197,71,0.15)] z-10' : 'border-border'} p-8 flex flex-col gold-glow-hover`}
            >
              {plan.popular && (
                <div className="bg-primary text-background font-mono text-xs font-bold tracking-widest uppercase py-1 px-3 absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </div>
              )}
              
              <h3 className="font-display text-3xl mb-4 text-center">{plan.name}</h3>
              
              <div className="text-center mb-8 pb-8 border-b border-border">
                <span className="font-display text-5xl text-foreground">₹{plan.price}</span>
                <span className="font-mono text-muted-foreground ml-2">/{plan.duration}</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features?.map((f: string, i: number) => (
                  <li key={i} className="flex items-start text-sm text-muted-foreground">
                    <Check className="w-5 h-5 text-primary shrink-0 mr-3" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href={`/book?plan=${plan.id}`} 
                className={`w-full py-4 text-center font-display tracking-widest uppercase transition-all ${
                  plan.popular ? 'bg-primary text-background hover:bg-white' : 'ghost-gold-btn'
                }`}
              >
                Select Plan
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
