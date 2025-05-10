
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-black">
        <img 
          src="/racing-hero.jpg" 
          alt="Racing simulation" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
      </div>
      
      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-6 staggered-fade-in">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white text-shadow">
              Drive. Compete. <span className="text-primary">Conquer.</span>
            </h1>
            
            <p className="text-xl text-white/90 text-shadow">
              The premier Assetto Corsa racing platform with championships, 
              detailed statistics, and an innovative betting system.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                className="bg-gradient-racing hover:bg-gradient-racing hover:opacity-90 shadow-racing text-lg h-12 px-6"
                size="lg"
              >
                <img src="/steam-icon.svg" alt="Steam" className="w-5 h-5 mr-2" />
                Login with Steam
              </Button>
              
              <Button 
                variant="outline" 
                className="border-white/30 bg-black/30 text-white hover:bg-white/10 text-lg h-12 px-6"
                size="lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Racing Stripe Accents */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-racing"></div>
      <div className="absolute top-1/3 left-0 w-20 h-1 bg-primary animate-pulse-slow"></div>
      <div className="absolute top-2/3 right-0 w-20 h-1 bg-secondary animate-pulse-slow"></div>
    </section>
  );
}
