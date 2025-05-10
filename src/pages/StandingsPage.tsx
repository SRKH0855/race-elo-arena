
import { useEffect } from 'react';
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import StandingsPodium from "@/components/standings/StandingsPodium";
import StandingsTable from "@/components/standings/StandingsTable";
import StandingsCharts from "@/components/standings/StandingsCharts";

const StandingsPage = () => {
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
            <h1 className="text-4xl font-bold mb-2">Championship Standings</h1>
            <p className="text-muted-foreground mb-8">
              Current rankings and performance metrics for all drivers
            </p>
            
            <StandingsPodium />
            
            <div className="mt-16">
              <StandingsTable />
            </div>
            
            <div className="mt-16">
              <StandingsCharts />
            </div>
          </div>
        </div>
      </main>
      
      <MainFooter />
    </div>
  );
};

export default StandingsPage;
