import DeviceTable from "../DeviceTable";

export default function DeviceTableExample() {
  // todo: remove mock functionality
  const mockDevices = [
    {
      id: "sensor-001",
      name: "Temperature Sensor 001",
      status: "active" as const,
      lastReading: 23.45,
      lastSeen: new Date().toISOString(),
    },
    {
      id: "sensor-002",
      name: "Humidity Sensor 002",
      status: "active" as const,
      lastReading: 65.2,
      lastSeen: new Date(Date.now() - 60000).toISOString(),
    },
    {
      id: "sensor-003",
      name: "Pressure Sensor 003",
      status: "warning" as const,
      lastReading: 1013.25,
      lastSeen: new Date(Date.now() - 300000).toISOString(),
    },
    {
      id: "sensor-004",
      name: "Motion Detector 004",
      status: "inactive" as const,
      lastReading: null,
      lastSeen: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "sensor-005",
      name: "Light Sensor 005",
      status: "active" as const,
      lastReading: 450.0,
      lastSeen: new Date().toISOString(),
    },
  ];

  return (
    <div className="min-h-[400px] bg-gradient-to-br from-violet-600 to-slate-900 p-8 rounded-lg">
      <DeviceTable devices={mockDevices} />
    </div>
  );
}
