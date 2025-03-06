
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Bot, Search, Filter } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import BotCard from "@/components/BotCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface Bot {
  id: string;
  name: string;
  status: "active" | "paused" | "stopped";
  tokenAddress: string;
  profit: number;
  transactions: number;
  createdAt: string;
}

const Bots = () => {
  const { toast } = useToast();
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [bots, setBots] = useState<Bot[]>([]);
  
  useEffect(() => {
    const fetchBots = async () => {
      try {
        const userId = localStorage.getItem("tradebotId");
        if (!userId) {
          throw new Error("No user ID found");
        }
        
        // Fetch bots from the API
        const botsData = await apiService.getUserBots(userId);
        setBots(botsData);
      } catch (error) {
        console.error("Failed to fetch bots:", error);
        toast({
          title: "Could not load bots data",
          description: "Please try again later or contact support.",
          variant: "destructive",
        });
        
        // Set empty array when error occurs
        setBots([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBots();
  }, [toast]);

  // Filter bots based on status
  const filteredBots = filterStatus === "all" 
    ? bots 
    : bots.filter(bot => bot.status === filterStatus);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gradient">Trading Bots</h1>
        <Button asChild className="bg-purple hover:bg-purple-light">
          <Link to="/dashboard/bots/create">
            <Plus size={16} className="mr-2" /> Create New Bot
          </Link>
        </Button>
      </div>

      <div className="glass-morphism rounded-xl p-6 mb-8 animate-slide-in">
        <div className="flex flex-col md:flex-row gap-4 md:items-end">
          <div className="flex-1 space-y-2">
            <label className="text-sm text-muted-foreground">Search Bots</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9 bg-secondary border-white/10" placeholder="Search by name or token address" />
            </div>
          </div>
          <div className="w-full md:w-48 space-y-2">
            <label className="text-sm text-muted-foreground">Status</label>
            <Select defaultValue="all" onValueChange={setFilterStatus}>
              <SelectTrigger className="bg-secondary border-white/10">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="stopped">Stopped</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-48 space-y-2">
            <label className="text-sm text-muted-foreground">Sort By</label>
            <Select defaultValue="profit">
              <SelectTrigger className="bg-secondary border-white/10">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="profit">Profit</SelectItem>
                <SelectItem value="created">Date Created</SelectItem>
                <SelectItem value="transactions">Transactions</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" className="border-white/10 hover:bg-white/5">
            <Filter size={16} className="mr-2" /> More Filters
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="glass-morphism p-8 animate-pulse rounded-xl">
            <p className="text-lg">Loading your bots...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredBots.length > 0 ? (
            <>
              {filteredBots.map(bot => (
                <BotCard key={bot.id} {...bot} />
              ))}
              
              <Link 
                to="/dashboard/bots/create" 
                className="flex flex-col items-center justify-center h-full min-h-[220px] border border-dashed border-white/20 rounded-xl hover:border-purple/50 hover:bg-white/5 transition-all duration-300"
              >
                <div className="p-4 rounded-full bg-purple/10 mb-3">
                  <Bot size={24} className="text-purple" />
                </div>
                <span className="text-muted-foreground">Create a new trading bot</span>
              </Link>
            </>
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center h-32 glass-morphism rounded-xl">
              <p className="text-muted-foreground">No bots found</p>
              <Link to="/dashboard/bots/create" className="text-purple hover:underline mt-2">
                Create your first bot
              </Link>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Bots;
