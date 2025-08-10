import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const waterStatusEnum = z.enum(['AVAILABLE', 'UNAVAILABLE', 'MAINTENANCE']);

export const neighborhoods = pgTable("neighborhoods", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  status: text("status").notNull(), // AVAILABLE, UNAVAILABLE, MAINTENANCE
});

export const alerts = pgTable("alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  message: text("message").notNull(),
  neighborhoodId: varchar("neighborhood_id").references(() => neighborhoods.id),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertNeighborhoodSchema = createInsertSchema(neighborhoods).pick({
  name: true,
  status: true,
});

export const updateNeighborhoodSchema = createInsertSchema(neighborhoods).pick({
  status: true,
});

export const insertAlertSchema = createInsertSchema(alerts).pick({
  message: true,
  neighborhoodId: true,
});

export type InsertNeighborhood = z.infer<typeof insertNeighborhoodSchema>;
export type UpdateNeighborhood = z.infer<typeof updateNeighborhoodSchema>;
export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type Neighborhood = typeof neighborhoods.$inferSelect;
export type Alert = typeof alerts.$inferSelect;
export type WaterStatus = z.infer<typeof waterStatusEnum>;
