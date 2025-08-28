import { apiRequest } from "./queryClient";
import type { Country, Trip, NewsAlert, InsertCountry, InsertTrip, InsertNewsAlert } from "@shared/schema";

// Countries API
export const countriesApi = {
  getAll: async (): Promise<Country[]> => {
    const response = await apiRequest("GET", "/api/countries");
    return response.json();
  },
  
  getById: async (id: string): Promise<Country> => {
    const response = await apiRequest("GET", `/api/countries/${id}`);
    return response.json();
  },
  
  create: async (country: InsertCountry): Promise<Country> => {
    const response = await apiRequest("POST", "/api/countries", country);
    return response.json();
  },
  
  update: async (id: string, country: Partial<InsertCountry>): Promise<Country> => {
    const response = await apiRequest("PUT", `/api/countries/${id}`, country);
    return response.json();
  },
  
  delete: async (id: string): Promise<{ success: boolean }> => {
    const response = await apiRequest("DELETE", `/api/countries/${id}`);
    return response.json();
  }
};

// Trips API
export const tripsApi = {
  getAll: async (status?: string): Promise<Trip[]> => {
    const url = status ? `/api/trips?status=${status}` : "/api/trips";
    const response = await apiRequest("GET", url);
    return response.json();
  },
  
  getById: async (id: string): Promise<Trip> => {
    const response = await apiRequest("GET", `/api/trips/${id}`);
    return response.json();
  },
  
  create: async (trip: InsertTrip): Promise<Trip> => {
    const response = await apiRequest("POST", "/api/trips", trip);
    return response.json();
  },
  
  update: async (id: string, trip: Partial<InsertTrip>): Promise<Trip> => {
    const response = await apiRequest("PUT", `/api/trips/${id}`, trip);
    return response.json();
  },
  
  delete: async (id: string): Promise<{ success: boolean }> => {
    const response = await apiRequest("DELETE", `/api/trips/${id}`);
    return response.json();
  }
};

// News Alerts API  
export const alertsApi = {
  getAll: async (activeOnly?: boolean): Promise<NewsAlert[]> => {
    const url = activeOnly ? "/api/alerts?active=true" : "/api/alerts";
    const response = await apiRequest("GET", url);
    return response.json();
  },
  
  getById: async (id: string): Promise<NewsAlert> => {
    const response = await apiRequest("GET", `/api/alerts/${id}`);
    return response.json();
  },
  
  create: async (alert: InsertNewsAlert): Promise<NewsAlert> => {
    const response = await apiRequest("POST", "/api/alerts", alert);
    return response.json();
  },
  
  update: async (id: string, alert: Partial<InsertNewsAlert>): Promise<NewsAlert> => {
    const response = await apiRequest("PUT", `/api/alerts/${id}`, alert);
    return response.json();
  },
  
  delete: async (id: string): Promise<{ success: boolean }> => {
    const response = await apiRequest("DELETE", `/api/alerts/${id}`);
    return response.json();
  }
};

// Dashboard API
export const dashboardApi = {
  getStats: async (): Promise<{
    activeTrips: number;
    upcomingTrips: number;
    criticalAlerts: number;
    highRiskCountries: number;
  }> => {
    const response = await apiRequest("GET", "/api/dashboard/stats");
    return response.json();
  }
};
