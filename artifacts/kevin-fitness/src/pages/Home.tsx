import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import { motion, useInView, type Variants } from "framer-motion";

// Typed cubic-bezier so framer-motion v12 accepts it
const BZ: [number, number, number, number] = [0.22, 1, 0.36, 1];
import { ArrowRight, Star, ChevronRight, ChevronLeft, ChevronsLeftRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import useEmblaCarousel from "embla-carousel-react";

import gym1 from "@assets/image_1782887751159.png";
import gym2 from "@assets/image_1782887762372.png";
import gym3 from "@assets/image_1782887768921.png";
import gym4 from "@assets/image_1782887774610.png";
import photoKevin from "@assets/trainer-kevin.png";
import photoPriya from "@assets/trainer-priya.png";
import photoRahul from "@assets/trainer-rahul.png";
import photoAnita from "@assets/trainer-anita.png";

/* ── Animated Counter ── */
function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView || animated.current) return;
    animated.current = true;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ── Before / After Slider ── */
function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const update = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(4, Math.min(96, pct)));
  }, []);

  const onMouseDown = () => setDragging(true);
  const onMouseUp   = () => setDragging(false);
  const onMouseMove = (e: React.MouseEvent) => { if (dragging) update(e.clientX); };
  const onClick     = (e: React.MouseEvent) => update(e.clientX);
  const onTouchMove = (e: React.TouchEvent) => update(e.touches[0].clientX);

  return (
    <div
      ref={containerRef}
      className="ba-container select-none rounded-none h-full"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
      onClick={onClick}
      onTouchMove={onTouchMove}
    >
      <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={after} alt="After" className="absolute inset-0 h-full object-cover" style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%" }} />
      </div>
      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur px-3 py-1 pointer-events-none">
        <span className="font-mono text-[10px] tracking-widest text-white/70 uppercase">Before</span>
      </div>
      <div className="absolute top-4 right-4 bg-primary px-3 py-1 pointer-events-none">
        <span className="font-mono text-[10px] tracking-widest text-white font-bold uppercase">After</span>
      </div>
      {/* Handle */}
      <div className="ba-handle" style={{ left: `${pos}%` }}>
        <div className="ba-handle-circle">
          <ChevronsLeftRight className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}

/* ── Testimonial Carousel ── */
const reviews = [
  { text: "Great gym with clean and new equipment and a friendly vibe. Highly recommend if you're looking for a solid gym with a positive vibe.", author: "Gurpreet S.", rating: 5 },
  { text: "Excellent ambience. Gym owner is so supportive and behaves like a friend. Best gym in Jalandhar.", author: "Manpreet K.", rating: 5 },
  { text: "Fee is very affordable and all equipment is available. Trainers are very professional and motivating.", author: "Rajesh V.", rating: 5 },
  { text: "Loving my transformation journey here. Kevin sir gives personal attention to every member.", author: "Simran B.", rating: 5 },
  { text: "Clean, well-maintained, and a great community. My confidence has improved a lot since joining.", author: "Amit T.", rating: 5 },
  { text: "Best gym in the city! The trainers are certified, equipment is top-notch, and the energy is incredible.", author: "Pooja M.", rating: 5 },
];

