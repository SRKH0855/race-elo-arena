
import { useEffect } from 'react';
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import HeroSection from "@/components/home/HeroSection";
import ChampionshipsSection from "@/components/home/ChampionshipsSection";
import StandingsSection from "@/components/home/StandingsSection";
import BettingPromoSection from "@/components/home/BettingPromoSection";
import CommunitySection from "@/components/home/CommunitySection";
import { useAuth } from "@/context/AuthContext";
import UserDashboard from "@/components/home/UserDashboard";
import NewsFeed from "@/components/home/NewsFeed";

const Index = () => {
  // Set dark mode as default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      
      <main className="flex-1 mt-16">
        {isAuthenticated ? (
          // Authenticated user view
          <>
            <UserDashboard />
            <NewsFeed />
            <ChampionshipsSection />
            <StandingsSection />
          </>
        ) : (
          // Guest view
          <>
            <HeroSection />
            <ChampionshipsSection />
            <StandingsSection />
            <BettingPromoSection />
            <CommunitySection />
          </>
        )}
      </main>
      
      <MainFooter />
    </div>
  );
};

export default Index;
