import React from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardHeader from "@/components/DashboardHeader";
import GlassCard from "@/components/GlassCard";
import DeviceTable from "@/components/DeviceTable";
import DeviceSummaryCard from "@/components/DeviceSummaryCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { Device } from "@shared/schema";

export default function Devices() {
  const { data: devices = [], isLoading, refetch } = useQuery<Device[]>({
    queryKey: ["/api/devices"],
  });

  const deviceStats = {
    total: devices.length,
    active: devices.filter((d) => d.status === "active").length,
    inactive: devices.filter((d) => d.status === "inactive").length,
    warning: devices.filter((d) => d.status === "warning").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-950 via-teal-900 to-green-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/25 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500/15 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader onRefresh={refetch} isRefreshing={isLoading} />
        <h2 className="text-xl font-semibold text-white mb-4">Devices</h2>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="registry">Registry</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <DeviceSummaryCard
                totalDevices={deviceStats.total}
                activeDevices={deviceStats.active}
                inactiveDevices={deviceStats.inactive}
                warningDevices={deviceStats.warning}
              />
              <GlassCard>
                <div className="p-4">Quick actions</div>
              </GlassCard>
              <GlassCard>
                <div className="p-4">Recent activity</div>
              </GlassCard>
            </div>
          </TabsContent>

          <TabsContent value="registry">
            <div className="mt-6">
              <DeviceTable devices={devices} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
