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
          { id: 8, name: "Meditation", trainer: { name: "Priya" }, day_of_week: "Sunday", start_time: "09:00:00", duration_minutes: 75, difficulty: "Beginner" },
        ]);
      }
    });
  }, []);

  const filteredClasses = filterDay === "All"
    ? classes
    : classes.filter(c => c.day_of_week === filterDay);

  const getDifficultyColor = (diff: string) => {
    switch (diff?.toLowerCase()) {
      case "beginner": return "text-success border-success";
      case "intermediate": return "text-secondary border-secondary";
      case "advanced": return "text-destructive border-destructive";
      default: return "text-primary border-primary";
    }
  };

  const formatTime = (timeStr: string) => {
    try {
      const [h, m] = timeStr.split(":");
      let hour = parseInt(h);
      const ampm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12 || 12;
      return `${hour}:${m} ${ampm}`;
    } catch {
      return timeStr;
    }
  };

  return (
    <div className="section-pad min-h-[80vh] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-primary uppercase mb-4 block">
            Timetable
          </span>
          <h1
            className="font-display mb-4 sm:mb-6"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            Class <span className="text-primary italic">Schedule</span>
          </h1>
          <div className="w-16 sm:w-24 h-1 bg-primary mx-auto mb-6 sm:mb-8"></div>

          {/* Day filter — horizontal scroll on mobile */}
          <div className="overflow-x-auto hide-scrollbar -mx-4 px-4">
            <div className="flex gap-2 w-max mx-auto pb-1">
              {days.map(day => (
                <button
                  key={day}
                  onClick={() => setFilterDay(day)}
                  className={`px-3 sm:px-4 py-2.5 font-mono text-xs sm:text-sm tracking-wider uppercase transition-all whitespace-nowrap min-h-[44px] ${
                    filterDay === day
                      ? "bg-primary text-black font-bold"
                      : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {day === "All" ? day : day.substring(0, 3)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block bg-card border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#111] border-b border-border">
                  <th className="p-4 sm:p-6 font-display tracking-widest uppercase text-muted-foreground text-sm">Class</th>
                  <th className="p-4 sm:p-6 font-display tracking-widest uppercase text-muted-foreground text-sm hidden sm:table-cell">Trainer</th>
                  <th className="p-4 sm:p-6 font-display tracking-widest uppercase text-muted-foreground text-sm">Time</th>
                  <th className="p-4 sm:p-6 font-display tracking-widest uppercase text-muted-foreground text-sm hidden md:table-cell">Day</th>
                  <th className="p-4 sm:p-6 font-display tracking-widest uppercase text-muted-foreground text-sm text-right">Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((cls, i) => (
                    <tr key={cls.id || i} className="hover:bg-[#151515] transition-colors">
                      <td className="p-4 sm:p-6">
                        <div className="font-display text-xl sm:text-2xl text-foreground">{cls.name}</div>
                        <div className="text-muted-foreground font-mono text-xs sm:hidden mt-1">{cls.trainer?.name}</div>
                      </td>
                      <td className="p-4 sm:p-6 hidden sm:table-cell font-mono text-sm text-foreground/80">{cls.trainer?.name || "Staff"}</td>
                      <td className="p-4 sm:p-6">
                        <div className="font-mono font-medium text-sm sm:text-base">{formatTime(cls.start_time)}</div>
                        <div className="text-xs text-muted-foreground font-mono mt-1">{cls.duration_minutes} min</div>
                      </td>
                      <td className="p-4 sm:p-6 hidden md:table-cell font-mono text-sm uppercase tracking-wide">{cls.day_of_week}</td>
                      <td className="p-4 sm:p-6 text-right">
                        <span className={`inline-block px-2 sm:px-3 py-1 border font-mono text-xs uppercase tracking-wider ${getDifficultyColor(cls.difficulty)}`}>
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

        {/* Mobile Cards — replaces table on small screens */}
        <div className="sm:hidden space-y-3">
          {filteredClasses.length > 0 ? (
            filteredClasses.map((cls, i) => (
              <div key={cls.id || i} className="bg-card border border-border p-4 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="font-display text-xl text-foreground leading-tight mb-1">{cls.name}</div>
                  <div className="text-muted-foreground font-mono text-xs mb-2">
                    {cls.trainer?.name || "Staff"} · {cls.day_of_week}
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-sm font-medium text-foreground">{formatTime(cls.start_time)}</span>
                    <span className="text-muted-foreground font-mono text-xs">{cls.duration_minutes} min</span>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className={`inline-block px-2 py-1 border font-mono text-[9px] uppercase tracking-wider ${getDifficultyColor(cls.difficulty)}`}>
                    {cls.difficulty}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-muted-foreground font-mono text-sm">
              No classes scheduled for this day.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
