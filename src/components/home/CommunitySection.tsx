
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CommunityPost {
  id: number;
  title: string;
  image: string;
  user: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  type: 'screenshot' | 'replay' | 'event';
  date: string;
}

const communityData: CommunityPost[] = [
  {
    id: 1,
    title: "Epic last lap overtake at Spa-Francorchamps",
    image: "/community/race1.jpg",
    user: {
      name: "RacingWheels",
      avatar: "/users/user1.jpg"
    },
    likes: 124,
    comments: 32,
    type: 'replay',
    date: "2025-05-01"
  },
  {
    id: 2,
    title: "Sunset at Mount Panorama",
    image: "/community/race2.jpg",
    user: {
      name: "DriftKing",
      avatar: "/users/user2.jpg"
    },
    likes: 95,
    comments: 18,
    type: 'screenshot',
    date: "2025-05-04"
  },
  {
    id: 3,
    title: "GT3 Masters Season Opening",
    image: "/community/race3.jpg",
    user: {
      name: "AdminRacer",
      avatar: "/users/user3.jpg"
    },
    likes: 210,
    comments: 45,
    type: 'event',
    date: "2025-05-08"
  },
];

export default function CommunitySection() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  const filteredPosts = activeFilter === 'all' 
    ? communityData 
    : communityData.filter(post => post.type === activeFilter);
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Community Highlights</h2>
            <p className="text-muted-foreground">The best moments from our racing community</p>
          </div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            {['all', 'screenshot', 'replay', 'event'].map((filter) => (
              <Button 
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className="capitalize"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative h-48">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                <Badge 
                  className={`
                    absolute top-3 right-3 
                    ${post.type === 'replay' ? 'bg-secondary' : 
                      post.type === 'screenshot' ? 'bg-primary' : 
                      'bg-accent'}
                  `}
                >
                  {post.type}
                </Badge>
                
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-lg line-clamp-2">{post.title}</h3>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <img src={post.user.avatar} alt={post.user.name} />
                    </Avatar>
                    <span className="text-sm font-medium">{post.user.name}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground gap-3">
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                      </svg>
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
            View All Community Posts
          </Button>
        </div>
      </div>
    </section>
  );
}
