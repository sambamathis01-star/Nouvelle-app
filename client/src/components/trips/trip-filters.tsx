import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

interface TripFilters {
  status: string;
  timeframe: string;
}

interface TripFiltersProps {
  filters: TripFilters;
  onFiltersChange: (filters: TripFilters) => void;
}

export default function TripFilters({ filters, onFiltersChange }: TripFiltersProps) {
  return (
    <Card className="mb-6 border-0 bg-card/80 backdrop-blur-sm" data-testid="trip-filters">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filtres:</span>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="min-w-40">
              <Select
                value={filters.status}
                onValueChange={(value) => onFiltersChange({ ...filters, status: value })}
              >
                <SelectTrigger data-testid="filter-status">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="planned">Prévus</SelectItem>
                  <SelectItem value="in_progress">En cours</SelectItem>
                  <SelectItem value="completed">Terminés</SelectItem>
                  <SelectItem value="cancelled">Annulés</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="min-w-40">
              <Select
                value={filters.timeframe}
                onValueChange={(value) => onFiltersChange({ ...filters, timeframe: value })}
              >
                <SelectTrigger data-testid="filter-timeframe">
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les périodes</SelectItem>
                  <SelectItem value="this_week">Cette semaine</SelectItem>
                  <SelectItem value="this_month">Ce mois</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
