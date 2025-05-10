
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from "recharts";

const pointsDistributionData = [
  { name: 'Max V.', points: 189, fill: '#ea384c' },
  { name: 'Lewis H.', points: 156, fill: '#1EAEDB' },
  { name: 'Seb V.', points: 134, fill: '#F97316' },
  { name: 'Charles L.', points: 124, fill: '#8E9196' },
  { name: 'Lando N.', points: 118, fill: '#10B981' },
  { name: 'Others', points: 456, fill: '#8A898C' },
];

const performanceTrendData = [
  { race: 'Race 1', verstappen: 25, hamilton: 18, vettel: 15, leclerc: 12, norris: 10 },
  { race: 'Race 2', verstappen: 18, hamilton: 25, vettel: 15, leclerc: 12, norris: 10 },
  { race: 'Race 3', verstappen: 25, hamilton: 18, vettel: 15, leclerc: 12, norris: 10 },
  { race: 'Race 4', verstappen: 25, hamilton: 18, vettel: 15, leclerc: 12, norris: 10 },
  { race: 'Race 5', verstappen: 15, hamilton: 25, vettel: 18, leclerc: 12, norris: 10 },
  { race: 'Race 6', verstappen: 25, hamilton: 18, vettel: 15, leclerc: 25, norris: 12 },
];

const eloSrCorrelationData = [
  { name: 'Driver 1', elo: 2350, sr: 95, points: 189 },
  { name: 'Driver 2', elo: 2280, sr: 92, points: 156 },
  { name: 'Driver 3', elo: 2210, sr: 88, points: 134 },
  { name: 'Driver 4', elo: 2175, sr: 90, points: 124 },
  { name: 'Driver 5', elo: 2050, sr: 87, points: 118 },
  { name: 'Driver 6', elo: 2025, sr: 85, points: 106 },
  { name: 'Driver 7', elo: 1950, sr: 83, points: 92 },
  { name: 'Driver 8', elo: 1850, sr: 88, points: 84 },
  { name: 'Driver 9', elo: 1820, sr: 86, points: 78 },
  { name: 'Driver 10', elo: 1780, sr: 84, points: 72 },
];

export default function StandingsCharts() {
  const chartConfig = {
    verstappen: { 
      label: "Max Verstappen", 
      color: "#ea384c" // Racing Red
    },
    hamilton: { 
      label: "Lewis Hamilton", 
      color: "#1EAEDB" // Bright Blue
    },
    vettel: { 
      label: "Sebastian Vettel", 
      color: "#F97316" // Orange
    },
    leclerc: { 
      label: "Charles Leclerc", 
      color: "#8E9196" // Neutral Gray
    },
    norris: { 
      label: "Lando Norris", 
      color: "#10B981" // Green
    },
  };
  
  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold mb-6">Performance Analytics</h2>
      
      <Tabs defaultValue="distribution" className="space-y-6">
        <TabsList>
          <TabsTrigger value="distribution">Points Distribution</TabsTrigger>
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="correlation">ELO/SR Correlation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Championship Points Distribution</CardTitle>
              <CardDescription>How the championship points are distributed among the top drivers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={pointsDistributionData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="points" name="Points">
                      {pointsDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Driver Performance Trend</CardTitle>
              <CardDescription>Race-by-race performance of the top drivers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={chartConfig}>
                  <LineChart data={performanceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="race" 
                      axisLine={false} 
                      tickLine={false} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                    />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="verstappen" 
                      stroke="var(--color-verstappen)" 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="hamilton" 
                      stroke="var(--color-hamilton)" 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="vettel" 
                      stroke="var(--color-vettel)" 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="leclerc" 
                      stroke="var(--color-leclerc)" 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="norris" 
                      stroke="var(--color-norris)" 
                      strokeWidth={2} 
                    />
                    <ChartLegend
                      content={<ChartLegendContent />}
                      verticalAlign="bottom"
                      height={60}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="correlation">
          <Card>
            <CardHeader>
              <CardTitle>ELO Rating vs Safety Rating Correlation</CardTitle>
              <CardDescription>Analysis of how ELO and safety ratings correlate with championship performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={eloSrCorrelationData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="elo" label={{ value: 'ELO Rating', position: 'bottom', offset: 0 }} />
                    <YAxis yAxisId="left" label={{ value: 'Safety Rating (%)', angle: -90, position: 'left' }} />
                    <YAxis yAxisId="right" orientation="right" label={{ value: 'Championship Points', angle: 90, position: 'right' }} />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="sr" name="Safety Rating" stroke="#1EAEDB" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="points" name="Championship Points" stroke="#ea384c" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
