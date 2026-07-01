import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Check, Zap } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Memberships() {
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("memberships").select("*").eq("active", true).order("price").then(({ data }) => {
      setPlans(data && data.length > 0 ? data : [
        { id: 1, name: "Monthly", price: 1200, duration: "month", features: ["Weight training", "Cardio equipment", "Locker room access", "Basic diet tips"], popular: false },
        { id: 2, name: "Quarterly", price: 3200, duration: "3 months", features: ["Everything in Monthly", "Personalised diet guidance", "Priority class booking", "Progress tracking"], popular: true },
        { id: 3, name: "Half-Yearly", price: 5500, duration: "6 months", features: ["Everything in Quarterly", "1 trainer session / month", "Body composition analysis", "Nutritional counseling"], popular: false },
        { id: 4, name: "Annual", price: 9000, duration: "year", features: ["All-inclusive access", "Unlimited trainer sessions", "Priority trainer access", "Full body analysis", "VIP member perks"], popular: false },
      ]);
    });
  }, []);

  return (
    <div className="min-h-[80vh] bg-depth-0">
      {/* Header */}
      <div className="bg-depth-3 section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block font-mono text-[10px] sm:text-xs tracking-[0.4em] text-primary uppercase mb-5 border border-primary/30 px-4 py-1.5"
          >
            Pricing
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display mb-4"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            Choose Your <span className="text-primary italic">Weapon</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-16 sm:w-20 h-[2px] bg-primary mx-auto mb-6 origin-left"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/50 text-sm sm:text-base max-w-xl mx-auto"
          >
            No hidden fees. No complicated contracts. Just results.
          </motion.p>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              className={`relative flex flex-col ${
                plan.popular
                  ? "gradient-border-card"
                  : "glass-card border border-white/6"
              } p-6 sm:p-7`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-px left-0 right-0 flex justify-center">
                  <div className="bg-primary px-4 py-1 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-black fill-current" />
                    <span className="font-mono text-[9px] text-black font-bold tracking-widest uppercase">Most Popular</span>
                  </div>
                </div>
              )}

              <div className={plan.popular ? "pt-4" : ""}>
                {/* Plan name */}
                <h3 className="font-display text-2xl sm:text-3xl text-white mb-4">{plan.name}</h3>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-white/8">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl sm:text-6xl text-primary"
                      style={{ textShadow: "0 0 30px rgba(245,200,0,0.3)" }}>
                      ₹{plan.price.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-white/35 text-xs font-mono tracking-widest uppercase mt-1 block">
                    per {plan.duration}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features?.map((f: string, j: number) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-white/60 leading-snug">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/book?plan=${plan.id}`}
                  className={`block w-full py-4 text-center font-display text-sm tracking-widest uppercase transition-all min-h-[52px] flex items-center justify-center ${
                    plan.popular
                      ? "btn-primary"
                      : "ghost-gold-btn"
                  }`}
                >
                  Select Plan
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/25 text-xs font-mono tracking-widest mt-10 sm:mt-14"
        >
          All plans · No joining fee · Cancel anytime
        </motion.p>
      </div>
    </div>
  );
}
