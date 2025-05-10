
import { useEffect } from 'react';
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Flag, Medal, Shield, Trophy, User } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const ratingData = [
  { race: 'Race 1', elo: 2050, sr: 86 },
  { race: 'Race 2', elo: 2080, sr: 88 },
  { race: 'Race 3', elo: 2120, sr: 90 },
  { race: 'Race 4', elo: 2100, sr: 89 },
  { race: 'Race 5', elo: 2150, sr: 92 },
  { race: 'Race 6', elo: 2150, sr: 92 },
];

const achievements = [
  {
    id: 1,
    name: 'Race Winner',
    description: 'Win a race in any championship',
    earned: true,
    date: 'April 10, 2025',
    icon: <Trophy className="h-6 w-6 text-yellow-500" />
  },
  {
    id: 2,
    name: 'Podium Finisher',
    description: 'Finish on the podium 5 times',
    earned: true,
    date: 'March 22, 2025',
    icon: <Trophy className="h-6 w-6 text-gray-300" />
  },
  {
    id: 3,
    name: 'Championship Winner',
    description: 'Win a championship series',
    earned: true,
    date: 'February 28, 2025',
    icon: <Trophy className="h-6 w-6 text-yellow-500" />
  },
  {
    id: 4,
    name: 'Clean Racer',
    description: 'Complete 10 races with no incidents',
    earned: true,
    date: 'March 15, 2025',
    icon: <Shield className="h-6 w-6 text-green-500" />
  },
  {
    id: 5,
    name: 'Pole Position',
    description: 'Qualify in pole position 3 times',
    earned: false,
    progress: '2/3',
    icon: <Flag className="h-6 w-6 text-blue-500" />
  },
  {
    id: 6,
    name: 'Perfect Weekend',
    description: 'Achieve pole position, fastest lap and race win',
    earned: false,
    progress: '0/1',
    icon: <Medal className="h-6 w-6 text-orange-500" />
  }
];

