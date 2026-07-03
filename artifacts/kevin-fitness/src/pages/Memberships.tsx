import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";

const BZ: [number, number, number, number] = [0.22, 1, 0.36, 1];
import { supabase } from "@/lib/supabase";
import { Check, ArrowRight, Zap } from "lucide-react";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.55, ease: BZ } },
});

export default function Memberships() {
  const [plans, setPlans] = useState<any[]>([]);
  const [hasLivePlans, setHasLivePlans] = useState(false);

  useEffect(() => {
    supabase
      .from("memberships")
      .select("*")
      .eq("active", true)
      .order("price")
      .then(({ data }) => {
        setHasLivePlans(!!(data && data.length > 0));
        setPlans(
          data && data.length > 0
            ? data
            : [
                {
                  id: 1,
                  name: "Basic",
                  price: 1200,
                  duration: "month",
                  features: [
                    "Unlimited access to the gym",
                    "1 free group class per month",
                    "Free access to relaxation areas",
                  ],
                  popular: false,
                },
                {
                  id: 2,
                  name: "Standard",
                  price: 3200,
                  duration: "3 months",
                  features: [
                    "Unlimited access to the gym",
                    "3 free group classes per month",
                    "Free access to relaxation areas and sauna",
                    "Personalised diet guidance",
                    "Progress tracking",
                  ],
                  popular: true,
                },
                {
                  id: 3,
                  name: "Premium",
                  price: 5500,
                  duration: "6 months",
                  features: [
                    "Unlimited access to the gym",
                    "Unlimited group classes",
                    "2 personal training sessions per month",
                    "Free access to all amenities",
                    "Body composition analysis",
                  ],
                  popular: false,
                },
                {
                  id: 4,
                  name: "Elite",
                  price: 9000,
                  duration: "year",
                  features: [
                    "All-inclusive access",
                    "Unlimited trainer sessions",
                    "Priority trainer access",
                    "Full body analysis monthly",
                    "VIP member perks",
                  ],
                  popular: false,
                },
              ]
        );
      });
  }, []);

  // Guarantee a featured plan: prefer popular flag, else force index 1
  const displayPlans = plans
    .slice(0, 3)
    .map((p, i, arr) => ({
      ...p,
      _featured: p.popular || (!arr.some((x: any) => x.popular) && i === 1),
    }));

  return (
    <div className="min-h-[80vh]" style={{ background: "#0d0a08" }}>

      {/* ── Header ── */}
      <section className="pt-28 pb-16 sm:pt-36 sm:pb-20 relative overflow-hidden" style={{ background: "#111113" }}>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none blur-3xl opacity-20"
          style={{ background: "hsl(var(--primary))" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary text-sm font-semibold block mb-4"
          >
            Subscriptions
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-white mb-4 leading-tight"
            style={{ fontSize: "clamp(2rem, 6vw, 5rem)", fontWeight: 800, letterSpacing: "-0.025em", textTransform: "none" }}
          >
            FLEXIBLE <span className="text-primary">PLANS</span> FOR EVERY GOAL
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
          >
            Choose the plan that fits your lifestyle. Every membership includes full access to
            our premium facilities, certified trainers, and a welcoming community.
          </motion.p>
        </div>
      </section>

      {/* ── Plans Grid ── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {displayPlans.map((plan, i) => {
              const featured = plan.popular || (plans.length === 0 && i === 1);
              return (
                <motion.div
                  key={plan.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp(i * 0.12)}
                  className="relative rounded-2xl p-6 sm:p-8 flex flex-col"
                  style={
                    featured
                      ? { background: "hsl(var(--primary))" }
                      : { background: "#1a1715", border: "1px solid rgba(255,255,255,0.08)" }
                  }
                >
                  {featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-white text-primary text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
                        ★ Most Popular
                      </span>
                    </div>
                  )}

                  <div className={featured ? "pt-3" : ""}>
                    <h3 className="font-bold text-xl text-white mb-3">{plan.name}</h3>
                    <div className="mb-1 flex items-baseline gap-1">
                      <span
                        className="font-black text-5xl text-white"
                        style={{ fontFamily: "var(--font-display)", letterSpacing: "0.03em" }}
                      >
                        ₹{plan.price.toLocaleString()}
                      </span>
                      <span className={`text-sm ml-1 ${featured ? "text-white/60" : "text-white/35"}`}>
                        /{plan.duration}
                      </span>
                    </div>
                    <p
                      className={`text-xs mb-6 pb-6 border-b ${
                        featured ? "text-white/60 border-white/20" : "text-white/35 border-white/8"
                      }`}
                    >
                      {i === 0
                        ? "Essential package for regular workouts"
                        : i === 1
                        ? "Extended package for comprehensive training"
                        : "Deluxe package with maximum benefits"}
                    </p>

                    <p
                      className={`text-[10px] font-semibold tracking-[0.15em] uppercase mb-4 ${
                        featured ? "text-white/65" : "text-white/35"
                      }`}
                    >
                      WHAT YOU GET
                    </p>
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features?.map((f: string, j: number) => (
                        <li
                          key={j}
                          className={`flex items-start gap-3 text-sm leading-relaxed ${
                            featured ? "text-white/90" : "text-white/60"
                          }`}
                        >
                          <Check
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              featured ? "text-white" : "text-primary"
                            }`}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={hasLivePlans ? `/book?plan=${plan.id}` : "/book"}
                      className={`w-full py-4 rounded-xl text-center font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                        featured
                          ? "bg-white/15 text-white hover:bg-white/25 border border-white/25"
                          : "border border-white/15 text-white/70 hover:border-primary hover:text-primary"
                      }`}
                    >
                      Get started <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 4th plan if exists (Elite / Annual) */}
          {plans.length > 3 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp(0.1)}
              className="mt-5 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
              style={{ background: "#1a1715", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white mb-1">{plans[3].name}</h3>
                  <p className="text-white/45 text-sm">
                    ₹{plans[3].price.toLocaleString()}/{plans[3].duration} · All-inclusive VIP access
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 flex-1 sm:justify-center">
                {plans[3].features?.slice(0, 3).map((f: string, j: number) => (
                  <span key={j} className="flex items-center gap-1.5 text-xs text-white/55">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0" /> {f}
                  </span>
                ))}
              </div>
              <Link
                href={hasLivePlans ? `/book?plan=${plans[3].id}` : "/book"}
                className="shrink-0 px-6 py-3 rounded-full border border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all"
              >
                Get started
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Why Kevin Fitness ── */}
      <section className="py-16 sm:py-20 border-t border-white/5" style={{ background: "#111113" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp()}
            className="text-center mb-12"
          >
            <span className="text-primary text-sm font-semibold block mb-4">Why Kevin Fitness?</span>
            <h2
              className="text-white leading-tight"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.02em" }}
            >
              Every Plan Includes These <span className="text-primary">Essentials</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "🏋️", title: "Premium Equipment", desc: "Latest cardio machines, free weights, and functional training gear — all maintained daily." },
              { icon: "👥", title: "Expert Trainers", desc: "Certified coaches with years of experience to guide your form, progress, and nutrition." },
              { icon: "📅", title: "Open Every Day", desc: "6 AM to 10 PM, seven days a week. Train on your schedule, not ours." },
              { icon: "🎯", title: "Personalised Plans", desc: "Custom workout and diet programs designed specifically for your goals." },
              { icon: "🔒", title: "Safe Environment", desc: "Clean, well-maintained facilities with CCTV, secure lockers, and professional hygiene standards." },
              { icon: "📊", title: "Progress Tracking", desc: "Regular assessments to measure your progress and adjust your program for best results." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp(i * 0.07)}
                className="rounded-xl p-5 sm:p-6 border border-white/8"
                style={{ background: "#1a1715" }}
              >
                <span className="text-2xl mb-4 block">{item.icon}</span>
                <h3
                  className="text-white font-bold text-base mb-2"
                  style={{ fontFamily: "var(--font-sans)", letterSpacing: "normal" }}
                >
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-20" style={{ background: "#0d0a08" }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2
            className="text-white mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "0.04em" }}
          >
            Not sure which plan is right for you?
          </h2>
          <p className="text-white/50 text-base mb-8 leading-relaxed">
            Visit us for a free trial session. Our trainers will assess your goals and recommend
            the perfect plan for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="kf-btn-primary">
              Get Free Consultation
            </Link>
            <Link href="/schedule" className="kf-btn-ghost">
              View Class Schedule
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
