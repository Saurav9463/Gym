import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Star, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

import gym1 from "@assets/image_1782887751159.png";
import gym2 from "@assets/image_1782887762372.png";
import gym3 from "@assets/image_1782887768921.png";
import gym4 from "@assets/image_1782887774610.png";

export default function Home() {
  const [plans, setPlans] = useState<any[]>([]);
  const [trainers, setTrainers] = useState<any[]>([]);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    supabase.from("memberships").select("*").eq("active", true).then(({ data }) => {
      setPlans(data ?? []);
    });
    supabase.from("trainers").select("*").eq("active", true).then(({ data }) => {
      setTrainers(data ?? []);
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const heroBottom = heroRef.current?.getBoundingClientRect().bottom ?? 0;
      setShowStickyCta(heroBottom < 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fallbackPlans = [
    { id: 1, name: "Monthly", price: 1200, duration: "month", features: ["Weight training", "Cardio equipment", "Locker room"] },
    { id: 2, name: "Quarterly", price: 3200, duration: "3 months", features: ["Everything in Monthly", "Diet guidance"], popular: true },
    { id: 3, name: "Half-Yearly", price: 5500, duration: "6 months", features: ["Everything in Quarterly", "Personal trainer session/month"] },
  ];

  const fallbackTrainers = [
    { id: 1, name: "Kevin Singh", role: "Head Trainer", speciality: "Strength & Conditioning", photo_url: "/gallery2.png" },
    { id: 2, name: "Priya Sharma", role: "Yoga Expert", speciality: "Yoga & Flexibility", photo_url: gym1 },
  ];

  const displayPlans = plans.length > 0 ? plans : fallbackPlans;
  const displayTrainers = trainers.length > 0 ? trainers : fallbackTrainers;

  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hero1.png" alt="Gym Hero" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-black/72"></div>
          <div className="noise-overlay"></div>
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center pt-16">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] text-primary uppercase mb-5 border border-primary/40 px-3 sm:px-4 py-1.5 sm:py-2">
            Est. 2019 — Jalandhar, Punjab
          </span>

          {/* Responsive hero headline using clamp */}
          <h1
            className="font-display text-white leading-[0.88] tracking-wider mb-5"
            style={{ fontSize: "clamp(3.2rem, 13vw, 10rem)" }}
          >
            BE YOUR{" "}
            <span className="text-primary italic block sm:inline">BEST</span>
          </h1>

          <p
            className="font-display text-white/50 tracking-[0.25em] mb-10 uppercase"
            style={{ fontSize: "clamp(1rem, 3vw, 2rem)" }}
          >
            Stronger Than Excuses
          </p>

          <div className="flex flex-col xs:flex-row gap-3 w-full max-w-xs xs:max-w-none xs:w-auto justify-center">
            <Link
              href="/book"
              className="px-8 sm:px-14 py-4 sm:py-5 bg-primary text-black font-display text-lg sm:text-xl tracking-widest uppercase hover:bg-white transition-all text-center min-h-[52px] flex items-center justify-center"
            >
              Join Today
            </Link>
            <Link
              href="/memberships"
              className="px-8 sm:px-14 py-4 sm:py-5 border border-white/30 text-white font-display text-lg sm:text-xl tracking-widest uppercase hover:border-primary hover:text-primary transition-all text-center min-h-[52px] flex items-center justify-center"
            >
              View Plans
            </Link>
          </div>
        </div>

        {/* Scroll indicator — hidden on very short screens */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 z-20">
          <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent"></div>
        </div>
      </section>

      {/* ── MARQUEE STATS STRIP ── */}
      <section className="bg-primary py-4 sm:py-5 overflow-hidden">
        <div className="flex gap-0 marquee-track">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex shrink-0 items-center">
              {["5+ Years Active", "500+ Members", "8 Expert Trainers", "20+ Classes", "Open 7 Days", "Expert Coaches"].map((item, i) => (
                <div key={i} className="flex items-center">
                  <span className="font-display text-black text-sm sm:text-lg tracking-widest uppercase px-6 sm:px-10 whitespace-nowrap">
                    {item}
                  </span>
                  <span className="text-black/40 text-xl sm:text-2xl">✦</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT / PHILOSOPHY ── */}
      <section className="section-pad bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="absolute -inset-0 border border-primary/20 translate-x-4 translate-y-4 z-0 hidden sm:block"></div>
            <img
              src="/hero2.png"
              alt="Gym Philosophy"
              className="w-full h-[300px] sm:h-[450px] lg:h-[580px] object-cover relative z-10"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 z-20 bg-primary px-5 sm:px-8 py-3 sm:py-5">
              <span className="font-display text-black text-lg sm:text-2xl tracking-wider">Since 2019</span>
            </div>
          </div>

          {/* Text */}
          <div className="mt-6 lg:mt-0">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-primary uppercase mb-4 block">
              Our Philosophy
            </span>
            <h2
              className="font-display text-foreground leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              BUILT FOR
            </h2>
            <h2
              className="font-display text-primary italic leading-[0.9] mb-6 sm:mb-8"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              RESULTS
            </h2>
            <div className="w-14 h-[3px] bg-primary mb-6 sm:mb-8"></div>
            <p className="text-muted-foreground mb-4 sm:mb-5 text-base sm:text-lg leading-relaxed">
              Spacious workout spot with cardio facilities and weight machines alongside diet guidance. We don't just sell memberships — we forge transformations.
            </p>
            <p className="text-muted-foreground mb-8 sm:mb-10 text-base sm:text-lg leading-relaxed">
              At Kevin Fitness, we've stripped away the unnecessary to focus purely on what works. Premium equipment, expert guidance, and an atmosphere that demands your best.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 bg-primary text-black font-display text-base sm:text-lg tracking-widest uppercase hover:bg-white transition-all group min-h-[52px]"
            >
              Get Started <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIP PLANS ── */}
      <section className="section-pad bg-[#060606] border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10 sm:mb-16">
            <div>
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-primary uppercase mb-3 sm:mb-4 block">
                Pricing
              </span>
              <h2
                className="font-display text-foreground leading-[0.9] mb-0.5"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                MEMBERSHIP
              </h2>
              <h2
                className="font-display text-primary italic leading-[0.9]"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                PLANS
              </h2>
            </div>
            <Link
              href="/memberships"
              className="hidden sm:flex items-center gap-2 text-primary font-display tracking-widest uppercase hover:text-white transition-colors group whitespace-nowrap"
            >
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Scrollable on mobile, grid on md+ */}
          <div className="flex gap-5 overflow-x-auto pb-6 md:pb-0 md:grid md:grid-cols-3 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {displayPlans.slice(0, 3).map(plan => (
              <div
                key={plan.id}
                className={`shrink-0 w-[78vw] xs:w-[65vw] sm:w-[52vw] md:w-auto snap-center bg-card border-2 ${plan.popular ? "border-primary" : "border-border"} p-6 sm:p-8 flex flex-col gold-glow-hover relative overflow-hidden`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary px-3 sm:px-4 py-1">
                    <span className="font-mono text-[10px] text-black tracking-widest uppercase">Popular</span>
                  </div>
                )}
                <h3 className="font-display text-3xl sm:text-4xl mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6 sm:mb-8 border-b border-border pb-6 sm:pb-8">
                  <span className="font-display text-4xl sm:text-5xl text-primary">₹{plan.price}</span>
                  <span className="font-mono text-muted-foreground ml-2 text-xs sm:text-sm">/{plan.duration}</span>
                </div>
                <ul className="space-y-3 sm:space-y-4 mb-8 flex-1">
                  {plan.features?.slice(0, 4).map((f: string, i: number) => (
                    <li key={i} className="flex items-start text-sm text-muted-foreground gap-3">
                      <span className="text-primary mt-0.5 shrink-0">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/book"
                  className={`w-full py-4 text-center font-display text-base sm:text-lg tracking-widest uppercase transition-all min-h-[52px] flex items-center justify-center ${
                    plan.popular
                      ? "bg-primary text-black hover:bg-white"
                      : "border border-primary text-primary hover:bg-primary hover:text-black"
                  }`}
                >
                  Select Plan
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile: See all link */}
          <div className="mt-6 text-center sm:hidden">
            <Link href="/memberships" className="ghost-gold-btn px-8 py-3">
              View All Plans
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRAINERS ── */}
      <section className="section-pad bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10 sm:mb-16">
            <div>
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-primary uppercase mb-3 sm:mb-4 block">
                The Team
              </span>
              <h2
                className="font-display text-foreground leading-[0.9] mb-0.5"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                ELITE
              </h2>
              <h2
                className="font-display text-primary italic leading-[0.9]"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                TRAINERS
              </h2>
            </div>
            <Link
              href="/trainers"
              className="hidden sm:flex items-center gap-2 text-primary font-display tracking-widest uppercase hover:text-white transition-colors group"
            >
              Meet All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {displayTrainers.slice(0, 4).map(trainer => (
              <div key={trainer.id} className="group cursor-pointer">
                <div className="relative h-[220px] sm:h-[320px] lg:h-[420px] overflow-hidden bg-card border border-border">
                  <img
                    src={trainer.photo_url || gym1}
                    alt={trainer.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-3 sm:p-5 w-full">
                    <div className="text-primary font-mono text-[9px] sm:text-xs tracking-widest uppercase mb-1">
                      {trainer.speciality}
                    </div>
                    <h3
                      className="font-display text-white"
                      style={{ fontSize: "clamp(1rem, 3vw, 1.75rem)" }}
                    >
                      {trainer.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link href="/trainers" className="ghost-gold-btn px-8 py-3">
              Meet All Trainers
            </Link>
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH CTA BANNER ── */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <img src="/hero1.png" alt="CTA Background" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-black/82"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="font-display text-white leading-[0.9] mb-2"
            style={{ fontSize: "clamp(2.8rem, 9vw, 7rem)" }}
          >
            START YOUR
          </h2>
          <h2
            className="font-display text-primary italic leading-[0.9] mb-8 sm:mb-10"
            style={{ fontSize: "clamp(2.8rem, 9vw, 7rem)" }}
          >
            JOURNEY
          </h2>
          <p className="text-white/60 text-base sm:text-lg mb-10 sm:mb-12 max-w-xl mx-auto">
            Join hundreds of members already transforming their lives at Kevin Fitness.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center px-10 sm:px-16 py-5 sm:py-6 bg-primary text-black font-display text-xl sm:text-2xl tracking-widest uppercase hover:bg-white transition-all min-h-[60px]"
          >
            Join Now
          </Link>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-pad bg-[#060606] border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-primary uppercase mb-3 sm:mb-4 block">
              Reviews
            </span>
            <h2
              className="font-display text-foreground leading-[0.9] mb-0.5"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              REAL
            </h2>
            <h2
              className="font-display text-primary italic leading-[0.9] mb-6 sm:mb-8"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              RESULTS
            </h2>
            <div className="flex justify-center items-center gap-2 sm:gap-3 flex-wrap">
              <span className="font-display text-2xl sm:text-3xl text-primary">4.9</span>
              <div className="flex text-primary">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                ))}
              </div>
              <span className="text-muted-foreground font-mono text-xs sm:text-sm">(154 reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {[
              { text: "Great gym with clean and new equipment and a friendly vibe. Highly recommend if you're looking for a solid gym with a positive vibe.", author: "Google User" },
              { text: "Excellent ambience.. Gym owner is so supportive and behave like a friend.", author: "Google User" },
              { text: "Fee is adorable and all equipment available", author: "Google User" },
            ].map((review, i) => (
              <div key={i} className="bg-card border border-border p-6 sm:p-8 gold-glow-hover relative">
                <div className="text-primary font-display text-5xl sm:text-6xl leading-none mb-3 sm:mb-4 opacity-30">"</div>
                <div className="flex text-primary mb-4">
                  {[1, 2, 3, 4, 5].map(j => (
                    <Star key={j} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3 border-t border-border pt-4 sm:pt-6">
                  <div className="w-8 h-8 bg-primary flex items-center justify-center shrink-0">
                    <span className="font-display text-black text-sm">G</span>
                  </div>
                  <p className="font-display tracking-widest uppercase text-sm">{review.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY STRIP ── */}
      <section className="grid grid-cols-2 md:grid-cols-4 h-[35vw] min-h-[200px] max-h-[420px]">
        {[gym1, gym2, gym3, gym4].map((img, i) => (
          <div key={i} className="relative overflow-hidden group">
            <img
              src={img}
              alt="Gallery"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-700"></div>
          </div>
        ))}
      </section>

      {/* ── STICKY MOBILE CTA ── */}
      <div
        className={`sticky-cta md:hidden ${showStickyCta ? "visible" : ""}`}
        style={{ bottom: "0" }}
      >
        <Link
          href="/book"
          className="font-display text-black tracking-widest uppercase text-base"
        >
          Join Kevin Fitness — Book Now
        </Link>
      </div>
    </div>
  );
}
