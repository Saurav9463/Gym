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
          { id: 4, name: "Annual", price: 9000, duration: "year", features: ["All-inclusive", "Priority trainer access", "Body analysis"], popular: false },
        ]);
      }
    });
  }, []);

  return (
    <div className="section-pad min-h-[80vh] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-primary uppercase mb-4 block">
            Pricing
          </span>
          <h1
            className="font-display mb-4 sm:mb-6"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            Choose Your <span className="text-primary italic">Weapon</span>
          </h1>
          <div className="w-16 sm:w-24 h-1 bg-primary mx-auto mb-6 sm:mb-8"></div>
          <p className="text-muted-foreground text-base sm:text-lg px-2">
            No hidden fees, no complicated contracts. Just straightforward plans to get you results.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-card border-2 ${
                plan.popular
                  ? "border-primary shadow-[0_0_30px_rgba(245,200,0,0.12)]"
                  : "border-border"
              } p-6 sm:p-8 flex flex-col gold-glow-hover`}
            >
              {/* Popular badge — absolute positioned within relative parent */}
              {plan.popular && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-primary px-4 py-1 whitespace-nowrap">
                  <span className="font-mono text-[10px] text-black font-bold tracking-widest uppercase">
                    Most Popular
                  </span>
                </div>
              )}

              <div className={plan.popular ? "pt-4" : ""}>
                <h3
                  className="font-display text-center mb-3 sm:mb-4"
                  style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
                >
                  {plan.name}
                </h3>

                <div className="text-center mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-border">
                  <span
                    className="font-display text-foreground"
                    style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                  >
                    ₹{plan.price}
                  </span>
                  <span className="font-mono text-muted-foreground ml-2 text-sm">/{plan.duration}</span>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-1">
                  {plan.features?.map((f: string, i: number) => (
                    <li key={i} className="flex items-start text-sm text-muted-foreground">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mr-2 sm:mr-3 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/book?plan=${plan.id}`}
                  className={`block w-full py-4 text-center font-display tracking-widest uppercase transition-all min-h-[52px] flex items-center justify-center ${
                    plan.popular
                      ? "bg-primary text-black hover:bg-white"
                      : "ghost-gold-btn"
                  }`}
                >
                  Select Plan
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-muted-foreground font-mono text-xs sm:text-sm mt-8 sm:mt-12">
          All plans include access to all equipment · No joining fee
        </p>
      </div>
    </div>
  );
}
