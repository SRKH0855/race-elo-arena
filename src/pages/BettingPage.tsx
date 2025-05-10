
import { useEffect } from 'react';
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import BettingDashboard from "@/components/betting/BettingDashboard";
import ActiveMarkets from "@/components/betting/ActiveMarkets";
import MyBets from "@/components/betting/MyBets";
import BettingTerms from "@/components/betting/BettingTerms";
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const BettingPage = () => {
  // Set dark mode as default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      
      <main className="flex-1 mt-16 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {isAuthenticated ? (
              <>
                <h1 className="text-4xl font-bold mb-2">Betting Center</h1>
                <p className="text-muted-foreground mb-8">
                  Place bets on upcoming races and championships using your earned credits
                </p>
                
                <BettingDashboard />
                
                <div className="mt-12">
                  <ActiveMarkets />
                </div>
                
                <div className="mt-12">
                  <MyBets />
                </div>
                
                <div className="mt-12">
                  <BettingTerms />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                    <path d="M4.5 19.5C9 13 10 8 13 2.5"></path>
                    <path d="M19.5 19.5C14 7 11 13 8 2.5"></path>
                    <line x1="4" y1="22" x2="20" y2="22"></line>
                  </svg>
                </div>
                <h1 className="text-3xl font-bold mb-4">Betting Center</h1>
                <p className="text-muted-foreground max-w-md mb-8">
                  Sign in with your Steam account to access the SimRacingKH betting system
                </p>
                <Button 
                  className="bg-gradient-racing hover:bg-gradient-racing hover:opacity-90 shadow-racing"
                >
                  <img src="/steam-icon.svg" alt="Steam" className="w-5 h-5 mr-2" />
                  Login with Steam to Continue
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <MainFooter />
    </div>
  );
};

export default BettingPage;
