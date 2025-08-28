import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Save, 
  X, 
  User, 
  MapPin, 
  Calendar,
  Phone,
  Building
} from "lucide-react";

export default function TripForm({ trip, countries, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(trip || {
    traveler_name: "",
    traveler_email: "",
    destination_country: "",
    destination_city: "",
    departure_date: "",
    return_date: "",
    purpose: "",
    status: "planned",
    accommodation: "",
    notes: "",
    emergency_contact: {
      name: "",
      phone: "",
      relationship: ""
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmergencyContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      emergency_contact: {
        ...prev.emergency_contact,
        [field]: value
      }
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="mb-6 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            {trip ? "Modifier le Voyage" : "Nouveau Voyage"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations du voyageur */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                <User className="w-4 h-4" />
                Informations du Voyageur
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="traveler_name">Nom du voyageur *</Label>
                  <Input
                    id="traveler_name"
                    value={formData.traveler_name}
                    onChange={(e) => handleChange('traveler_name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="traveler_email">Email</Label>
                  <Input
                    id="traveler_email"
                    type="email"
                    value={formData.traveler_email}
                    onChange={(e) => handleChange('traveler_email', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Destination */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Destination
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="destination_country">Pays *</Label>
                  <Select
                    value={formData.destination_country}
                    onValueChange={(value) => handleChange('destination_country', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un pays" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.id} value={country.name}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="destination_city">Ville</Label>
                  <Input
                    id="destination_city"
                    value={formData.destination_city}
                    onChange={(e) => handleChange('destination_city', e.target.value)}
                    placeholder="Ville de destination"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Dates et détails */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Dates et Détails
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="departure_date">Date de départ *</Label>
                  <Input
                    id="departure_date"
                    type="date"
                    value={formData.departure_date}
                    onChange={(e) => handleChange('departure_date', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="return_date">Date de retour *</Label>
                  <Input
                    id="return_date"
                    type="date"
                    value={formData.return_date}
                    onChange={(e) => handleChange('return_date', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="purpose">Motif du voyage</Label>
                  <Input
                    id="purpose"
                    value={formData.purpose}
                    onChange={(e) => handleChange('purpose', e.target.value)}
                    placeholder="Réunion, formation, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="status">Statut</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planned">Prévu</SelectItem>
                      <SelectItem value="in_progress">En cours</SelectItem>
                      <SelectItem value="completed">Terminé</SelectItem>
                      <SelectItem value="cancelled">Annulé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="accommodation">Hébergement</Label>
                <Input
                  id="accommodation"
                  value={formData.accommodation}
                  onChange={(e) => handleChange('accommodation', e.target.value)}
                  placeholder="Nom et adresse de l'hôtel"
                />
              </div>
            </div>

            <Separator />

            {/* Contact d'urgence */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Contact d'Urgence
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="emergency_name">Nom</Label>
                  <Input
                    id="emergency_name"
                    value={formData.emergency_contact?.name || ""}
                    onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                    placeholder="Nom complet"
                  />
                </div>
                <div>
                  <Label htmlFor="emergency_phone">Téléphone</Label>
                  <Input
                    id="emergency_phone"
                    value={formData.emergency_contact?.phone || ""}
                    onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
                <div>
                  <Label htmlFor="emergency_relationship">Relation</Label>
                  <Select
                    value={formData.emergency_contact?.relationship || ""}
                    onValueChange={(value) => handleEmergencyContactChange('relationship', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Relation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conjoint">Conjoint(e)</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="enfant">Enfant</SelectItem>
                      <SelectItem value="famille">Famille</SelectItem>
                      <SelectItem value="collegue">Collègue</SelectItem>
                      <SelectItem value="ami">Ami(e)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">Notes supplémentaires</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Informations complémentaires..."
                className="h-20"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="w-4 h-4 mr-2" />
                Annuler
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                {trip ? "Mettre à jour" : "Créer"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
