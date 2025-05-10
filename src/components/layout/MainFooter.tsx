
import { Link } from 'react-router-dom';

export default function MainFooter() {
  return (
    <footer className="bg-card/30 border-t border-border/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-racing rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">SK</span>
              </div>
              <span className="font-bold text-xl tracking-tight">SimRacingKH</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The ultimate platform for Assetto Corsa enthusiasts and competitive sim racers
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/championships" className="hover:text-foreground">Championships</Link></li>
              <li><Link to="/standings" className="hover:text-foreground">Standings</Link></li>
              <li><Link to="/betting" className="hover:text-foreground">Betting System</Link></li>
              <li><Link to="/calendar" className="hover:text-foreground">Calendar</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
              <li><Link to="/rules" className="hover:text-foreground">Racing Rules</Link></li>
              <li><Link to="/server-info" className="hover:text-foreground">Server Information</Link></li>
              <li><Link to="/support" className="hover:text-foreground">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 1 .8 1.5 2.5 1.5 4 0 2.485-2.015 4.5-4.5 4.5A4.5 4.5 0 0 1 8.5 14.5z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z"/>
                  <path d="M22 2 11 13"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                  <path d="m10 15 5-3-5-3z"/>
                </svg>
              </a>
            </div>
            <p className="text-sm text-muted-foreground">Join our community on Discord for the latest updates and events!</p>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2025 SimRacingKH. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
