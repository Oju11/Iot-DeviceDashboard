import { type Telemetry, type InsertTelemetry, type Device } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getTelemetry(): Promise<Telemetry[]>;
  addTelemetry(data: InsertTelemetry): Promise<Telemetry>;
  getDevices(): Promise<Device[]>;
  getDevice(id: string): Promise<Device | undefined>;
  updateDevice(id: string, updates: Partial<Device>): Promise<Device | undefined>;
}

export class MemStorage implements IStorage {
  private telemetry: Telemetry[] = [];
  private devices: Map<string, Device>;
  private readonly maxTelemetryPoints = 100;

  constructor() {
    this.devices = new Map();
    
    const initialDevices: Device[] = [
      { id: "sensor-001", name: "Temperature Sensor 001", status: "active", lastReading: 23.45, lastSeen: new Date().toISOString() },
      { id: "sensor-002", name: "Humidity Sensor 002", status: "active", lastReading: 65.2, lastSeen: new Date().toISOString() },
      { id: "sensor-003", name: "Pressure Sensor 003", status: "warning", lastReading: 1013.25, lastSeen: new Date().toISOString() },
      { id: "sensor-004", name: "Motion Detector 004", status: "inactive", lastReading: null, lastSeen: null },
      { id: "sensor-005", name: "Light Sensor 005", status: "active", lastReading: 450.0, lastSeen: new Date().toISOString() },
      { id: "sensor-006", name: "CO2 Sensor 006", status: "active", lastReading: 412.5, lastSeen: new Date().toISOString() },
    ];
    
    initialDevices.forEach(device => this.devices.set(device.id, device));
  }

  async getTelemetry(): Promise<Telemetry[]> {
    return [...this.telemetry];
  }

  async addTelemetry(data: InsertTelemetry): Promise<Telemetry> {
    const telemetry: Telemetry = {
      id: randomUUID(),
      deviceId: data.deviceId,
      value: data.value,
      timestamp: new Date().toISOString(),
    };
    
    this.telemetry.push(telemetry);
    
    if (this.telemetry.length > this.maxTelemetryPoints) {
      this.telemetry = this.telemetry.slice(-this.maxTelemetryPoints);
    }
    
    const device = this.devices.get(data.deviceId);
    if (device) {
      device.lastReading = data.value;
      device.lastSeen = telemetry.timestamp;
      device.status = "active";
    }
    
    return telemetry;
  }

  async getDevices(): Promise<Device[]> {
    return Array.from(this.devices.values());
  }

  async getDevice(id: string): Promise<Device | undefined> {
    return this.devices.get(id);
  }

  async updateDevice(id: string, updates: Partial<Device>): Promise<Device | undefined> {
    const device = this.devices.get(id);
    if (!device) return undefined;
    
    Object.assign(device, updates);
    return device;
  }
}

export const storage = new MemStorage();
