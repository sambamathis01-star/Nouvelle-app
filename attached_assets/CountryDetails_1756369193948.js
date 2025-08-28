import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  AlertTriangle, 
  Heart,
  Phone,
  Mail,
  MapPin,
  Building
} from "lucide-react";
import { 
  getSecurityColor, 
  getSecurityText, 
  getSecurityIcon 
} from '../utils/securityUtils';

const InfoSection = ({ title, icon: Icon, children, bgColor = "bg-slate-50", borderColor = "border-slate-200" }) => (
  <div>
    <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
      <Icon className="w-4 h-4" />
      {title}
    </h4>
    <div className={`p-3 ${bgColor} rounded-lg border ${borderColor}`}>
      {children}
    </div>
  </div>
);

const RiskItem = ({ risk, icon: Icon, bgColor, iconColor }) => (
  <div className={`flex items-start gap-2 p-2 ${bgColor} rounded-lg`}>
    <Icon className={`w-4 h-4 ${iconColor} mt-0.5 flex-shrink-0`} />
    <span className="text-sm text-slate-700">{risk}</span>
  </div>
);

const ContactInfo = ({ icon: Icon, label, value, type = "text" }) => {
  if (!value) return null;

  const renderValue = () => {
    switch (type) {
      case 'email':
        return (
          <a 
            href={`mailto:${value}`} 
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            {value}
          </a>
        );
      case 'phone':
        return (
          <a 
            href={`tel:${value}`} 
            className="text-sm text-slate-700 font-mono hover:text-blue-600"
          >
            {value}
          </a>
        );
      default:
        return <p className="text-sm text-slate-700">{value}</p>;
    }
  };

  return (
    <div className="flex items-start gap-2">
      <Icon className="w-4 h-4 text-slate-600 mt-0.5" />
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wide">{label}</p>
        {renderValue()}
      </div>
    </div>
  );
};

export default function CountryDetails({ country }) {
  if (!country) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          <p className="text-slate-500">Aucun pays sélectionné</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            {country.name}
          </CardTitle>
          <Badge className={getSecurityColor(country.security_level)}>
            {getSecurityIcon(country.security_level, "w-3 h-3 mr-1")}
            {getSecurityText(country.security_level)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        
        {/* Conseil aux voyageurs */}
        {country.travel_advisory && (
          <InfoSection
            title="Conseil aux Voyageurs"
            icon={AlertTriangle}
            bgColor="bg-amber-50"
            borderColor="border-amber-200"
          >
            <p className="text-slate-600 text-sm">{country.travel_advisory}</p>
          </InfoSection>
        )}

        {/* Risques de sécurité */}
        {country.security_risks && country.security_risks.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
              {getSecurityIcon(country.security_level, "w-4 h-4 text-red-600")}
              Risques de Sécurité ({country.security_risks.length})
            </h4>
            <div className="space-y-2">
              {country.security_risks.map((risk, index) => (
                <RiskItem
                  key={index}
                  risk={risk}
                  icon={AlertTriangle}
                  bgColor="bg-red-50"
                  iconColor="text-red-500"
                />
              ))}
            </div>
          </div>
        )}

        {/* Risques sanitaires */}
        {country.health_risks && country.health_risks.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-600" />
              Risques Sanitaires ({country.health_risks.length})
            </h4>
            <div className="space-y-2">
              {country.health_risks.map((risk, index) => (
                <RiskItem
                  key={index}
                  risk={risk}
                  icon={Heart}
                  bgColor="bg-pink-50"
                  iconColor="text-pink-500"
                />
              ))}
            </div>
          </div>
        )}

        {/* Informations Ambassade */}
        {country.embassy_info && (
          <div>
            <Separator className="my-4" />
            <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-600" />
              Ambassade de France
            </h4>
            <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <ContactInfo
                icon={MapPin}
                label="Adresse"
                value={country.embassy_info.address}
              />
              <ContactInfo
                icon={Phone}
                label="Téléphone"
                value={country.embassy_info.phone}
                type="phone"
              />
              <ContactInfo
                icon={Mail}
                label="Email"
                value={country.embassy_info.email}
                type="email"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
