import DeviceSummaryCard from "../DeviceSummaryCard";

export default function DeviceSummaryCardExample() {
  // todo: remove mock functionality
  return (
    <div className="min-h-[250px] bg-gradient-to-br from-violet-600 to-slate-900 p-8 rounded-lg">
      <DeviceSummaryCard
        totalDevices={24}
        activeDevices={18}
        inactiveDevices={4}
        warningDevices={2}
      />
    </div>
  );
}
