import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  User, 
  Mail,
  Globe,
  Save
} from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-card-foreground mb-2" data-testid="settings-title">
          Paramètres
        </h1>
        <p className="text-muted-foreground" data-testid="settings-subtitle">
          Configurez les paramètres de l'application et vos préférences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Profile Settings */}
        <Card className="glass-card" data-testid="profile-settings">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Profil Utilisateur
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="display-name">Nom d'affichage</Label>
              <Input 
                id="display-name"
                defaultValue="Administrateur"
                data-testid="input-display-name"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email"
                defaultValue="admin@voyagesecu.fr"
                data-testid="input-email"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input 
                id="phone"
                type="tel"
                placeholder="+33 1 23 45 67 89"
                data-testid="input-phone"
              />
            </div>

            <Button 
              className="w-full"
              data-testid="button-save-profile"
            >
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder le profil
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="glass-card" data-testid="notification-settings">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-600" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Alertes critiques</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications pour les alertes de niveau critique
                </p>
              </div>
              <Switch defaultChecked data-testid="switch-critical-alerts" />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Nouveaux voyages</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications lors de la création de nouveaux voyages
                </p>
              </div>
              <Switch defaultChecked data-testid="switch-new-trips" />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Rappels de retour</Label>
                <p className="text-sm text-muted-foreground">
                  Rappels automatiques avant les dates de retour
                </p>
              </div>
              <Switch data-testid="switch-return-reminders" />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Résumé hebdomadaire</Label>
                <p className="text-sm text-muted-foreground">
                  Résumé des activités chaque lundi
                </p>
              </div>
              <Switch defaultChecked data-testid="switch-weekly-summary" />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="glass-card" data-testid="security-settings">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Sécurité
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="current-password">Mot de passe actuel</Label>
              <Input 
                id="current-password"
                type="password"
                data-testid="input-current-password"
              />
            </div>
            
            <div>
              <Label htmlFor="new-password">Nouveau mot de passe</Label>
              <Input 
                id="new-password"
                type="password"
                data-testid="input-new-password"
              />
            </div>
            
            <div>
              <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
              <Input 
                id="confirm-password"
                type="password"
                data-testid="input-confirm-password"
              />
            </div>

            <Button 
              variant="outline" 
              className="w-full"
              data-testid="button-change-password"
            >
              Changer le mot de passe
            </Button>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Authentification à deux facteurs</Label>
                <p className="text-sm text-muted-foreground">
                  Sécurité renforcée avec 2FA
                </p>
              </div>
              <Switch data-testid="switch-2fa" />
            </div>
          </CardContent>
        </Card>

        {/* Application Settings */}
        <Card className="glass-card" data-testid="app-settings">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-purple-600" />
              Application
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Mode sombre</Label>
                <p className="text-sm text-muted-foreground">
                  Utiliser le thème sombre
                </p>
              </div>
              <Switch data-testid="switch-dark-mode" />
            </div>

            <Separator />

            <div>
              <Label htmlFor="language">Langue</Label>
              <select 
                id="language"
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-card-foreground"
                defaultValue="fr"
                data-testid="select-language"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>

            <div>
              <Label htmlFor="timezone">Fuseau horaire</Label>
              <select 
                id="timezone"
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-card-foreground"
                defaultValue="Europe/Paris"
                data-testid="select-timezone"
              >
                <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York (UTC-5)</option>
                <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
              </select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Mise à jour automatique</Label>
                <p className="text-sm text-muted-foreground">
                  Mise à jour automatique des données pays
                </p>
              </div>
              <Switch defaultChecked data-testid="switch-auto-update" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Settings */}
      <Card className="glass-card" data-testid="integration-settings">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-600" />
            Intégrations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-card-foreground">API Sources de Données</h4>
              
              <div>
                <Label htmlFor="france-diplomatie-api">API France Diplomatie</Label>
                <Input 
                  id="france-diplomatie-api"
                  type="password"
                  placeholder="Clé API France Diplomatie"
                  data-testid="input-france-diplomatie-api"
                />
              </div>
              
              <div>
                <Label htmlFor="uk-foreign-office-api">API UK Foreign Office</Label>
                <Input 
                  id="uk-foreign-office-api"
                  type="password"
                  placeholder="Clé API UK Foreign Office"
                  data-testid="input-uk-foreign-office-api"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-card-foreground">Services de Communication</h4>
              
              <div>
                <Label htmlFor="email-smtp">Serveur SMTP Email</Label>
                <Input 
                  id="email-smtp"
                  placeholder="smtp.exemple.com"
                  data-testid="input-email-smtp"
                />
              </div>
              
              <div>
                <Label htmlFor="sms-provider">Fournisseur SMS</Label>
                <Input 
                  id="sms-provider"
                  placeholder="Clé API SMS"
                  type="password"
                  data-testid="input-sms-provider"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <Button 
              className="w-full lg:w-auto"
              data-testid="button-save-integrations"
            >
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder les intégrations
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
