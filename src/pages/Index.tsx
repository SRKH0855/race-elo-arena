
import { useEffect } from 'react';
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import HeroSection from "@/components/home/HeroSection";
import ChampionshipsSection from "@/components/home/ChampionshipsSection";
import StandingsSection from "@/components/home/StandingsSection";
import BettingPromoSection from "@/components/home/BettingPromoSection";
import CommunitySection from "@/components/home/CommunitySection";

const Index = () => {
  // Set dark mode as default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      
      <main className="flex-1 mt-16">
        <HeroSection />
        <ChampionshipsSection />
        <StandingsSection />
        <BettingPromoSection />
        <CommunitySection />
      </main>
      
      <MainFooter />
    </div>
  );
};

export default Index;
