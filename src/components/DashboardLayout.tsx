import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { toast } from "@/hooks/use-toast";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Keep the tradebotId in localStorage, but remove the login flag
    localStorage.removeItem("isLoggedIn");
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
    
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onLogout={handleLogout} />
      <main className="flex-1 overflow-x-hidden">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
