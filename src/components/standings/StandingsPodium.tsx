
import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";

const podiumDrivers = [
  {
    position: 2,
    name: "Lewis Hamilton",
    country: "🇬🇧",
    avatar: "/users/user2.jpg",
    points: 156,
    team: "Team Silver"
  },
  {
    position: 1,
    name: "Max Verstappen",
    country: "🇳🇱",
    avatar: "/users/user1.jpg",
    points: 189,
    team: "Team Blue"
  },
  {
    position: 3,
    name: "Sebastian Vettel",
    country: "🇩🇪",
    avatar: "/users/user3.jpg",
    points: 134,
    team: "Team Red"
  }
];

export default function StandingsPodium() {
  const getTrophyColor = (position: number) => {
    switch (position) {
      case 1:
        return "text-yellow-500";
      case 2:
        return "text-gray-300";
      case 3:
        return "text-orange-600";
      default:
        return "";
    }
  };
  
  const getPodiumHeight = (position: number) => {
    switch (position) {
      case 1:
        return "h-48";
      case 2:
        return "h-36";
      case 3:
        return "h-28";
      default:
        return "h-20";
    }
  };
  
  return (
    <section className="relative overflow-hidden">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-8 flex items-center">
          <Trophy className="h-8 w-8 mr-3 text-primary" />
          Championship Podium
        </h2>
        
        <div className="w-full flex justify-center mb-8">
          <div className="relative flex items-end justify-center gap-4 md:gap-10 pt-16 pb-6 w-full max-w-3xl">
            {podiumDrivers
              .sort((a, b) => a.position - b.position)
              .map((driver) => (
                <div key={driver.position} className="flex flex-col items-center z-10 animate-fade-in" style={{ animationDelay: `${driver.position * 0.2}s` }}>
                  <div className="relative mb-4">
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-primary overflow-hidden">
                      <img
                        src={driver.avatar}
                        alt={driver.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 ${getTrophyColor(driver.position)}`}>
                      <Trophy className="w-10 h-10" />
                    </div>
                  </div>
                  
                  <p className="font-bold text-lg md:text-xl">{driver.name}</p>
                  <div className="flex items-center gap-1 mb-3">
                    <span>{driver.country}</span>
                    <span className="text-muted-foreground text-sm">•</span>
                    <span className="text-muted-foreground text-sm">{driver.team}</span>
                  </div>
                  
                  <div className="text-2xl md:text-3xl font-bold">{driver.points}</div>
                  <div className="text-sm text-muted-foreground">points</div>
                  
                  <div className={`${getPodiumHeight(driver.position)} w-28 md:w-40 bg-gradient-to-t from-primary/80 to-primary/20 rounded-t-lg mt-4 flex items-end justify-center`}>
                    <div className={`mb-2 flex items-center justify-center w-10 h-10 rounded-full ${
                      driver.position === 1 
                        ? 'bg-yellow-500' 
                        : driver.position === 2 
                          ? 'bg-gray-300' 
                          : 'bg-orange-600'
                    } text-background font-bold text-xl`}>
                      {driver.position}
                    </div>
                  </div>
                </div>
              ))}
              
            {/* Podium Base */}
            <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-r from-card via-muted to-card rounded-lg"></div>
          </div>
        </div>
        
        <Card className="w-full max-w-3xl border-primary/20 bg-card/50">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-3">Championship Facts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Season Progress</p>
                <p className="text-lg font-medium">6 of 10 races completed</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Points Available</p>
                <p className="text-lg font-medium">100 points remaining</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Next Race</p>
                <p className="text-lg font-medium">Spa-Francorchamps</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
