
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const newsItems = [
  {
    id: 1,
    category: "formula1",
    title: "Hamilton Secures Pole Position at Monaco Grand Prix",
    summary: "Lewis Hamilton outqualified Max Verstappen by just 0.084 seconds to take pole position for the Monaco Grand Prix, setting up a thrilling race on Sunday.",
    source: "Formula1.com",
    date: "2 hours ago",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
  },
  {
    id: 2,
    category: "formula1",
    title: "Ferrari Unveils Updates for Spanish Grand Prix",
    summary: "Scuderia Ferrari has unveiled a raft of updates for the Spanish Grand Prix as they look to close the gap to Red Bull Racing in the championship battle.",
    source: "Autosport",
    date: "5 hours ago",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
  },
  {
    id: 3,
    category: "wec",
    title: "Toyota Leads 24 Hours of Le Mans After Six Hours",
    summary: "Toyota Gazoo Racing holds a commanding lead in the 24 Hours of Le Mans after six hours of racing, with their #8 car leading the sister #7 car by just under 30 seconds.",
    source: "WEC",
    date: "Yesterday",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22"
  },
  {
    id: 4,
    category: "wrc",
    title: "Ogier Takes Early Lead in Rally Portugal",
    summary: "Sebastien Ogier has taken an early lead in Rally Portugal, winning three of Friday's six stages to establish a 7.7 second advantage over championship leader Elfyn Evans.",
    source: "WRC.com",
    date: "1 day ago",
    image: "https://images.unsplash.com/photo-1487252665478-49b61b47f302"
  }
];

export default function NewsFeed() {
  return (
    <section className="py-16 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Latest Racing News</h2>
          
          <Tabs defaultValue="all" className="space-y-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">All News</TabsTrigger>
                <TabsTrigger value="formula1">Formula 1</TabsTrigger>
                <TabsTrigger value="wec">WEC</TabsTrigger>
                <TabsTrigger value="wrc">WRC</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {newsItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden border-border/50 hover:border-primary/30 transition-all">
                    <div className="h-48 overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-medium bg-primary/20 text-primary px-2 py-0.5 rounded">
                          {item.category === "formula1" ? "Formula 1" : item.category === "wec" ? "WEC" : "WRC"}
                        </span>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Source: {item.source}</span>
                        <a href="#" className="text-sm text-primary hover:underline">Read more</a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="formula1" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {newsItems.filter(item => item.category === "formula1").map((item) => (
                  <Card key={item.id} className="overflow-hidden border-border/50 hover:border-primary/30 transition-all">
                    <div className="h-48 overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-medium bg-primary/20 text-primary px-2 py-0.5 rounded">Formula 1</span>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Source: {item.source}</span>
                        <a href="#" className="text-sm text-primary hover:underline">Read more</a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Similar content for wec and wrc tabs - abbreviated for brevity */}
            <TabsContent value="wec" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {newsItems.filter(item => item.category === "wec").map((item) => (
                  <Card key={item.id} className="overflow-hidden border-border/50 hover:border-primary/30 transition-all">
                    <div className="h-48 overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-medium bg-primary/20 text-primary px-2 py-0.5 rounded">WEC</span>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Source: {item.source}</span>
                        <a href="#" className="text-sm text-primary hover:underline">Read more</a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="wrc" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {newsItems.filter(item => item.category === "wrc").map((item) => (
                  <Card key={item.id} className="overflow-hidden border-border/50 hover:border-primary/30 transition-all">
                    <div className="h-48 overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-medium bg-primary/20 text-primary px-2 py-0.5 rounded">WRC</span>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Source: {item.source}</span>
                        <a href="#" className="text-sm text-primary hover:underline">Read more</a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
