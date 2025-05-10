
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  ChevronUp, 
  Search,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

// Define level ranges and their corresponding colors
const levelRanges = {
  Rookie: { min: 800, max: 1199, color: "text-racing-green" },
  Amateur: { min: 1200, max: 1649, color: "text-racing-blue" },
  Silver: { min: 1650, max: 1999, color: "text-gray-400" },
  Pro: { min: 2000, max: 99999, color: "text-racing-yellow" }
};

// Sample data for the standings table
const driversData = [
  { 
    position: 1, 
    name: "Max Verstappen", 
    avatar: "/users/user1.jpg",
    country: "🇳🇱", 
    team: "Team Blue", 
    points: 189,
    elo: 2350,
    sr: 95, 
  },
  { 
    position: 2, 
    name: "Lewis Hamilton", 
    avatar: "/users/user2.jpg",
    country: "🇬🇧", 
    team: "Team Silver", 
    points: 156,
    elo: 2280,
    sr: 92, 
  },
  { 
    position: 3, 
    name: "Sebastian Vettel", 
    avatar: "/users/user3.jpg", 
    country: "🇩🇪", 
    team: "Team Red", 
    points: 134,
    elo: 2210,
    sr: 88, 
  },
  { 
    position: 4, 
    name: "Charles Leclerc", 
    avatar: "/users/user2.jpg", 
    country: "🇲🇨", 
    team: "Team Red", 
    points: 124,
    elo: 2175,
    sr: 90, 
  },
  { 
    position: 5, 
    name: "Lando Norris", 
    avatar: "/users/user3.jpg", 
    country: "🇬🇧", 
    team: "Team Orange", 
    points: 118,
    elo: 2050,
    sr: 87, 
  },
  { 
    position: 6, 
    name: "Fernando Alonso", 
    avatar: "/users/user1.jpg", 
    country: "🇪🇸", 
    team: "Team Green", 
    points: 106,
    elo: 2025,
    sr: 85, 
  },
  { 
    position: 7, 
    name: "Daniel Ricciardo", 
    avatar: "/users/user2.jpg", 
    country: "🇦🇺", 
    team: "Team Yellow", 
    points: 92,
    elo: 1950,
    sr: 83, 
  },
  { 
    position: 8, 
    name: "Pierre Gasly", 
    avatar: "/users/user3.jpg", 
    country: "🇫🇷", 
    team: "Team Blue", 
    points: 84,
    elo: 1850,
    sr: 88, 
  },
  { 
    position: 9, 
    name: "George Russell", 
    avatar: "/users/user1.jpg", 
    country: "🇬🇧", 
    team: "Team Silver", 
    points: 78,
    elo: 1820,
    sr: 86, 
  },
  { 
    position: 10, 
    name: "Carlos Sainz", 
    avatar: "/users/user2.jpg", 
    country: "🇪🇸", 
    team: "Team Red", 
    points: 72,
    elo: 1780,
    sr: 84, 
  },
  { 
    position: 11, 
    name: "Valtteri Bottas", 
    avatar: "/users/user3.jpg", 
    country: "🇫🇮", 
    team: "Team Green", 
    points: 65,
    elo: 1700,
    sr: 82, 
  },
  { 
    position: 12, 
    name: "Sergio Perez", 
    avatar: "/users/user1.jpg", 
    country: "🇲🇽", 
    team: "Team Blue", 
    points: 58,
    elo: 1620,
    sr: 79, 
  },
  { 
    position: 13, 
    name: "Yuki Tsunoda", 
    avatar: "/users/user2.jpg", 
    country: "🇯🇵", 
    team: "Team White", 
    points: 42,
    elo: 1540,
    sr: 77, 
  },
  { 
    position: 14, 
    name: "Esteban Ocon", 
    avatar: "/users/user3.jpg", 
    country: "🇫🇷", 
    team: "Team Pink", 
    points: 35,
    elo: 1480,
    sr: 76, 
  },
  { 
    position: 15, 
    name: "Mick Schumacher", 
    avatar: "/users/user1.jpg", 
    country: "🇩🇪", 
    team: "Team White", 
    points: 28,
    elo: 1380,
    sr: 74, 
  },
];

