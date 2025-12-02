import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTelemetrySchema } from "@shared/schema";

const sseClients: Set<Response> = new Set();

function broadcastTelemetry(data: unknown) {
  const message = `data: ${JSON.stringify(data)}\n\n`;
  sseClients.forEach((client) => {
    client.write(message);
  });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/devices", async (_req: Request, res: Response) => {
    try {
      const devices = await storage.getDevices();
      res.json(devices);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch devices" });
    }
  });

  app.post("/api/simulate", async (req: Request, res: Response) => {
    try {
      const parsed = insertTelemetrySchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid telemetry data", details: parsed.error.issues });
      }

      const telemetry = await storage.addTelemetry(parsed.data);
      
      broadcastTelemetry({
        type: "telemetry",
        data: telemetry,
      });

      res.status(201).json(telemetry);
    } catch (error) {
      res.status(500).json({ error: "Failed to simulate telemetry" });
    }
  });

  app.get("/api/telemetry/stream", async (req: Request, res: Response) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.flushHeaders();

    const existingTelemetry = await storage.getTelemetry();
    res.write(`data: ${JSON.stringify({ type: "init", data: existingTelemetry })}\n\n`);

    sseClients.add(res);

    const heartbeat = setInterval(() => {
      res.write(`:heartbeat\n\n`);
    }, 30000);

    req.on("close", () => {
      clearInterval(heartbeat);
      sseClients.delete(res);
    });
  });

  app.get("/api/telemetry", async (_req: Request, res: Response) => {
    try {
      const telemetry = await storage.getTelemetry();
      res.json(telemetry);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch telemetry" });
    }
  });

  return httpServer;
}
