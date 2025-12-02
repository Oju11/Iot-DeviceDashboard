import { useState } from "react";
import DashboardHeader from "../DashboardHeader";

export default function DashboardHeaderExample() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    console.log("Refreshing dashboard...");
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="min-h-[120px] bg-gradient-to-br from-violet-600 to-slate-900 p-8 rounded-lg">
      <DashboardHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />
    </div>
  );
}
