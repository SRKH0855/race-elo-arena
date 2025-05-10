
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Calendar, Star, Flag } from "lucide-react";

export default function UserDashboard() {
  const { user } = useAuth();

  function getLevelColor(level: string) {
    switch(level) {
      case 'Rookie': return 'bg-racing-green';
      case 'Amateur': return 'bg-racing-blue';
      case 'Silver': return 'bg-gray-300';
      case 'Pro': return 'bg-racing-yellow';
      default: return 'bg-racing-gray';
    }
  }

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-3">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
                <img 
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-20 h-20 rounded-full border-4 border-primary"
                />
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(user?.level || '')}`}>
                      {user?.level} Driver
                    </span>
                    <span className="text-muted-foreground">ELO Rating: {user?.eloRating}</span>
                    <span className="text-muted-foreground">Safety Rating: {user?.safetyRating}%</span>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-card/50 border-primary/20 hover:border-primary/40 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Trophy className="h-5 w-5 text-primary" />
                  Season Points
                </CardTitle>
                <CardDescription>Current championship progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-4xl font-bold">286</div>
                  <div className="text-sm text-muted-foreground">
                    <span className="text-racing-green">+24 pts</span> from last race
                  </div>
                </div>
                <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="mt-1 text-xs text-muted-foreground flex justify-between">
                  <span>0</span>
                  <span>Season Target: 440</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-primary/20 hover:border-primary/40 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Calendar className="h-5 w-5 text-secondary" />
                  Next Race
                </CardTitle>
                <CardDescription>GT3 Championship - Round 4</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold">Spa-Francorchamps</div>
                  <div className="text-sm text-muted-foreground">Belgium</div>
                </div>
                <div className="text-lg font-mono font-medium mt-1">2d 14h 32m</div>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="inline-block w-3 h-3 rounded-full bg-racing-green"></span>
                  <span>Qualifying session starts May 12, 18:00 UTC</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-primary/20 hover:border-primary/40 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Star className="h-5 w-5 text-racing-orange" />
                  Racing Stats
                </CardTitle>
                <CardDescription>Your performance summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Races</div>
                    <div className="text-2xl font-medium">24</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Wins</div>
                    <div className="text-2xl font-medium">5</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Podiums</div>
                    <div className="text-2xl font-medium">11</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">DNFs</div>
                    <div className="text-2xl font-medium">2</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-gradient-to-br from-card to-card/20 border border-border rounded-lg p-6 shadow-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">Your Racing Progress</h2>
                <p className="text-muted-foreground">Performance metrics across all championships</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Data from last 30 days</span>
              </div>
            </div>
            
            <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Flag className="w-12 h-12 mx-auto text-muted-foreground opacity-50" />
                <p className="mt-2 text-muted-foreground">Performance chart will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
