import GlassCard from "./GlassCard";
import { Activity, Wifi, WifiOff, AlertTriangle } from "lucide-react";

interface DeviceSummaryCardProps {
  totalDevices: number;
  activeDevices: number;
  inactiveDevices: number;
  warningDevices: number;
}

export default function DeviceSummaryCard({
  totalDevices,
  activeDevices,
  inactiveDevices,
  warningDevices,
}: DeviceSummaryCardProps) {
  const stats = [
    {
      label: "Total Devices",
      value: totalDevices,
      icon: Activity,
      color: "text-violet-400",
      bgColor: "bg-violet-400/20",
    },
    {
      label: "Active",
      value: activeDevices,
      icon: Wifi,
      color: "text-green-400",
      bgColor: "bg-green-400/20",
    },
    {
      label: "Inactive",
      value: inactiveDevices,
      icon: WifiOff,
      color: "text-gray-400",
      bgColor: "bg-gray-400/20",
    },
    {
      label: "Warning",
      value: warningDevices,
      icon: AlertTriangle,
      color: "text-amber-400",
      bgColor: "bg-amber-400/20",
    },
  ];

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 bg-violet-400 rounded-full" />
        <h2 className="text-xl font-semibold text-white">Device Summary</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
            data-testid={`stat-${stat.label.toLowerCase().replace(" ", "-")}`}
          >
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/60">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
