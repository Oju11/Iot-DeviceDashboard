import { useState, useEffect } from "react";
import LiveTelemetryChart from "../LiveTelemetryChart";

export default function LiveTelemetryChartExample() {
  // todo: remove mock functionality
  const [data, setData] = useState(() => generateInitialData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newPoint = {
          timestamp: new Date().toISOString(),
          value: Math.random() * 50 + 20,
          deviceId: "sensor-001",
        };
        return [...prev.slice(-19), newPoint];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[420px] bg-gradient-to-br from-violet-600 to-slate-900 p-8 rounded-lg">
      <LiveTelemetryChart data={data} title="Temperature Readings" />
    </div>
  );
}

function generateInitialData() {
  const data = [];
  const now = Date.now();
  for (let i = 19; i >= 0; i--) {
    data.push({
      timestamp: new Date(now - i * 2000).toISOString(),
      value: Math.random() * 50 + 20,
      deviceId: "sensor-001",
    });
  }
  return data;
}
