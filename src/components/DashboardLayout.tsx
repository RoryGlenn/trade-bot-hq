
import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
