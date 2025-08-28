import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tripsApi } from '@/lib/api';
import TripFilters from '@/components/trips/trip-filters';
import TripForm from '@/components/trips/trip-form';
import TripsList from '@/components/trips/trips-list';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Trip } from '@shared/schema';

interface TripFilters {
  status: string;
  timeframe: string;
}

export default function Trips() {
  const [showForm, setShowForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [filters, setFilters] = useState<TripFilters>({
    status: 'all',
    timeframe: 'all'
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: trips = [], isLoading } = useQuery({
    queryKey: ['/api/trips'],
    queryFn: () => tripsApi.getAll()
  });

  const { data: countries = [] } = useQuery({
    queryKey: ['/api/countries'],
    queryFn: () => import('@/lib/api').then(api => api.countriesApi.getAll())
  });

  const createMutation = useMutation({
    mutationFn: tripsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/trips'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
      setShowForm(false);
      setEditingTrip(null);
      toast({
        title: "Voyage créé",
        description: "Le voyage a été créé avec succès."
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de créer le voyage.",
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Parameters<typeof tripsApi.update>[1]) => 
      tripsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/trips'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
      setShowForm(false);
      setEditingTrip(null);
      toast({
        title: "Voyage modifié",
        description: "Le voyage a été modifié avec succès."
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le voyage.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (tripData: any) => {
    if (editingTrip) {
      updateMutation.mutate({ id: editingTrip.id, ...tripData });
    } else {
      createMutation.mutate(tripData);
    }
  };

  const handleEdit = (trip: Trip) => {
    setEditingTrip(trip);
    setShowForm(true);
  };

  const handleStatusChange = async (tripId: string, status: string) => {
    try {
      await tripsApi.update(tripId, { status });
      queryClient.invalidateQueries({ queryKey: ['/api/trips'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
      toast({
        title: "Statut modifié",
        description: "Le statut du voyage a été mis à jour."
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut.",
        variant: "destructive"
      });
    }
  };

  const handleNewTrip = () => {
    setEditingTrip(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTrip(null);
  };

  // Filter trips based on current filters
  const filteredTrips = trips.filter(trip => {
    const statusMatch = filters.status === 'all' || trip.status === filters.status;
    
    let timeframeMatch = true;
    if (filters.timeframe !== 'all') {
      const now = new Date();
      const departureDate = new Date(trip.departure_date);
      
      if (filters.timeframe === 'this_week') {
        const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        timeframeMatch = departureDate >= now && departureDate <= weekFromNow;
      } else if (filters.timeframe === 'this_month') {
        const monthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        timeframeMatch = departureDate >= now && departureDate <= monthFromNow;
      }
    }
    
    return statusMatch && timeframeMatch;
  });

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-card-foreground mb-2" data-testid="trips-title">
          Gestion des Voyages
        </h1>
        <p className="text-muted-foreground" data-testid="trips-subtitle">
          Créez, modifiez et suivez tous les voyages de votre équipe
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <TripFilters filters={filters} onFiltersChange={setFilters} />
        <Button 
          onClick={handleNewTrip} 
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          data-testid="button-new-trip"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Voyage
        </Button>
      </div>

      {showForm && (
        <TripForm
          trip={editingTrip}
          countries={countries}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      <TripsList
        trips={filteredTrips}
        countries={countries}
        onEdit={handleEdit}
        onStatusChange={handleStatusChange}
        isLoading={isLoading}
      />
    </div>
  );
}
