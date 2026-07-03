import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { Star, ChevronRight, ChevronLeft, ArrowUpRight } from "lucide-react";
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

const BZ: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Animated Counter ── */
function Counter({
  target,
  suffix = "",
  prefix = "",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
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

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── AI image with fallback ── */
function AiImg({
  src,
  fallbackSrc,
  alt,
  className,
  style,
  loading,
}: {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: "eager" | "lazy";
}) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      onError={() => {
        // Only switch to fallback once — guard against infinite error loops
        if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc);
      }}
    />
  );
}

/* ── Testimonials ── */
const reviews = [
  {
    text: "Great gym with clean and new equipment and a friendly vibe. Highly recommend if you're looking for a solid gym with a positive vibe.",
    author: "Gurpreet S.",
    rating: 5,
  },
  {
    text: "Excellent ambience. Gym owner is so supportive and behaves like a friend. Best gym in Jalandhar.",
    author: "Manpreet K.",
    rating: 5,
  },
  {
    text: "Fee is very affordable and all equipment is available. Trainers are very professional and motivating.",
    author: "Rajesh V.",
    rating: 5,
  },
  {
    text: "Loving my transformation journey here. Kevin sir gives personal attention to every member.",
    author: "Simran B.",
    rating: 5,
  },
  {
    text: "Clean, well-maintained, and a great community. My confidence has improved a lot since joining.",
    author: "Amit T.",
    rating: 5,
  },
  {
    text: "Best gym in the city! The trainers are certified, equipment is top-notch, and the energy is incredible.",
    author: "Pooja M.",
    rating: 5,
  },
];

