import { useState } from "react";
import SendTelemetryForm from "../SendTelemetryForm";

export default function SendTelemetryFormExample() {
  const [isLoading, setIsLoading] = useState(false);

  // todo: remove mock functionality
  const mockDevices = [
    { id: "sensor-001", name: "Temperature Sensor 001" },
    { id: "sensor-002", name: "Humidity Sensor 002" },
    { id: "sensor-003", name: "Pressure Sensor 003" },
    { id: "sensor-004", name: "Motion Detector 004" },
  ];

  const handleSubmit = (deviceId: string, value: number) => {
    console.log("Telemetry submitted:", { deviceId, value });
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-[350px] bg-gradient-to-br from-violet-600 to-slate-900 p-8 rounded-lg">
      <SendTelemetryForm
        devices={mockDevices}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
