
import { AreaChart, ArrowUpRight, Wallet, BarChart3 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import BotCard from "@/components/BotCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Sample data for demonstration
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
    }
  ];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gradient">Dashboard Overview</h1>
        <Button asChild className="bg-purple hover:bg-purple-light">
          <Link to="/dashboard/bots/create">Create New Bot</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Active Bots"
          value="2"
          icon={<ArrowUpRight size={20} />}
          change={{ value: "25%", positive: true }}
        />
        <StatCard
          title="Total Profit"
          value="$1,245.89"
          icon={<AreaChart size={20} />}
          change={{ value: "12%", positive: true }}
        />
        <StatCard
          title="Total Transactions"
          value="129"
          icon={<BarChart3 size={20} />}
          change={{ value: "8%", positive: true }}
        />
        <StatCard
          title="Wallet Balance"
          value="3.24 ETH"
          icon={<Wallet size={20} />}
          change={{ value: "5%", positive: false }}
        />
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Running Bots</h2>
          <Link to="/dashboard/bots" className="text-sm text-purple hover:underline">View all bots</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bots.map(bot => (
            <BotCard key={bot.id} {...bot} />
          ))}
          
          <Link 
            to="/dashboard/bots/create" 
            className="flex flex-col items-center justify-center h-full min-h-[220px] border border-dashed border-white/20 rounded-xl hover:border-purple/50 hover:bg-white/5 transition-all duration-300"
          >
            <div className="p-4 rounded-full bg-purple/10 mb-3">
              <ArrowUpRight size={24} className="text-purple" />
            </div>
            <span className="text-muted-foreground">Create a new trading bot</span>
          </Link>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Transactions</h2>
          <Link to="/dashboard/transactions" className="text-sm text-purple hover:underline">View all transactions</Link>
        </div>
        
        <div className="glass-morphism rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-muted-foreground font-medium">Bot</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Type</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Amount</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Token</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Date</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">ETH Trading Bot</td>
                <td className="p-4 text-green-400">Buy</td>
                <td className="p-4">0.5 ETH</td>
                <td className="p-4 font-mono">0x7a25...488D</td>
                <td className="p-4">10 hours ago</td>
                <td className="p-4"><span className="px-2 py-1 rounded-full bg-green-400/10 text-green-400 text-xs">Completed</span></td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">SOL Sniper</td>
                <td className="p-4 text-red-400">Sell</td>
                <td className="p-4">120 SOL</td>
                <td className="p-4 font-mono">0xC02a...6Cc2</td>
                <td className="p-4">2 days ago</td>
                <td className="p-4"><span className="px-2 py-1 rounded-full bg-green-400/10 text-green-400 text-xs">Completed</span></td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4">ETH Trading Bot</td>
                <td className="p-4 text-green-400">Buy</td>
                <td className="p-4">0.2 ETH</td>
                <td className="p-4 font-mono">0x7a25...488D</td>
                <td className="p-4">3 days ago</td>
                <td className="p-4"><span className="px-2 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
