
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, UserIcon, Settings, Heart, Shield, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const UserProfile = () => {
  const { user, logout, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <Button
        onClick={() => navigate("/signin")}
        variant="outline"
        className="bg-white/20 backdrop-blur-sm border-blue-200 text-blue-700 hover:bg-blue-50 animate-fade-in"
      >
        Sign In
      </Button>
    );
  }

  const handleSignOut = () => {
    setOpen(false);
    logout();
    navigate("/signin");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="rounded-full p-0 w-10 h-10 animate-entrance">
          <Avatar className="h-10 w-10 border-2 border-blue-300 hover:border-blue-500 transition-all">
            <AvatarImage src={user?.avatar} alt={user?.name || "User"} />
            <AvatarFallback className="bg-blue-100 text-blue-800">
              {user?.name ? getInitials(user.name) : "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white border-blue-100">
        <SheetHeader className="text-left">
          <SheetTitle className="text-blue-900 text-xl flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-blue-700" />
            User Profile
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-blue-200">
              <AvatarImage src={user?.avatar} alt={user?.name || "User"} />
              <AvatarFallback className="bg-blue-100 text-blue-800 text-xl">
                {user?.name ? getInitials(user.name) : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg text-blue-900">{user?.name}</h3>
              <p className="text-blue-600 text-sm">{user?.email}</p>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-blue-800">Quick Access</h4>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                className="flex flex-col h-auto py-3 border-blue-100 hover:border-blue-300"
                onClick={() => {
                  setOpen(false);
                  navigate("/");
                }}
              >
                <Heart className="h-5 w-5 text-blue-600 mb-1" />
                <span className="text-xs">Health</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col h-auto py-3 border-blue-100 hover:border-blue-300"
                onClick={() => {
                  setOpen(false);
                  navigate("/");
                }}
              >
                <Shield className="h-5 w-5 text-blue-600 mb-1" />
                <span className="text-xs">Emergency</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col h-auto py-3 border-blue-100 hover:border-blue-300"
                onClick={() => {
                  setOpen(false);
                  navigate("/");
                }}
              >
                <Users className="h-5 w-5 text-blue-600 mb-1" />
                <span className="text-xs">Social</span>
              </Button>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start border-blue-100 text-blue-800 hover:bg-blue-50"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start border-blue-100 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserProfile;
