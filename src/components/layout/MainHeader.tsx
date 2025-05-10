
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Flag, 
  User, 
  Calendar,
  Menu, 
  X, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MainHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, login, logout } = useAuth();
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary font-bold" : "text-foreground/80 hover:text-foreground";
  };
  
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-card/80 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-racing rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">SK</span>
            </div>
            <span className="font-bold text-xl tracking-tight">SimRacingKH</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/championships" className={`${isActive('/championships')} font-medium flex items-center gap-1`}>
              <Trophy className="w-4 h-4" />
              <span>Championships</span>
            </Link>
            <Link to="/standings" className={`${isActive('/standings')} font-medium flex items-center gap-1`}>
              <Flag className="w-4 h-4" />
              <span>Standings</span>
            </Link>
            <Link to="/betting" className={`${isActive('/betting')} font-medium flex items-center gap-1`}>
              <Trophy className="w-4 h-4" />
              <span>Betting</span>
            </Link>
            <Link to="/calendar" className={`${isActive('/calendar')} font-medium flex items-center gap-1`}>
              <Calendar className="w-4 h-4" />
              <span>Calendar</span>
            </Link>
          </nav>
          
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
                      <img 
                        src={user?.avatar} 
                        alt={user?.name}
                        className="rounded-full w-9 h-9 border-2 border-primary"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="p-2 border-b border-border">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.level} • {user?.eloRating} ELO</p>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button 
                className="bg-gradient-racing hover:bg-gradient-racing hover:opacity-90 shadow-racing"
                onClick={login}
              >
                <img src="/steam-icon.svg" alt="Steam" className="w-5 h-5 mr-2" />
                Login with Steam
              </Button>
            )}
            
            <button 
              className="md:hidden flex items-center justify-center text-foreground p-2"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-card/95 backdrop-blur-md py-4 shadow-md animate-fade-in">
          <nav className="flex flex-col gap-4 container mx-auto px-4">
            <Link to="/championships" className="text-foreground font-medium flex items-center gap-2 p-2 hover:bg-muted rounded-md">
              <Trophy className="w-5 h-5" />
              <span>Championships</span>
            </Link>
            <Link to="/standings" className="text-foreground font-medium flex items-center gap-2 p-2 hover:bg-muted rounded-md">
              <Flag className="w-5 h-5" />
              <span>Standings</span>
            </Link>
            <Link to="/betting" className="text-foreground font-medium flex items-center gap-2 p-2 hover:bg-muted rounded-md">
              <Trophy className="w-5 h-5" />
              <span>Betting</span>
            </Link>
            <Link to="/calendar" className="text-foreground font-medium flex items-center gap-2 p-2 hover:bg-muted rounded-md">
              <Calendar className="w-5 h-5" />
              <span>Calendar</span>
            </Link>
            {isAuthenticated && (
              <Link to="/profile" className="text-foreground font-medium flex items-center gap-2 p-2 hover:bg-muted rounded-md">
                <User className="w-5 h-5" />
                <span>Profile</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
