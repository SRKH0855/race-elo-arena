
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const pastChampionships = [
  {
    id: 1,
    name: "GT3 Winter Cup 2024",
    image: "/cars/gt3.jpg",
    carClass: "GT3",
    startDate: "Dec 15, 2024",
    endDate: "Feb 28, 2025",
    totalRaces: 6,
    winner: {
      name: "Michael Schumacher",
      avatar: "/users/user1.jpg",
      country: "🇩🇪"
    },
    podium: [
      { position: 1, driver: "Michael Schumacher", country: "🇩🇪", points: 126 },
      { position: 2, driver: "Lewis Hamilton", country: "🇬🇧", points: 118 },
      { position: 3, driver: "Max Verstappen", country: "🇳🇱", points: 104 }
    ]
  },
  {
    id: 2,
    name: "Formula Challenge 2024",
    image: "/cars/formula.jpg",
    carClass: "Formula",
    startDate: "Oct 1, 2024",
    endDate: "Dec 15, 2024",
    totalRaces: 8,
    winner: {
      name: "Lewis Hamilton",
      avatar: "/users/user2.jpg",
      country: "🇬🇧"
    },
    podium: [
      { position: 1, driver: "Lewis Hamilton", country: "🇬🇧", points: 156 },
      { position: 2, driver: "Fernando Alonso", country: "🇪🇸", points: 142 },
      { position: 3, driver: "Charles Leclerc", country: "🇲🇨", points: 128 }
    ]
  },
  {
    id: 3,
    name: "Touring Car Series 2024",
    image: "/cars/touring.jpg",
    carClass: "Touring",
    startDate: "Sep 15, 2024",
    endDate: "Nov 30, 2024",
    totalRaces: 5,
    winner: {
      name: "Sebastian Vettel",
      avatar: "/users/user3.jpg",
      country: "🇩🇪"
    },
    podium: [
      { position: 1, driver: "Sebastian Vettel", country: "🇩🇪", points: 98 },
      { position: 2, driver: "Valtteri Bottas", country: "🇫🇮", points: 86 },
      { position: 3, driver: "Daniel Ricciardo", country: "🇦🇺", points: 72 }
    ]
  },
  {
    id: 4,
    name: "GT3 Summer Cup 2024",
    image: "/cars/gt3.jpg",
    carClass: "GT3",
    startDate: "Jun 1, 2024",
    endDate: "Aug 30, 2024",
    totalRaces: 7,
    winner: {
      name: "Max Verstappen",
      avatar: "/users/user1.jpg",
      country: "🇳🇱"
    },
    podium: [
      { position: 1, driver: "Max Verstappen", country: "🇳🇱", points: 142 },
      { position: 2, driver: "Lewis Hamilton", country: "🇬🇧", points: 136 },
      { position: 3, driver: "Charles Leclerc", country: "🇲🇨", points: 128 }
    ]
  },
];

export default function PastChampionships() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredChampionships = pastChampionships.filter(championship => 
    championship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    championship.carClass.toLowerCase().includes(searchTerm.toLowerCase()) ||
    championship.winner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-3xl font-bold">Past Championships Archive</h2>
        
        <div className="relative mt-4 md:mt-0 w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search championships..."
            className="w-full pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChampionships.map((championship) => (
          <Card 
            key={championship.id} 
            className="overflow-hidden border-border hover:border-primary/40 transition-all"
          >
            <div className="h-40 overflow-hidden relative">
              <img 
                src={championship.image} 
                alt={championship.name} 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <Badge 
                className="absolute top-3 right-3 bg-muted/50 backdrop-blur-sm text-white"
              >
                CLOSED
              </Badge>
              <div className="absolute bottom-3 left-3 flex items-center">
                <img 
                  src={championship.winner.avatar} 
                  alt={championship.winner.name} 
                  className="w-10 h-10 rounded-full border-2 border-primary"
                />
                <div className="ml-3">
                  <div className="flex items-center gap-1">
                    <span className="text-xs bg-primary/20 text-primary px-1 rounded">Winner</span>
                    <span className="text-white">{championship.winner.country}</span>
                  </div>
                  <p className="text-sm font-medium text-white">{championship.winner.name}</p>
                </div>
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{championship.name}</CardTitle>
                <Badge variant="outline">{championship.carClass}</Badge>
              </div>
              <CardDescription>
                {championship.startDate} - {championship.endDate}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pb-2">
              <div className="text-sm text-muted-foreground mb-3">
                {championship.totalRaces} races completed
              </div>
              
              {expandedId === championship.id && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="font-medium text-sm">Final Standings</h4>
                  <div className="space-y-2">
                    {championship.podium.map((position) => (
                      <div 
                        key={position.position}
                        className={`flex items-center justify-between p-2 rounded ${
                          position.position === 1 
                            ? 'bg-yellow-500/10 border border-yellow-500/30' 
                            : position.position === 2 
                              ? 'bg-gray-300/10 border border-gray-300/30' 
                              : 'bg-orange-600/10 border border-orange-600/30'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{position.position}</span>
                          <span>{position.driver}</span>
                          <span>{position.country}</span>
                        </div>
                        <span className="font-mono">{position.points} pts</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full"
                onClick={() => toggleExpand(championship.id)}
              >
                {expandedId === championship.id ? "Hide results" : "View results"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredChampionships.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No championships found matching your search.</p>
        </div>
      )}
    </div>
  );
}
