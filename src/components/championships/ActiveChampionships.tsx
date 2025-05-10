
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { Calendar, Flag, Trophy, Users } from 'lucide-react';

const championships = [
  {
    id: 1,
    name: "GT3 Sprint Masters",
    image: "/cars/gt3.jpg",
    carClass: "GT3",
    startDate: "Apr 15, 2025",
    endDate: "Jun 30, 2025",
    totalRaces: 8,
    completedRaces: 3,
    participants: 24,
    eloRequirement: 1500,
    srRequirement: 80,
    tracks: ["Spa", "Monza", "Silverstone", "Nurburgring", "Barcelona", "Kyalami", "Bathurst", "Laguna Seca"],
    progress: 37.5,
    featured: true
  },
  {
    id: 2,
    name: "Formula Sprint Challenge",
    image: "/cars/formula.jpg",
    carClass: "Formula",
    startDate: "May 1, 2025",
    endDate: "Jul 15, 2025",
    totalRaces: 6,
    completedRaces: 2,
    participants: 18,
    eloRequirement: 1800,
    srRequirement: 85,
    tracks: ["Monza", "Silverstone", "Barcelona", "Red Bull Ring", "Zandvoort", "Imola"],
    progress: 33.3,
    featured: false
  },
  {
    id: 3,
    name: "Touring Car Cup",
    image: "/cars/touring.jpg",
    carClass: "Touring",
    startDate: "May 10, 2025",
    endDate: "Jul 30, 2025",
    totalRaces: 5,
    completedRaces: 1,
    participants: 20,
    eloRequirement: 1200,
    srRequirement: 75,
    tracks: ["Brands Hatch", "Suzuka", "Bathurst", "Interlagos", "Zolder"],
    progress: 20,
    featured: false
  }
];

export default function ActiveChampionships() {
  const { isAuthenticated, user } = useAuth();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const canRegister = (championship: typeof championships[0]) => {
    if (!isAuthenticated || !user) return false;
    return user.eloRating >= championship.eloRequirement && user.safetyRating >= championship.srRequirement;
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <Trophy className="h-8 w-8 mr-3 text-primary" />
          Active Championships
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {championships.filter(c => c.featured).map((championship) => (
            <Card key={championship.id} className="overflow-hidden border-primary/30 shadow-lg relative">
              <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-racing text-white text-xs font-bold rounded-bl-md">
                Featured
              </div>
              <div className="h-48 overflow-hidden">
                <img 
                  src={championship.image} 
                  alt={championship.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl">{championship.name}</CardTitle>
                  <Badge variant="outline" className="bg-secondary/20">{championship.carClass}</Badge>
                </div>
                <CardDescription>
                  {championship.startDate} - {championship.endDate}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Race {championship.completedRaces} of {championship.totalRaces}</span>
                      <span>{championship.progress}% complete</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${championship.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-3">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>{championship.totalRaces} races</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Users className="h-4 w-4" />
                      <span>{championship.participants} drivers</span>
                    </div>
                  </div>
                  
                  <div className="pt-3">
                    <h4 className="font-medium mb-2">Next race</h4>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{championship.tracks[championship.completedRaces]}</p>
                        <p className="text-sm text-muted-foreground">May 18, 2025 - 18:00 UTC</p>
                      </div>
                      <Badge>Race {championship.completedRaces + 1}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <div className="text-xs">
                  <span className="block">Requirements:</span>
                  <span className="text-muted-foreground">
                    ELO {championship.eloRequirement}+ / SR {championship.srRequirement}%+
                  </span>
                </div>
                <Button 
                  className={canRegister(championship) ? "bg-gradient-racing" : "bg-muted"}
                  disabled={!canRegister(championship)}
                >
                  {canRegister(championship) ? "Register" : "Requirements Not Met"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold mb-6">All Active Championships</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {championships.map((championship) => (
            <Card 
              key={championship.id} 
              className={`overflow-hidden border-border hover:border-primary/40 transition-all ${
                expandedId === championship.id ? 'ring-1 ring-primary' : ''
              }`}
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={championship.image} 
                  alt={championship.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle>{championship.name}</CardTitle>
                  <Badge variant="outline">{championship.carClass}</Badge>
                </div>
                <CardDescription>
                  {championship.startDate} - {championship.endDate}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Race {championship.completedRaces} of {championship.totalRaces}</span>
                    <span>{championship.progress}% complete</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${championship.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Users className="h-3 w-3" />
                    <span>{championship.participants} drivers</span>
                  </div>
                </div>
                
                {expandedId === championship.id && (
                  <div className="pt-3 space-y-3 animate-fade-in">
                    <div>
                      <h5 className="font-medium mb-1 text-sm">Upcoming races:</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {championship.tracks.slice(championship.completedRaces).map((track, idx) => (
                          <div key={idx} className="text-xs py-1 px-2 bg-muted/50 rounded flex items-center">
                            <Flag className="h-3 w-3 mr-1" />
                            {track}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <div>ELO Requirement: {championship.eloRequirement}+</div>
                      <div>Safety Rating: {championship.srRequirement}%+</div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleExpand(championship.id)}
                >
                  {expandedId === championship.id ? "Show less" : "Show more"}
                </Button>
                <Button 
                  size="sm"
                  className={canRegister(championship) ? "bg-gradient-racing" : "bg-muted"}
                  disabled={!canRegister(championship)}
                >
                  {canRegister(championship) ? "Register" : "Requirements Not Met"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
