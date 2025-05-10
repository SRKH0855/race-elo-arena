
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Trophy } from 'lucide-react';

const bettingFeatures = [
  {
    icon: "🏆",
    title: "Win Without Risk",
    description: "Use earned ELO points to place bets without risking real money. Convert your racing knowledge into rewards.",
  },
  {
    icon: "📊",
    title: "Dynamic Odds",
    description: "Our AI-driven system calculates real-time odds based on driver performance, track conditions, and historical data.",
  },
  {
    icon: "🎁",
    title: "Exclusive Prizes",
    description: "Win SimRacingKH merchandise, premium access, and special in-game perks with your betting points.",
  },
];

export default function BettingPromoSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center">
          {/* Promo Content */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm">
              <Trophy className="h-4 w-4" />
              <span>Exclusive Feature</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Place Your Bets with <span className="text-primary">ELO Points</span>, Win Real Prizes
            </h2>
            
            <p className="text-muted-foreground">
              Our unique betting system lets you convert your racing ELO into betting credits.
              Predict race outcomes, championship winners, and more to earn exclusive rewards.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-2 items-start">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 5 5 9-9"/>
                  </svg>
                </div>
                <p>No real money involved</p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 5 5 9-9"/>
                  </svg>
                </div>
                <p>Fair odds calculation</p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 5 5 9-9"/>
                  </svg>
                </div>
                <p>Exciting race predictions</p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 5 5 9-9"/>
                  </svg>
                </div>
                <p>Exclusive rewards</p>
              </div>
            </div>
            
            <Button className="bg-gradient-racing shadow-racing mt-4">
              Learn More About Betting
            </Button>
          </div>
          
          {/* Feature Cards */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-6">
              {bettingFeatures.map((feature, index) => (
                <Card key={index} className={`
                  transform hover:-translate-y-1 transition-all duration-300
                  ${index === 1 ? 'translate-x-0 md:translate-x-8' : ''}
                  ${index === 2 ? 'translate-x-0 md:translate-x-4' : ''}
                `}>
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Link 
                      to="/betting" 
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Learn more
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
