import { useLocation } from 'wouter';
import { Link } from 'wouter';
import { 
  Home, 
  Plane, 
  Bell, 
  Globe, 
  Settings,
  User
} from 'lucide-react';

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: Home },
  { name: 'Voyages', href: '/trips', icon: Plane },
  { name: 'Alertes', href: '/alerts', icon: Bell },
  { name: 'Pays', href: '/countries', icon: Globe },
  { name: 'Paramètres', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const [location] = useLocation();

  const isActive = (href: string) => {
    return location === href || (href === '/dashboard' && location === '/');
  };

  return (
    <div className="w-64 glass-card border-r border-border">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3" data-testid="logo-container">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Plane className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-card-foreground">Voyage Secu</h1>
              <p className="text-sm text-muted-foreground">Sécurité des voyages</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6" data-testid="sidebar-navigation">
          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  data-testid={`nav-link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className={`nav-link ${
                    isActive(item.href) ? 'nav-link-active' : 'nav-link-inactive'
                  }`}>
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-6 border-t border-border">
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-card-foreground truncate">Administrateur</p>
              <p className="text-sm text-muted-foreground truncate">admin@voyagesecu.fr</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
