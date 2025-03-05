
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Bots from "./pages/Bots";
import CreateBot from "./pages/CreateBot";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import DashboardNotFound from "./pages/DashboardNotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthGuard from "./components/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected dashboard routes */}
          <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
          <Route path="/dashboard/transactions" element={<AuthGuard><Transactions /></AuthGuard>} />
          <Route path="/dashboard/bots" element={<AuthGuard><Bots /></AuthGuard>} />
          <Route path="/dashboard/bots/create" element={<AuthGuard><CreateBot /></AuthGuard>} />
          <Route path="/dashboard/settings" element={<AuthGuard><Settings /></AuthGuard>} />
          <Route path="/dashboard/*" element={<AuthGuard><DashboardNotFound /></AuthGuard>} />
          
          {/* Fallback routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
