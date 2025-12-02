import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/DashboardHeader";
import SendTelemetryForm from "@/components/SendTelemetryForm";
import DeviceSummaryCard from "@/components/DeviceSummaryCard";
import LiveTelemetryChart from "@/components/LiveTelemetryChart";
import DeviceTable from "@/components/DeviceTable";
import type { Device, Telemetry } from "@shared/schema";

export default function Dashboard() {
  const { toast } = useToast();
  const [telemetryData, setTelemetryData] = useState<Telemetry[]>([]);

  const { data: devices = [], isLoading: devicesLoading, refetch: refetchDevices } = useQuery<Device[]>({
    queryKey: ["/api/devices"],
  });

  useEffect(() => {
    const eventSource = new EventSource("/api/telemetry/stream");

    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        
        if (parsed.type === "init") {
          setTelemetryData(parsed.data);
        } else if (parsed.type === "telemetry") {
          setTelemetryData((prev) => {
            const updated = [...prev, parsed.data];
            return updated.slice(-100);
          });
          queryClient.invalidateQueries({ queryKey: ["/api/devices"] });
        }
      } catch (error) {
        console.error("Failed to parse SSE message:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const simulateMutation = useMutation({
    mutationFn: async (data: { deviceId: string; value: number }) => {
      const response = await apiRequest("POST", "/api/simulate", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Telemetry sent",
        description: "Data point has been recorded successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send telemetry data.",
        variant: "destructive",
      });
    },
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetchDevices();
    setIsRefreshing(false);
  }, [refetchDevices]);

  const handleSendTelemetry = useCallback(
    (deviceId: string, value: number) => {
      simulateMutation.mutate({ deviceId, value });
    },
    [simulateMutation]
  );

  const deviceStats = {
    total: devices.length,
    active: devices.filter((d) => d.status === "active").length,
    inactive: devices.filter((d) => d.status === "inactive").length,
    warning: devices.filter((d) => d.status === "warning").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-900 to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/25 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader onRefresh={handleRefresh} isRefreshing={isRefreshing || devicesLoading} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SendTelemetryForm
            devices={devices.map((d) => ({ id: d.id, name: d.name }))}
            onSubmit={handleSendTelemetry}
            isLoading={simulateMutation.isPending}
          />
          <DeviceSummaryCard
            totalDevices={deviceStats.total}
            activeDevices={deviceStats.active}
            inactiveDevices={deviceStats.inactive}
            warningDevices={deviceStats.warning}
          />
        </div>
        <div className="mb-6">
          <LiveTelemetryChart
            data={telemetryData.slice(-20).map((t) => ({
              timestamp: t.timestamp,
              value: t.value,
              deviceId: t.deviceId,
            }))}
            title="Live Telemetry Stream"
          />
        </div>
        <DeviceTable devices={devices} />
      </div>
    </div>
  );
}
