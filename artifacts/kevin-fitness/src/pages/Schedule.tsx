import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Schedule() {
  const [classes, setClasses] = useState<any[]>([]);
  const [filterDay, setFilterDay] = useState("All");

  const days = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    supabase.from("classes").select(`*, trainer:trainers(name)`).eq("active", true).order("start_time").then(({ data }) => {
      if (data && data.length > 0) {
        setClasses(data);
      } else {
        setClasses([
          { id: 1, name: "Morning Yoga", trainer: { name: "Kevin" }, day_of_week: "Monday", start_time: "06:00:00", duration_minutes: 60, difficulty: "Beginner" },
          { id: 2, name: "HIIT Blast", trainer: { name: "Rahul" }, day_of_week: "Monday", start_time: "07:00:00", duration_minutes: 45, difficulty: "Advanced" },
          { id: 3, name: "Strength Training", trainer: { name: "Kevin" }, day_of_week: "Tuesday", start_time: "08:00:00", duration_minutes: 60, difficulty: "Intermediate" },
          { id: 4, name: "Zumba", trainer: { name: "Anita" }, day_of_week: "Wednesday", start_time: "06:00:00", duration_minutes: 45, difficulty: "Beginner" },
          { id: 5, name: "Body Pump", trainer: { name: "Rahul" }, day_of_week: "Wednesday", start_time: "07:00:00", duration_minutes: 60, difficulty: "Intermediate" },
          { id: 6, name: "Yoga Flow", trainer: { name: "Priya" }, day_of_week: "Thursday", start_time: "06:00:00", duration_minutes: 60, difficulty: "Beginner" },
          { id: 7, name: "Full Body", trainer: { name: "Kevin" }, day_of_week: "Saturday", start_time: "08:00:00", duration_minutes: 90, difficulty: "All Levels" },
          { id: 8, name: "Meditation", trainer: { name: "Priya" }, day_of_week: "Sunday", start_time: "09:00:00", duration_minutes: 75, difficulty: "Beginner" }
        ]);
      }
    });
  }, []);

  const filteredClasses = filterDay === "All" 
    ? classes 
    : classes.filter(c => c.day_of_week === filterDay);

  const getDifficultyColor = (diff: string) => {
    switch(diff?.toLowerCase()) {
      case 'beginner': return 'text-success border-success';
      case 'intermediate': return 'text-secondary border-secondary';
      case 'advanced': return 'text-destructive border-destructive';
      default: return 'text-primary border-primary';
    }
  };

  const formatTime = (timeStr: string) => {
    try {
      const [h, m] = timeStr.split(':');
      let hour = parseInt(h);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12;
      hour = hour ? hour : 12;
      return `${hour}:${m} ${ampm}`;
    } catch {
      return timeStr;
    }
  };

  return (
    <div className="py-24 min-h-[80vh] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-display text-5xl md:text-7xl mb-6">Class <span className="text-primary">Schedule</span></h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setFilterDay(day)}
                className={`px-4 py-2 font-mono text-sm tracking-wider uppercase transition-all ${
                  filterDay === day 
                    ? 'bg-primary text-background font-bold' 
                    : 'border border-border text-muted-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#111] border-b border-border">
                  <th className="p-6 font-display tracking-widest uppercase text-muted-foreground">Class</th>
                  <th className="p-6 font-display tracking-widest uppercase text-muted-foreground hidden sm:table-cell">Trainer</th>
                  <th className="p-6 font-display tracking-widest uppercase text-muted-foreground">Time</th>
                  <th className="p-6 font-display tracking-widest uppercase text-muted-foreground hidden md:table-cell">Day</th>
                  <th className="p-6 font-display tracking-widest uppercase text-muted-foreground text-right">Difficulty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((cls, i) => (
                    <tr key={cls.id || i} className="hover:bg-[#151515] transition-colors">
                      <td className="p-6">
                        <div className="font-display text-2xl text-foreground">{cls.name}</div>
                        <div className="text-muted-foreground font-mono text-xs sm:hidden mt-1">{cls.trainer?.name}</div>
                      </td>
                      <td className="p-6 hidden sm:table-cell font-mono text-sm text-foreground/80">{cls.trainer?.name || 'Staff'}</td>
                      <td className="p-6">
                        <div className="font-mono font-medium">{formatTime(cls.start_time)}</div>
                        <div className="text-xs text-muted-foreground font-mono mt-1">{cls.duration_minutes} min</div>
                      </td>
                      <td className="p-6 hidden md:table-cell font-mono text-sm uppercase tracking-wide">{cls.day_of_week}</td>
                      <td className="p-6 text-right">
                        <span className={`inline-block px-3 py-1 border font-mono text-xs uppercase tracking-wider ${getDifficultyColor(cls.difficulty)}`}>
                          {cls.difficulty}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-muted-foreground font-mono">
                      No classes scheduled for this day.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
