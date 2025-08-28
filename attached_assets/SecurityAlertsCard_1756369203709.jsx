import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.jsx";
import { Badge } from "../ui/badge.jsx";
import { Button } from "../ui/button.jsx";
import { Skeleton } from "../ui/skeleton.jsx";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils.js";
import { 
  Bell, 
  AlertTriangle, 
  Info,
  ExternalLink,
  Globe,
  Calendar
} from "lucide-react";
import { formatDateSafely } from "../../utils/securityUtils.js";

const AlertItem = ({ alert }) => {
  const getSeverityColor = (severity) => {
    const colors = {
      'critical': 'bg-red-100 text-red-800 border-red-300',
      'warning': 'bg-amber-100 text-amber-800 border-amber-300',
      'info': 'bg-blue-100 text-blue-800 border-blue-300'
    };
    return colors[severity] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getSeverityIcon = (severity) => {
    const iconClass = "w-4 h-4";
    switch (severity) {
      case 'critical':
        return <AlertTriangle className={`${iconClass} text-red-600`} />;
      case 'warning':
        return <AlertTriangle className={`${iconClass} text-amber-600`} />;
      default:
        return <Info className={`${iconClass} text-blue-600`} />;
    }
  };

  const getSeverityText = (severity) => {
    const texts = {
      'critical': 'Critique',
      'warning': 'Attention',
      'info': 'Information'
    };
    return texts[severity] || severity;
  };

  return (
    <div 
      className="p-3 border rounded-lg hover:bg-slate-50 transition-all duration-200 hover:shadow-sm cursor-pointer group"
      role="article"
      tabIndex={0}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {getSeverityIcon(alert.severity)}
          <div className="flex items-center gap-2">
            <Globe className="w-3 h-3 text-slate-500" />
            <span className="font-medium text-slate-700 text-sm">{alert.country}</span>
          </div>
        </div>
        <Badge className={getSeverityColor(alert.severity)}>
          {getSeverityText(alert.severity)}
        </Badge>
      </div>
      
      <h4 className="font-medium text-slate-800 text-sm mb-1 group-hover:text-slate-900 line-clamp-2">
        {alert.title}
      </h4>
      
      {alert.description && (
        <p className="text-xs text-slate-600 line-clamp-2 mb-2" title={alert.description}>
          {alert.description}
        </p>
      )}
      
      <div className="flex justify-between items-center text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{formatDateSafely(alert.date, 'dd MMM')}</span>
        </div>
        {alert.source && (
          <span className="truncate max-w-24" title={alert.source}>
            {alert.source}
          </span>
        )}
      </div>
    </div>
  );
};

export default function SecurityAlertsCard({ alerts = [], isLoading }) {
  const hasAlerts = alerts.length > 0;

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="w-5 h-5 text-amber-600" />
            Alertes Sécurité
            {hasAlerts && !isLoading && (
              <span className="ml-2 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                {alerts.length}
              </span>
            )}
          </CardTitle>
          <Link to={createPageUrl("Alerts")}>
            <Button variant="outline" size="sm" className="hover:bg-amber-50">
              <ExternalLink className="w-4 h-4 mr-1" />
              Voir tout
            </Button>
          </Link>
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="p-3 border rounded-lg animate-pulse">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-2/3" />
                <div className="flex justify-between items-center mt-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {hasAlerts ? (
              <>
                {alerts.map((alert) => (
                  <AlertItem key={alert.id} alert={alert} />
                ))}
                {alerts.length > 3 && (
                  <div className="text-center pt-2">
                    <Link to={createPageUrl("Alerts")}>
                      <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
                        Voir {alerts.length - 3} alerte{alerts.length > 4 ? 's' : ''} supplémentaire{alerts.length > 4 ? 's' : ''}
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Bell className="w-8 h-8 text-green-600" />
                </div>
                <p className="font-medium mb-1 text-slate-600">Aucune alerte active</p>
                <p className="text-sm">Toutes les destinations sont sécurisées</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
