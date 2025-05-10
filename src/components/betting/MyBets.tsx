
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface Bet {
  id: number;
  eventName: string;
  selection: string;
  odds: number;
  betAmount: number;
  potentialWin: number;
  date: string;
  status: 'pending' | 'won' | 'lost';
}

const bets: Bet[] = [
  {
    id: 1,
    eventName: "GT3 Sprint Masters - Monza",
    selection: "Lewis Hamilton to Win",
    odds: 3.50,
    betAmount: 200,
    potentialWin: 700,
    date: "Apr 28, 2025",
    status: "pending"
  },
  {
    id: 2,
    eventName: "GT3 Sprint Masters - Monza",
    selection: "Max Verstappen for Podium",
    odds: 1.40,
    betAmount: 500,
    potentialWin: 700,
    date: "Apr 28, 2025",
    status: "pending"
  },
  {
    id: 3,
    eventName: "GT3 Sprint Masters - Silverstone",
    selection: "Lewis Hamilton to Win",
    odds: 3.20,
    betAmount: 150,
    potentialWin: 480,
    date: "Apr 14, 2025",
    status: "won"
  },
  {
    id: 4,
    eventName: "Formula Sprint Challenge - Monza",
    selection: "Max Verstappen for Pole Position",
    odds: 2.80,
    betAmount: 200,
    potentialWin: 560,
    date: "Apr 10, 2025",
    status: "lost"
  },
  {
    id: 5,
    eventName: "GT3 Sprint Masters - Championship Winner",
    selection: "Max Verstappen to Win Championship",
    odds: 2.10,
    betAmount: 1000,
    potentialWin: 2100,
    date: "Mar 30, 2025",
    status: "pending"
  },
];

export default function MyBets() {
  const [activeTab, setActiveTab] = useState<string>('active');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "won":
        return "bg-green-500/20 text-green-500 border-green-500/20";
      case "lost":
        return "bg-red-500/20 text-red-500 border-red-500/20";
      default:
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/20";
    }
  };
  
  const getStatusText = (status: string) => {
    switch(status) {
      case "won":
        return "WON";
      case "lost":
        return "LOST";
      default:
        return "PENDING";
    }
  };

  const filteredActiveBets = bets
    .filter(bet => bet.status === "pending")
    .filter(bet => 
      bet.eventName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      bet.selection.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const filteredSettledBets = bets
    .filter(bet => bet.status === "won" || bet.status === "lost")
    .filter(bet => 
      bet.eventName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      bet.selection.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">My Bets</h2>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <CardTitle>Betting History</CardTitle>
              <CardDescription>Track your active and settled bets</CardDescription>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search bets..."
                className="w-full pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Active Bets</TabsTrigger>
              <TabsTrigger value="settled">Settled Bets</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              {filteredActiveBets.length > 0 ? (
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Selection</TableHead>
                        <TableHead className="text-right">Odds</TableHead>
                        <TableHead className="text-right">Stake</TableHead>
                        <TableHead className="text-right">To Win</TableHead>
                        <TableHead>Date Placed</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredActiveBets.map(bet => (
                        <TableRow key={bet.id}>
                          <TableCell className="font-medium">{bet.eventName}</TableCell>
                          <TableCell>{bet.selection}</TableCell>
                          <TableCell className="text-right">{bet.odds.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-mono">{bet.betAmount}</TableCell>
                          <TableCell className="text-right font-mono">{bet.potentialWin}</TableCell>
                          <TableCell>{bet.date}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(bet.status)}>
                              {getStatusText(bet.status)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center p-8 border border-dashed rounded-lg">
                  <p className="text-muted-foreground">No active bets found</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="settled">
              {filteredSettledBets.length > 0 ? (
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Selection</TableHead>
                        <TableHead className="text-right">Odds</TableHead>
                        <TableHead className="text-right">Stake</TableHead>
                        <TableHead className="text-right">Result</TableHead>
                        <TableHead>Date Placed</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSettledBets.map(bet => (
                        <TableRow key={bet.id}>
                          <TableCell className="font-medium">{bet.eventName}</TableCell>
                          <TableCell>{bet.selection}</TableCell>
                          <TableCell className="text-right">{bet.odds.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-mono">{bet.betAmount}</TableCell>
                          <TableCell className={`text-right font-mono ${bet.status === 'won' ? 'text-green-500' : 'text-red-500'}`}>
                            {bet.status === 'won' ? '+' + bet.potentialWin : '-' + bet.betAmount}
                          </TableCell>
                          <TableCell>{bet.date}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(bet.status)}>
                              {getStatusText(bet.status)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center p-8 border border-dashed rounded-lg">
                  <p className="text-muted-foreground">No settled bets found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
