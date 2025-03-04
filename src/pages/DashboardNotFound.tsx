
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";

const DashboardNotFound = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="glass-morphism p-8 rounded-xl max-w-md text-center">
          <h1 className="text-6xl font-bold text-gradient mb-6">404</h1>
          <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild className="bg-purple hover:bg-purple-light">
            <Link to="/dashboard">
              <LayoutDashboard size={16} className="mr-2" /> Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardNotFound;
