
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { AlertTriangle, Copy, ShieldCheck } from "lucide-react";

// Function to generate a random 16-character ID
const generateUserId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const Signup = () => {
  const [userId, setUserId] = useState(generateUserId());
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleCopyId = () => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    toast({
      title: "ID Copied",
      description: "Your unique ID has been copied to clipboard"
    });
    
    // Reset copied status after 3 seconds
    setTimeout(() => setCopied(false), 3000);
  };

  const handleConfirmId = () => {
    // Save to localStorage
    localStorage.setItem("tradebotId", userId);
    localStorage.setItem("isLoggedIn", "true");
    
    // Show confirmation
    setConfirmed(true);
    
    toast({
      title: "Account Created",
      description: "Your unique ID has been saved. Please keep this ID safe."
    });
    
    // Redirect to dashboard after 2 seconds
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-dark">
      <header className="border-b border-white/10 backdrop-blur-sm w-full">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="text-xl font-bold text-gradient">TradeBot HQ</div>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="glass-morphism p-8 rounded-xl max-w-md w-full card-glow animate-fade-in">
          <div className="text-center mb-8">
            <div className="bg-purple/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={32} className="text-purple" />
            </div>
            <h1 className="text-2xl font-bold">Create Your Account</h1>
            <p className="text-muted-foreground mt-2">
              We've generated a unique ID for you
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="userId">Your Unique ID</Label>
              <div className="flex">
                <Input
                  id="userId"
                  value={userId}
                  readOnly
                  className="bg-background/50 font-mono"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon" 
                  className="ml-2" 
                  onClick={handleCopyId}
                >
                  <Copy size={16} />
                </Button>
              </div>
              {copied && (
                <p className="text-xs text-purple">
                  Copied to clipboard!
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                This is your unique 16-character ID. You'll need it to log in.
              </p>
            </div>
            
            <div className="bg-destructive/10 p-4 rounded-md flex items-start space-x-3">
              <AlertTriangle className="text-destructive shrink-0 mt-0.5" size={16} />
              <div>
                <p className="text-sm text-destructive-foreground font-medium">Important Warning</p>
                <p className="text-sm text-destructive-foreground mt-1">
                  Store this ID in a safe place. If you lose it, you will <strong>permanently lose access</strong> to your account with no possibility of recovery or refund.
                </p>
              </div>
            </div>
            
            <Button
              type="button"
              className="w-full bg-purple hover:bg-purple-light"
              onClick={handleConfirmId}
              disabled={confirmed}
            >
              {confirmed ? "Redirecting to Dashboard..." : "I've Saved My ID, Continue"}
            </Button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an ID?{" "}
              <Link to="/login" className="text-purple hover:text-purple-light">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
