
import { Play, Pause, Settings, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BotCardProps {
  id: string;
  name: string;
  status: "active" | "paused" | "stopped";
  tokenAddress: string;
  profit: number;
  transactions: number;
  createdAt: string;
}

const BotCard = ({ id, name, status, tokenAddress, profit, transactions, createdAt }: BotCardProps) => {
  return (
    <div className="glass-morphism rounded-xl overflow-hidden card-glow card-glow-hover transition-all duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <div className="flex items-center mt-1">
              <div
                className={cn(
                  "w-2 h-2 rounded-full mr-2",
                  status === "active" ? "bg-green-400" : status === "paused" ? "bg-amber-400" : "bg-red-400"
                )}
              />
              <span className="text-xs text-muted-foreground capitalize">{status}</span>
            </div>
          </div>
          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            profit >= 0 ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400"
          )}>
            {profit >= 0 ? "+" : ""}{profit}%
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Token:</span>
            <span className="font-mono">{tokenAddress.substring(0, 6)}...{tokenAddress.substring(tokenAddress.length - 4)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Transactions:</span>
            <span>{transactions}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Created:</span>
            <span>{createdAt}</span>
          </div>
        </div>
        
        <div className="flex justify-between pt-3 border-t border-white/10">
          <div className="flex space-x-1">
            <button className="p-2 hover:bg-white/5 rounded-md transition-colors">
              {status === "active" ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button className="p-2 hover:bg-white/5 rounded-md transition-colors">
              <Settings size={16} />
            </button>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-md transition-colors text-red-400">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BotCard;
