
import { useEffect } from 'react';
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import RaceCalendar from "@/components/calendar/RaceCalendar";

const CalendarPage = () => {
  // Set dark mode as default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      
      <main className="flex-1 mt-16 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Racing Calendar</h1>
            <p className="text-muted-foreground mb-8">
              Complete schedule of upcoming races and events
            </p>
            
            <RaceCalendar />
          </div>
        </div>
      </main>
      
      <MainFooter />
    </div>
  );
};

export default CalendarPage;
