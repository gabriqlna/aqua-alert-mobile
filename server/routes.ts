import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAlertSchema, updateNeighborhoodSchema, waterStatusEnum } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all neighborhoods
  app.get("/api/neighborhoods", async (req, res) => {
    try {
      const neighborhoods = await storage.getNeighborhoods();
      res.json(neighborhoods);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch neighborhoods" });
    }
  });

  // Update neighborhood status
  app.patch("/api/neighborhoods/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = updateNeighborhoodSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid request data",
          errors: result.error.errors 
        });
      }

      // Validate status enum
      if (!waterStatusEnum.safeParse(result.data.status).success) {
        return res.status(400).json({
          message: "Invalid water status"
        });
      }

      const neighborhood = await storage.updateNeighborhoodStatus(id, result.data);
      
      if (!neighborhood) {
        return res.status(404).json({ message: "Neighborhood not found" });
      }

      res.json(neighborhood);
    } catch (error) {
      res.status(500).json({ message: "Failed to update neighborhood" });
    }
  });

  // Get recent alerts
  app.get("/api/alerts", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const alerts = await storage.getRecentAlerts(limit);
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch alerts" });
    }
  });

  // Create new alert (report)
  app.post("/api/alerts", async (req, res) => {
    try {
      const result = insertAlertSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid request data",
          errors: result.error.errors 
        });
      }

      // Validate neighborhood exists
      if (result.data.neighborhoodId) {
        const neighborhood = await storage.getNeighborhood(result.data.neighborhoodId);
        if (!neighborhood) {
          return res.status(400).json({ message: "Invalid neighborhood" });
        }
      }

      const alert = await storage.createAlert(result.data);
      res.status(201).json(alert);
    } catch (error) {
      res.status(500).json({ message: "Failed to create alert" });
    }
  });

  // Get city status based on neighborhoods
  app.get("/api/city-status", async (req, res) => {
    try {
      const neighborhoods = await storage.getNeighborhoods();
      
      let cityStatus = 'AVAILABLE';
      let statusText = 'Água disponível';
      
      // If any neighborhood is unavailable, city is unavailable
      if (neighborhoods.some(n => n.status === 'UNAVAILABLE')) {
        cityStatus = 'UNAVAILABLE';
        statusText = 'Sem água';
      }
      // If none unavailable but some in maintenance, city is in maintenance
      else if (neighborhoods.some(n => n.status === 'MAINTENANCE')) {
        cityStatus = 'MAINTENANCE';
        statusText = 'Manutenção programada';
      }

      res.json({
        status: cityStatus,
        text: statusText,
        color: cityStatus === 'AVAILABLE' ? 'water-available' : 
               cityStatus === 'UNAVAILABLE' ? 'water-unavailable' : 'water-maintenance'
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch city status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
