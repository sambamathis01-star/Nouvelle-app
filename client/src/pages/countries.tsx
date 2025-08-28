import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { countriesApi } from '@/lib/api';
import CountriesList from '@/components/countries/countries-list';
import CountryDetails from '@/components/countries/country-details';
import type { Country } from '@shared/schema';

export default function Countries() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');

  const { data: countries = [], isLoading } = useQuery({
    queryKey: ['/api/countries'],
    queryFn: countriesApi.getAll
  });

  // Filter countries based on search and risk level
  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = riskFilter === 'all' || country.security_level === riskFilter;
    return matchesSearch && matchesRisk;
  });

  // Set default selected country to first high-risk country or first country
  const defaultCountry = countries.find(c => c.security_level === 'critical') || 
                         countries.find(c => c.security_level === 'high') || 
                         countries[0];

  const currentCountry = selectedCountry || defaultCountry;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-card-foreground mb-2" data-testid="countries-title">
          Gestion des Pays
        </h1>
        <p className="text-muted-foreground" data-testid="countries-subtitle">
          Consultez les niveaux de risque et informations de sécurité par pays
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Countries List */}
        <div className="space-y-4">
          <CountriesList
            countries={filteredCountries}
            selectedCountry={currentCountry}
            onSelectCountry={setSelectedCountry}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            riskFilter={riskFilter}
            onRiskFilterChange={setRiskFilter}
            isLoading={isLoading}
          />
        </div>

        {/* Country Details Panel */}
        <div>
          {currentCountry && (
            <CountryDetails country={currentCountry} />
          )}
        </div>
      </div>
    </div>
  );
}
