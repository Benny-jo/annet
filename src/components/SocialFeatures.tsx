
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Video, BookOpen, Brain } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import AudioBooks from "./AudioBooks";
import { useState } from "react";
import { Moon, Sun, HelpCircle, UserPlus } from "lucide-react"; // Add these imports

interface Contact {
  id: number;
  name: string;
  avatar?: string;
  lastContact: string;
}

const SocialFeatures = () => {
  const [showAudioBooks, setShowAudioBooks] = useState(false);
  
  const contacts: Contact[] = [
    {
      id: 1,
      name: "Achal Kumari",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AchalKumari&backgroundColor=b6e3f4&radius=50",
      lastContact: "Yesterday"
    },
    {
      id: 2,
      name: "Chiranth",
      avatar: "https://i.pravatar.cc/150?img=68",
      lastContact: "2 days ago"
    },
    {
      id: 3,
      name: "Karthik S Achar",
      lastContact: "1 week ago"
    }
  ];
  
  const activities = [
    {
      id: 1,
      name: "Memory Match Game",
      description: "A game to improve memory and focus",
      icon: Brain
    },
    {
      id: 2,
      name: "Audiobooks",
      description: "Listen to your favorite books",
      icon: BookOpen
    }
  ];

  const handleContactAction = (action: string, contact: Contact) => {
    toast({
      title: `${action} with ${contact.name}`,
      description: `This feature will be available in the next update.`,
      duration: 3000,
    });
  };

  const startActivity = (activity: string) => {
    toast({
      title: `Starting ${activity}`,
      description: `This feature will be available in the next update.`,
      duration: 3000,
    });
  };

  const handleActivityClick = (activity: { name: string; id: number }) => {
    if (activity.name === "Audiobooks") {
      setShowAudioBooks(true);
    } else {
      startActivity(activity.name);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center gap-2 mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-primary/10 hover:bg-primary/20"
        >
          <Sun className="h-5 w-5 text-white rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 text-white rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-primary/10 hover:bg-primary/20"
        >
          <HelpCircle className="h-5 w-5 text-white" />
        </Button>
        <Button
          className="bg-white text-white hover:bg-white flex items-center gap-2 px-4 rounded-full"
        >
          <UserPlus className="h-5 w-5" />
          <span className="font-semibold tracking-wide">Sign In</span>
        </Button>
      </div>
      {showAudioBooks ? (
        <>
          <Button 
            variant="outline" 
            onClick={() => setShowAudioBooks(false)}
            className="mb-4"
          >
            ← Back to Activities
          </Button>
          <AudioBooks />
        </>
      ) : (
        <Card className="feature-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl-acc flex items-center gap-2">
              <MessageCircle className="text-primary" /> Social & Entertainment
            </CardTitle>
            <CardDescription>
              Stay connected with family and friends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold mb-3">Recent Contacts</h3>
            <div className="space-y-3 mb-6">
              {contacts.map((contact) => (
                <div key={contact.id} className="p-3 border rounded-lg flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Avatar className="large-target">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">Last contacted: {contact.lastContact}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="large-target"
                      onClick={() => handleContactAction("Call", contact)}
                    >
                      <Phone size={20} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="large-target"
                      onClick={() => handleContactAction("Video call", contact)}
                    >
                      <Video size={20} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="large-target"
                      onClick={() => handleContactAction("Message", contact)}
                    >
                      <MessageCircle size={20} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">Activities & Entertainment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activities.map((activity) => (
                <Card key={activity.id} className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4 flex flex-col items-center text-center" 
                    onClick={() => handleActivityClick(activity)}>
                    <activity.icon size={40} className="text-primary mb-3 mt-3" />
                    <h4 className="font-semibold text-lg">{activity.name}</h4>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SocialFeatures;
