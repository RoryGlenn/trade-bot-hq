
import { AreaChart, ArrowUpRight, Wallet, BarChart3 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import BotCard from "@/components/BotCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

// Define the types for our dashboard data
interface DashboardData {
  activeBots: number;
  totalProfit: number;
  totalTransactions: number;
  walletBalance: number;
  bots: Bot[];
  transactions: Transaction[];
}

interface Bot {
  id: string;
  name: string;
  status: "active" | "paused" | "stopped";
  tokenAddress: string;
  profit: number;
  transactions: number;
  createdAt: string;
}

interface Transaction {
  id: string;
  botName: string;
  type: "buy" | "sell";
  amount: string;
  token: string;
  tokenAddress: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

// Default empty data
const defaultData: DashboardData = {
  activeBots: 0,
  totalProfit: 0,
  totalTransactions: 0,
  walletBalance: 0,
  bots: [],
  transactions: []
};

const Dashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData>(defaultData);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userId = localStorage.getItem("tradebotId");
        if (!userId) {
          throw new Error("No user ID found");
        }

        // Attempt to fetch real data
        const data = await apiService.getDashboardData(userId);
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        toast({
          title: "Could not load dashboard data",
          description: "Using sample data instead. Please try again later.",
          variant: "destructive",
        });

        // Fallback to sample data on error
        setDashboardData({
          activeBots: 2,
          totalProfit: 1245.89,
          totalTransactions: 129,
          walletBalance: 3.24,
          bots: [
            {
              id: "bot-1",
              name: "ETH Trading Bot",
              status: "active",
              tokenAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
              profit: 12.5,
              transactions: 87,
              createdAt: "2 days ago"
            },
            {
              id: "bot-2",
              name: "SOL Sniper",
              status: "paused",
              tokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
              profit: -3.2,
              transactions: 42,
              createdAt: "1 week ago"
            }
          ],
          transactions: [
            {
              id: "tx-1",
              botName: "ETH Trading Bot",
              type: "buy",
              amount: "0.5 ETH",
              token: "ETH",
              tokenAddress: "0x7a25...488D",
              date: "10 hours ago",
              status: "completed"
            },
            {
              id: "tx-2",
              botName: "SOL Sniper",
              type: "sell",
              amount: "120 SOL",
              token: "SOL",
              tokenAddress: "0xC02a...6Cc2",
              date: "2 days ago",
              status: "completed"
            },
            {
              id: "tx-3",
              botName: "ETH Trading Bot",
              type: "buy",
              amount: "0.2 ETH",
              token: "ETH",
              tokenAddress: "0x7a25...488D",
              date: "3 days ago",
              status: "pending"
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

  // Format a number as a dollar amount
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
          <div className="glass-morphism p-8 animate-pulse rounded-xl">
            <p className="text-xl">Loading your dashboard data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
          value={dashboardData.activeBots.toString()}
          icon={<ArrowUpRight size={20} />}
          change={{ value: "25%", positive: true }}
        />
        <StatCard
          title="Total Profit"
          value={formatCurrency(dashboardData.totalProfit)}
          icon={<AreaChart size={20} />}
          change={{ value: "12%", positive: true }}
        />
        <StatCard
          title="Total Transactions"
          value={dashboardData.totalTransactions.toString()}
          icon={<BarChart3 size={20} />}
          change={{ value: "8%", positive: true }}
        />
        <StatCard
          title="Wallet Balance"
          value={`${dashboardData.walletBalance} ETH`}
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
          {dashboardData.bots.length > 0 ? (
            dashboardData.bots.map(bot => (
              <BotCard key={bot.id} {...bot} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center h-32 glass-morphism rounded-xl">
              <p className="text-muted-foreground">No bots found</p>
              <Link to="/dashboard/bots/create" className="text-purple hover:underline mt-2">
                Create your first bot
              </Link>
            </div>
          )}
          
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
              {dashboardData.transactions.length > 0 ? (
                dashboardData.transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">{tx.botName}</td>
                    <td className="p-4 text-green-400">{tx.type === 'buy' ? 'Buy' : 'Sell'}</td>
                    <td className="p-4">{tx.amount}</td>
                    <td className="p-4 font-mono">{tx.tokenAddress}</td>
                    <td className="p-4">{tx.date}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        tx.status === 'completed' 
                          ? 'bg-green-400/10 text-green-400' 
                          : tx.status === 'pending'
                            ? 'bg-amber-400/10 text-amber-400'
                            : 'bg-red-400/10 text-red-400'
                      }`}>
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-muted-foreground">
                    No transactions yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
