
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
  change?: {
    value: string | number;
    positive: boolean;
  };
}

const StatCard = ({ title, value, icon, className, change }: StatCardProps) => {
  return (
    <div className={cn("glass-morphism p-6 rounded-xl card-glow card-glow-hover", className)}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm text-muted-foreground font-medium">{title}</h3>
        {icon && <div className="text-purple">{icon}</div>}
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{value}</span>
        {change && (
          <span className={cn("text-xs mt-1", change.positive ? "text-green-400" : "text-red-400")}>
            {change.positive ? "+" : "-"}{change.value}
            {change.positive ? " ↑" : " ↓"}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
