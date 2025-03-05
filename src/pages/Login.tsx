
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { KeyRound } from "lucide-react";
import { apiService } from "@/services/api";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (!userId || userId.length !== 16) {
      toast({
        title: "Invalid ID",
        description: "Please enter a valid 16-character user ID",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Verify user ID with the server
      const { valid } = await apiService.verifyUser(userId);
      
      if (valid) {
        localStorage.setItem("tradebotId", userId);
        localStorage.setItem("isLoggedIn", "true");
        
        toast({
          title: "Login successful",
          description: "Welcome back to TradeBot HQ!",
        });
        
        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "The ID you entered doesn't match any account",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify user ID. Please try again.",
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
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
              <KeyRound size={32} className="text-purple" />
            </div>
            <h1 className="text-2xl font-bold">Login to TradeBot HQ</h1>
            <p className="text-muted-foreground mt-2">
              Enter your 16-character ID to access your dashboard
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="userId">Your Unique ID</Label>
              <Input
                id="userId"
                placeholder="Enter your 16-character ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                maxLength={16}
                className="bg-background/50"
              />
              <p className="text-xs text-muted-foreground">
                Your unique ID is 16 characters long and case-sensitive
              </p>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-purple hover:bg-purple-light"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an ID yet?{" "}
              <Link to="/signup" className="text-purple hover:text-purple-light">
                Sign up
              </Link>
            </p>
          </div>
          
          <div className="mt-8 bg-destructive/10 p-4 rounded-md">
            <p className="text-sm text-destructive-foreground">
              <strong>Important:</strong> Your ID is the only way to access your account. If you lose it, there is no way to recover it and no refunds will be provided.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
