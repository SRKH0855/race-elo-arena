
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from 'lucide-react';

type ChampionshipCardProps = {
  id: number;
  name: string;
  car: string;
  carImage: string;
  startDate: string;
  endDate: string;
  events: number;
  featured?: boolean;
};

const championshipsData: ChampionshipCardProps[] = [
  {
    id: 1,
    name: "GT3 Masters",
    car: "GT3 Class",
    carImage: "/cars/gt3.jpg",
    startDate: "2025-05-15",
    endDate: "2025-07-20",
    events: 6,
    featured: true
  },
  {
    id: 2,
    name: "Formula SimRacing",
    car: "Formula Class",
    carImage: "/cars/formula.jpg",
    startDate: "2025-06-01",
    endDate: "2025-08-10",
    events: 8
  },
  {
    id: 3,
    name: "Touring Challenge",
    car: "Touring Class",
    carImage: "/cars/touring.jpg",
    startDate: "2025-05-20",
    endDate: "2025-06-25",
    events: 4
  }
];

function ChampionshipCard({ name, car, carImage, startDate, endDate, events, featured }: ChampionshipCardProps) {
  const formattedStartDate = new Date(startDate).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
  
  const formattedEndDate = new Date(endDate).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
  
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:-translate-y-2 ${featured ? 'border-primary/50 shadow-racing' : ''}`}>
      <div className="relative h-48 overflow-hidden">
        <img 
          src={carImage} 
          alt={car} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        {featured && (
          <Badge className="absolute top-2 right-2 bg-primary hover:bg-primary/90">
            Featured
          </Badge>
        )}
        
        <div className="absolute bottom-2 left-4 flex items-center text-sm text-white space-x-1">
          <Calendar className="h-4 w-4" />
          <span>{formattedStartDate} - {formattedEndDate}</span>
        </div>
      </div>
      
      <CardContent className="pt-4 pb-6">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{car}</span>
          <Badge variant="outline" className="text-xs">
            {events} {events === 1 ? 'Event' : 'Events'}
          </Badge>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border/50">
          <Link 
            to={`/championships/${name.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View Championship Details
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ChampionshipsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Ongoing Championships</h2>
            <p className="text-muted-foreground">Join our exciting racing series and compete with the best</p>
          </div>
          
          <Link to="/championships" className="text-primary hover:underline font-medium mt-4 md:mt-0">
            View All Championships
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {championshipsData.map(championship => (
            <ChampionshipCard
              key={championship.id}
              {...championship}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
