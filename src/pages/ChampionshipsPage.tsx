
import { useEffect, useState } from 'react';
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActiveChampionships from "@/components/championships/ActiveChampionships";
import PastChampionships from "@/components/championships/PastChampionships";
import ChampionshipCalendar from "@/components/championships/ChampionshipCalendar";

const ChampionshipsPage = () => {
  // Set dark mode as default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const [activeTab, setActiveTab] = useState('active');
  
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      
      <main className="flex-1 mt-16 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Racing Championships</h1>
                <p className="text-muted-foreground">Explore ongoing and past racing championships</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Tabs 
                  defaultValue="active" 
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full md:w-auto"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            <div className="mt-8">
              {activeTab === 'active' && <ActiveChampionships />}
              {activeTab === 'past' && <PastChampionships />}
              {activeTab === 'calendar' && <ChampionshipCalendar />}
            </div>
          </div>
        </div>
      </main>
      
      <MainFooter />
    </div>
  );
};

export default ChampionshipsPage;
