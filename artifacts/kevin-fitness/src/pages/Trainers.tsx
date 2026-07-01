import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Award, Clock, Instagram, ArrowRight } from "lucide-react";
import gym1 from "@assets/image_1782887751159.png";
import gym3 from "@assets/image_1782887768921.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Trainers() {
  const [trainers, setTrainers] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("trainers").select("*").eq("active", true).then(({ data }) => {
      setTrainers(data && data.length > 0 ? data : [
        { id: 1, name: "Kevin Singh", role: "Head Trainer", speciality: "Strength & Conditioning", bio: "Founder and head trainer with a passion for transforming lives through heavy lifting and discipline.", certifications: "Advanced Strength Training, Sports Nutrition", photo_url: gym1, years_experience: 8 },
        { id: 2, name: "Priya Sharma", role: "Yoga & Flexibility", speciality: "Functional Fitness", bio: "Dedicated to improving mobility, core strength, and mental wellness through dynamic yoga flows.", certifications: "Certified Yoga Instructor", photo_url: gym3, years_experience: 5 },
        { id: 3, name: "Rahul Verma", role: "Cardio Specialist", speciality: "HIIT & Endurance", bio: "High energy coach focusing on cardiovascular health and fat loss through intense interval training.", certifications: "HIIT Certified, Nutrition Counselor", photo_url: null, years_experience: 6 },
        { id: 4, name: "Anita Kaur", role: "Weight Loss Expert", speciality: "Weight Management", bio: "Helping clients achieve sustainable weight loss through engaging routines and balanced nutrition.", certifications: "Zumba Certified, Nutrition Expert", photo_url: null, years_experience: 4 },
      ]);
    });
  }, []);

  return (
    <div className="min-h-[80vh] bg-depth-0">
      {/* Header */}
      <div className="bg-depth-3 section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="inline-block font-mono text-[10px] sm:text-xs tracking-[0.4em] text-primary uppercase mb-5 border border-primary/30 px-4 py-1.5"
          >
            The Team
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            Our <span className="text-primary italic">Experts</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
            className="w-16 sm:w-20 h-[2px] bg-primary mx-auto mt-4 mb-6 origin-left"
          />
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-white/50 text-sm sm:text-base max-w-xl mx-auto"
          >
            Guided by professionals who know exactly how to push you past your limits.
          </motion.p>
        </div>
      </div>

      {/* Trainer Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {trainers.map((trainer, i) => (
            <motion.div
              key={trainer.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              className="group relative overflow-hidden glass-card border border-white/6 flex flex-col sm:flex-row"
            >
              {/* Photo */}
              <div className="relative w-full sm:w-[200px] lg:w-[240px] h-[220px] sm:h-auto shrink-0 overflow-hidden bg-[#0a0a0a]">
                <img
                  src={trainer.photo_url || "/gallery1.png"}
                  alt={trainer.name}
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent sm:bg-gradient-to-r sm:from-black/70 sm:via-black/10 sm:to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                {/* Years badge */}
                <div className="absolute top-3 left-3 bg-primary px-2 py-1">
                  <span className="font-mono text-[9px] text-black font-bold tracking-widest uppercase">
                    {trainer.years_experience}+ Yrs
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 sm:p-6 lg:p-8 flex flex-col flex-1 min-w-0">
                <span className="text-primary font-mono text-[10px] tracking-widest uppercase mb-2">{trainer.speciality}</span>
                <h3 className="font-display text-2xl sm:text-3xl text-white mb-1">{trainer.name}</h3>
                <p className="text-white/35 text-xs font-mono tracking-wider uppercase mb-4 pb-4 border-b border-white/8">
                  {trainer.role}
                </p>
                <p className="text-sm text-white/55 leading-relaxed mb-5 flex-1">{trainer.bio}</p>

                {/* Certifications */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-start gap-2.5 text-xs text-white/40">
                    <Award className="w-3.5 h-3.5 text-primary/70 shrink-0 mt-0.5" />
                    <span>{trainer.certifications}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-white/40">
                    <Clock className="w-3.5 h-3.5 text-primary/70 shrink-0" />
                    <span>{trainer.years_experience}+ years of professional experience</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 items-center">
                  <Link
                    href={`/book?trainer=${trainer.id}`}
                    className="flex-1 ghost-gold-btn py-3 text-center text-xs min-h-[44px] flex items-center justify-center gap-2"
                  >
                    Book Session <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href="#"
                    className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/40 transition-colors shrink-0"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
