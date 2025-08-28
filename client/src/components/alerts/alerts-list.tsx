import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  Globe, 
  Calendar,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { NewsAlert } from '@shared/schema';

interface AlertsListProps {
  alerts: NewsAlert[];
  onToggleActive: (alertId: string, isActive: boolean) => void;
  isLoading: boolean;
}

export default function AlertsList({ alerts, onToggleActive, isLoading }: AlertsListProps) {
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
    switch (severity) {
      case 'critical':
      case 'warning':
        return AlertTriangle;
      case 'info':
        return Info;
      default:
        return Info;
    }
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

  if (isLoading) {
    return (
      <div className="space-y-4" data-testid="alerts-loading">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse glass-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-4 h-4" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <Card className="glass-card" data-testid="no-alerts-message">
        <CardContent className="p-12 text-center">
          <Bell className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
          <h3 className="font-medium text-muted-foreground mb-2">Aucune alerte trouvée</h3>
          <p className="text-sm text-muted-foreground">
            Aucune alerte ne correspond aux critères sélectionnés
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4" data-testid="alerts-list">
      {alerts.map((alert) => {
        const SeverityIcon = getSeverityIcon(alert.severity);
        const ToggleIcon = alert.is_active ? ToggleRight : ToggleLeft;

        return (
          <Card 
            key={alert.id} 
            className={`glass-card hover:shadow-md transition-shadow ${
              !alert.is_active ? 'opacity-75' : ''
            }`}
            data-testid={`alert-card-${alert.id}`}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <SeverityIcon className={`w-5 h-5 ${getSeverityIconColor(alert.severity)}`} />
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-muted-foreground">{alert.country}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge 
                    className={getSeverityColor(alert.severity)}
                    data-testid={`alert-severity-${alert.id}`}
                  >
                    {getSeverityText(alert.severity)}
                  </Badge>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleActive(alert.id, alert.is_active ?? false)}
                    className={`p-1 ${alert.is_active ? 'text-green-600' : 'text-gray-400'}`}
                    data-testid={`alert-toggle-${alert.id}`}
                  >
                    <ToggleIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              
              <h3 
                className="font-semibold text-card-foreground text-lg mb-3"
                data-testid={`alert-title-${alert.id}`}
              >
                {alert.title}
              </h3>
              
              {alert.description && (
                <p 
                  className="text-muted-foreground mb-4 leading-relaxed"
                  data-testid={`alert-description-${alert.id}`}
                >
                  {alert.description}
                </p>
              )}
              
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span data-testid={`alert-date-${alert.id}`}>
                      {format(new Date(alert.date), 'dd MMMM yyyy', { locale: fr })}
                    </span>
                  </div>
                  
                  {alert.source && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Source:</span>
                      <span 
                        className="font-medium"
                        data-testid={`alert-source-${alert.id}`}
                      >
                        {alert.source}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs">
                    {alert.is_active ? 'Active' : 'Inactive'}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${
                    alert.is_active ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
