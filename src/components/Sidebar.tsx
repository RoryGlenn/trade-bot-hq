
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, History, Settings, Bot, ChevronLeft, ChevronRight, Plus, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { name: "Transactions", path: "/dashboard/transactions", icon: History },
    { name: "Trading Bots", path: "/dashboard/bots", icon: Bot },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div
      className={cn(
        "min-h-screen bg-sidebar flex flex-col justify-between border-r border-border transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div>
        <div className="p-4 flex items-center justify-between">
          {!collapsed && <span className="text-xl font-bold text-purple">TradeBot HQ</span>}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-sidebar-accent transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <div className="px-3 py-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center p-3 rounded-md transition-all duration-200",
                    location.pathname === item.path
                      ? "bg-purple/20 text-purple"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon size={20} className={cn("shrink-0", collapsed ? "mx-auto" : "mr-3")} />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {!collapsed && (
          <div className="px-4 py-6">
            <Link
              to="/dashboard/bots/create"
              className="flex items-center justify-center w-full p-3 bg-purple hover:bg-purple-light text-white rounded-md transition-colors"
            >
              <Plus size={18} className="mr-2" />
              <span>Create New Bot</span>
            </Link>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border">
        <Link
          to="/"
          className={cn(
            "flex items-center p-3 rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
            collapsed ? "justify-center" : ""
          )}
        >
          <LogOut size={20} className={collapsed ? "" : "mr-3"} />
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
