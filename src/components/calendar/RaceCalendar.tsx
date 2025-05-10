
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Flag,
  Map,
  Trophy,
  Clock,
  Users
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  track: string;
  trackLayout?: string;
  championship: string;
  carClass: string;
  type: 'race' | 'qualifying' | 'practice';
  duration: string;
  status: 'upcoming' | 'live' | 'completed';
  weather?: string;
  registerBy?: string;
  participants?: number;
  description?: string;
  registered?: boolean;
}

const months = [
  'May 2025',
  'June 2025',
  'July 2025',
  'August 2025',
  'September 2025',
  'October 2025'
];

const events: Event[] = [
  {
    id: 1,
    title: 'GT3 Sprint Masters - Round 4',
    date: 'May 12, 2025',
    time: '18:00 UTC',
    track: 'Spa-Francorchamps',
    championship: 'GT3 Sprint Masters',
    carClass: 'GT3',
    type: 'race',
    duration: '60 minutes',
    status: 'upcoming',
    weather: 'Dynamic, starting dry',
    registerBy: 'May 10, 2025',
    participants: 24,
    description: 'The fourth round of the GT3 Sprint Masters takes place at the legendary Spa-Francorchamps circuit in Belgium. Known for its challenging corners and elevation changes, Spa always delivers exciting racing.',
    registered: true
  },
  {
    id: 2,
    title: 'GT3 Sprint Masters - Qualifying',
    date: 'May 12, 2025',
    time: '17:15 UTC',
    track: 'Spa-Francorchamps',
    championship: 'GT3 Sprint Masters',
    carClass: 'GT3',
    type: 'qualifying',
    duration: '15 minutes',
    status: 'upcoming',
    weather: 'Dynamic, starting dry',
    participants: 24,
    registered: true
  },
  {
    id: 3,
    title: 'Formula Sprint Challenge - Round 3',
    date: 'May 15, 2025',
    time: '19:00 UTC',
    track: 'Barcelona',
    trackLayout: 'GP Circuit',
    championship: 'Formula Sprint Challenge',
    carClass: 'Formula',
    type: 'race',
    duration: '45 minutes',
    status: 'upcoming',
    weather: 'Clear, 22°C',
    registerBy: 'May 13, 2025',
    participants: 18,
    description: "Round 3 of the Formula Sprint Challenge heads to the technical Circuit de Barcelona-Catalunya. This track will test drivers' ability to maintain tire life while navigating the technical final sector.",
    registered: false
  },
  {
    id: 4,
    title: 'Touring Car Cup - Round 2',
    date: 'May 18, 2025',
    time: '17:00 UTC',
    track: 'Suzuka',
    championship: 'Touring Car Cup',
    carClass: 'Touring',
    type: 'race',
    duration: '50 minutes',
    status: 'upcoming',
    weather: 'Partly Cloudy, 26°C',
    registerBy: 'May 16, 2025',
    participants: 20,
    description: 'The second round of the Touring Car Cup will be held at the technical Suzuka Circuit. With its figure-8 layout and challenging S curves, expect close racing and strategic battles.',
    registered: false
  },
  {
    id: 5,
    title: 'GT3 Sprint Masters - Round 5',
    date: 'May 26, 2025',
    time: '18:00 UTC',
    track: 'Nurburgring',
    trackLayout: 'GP Circuit',
    championship: 'GT3 Sprint Masters',
    carClass: 'GT3',
    type: 'race',
    duration: '60 minutes',
    status: 'upcoming',
    weather: 'Risk of rain, 18°C',
    registerBy: 'May 24, 2025',
    participants: 24,
    description: 'Round 5 of the GT3 Sprint Masters takes place at the Nurburgring GP Circuit. The famous German track offers a mix of slow and medium-speed corners that will test car setups and driver precision.',
    registered: false
  },
  {
    id: 6,
    title: 'Formula Sprint Challenge - Round 4',
    date: 'Jun 5, 2025',
    time: '19:00 UTC',
    track: 'Red Bull Ring',
    championship: 'Formula Sprint Challenge',
    carClass: 'Formula',
    type: 'race',
    duration: '45 minutes',
    status: 'upcoming',
    weather: 'Clear, 24°C',
    registerBy: 'Jun 3, 2025',
    participants: 18,
    description: 'Round 4 takes us to the picturesque Red Bull Ring in Austria. With its mix of fast straights and technical corners, it often produces exciting wheel-to-wheel racing.',
    registered: false
  },
];