const ProfilePage = () => {
  const { user } = useAuth();
  
  // Set dark mode as default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  
  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Rookie': return 'text-racing-green';
      case 'Amateur': return 'text-racing-blue';
      case 'Silver': return 'text-gray-300';
      case 'Pro': return 'text-racing-yellow';
      default: return '';
    }
  };
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <MainHeader />
        <main className="flex-1 mt-16 flex items-center justify-center">
          <div className="text-center p-8">
            <User className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-4">You need to be logged in</h2>
            <p className="text-muted-foreground mb-6">Please sign in with your Steam account to view your profile</p>
            <Button className="bg-gradient-racing hover:bg-gradient-racing hover:opacity-90 shadow-racing">
              <img src="/steam-icon.svg" alt="Steam" className="w-5 h-5 mr-2" />
              Login with Steam
            </Button>
          </div>
        </main>
        <MainFooter />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      
      <main className="flex-1 mt-16 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader className="text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-primary">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                      <CardTitle className="text-2xl">{user.name}</CardTitle>
                      <div className="flex items-center mt-1 mb-3">
                        <span className={`text-lg font-medium ${getLevelColor(user.level)}`}>{user.level}</span>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span>{user.country}</span>
                      </div>
                      <CardDescription className="text-base">
                        <span>Member since February 2025</span>
                      </CardDescription>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Racing Statistics</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>ELO Rating</span>
                          <Badge variant="outline" className="font-mono">{user.eloRating}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Safety Rating</span>
                          <Badge variant="outline" className="font-mono">{user.safetyRating}%</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Races</span>
                          <Badge variant="outline" className="font-mono">24</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Wins</span>
                          <Badge variant="outline" className="font-mono">5</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Podiums</span>
                          <Badge variant="outline" className="font-mono">11</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Betting Credits</span>
                          <Badge variant="outline" className="font-mono">{user.credits}</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Achievements</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {achievements.filter(a => a.earned).slice(0, 6).map(achievement => (
                          <div key={achievement.id} className="flex flex-col items-center justify-center p-3 bg-muted/30 rounded-lg" title={achievement.name}>
                            {achievement.icon}
                            <span className="text-xs mt-1 text-center line-clamp-1">{achievement.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button variant="outline" className="w-full">Edit Profile</Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="md:col-span-2">
                <Tabs defaultValue="statistics" className="space-y-8">
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="statistics">Statistics</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="statistics" className="space-y-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Rating Progression</CardTitle>
                        <CardDescription>Your ELO and safety rating over time</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={ratingData}
                              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <XAxis dataKey="race" />
                              <YAxis yAxisId="left" domain={[1800, 2400]} />
                              <YAxis yAxisId="right" orientation="right" domain={[70, 100]} />
                              <Tooltip />
                              <Line 
                                yAxisId="left" 
                                type="monotone" 
                                dataKey="elo" 
                                name="ELO Rating" 
                                stroke="#ea384c" 
                                strokeWidth={2} 
                                activeDot={{ r: 8 }} 
                              />
                              <Line 
                                yAxisId="right" 
                                type="monotone" 
                                dataKey="sr" 
                                name="Safety Rating (%)" 
                                stroke="#1EAEDB" 
                                strokeWidth={2} 
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Racing Summary</CardTitle>
                          <CardDescription>Performance breakdown by track</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="border rounded-md p-3 hover:bg-muted/30 transition-colors">
                              <div className="flex justify-between mb-1">
                                <span className="font-medium">Spa-Francorchamps</span>
                                <Badge variant="outline">4 races</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                                <span>Poles: 1</span>
                                <span>Wins: 2</span>
                                <span>Podiums: 3</span>
                                <span>Best Lap: 2:18.442</span>
                              </div>
                            </div>
                            
                            <div className="border rounded-md p-3 hover:bg-muted/30 transition-colors">
                              <div className="flex justify-between mb-1">
                                <span className="font-medium">Monza</span>
                                <Badge variant="outline">3 races</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                                <span>Poles: 0</span>
                                <span>Wins: 1</span>
                                <span>Podiums: 2</span>
                                <span>Best Lap: 1:48.021</span>
                              </div>
                            </div>
                            
                            <div className="border rounded-md p-3 hover:bg-muted/30 transition-colors">
                              <div className="flex justify-between mb-1">
                                <span className="font-medium">Silverstone</span>
                                <Badge variant="outline">5 races</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                                <span>Poles: 2</span>
                                <span>Wins: 1</span>
                                <span>Podiums: 3</span>
                                <span>Best Lap: 1:59.762</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Car Performance</CardTitle>
                          <CardDescription>Performance breakdown by car</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="border rounded-md p-3 hover:bg-muted/30 transition-colors">
                              <div className="flex justify-between mb-1">
                                <span className="font-medium">Porsche 911 GT3 R</span>
                                <Badge variant="outline">10 races</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                                <span>Poles: 2</span>
                                <span>Wins: 3</span>
                                <span>Podiums: 7</span>
                              </div>
                              <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                              </div>
                              <div className="mt-1 text-xs text-right text-muted-foreground">
                                Confidence: 85%
                              </div>
                            </div>
                            
                            <div className="border rounded-md p-3 hover:bg-muted/30 transition-colors">
                              <div className="flex justify-between mb-1">
                                <span className="font-medium">Ferrari 488 GT3</span>
                                <Badge variant="outline">8 races</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                                <span>Poles: 1</span>
                                <span>Wins: 1</span>
                                <span>Podiums: 3</span>
                              </div>
                              <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: '70%' }}></div>
                              </div>
                              <div className="mt-1 text-xs text-right text-muted-foreground">
                                Confidence: 70%
                              </div>
                            </div>
                            
                            <div className="border rounded-md p-3 hover:bg-muted/30 transition-colors">
                              <div className="flex justify-between mb-1">
                                <span className="font-medium">BMW M4 GT3</span>
                                <Badge variant="outline">6 races</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                                <span>Poles: 0</span>
                                <span>Wins: 1</span>
                                <span>Podiums: 1</span>
                              </div>
                              <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: '55%' }}></div>
                              </div>
                              <div className="mt-1 text-xs text-right text-muted-foreground">
                                Confidence: 55%
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="settings">
                    <Card>
                      <CardHeader>
                        <CardTitle>Profile Settings</CardTitle>
                        <CardDescription>Manage your account preferences and settings</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Personal Information</h3>
                          
                          <div className="space-y-2">
                            <Label htmlFor="display-name">Display Name</Label>
                            <Input id="display-name" defaultValue={user.name} />
                            <p className="text-sm text-muted-foreground">
                              This is pulled from your Steam account by default
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Select defaultValue={user.country}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="NL">🇳🇱 Netherlands</SelectItem>
                                <SelectItem value="GB">🇬🇧 United Kingdom</SelectItem>
                                <SelectItem value="DE">🇩🇪 Germany</SelectItem>
                                <SelectItem value="US">🇺🇸 United States</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="telegram-id">Telegram ID (Optional)</Label>
                            <Input id="telegram-id" placeholder="@username" />
                            <p className="text-sm text-muted-foreground">
                              For notifications about upcoming races and events
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Notification Preferences</h3>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="race-reminders">Race Reminders</Label>
                              <p className="text-sm text-muted-foreground">
                                Get notifications about upcoming races
                              </p>
                            </div>
                            <Switch id="race-reminders" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="betting-updates">Betting Updates</Label>
                              <p className="text-sm text-muted-foreground">
                                Get notifications about your bet outcomes
                              </p>
                            </div>
                            <Switch id="betting-updates" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="news-updates">News & Updates</Label>
                              <p className="text-sm text-muted-foreground">
                                Receive newsletters and platform updates
                              </p>
                            </div>
                            <Switch id="news-updates" />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="achievements">
                    <Card>
                      <CardHeader>
                        <CardTitle>Racing Achievements</CardTitle>
                        <CardDescription>Your earned achievements and progress</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {achievements.map((achievement) => (
                            <div 
                              key={achievement.id} 
                              className={`flex items-center gap-4 p-4 border rounded-lg ${achievement.earned ? 'bg-muted/30 border-primary/20' : 'bg-card/50'}`}
                            >
                              <div className={`rounded-full p-3 ${achievement.earned ? 'bg-muted' : 'bg-muted/30'}`}>
                                {achievement.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h4 className="font-medium">{achievement.name}</h4>
                                  {achievement.earned ? (
                                    <Badge variant="outline" className="bg-primary/20 border-primary/30">
                                      Earned
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="bg-muted border-muted-foreground/30">
                                      In Progress
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                                <div className="mt-2 text-xs">
                                  {achievement.earned ? (
                                    <span className="text-muted-foreground">Earned on {achievement.date}</span>
                                  ) : (
                                    <div>
                                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                        <div 
                                          className="h-full bg-primary/70 rounded-full" 
                                          style={{ 
                                            width: `${parseInt(achievement.progress?.split('/')[0] || '0') / parseInt(achievement.progress?.split('/')[1] || '1') * 100}%` 
                                          }}
                                        ></div>
                                      </div>
                                      <div className="mt-1 text-right text-muted-foreground">
                                        Progress: {achievement.progress}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <MainFooter />
    </div>
  );
};

export default ProfilePage;
