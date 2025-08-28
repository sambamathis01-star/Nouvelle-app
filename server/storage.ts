import { 
  type User, 
  type InsertUser,
  type Country,
  type InsertCountry,
  type Trip,
  type InsertTrip,
  type NewsAlert,
  type InsertNewsAlert
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Countries
  getAllCountries(): Promise<Country[]>;
  getCountry(id: string): Promise<Country | undefined>;
  getCountryByName(name: string): Promise<Country | undefined>;
  createCountry(country: InsertCountry): Promise<Country>;
  updateCountry(id: string, country: Partial<InsertCountry>): Promise<Country | undefined>;
  deleteCountry(id: string): Promise<boolean>;
  
  // Trips
  getAllTrips(): Promise<Trip[]>;
  getTrip(id: string): Promise<Trip | undefined>;
  createTrip(trip: InsertTrip): Promise<Trip>;
  updateTrip(id: string, trip: Partial<InsertTrip>): Promise<Trip | undefined>;
  deleteTrip(id: string): Promise<boolean>;
  getTripsByStatus(status: string): Promise<Trip[]>;
  
  // News Alerts
  getAllNewsAlerts(): Promise<NewsAlert[]>;
  getNewsAlert(id: string): Promise<NewsAlert | undefined>;
  createNewsAlert(alert: InsertNewsAlert): Promise<NewsAlert>;
  updateNewsAlert(id: string, alert: Partial<InsertNewsAlert>): Promise<NewsAlert | undefined>;
  deleteNewsAlert(id: string): Promise<boolean>;
  getActiveNewsAlerts(): Promise<NewsAlert[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private countries: Map<string, Country>;
  private trips: Map<string, Trip>;
  private newsAlerts: Map<string, NewsAlert>;

  constructor() {
    this.users = new Map();
    this.countries = new Map();
    this.trips = new Map();
    this.newsAlerts = new Map();
    
    // Initialize with some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample countries with realistic data
    const sampleCountries: (Country)[] = [
      {
        id: "1",
        name: "France",
        security_level: "low",
        travel_advisory: "Destination très sûre. Aucune restriction particulière.",
        security_risks: [],
        health_risks: [],
        embassy_info: {
          address: "35 Rue du Faubourg Saint-Honoré, 75008 Paris",
          phone: "+33 1 43 17 53 53",
          email: "contact@ambafrance.org"
        },
        last_updated: new Date()
      },
      {
        id: "2", 
        name: "Allemagne",
        security_level: "low",
        travel_advisory: "Destination très sûre. Aucune restriction particulière.",
        security_risks: [],
        health_risks: [],
        embassy_info: {
          address: "13-15 Avenue Franklin D. Roosevelt, 75008 Paris",
          phone: "+33 1 53 83 45 00",
          email: "info@paris.diplo.de"
        },
        last_updated: new Date()
      },
      {
        id: "3",
        name: "Japon", 
        security_level: "medium",
        travel_advisory: "Destination généralement sûre. Vigilance normale recommandée.",
        security_risks: ["Risques sismiques"],
        health_risks: [],
        embassy_info: {
          address: "7 Avenue Hoche, 75008 Paris",
          phone: "+33 1 48 88 62 00",
          email: "consul@ps.mofa.go.jp"
        },
        last_updated: new Date()
      },
      {
        id: "4",
        name: "États-Unis",
        security_level: "medium", 
        travel_advisory: "Destination généralement sûre. Vigilance normale recommandée.",
        security_risks: ["Criminalité urbaine dans certaines zones"],
        health_risks: [],
        embassy_info: {
          address: "2 Avenue Gabriel, 75008 Paris",
          phone: "+33 1 43 12 22 22",
          email: "acsparis@state.gov"
        },
        last_updated: new Date()
      },
      {
        id: "5",
        name: "Syrie",
        security_level: "critical",
        travel_advisory: "Le ministère des Affaires étrangères déconseille formellement tout déplacement en Syrie en raison des risques terroristes, de l'instabilité politique et des conflits armés en cours.",
        security_risks: ["Risque terroriste très élevé", "Conflit armé généralisé", "Enlèvements et détentions arbitraires"],
        health_risks: ["Système de santé défaillant", "Risques d'épidémies"],
        embassy_info: {
          address: "Ambassade fermée temporairement",
          phone: "+33 1 53 59 23 00",
          email: "urgence@diplomatie.gouv.fr",
          emergency_phone: "+33 1 53 59 23 00"
        },
        last_updated: new Date()
      },
      {
        id: "6",
        name: "Myanmar",
        security_level: "high",
        travel_advisory: "Situation sécuritaire dégradée. Voyage déconseillé sauf raison impérieuse.",
        security_risks: ["Instabilité politique", "Couvre-feu nocturne"],
        health_risks: ["Accès limité aux soins médicaux"],
        embassy_info: {
          address: "60 Rue de Courcelles, 75008 Paris",
          phone: "+33 1 42 25 78 95",
          email: "info@ambmyanmar-paris.org"
        },
        last_updated: new Date()
      }
    ];

    sampleCountries.forEach(country => {
      this.countries.set(country.id, country);
    });

    // Sample trips
    const sampleTrips: Trip[] = [
      {
        id: "1",
        traveler_name: "Marie Dubois",
        traveler_email: "marie.dubois@entreprise.com",
        destination_country: "Japon",
        destination_city: "Tokyo",
        departure_date: "2025-01-05",
        return_date: "2025-01-15",
        purpose: "Mission commerciale",
        status: "in_progress",
        accommodation: "Hotel Nikko Tokyo",
        notes: null,
        emergency_contact: {
          name: "Jean Dubois",
          phone: "+33 6 12 34 56 78",
          relationship: "conjoint"
        },
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: "2", 
        traveler_name: "Pierre Martin",
        traveler_email: "pierre.martin@entreprise.com",
        destination_country: "Allemagne", 
        destination_city: "Berlin",
        departure_date: "2025-01-10",
        return_date: "2025-01-20", 
        purpose: "Formation technique",
        status: "in_progress",
        accommodation: "Hotel Adlon Kempinski",
        notes: null,
        emergency_contact: {
          name: "Claire Martin",
          phone: "+33 6 98 76 54 32", 
          relationship: "conjoint"
        },
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: "3",
        traveler_name: "Sophie Leclerc",
        traveler_email: "sophie.leclerc@entreprise.com", 
        destination_country: "États-Unis",
        destination_city: "New York",
        departure_date: "2025-01-25",
        return_date: "2025-01-30",
        purpose: "Conférence internationale",
        status: "planned",
        accommodation: "Marriott Times Square",
        notes: null,
        emergency_contact: {
          name: "Paul Leclerc",
          phone: "+33 6 45 67 89 12",
          relationship: "parent"
        },
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    sampleTrips.forEach(trip => {
      this.trips.set(trip.id, trip);
    });

    // Sample news alerts
    const sampleAlerts: NewsAlert[] = [
      {
        id: "1",
        title: "Situation sécuritaire dégradée dans plusieurs provinces",
        description: "Recrudescence des affrontements armés. Éviter tout déplacement non essentiel.",
        country: "Syrie", 
        severity: "critical",
        source: "France Diplomatie",
        date: "2025-01-12",
        is_active: true,
        created_at: new Date()
      },
      {
        id: "2",
        title: "Restrictions de circulation imposées dans certaines régions", 
        description: "Couvre-feu nocturne en vigueur. Vérifier les conditions locales avant tout déplacement.",
        country: "Myanmar",
        severity: "warning", 
        source: "UK Foreign Office",
        date: "2025-01-10",
        is_active: true,
        created_at: new Date()
      }
    ];

    sampleAlerts.forEach(alert => {
      this.newsAlerts.set(alert.id, alert);
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Countries  
  async getAllCountries(): Promise<Country[]> {
    return Array.from(this.countries.values());
  }

  async getCountry(id: string): Promise<Country | undefined> {
    return this.countries.get(id);
  }

  async getCountryByName(name: string): Promise<Country | undefined> {
    return Array.from(this.countries.values()).find(c => c.name === name);
  }

  async createCountry(insertCountry: InsertCountry): Promise<Country> {
    const id = randomUUID();
    const country: Country = { 
      ...insertCountry, 
      id, 
      last_updated: new Date() 
    };
    this.countries.set(id, country);
    return country;
  }

  async updateCountry(id: string, updateData: Partial<InsertCountry>): Promise<Country | undefined> {
    const existing = this.countries.get(id);
    if (!existing) return undefined;
    
    const updated: Country = { 
      ...existing, 
      ...updateData, 
      last_updated: new Date() 
    };
    this.countries.set(id, updated);
    return updated;
  }

  async deleteCountry(id: string): Promise<boolean> {
    return this.countries.delete(id);
  }

  // Trips
  async getAllTrips(): Promise<Trip[]> {
    return Array.from(this.trips.values());
  }

  async getTrip(id: string): Promise<Trip | undefined> {
    return this.trips.get(id);
  }

  async createTrip(insertTrip: InsertTrip): Promise<Trip> {
    const id = randomUUID();
    const trip: Trip = { 
      ...insertTrip, 
      id, 
      created_at: new Date(), 
      updated_at: new Date() 
    };
    this.trips.set(id, trip);
    return trip;
  }

  async updateTrip(id: string, updateData: Partial<InsertTrip>): Promise<Trip | undefined> {
    const existing = this.trips.get(id);
    if (!existing) return undefined;
    
    const updated: Trip = { 
      ...existing, 
      ...updateData, 
      updated_at: new Date() 
    };
    this.trips.set(id, updated);
    return updated;
  }

  async deleteTrip(id: string): Promise<boolean> {
    return this.trips.delete(id);
  }

  async getTripsByStatus(status: string): Promise<Trip[]> {
    return Array.from(this.trips.values()).filter(trip => trip.status === status);
  }

  // News Alerts
  async getAllNewsAlerts(): Promise<NewsAlert[]> {
    return Array.from(this.newsAlerts.values());
  }

  async getNewsAlert(id: string): Promise<NewsAlert | undefined> {
    return this.newsAlerts.get(id);
  }

  async createNewsAlert(insertAlert: InsertNewsAlert): Promise<NewsAlert> {
    const id = randomUUID();
    const alert: NewsAlert = { 
      ...insertAlert, 
      id, 
      created_at: new Date() 
    };
    this.newsAlerts.set(id, alert);
    return alert;
  }

  async updateNewsAlert(id: string, updateData: Partial<InsertNewsAlert>): Promise<NewsAlert | undefined> {
    const existing = this.newsAlerts.get(id);
    if (!existing) return undefined;
    
    const updated: NewsAlert = { 
      ...existing, 
      ...updateData 
    };
    this.newsAlerts.set(id, updated);
    return updated;
  }

  async deleteNewsAlert(id: string): Promise<boolean> {
    return this.newsAlerts.delete(id);
  }

  async getActiveNewsAlerts(): Promise<NewsAlert[]> {
    return Array.from(this.newsAlerts.values()).filter(alert => alert.is_active);
  }
}

export const storage = new MemStorage();
