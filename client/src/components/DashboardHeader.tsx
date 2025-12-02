import { Activity, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function DashboardHeader({
  onRefresh,
  isRefreshing = false,
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
          <Activity className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            IoT Dashboard
          </h1>
          <p className="text-white/60 text-sm">
            Real-time device monitoring & telemetry
          </p>
        </div>
      </div>
      <Button
        variant="pop"
        onClick={onRefresh}
        disabled={isRefreshing}
        data-testid="button-refresh"
        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        <RefreshCw
          className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
        />
        Refresh
      </Button>
    </header>
  );
}
