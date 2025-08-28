import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const countries = pgTable("countries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  security_level: text("security_level").notNull().default("medium"), // low, medium, high, critical
  travel_advisory: text("travel_advisory"),
  security_risks: jsonb("security_risks").$type<string[]>().default([]),
  health_risks: jsonb("health_risks").$type<string[]>().default([]),
  embassy_info: jsonb("embassy_info").$type<{
    address?: string;
    phone?: string;
    email?: string;
    emergency_phone?: string;
  }>().default({}),
  last_updated: timestamp("last_updated").defaultNow(),
});

export const trips = pgTable("trips", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  traveler_name: text("traveler_name").notNull(),
  traveler_email: text("traveler_email"),
  destination_country: text("destination_country").notNull(),
  destination_city: text("destination_city"),
  departure_date: text("departure_date").notNull(), // ISO date string
  return_date: text("return_date").notNull(), // ISO date string
  purpose: text("purpose"),
  status: text("status").notNull().default("planned"), // planned, in_progress, completed, cancelled
  accommodation: text("accommodation"),
  notes: text("notes"),
  emergency_contact: jsonb("emergency_contact").$type<{
    name?: string;
    phone?: string;
    relationship?: string;
  }>().default({}),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const news_alerts = pgTable("news_alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  country: text("country").notNull(),
  severity: text("severity").notNull().default("info"), // info, warning, critical
  source: text("source"),
  date: text("date").notNull(), // ISO date string
  is_active: boolean("is_active").default(true),
  created_at: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCountrySchema = createInsertSchema(countries).omit({
  id: true,
  last_updated: true,
});

export const insertTripSchema = createInsertSchema(trips).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertNewsAlertSchema = createInsertSchema(news_alerts).omit({
  id: true,
  created_at: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCountry = z.infer<typeof insertCountrySchema>;
export type Country = typeof countries.$inferSelect;

export type InsertTrip = z.infer<typeof insertTripSchema>;
export type Trip = typeof trips.$inferSelect;

export type InsertNewsAlert = z.infer<typeof insertNewsAlertSchema>;
export type NewsAlert = typeof news_alerts.$inferSelect;
