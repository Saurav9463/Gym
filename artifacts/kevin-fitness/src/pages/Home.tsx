import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Star, Dumbbell, MapPin, Clock, Users } from "lucide-react";
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
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 bg-background">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="noise-overlay"></div>
          <img src="/hero1.png" alt="Gym Hero" className="w-full h-full object-cover" />
        </div>
        
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start justify-center">
          <h1 className="font-display text-5xl md:text-8xl lg:text-9xl text-foreground leading-[0.9] tracking-wider mb-6">
            KEVIN <span className="text-primary block">FITNESS</span>
          </h1>
          <p className="font-display text-2xl md:text-4xl text-muted-foreground tracking-widest mb-10 border-l-4 border-primary pl-4 uppercase">
            Stronger Than Excuses
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/book" className="px-10 py-5 bg-primary text-background font-display text-xl tracking-widest uppercase hover:bg-white transition-all text-center">
              Join Now
            </Link>
            <Link href="/memberships" className="px-10 py-5 ghost-gold-btn text-xl text-center">
              View Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#050505] border-y border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-border">
            <div className="flex flex-col items-center justify-center text-center px-4">
              <span className="font-display text-4xl text-primary mb-2">5+</span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Years Active</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <span className="font-display text-4xl text-primary mb-2">500+</span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Members</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <span className="font-display text-4xl text-primary mb-2">8</span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Trainers</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <span className="font-display text-4xl text-primary mb-2">20+</span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Classes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 border border-primary/20 translate-x-4 translate-y-4"></div>
            <img src="/hero2.png" alt="Gym Philosophy" className="w-full h-[600px] object-cover relative z-10" />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6">Built For Results</h2>
            <div className="w-16 h-1 bg-primary mb-8"></div>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              Spacious workout spot with cardio facilities and weight machines alongside diet guidance. We don't just sell memberships, we forge transformations.
            </p>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              At Kevin Fitness, we've stripped away the unnecessary to focus purely on what works. Premium equipment, expert guidance, and an atmosphere that demands your best.
            </p>
            <Link href="/about" className="inline-flex items-center text-primary font-display tracking-widest uppercase hover:text-white transition-colors group text-lg">
              Read Our Story <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Plans Preview */}
      <section className="py-24 bg-[#0a0a0a] border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">Membership Plans</h2>
              <div className="w-16 h-1 bg-primary"></div>
            </div>
            <Link href="/memberships" className="hidden md:flex ghost-gold-btn px-6 py-2 items-center">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-8 snap-x pb-8 md:pb-0 hide-scrollbar">
            {displayPlans.slice(0,3).map(plan => (
              <div key={plan.id} className={`min-w-[300px] snap-center bg-card border ${plan.popular ? 'border-primary' : 'border-border'} p-8 flex flex-col gold-glow-hover`}>
                {plan.popular && <div className="text-primary font-mono text-xs tracking-widest uppercase mb-4">Most Popular</div>}
                <h3 className="font-display text-3xl mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-8">
                  <span className="font-display text-5xl text-primary">₹{plan.price}</span>
                  <span className="font-mono text-muted-foreground ml-2">/{plan.duration}</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features?.slice(0,4).map((f: string, i: number) => (
                    <li key={i} className="flex items-start text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-3 shrink-0"></div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/book" className={`w-full py-4 text-center font-display tracking-widest uppercase transition-all ${plan.popular ? 'bg-primary text-background hover:bg-white' : 'ghost-gold-btn'}`}>
                  Select Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers Preview */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">Elite Trainers</h2>
            <div className="w-16 h-1 bg-primary mb-6"></div>
            <p className="text-muted-foreground max-w-xl">Learn from the best. Our certified experts are here to push your limits and ensure proper form.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayTrainers.slice(0,4).map(trainer => (
              <div key={trainer.id} className="group cursor-pointer">
                <div className="relative h-[400px] mb-4 overflow-hidden bg-card border border-border">
                  <img src={trainer.photo_url || gym1} alt={trainer.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-primary font-mono text-xs tracking-widest uppercase mb-2">{trainer.speciality}</div>
                    <h3 className="font-display text-3xl">{trainer.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#0a0a0a] border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">Real Results</h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className="font-display text-3xl">4.9</span>
              <div className="flex text-primary">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
            </div>
            <p className="text-muted-foreground font-mono text-sm">(154 Google Reviews)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "Great gym with clean and new equipment and a friendly vibe. Highly recommend if you're looking for a solid gym with a positive vibe.", author: "Google User" },
              { text: "Excellent ambience.. Gym owner is so supportive and behave like a friend.", author: "Google User" },
              { text: "Fee is adorable and all equipment available", author: "Google User" }
            ].map((review, i) => (
              <div key={i} className="bg-card border border-border p-8 gold-glow-hover">
                <div className="flex text-primary mb-6">
                  {[1,2,3,4,5].map(j => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 font-serif italic">"{review.text}"</p>
                <p className="font-display tracking-widest uppercase text-foreground">{review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Strip */}
      <section className="flex overflow-x-auto snap-x hide-scrollbar h-[40vh] min-h-[300px]">
        {[gym1, gym2, gym3, gym4].map((img, i) => (
          <img key={i} src={img} alt="Gallery" className="w-full md:w-1/4 h-full object-cover snap-center shrink-0" />
        ))}
      </section>
    </div>
  );
}
