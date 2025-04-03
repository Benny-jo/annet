
import { useState, useEffect } from "react";
import { Home, Heart, Shield, Users, Settings, Moon, Sun, HelpCircle, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import VoiceNavigation from "./VoiceNavigation";
import HealthDashboard from "./HealthDashboard";
import EmergencyAssistance from "./EmergencyAssistance";
import SocialFeatures from "./SocialFeatures";
import UserProfile from "./UserProfile";

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const { toast } = useToast();
  
  // Handle theme change
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  
  // Handle voice commands
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes("home")) {
      setActiveTab("home");
    } else if (lowerCommand.includes("health") || lowerCommand.includes("medication")) {
      setActiveTab("health");
    } else if (lowerCommand.includes("emergency") || lowerCommand.includes("help")) {
      setActiveTab("emergency");
    } else if (lowerCommand.includes("social") || lowerCommand.includes("contacts")) {
      setActiveTab("social");
    } else if (lowerCommand.includes("profile") || lowerCommand.includes("my profile")) {
      setActiveTab("my profile");
    } else if (lowerCommand.includes("call emergency")) {
      setActiveTab("emergency");
      toast({
        title: "Emergency Simulation",
        description: "In a real application, this would initiate an emergency call to 911.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };
  
  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-6">
            <h1 className="text-4xl-acc font-bold">Welcome to Your Life Companion</h1>
            <p className="text-xl mb-6">
              Your personal assistant for health, safety, and staying connected
            </p>
            <VoiceNavigation onCommand={handleVoiceCommand} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <Button 
                onClick={() => setActiveTab("health")} 
                variant="outline" 
                className="h-32 feature-card flex flex-col items-center justify-center"
              >
                <Heart size={32} className="text-destructive mb-2" />
                <span className="text-xl font-medium">Health Dashboard</span>
              </Button>
              
              <Button 
                onClick={() => setActiveTab("emergency")} 
                variant="outline" 
                className="h-32 feature-card flex flex-col items-center justify-center"
              >
                <Shield size={32} className="text-destructive mb-2" />
                <span className="text-xl font-medium">Emergency Help</span>
              </Button>
              
              <Button 
                onClick={() => setActiveTab("social")} 
                variant="outline" 
                className="h-32 feature-card flex flex-col items-center justify-center"
              >
                <Users size={32} className="text-primary mb-2" />
                <span className="text-xl font-medium">Social & Entertainment</span>
              </Button>
            </div>
          </div>
        );
      case "health":
        return <HealthDashboard />;
      case "emergency":
        return <EmergencyAssistance />;
      case "social":
        return <SocialFeatures />;
      case "my profile":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">My Profile</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <UserCircle size={64} className="text-blue-600" />
                <div>
                  <h3 className="text-xl font-semibold">John Doe</h3>
                  <p className="text-gray-600">john.doe@example.com</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Age</span>
                  <span>65</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Emergency Contact</span>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Medical Conditions</span>
                  <span>Hypertension, Diabetes</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Allergies</span>
                  <span>Penicillin</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Blood Type</span>
                  <span>O+</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Page not found</div>;
    }
  };
  
  const getBackgroundClass = () => {
    switch (activeTab) {
      case "home":
        return "bg-[url('https://goshenhealth.com/uploads/Graphics/Blog-Postings/_960xAUTO_fit_center-center_none_ns/iStock-1363588189_1060x500-ext.jpg.jpg?v=1715867769')] bg-cover bg-center bg-fixed";
      case "health":
        return "bg-[url('https://img.freepik.com/free-photo/medical-banner-with-stethoscope_23-2149611199.jpg')] bg-cover bg-center bg-fixed";
      case "emergency":
        return "bg-[url('https://img.freepik.com/free-photo/ambulance-car-emergency-rescue-service_53876-138044.jpg')] bg-cover bg-center bg-fixed";
      case "social":
        return "bg-[url('https://img.freepik.com/free-photo/group-diverse-people-having-business-meeting_53876-25060.jpg')] bg-cover bg-center bg-fixed";
      default:
        return "bg-gradient-to-b from-blue-50 to-white";
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${getBackgroundClass()}`}>
      {/* Header */}
      <header className="bg-blue-600 shadow-md border-b border-blue-400 sticky top-0 z-10 animate-fade-in">
        <div className="container flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <img 
              src="https://goshenhealth.com/uploads/Graphics/Blog-Postings/_960xAUTO_fit_center-center_none_ns/iStock-1363588189_1060x500-ext.jpg.jpg?v=1715867769" 
              alt="LifeCompanion Logo" 
              className="w-8 h-8 rounded-full object-cover"
            />
            LifeCompanion
          </h1>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="large-target text-white hover:bg-blue-500 hover:text-white animate-entrance"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="large-target text-white hover:bg-blue-500 hover:text-white animate-entrance animation-delay-100"
              onClick={() => toast({ title: "Help", description: "Need assistance? Just say 'help' to activate voice commands." })}
              aria-label="Help"
            >
              <HelpCircle size={24} />
            </Button>
            <UserProfile />
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container py-6 px-4 animate-fade-up backdrop-blur-sm bg-white/80 rounded-lg my-6">
        {renderTabContent()}
      </main>
      
      {/* Navigation Footer */}
      <footer className="bg-white shadow-[0_-1px_3px_rgba(0,0,0,0.1)] border-t border-blue-100 sticky bottom-0 z-10">
        <div className="container flex justify-around items-center p-2">
          <Button 
            variant={activeTab === "home" ? "default" : "ghost"} 
            className={`large-target flex-col py-3 h-auto rounded-lg flex-1 animate-entrance ${
              activeTab === "home" ? "bg-blue-600 text-white" : "text-blue-600 hover:bg-blue-50"
            }`}
            onClick={() => setActiveTab("home")}
          >
            <Home size={24} />
            <span className="text-sm mt-1">Home</span>
          </Button>
          
          <Button 
            variant={activeTab === "health" ? "default" : "ghost"} 
            className={`large-target flex-col py-3 h-auto rounded-lg flex-1 animate-entrance animation-delay-100 ${
              activeTab === "health" ? "bg-blue-600 text-white" : "text-blue-600 hover:bg-blue-50"
            }`}
            onClick={() => setActiveTab("health")}
          >
            <Heart size={24} />
            <span className="text-sm mt-1">Health</span>
          </Button>
          
          <Button 
            variant={activeTab === "emergency" ? "default" : "ghost"} 
            className={`large-target flex-col py-3 h-auto rounded-lg flex-1 animate-entrance animation-delay-200 ${
              activeTab === "emergency" ? "bg-blue-600 text-white" : "text-blue-600 hover:bg-blue-50"
            }`}
            onClick={() => setActiveTab("emergency")}
          >
            <Shield size={24} />
            <span className="text-sm mt-1">Emergency</span>
          </Button>
          
          <Button 
            variant={activeTab === "social" ? "default" : "ghost"} 
            className={`large-target flex-col py-3 h-auto rounded-lg flex-1 animate-entrance animation-delay-300 ${
              activeTab === "social" ? "bg-blue-600 text-white" : "text-blue-600 hover:bg-blue-50"
            }`}
            onClick={() => setActiveTab("social")}
          >
            <Users size={24} />
            <span className="text-sm mt-1">Social</span>
          </Button>
          <Button 
            variant={activeTab === "my profile" ? "default" : "ghost"} 
            className={`large-target flex-col py-3 h-auto rounded-lg flex-1 animate-entrance animation-delay-400 ${
              activeTab === "my profile" ? "bg-blue-600 text-white" : "text-blue-600 hover:bg-blue-50"
            }`}
            onClick={() => setActiveTab("my profile")}
          >
            <UserCircle size={24} className="text-current" />
            <span className="text-sm mt-1 capitalize">My Profile</span>
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
