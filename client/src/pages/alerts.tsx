import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { alertsApi } from '@/lib/api';
import AlertsList from '@/components/alerts/alerts-list';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Alerts() {
  const [showActiveOnly, setShowActiveOnly] = useState(true);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: alerts = [], isLoading } = useQuery({
    queryKey: ['/api/alerts', { active: showActiveOnly }],
    queryFn: () => alertsApi.getAll(showActiveOnly)
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, is_active }: { id: string; is_active: boolean }) => 
      alertsApi.update(id, { is_active }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/alerts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
      toast({
        title: "Alerte modifiée",
        description: "Le statut de l'alerte a été mis à jour."
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de modifier l'alerte.",
        variant: "destructive"
      });
    }
  });

  const handleToggleActive = (alertId: string, isActive: boolean) => {
    toggleMutation.mutate({ id: alertId, is_active: !isActive });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-card-foreground mb-2" data-testid="alerts-title">
          Alertes de Sécurité
        </h1>
        <p className="text-muted-foreground" data-testid="alerts-subtitle">
          Consultez et gérez les alertes de sécurité par pays
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button
            variant={showActiveOnly ? "default" : "outline"}
            onClick={() => setShowActiveOnly(true)}
            data-testid="button-active-alerts"
          >
            Alertes Actives
          </Button>
          <Button
            variant={!showActiveOnly ? "default" : "outline"}
            onClick={() => setShowActiveOnly(false)}
            data-testid="button-all-alerts"
          >
            Toutes les Alertes
          </Button>
        </div>
        
        <Button 
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          data-testid="button-new-alert"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle Alerte
        </Button>
      </div>

      <AlertsList
        alerts={alerts}
        onToggleActive={handleToggleActive}
        isLoading={isLoading}
      />
    </div>
  );
}
