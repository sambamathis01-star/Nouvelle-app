import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  User, 
  MapPin, 
  Calendar,
  Edit,
  MoreVertical,
  Plane,
  Building,
  Phone
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { Trip, Country } from '@shared/schema';

interface TripsListProps {
  trips: Trip[];
  countries: Country[];
  onEdit: (trip: Trip) => void;
  onStatusChange: (tripId: string, status: string) => void;
  isLoading: boolean;
}

export default function TripsList({ trips, countries, onEdit, onStatusChange, isLoading }: TripsListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'in_progress':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'completed':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planned':
        return 'Prévu';
      case 'in_progress':
        return 'En cours';
      case 'completed':
        return 'Terminé';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  const getCountryRisk = (countryName: string) => {
    const country = countries.find(c => c.name === countryName);
    return country?.security_level || 'medium';
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'high':
        return 'text-orange-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-slate-600';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4" data-testid="trips-loading">
        {[1,2,3,4].map(i => (
          <Card key={i} className="animate-pulse border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <Card className="border-0 bg-card/80 backdrop-blur-sm" data-testid="no-trips-message">
        <CardContent className="p-12 text-center">
          <Plane className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
          <h3 className="font-medium text-muted-foreground mb-2">Aucun voyage trouvé</h3>
          <p className="text-sm text-muted-foreground">
            Créez votre premier voyage ou ajustez vos filtres
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4" data-testid="trips-list">
      {trips.map((trip) => (
        <Card 
          key={trip.id} 
          className="shadow-md border-0 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-shadow"
          data-testid={`trip-card-${trip.id}`}
        >
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <h3 className="font-bold text-lg text-card-foreground">{trip.traveler_name}</h3>
                  <Badge className={getStatusColor(trip.status)}>
                    {getStatusText(trip.status)}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">{trip.destination_city}, {trip.destination_country}</span>
                  <div className={`w-2 h-2 rounded-full bg-current ${getRiskColor(getCountryRisk(trip.destination_country))}`}></div>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    data-testid={`trip-menu-${trip.id}`}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem 
                    onClick={() => onEdit(trip)}
                    data-testid={`trip-edit-${trip.id}`}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </DropdownMenuItem>
                  {trip.status !== 'in_progress' && (
                    <DropdownMenuItem 
                      onClick={() => onStatusChange(trip.id, 'in_progress')}
                      data-testid={`trip-start-${trip.id}`}
                    >
                      Marquer en cours
                    </DropdownMenuItem>
                  )}
                  {trip.status !== 'completed' && (
                    <DropdownMenuItem 
                      onClick={() => onStatusChange(trip.id, 'completed')}
                      data-testid={`trip-complete-${trip.id}`}
                    >
                      Marquer terminé
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <div>
                  <p className="text-xs text-muted-foreground">Départ</p>
                  <p className="font-medium">{format(new Date(trip.departure_date), 'dd MMM yyyy', { locale: fr })}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <div>
                  <p className="text-xs text-muted-foreground">Retour</p>
                  <p className="font-medium">{format(new Date(trip.return_date), 'dd MMM yyyy', { locale: fr })}</p>
                </div>
              </div>

              {trip.accommodation && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building className="w-4 h-4" />
                  <div>
                    <p className="text-xs text-muted-foreground">Hébergement</p>
                    <p className="font-medium truncate">{trip.accommodation}</p>
                  </div>
                </div>
              )}

              {trip.emergency_contact?.phone && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <div>
                    <p className="text-xs text-muted-foreground">Urgence</p>
                    <p className="font-medium">{trip.emergency_contact.name}</p>
                  </div>
                </div>
              )}
            </div>

            {trip.purpose && (
              <div className="pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Motif:</span> {trip.purpose}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
