import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import { 
  getSecurityColor, 
  getSecurityText, 
  getSecurityIcon,
  formatDateSafely 
} from '../utils/securityUtils';

export default function CountryCard({ country, onSelect, isSelected = false }) {
  // Vérification de la validité du pays
  if (!country) {
    return null;
  }

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(country);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-0 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
      }`}
      onClick={handleCardClick}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={`Sélectionner le pays ${country.name}`}
      aria-pressed={isSelected}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-slate-600" aria-hidden="true" />
            <h3 className="font-bold text-lg text-slate-800">{country.name}</h3>
          </div>
          <Badge className={getSecurityColor(country.security_level)}>
            <div className="flex items-center gap-1">
              {getSecurityIcon(country.security_level)}
              <span className="sr-only">Niveau de sécurité: </span>
              {getSecurityText(country.security_level)}
            </div>
          </Badge>
        </div>

        {country.travel_advisory && (
          <p className="text-slate-600 text-sm mb-4 line-clamp-2" title={country.travel_advisory}>
            {country.travel_advisory}
          </p>
        )}

        <div className="flex justify-between items-center text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" aria-hidden="true" />
            <span className="sr-only">Dernière mise à jour: </span>
            {formatDateSafely(country.last_updated)}
          </div>
          {country.code && (
            <span className="uppercase tracking-wide font-medium" title="Code pays">
              {country.code}
            </span>
          )}
        </div>

        {country.security_risks && country.security_risks.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-200">
            <div className="flex flex-wrap gap-1" role="list" aria-label="Risques de sécurité">
              {country.security_risks.slice(0, 2).map((risk, index) => (
                <span 
                  key={index}
                  className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
                  role="listitem"
                >
                  {risk}
                </span>
              ))}
              {country.security_risks.length > 2 && (
                <span 
                  className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
                  title={`Risques supplémentaires: ${country.security_risks.slice(2).join(', ')}`}
                >
                  +{country.security_risks.length - 2} autres
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
