import GlassCard from "./GlassCard";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Wifi, WifiOff, AlertTriangle, Server } from "lucide-react";

interface Device {
  id: string;
  name: string;
  status: "active" | "inactive" | "warning";
  lastReading: number | null;
  lastSeen: string | null;
}

interface DeviceTableProps {
  devices: Device[];
}

const statusConfig = {
  active: {
    icon: Wifi,
    label: "Active",
    className: "bg-green-400/20 text-green-400 border-green-400/30",
  },
  inactive: {
    icon: WifiOff,
    label: "Inactive",
    className: "bg-gray-400/20 text-gray-400 border-gray-400/30",
  },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    className: "bg-amber-400/20 text-amber-400 border-amber-400/30",
  },
};

export default function DeviceTable({ devices }: DeviceTableProps) {
  const formatTime = (timestamp: string | null) => {
    if (!timestamp) return "Never";
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Server className="w-5 h-5 text-violet-400" />
        <h2 className="text-xl font-semibold text-white">Device Registry</h2>
      </div>
      <div className="rounded-lg overflow-hidden border border-white/10">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white/70 font-medium">
                Device ID
              </TableHead>
              <TableHead className="text-white/70 font-medium">Name</TableHead>
              <TableHead className="text-white/70 font-medium">
                Status
              </TableHead>
              <TableHead className="text-white/70 font-medium text-right">
                Last Reading
              </TableHead>
              <TableHead className="text-white/70 font-medium text-right">
                Last Seen
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.map((device) => {
              const status = statusConfig[device.status];
              const StatusIcon = status.icon;
              return (
                <TableRow
                  key={device.id}
                  className="border-white/10 hover:bg-white/5"
                  data-testid={`row-device-${device.id}`}
                >
                  <TableCell className="font-mono text-white/80">
                    {device.id}
                  </TableCell>
                  <TableCell className="text-white">{device.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={status.className}
                    >
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-white/80 font-mono">
                    {device.lastReading !== null
                      ? device.lastReading.toFixed(2)
                      : "—"}
                  </TableCell>
                  <TableCell className="text-right text-white/60">
                    {formatTime(device.lastSeen)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </GlassCard>
  );
}
