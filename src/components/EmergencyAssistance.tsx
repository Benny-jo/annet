
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Shield, UserRound, Users } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

interface Contact {
  id: number;
  name: string;
  relation: string;
  phone: string;
}

const EmergencyAssistance = () => {
  const [contacts] = useState<Contact[]>([
    { id: 1, name: "Sarah Johnson", relation: "Daughter", phone: "555-123-4567" },
    { id: 2, name: "Dr. Michael Roberts", relation: "Primary Doctor", phone: "555-987-6543" },
  ]);

  const handleEmergencyCall = () => {
    toast({
      title: "Emergency Simulation",
      description: "In a real application, this would initiate an emergency call to 911.",
      variant: "destructive",
      duration: 5000,
    });
  };

  const callContact = (contact: Contact) => {
    toast({
      title: `Calling ${contact.name}`,
      description: `Simulating a call to ${contact.phone}`,
      duration: 3000,
    });
  };

  const addEmergencyContact = () => {
    toast({
      title: "Add Emergency Contact",
      description: "This feature will be available in the next update.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="feature-card bg-destructive/5 border-destructive/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl-acc flex items-center gap-2">
            <Shield className="text-destructive" /> Emergency Assistance
          </CardTitle>
          <CardDescription>
            Quick access to help when you need it
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full py-8 text-xl large-target mb-6"
            variant="destructive"
            onClick={handleEmergencyCall}
          >
            <Phone size={28} className="mr-3" /> Emergency Call (911)
          </Button>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Emergency Contacts</h3>
          
          <div className="space-y-3 mb-4">
            {contacts.map((contact) => (
              <div key={contact.id} className="p-3 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.relation} • {contact.phone}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="large-target"
                  onClick={() => callContact(contact)}
                >
                  <Phone size={16} className="mr-1" /> Call
                </Button>
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline"
            className="w-full large-target"
            onClick={addEmergencyContact}
          >
            <Users size={16} className="mr-2" /> Add Emergency Contact
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyAssistance;