function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    const timer = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => { clearInterval(timer); emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="section-pad bg-depth-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <span className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase mb-4 block">Reviews</span>
            <h2 className="font-display leading-none" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}>
              REAL <span className="text-primary italic">RESULTS</span>
            </h2>
            <div className="flex items-center gap-2 mt-4">
              <span className="font-display text-2xl text-primary">4.9</span>
              <div className="flex text-primary">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
              <span className="text-white/30 font-mono text-xs">(154 Google reviews)</span>
            </div>
          </div>
          {/* Arrows */}
          <div className="flex gap-3">
            <button onClick={scrollPrev} className="w-11 h-11 border border-white/15 flex items-center justify-center hover:border-primary hover:text-primary transition-colors" aria-label="Previous">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={scrollNext} className="w-11 h-11 border border-white/15 flex items-center justify-center hover:border-primary hover:text-primary transition-colors" aria-label="Next">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embla */}
        <div className="embla" ref={emblaRef}>
          <div className="embla__container gap-4 sm:gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="embla__slide pr-4 sm:pr-6" style={{ flex: "0 0 100%", minWidth: 0 }}>
                <div className="glass-card p-6 sm:p-8 h-full border border-white/6">
                  <div className="text-primary font-display text-5xl leading-none mb-2 opacity-25">"</div>
                  <div className="flex text-primary mb-4">
                    {[...Array(r.rating)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <p className="text-white/60 leading-relaxed text-sm sm:text-base mb-6 italic">"{r.text}"</p>
                  <div className="flex items-center gap-3 border-t border-white/8 pt-5">
                    <div className="w-8 h-8 bg-primary flex items-center justify-center shrink-0">
                      <span className="font-display text-white text-sm">G</span>
                    </div>
                    <div>
                      <p className="font-display text-sm tracking-widest text-white">{r.author}</p>
                      <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Verified Google Review</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-[3px] transition-all duration-300 ${i === selectedIndex ? "w-8 bg-primary" : "w-3 bg-white/20"}`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [plans, setPlans] = useState<any[]>([]);
  const [trainers, setTrainers] = useState<any[]>([]);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    supabase.from("memberships").select("*").eq("active", true).order("price").then(({ data }) => { setPlans(data ?? []); });
    supabase.from("trainers").select("*").eq("active", true).then(({ data }) => { setTrainers(data ?? []); });
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
    { id: 2, name: "Quarterly", price: 3200, duration: "3 months", features: ["Everything in Monthly", "Diet guidance", "Progress tracking"], popular: true },
    { id: 3, name: "Half-Yearly", price: 5500, duration: "6 months", features: ["Everything in Quarterly", "Trainer session/month"] },
    { id: 4, name: "Annual", price: 9000, duration: "year", features: ["All-inclusive access", "Unlimited trainer sessions", "VIP perks"] },
  ];
  const fallbackTrainers = [
    { id: 1, name: "Kevin Singh", role: "Head Trainer", speciality: "Strength & Conditioning", photo_url: photoKevin },
    { id: 2, name: "Priya Sharma", role: "Yoga Expert", speciality: "Yoga & Flexibility", photo_url: photoPriya },
    { id: 3, name: "Rahul Verma", role: "Cardio Specialist", speciality: "HIIT & Endurance", photo_url: photoRahul },
    { id: 4, name: "Anita Kaur", role: "Weight Loss Expert", speciality: "Weight Management", photo_url: photoAnita },
  ];

  const displayPlans    = plans.length > 0 ? plans : fallbackPlans;
  const displayTrainers = trainers.length > 0 ? trainers : fallbackTrainers;

  /* Framer motion variants */
  const heroContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const heroItem = {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: BZ } },
  };
  const fadeUp = (delay = 0) => ({
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { delay, duration: 0.6, ease: BZ } },
  });

  return (
    <div className="w-full">

      {/* ════════════════════════════════════════════════
          HERO — full-screen with slow zoom + vignette
      ════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Background — slow zoom */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/hero1.png"
            alt="Kevin Fitness Gym"
            className="hero-zoom w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          {/* Layered overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
          {/* Radial spotlight */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 60%, transparent 40%, rgba(0,0,0,0.6) 100%)" }} />
        </div>

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${8 + i * 8}%`,
              bottom: "10%",
              animationDuration: `${4 + (i % 5)}s`,
              animationDelay: `${i * 0.6}s`,
              opacity: 0.6 + (i % 3) * 0.15,
              width: i % 3 === 0 ? "3px" : "2px",
              height: i % 3 === 0 ? "3px" : "2px",
            }}
          />
        ))}

        {/* Hero text */}
        <motion.div
          className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center pt-16"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={heroItem}
            className="font-mono text-[10px] sm:text-xs tracking-[0.35em] text-primary uppercase mb-6 border border-primary/35 px-4 py-2"
          >
            Est. 2019 — Jalandhar, Punjab
          </motion.span>

          <motion.h1
            variants={heroItem}
            className="font-display text-white leading-[0.85] tracking-wider mb-6 text-glow"
            style={{ fontSize: "clamp(3.2rem, 14vw, 11rem)" }}
          >
            BE YOUR{" "}
            <span className="text-primary italic">BEST</span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="font-display text-white/45 tracking-[0.3em] mb-10 uppercase"
            style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.75rem)" }}
          >
            Stronger Than Excuses
          </motion.p>

          <motion.div
            variants={heroItem}
            className="flex flex-col xs:flex-row gap-3 w-full max-w-xs xs:max-w-none xs:w-auto justify-center"
          >
            <Link
              href="/book"
              className="px-10 sm:px-14 py-4 sm:py-5 bg-primary text-white font-display text-lg sm:text-xl tracking-widest uppercase hover:bg-white transition-all text-center min-h-[52px] flex items-center justify-center gap-2 group hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] hover:-translate-y-0.5"
            >
              Join Today <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/memberships"
              className="px-10 sm:px-14 py-4 sm:py-5 border border-white/25 text-white font-display text-lg sm:text-xl tracking-widest uppercase hover:border-primary hover:text-primary transition-all text-center min-h-[52px] flex items-center justify-center"
            >
              View Plans
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 z-20">
          <span className="font-mono text-[9px] tracking-[0.3em] text-white/25 uppercase">Scroll</span>
          <div className="scroll-bounce w-px h-10 bg-gradient-to-b from-primary/50 to-transparent" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          MARQUEE STRIP
      ════════════════════════════════════════════════ */}
      <section className="bg-primary py-4 sm:py-5 overflow-hidden border-y border-primary">
        <div className="flex gap-0 marquee-track">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex shrink-0 items-center">
              {["5+ Years Active", "500+ Members", "8 Expert Trainers", "20+ Classes Weekly", "Open Every Day", "Certified Coaches", "Jalandhar's Best"].map((item, i) => (
                <div key={i} className="flex items-center">
                  <span className="font-display text-white text-sm sm:text-lg tracking-[0.15em] uppercase px-6 sm:px-10 whitespace-nowrap">
                    {item}
                  </span>
                  <span className="text-white/30 text-xl">✦</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          STATS COUNTER SECTION
      ════════════════════════════════════════════════ */}
      <section className="bg-depth-stats section-pad overflow-hidden relative">
        {/* Decorative horizontal rule */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 sm:gap-x-8">
            {[
              { value: 500, suffix: "+", label: "Active Members", sub: "& growing" },
              { value: 8, suffix: "+", label: "Certified Trainers", sub: "all disciplines" },
              { value: 20, suffix: "+", label: "Weekly Classes", sub: "every skill level" },
              { value: 5, suffix: " Yrs", label: "In Jalandhar", sub: "est. 2019" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp(i * 0.1)}
                className="text-center lg:border-r lg:border-white/6 last:border-0 px-2 sm:px-6"
              >
                <div
                  className="font-display text-primary mb-2"
                  style={{ fontSize: "clamp(3rem, 7vw, 6rem)", textShadow: "0 0 40px rgba(225,29,72,0.35)" }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="font-display text-white tracking-widest uppercase text-sm sm:text-base lg:text-xl mb-1">
                  {stat.label}
                </p>
                <p className="font-mono text-white/30 text-[10px] tracking-widest uppercase">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          ABOUT / PHILOSOPHY
      ════════════════════════════════════════════════ */}
      <section className="bg-depth-2 section-pad overflow-hidden relative">
        {/* Faded background word */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
          aria-hidden="true"
        >
          <span
            className="font-display text-white/[0.02] uppercase leading-none"
            style={{ fontSize: "clamp(8rem, 25vw, 24rem)", whiteSpace: "nowrap" }}
          >
            RESULTS
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image with accent border */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: BZ }}
            className="relative"
          >
            <div className="absolute -inset-3 sm:-inset-4 border border-primary/20 z-0 hidden sm:block" />
            <img
              src="/hero2.png"
              alt="Kevin Fitness — Built for Results"
              className="w-full h-[280px] sm:h-[420px] lg:h-[560px] object-cover relative z-10 grayscale-[30%]"
              loading="lazy"
            />
            {/* Since badge */}
            <div className="absolute bottom-0 left-0 z-20 bg-primary px-6 py-4">
              <span className="font-display text-white text-xl sm:text-2xl tracking-wider block">Since 2019</span>
              <span className="font-mono text-white/60 text-[10px] tracking-widest uppercase">Jalandhar, Punjab</span>
            </div>
            {/* Floating stat */}
            <div className="absolute top-4 right-0 sm:-right-4 z-20 glass border border-white/10 px-4 py-3 text-center hidden sm:block">
              <span className="font-display text-primary text-3xl block">4.9★</span>
              <span className="font-mono text-white/40 text-[10px] tracking-widest uppercase">Google Rating</span>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: BZ, delay: 0.1 }}
          >
            <span className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase mb-5 block">
              Our Philosophy
            </span>
            <h2
              className="font-display text-white leading-[0.88]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
            >
              BUILT FOR
            </h2>
            <h2
              className="font-display text-primary italic leading-[0.88] mb-6 sm:mb-8"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
            >
              RESULTS
            </h2>
            {/* Decorative accent line */}
            <div className="flex items-center gap-4 mb-7 sm:mb-9">
              <div className="w-12 h-[2px] bg-primary" />
              <div className="w-4 h-[2px] bg-primary/40" />
            </div>
            <p className="text-white/50 mb-5 text-base sm:text-lg leading-relaxed">
              Spacious workout facilities with premium cardio equipment, free weights, and machines, alongside personalised diet guidance. We don't just sell memberships — we forge transformations.
            </p>
            <p className="text-white/50 mb-8 sm:mb-10 text-base sm:text-lg leading-relaxed">
              At Kevin Fitness, we've stripped away everything unnecessary to focus purely on what works. Expert guidance, premium equipment, and an atmosphere that demands your best.
            </p>
            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 mb-9 sm:mb-11">
              {["Modern Equipment", "Expert Trainers", "Diet Guidance", "Flexible Hours"].map(tag => (
                <span key={tag} className="border border-white/12 text-white/45 font-mono text-[10px] tracking-widest uppercase px-3 py-1.5">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 bg-primary text-white font-display text-base sm:text-lg tracking-widest uppercase hover:bg-white transition-all group min-h-[52px] hover:shadow-[0_0_25px_rgba(225,29,72,0.4)]"
            >
              Get Started <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          MEMBERSHIP PLANS — glassmorphism preview
      ════════════════════════════════════════════════ */}
      <section className="bg-depth-0 section-pad relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        {/* Gold spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-[0.04] blur-3xl bg-primary pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-12 sm:mb-16">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp()}
            >
              <span className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase mb-4 block">Pricing</span>
              <h2 className="font-display text-white leading-none" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}>
                MEMBERSHIP <span className="text-primary italic">PLANS</span>
              </h2>
            </motion.div>
            <Link
              href="/memberships"
              className="hidden sm:flex items-center gap-2 text-primary/70 font-mono text-xs tracking-widest uppercase hover:text-primary transition-colors group"
            >
              View All Plans <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Scrollable on mobile */}
          <div className="flex gap-4 overflow-x-auto pb-6 md:pb-0 md:grid md:grid-cols-4 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {displayPlans.slice(0, 4).map((plan, i) => (
              <motion.div
                key={plan.id}
                custom={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: BZ }}
                className={`shrink-0 w-[72vw] xs:w-[60vw] sm:w-[44vw] md:w-auto snap-center flex flex-col p-6 relative ${
                  plan.popular ? "gradient-border-card" : "glass-card border border-white/6"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-px inset-x-0 flex justify-center">
                    <div className="bg-primary px-4 py-1">
                      <span className="font-mono text-[9px] text-white font-bold tracking-[0.2em] uppercase">★ Popular</span>
                    </div>
                  </div>
                )}
                <div className={plan.popular ? "pt-4" : ""}>
                  <h3 className="font-display text-2xl text-white mb-3">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="font-display text-4xl text-primary" style={{ textShadow: "0 0 20px rgba(225,29,72,0.3)" }}>
                      ₹{plan.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="font-mono text-white/25 text-[10px] tracking-widest uppercase mb-5 pb-5 border-b border-white/8">
                    per {plan.duration}
                  </p>
                  <ul className="space-y-2.5 mb-7 flex-1">
                    {plan.features?.slice(0, 4).map((f: string, j: number) => (
                      <li key={j} className="flex items-start text-xs text-white/50 gap-2.5">
                        <span className="text-primary shrink-0 mt-0.5">✦</span>{f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/book?plan=${plan.id}`}
                    className={`w-full py-3.5 text-center font-display text-sm tracking-widest uppercase transition-all min-h-[48px] flex items-center justify-center ${
                      plan.popular ? "btn-primary" : "ghost-gold-btn"
                    }`}
                  >
                    Select
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link href="/memberships" className="ghost-gold-btn px-8 py-3 text-sm">View All Plans</Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          BEFORE / AFTER TRANSFORMATION
      ════════════════════════════════════════════════ */}
      <section className="bg-depth-1 section-pad relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp()}
            className="text-center mb-10 sm:mb-14"
          >
            <span className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase mb-4 block">Transformations</span>
            <h2 className="font-display leading-none" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}>
              REAL <span className="text-primary italic">BEFORE & AFTER</span>
            </h2>
            <p className="text-white/40 text-sm mt-4 font-mono tracking-widest">DRAG THE SLIDER TO REVEAL</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-[280px] sm:h-[420px] lg:h-[520px] max-w-4xl mx-auto"
          >
            <BeforeAfterSlider before={gym2} after={gym1} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center text-white/20 font-mono text-[10px] tracking-widest uppercase mt-6"
          >
            Results vary · Individual commitment required
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          TRAINERS GRID
      ════════════════════════════════════════════════ */}
      <section className="bg-depth-3 section-pad relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10 sm:mb-14">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp()}>
              <span className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase mb-4 block">The Team</span>
              <h2 className="font-display leading-none" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}>
                ELITE <span className="text-primary italic">TRAINERS</span>
              </h2>
            </motion.div>
            <Link href="/trainers" className="hidden sm:flex items-center gap-2 text-primary/70 font-mono text-xs tracking-widest uppercase hover:text-primary transition-colors group">
              Meet All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {displayTrainers.slice(0, 4).map((trainer, i) => (
              <motion.div
                key={trainer.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: BZ }}
                className="group cursor-pointer"
              >
                <div className="relative h-[220px] sm:h-[300px] lg:h-[400px] overflow-hidden bg-[#0a0a0a]">
                  <img
                    src={trainer.photo_url || gym1}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 p-3 sm:p-5 w-full">
                    <div className="text-primary font-mono text-[9px] tracking-widest uppercase mb-1">
                      {trainer.speciality}
                    </div>
                    <h3 className="font-display text-white" style={{ fontSize: "clamp(1rem, 2.5vw, 1.6rem)" }}>
                      {trainer.name}
                    </h3>
                    <Link
                      href={`/book?trainer=${trainer.id}`}
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] text-primary/0 group-hover:text-primary tracking-widest uppercase transition-all duration-300 translate-y-2 group-hover:translate-y-0 mt-1"
                    >
                      Book Session <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link href="/trainers" className="ghost-gold-btn px-8 py-3 text-sm">Meet All Trainers</Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CINEMATIC CTA BANNER
      ════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-40 overflow-hidden section-clip-bottom">
        <img src="/hero1.png" alt="CTA" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)" }} />
        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: BZ }}
        >
          <span className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase mb-6 border border-primary/30 px-4 py-2 inline-block">
            Your Moment Is Now
          </span>
          <h2
            className="font-display text-white leading-[0.85] mb-3"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)", textShadow: "0 4px 60px rgba(0,0,0,0.8)" }}
          >
            START YOUR
          </h2>
          <h2
            className="font-display text-primary italic leading-[0.85] mb-8 sm:mb-12 text-glow"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
          >
            JOURNEY
          </h2>
          <p className="text-white/50 text-base sm:text-lg mb-10 sm:mb-12 max-w-xl mx-auto leading-relaxed">
            Join 500+ members already transforming their lives at Kevin Fitness, Jalandhar's most trusted gym.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-3 px-12 sm:px-16 py-5 sm:py-6 bg-primary text-white font-display text-xl sm:text-2xl tracking-widest uppercase hover:bg-white transition-all min-h-[60px] group hover:shadow-[0_0_40px_rgba(225,29,72,0.55)]"
          >
            Join Now <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════
          TESTIMONIALS CAROUSEL
      ════════════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════════════
          GALLERY STRIP
      ════════════════════════════════════════════════ */}
      <section className="grid grid-cols-2 md:grid-cols-4 h-[35vw] min-h-[180px] max-h-[400px]">
        {[gym1, gym2, gym3, gym4].map((img, i) => (
          <Link key={i} href="/gallery" className="relative overflow-hidden group block">
            <img
              src={img}
              alt={`Kevin Fitness Gallery ${i + 1}`}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-108 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-700" />
            {i === 3 && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-display text-white text-sm tracking-widest uppercase border border-white/40 px-4 py-2">
                  View Gallery
                </span>
              </div>
            )}
          </Link>
        ))}
      </section>

      {/* ── STICKY MOBILE CTA ── */}
      <div className={`sticky-cta md:hidden ${showStickyCta ? "visible" : ""}`}>
        <Link href="/book" className="font-display text-white tracking-widest uppercase text-base">
          Join Kevin Fitness — Book Now
        </Link>
      </div>
    </div>
  );
}
