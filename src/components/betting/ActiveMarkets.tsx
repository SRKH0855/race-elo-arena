
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface BetMarket {
  id: number;
  title: string;
  eventName: string;
  eventDate: string;
  options: BetOption[];
  type: 'race-winner' | 'podium' | 'pole' | 'fastest-lap' | 'championship';
}

interface BetOption {
  id: number;
  name: string;
  odds: number;
  form?: string;
}

const betMarkets: BetMarket[] = [
  {
    id: 1,
    title: "Race Winner",
    eventName: "GT3 Sprint Masters - Spa",
    eventDate: "May 12, 2025",
    type: 'race-winner',
    options: [
      { id: 1, name: "Max Verstappen", odds: 2.10, form: "1-1-2-1-1" },
      { id: 2, name: "Lewis Hamilton", odds: 3.50, form: "2-1-3-2-2" },
      { id: 3, name: "Sebastian Vettel", odds: 5.00, form: "3-3-5-3-3" },
      { id: 4, name: "Charles Leclerc", odds: 6.50, form: "5-4-6-5-6" },
      { id: 5, name: "Lando Norris", odds: 8.00, form: "4-5-4-4-5" }
    ]
  },
  {
    id: 2,
    title: "Podium Finish",
    eventName: "GT3 Sprint Masters - Spa",
    eventDate: "May 12, 2025",
    type: 'podium',
    options: [
      { id: 1, name: "Max Verstappen", odds: 1.30, form: "1-1-2-1-1" },
      { id: 2, name: "Lewis Hamilton", odds: 1.60, form: "2-1-3-2-2" },
      { id: 3, name: "Sebastian Vettel", odds: 2.20, form: "3-3-5-3-3" },
      { id: 4, name: "Charles Leclerc", odds: 2.40, form: "5-4-6-5-6" },
      { id: 5, name: "Lando Norris", odds: 3.00, form: "4-5-4-4-5" }
    ]
  },
  {
    id: 3,
    title: "Pole Position",
    eventName: "Formula Sprint Challenge - Barcelona",
    eventDate: "May 15, 2025",
    type: 'pole',
    options: [
      { id: 1, name: "Lewis Hamilton", odds: 2.10, form: "P1-P2-P1-P3-P2" },
      { id: 2, name: "Max Verstappen", odds: 3.50, form: "P2-P1-P2-P1-P1" },
      { id: 3, name: "Charles Leclerc", odds: 4.00, form: "P3-P3-P5-P2-P4" },
      { id: 4, name: "Lando Norris", odds: 8.00, form: "P4-P5-P4-P4-P5" }
    ]
  },
  {
    id: 4,
    title: "Fastest Lap",
    eventName: "GT3 Sprint Masters - Spa",
    eventDate: "May 12, 2025",
    type: 'fastest-lap',
    options: [
      { id: 1, name: "Max Verstappen", odds: 2.50, form: "FL-FL-X-X-FL" },
      { id: 2, name: "Lewis Hamilton", odds: 3.00, form: "X-X-FL-FL-X" },
      { id: 3, name: "Sebastian Vettel", odds: 5.50, form: "X-X-X-X-X" },
      { id: 4, name: "Charles Leclerc", odds: 4.00, form: "X-X-X-X-X" },
      { id: 5, name: "Lando Norris", odds: 8.00, form: "X-FL-X-X-X" }
    ]
  },
  {
    id: 5,
    title: "Championship Winner",
    eventName: "GT3 Sprint Masters",
    eventDate: "Final: Jun 30, 2025",
    type: 'championship',
    options: [
      { id: 1, name: "Max Verstappen", odds: 1.80 },
      { id: 2, name: "Lewis Hamilton", odds: 2.20 },
      { id: 3, name: "Sebastian Vettel", odds: 8.00 },
      { id: 4, name: "Charles Leclerc", odds: 10.00 },
      { id: 5, name: "Lando Norris", odds: 15.00 }
    ]
  }
];

