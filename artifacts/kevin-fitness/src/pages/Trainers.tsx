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
          { id: 4, name: "Anita Kaur", role: "Weight Loss Expert", speciality: "Weight Management", bio: "Helping clients achieve sustainable weight loss through engaging routines and balanced nutrition.", certifications: "Zumba Certified, Nutrition Expert", photo_url: null, years_experience: 4 }
        ]);
      }
    });
  }, []);

  return (
    <div className="py-24 min-h-[80vh] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-display text-5xl md:text-7xl mb-6">Our <span className="text-primary">Experts</span></h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-muted-foreground text-lg">Guided by professionals who know exactly how to push you past your limits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {trainers.map((trainer) => (
            <div key={trainer.id} className="bg-card border border-border flex flex-col sm:flex-row overflow-hidden gold-glow-hover">
              <div className="sm:w-2/5 h-[280px] sm:h-auto bg-[#0a0a0a]">
                <img 
                  src={trainer.photo_url || "/gallery1.png"} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              
              <div className="p-8 sm:w-3/5 flex flex-col">
                <div className="text-primary font-mono text-xs tracking-widest uppercase mb-2">
                  {trainer.speciality}
                </div>
                <h3 className="font-display text-3xl mb-1">{trainer.name}</h3>
                <p className="text-muted-foreground font-mono text-sm mb-6 pb-6 border-b border-border">
                  {trainer.role}
                </p>
                
                <p className="text-sm text-foreground/80 leading-relaxed mb-6 flex-1">
                  {trainer.bio}
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start text-xs text-muted-foreground">
                    <Award className="w-4 h-4 text-primary mr-3 shrink-0" />
                    <span>{trainer.certifications}</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary mr-3 shrink-0" />
                    <span>{trainer.years_experience}+ Years Experience</span>
                  </div>
                </div>
                
                <Link 
                  href={`/book?trainer=${trainer.id}`} 
                  className="ghost-gold-btn w-full py-3 text-center text-sm mt-auto"
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
