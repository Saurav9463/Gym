import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Star, ChevronRight, ChevronLeft, Play, Check, Minus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import useEmblaCarousel from "embla-carousel-react";

const BZ: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

/* ── Accordion Item for Why Choose Us ── */
function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: { title: string; desc: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen ? "border border-primary/40 bg-primary/[0.06]" : "border border-white/10 bg-white/[0.025]"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-4"
      >
        <span
          className={`font-semibold text-base sm:text-lg transition-colors ${
            isOpen ? "text-white" : "text-white/65"
          }`}
        >
          {item.title}
        </span>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
            isOpen ? "bg-primary text-white" : "border border-white/20 text-white/40"
          }`}
        >
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="px-4 sm:px-5 pb-5 text-white/55 text-sm sm:text-base leading-relaxed">
          {item.desc}
        </div>
      )}
    </div>
  );
}

/* ── Testimonials ── */
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
    const timer = setInterval(() => emblaApi.scrollNext(), 4500);
    return () => { clearInterval(timer); emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-20 lg:py-28" style={{ background: "#0d0a08" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <span className="text-primary text-sm font-semibold tracking-wide block mb-3">Reviews</span>
            <h2 className="text-white leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Real <span className="text-primary">Results</span>
            </h2>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-primary font-bold text-2xl">4.9</span>
              <div className="flex text-primary">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
              <span className="text-white/30 font-mono text-xs">(154 Google reviews)</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={scrollPrev} className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-primary hover:text-primary transition-colors" aria-label="Previous">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={scrollNext} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:brightness-110 transition-all" aria-label="Next">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container gap-4 sm:gap-5">
            {reviews.map((r, i) => (
              <div key={i} className="embla__slide pr-4 sm:pr-5" style={{ flex: "0 0 100%", minWidth: 0 }}>
                <div className="rounded-2xl p-6 sm:p-8 h-full border border-white/8" style={{ background: "#1a1715" }}>
                  <div className="text-primary font-black text-5xl leading-none mb-2 opacity-20">"</div>
                  <div className="flex text-primary mb-4">
                    {[...Array(r.rating)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <p className="text-white/60 leading-relaxed text-sm sm:text-base mb-6 italic">"{r.text}"</p>
                  <div className="flex items-center gap-3 border-t border-white/8 pt-5">
                    <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center shrink-0">
                      <span className="font-bold text-white text-sm">G</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white">{r.author}</p>
                      <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Verified Google Review</p>
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
              className={`h-[3px] rounded-full transition-all duration-300 ${i === selectedIndex ? "w-8 bg-primary" : "w-3 bg-white/20"}`}
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
  const [openAccordion, setOpenAccordion] = useState(1);
  const heroRef = useRef<HTMLElement>(null);
  const [servicesRef, servicesApi] = useEmblaCarousel({ align: "start", dragFree: true });

  useEffect(() => {
    supabase.from("memberships").select("*").eq("active", true).order("price").then(({ data }) => { setPlans(data ?? []); });
    supabase.from("trainers").select("*").eq("active", true).then(({ data }) => { setTrainers(data ?? []); });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowStickyCta((heroRef.current?.getBoundingClientRect().bottom ?? 0) < 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fallbackPlans = [
    { id: 1, name: "Basic", price: 1200, duration: "month", features: ["Unlimited access to the gym", "1 free group class per month", "Free access to relaxation areas"], popular: false },
    { id: 2, name: "Standard", price: 3200, duration: "3 months", features: ["Unlimited access to the gym", "3 free group classes per month", "Free access to relaxation areas and sauna"], popular: true },
    { id: 3, name: "Premium", price: 9000, duration: "year", features: ["Unlimited access to the gym", "Unlimited group classes", "2 personal training sessions per month", "Free access to all amenities"], popular: false },
  ];
  const fallbackTrainers = [
    { id: 1, name: "Kevin Singh", role: "Head Trainer", photo_url: photoKevin },
    { id: 2, name: "Priya Sharma", role: "Yoga Expert", photo_url: photoPriya },
    { id: 3, name: "Rahul Verma", role: "Cardio Specialist", photo_url: photoRahul },
    { id: 4, name: "Anita Kaur", role: "Weight Loss Expert", photo_url: photoAnita },
  ];

  const displayPlans = plans.length > 0 ? plans : fallbackPlans;
  const displayTrainers = trainers.length > 0 ? trainers : fallbackTrainers;

  // Guarantee a featured plan: prefer explicit popular flag, else force index 1
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
    { name: "Personal Training", img: gym1 },
    { name: "Fitness Classes", img: gym2 },
    { name: "Strength Training", img: gym3 },
    { name: "Cardio & Endurance", img: gym4 },
    { name: "Yoga & Flexibility", img: gym1 },
    { name: "HIIT Workouts", img: gym2 },
  ];

  const whyFeatures = [
    {
      title: "State-of-the-Art Equipment",
      desc: "Our gym features the latest cardio machines, free weights, and functional training equipment, maintained to the highest standards for your safety and peak performance.",
    },
    {
      title: "Expert Trainers",
      desc: "Our certified trainers guide you every step of the way. With years of experience, they craft personalised programs that are effective, safe, and sustainable for your goals.",
    },
    {
      title: "Flexible Schedules",
      desc: "Open every day from 6 AM to 10 PM so you can train on your own terms. Morning, afternoon, and evening slots are available for all classes and sessions.",
    },
    {
      title: "Personalised Programs",
      desc: "Every member gets a customised workout and nutrition plan tailored to their specific goals — whether it's weight loss, muscle gain, endurance, or overall health.",
    },
    {
      title: "Welcoming Community",
      desc: "Join 500+ members who motivate and support each other every day. Kevin Fitness isn't just a gym — it's a community built on shared goals and real, lasting results.",
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
        style={{ background: "#0d0a08" }}
      >
        {/* Full-bleed background with gradient */}
        <div className="absolute inset-0">
          <img
            src="/hero1.png"
            alt=""
            className="w-full h-full object-cover object-center hero-zoom"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #0d0a08 30%, rgba(13,10,8,0.88) 55%, rgba(13,10,8,0.45) 75%, rgba(13,10,8,0.2) 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a08] via-transparent to-[#0d0a08]/40" />
        </div>

        {/* Trainer photo — right half */}
        <div className="absolute right-0 inset-y-0 w-[45%] sm:w-[42%] lg:w-[40%] pointer-events-none select-none hidden sm:block">
          <img
            src="/hero2.png"
            alt="Kevin Fitness Trainer"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #0d0a08 0%, rgba(13,10,8,0.3) 35%, transparent 70%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a08] via-transparent to-[#0d0a08]/20" />
          {/* Warm orange glow overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 70% 40%, rgba(255,90,31,0.12) 0%, transparent 60%)",
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
            {/* Tag */}
            <motion.div variants={heroItem} className="flex items-center gap-2 mb-5">
              <span className="text-primary text-lg leading-none">⚡</span>
              <span className="text-primary text-sm font-semibold">Premier Fitness Club · Est. 2019</span>
            </motion.div>

            {/* Heading — mixed case like reference */}
            <motion.h1
              variants={heroItem}
              className="text-white mb-5 leading-[1.05]"
              style={{
                fontSize: "clamp(2.6rem, 5.8vw, 5rem)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                fontFamily: "var(--font-display)",
                textTransform: "none",
              }}
            >
              Push Your <span className="text-primary">Limits</span>
              <br />
              with Us
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={heroItem}
              className="text-white/55 text-base sm:text-lg leading-relaxed mb-8 max-w-md"
            >
              From beginner to advanced, experience workouts designed to help you achieve peak
              performance and exceed your fitness goals.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={heroItem} className="flex flex-col xs:flex-row gap-3 mb-10">
              <Link href="/book" className="pill-btn-primary">
                Join Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/schedule" className="pill-btn-ghost">
                <Play className="w-4 h-4 fill-current shrink-0" /> View Schedule
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
                    style={{ borderColor: "#0d0a08" }}
                  />
                ))}
                <div
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center bg-primary text-white text-xs font-bold"
                  style={{ borderColor: "#0d0a08" }}
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
                <p className="text-white/50 text-xs mt-0.5 font-mono">500+ Happy Members</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Service chips — bottom */}
        <div className="absolute bottom-6 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 flex-wrap">
              {[
                "Personal Training",
                "Strength",
                "Group Classes",
                "Cardio Equipment",
                "Functional Workouts",
              ].map((chip) => (
                <span
                  key={chip}
                  className="px-4 py-1.5 rounded-full border border-white/20 text-white/60 text-xs sm:text-sm bg-white/5 backdrop-blur-sm"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════ ABOUT + STATS ════════════════════════ */}
      <section className="py-20 lg:py-28" style={{ background: "#111113" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp()}
          >
            <span className="text-primary text-sm font-semibold block mb-4">About Us</span>
            <h2
              className="text-white mb-4 leading-tight"
              style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.6rem)", fontWeight: 800, letterSpacing: "-0.025em" }}
            >
              YOUR <span className="text-primary">FITNESS</span> JOURNEY STARTS HERE
            </h2>
            <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-2xl mb-14">
              At Kevin Fitness, we are dedicated to helping you unlock your full fitness potential.
              With top-tier equipment, expert trainers, and a welcoming community, we provide the
              perfect environment to push your limits and achieve your goals.
            </p>
          </motion.div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 mb-16">
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
                variants={fadeUp(i * 0.1)}
                className={`${i < 3 ? "border-r border-white/8" : ""} pr-4`}
              >
                <div
                  className="text-primary font-black mb-2"
                  style={{
                    fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-white/55 text-sm sm:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Wide gym image with play */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: BZ }}
            className="relative rounded-2xl overflow-hidden"
          >
            <img
              src={gym1}
              alt="Kevin Fitness Gym Interior"
              className="w-full object-cover"
              style={{ height: "clamp(200px, 38vw, 420px)" }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Link
                href="/gallery"
                aria-label="View gym gallery"
                className="w-16 h-16 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                style={{ boxShadow: "0 0 30px rgba(255,90,31,0.5)" }}
              >
                <Play className="w-6 h-6 text-white fill-current ml-1" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════ SERVICES ════════════════════════ */}
      <section className="py-20 lg:py-28" style={{ background: "#0d0a08" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary text-sm font-semibold block mb-4">Our Services</span>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-10">
            <h2
              className="text-white leading-tight max-w-lg"
              style={{
                fontSize: "clamp(1.5rem, 3.2vw, 2.6rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: "1.15",
              }}
            >
              Unleash Your Potential:{" "}
              <span className="text-primary">Premium Fitness Services</span> Tailored for You
            </h2>
            <div className="flex gap-2 shrink-0 self-start sm:self-center">
              <button
                onClick={() => servicesApi?.scrollPrev()}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => servicesApi?.scrollNext()}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:brightness-110 transition-all"
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
                  className="relative rounded-2xl overflow-hidden group shrink-0 block"
                  style={{ width: "clamp(200px, 28vw, 270px)", height: "clamp(270px, 36vw, 350px)" }}
                >
                  <img
                    src={s.img}
                    alt={s.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-white font-bold text-base sm:text-lg leading-tight">
                      {s.name}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════ WHY CHOOSE US ════════════════════════ */}
      <section className="py-20 lg:py-28" style={{ background: "#111113" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp()}
            className="mb-10 sm:mb-14"
          >
            <span className="text-primary text-sm font-semibold block mb-4">Preferences</span>
            <h2
              className="text-white leading-tight"
              style={{
                fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: "1.1",
              }}
            >
              WHY CHOOSE US FOR YOUR{" "}
              <span className="text-primary">FITNESS</span> JOURNEY?
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: BZ }}
            >
              <img
                src="/hero2.png"
                alt="Kevin Fitness"
                className="w-full rounded-2xl object-cover"
                style={{ height: "clamp(300px, 45vw, 520px)" }}
                loading="lazy"
              />
            </motion.div>

            {/* Accordion */}
            <motion.div
              className="space-y-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
            >
              {whyFeatures.map((f, i) => (
                <motion.div key={i} variants={heroItem}>
                  <AccordionItem
                    item={f}
                    isOpen={openAccordion === i}
                    onToggle={() => setOpenAccordion(openAccordion === i ? -1 : i)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════ PRICING PREVIEW ════════════════════════ */}
      <section className="py-20 lg:py-28" style={{ background: "#0d0a08" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp()}
            className="text-center mb-12"
          >
            <span className="text-primary text-sm font-semibold block mb-4">Subscriptions</span>
            <h2
              className="text-white leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)", fontWeight: 800, letterSpacing: "-0.025em" }}
            >
              FLEXIBLE <span className="text-primary">PLANS</span> FOR EVERY GOAL
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {normalizedPlans.map((plan, i) => {
              const featured = plan._featured;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55, ease: BZ }}
                  className="relative rounded-2xl p-6 sm:p-8 flex flex-col"
                  style={
                    featured
                      ? { background: "hsl(var(--primary))" }
                      : { background: "#1a1715", border: "1px solid rgba(255,255,255,0.08)" }
                  }
                >
                  <h3 className="font-bold text-xl text-white mb-2">{plan.name}</h3>
                  <div className="mb-1 flex items-baseline gap-1">
                    <span
                      className="font-black text-4xl sm:text-5xl text-white"
                      style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                    >
                      ₹{plan.price.toLocaleString()}
                    </span>
                    <span className={`text-sm ${featured ? "text-white/65" : "text-white/35"}`}>
                      /{plan.duration}
                    </span>
                  </div>
                  <p
                    className={`text-xs mb-5 pb-5 border-b ${
                      featured
                        ? "text-white/60 border-white/20"
                        : "text-white/35 border-white/8"
                    }`}
                  >
                    {i === 0
                      ? "Essential package for regular workouts"
                      : i === 1
                      ? "Extended package for comprehensive training"
                      : "Deluxe package with maximum benefits"}
                  </p>
                  <p
                    className={`text-[10px] font-semibold tracking-widest uppercase mb-4 ${
                      featured ? "text-white/65" : "text-white/35"
                    }`}
                  >
                    WHAT YOU GET
                  </p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features?.map((f: string, j: number) => (
                      <li
                        key={j}
                        className={`flex items-start gap-2.5 text-sm ${
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
                    href={`/book?plan=${plan.id}`}
                    className={`w-full py-3.5 rounded-xl text-center font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                      featured
                        ? "bg-white/15 text-white hover:bg-white/25 border border-white/25"
                        : "border border-white/15 text-white/70 hover:border-primary hover:text-primary"
                    }`}
                  >
                    Get started <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/memberships"
              className="text-primary/70 hover:text-primary font-medium text-sm transition-colors inline-flex items-center gap-1"
            >
              View all plans & compare <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════ TESTIMONIALS ════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════ GALLERY STRIP ════════════════════════ */}
      <section
        className="grid grid-cols-2 md:grid-cols-4"
        style={{ height: "clamp(150px, 28vw, 380px)" }}
      >
        {[gym1, gym2, gym3, gym4].map((img, i) => (
          <Link key={i} href="/gallery" className="relative overflow-hidden group block">
            <img
              src={img}
              alt={`Kevin Fitness Gallery ${i + 1}`}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-700" />
            {i === 3 && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-semibold text-white text-sm border border-white/40 rounded-full px-5 py-2">
                  View Gallery
                </span>
              </div>
            )}
          </Link>
        ))}
      </section>

      {/* ════════════════════════ CTA SECTION ════════════════════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: "#111113" }}>
        <div className="absolute inset-0 opacity-15">
          <img src="/hero1.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "#111113", opacity: 0.85 }} />
        </div>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full pointer-events-none blur-3xl"
          style={{ background: "rgba(255,90,31,0.12)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: BZ }}
          className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center"
        >
          <span className="text-primary text-sm font-semibold block mb-5">Start Today</span>
          <h2
            className="text-white mb-6 leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              textTransform: "none",
            }}
          >
            Ready to Transform Your Body & Life?
          </h2>
          <p className="text-white/50 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join 500+ members already transforming their lives at Kevin Fitness, Jalandhar's most
            trusted gym.
          </p>
          <Link
            href="/book"
            className="pill-btn-primary"
            style={{ fontSize: "1.05rem", padding: "14px 36px" }}
          >
            Join Now <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div className={`sticky-cta md:hidden ${showStickyCta ? "visible" : ""}`}>
        <Link href="/book" className="font-semibold text-white text-base">
          Join Kevin Fitness — Book Now
        </Link>
      </div>
    </div>
  );
}
