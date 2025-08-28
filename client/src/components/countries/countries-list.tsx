import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, AlertTriangle, CheckCircle, Search } from "lucide-react";
import type { Country } from '@shared/schema';

interface CountriesListProps {
  countries: Country[];
  selectedCountry: Country | null;
  onSelectCountry: (country: Country) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  riskFilter: string;
  onRiskFilterChange: (filter: string) => void;
  isLoading: boolean;
}

export default function CountriesList({
  countries,
  selectedCountry,
  onSelectCountry,
  searchQuery,
  onSearchChange,
  riskFilter,
  onRiskFilterChange,
  isLoading
}: CountriesListProps) {

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

  const countRisks = (country: Country) => {
    const securityRisks = Array.isArray(country.security_risks) ? country.security_risks.length : 0;
    const healthRisks = Array.isArray(country.health_risks) ? country.health_risks.length : 0;
    return { securityRisks, healthRisks };
  };

  return (
    <>
      {/* Search and Filters */}
      <Card className="glass-card" data-testid="countries-search-filters">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Rechercher un pays..." 
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
                data-testid="input-search-countries"
              />
            </div>
            <Select value={riskFilter} onValueChange={onRiskFilterChange}>
              <SelectTrigger className="w-48" data-testid="select-risk-filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les niveaux</SelectItem>
                <SelectItem value="low">Faible</SelectItem>
                <SelectItem value="medium">Moyen</SelectItem>
                <SelectItem value="high">Élevé</SelectItem>
                <SelectItem value="critical">Critique</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Countries List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="space-y-3" data-testid="countries-loading">
            {[1, 2, 3, 4].map(i => (
              <Card key={i} className="animate-pulse glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : countries.length === 0 ? (
          <Card className="glass-card" data-testid="no-countries-message">
            <CardContent className="p-8 text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
              <h3 className="font-medium text-muted-foreground mb-2">Aucun pays trouvé</h3>
              <p className="text-sm text-muted-foreground">
                Aucun pays ne correspond à vos critères de recherche
              </p>
            </CardContent>
          </Card>
        ) : (
          <div data-testid="countries-list">
            {countries.map((country) => {
              const RiskIcon = getRiskIcon(country.security_level);
              const { securityRisks, healthRisks } = countRisks(country);
              const isSelected = selectedCountry?.id === country.id;

              return (
                <Card 
                  key={country.id} 
                  className={`glass-card hover:shadow-md transition-shadow cursor-pointer ${
                    isSelected ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => onSelectCountry(country)}
                  data-testid={`country-card-${country.id}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {country.name}
                      </h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getRiskColor(country.security_level)}`}>
                        <RiskIcon className="w-3 h-3" />
                        {getRiskText(country.security_level)}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {country.travel_advisory || "Informations de voyage disponibles"}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{securityRisks} risque{securityRisks !== 1 ? 's' : ''} sécuritaire{securityRisks !== 1 ? 's' : ''}</span>
                      <span>{healthRisks} risque{healthRisks !== 1 ? 's' : ''} sanitaire{healthRisks !== 1 ? 's' : ''}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
