import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GlassCard from "./GlassCard";
import { Send, Loader2 } from "lucide-react";

interface SendTelemetryFormProps {
  onSubmit?: (deviceId: string, value: number) => void;
  isLoading?: boolean;
  devices?: { id: string; name: string }[];
}

export default function SendTelemetryForm({
  onSubmit,
  isLoading = false,
  devices = [],
}: SendTelemetryFormProps) {
  const [deviceId, setDeviceId] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deviceId && value) {
      onSubmit?.(deviceId, parseFloat(value));
      setValue("");
    }
  };

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <h2 className="text-xl font-semibold text-white">Send Telemetry</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="device" className="text-white/80 font-medium">
            Device ID
          </Label>
          <Select value={deviceId} onValueChange={setDeviceId}>
            <SelectTrigger
              data-testid="select-device"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            >
              <SelectValue placeholder="Select a device" />
            </SelectTrigger>
            <SelectContent>
              {devices.map((device) => (
                <SelectItem key={device.id} value={device.id}>
                  {device.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="value" className="text-white/80 font-medium">
            Telemetry Value
          </Label>
          <Input
            id="value"
            type="number"
            step="0.01"
            placeholder="Enter value (e.g., 23.5)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            data-testid="input-telemetry-value"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
        <Button
          type="submit"
          disabled={!deviceId || !value || isLoading}
          data-testid="button-send-telemetry"
          className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white border-0 shadow-lg shadow-violet-500/25"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Send className="w-4 h-4 mr-2" />
          )}
          {isLoading ? "Sending..." : "Send Telemetry"}
        </Button>
      </form>
    </GlassCard>
  );
}
