import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.jsx";
import { Badge } from "../ui/badge.jsx";
import { Button } from "../ui/button.jsx";
import { Skeleton } from "../ui/skeleton.jsx";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils.js";
import {
  MapPin,
  Calendar,
  User,
  Plane,
  Plus
} from "lucide-react";
import { formatDateSafely } from "../../utils/securityUtils.js";

const TripItem = ({ trip, isActive = false }) => {
  const getStatusColor = (status) => {
    const colors = {
      'in_progress': 'bg-green-100 text-green-800 border-green-300',
      'planned': 'bg-blue-100 text-blue-800 border-blue-300'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getStatusText = (status) => {
    const texts = {
      'in_progress': 'En cours',
      'planned': 'Prévu'
    };
    return texts[status] || status;
  };

  const borderColor = isActive ? 'border-green-200' : 'border-blue-200';
  const bgColor = isActive ? 'bg-green-50/50' : 'bg-blue-50/50';

  return (
    <div className={`p-4 border ${borderColor} rounded-xl ${bgColor} mb-3 hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-slate-600" />
          <span className="font-medium text-slate-800">{trip.traveler_name}</span>
        </div>
        <Badge className={getStatusColor(trip.status)}>
          {getStatusText(trip.status)}
        </Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-slate-600">
          <MapPin className="w-4 h-4" />
          <span>{trip.destination_city}, {trip.destination_country}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <Calendar className="w-4 h-4" />
          <span>
            {isActive ? 'Retour: ' : 'Départ: '}
            {formatDateSafely(
              isActive ? trip.return_date : trip.departure_date, 
              'dd MMM'
            )}
          </span>
        </div>
      </div>
      
      {trip.purpose && (
        <div className="mt-2 pt-2 border-t border-slate-200">
          <p className="text-xs text-slate-500">{trip.purpose}</p>
        </div>
      )}
    </div>
  );
};

export default function ActiveTripsCard({ activeTrips = [], upcomingTrips = [], isLoading }) {
  const hasActiveTrips = activeTrips.length > 0;
  const hasUpcomingTrips = upcomingTrips.length > 0;
  const hasAnyTrips = hasActiveTrips || hasUpcomingTrips;

  if (isLoading) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="p-4 border rounded-lg animate-pulse">
                <div className="flex justify-between items-start mb-3">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Plane className="w-6 h-6 text-blue-600" />
            Voyages en Cours & Prévus
          </CardTitle>
          <Link to={createPageUrl("Trips")}>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Voyage
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Voyages actifs */}
          {hasActiveTrips && (
            <div>
              <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                Voyages Actifs ({activeTrips.length})
              </h3>
              {activeTrips.slice(0, 3).map((trip) => (
                <TripItem key={trip.id} trip={trip} isActive={true} />
              ))}
              {activeTrips.length > 3 && (
                <p className="text-sm text-slate-500 text-center">
                  ... et {activeTrips.length - 3} autre{activeTrips.length > 4 ? 's' : ''}
                </p>
              )}
            </div>
          )}

          {/* Voyages prévus */}
          {hasUpcomingTrips && (
            <div>
              <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Prochains Voyages ({upcomingTrips.length})
              </h3>
              {upcomingTrips.slice(0, 3).map((trip) => (
                <TripItem key={trip.id} trip={trip} isActive={false} />
              ))}
              {upcomingTrips.length > 3 && (
                <p className="text-sm text-slate-500 text-center">
                  ... et {upcomingTrips.length - 3} autre{upcomingTrips.length > 4 ? 's' : ''}
                </p>
              )}
            </div>
          )}

          {/* État vide */}
          {!hasAnyTrips && (
            <div className="text-center py-8 text-slate-500">
              <Plane className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p className="font-medium mb-2">Aucun voyage en cours</p>
              <p className="text-sm">Créez un nouveau voyage pour commencer le suivi</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
