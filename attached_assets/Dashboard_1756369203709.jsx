import React, { useState, useEffect } from "react";
import ActiveTripsCard from "./ActiveTripsCard.jsx";
import SecurityAlertsCard from "./SecurityAlertsCard.jsx";
import StatsOverview from "./StatsOverview.jsx";
import { mockTripsData, mockAlertsData, mockCountriesData } from "../../data/mockData.js";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simuler un appel API avec un délai réaliste
        await new Promise(resolve => setTimeout(resolve, 800));

        // En production, remplacer par de vrais appels API :
        // const [tripsResponse, alertsResponse, countriesResponse] = await Promise.all([
        //   fetch('/api/trips').then(r => r.json()),
        //   fetch('/api/alerts').then(r => r.json()),
        //   fetch('/api/countries').then(r => r.json())
        // ]);

        setTrips(mockTripsData);
        setAlerts(mockAlertsData);
        setCountries(mockCountriesData);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Impossible de charger les données du tableau de bord');
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Calculs dérivés pour les statistiques
  const activeTrips = trips.filter(trip => trip.status === "in_progress");
  const upcomingTrips = trips.filter(trip => trip.status === "planned");
  const criticalAlerts = alerts.filter(alert => alert.severity === "critical" && alert.is_active);
  const highRiskCountries = countries.filter(country => 
    country.security_level === "high" || country.security_level === "critical"
  );

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <h3 className="font-medium text-red-800 mb-2">Erreur de chargement</h3>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* En-tête du dashboard */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Tableau de Bord
        </h1>
        <p className="text-slate-600">
          Vue d'ensemble de vos voyages et alertes de sécurité
        </p>
      </div>

      {/* Statistiques générales */}
      <StatsOverview
        activeTrips={activeTrips.length}
        upcomingTrips={upcomingTrips.length}
        criticalAlerts={criticalAlerts.length}
        highRiskCountries={highRiskCountries.length}
        isLoading={isLoading}
      />

      {/* Grille principale du dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <ActiveTripsCard
            activeTrips={activeTrips}
            upcomingTrips={upcomingTrips}
            isLoading={isLoading}
          />
        </div>
        
        <div className="space-y-8">
          <SecurityAlertsCard
            alerts={criticalAlerts.slice(0, 5)} // Limiter aux 5 plus critiques
            isLoading={isLoading}
          />
          
          {/* Card additionnelle pour les pays à risque */}
          {!isLoading && highRiskCountries.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Pays à Surveiller
              </h3>
              <div className="space-y-1">
                {highRiskCountries.slice(0, 3).map(country => (
                  <div key={country.id} className="text-sm text-amber-700">
                    {country.name} - Niveau {country.security_level === 'critical' ? 'Critique' : 'Élevé'}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
