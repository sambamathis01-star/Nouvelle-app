import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { tripsApi } from "@/lib/api";
import { Link } from "wouter";
import { Plane, Plus, User, MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function ActiveTripsCard() {
  const { data: trips = [], isLoading } = useQuery({
    queryKey: ['/api/trips'],
    queryFn: () => tripsApi.getAll()
  });

  const activeTrips = trips.filter(trip => trip.status === 'in_progress');
  const upcomingTrips = trips.filter(trip => trip.status === 'planned');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'planned':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'En cours';
      case 'planned':
        return 'Prévu';
      default:
        return status;
    }
  };

  return (
    <Card className="glass-card" data-testid="active-trips-card">
      <CardHeader className="pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold text-card-foreground">
            <Plane className="w-6 h-6 text-blue-600" />
            Voyages en Cours & Prévus
          </CardTitle>
          <Link href="/trips">
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              data-testid="button-new-trip"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Voyage
            </Button>
          </Link>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="flex justify-between items-start mb-3">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Voyages Actifs */}
            {activeTrips.length > 0 && (
              <div>
                <h3 
                  className="font-semibold text-muted-foreground mb-3 flex items-center gap-2"
                  data-testid="active-trips-section"
                >
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  Voyages Actifs ({activeTrips.length})
                </h3>
                
                {activeTrips.slice(0, 3).map((trip) => (
                  <div 
                    key={trip.id} 
                    className="p-4 border border-green-200 rounded-xl bg-green-50/50 mb-3 hover:shadow-md transition-shadow"
                    data-testid={`active-trip-${trip.id}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-card-foreground">{trip.traveler_name}</span>
                      </div>
                      <Badge className={getStatusColor(trip.status)}>
                        {getStatusText(trip.status)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{trip.destination_city}, {trip.destination_country}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Retour: {format(new Date(trip.return_date), 'dd MMM', { locale: fr })}</span>
                      </div>
                    </div>
                    {trip.purpose && (
                      <div className="mt-2 pt-2 border-t border-slate-200">
                        <p className="text-xs text-muted-foreground">{trip.purpose}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Prochains Voyages */}
            {upcomingTrips.length > 0 && (
              <div>
                <h3 
                  className="font-semibold text-muted-foreground mb-3 flex items-center gap-2"
                  data-testid="upcoming-trips-section"
                >
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Prochains Voyages ({upcomingTrips.length})
                </h3>
                
                {upcomingTrips.slice(0, 2).map((trip) => (
                  <div 
                    key={trip.id} 
                    className="p-4 border border-blue-200 rounded-xl bg-blue-50/50 mb-3 hover:shadow-md transition-shadow"
                    data-testid={`upcoming-trip-${trip.id}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-card-foreground">{trip.traveler_name}</span>
                      </div>
                      <Badge className={getStatusColor(trip.status)}>
                        {getStatusText(trip.status)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{trip.destination_city}, {trip.destination_country}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Départ: {format(new Date(trip.departure_date), 'dd MMM', { locale: fr })}</span>
                      </div>
                    </div>
                    {trip.purpose && (
                      <div className="mt-2 pt-2 border-t border-slate-200">
                        <p className="text-xs text-muted-foreground">{trip.purpose}</p>
                      </div>
                    )}
                  </div>
                ))}

                {upcomingTrips.length > 2 && (
                  <div className="text-center pt-2">
                    <p className="text-sm text-muted-foreground">
                      ... et {upcomingTrips.length - 2} autres voyages prévus
                    </p>
                  </div>
                )}
              </div>
            )}

            {trips.length === 0 && (
              <div className="text-center py-8">
                <Plane className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="font-medium text-muted-foreground mb-2">Aucun voyage trouvé</h3>
                <p className="text-sm text-muted-foreground">
                  Créez votre premier voyage pour commencer le suivi
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
