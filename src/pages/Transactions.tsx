
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download } from "lucide-react";

const Transactions = () => {
  // Sample transaction data
  const transactions = [
    {
      id: "tx1",
      bot: "ETH Trading Bot",
      type: "Buy",
      amount: "0.5 ETH",
      token: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      date: "10 hours ago",
      status: "Completed",
      profit: "+2.3%"
    },
    {
      id: "tx2",
      bot: "SOL Sniper",
      type: "Sell",
      amount: "120 SOL",
      token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      date: "2 days ago",
      status: "Completed",
      profit: "-1.2%"
    },
    {
      id: "tx3",
      bot: "ETH Trading Bot",
      type: "Buy",
      amount: "0.2 ETH",
      token: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      date: "3 days ago",
      status: "Pending",
      profit: "0%"
    },
    {
      id: "tx4",
      bot: "SOL Sniper",
      type: "Buy",
      amount: "50 SOL",
      token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      date: "5 days ago",
      status: "Completed",
      profit: "+8.7%"
    },
    {
      id: "tx5",
      bot: "ETH Trading Bot",
      type: "Sell",
      amount: "0.8 ETH",
      token: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      date: "1 week ago",
      status: "Completed",
      profit: "+5.2%"
    }
  ];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gradient">Transaction History</h1>
        <Button className="bg-purple hover:bg-purple-light">
          <Download size={16} className="mr-2" /> Export CSV
        </Button>
      </div>

      <div className="glass-morphism rounded-xl p-6 mb-8 animate-slide-in">
        <div className="flex flex-col md:flex-row gap-4 md:items-end">
          <div className="flex-1 space-y-2">
            <label className="text-sm text-muted-foreground">Search Transactions</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9 bg-secondary border-white/10" placeholder="Search by token, bot name, or transaction ID" />
            </div>
          </div>
          <div className="w-full md:w-48 space-y-2">
            <label className="text-sm text-muted-foreground">Bot</label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-secondary border-white/10">
                <SelectValue placeholder="All Bots" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bots</SelectItem>
                <SelectItem value="eth-bot">ETH Trading Bot</SelectItem>
                <SelectItem value="sol-bot">SOL Sniper</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-48 space-y-2">
            <label className="text-sm text-muted-foreground">Type</label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-secondary border-white/10">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="buy">Buy</SelectItem>
                <SelectItem value="sell">Sell</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-48 space-y-2">
            <label className="text-sm text-muted-foreground">Status</label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-secondary border-white/10">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="glass-morphism rounded-xl overflow-hidden animate-slide-in">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 text-muted-foreground font-medium">Bot</th>
              <th className="text-left p-4 text-muted-foreground font-medium">Type</th>
              <th className="text-left p-4 text-muted-foreground font-medium">Amount</th>
              <th className="text-left p-4 text-muted-foreground font-medium">Token</th>
              <th className="text-left p-4 text-muted-foreground font-medium">Date</th>
              <th className="text-left p-4 text-muted-foreground font-medium">Status</th>
              <th className="text-left p-4 text-muted-foreground font-medium">Profit</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">{tx.bot}</td>
                <td className="p-4" style={{ color: tx.type === "Buy" ? "#4ade80" : "#f87171" }}>{tx.type}</td>
                <td className="p-4">{tx.amount}</td>
                <td className="p-4 font-mono">
                  {tx.token.substring(0, 6)}...{tx.token.substring(tx.token.length - 4)}
                </td>
                <td className="p-4">{tx.date}</td>
                <td className="p-4">
                  <span 
                    className={`px-2 py-1 rounded-full text-xs ${
                      tx.status === "Completed" 
                        ? "bg-green-400/10 text-green-400" 
                        : tx.status === "Pending" 
                          ? "bg-amber-400/10 text-amber-400" 
                          : "bg-red-400/10 text-red-400"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="p-4" style={{ color: tx.profit.startsWith("+") ? "#4ade80" : tx.profit === "0%" ? "#94a3b8" : "#f87171" }}>
                  {tx.profit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
