import { useState, useEffect } from "react";
import { Link } from "wouter";
import { supabase } from "@/lib/supabase";
import { Award, Clock } from "lucide-react";
import gym1 from "@assets/image_1782887751159.png";
import gym3 from "@assets/image_1782887768921.png";

export default function Trainers() {
  const [trainers, setTrainers] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("trainers").select("*").eq("active", true).then(({ data }) => {
      if (data && data.length > 0) {
        setTrainers(data);
      } else {
        setTrainers([
          { id: 1, name: "Kevin Singh", role: "Head Trainer", speciality: "Strength & Conditioning", bio: "Founder and head trainer with a passion for transforming lives through heavy lifting and discipline.", certifications: "Advanced Strength Training, Sports Nutrition", photo_url: gym1, years_experience: 8 },
          { id: 2, name: "Priya Sharma", role: "Yoga & Flexibility", speciality: "Functional Fitness", bio: "Dedicated to improving mobility, core strength, and mental wellness through dynamic yoga flows.", certifications: "Certified Yoga Instructor", photo_url: gym3, years_experience: 5 },
          { id: 3, name: "Rahul Verma", role: "Cardio Specialist", speciality: "HIIT & Endurance", bio: "High energy coach focusing on cardiovascular health and fat loss through intense interval training.", certifications: "HIIT Certified, Nutrition Counselor", photo_url: null, years_experience: 6 },
          { id: 4, name: "Anita Kaur", role: "Weight Loss Expert", speciality: "Weight Management", bio: "Helping clients achieve sustainable weight loss through engaging routines and balanced nutrition.", certifications: "Zumba Certified, Nutrition Expert", photo_url: null, years_experience: 4 },
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
            The Team
          </span>
          <h1
            className="font-display mb-4 sm:mb-6"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            Our <span className="text-primary italic">Experts</span>
          </h1>
          <div className="w-16 sm:w-24 h-1 bg-primary mx-auto mb-6 sm:mb-8"></div>
          <p className="text-muted-foreground text-base sm:text-lg px-2">
            Guided by professionals who know exactly how to push you past your limits.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 lg:gap-12">
          {trainers.map((trainer) => (
            <div key={trainer.id} className="bg-card border border-border flex flex-col sm:flex-row overflow-hidden gold-glow-hover">
              {/* Photo */}
              <div className="w-full sm:w-2/5 h-[200px] sm:h-auto min-h-[200px] bg-[#0a0a0a] shrink-0">
                <img
                  src={trainer.photo_url || "/gallery1.png"}
                  alt={trainer.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="p-5 sm:p-6 lg:p-8 sm:w-3/5 flex flex-col">
                <div className="text-primary font-mono text-[10px] sm:text-xs tracking-widest uppercase mb-2">
                  {trainer.speciality}
                </div>
                <h3
                  className="font-display mb-1"
                  style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
                >
                  {trainer.name}
                </h3>
                <p className="text-muted-foreground font-mono text-xs sm:text-sm mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border">
                  {trainer.role}
                </p>

                <p className="text-sm text-foreground/80 leading-relaxed mb-4 sm:mb-6 flex-1">
                  {trainer.bio}
                </p>

                <div className="space-y-2 sm:space-y-3 mb-5 sm:mb-8">
                  <div className="flex items-start text-xs text-muted-foreground gap-2 sm:gap-3">
                    <Award className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{trainer.certifications}</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground gap-2 sm:gap-3">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <span>{trainer.years_experience}+ Years Experience</span>
                  </div>
                </div>

                <Link
                  href={`/book?trainer=${trainer.id}`}
                  className="ghost-gold-btn w-full py-3 text-center text-sm mt-auto min-h-[48px]"
                >
                  Book Session
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