export default function ActiveMarkets() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('race-winner');
  const [selectedBet, setSelectedBet] = useState<BetOption | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<BetMarket | null>(null);
  const [betAmount, setBetAmount] = useState<string>('100');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  
  const handleOpenBetDialog = (market: BetMarket, option: BetOption) => {
    setSelectedMarket(market);
    setSelectedBet(option);
    setIsDialogOpen(true);
  };
  
  const handlePlaceBet = () => {
    const amount = parseInt(betAmount, 10);
    
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Bet Amount",
        description: "Please enter a valid bet amount.",
        variant: "destructive",
      });
      return;
    }
    
    if (!user || amount > user.credits) {
      toast({
        title: "Insufficient Credits",
        description: "You don't have enough credits to place this bet.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Bet Placed Successfully",
      description: `You bet ${amount} credits on ${selectedBet?.name} at odds of ${selectedBet?.odds}`,
    });
    
    setIsDialogOpen(false);
  };
  
  const filteredMarkets = betMarkets.filter(market => market.type === activeTab);
  
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Active Betting Markets</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="race-winner">Race Winners</TabsTrigger>
          <TabsTrigger value="podium">Podium Finishes</TabsTrigger>
          <TabsTrigger value="pole">Pole Positions</TabsTrigger>
          <TabsTrigger value="fastest-lap">Fastest Laps</TabsTrigger>
          <TabsTrigger value="championship">Championships</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 gap-6">
            {filteredMarkets.map(market => (
              <Card key={market.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{market.title}</CardTitle>
                      <CardDescription>{market.eventName} • {market.eventDate}</CardDescription>
                    </div>
                    <Badge>{market.type === 'championship' ? "Long Term" : "Event"}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {market.options.map(option => (
                      <div 
                        key={option.id}
                        className="flex flex-col justify-between border rounded-lg p-4 hover:bg-muted/30 transition-colors"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">{option.name}</div>
                            <Badge variant="outline" className="bg-primary/10 border-primary/20">
                              {option.odds.toFixed(2)}
                            </Badge>
                          </div>
                          
                          {option.form && (
                            <div className="flex gap-1 mb-3">
                              {option.form.split('-').map((result, idx) => (
                                <span 
                                  key={idx}
                                  className={`text-xs px-1.5 py-0.5 rounded ${
                                    result === 'P1' || result === '1' || result === 'FL' 
                                      ? 'bg-green-500/20 text-green-500' 
                                      : result.startsWith('P') || /^\d+$/.test(result) 
                                        ? 'bg-blue-500/20 text-blue-500' 
                                        : 'bg-muted text-muted-foreground'
                                  }`}
                                >
                                  {result}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              onClick={() => handleOpenBetDialog(market, option)}
                              className="mt-2 w-full"
                            >
                              Place Bet
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredMarkets.length === 0 && (
              <div className="text-center p-12 border border-dashed rounded-lg">
                <p className="text-muted-foreground">No active markets in this category</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Bet Placement Dialog */}
      {selectedMarket && selectedBet && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Place Bet</DialogTitle>
              <DialogDescription>
                {selectedMarket.title} - {selectedMarket.eventName}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{selectedBet.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedMarket.eventDate}</p>
                </div>
                <Badge className="text-xl py-1.5 px-3">{selectedBet.odds.toFixed(2)}</Badge>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Bet Amount (Credits)</p>
                <Input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  className="font-mono text-right"
                />
              </div>
              
              <div className="flex justify-between items-center bg-muted p-3 rounded-md">
                <p className="text-sm">Potential Winnings</p>
                <p className="font-bold font-mono">
                  {(parseFloat(betAmount) * selectedBet.odds).toFixed(0)} credits
                </p>
              </div>
              
              <div className="text-center text-sm text-muted-foreground">
                Your balance: {user?.credits} credits
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handlePlaceBet}>
                Place Bet
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
