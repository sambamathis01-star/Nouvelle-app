import React from "react";
import { Card, CardContent } from "../ui/card.jsx";
import { Skeleton } from "../ui/skeleton.jsx";
import { Plane, Users, AlertTriangle, Shield, TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({ stat, isLoading, trend }) => {
  const hasAlert = stat.value > 0 && (stat.title.includes('Critiques') || stat.title.includes('Risque'));
  
  return (
    <Card className={`relative overflow-hidden shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300 ${
      hasAlert ? 'ring-1 ring-red-200' : ''
    }`}>
      {/* Cercle décoratif en arrière-plan */}
      <div className={`absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8 ${stat.color} rounded-full opacity-10`} />
      
      {/* Indicateur d'alerte */}
      {hasAlert && (
        <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      )}
      
      <CardContent className="p-6 relative">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-500 mb-1" title={stat.description}>
              {stat.title}
            </p>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="flex items-baseline gap-2">
                <p className={`text-3xl font-bold ${hasAlert ? 'text-red-700' : 'text-slate-800'}`}>
                  {stat.value}
                </p>
                {stat.unit && (
                  <span className="text-sm text-slate-500">{stat.unit}</span>
                )}
              </div>
            )}
          </div>
          
          {/* Icône avec badge */}
          <div className={`p-3 rounded-xl ${stat.color} bg-opacity-20 relative`}>
            <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
            {hasAlert && stat.value > 5 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">!</span>
              </div>
            )}
          </div>
        </div>

        {!isLoading && (
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              {trend?.direction === 'up' ? (
                <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
              ) : trend?.direction === 'down' ? (
                <TrendingDown className="w-4 h-4 mr-1 text-red-500" />
              ) : (
                <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
              )}
              <span className={`font-medium ${
                trend?.direction === 'down' ? 'text-red-600' : 'text-green-600'
              }`}>
                {trend?.text || 'Suivi en temps réel'}
              </span>
            </div>
            
            {stat.lastUpdate && (
              <span className="text-xs text-slate-400">
                Mis à jour {stat.lastUpdate}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function StatsOverview({ 
  activeTrips = 0, 
  upcomingTrips = 0, 
  criticalAlerts = 0, 
  highRiskCountries = 0, 
  isLoading = false,
  trends = {} // Nouvelles données de tendance
}) {
  const stats = [
    {
      title: "Voyages Actifs",
      value: activeTrips,
      icon: Plane,
      color: "bg-blue-500",
      textColor: "text-blue-600",
      description: "Nombre de voyages actuellement en cours",
      unit: activeTrips > 1 ? "voyages" : "voyage"
    },
    {
      title: "Voyages Prévus",
      value: upcomingTrips,
      icon: Users,
      color: "bg-green-500",
      textColor: "text-green-600",
      description: "Nombre de voyages planifiés dans les 30 prochains jours",
      unit: upcomingTrips > 1 ? "voyages" : "voyage"
    },
    {
      title: "Alertes Critiques",
      value: criticalAlerts,
      icon: AlertTriangle,
      color: "bg-red-500",
      textColor: "text-red-600",
      description: "Nombre d'alertes de sécurité critiques actives",
      unit: criticalAlerts > 1 ? "alertes" : "alerte"
    },
    {
      title: "Pays Haut Risque",
      value: highRiskCountries,
      icon: Shield,
      color: "bg-amber-500",
      textColor: "text-amber-600",
      description: "Nombre de pays classés à haut risque ou critique",
      unit: "pays"
    }
  ];

  // Calculer des tendances basiques si non fournies
  const getDefaultTrend = (statKey) => {
    if (trends[statKey]) return trends[statKey];
    
    // Tendances par défaut basées sur la logique métier
    switch (statKey) {
      case 'criticalAlerts':
        return criticalAlerts === 0 
          ? { direction: 'down', text: 'Aucune alerte' }
          : { direction: 'up', text: 'Surveillance active' };
      case 'highRiskCountries':
        return highRiskCountries === 0
          ? { direction: 'down', text: 'Situation stable' }
          : { direction: 'up', text: 'Vigilance requise' };
      default:
        return { direction: 'up', text: 'Suivi en temps réel' };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const statKey = ['activeTrips', 'upcomingTrips', 'criticalAlerts', 'highRiskCountries'][index];
        return (
          <StatCard
            key={index}
            stat={stat}
            isLoading={isLoading}
            trend={getDefaultTrend(statKey)}
          />
        );
      })}
    </div>
  );
}
