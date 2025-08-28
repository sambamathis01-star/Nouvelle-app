import StatsOverview from '@/components/dashboard/stats-overview';
import ActiveTripsCard from '@/components/dashboard/active-trips-card';
import SecurityAlertsCard from '@/components/dashboard/security-alerts-card';
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api';

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/dashboard/stats'],
    queryFn: dashboardApi.getStats
  });

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-card-foreground mb-2" data-testid="dashboard-title">
          Tableau de Bord
        </h1>
        <p className="text-muted-foreground" data-testid="dashboard-subtitle">
          Vue d'ensemble de vos voyages et alertes de sécurité
        </p>
      </div>

      {/* Statistics Overview */}
      <StatsOverview
        activeTrips={stats?.activeTrips || 0}
        upcomingTrips={stats?.upcomingTrips || 0}
        criticalAlerts={stats?.criticalAlerts || 0}
        highRiskCountries={stats?.highRiskCountries || 0}
        isLoading={statsLoading}
      />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <ActiveTripsCard />
        </div>
        
        <div className="space-y-8">
          <SecurityAlertsCard />
          
          {/* High Risk Countries Alert */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4" data-testid="risk-countries-alert">
            <h3 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
              <span className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs">!</span>
              Pays à Surveiller
            </h3>
            <div className="space-y-1">
              <div className="text-sm text-amber-700">
                Afghanistan - Niveau Critique
              </div>
              <div className="text-sm text-amber-700">
                Syrie - Niveau Critique
              </div>
              <div className="text-sm text-amber-700">
                Myanmar - Niveau Élevé
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
