
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Bot, Search, Filter } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import BotCard from "@/components/BotCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Bots = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Sample bots data
  const bots = [
    {
      id: "bot-1",
      name: "ETH Trading Bot",
      status: "active" as const,
      tokenAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      profit: 12.5,
      transactions: 87,
      createdAt: "2 days ago"
    },
    {
      id: "bot-2",
      name: "SOL Sniper",
      status: "paused" as const,
      tokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      profit: -3.2,
      transactions: 42,
      createdAt: "1 week ago"
    },
    {
      id: "bot-3",
      name: "PEPE Token Bot",
      status: "stopped" as const,
      tokenAddress: "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
      profit: 25.8,
      transactions: 154,
      createdAt: "3 weeks ago"
    },
    {
      id: "bot-4",
      name: "BTC Leverage Bot",
      status: "active" as const,
      tokenAddress: "0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D",
      profit: 8.3,
      transactions: 62,
      createdAt: "1 month ago"
    }
  ];

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
      </div>
    </DashboardLayout>
  );
};

export default Bots;
