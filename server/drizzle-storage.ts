import { eq, and } from "drizzle-orm";
import { db } from "./database";
import { 
  users, 
  countries, 
  trips, 
  news_alerts,
  type User, 
  type InsertUser,
  type Country,
  type InsertCountry,
  type Trip,
  type InsertTrip,
  type NewsAlert,
  type InsertNewsAlert
} from "@shared/schema";
import type { IStorage } from "./storage";

export class DrizzleStorage implements IStorage {
  
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Countries  
  async getAllCountries(): Promise<Country[]> {
    return await db.select().from(countries).orderBy(countries.name);
  }

  async getCountry(id: string): Promise<Country | undefined> {
    const result = await db.select().from(countries).where(eq(countries.id, id)).limit(1);
    return result[0];
  }

  async getCountryByName(name: string): Promise<Country | undefined> {
    const result = await db.select().from(countries).where(eq(countries.name, name)).limit(1);
    return result[0];
  }

  async createCountry(insertCountry: InsertCountry): Promise<Country> {
    const result = await db.insert(countries).values({
      ...insertCountry,
      last_updated: new Date()
    }).returning();
    return result[0];
  }

  async updateCountry(id: string, updateData: Partial<InsertCountry>): Promise<Country | undefined> {
    const result = await db.update(countries)
      .set({ ...updateData, last_updated: new Date() })
      .where(eq(countries.id, id))
      .returning();
    return result[0];
  }

  async deleteCountry(id: string): Promise<boolean> {
    const result = await db.delete(countries).where(eq(countries.id, id)).returning();
    return result.length > 0;
  }

  // Trips
  async getAllTrips(): Promise<Trip[]> {
    return await db.select().from(trips).orderBy(trips.created_at);
  }

  async getTrip(id: string): Promise<Trip | undefined> {
    const result = await db.select().from(trips).where(eq(trips.id, id)).limit(1);
    return result[0];
  }

  async createTrip(insertTrip: InsertTrip): Promise<Trip> {
    const now = new Date();
    const result = await db.insert(trips).values({
      ...insertTrip,
      created_at: now,
      updated_at: now
    }).returning();
    return result[0];
  }

  async updateTrip(id: string, updateData: Partial<InsertTrip>): Promise<Trip | undefined> {
    const result = await db.update(trips)
      .set({ ...updateData, updated_at: new Date() })
      .where(eq(trips.id, id))
      .returning();
    return result[0];
  }

  async deleteTrip(id: string): Promise<boolean> {
    const result = await db.delete(trips).where(eq(trips.id, id)).returning();
    return result.length > 0;
  }

  async getTripsByStatus(status: string): Promise<Trip[]> {
    return await db.select().from(trips)
      .where(eq(trips.status, status))
      .orderBy(trips.created_at);
  }

  // News Alerts
  async getAllNewsAlerts(): Promise<NewsAlert[]> {
    return await db.select().from(news_alerts).orderBy(news_alerts.created_at);
  }

  async getNewsAlert(id: string): Promise<NewsAlert | undefined> {
    const result = await db.select().from(news_alerts).where(eq(news_alerts.id, id)).limit(1);
    return result[0];
  }

  async createNewsAlert(insertAlert: InsertNewsAlert): Promise<NewsAlert> {
    const result = await db.insert(news_alerts).values({
      ...insertAlert,
      created_at: new Date()
    }).returning();
    return result[0];
  }

  async updateNewsAlert(id: string, updateData: Partial<InsertNewsAlert>): Promise<NewsAlert | undefined> {
    const result = await db.update(news_alerts)
      .set(updateData)
      .where(eq(news_alerts.id, id))
      .returning();
    return result[0];
  }

  async deleteNewsAlert(id: string): Promise<boolean> {
    const result = await db.delete(news_alerts).where(eq(news_alerts.id, id)).returning();
    return result.length > 0;
  }

  async getActiveNewsAlerts(): Promise<NewsAlert[]> {
    return await db.select().from(news_alerts)
      .where(eq(news_alerts.is_active, true))
      .orderBy(news_alerts.created_at);
  }
}
