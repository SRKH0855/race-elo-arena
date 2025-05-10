
import { Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const events = [
  {
    id: 1,
    name: "GT3 Sprint Masters - Round 4",
    track: "Spa-Francorchamps",
    type: "Race",
    date: "May 12, 2025",
    time: "18:00 UTC",
    duration: "60 minutes",
    status: "upcoming",
    championship: "GT3 Sprint Masters",
    carClass: "GT3"
  },
  {
    id: 2,
    name: "Formula Sprint Challenge - Round 3",
    track: "Barcelona",
    type: "Race",
    date: "May 15, 2025",
    time: "19:00 UTC",
    duration: "45 minutes",
    status: "upcoming",
    championship: "Formula Sprint Challenge",
    carClass: "Formula"
  },
  {
    id: 3,
    name: "Touring Car Cup - Round 2",
    track: "Suzuka",
    type: "Race",
    date: "May 18, 2025",
    time: "17:00 UTC",
    duration: "50 minutes",
    status: "upcoming",
    championship: "Touring Car Cup",
    carClass: "Touring"
  },
  {
    id: 4,
    name: "GT3 Sprint Masters - Round 5",
    track: "Nurburgring",
    type: "Race",
    date: "May 26, 2025",
    time: "18:00 UTC",
    duration: "60 minutes",
    status: "upcoming",
    championship: "GT3 Sprint Masters",
    carClass: "GT3"
  }
]

const months = [
  "May 2025",
  "June 2025",
  "July 2025",
  "August 2025"
]

export default function ChampionshipCalendar() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-muted text-muted-foreground"
      case "live":
        return "bg-red-500 text-white animate-pulse-glow"
      case "upcoming":
        return "bg-primary/60 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold flex items-center">
            <Calendar className="h-8 w-8 mr-3 text-primary" />
            Racing Calendar
          </h2>
          <p className="text-muted-foreground mt-1">Upcoming races across all championships</p>
        </div>
        
        <div className="flex gap-4 mt-4 md:mt-0">
          <Badge className="bg-muted text-muted-foreground">Completed</Badge>
          <Badge className="bg-red-500 text-white">Live</Badge>
          <Badge className="bg-primary/60 text-white">Upcoming</Badge>
        </div>
      </div>
      
      <div className="space-y-8">
        {months.map((month) => (
          <div key={month} className="space-y-4">
            <h3 className="text-2xl font-semibold">{month}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events
                .filter(event => event.date.includes(month.split(" ")[0]))
                .map(event => (
                  <Card key={event.id} className="overflow-hidden border-border hover:border-primary/40 transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge className={getStatusColor(event.status)}>
                          {event.status === "live" ? "LIVE NOW" : event.status === "completed" ? "Completed" : "Upcoming"}
                        </Badge>
                        <Badge variant="outline">{event.carClass}</Badge>
                      </div>
                      <CardTitle className="text-lg mt-1">{event.name}</CardTitle>
                      <CardDescription className="flex items-center">
                        <span className="font-medium text-foreground">{event.track}</span>
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      <div className="flex flex-col space-y-1">
                        <div className="text-sm text-muted-foreground">Date & Time:</div>
                        <div className="font-mono font-medium">{event.date}, {event.time}</div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>{event.championship}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Duration: {event.duration}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
            
            {events.filter(event => event.date.includes(month.split(" ")[0])).length === 0 && (
              <div className="p-6 border border-dashed border-border rounded-lg bg-card/30 text-center">
                <p className="text-muted-foreground">No races scheduled for {month}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
