
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Slider } from "@/components/ui/slider";
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const creditHistory = [
  { date: 'Jan', balance: 1200 },
  { date: 'Feb', balance: 900 },
  { date: 'Mar', balance: 1400 },
  { date: 'Apr', balance: 2200 },
  { date: 'May', balance: 5000 },
];

export default function BettingDashboard() {
  const { user } = useAuth();
  const [conversionAmount, setConversionAmount] = useState<number>(50);
  const maxMonthlyConversion = 100;
  const usedThisMonth = 25;
  const availableForConversion = maxMonthlyConversion - usedThisMonth;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1 bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle>Betting Credits</CardTitle>
          <CardDescription>Your current balance and conversion options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold flex items-center gap-2 mb-6">
            <span>{user?.credits}</span>
            <Badge className="text-xs font-normal">Credits</Badge>
          </div>
          
          <div className="space-y-5">
            <div>
              <div className="text-sm font-medium mb-2">Convert ELO to Betting Credits</div>
              <div className="text-xs text-muted-foreground mb-4">
                Available for conversion this month: {availableForConversion} ELO
              </div>
              
              <div className="space-y-3">
                <Slider
                  value={[conversionAmount]}
                  max={availableForConversion}
                  step={1}
                  onValueChange={(value) => setConversionAmount(value[0])}
                  disabled={availableForConversion <= 0}
                />
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">ELO to convert: {conversionAmount}</div>
                  <div className="text-sm">Credits to receive: {conversionAmount * 10}</div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-xs text-muted-foreground mb-2">Monthly conversion limit</div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${(usedThisMonth / maxMonthlyConversion) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <div>{usedThisMonth} used</div>
                <div>{maxMonthlyConversion - usedThisMonth} remaining</div>
              </div>
            </div>
            
            <Button 
              className="w-full mt-4 bg-primary" 
              disabled={conversionAmount <= 0 || availableForConversion <= 0}
            >
              Convert {conversionAmount} ELO to {conversionAmount * 10} Credits
            </Button>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="text-xs text-muted-foreground">
            <p>1 ELO = 10 Betting Credits</p>
            <p>Credits cannot be converted back to ELO</p>
          </div>
        </CardFooter>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Credit History</CardTitle>
          <CardDescription>Your betting credit balance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={creditHistory}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#ea384c" 
                  fill="url(#colorCredit)" 
                  name="Credit Balance"
                />
                <defs>
                  <linearGradient id="colorCredit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea384c" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ea384c" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <span className="text-sm text-muted-foreground">Winnings</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="text-sm text-muted-foreground">Losses</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-primary"></span>
            <span className="text-sm text-muted-foreground">Conversions</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