function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    const timer = setInterval(() => emblaApi.scrollNext(), 4500);
    return () => {
      clearInterval(timer);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-20 lg:py-28" style={{ background: "#0c0d12" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
          <div>
            {/* Rating badge */}
            <div className="inline-flex items-center gap-2.5 border border-white/10 px-4 py-2 mb-5"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <span className="text-primary font-bold text-lg leading-none">4.9</span>
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-white/30 font-mono text-xs">
                Google Reviews
                {/* NOTE: Replace with live Google Places embed or keep as placeholder */}
              </span>
            </div>
            <h2
              className="text-white leading-none"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", letterSpacing: "0.04em" }}
            >
              WHAT MEMBERS <span className="text-primary">SAY</span>
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={scrollPrev}
              className="w-11 h-11 border border-white/15 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-11 h-11 bg-primary flex items-center justify-center text-white hover:brightness-110 transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container gap-4 sm:gap-5">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="embla__slide pr-4 sm:pr-5"
                style={{ flex: "0 0 100%", minWidth: 0 }}
              >
                <div
                  className="p-6 sm:p-8 h-full border border-white/[0.07]"
                  style={{ background: "#0f1018" }}
                >
                  <div
                    className="font-display text-primary mb-3 leading-none opacity-15"
                    style={{ fontSize: "4rem", letterSpacing: "0.04em" }}
                  >
                    "
                  </div>
                  <div className="flex text-primary mb-4">
                    {[...Array(r.rating)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/55 leading-relaxed text-sm sm:text-base mb-6 italic">
                    "{r.text}"
                  </p>
                  <div className="flex items-center gap-3 border-t border-white/[0.07] pt-5">
                    <div className="w-9 h-9 bg-primary flex items-center justify-center shrink-0">
                      <span className="font-bold text-white text-sm">G</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white">{r.author}</p>
                      <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                        Verified Google Review
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-[2px] transition-all duration-300 ${
                i === selectedIndex ? "w-8 bg-primary" : "w-3 bg-white/20"
              }`}
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
  const [servicesRef, servicesApi] = useEmblaCarousel({ align: "start", dragFree: true });

  useEffect(() => {
    supabase
      .from("memberships")
      .select("*")
      .eq("active", true)
      .order("price")
      .then(({ data }) => {
        setPlans(data ?? []);
      });
    supabase
      .from("trainers")
      .select("*")
      .eq("active", true)
      .then(({ data }) => {
        setTrainers(data ?? []);
      });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowStickyCta((heroRef.current?.getBoundingClientRect().bottom ?? 0) < 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Fallback data (shown while Supabase loads or if empty) ── */
  const fallbackPlans = [
    {
      id: 1,
      name: "Basic",
      price: 1200,
      duration: "month",
      features: [
        "Unlimited gym floor access",
        "1 group class included per month",
        "Locker room & shower access",
        "Body composition assessment on joining",
      ],
      popular: false,
    },
    {
      id: 2,
      name: "Standard",
      price: 3200,
      duration: "3 months",
      features: [
        "Everything in Basic",
        "3 personal training sessions per quarter",
        "Priority class booking",
        "Monthly trainer progress check-in",
        "Sauna & relaxation area access",
      ],
      popular: true,
    },
    {
      id: 3,
      name: "Premium",
      price: 9000,
      duration: "year",
      features: [
        "Everything in Standard",
        "Unlimited personal training sessions",
        "Custom nutrition plan + quarterly diet review",
        "Dedicated trainer assigned",
        "2 guest passes per month",
      ],
      popular: false,
    },
  ];

  const fallbackTrainers = [
    { id: 1, name: "Kevin Singh", role: "Head Trainer", photo_url: photoKevin },
    { id: 2, name: "Priya Sharma", role: "Yoga Expert", photo_url: photoPriya },
    { id: 3, name: "Rahul Verma", role: "Cardio Specialist", photo_url: photoRahul },
    { id: 4, name: "Anita Kaur", role: "Weight Loss Expert", photo_url: photoAnita },
  ];

  const hasLivePlans = plans.length > 0;
  const displayPlans = hasLivePlans ? plans : fallbackPlans;
  const displayTrainers = trainers.length > 0 ? trainers : fallbackTrainers;

  // Guarantee a featured plan
  const normalizedPlans = displayPlans.slice(0, 3).map((p, i) => ({
    ...p,
    _featured: p.popular || (!displayPlans.some((x: any) => x.popular) && i === 1),
  }));

  const heroContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };
  const heroItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: BZ } },
  };
  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { delay, duration: 0.55, ease: BZ } },
  });

  const serviceCards = [
    { name: "Personal Training", ai: "/ai/svc-personal-training.jpg", fallback: gym1 },
    { name: "Fitness Classes",   ai: "/ai/svc-fitness-classes.jpg",   fallback: gym2 },
    { name: "Strength Training", ai: "/ai/svc-strength.jpg",          fallback: gym3 },
    { name: "Cardio & Endurance",ai: "/ai/svc-cardio.jpg",            fallback: gym4 },
    { name: "Yoga & Flexibility",ai: "/ai/svc-yoga.jpg",              fallback: gym1 },
    { name: "HIIT Workouts",     ai: "/ai/svc-hiit.jpg",              fallback: gym2 },
  ];

  const whyFeatures = [
    {
      title: "State-of-the-Art Equipment",
      desc: "The latest cardio machines, free weights, and functional training rigs — all maintained to the highest standards so your only focus is the lift.",
    },
    {
      title: "Certified Expert Trainers",
      desc: "Every coach holds recognised fitness certifications and years of real-world experience. They don't hand you a generic plan — they craft yours.",
    },
    {
      title: "Flexible Daily Schedule",
      desc: "Doors open at 6 AM and stay open until 10 PM, seven days a week. Train before sunrise or after dinner — we're here whenever you are.",
    },
    {
      title: "Personalised Programs",
      desc: "Your goals, body type, and timeline drive the plan. Whether it's weight loss, strength, or sports performance, the program is built around you.",
    },
    {
      title: "Real Community, Real Results",
      desc: "500+ members who show up, push each other, and celebrate real milestones. At Kevin Fitness you're not a number — everyone knows your name.",
    },
    {
      title: "Proven Track Record",
      desc: "Five years and counting since 2019, with a 4.9-star Google rating and hundreds of transformations that speak for themselves.",
    },
  ];

  const trainerPhotos = [
    displayTrainers[0]?.photo_url || photoKevin,
    displayTrainers[1]?.photo_url || photoPriya,
    displayTrainers[2]?.photo_url || photoRahul,
  ];

  return (
    <div className="w-full">

      {/* ════════════════════════ HERO ════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex items-center overflow-hidden"
        style={{ background: "#09090f" }}
      >
        {/* Full-bleed AI background */}
        <div className="absolute inset-0">
          <AiImg
            src="/ai/hero.jpg"
            fallbackSrc="/hero1.png"
            alt=""
            className="w-full h-full object-cover object-center hero-zoom"
            loading="eager"
          />
          {/* Dark gradient — heavy left, light right */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, #09090f 28%, rgba(9,9,15,0.85) 52%, rgba(9,9,15,0.35) 80%, rgba(9,9,15,0.15) 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090f] via-transparent to-[#09090f]/50" />
          {/* Subtle crimson glow from left */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 60% at 10% 50%, rgba(201,30,57,0.10) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Text content */}
        <motion.div
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 sm:pb-24"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-lg sm:max-w-xl lg:max-w-2xl">

            {/* Eyebrow */}
            <motion.div variants={heroItem} className="flex items-center gap-3 mb-6">
              <span
                className="px-3 py-1 font-mono text-[11px] uppercase tracking-[0.25em] text-white/50 border border-white/12"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                Jalandhar, Punjab · Est. 2019
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={heroItem}
              className="text-white mb-6 leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.2rem, 8vw, 7.5rem)",
                letterSpacing: "0.04em",
                fontWeight: 400,
              }}
            >
              TRAIN WHERE
              <br />
              <span className="text-primary">CHAMPIONS</span>
              <br />
              ARE MADE
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={heroItem}
              className="text-white/50 text-base sm:text-lg leading-relaxed mb-8 max-w-md font-light"
            >
              Jalandhar's premier gym since 2019 — 500+ members trained, 4 certified coaches,
              open daily from 6 AM to 10 PM.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={heroItem}
              className="flex flex-col xs:flex-row gap-4 mb-12"
            >
              <Link href="/book" className="kf-btn-primary">
                Book a Free Trial
              </Link>
              <Link href="/schedule" className="kf-btn-ghost">
                View Schedule
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div variants={heroItem} className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {trainerPhotos.map((p, i) => (
                  <img
                    key={i}
                    src={p}
                    alt=""
                    className="w-10 h-10 rounded-full border-2 object-cover object-top"
                    style={{ borderColor: "#09090f" }}
                  />
                ))}
                <div
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center bg-primary text-white text-xs font-bold"
                  style={{ borderColor: "#09090f" }}
                >
                  +
                </div>
              </div>
              <div>
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-white/40 text-xs mt-0.5 font-mono">500+ members · 4.9 Google rating</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════ EDITORIAL INFO STRIP ════════════════════════ */}
      {/* Replaces the generic orange marquee ticker */}
      <div className="info-strip">
        <div className="info-strip-track">
          {Array(10)
            .fill("KEVIN FITNESS · JALANDHAR, PUNJAB · ESTABLISHED 2019 · 500+ MEMBERS · 4 CERTIFIED COACHES · OPEN 6AM–10PM DAILY · ")
            .map((text, i) => (
              <span key={i} className="px-10 font-mono text-[11px] uppercase tracking-[0.25em] text-white/20">
                {text}
              </span>
            ))}
        </div>
      </div>

      {/* ════════════════════════ QUICK ACCESS ════════════════════════ */}
      {/* Prominent homepage links to the three key functional pages */}
      <div className="grid grid-cols-1 sm:grid-cols-3" style={{ background: "#0f1018" }}>
        {[
          { label: "Our Trainers", path: "/trainers", note: "4 certified coaches" },
          { label: "Class Schedule", path: "/schedule", note: "20+ sessions weekly" },
          { label: "Book a Trial", path: "/book", note: "First session free" },
        ].map((item, i) => (
          <Link
            key={i}
            href={item.path}
            className="group border-b sm:border-b-0 sm:border-r border-white/[0.06] last:border-r-0 px-8 py-8 flex flex-col justify-between hover:bg-white/[0.025] transition-colors"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">
              {item.note}
            </span>
            <div className="flex items-end justify-between mt-6">
              <span
                className="font-display text-white group-hover:text-primary transition-colors leading-none"
                style={{ fontSize: "clamp(1.4rem, 2.8vw, 1.9rem)", letterSpacing: "0.06em" }}
              >
                {item.label}
              </span>
              <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-primary transition-colors shrink-0 mb-0.5" />
            </div>
          </Link>
        ))}
      </div>

      {/* ════════════════════════ ABOUT + STATS ════════════════════════ */}
      <section className="py-20 lg:py-28" style={{ background: "#0c0d12" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp()}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/30 block mb-5">
              About Kevin Fitness
            </span>
            <h2
              className="text-white mb-5 leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 5.5vw, 5rem)",
                letterSpacing: "0.04em",
              }}
            >
              YOUR FITNESS
              <br />
              JOURNEY <span className="text-primary">STARTS HERE</span>
            </h2>
            <p className="text-white/45 text-base sm:text-lg leading-relaxed max-w-2xl mb-16 font-light">
              At Kevin Fitness, we're dedicated to helping Jalandhar's residents unlock their full
              physical potential — with professional coaching, top-tier equipment, and a community
              that actually shows up for you.
            </p>
          </motion.div>

          {/* Stats — editorial typographic strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/[0.07] mb-16">
            {[
              { value: 5, suffix: "+", label: "Years of Excellence" },
              { value: 500, suffix: "+", label: "Active Members" },
              { value: 20, suffix: "+", label: "Weekly Classes" },
              { value: displayTrainers.length || 4, suffix: "", label: "Expert Trainers" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp(i * 0.08)}
                className="border-r border-b lg:border-b-0 border-white/[0.07] last:border-r-0 px-6 lg:px-8 py-8 lg:py-10"
              >
                <div
                  className="text-primary leading-none mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(3.5rem, 7vw, 6.5rem)",
                    letterSpacing: "0.03em",
                  }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35 mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Wide gym image — AI generated, links to gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: BZ }}
            className="relative overflow-hidden"
          >
            <AiImg
              src="/ai/about.jpg"
              fallbackSrc={gym1}
              alt="Kevin Fitness gym equipment"
              className="w-full object-cover"
              style={{ height: "clamp(200px, 38vw, 420px)" }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 flex items-end justify-between p-6 sm:p-8">
              <div>
                <p className="font-display text-white text-2xl sm:text-3xl tracking-wide leading-none">
                  SEE OUR SPACE
                </p>
                <p className="text-white/40 font-mono text-xs uppercase tracking-widest mt-1">
                  Real photos · Our actual gym
                </p>
              </div>
              <Link
                href="/gallery"
                className="kf-btn-sm shrink-0"
                style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
              >
                View Gallery
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════ SERVICES ════════════════════════ */}
      <section className="py-20 lg:py-28" style={{ background: "#090a0f" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/30 block mb-5">
            What We Offer
          </span>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-10">
            <h2
              className="text-white leading-none max-w-lg"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4.5vw, 4.2rem)",
                letterSpacing: "0.04em",
              }}
            >
              PREMIUM FITNESS
              <br />
              <span className="text-primary">SERVICES</span> FOR EVERY GOAL
            </h2>
            <div className="flex gap-2 shrink-0 self-start sm:self-center">
              <button
                onClick={() => servicesApi?.scrollPrev()}
                className="w-11 h-11 border border-white/15 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => servicesApi?.scrollNext()}
                className="w-11 h-11 bg-primary flex items-center justify-center text-white hover:brightness-110 transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal scroll */}
          <div className="overflow-hidden" ref={servicesRef}>
            <div className="flex gap-4" style={{ touchAction: "pan-y" }}>
              {serviceCards.map((s, i) => (
                <Link
                  key={i}
                  href="/schedule"
                  className="relative overflow-hidden group shrink-0 block"
                  style={{
                    width: "clamp(200px, 28vw, 270px)",
                    height: "clamp(270px, 36vw, 350px)",
                  }}
                >
                  <AiImg
                    src={s.ai}
                    fallbackSrc={s.fallback}
                    alt={s.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  {/* Bottom label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="border-t border-white/20 pt-3 flex items-end justify-between">
                      <span className="font-display text-white leading-none"
                        style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", letterSpacing: "0.06em" }}
                      >
                        {s.name.toUpperCase()}
                      </span>
                      <div
                        className="w-8 h-8 bg-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                        style={{ clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" }}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════ WHY CHOOSE US — numbered grid, no accordion ════════════════════════ */}
      <section className="py-20 lg:py-28" style={{ background: "#0c0d12" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp()}
            className="mb-14 sm:mb-16"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/30 block mb-5">
              Why Kevin Fitness
            </span>
            <h2
              className="text-white leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 5.5vw, 5rem)",
                letterSpacing: "0.04em",
              }}
            >
              SIX REASONS
              <br />
              MEMBERS <span className="text-primary">STAY</span>
            </h2>
          </motion.div>

          {/* Numbered feature grid — always visible, no accordion.
              Border approach: container carries left+top; each cell carries right+bottom.
              This naturally produces a clean grid regardless of column count. */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.07)", borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            {whyFeatures.map((f, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp(i * 0.07)}
                className="p-8 lg:p-10"
                style={{
                  borderRight: "1px solid rgba(255,255,255,0.07)",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span
                  className="font-display text-primary leading-none block mb-5"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "0.06em", opacity: 0.22 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4
                  className="font-display text-white mb-3 leading-none"
                  style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)", letterSpacing: "0.05em" }}
                >
                  {f.title.toUpperCase()}
                </h4>
                <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ PRICING PREVIEW ════════════════════════ */}
      <section className="py-20 lg:py-28" style={{ background: "#090a0f" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp()}
            className="text-center mb-14"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/30 block mb-5">
              Memberships
            </span>
            <h2
              className="text-white leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 5.5vw, 5rem)",
                letterSpacing: "0.04em",
              }}
            >
              PLANS FOR <span className="text-primary">EVERY GOAL</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/[0.07]">
            {normalizedPlans.map((plan, i) => {
              const featured = plan._featured;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55, ease: BZ }}
                  className="relative flex flex-col border-r border-white/[0.07] last:border-r-0 p-8 sm:p-10"
                  style={
                    featured
                      ? { background: "hsl(var(--primary))" }
                      : { background: "#0c0d12" }
                  }
                >
                  {featured && (
                    <span
                      className="absolute top-0 right-0 font-mono text-[9px] uppercase tracking-[0.2em] text-primary bg-[#09090f] px-3 py-1"
                    >
                      Most Popular
                    </span>
                  )}
                  <h3
                    className="font-display text-white mb-1 leading-none"
                    style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "0.06em" }}
                  >
                    {plan.name.toUpperCase()}
                  </h3>
                  <div className="mb-1 flex items-baseline gap-1.5 mt-3">
                    <span
                      className="font-display text-white leading-none"
                      style={{ fontSize: "clamp(2.8rem, 5.5vw, 4rem)", letterSpacing: "0.02em" }}
                    >
                      ₹{plan.price.toLocaleString()}
                    </span>
                    <span className={`text-sm font-light ${featured ? "text-white/60" : "text-white/30"}`}>
                      /{plan.duration}
                    </span>
                  </div>
                  <p
                    className={`text-xs mb-6 pb-6 border-b font-mono uppercase tracking-wide ${
                      featured ? "text-white/55 border-white/20" : "text-white/30 border-white/[0.07]"
                    }`}
                  >
                    {i === 0
                      ? "Essential training access"
                      : i === 1
                      ? "Accelerated progress package"
                      : "Total commitment, maximum results"}
                  </p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features?.map((f: string, j: number) => (
                      <li
                        key={j}
                        className={`flex items-start gap-3 text-sm ${
                          featured ? "text-white/90" : "text-white/55"
                        }`}
                      >
                        <span
                          className={`w-1 h-1 rounded-full shrink-0 mt-2 ${
                            featured ? "bg-white" : "bg-primary"
                          }`}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={hasLivePlans ? `/book?plan=${plan.id}` : "/book"}
                    className={`w-full py-3.5 text-center font-display tracking-widest text-sm flex items-center justify-center transition-all ${
                      featured
                        ? "bg-white/15 text-white hover:bg-white/25 border border-white/20"
                        : "border border-white/12 text-white/55 hover:border-primary hover:text-primary"
                    }`}
                    style={{ letterSpacing: "0.12em" }}
                  >
                    GET STARTED
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/memberships"
              className="text-white/35 hover:text-primary font-mono text-xs uppercase tracking-[0.2em] transition-colors inline-flex items-center gap-2"
            >
              Compare all plans <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════ TESTIMONIALS ════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════ GALLERY STRIP — real photos, appropriate context ════════════════════════ */}
      <section style={{ background: "#09090f" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/30 block mb-1">
                Our Space
              </span>
              <p className="font-display text-white text-2xl sm:text-3xl tracking-wide leading-none">
                THE REAL THING
              </p>
            </div>
            <Link
              href="/gallery"
              className="kf-btn-sm-ghost"
            >
              Full Gallery
            </Link>
          </div>
        </div>
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ height: "clamp(140px, 26vw, 340px)" }}
        >
          {[gym1, gym2, gym3, gym4].map((img, i) => (
            <Link key={i} href="/gallery" className="relative overflow-hidden group block">
              <img
                src={img}
                alt={`Kevin Fitness — our gym, image ${i + 1}`}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/15 transition-all duration-700" />
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════ CTA SECTION ════════════════════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: "#0c0d12" }}>
        {/* Crimson radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none blur-3xl"
          style={{ background: "rgba(201,30,57,0.10)" }}
        />
        {/* Horizontal accent lines */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,30,57,0.3), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,30,57,0.3), transparent)" }} />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: BZ }}
          className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/30 block mb-6">
            Start Today
          </span>
          <h2
            className="text-white mb-6 leading-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.6rem, 6.5vw, 6rem)",
              letterSpacing: "0.04em",
            }}
          >
            READY TO
            <br />
            <span className="text-primary">TRANSFORM?</span>
          </h2>
          <p className="text-white/40 text-base sm:text-lg mb-12 max-w-xl mx-auto leading-relaxed font-light">
            Join 500+ members already training at Jalandhar's most-trusted gym. No commitment — start
            with a free trial session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="kf-btn-primary" style={{ fontSize: "1.05rem", padding: "16px 44px" }}>
              Join Now — It's Free to Start
            </Link>
            <Link href="/contact" className="kf-btn-ghost" style={{ fontSize: "1.05rem", padding: "16px 36px" }}>
              Ask Us Anything
            </Link>
          </div>
        </motion.div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div className={`sticky-cta md:hidden ${showStickyCta ? "visible" : ""}`}>
        <Link href="/book" className="font-display tracking-widest text-white text-base" style={{ letterSpacing: "0.12em" }}>
          JOIN KEVIN FITNESS
        </Link>
      </div>
    </div>
  );
}
