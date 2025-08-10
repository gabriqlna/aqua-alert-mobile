import { type Neighborhood, type Alert, type InsertNeighborhood, type UpdateNeighborhood, type InsertAlert } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Neighborhoods
  getNeighborhoods(): Promise<Neighborhood[]>;
  getNeighborhood(id: string): Promise<Neighborhood | undefined>;
  createNeighborhood(neighborhood: InsertNeighborhood): Promise<Neighborhood>;
  updateNeighborhoodStatus(id: string, update: UpdateNeighborhood): Promise<Neighborhood | undefined>;
  
  // Alerts
  getAlerts(): Promise<Alert[]>;
  getRecentAlerts(limit: number): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
}

export class MemStorage implements IStorage {
  private neighborhoods: Map<string, Neighborhood>;
  private alerts: Map<string, Alert>;

  constructor() {
    this.neighborhoods = new Map();
    this.alerts = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Initialize neighborhoods with Nova Cruz districts
    const initialNeighborhoods: Omit<Neighborhood, 'id'>[] = [
      { name: 'Centro', status: 'AVAILABLE' },
      { name: 'Bairro Norte', status: 'UNAVAILABLE' },
      { name: 'Bairro Sul', status: 'MAINTENANCE' },
      { name: 'Zona Rural', status: 'AVAILABLE' }
    ];

    initialNeighborhoods.forEach(neighborhood => {
      const id = randomUUID();
      this.neighborhoods.set(id, { ...neighborhood, id });
    });

    // Initialize some sample alerts
    const now = new Date();
    const alerts: Omit<Alert, 'id'>[] = [
      {
        message: 'Falta de água no Bairro Norte há 3 dias',
        neighborhoodId: Array.from(this.neighborhoods.values()).find(n => n.name === 'Bairro Norte')?.id || null,
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000)
      },
      {
        message: 'Manutenção programada no Bairro Sul',
        neighborhoodId: Array.from(this.neighborhoods.values()).find(n => n.name === 'Bairro Sul')?.id || null,
        timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000)
      },
      {
        message: 'Pressão baixa relatada no Centro',
        neighborhoodId: Array.from(this.neighborhoods.values()).find(n => n.name === 'Centro')?.id || null,
        timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000)
      }
    ];

    alerts.forEach(alert => {
      const id = randomUUID();
      this.alerts.set(id, { ...alert, id });
    });
  }

  async getNeighborhoods(): Promise<Neighborhood[]> {
    return Array.from(this.neighborhoods.values());
  }

  async getNeighborhood(id: string): Promise<Neighborhood | undefined> {
    return this.neighborhoods.get(id);
  }

  async createNeighborhood(insertNeighborhood: InsertNeighborhood): Promise<Neighborhood> {
    const id = randomUUID();
    const neighborhood: Neighborhood = { ...insertNeighborhood, id };
    this.neighborhoods.set(id, neighborhood);
    return neighborhood;
  }

  async updateNeighborhoodStatus(id: string, update: UpdateNeighborhood): Promise<Neighborhood | undefined> {
    const neighborhood = this.neighborhoods.get(id);
    if (!neighborhood) return undefined;

    const updated = { ...neighborhood, ...update };
    this.neighborhoods.set(id, updated);
    return updated;
  }

  async getAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async getRecentAlerts(limit: number): Promise<Alert[]> {
    const alerts = await this.getAlerts();
    return alerts.slice(0, limit);
  }

  async createAlert(insertAlert: InsertAlert): Promise<Alert> {
    const id = randomUUID();
    const alert: Alert = { 
      ...insertAlert, 
      id, 
      timestamp: new Date(),
      neighborhoodId: insertAlert.neighborhoodId || null
    };
    this.alerts.set(id, alert);
    return alert;
  }
}

export const storage = new MemStorage();