export default function RaceCalendar() {
  const { isAuthenticated, user } = useAuth();
  const [visibleMonths, setVisibleMonths] = useState(3);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handlePrevMonth = () => {
    // This would typically load previous months
  };
  
  const handleNextMonth = () => {
    // This would typically load more months
  };
  
  const handleOpenEventDetails = (event: Event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'live':
        return <Badge className="bg-red-500 text-white">LIVE NOW</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-muted text-muted-foreground">Completed</Badge>;
      default:
        return <Badge className="bg-primary/60">Upcoming</Badge>;
    }
  };
  
  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'qualifying':
        return <Badge variant="outline" className="bg-secondary/20">Qualifying</Badge>;
      case 'practice':
        return <Badge variant="outline" className="bg-muted/50">Practice</Badge>;
      default:
        return <Badge variant="outline" className="bg-primary/20">Race</Badge>;
    }
  };
  
  const eventsByMonth: { [key: string]: Event[] } = {};
  
  events.forEach(event => {
    const monthYear = event.date.split(', ')[1];
    if (!eventsByMonth[monthYear]) {
      eventsByMonth[monthYear] = [];
    }
    eventsByMonth[monthYear].push(event);
  });
  
  return (
    <section className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex items-center">
          <CalendarIcon className="h-7 w-7 mr-3 text-primary" />
          <h2 className="text-3xl font-bold">Race Schedule</h2>
        </div>
        
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePrevMonth}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleNextMonth}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-12">
        {Object.keys(eventsByMonth)
          .slice(0, visibleMonths)
          .map(month => (
          <div key={month} className="space-y-6">
            <div className="border-b pb-2 flex items-center">
              <h3 className="text-2xl font-bold">{month}</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {eventsByMonth[month].map(event => (
                <Card 
                  key={event.id}
                  className={`hover:border-primary/40 transition-all cursor-pointer ${
                    event.registered ? 'border-primary/40' : ''
                  }`}
                  onClick={() => handleOpenEventDetails(event)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      {getStatusBadge(event.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">{event.date}</p>
                          <p className="text-sm text-muted-foreground">{event.time}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <Badge variant="outline" className="mb-1">{event.carClass}</Badge>
                        {getTypeBadge(event.type)}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start gap-3">
                        <Map className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">{event.track}</p>
                          {event.trackLayout && (
                            <p className="text-sm text-muted-foreground">{event.trackLayout}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Trophy className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">{event.championship}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{event.duration}</span>
                      </div>
                      
                      {event.participants && (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{event.participants} drivers</span>
                        </div>
                      )}
                    </div>
                    
                    {event.registered && (
                      <div className="pt-1">
                        <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
                          Registered
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {(!eventsByMonth[month] || eventsByMonth[month].length === 0) && (
              <div className="text-center p-12 border border-dashed rounded-lg">
                <p className="text-muted-foreground">No events scheduled for {month}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {Object.keys(eventsByMonth).length > visibleMonths && (
        <div className="text-center pt-6">
          <Button 
            variant="outline" 
            onClick={() => setVisibleMonths(prev => prev + 3)}
          >
            Load More Months
          </Button>
        </div>
      )}
      
      {/* Event Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedEvent && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedEvent.title}</DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                {selectedEvent.championship} • {selectedEvent.date} • {selectedEvent.time}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                {selectedEvent.description && (
                  <div>
                    <h4 className="text-lg font-medium mb-2">Event Description</h4>
                    <p className="text-muted-foreground">{selectedEvent.description}</p>
                  </div>
                )}
                
                <div>
                  <h4 className="text-lg font-medium mb-2">Event Details</h4>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Map className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <span className="text-muted-foreground">Track:</span> {selectedEvent.track}
                        {selectedEvent.trackLayout && ` (${selectedEvent.trackLayout})`}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <span className="text-muted-foreground">Date:</span> {selectedEvent.date} at {selectedEvent.time}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <span className="text-muted-foreground">Duration:</span> {selectedEvent.duration}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Flag className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <span className="text-muted-foreground">Event Type:</span> {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                      </div>
                    </div>
                    {selectedEvent.weather && (
                      <div className="flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
                        </svg>
                        <div>
                          <span className="text-muted-foreground">Weather:</span> {selectedEvent.weather}
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <span className="text-muted-foreground">Participants:</span> {selectedEvent.participants} drivers registered
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Card className="border-primary/20 bg-card/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Registration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedEvent.registerBy && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Register by:</span>
                        <br />
                        {selectedEvent.registerBy}
                      </div>
                    )}
                    
                    {isAuthenticated ? (
                      <>
                        {selectedEvent.registered ? (
                          <div className="space-y-4">
                            <Badge className="bg-primary/20 text-primary border-primary/30">
                              You are registered
                            </Badge>
                            <Button variant="outline" className="w-full">
                              Cancel Registration
                            </Button>
                          </div>
                        ) : (
                          <Button className="w-full bg-gradient-racing">
                            Register for Event
                          </Button>
                        )}
                      </>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Sign in with Steam to register for this event
                        </p>
                        <Button className="w-full">
                          <img src="/steam-icon.svg" alt="Steam" className="w-4 h-4 mr-2" />
                          Login with Steam
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <div className="mt-4 space-y-4">
                  <h4 className="text-lg font-medium">Requirements</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Minimum ELO:</span>
                      <span className="font-medium">1200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Minimum SR:</span>
                      <span className="font-medium">70%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
