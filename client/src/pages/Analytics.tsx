import React from "react";
import DashboardHeader from "@/components/DashboardHeader";
import GlassCard from "@/components/GlassCard";

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-teal-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/25 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader />
        <h2 className="text-xl font-semibold text-white mb-4">Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlassCard>
            <div className="p-4">Metric A</div>
          </GlassCard>
          <GlassCard>
            <div className="p-4">Metric B</div>
          </GlassCard>
          <GlassCard>
            <div className="p-4">Metric C</div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
