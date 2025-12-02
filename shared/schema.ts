import { z } from "zod";

export const telemetrySchema = z.object({
  id: z.string(),
  deviceId: z.string(),
  value: z.number(),
  timestamp: z.string(),
});

export const insertTelemetrySchema = telemetrySchema.omit({ id: true, timestamp: true });

export const deviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(["active", "inactive", "warning"]),
  lastReading: z.number().nullable(),
  lastSeen: z.string().nullable(),
});

export type Telemetry = z.infer<typeof telemetrySchema>;
export type InsertTelemetry = z.infer<typeof insertTelemetrySchema>;
export type Device = z.infer<typeof deviceSchema>;
