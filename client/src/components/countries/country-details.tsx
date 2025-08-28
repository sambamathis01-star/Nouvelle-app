import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, AlertTriangle, CheckCircle, Heart, Building, Mail, Phone } from "lucide-react";
import type { Country } from '@shared/schema';

interface CountryDetailsProps {
  country: Country;
}

export default function CountryDetails({ country }: CountryDetailsProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRiskText = (level: string) => {
    switch (level) {
      case 'low':
        return 'Faible';
      case 'medium':
        return 'Moyen';
      case 'high':
        return 'Élevé';
      case 'critical':
        return 'Critique';
      default:
        return level;
    }
  };

  const getRiskIcon = (level: string) => {
    return level === 'low' ? CheckCircle : AlertTriangle;
  };

  const securityRisks = Array.isArray(country.security_risks) ? country.security_risks : [];
  const healthRisks = Array.isArray(country.health_risks) ? country.health_risks : [];
  const embassyInfo = country.embassy_info || {};

  const RiskIcon = getRiskIcon(country.security_level);

  return (
    <Card className="glass-card" data-testid="country-details">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold text-card-foreground">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span data-testid="country-name">{country.name}</span>
          </CardTitle>
          <Badge 
            className={`px-3 py-1 text-sm font-medium flex items-center gap-1 ${getRiskColor(country.security_level)}`}
            data-testid="country-risk-badge"
          >
            <RiskIcon className="w-3 h-3" />
            {getRiskText(country.security_level)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Travel Advisory */}
        {country.travel_advisory && (
          <div data-testid="travel-advisory">
            <h4 className="font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Conseil aux Voyageurs
            </h4>
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-muted-foreground text-sm">
                {country.travel_advisory}
              </p>
            </div>
          </div>
        )}

        {/* Security Risks */}
        {securityRisks.length > 0 && (
          <div data-testid="security-risks">
            <h4 className="font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              Risques de Sécurité ({securityRisks.length})
            </h4>
            <div className="space-y-2">
              {securityRisks.map((risk, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-2 p-2 bg-red-50 rounded-lg"
                  data-testid={`security-risk-${index}`}
                >
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{risk}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Health Risks */}
        {healthRisks.length > 0 && (
          <div data-testid="health-risks">
            <h4 className="font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-600" />
              Risques Sanitaires ({healthRisks.length})
            </h4>
            <div className="space-y-2">
              {healthRisks.map((risk, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-2 p-2 bg-pink-50 rounded-lg"
                  data-testid={`health-risk-${index}`}
                >
                  <Heart className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{risk}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Embassy Information */}
        {embassyInfo && Object.keys(embassyInfo).length > 0 && (
          <div className="border-t border-border pt-4" data-testid="embassy-info">
            <h4 className="font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-600" />
              Ambassade de France
            </h4>
            <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              {embassyInfo.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Adresse</p>
                    <p className="text-sm text-muted-foreground">{embassyInfo.address}</p>
                  </div>
                </div>
              )}
              
              {(embassyInfo.phone || embassyInfo.emergency_phone) && (
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      {embassyInfo.emergency_phone ? 'Téléphone d\'urgence' : 'Téléphone'}
                    </p>
                    <a 
                      href={`tel:${embassyInfo.emergency_phone || embassyInfo.phone}`} 
                      className="text-sm text-muted-foreground font-mono hover:text-blue-600"
                      data-testid="embassy-phone"
                    >
                      {embassyInfo.emergency_phone || embassyInfo.phone}
                    </a>
                  </div>
                </div>
              )}
              
              {embassyInfo.email && (
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
                    <a 
                      href={`mailto:${embassyInfo.email}`} 
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                      data-testid="embassy-email"
                    >
                      {embassyInfo.email}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* No Information Available */}
        {securityRisks.length === 0 && healthRisks.length === 0 && !country.travel_advisory && (
          <div className="text-center py-8" data-testid="no-country-info">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500/30" />
            <h3 className="font-medium text-muted-foreground mb-2">Destination Sûre</h3>
            <p className="text-sm text-muted-foreground">
              Aucun risque particulier identifié pour cette destination
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
