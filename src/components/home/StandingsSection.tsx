
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

type Driver = {
  id: number;
  name: string;
  avatar: string;
  country: string;
  points: number;
  number: number;
  position: number;
};

const driversData: Driver[] = [
  {
    id: 1,
    position: 1,
    name: "Max Racing",
    avatar: "/drivers/driver1.jpg",
    country: "🇳🇱",
    points: 245,
    number: 33
  },
  {
    id: 2,
    position: 2,
    name: "Lewis Speed",
    avatar: "/drivers/driver2.jpg",
    country: "🇬🇧",
    points: 218,
    number: 44
  },
  {
    id: 3,
    position: 3,
    name: "Charles Fast",
    avatar: "/drivers/driver3.jpg",
    country: "🇲🇨",
    points: 205,
    number: 16
  }
];

export default function StandingsSection() {
  const [hoveredDriver, setHoveredDriver] = useState<number | null>(null);
  
  return (
    <section className="py-16 bg-black/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Top Standings</h2>
            <p className="text-muted-foreground">The current leaders in our championship series</p>
          </div>
          
          <Link to="/standings" className="text-primary hover:underline font-medium mt-4 md:mt-0">
            View Full Standings
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8 mt-16 pb-10">
          {driversData.map((driver) => (
            <div
              key={driver.id}
              className={`relative flex flex-col items-center transition-all duration-500 ease-out
                ${driver.position === 1
                  ? 'order-2 md:scale-110 z-10'
                  : driver.position === 2
                    ? 'order-1 md:-translate-y-4'
                    : 'order-3 md:-translate-y-8'
                }
                ${hoveredDriver === driver.id ? 'scale-105' : ''}
              `}
              onMouseEnter={() => setHoveredDriver(driver.id)}
              onMouseLeave={() => setHoveredDriver(null)}
            >
              {/* Podium Base */}
              <div className={`
                h-${driver.position === 1 ? 48 : driver.position === 2 ? 32 : 24}
                w-full max-w-xs
                bg-gradient-racing rounded-t-lg
                flex items-center justify-center
                transition-all duration-300
                ${hoveredDriver === driver.id ? 'shadow-racing' : ''}
              `}>
                <span className="text-4xl font-bold text-white">{driver.position}</span>
              </div>
              
              {/* Driver Card */}
              <Card className="w-full max-w-xs shadow-lg transform -translate-y-10 bg-card backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-16 h-16 border-2 border-primary">
                      <img src={driver.avatar} alt={driver.name} />
                    </Avatar>
                    
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground">Driver #{driver.number}</p>
                      <h3 className="text-lg font-bold flex items-center justify-center gap-2">
                        {driver.name} <span className="text-base">{driver.country}</span>
                      </h3>
                      <p className="text-2xl font-bold text-primary mt-2">{driver.points} pts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