export default function StandingsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: "points",
    direction: "desc",
  });
  const [sortBy, setSortBy] = useState<'points' | 'elo' | 'sr'>('points');
  
  const itemsPerPage = 10;
  
  // Get driver's level based on ELO rating
  const getDriverLevel = (elo: number) => {
    for (const [level, range] of Object.entries(levelRanges)) {
      if (elo >= range.min && elo <= range.max) {
        return { level, color: range.color };
      }
    }
    return { level: "Unknown", color: "text-muted-foreground" };
  };
  
  // Handle sorting
  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction: 
        sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
    if (key === 'points' || key === 'elo' || key === 'sr') {
      setSortBy(key);
    }
  };
  
  // Filter and sort data
  const filteredData = driversData
    .filter(driver => 
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.country.includes(searchTerm) ||
      driver.team.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const key = sortConfig.key as keyof typeof a;
      if (a[key] < b[key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  
  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <Button 
            variant={sortBy === 'points' ? "default" : "outline"} 
            size="sm"
            onClick={() => handleSort('points')}
          >
            Points
            {sortBy === 'points' && (
              sortConfig.direction === 'asc' ? 
              <ArrowUp className="ml-1 h-4 w-4" /> : 
              <ArrowDown className="ml-1 h-4 w-4" />
            )}
          </Button>
          <Button 
            variant={sortBy === 'elo' ? "default" : "outline"} 
            size="sm"
            onClick={() => handleSort('elo')}
          >
            ELO Rating
            {sortBy === 'elo' && (
              sortConfig.direction === 'asc' ? 
              <ArrowUp className="ml-1 h-4 w-4" /> : 
              <ArrowDown className="ml-1 h-4 w-4" />
            )}
          </Button>
          <Button 
            variant={sortBy === 'sr' ? "default" : "outline"} 
            size="sm"
            onClick={() => handleSort('sr')}
          >
            Safety Rating
            {sortBy === 'sr' && (
              sortConfig.direction === 'asc' ? 
              <ArrowUp className="ml-1 h-4 w-4" /> : 
              <ArrowDown className="ml-1 h-4 w-4" />
            )}
          </Button>
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search drivers..."
            className="w-full pl-9"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
      
      <div className="rounded-md border bg-card/50">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-12" onClick={() => handleSort('position')}>
                <div className="flex items-center cursor-pointer">
                  #
                  {sortConfig.key === 'position' && (
                    sortConfig.direction === 'asc' ? 
                    <ChevronUp className="ml-1 h-4 w-4" /> : 
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="min-w-[180px]">Driver</TableHead>
              <TableHead onClick={() => handleSort('team')}>
                <div className="flex items-center cursor-pointer">
                  Team
                  {sortConfig.key === 'team' && (
                    sortConfig.direction === 'asc' ? 
                    <ChevronUp className="ml-1 h-4 w-4" /> : 
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="text-right" onClick={() => handleSort('elo')}>
                <div className="flex items-center justify-end cursor-pointer">
                  ELO
                  {sortConfig.key === 'elo' && (
                    sortConfig.direction === 'asc' ? 
                    <ChevronUp className="ml-1 h-4 w-4" /> : 
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="text-right" onClick={() => handleSort('sr')}>
                <div className="flex items-center justify-end cursor-pointer">
                  SR
                  {sortConfig.key === 'sr' && (
                    sortConfig.direction === 'asc' ? 
                    <ChevronUp className="ml-1 h-4 w-4" /> : 
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="text-right" onClick={() => handleSort('points')}>
                <div className="flex items-center justify-end cursor-pointer">
                  Points
                  {sortConfig.key === 'points' && (
                    sortConfig.direction === 'asc' ? 
                    <ChevronUp className="ml-1 h-4 w-4" /> : 
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((driver, index) => {
              const driverLevel = getDriverLevel(driver.elo);
              return (
                <TableRow key={index} className={index < 3 ? "bg-muted/30" : ""}>
                  <TableCell className="font-medium">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : driver.position}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img 
                          src={driver.avatar} 
                          alt={driver.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {driver.name}
                          <span>{driver.country}</span>
                        </div>
                        <div className={`text-xs ${driverLevel.color}`}>
                          {driverLevel.level}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{driver.team}</TableCell>
                  <TableCell className="text-right font-mono">{driver.elo}</TableCell>
                  <TableCell className="text-right font-mono">{driver.sr}%</TableCell>
                  <TableCell className="text-right font-bold">{driver.points}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
              <PaginationItem key={page}>
                <PaginationLink 
                  isActive={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
}
