import { useState, useEffect } from "react";
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

  useEffect(() => {
    supabase.from("memberships").select("*").eq("active", true).then(({ data }) => {
      setPlans(data ?? []);
    });
    supabase.from("trainers").select("*").eq("active", true).then(({ data }) => {
      setTrainers(data ?? []);
    });
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hero1.png" alt="Gym Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="noise-overlay"></div>
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
          <span className="font-mono text-xs tracking-[0.4em] text-primary uppercase mb-6 border border-primary/40 px-4 py-2">
            Est. 2019 — Jalandhar, Punjab
          </span>
          <h1 className="font-display text-[clamp(4rem,14vw,10rem)] text-white leading-[0.88] tracking-wider mb-6">
            BE YOUR <span className="text-primary italic">BEST</span>
          </h1>
          <p className="font-display text-xl md:text-3xl text-white/50 tracking-[0.3em] mb-12 uppercase">
            Stronger Than Excuses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="px-14 py-5 bg-primary text-black font-display text-xl tracking-widest uppercase hover:bg-white transition-all text-center">
              Join Today
            </Link>
            <Link href="/memberships" className="px-14 py-5 border border-white/30 text-white font-display text-xl tracking-widest uppercase hover:border-primary hover:text-primary transition-all text-center">
              View Plans
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
          <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent"></div>
        </div>
      </section>

      {/* Marquee Stats Strip */}
      <section className="bg-primary py-5 overflow-hidden">
        <div className="flex gap-0 marquee-track">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex shrink-0 items-center">
              {["5+ Years Active", "500+ Members", "8 Expert Trainers", "20+ Classes", "Open 7 Days", "Expert Coaches"].map((item, i) => (
                <div key={i} className="flex items-center">
                  <span className="font-display text-black text-lg tracking-widest uppercase px-10 whitespace-nowrap">{item}</span>
                  <span className="text-black/40 text-2xl">✦</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* About / Philosophy */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-0 border border-primary/20 translate-x-5 translate-y-5 z-0"></div>
            <img src="/hero2.png" alt="Gym Philosophy" className="w-full h-[600px] object-cover relative z-10" />
            <div className="absolute bottom-0 left-0 z-20 bg-primary px-8 py-5">
              <span className="font-display text-black text-2xl tracking-wider">Since 2019</span>
            </div>
          </div>
          <div>
            <span className="font-mono text-xs tracking-[0.4em] text-primary uppercase mb-5 block">Our Philosophy</span>
            <h2 className="font-display text-5xl md:text-7xl text-foreground mb-2 leading-[0.9]">
              BUILT FOR
            </h2>
            <h2 className="font-display text-5xl md:text-7xl text-primary italic mb-8 leading-[0.9]">
              RESULTS
            </h2>
            <div className="w-16 h-[3px] bg-primary mb-8"></div>
            <p className="text-muted-foreground mb-5 text-lg leading-relaxed">
              Spacious workout spot with cardio facilities and weight machines alongside diet guidance. We don't just sell memberships — we forge transformations.
            </p>
            <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
              At Kevin Fitness, we've stripped away the unnecessary to focus purely on what works. Premium equipment, expert guidance, and an atmosphere that demands your best.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-black font-display text-lg tracking-widest uppercase hover:bg-white transition-all group">
              Get Started <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Plans Preview */}
      <section className="py-28 bg-[#060606] border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="font-mono text-xs tracking-[0.4em] text-primary uppercase mb-4 block">Pricing</span>
              <h2 className="font-display text-5xl md:text-6xl text-foreground leading-[0.9] mb-1">MEMBERSHIP</h2>
              <h2 className="font-display text-5xl md:text-6xl text-primary italic leading-[0.9]">PLANS</h2>
            </div>
            <Link href="/memberships" className="hidden md:flex items-center gap-2 text-primary font-display tracking-widest uppercase hover:text-white transition-colors group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-8 snap-x pb-8 md:pb-0 hide-scrollbar">
            {displayPlans.slice(0,3).map(plan => (
              <div key={plan.id} className={`min-w-[300px] snap-center bg-card border-2 ${plan.popular ? 'border-primary' : 'border-border'} p-8 flex flex-col gold-glow-hover relative overflow-hidden`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary px-4 py-1">
                    <span className="font-mono text-xs text-black tracking-widest uppercase">Popular</span>
                  </div>
                )}
                <h3 className="font-display text-4xl mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-8 border-b border-border pb-8">
                  <span className="font-display text-6xl text-primary">₹{plan.price}</span>
                  <span className="font-mono text-muted-foreground ml-2 text-sm">/{plan.duration}</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features?.slice(0,4).map((f: string, i: number) => (
                    <li key={i} className="flex items-start text-sm text-muted-foreground gap-3">
                      <span className="text-primary mt-0.5">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/book" className={`w-full py-4 text-center font-display text-lg tracking-widest uppercase transition-all ${plan.popular ? 'bg-primary text-black hover:bg-white' : 'border border-primary text-primary hover:bg-primary hover:text-black'}`}>
                  Select Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers Preview */}
      <section className="py-28 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="font-mono text-xs tracking-[0.4em] text-primary uppercase mb-4 block">The Team</span>
              <h2 className="font-display text-5xl md:text-6xl text-foreground leading-[0.9] mb-1">ELITE</h2>
              <h2 className="font-display text-5xl md:text-6xl text-primary italic leading-[0.9]">TRAINERS</h2>
            </div>
            <Link href="/trainers" className="hidden md:flex items-center gap-2 text-primary font-display tracking-widest uppercase hover:text-white transition-colors group">
              Meet All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayTrainers.slice(0,4).map(trainer => (
              <div key={trainer.id} className="group cursor-pointer">
                <div className="relative h-[420px] mb-0 overflow-hidden bg-card border border-border">
                  <img src={trainer.photo_url || gym1} alt={trainer.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <div className="text-primary font-mono text-xs tracking-widest uppercase mb-2">{trainer.speciality}</div>
                    <h3 className="font-display text-3xl text-white">{trainer.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width CTA Banner */}
      <section className="relative py-32 overflow-hidden">
        <img src="/hero1.png" alt="CTA Background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-6xl md:text-8xl text-white leading-[0.9] mb-4">
            START YOUR
          </h2>
          <h2 className="font-display text-6xl md:text-8xl text-primary italic leading-[0.9] mb-10">
            JOURNEY
          </h2>
          <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto">
            Join hundreds of members already transforming their lives at Kevin Fitness.
          </p>
          <Link href="/book" className="inline-block px-16 py-6 bg-primary text-black font-display text-2xl tracking-widest uppercase hover:bg-white transition-all">
            Join Now
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 bg-[#060606] border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-xs tracking-[0.4em] text-primary uppercase mb-4 block">Reviews</span>
            <h2 className="font-display text-5xl md:text-6xl text-foreground leading-[0.9] mb-1">REAL</h2>
            <h2 className="font-display text-5xl md:text-6xl text-primary italic leading-[0.9] mb-8">RESULTS</h2>
            <div className="flex justify-center items-center gap-3">
              <span className="font-display text-3xl text-primary">4.9</span>
              <div className="flex text-primary">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="text-muted-foreground font-mono text-sm">(154 reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "Great gym with clean and new equipment and a friendly vibe. Highly recommend if you're looking for a solid gym with a positive vibe.", author: "Google User" },
              { text: "Excellent ambience.. Gym owner is so supportive and behave like a friend.", author: "Google User" },
              { text: "Fee is adorable and all equipment available", author: "Google User" }
            ].map((review, i) => (
              <div key={i} className="bg-card border border-border p-8 gold-glow-hover relative">
                <div className="text-primary font-display text-6xl leading-none mb-4 opacity-30">"</div>
                <div className="flex text-primary mb-4">
                  {[1,2,3,4,5].map(j => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-8 text-base">"{review.text}"</p>
                <div className="flex items-center gap-3 border-t border-border pt-6">
                  <div className="w-8 h-8 bg-primary flex items-center justify-center">
                    <span className="font-display text-black text-sm">G</span>
                  </div>
                  <p className="font-display tracking-widest uppercase text-sm">{review.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 h-[45vh] min-h-[280px]">
        {[gym1, gym2, gym3, gym4].map((img, i) => (
          <div key={i} className="relative overflow-hidden group">
            <img src={img} alt="Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-700"></div>
          </div>
        ))}
      </section>
    </div>
  );
}
