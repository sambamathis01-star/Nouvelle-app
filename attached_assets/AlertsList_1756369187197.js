import React from 'react';
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

export default function TripsList({ trips = [], countries = [], onEdit, onStatusChange, isLoading }) {
  const getStatusColor = (status) => {
    const statusColors = {
      planned: 'bg-blue-100 text-blue-800 border-blue-300',
      in_progress: 'bg-green-100 text-green-800 border-green-300',
      completed: 'bg-slate-100 text-slate-800 border-slate-300',
      cancelled: 'bg-red-100 text-red-800 border-red-300'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getStatusText = (status) => {
    const statusTexts = {
      planned: 'Prévu',
      in_progress: 'En cours',
      completed: 'Terminé',
      cancelled: 'Annulé'
    };
    return statusTexts[status] || status;
  };

  const getCountryRisk = (countryName) => {
    if (!countries || !Array.isArray(countries)) return 'medium';
    const country = countries.find(c => c?.name === countryName);
    return country?.security_level || 'medium';
  };

  const getRiskColor = (level) => {
    const riskColors = {
      low: 'text-green-600',
      medium: 'text-yellow-600',
      high: 'text-orange-600',
      critical: 'text-red-600'
    };
    return riskColors[level] || 'text-slate-600';
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy', { locale: fr });
    } catch (error) {
      console.warn('Erreur de formatage de date:', dateString);
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Card key={i} className="animate-pulse border-0 bg-white/80 backdrop-blur-sm">
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

  if (!trips || trips.length === 0) {
    return (
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          <Plane className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <h3 className="font-medium text-slate-600 mb-2">Aucun voyage trouvé</h3>
          <p className="text-sm text-slate-500">
            Créez votre premier voyage ou ajustez vos filtres
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {trips.map((trip) => (
        <Card key={trip.id} className="shadow-md border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <User className="w-5 h-5 text-slate-600" />
                  <h3 className="font-bold text-lg text-slate-800">{trip.traveler_name}</h3>
                  <Badge className={getStatusColor(trip.status)}>
                    {getStatusText(trip.status)}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">{trip.destination_city}, {trip.destination_country}</span>
                  <div className={`w-2 h-2 rounded-full bg-current ${getRiskColor(getCountryRisk(trip.destination_country))}`}></div>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Options du voyage">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onEdit?.(trip)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </DropdownMenuItem>
                  {trip.status !== 'in_progress' && (
                    <DropdownMenuItem onClick={() => onStatusChange?.(trip.id, 'in_progress')}>
                      Marquer en cours
                    </DropdownMenuItem>
                  )}
                  {trip.status !== 'completed' && (
                    <DropdownMenuItem onClick={() => onStatusChange?.(trip.id, 'completed')}>
                      Marquer terminé
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="w-4 h-4" />
                <div>
                  <p className="text-xs text-slate-500">Départ</p>
                  <p className="font-medium">{formatDate(trip.departure_date)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="w-4 h-4" />
                <div>
                  <p className="text-xs text-slate-500">Retour</p>
                  <p className="font-medium">{formatDate(trip.return_date)}</p>
                </div>
              </div>

              {trip.accommodation && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Building className="w-4 h-4" />
                  <div>
                    <p className="text-xs text-slate-500">Hébergement</p>
                    <p className="font-medium truncate" title={trip.accommodation}>
                      {trip.accommodation}
                    </p>
                  </div>
                </div>
              )}

              {trip.emergency_contact?.phone && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone className="w-4 h-4" />
                  <div>
                    <p className="text-xs text-slate-500">Urgence</p>
                    <p className="font-medium" title={trip.emergency_contact.phone}>
                      {trip.emergency_contact.name}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {trip.purpose && (
              <div className="pt-3 border-t border-slate-200">
                <p className="text-sm text-slate-600">
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
