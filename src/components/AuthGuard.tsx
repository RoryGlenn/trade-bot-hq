
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const hasId = !!localStorage.getItem("tradebotId");
    
    setAuthenticated(isLoggedIn && hasId);
    setLoading(false);
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
