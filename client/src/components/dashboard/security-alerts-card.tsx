import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { alertsApi } from "@/lib/api";
import { Link } from "wouter";
import { Bell, ExternalLink, AlertTriangle, Globe, Calendar } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function SecurityAlertsCard() {
  const { data: alerts = [], isLoading } = useQuery({
    queryKey: ['/api/alerts'],
    queryFn: () => alertsApi.getAll(true) // Get only active alerts
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'warning':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'Critique';
      case 'warning':
        return 'Attention';
      case 'info':
        return 'Information';
      default:
        return severity;
    }
  };

  const getSeverityIcon = (severity: string) => {
    return AlertTriangle;
  };

  const getSeverityIconColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600';
      case 'warning':
        return 'text-amber-600';
      case 'info':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const criticalAlertsCount = alerts.filter(alert => alert.severity === 'critical').length;

  return (
    <Card className="glass-card" data-testid="security-alerts-card">
      <CardHeader className="pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
            <Bell className="w-5 h-5 text-amber-600" />
            Alertes Sécurité
            {alerts.length > 0 && (
              <Badge className="bg-amber-100 text-amber-800 text-xs">
                {alerts.length}
              </Badge>
            )}
          </CardTitle>
          <Link href="/alerts">
            <Button 
              variant="outline" 
              className="border-input hover:bg-amber-50 text-sm"
              data-testid="button-view-all-alerts"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Voir tout
            </Button>
          </Link>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="animate-pulse p-3 border border-border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-3 w-3/4 mb-2" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : alerts.length > 0 ? (
          <div className="space-y-3">
            {alerts.slice(0, 3).map((alert) => {
              const SeverityIcon = getSeverityIcon(alert.severity);
              return (
                <div 
                  key={alert.id} 
                  className="p-3 border border-border rounded-lg hover:bg-accent transition-all duration-200 hover:shadow-sm cursor-pointer"
                  data-testid={`alert-${alert.id}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <SeverityIcon className={`w-4 h-4 ${getSeverityIconColor(alert.severity)}`} />
                      <div className="flex items-center gap-2">
                        <Globe className="w-3 h-3 text-muted-foreground" />
                        <span className="font-medium text-muted-foreground text-sm">{alert.country}</span>
                      </div>
                    </div>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {getSeverityText(alert.severity)}
                    </Badge>
                  </div>
                  
                  <h4 className="font-medium text-card-foreground text-sm mb-1">
                    {alert.title}
                  </h4>
                  
                  {alert.description && (
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {alert.description}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{format(new Date(alert.date), 'dd MMM', { locale: fr })}</span>
                    </div>
                    {alert.source && (
                      <span className="truncate max-w-24" title={alert.source}>
                        {alert.source}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {alerts.length > 3 && (
              <div className="text-center pt-2">
                <p className="text-sm text-muted-foreground">
                  ... et {alerts.length - 3} autres alertes actives
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8" data-testid="no-alerts-message">
            <Bell className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
            <h3 className="font-medium text-muted-foreground mb-2">Aucune alerte active</h3>
            <p className="text-sm text-muted-foreground">
              Toutes les destinations sont actuellement sûres
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
