
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { apiService } from "@/services/api";
import { toast } from "@/hooks/use-toast";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      // Check if the user is logged in locally
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const userId = localStorage.getItem("tradebotId");
      
      if (isLoggedIn && userId) {
        try {
          // Verify with the server
          const { valid } = await apiService.verifyUser(userId);
          setAuthenticated(valid);
          
          if (!valid) {
            // Clear invalid credentials
            localStorage.removeItem("isLoggedIn");
            toast({
              title: "Authentication Error",
              description: "Your session is invalid. Please log in again.",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Auth verification error:", error);
          // On error, we'll still allow access if localStorage has valid data
          // This prevents blocking users if the backend is temporarily down
          setAuthenticated(true);
        }
      } else {
        setAuthenticated(false);
      }
      
      setLoading(false);
    };

    verifyAuth();
  }, []);

  if (loading) {
    // Return a loading state if still checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-dark">
        <div className="glass-morphism p-8 rounded-xl animate-pulse">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children
  return <>{children}</>;
};

export default AuthGuard;
