import { Link, useLocation } from 'wouter';
import { 
  Menu,
  X,
  Home, 
  Plane, 
  Bell, 
  Globe, 
  Settings,
  User
} from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: Home },
  { name: 'Voyages', href: '/trips', icon: Plane },
  { name: 'Alertes', href: '/alerts', icon: Bell },
  { name: 'Pays', href: '/countries', icon: Globe },
  { name: 'Paramètres', href: '/settings', icon: Settings },
];

export default function MobileNav({ isOpen, onToggle }: MobileNavProps) {
  const [location] = useLocation();

  const isActive = (href: string) => {
    return location === href || (href === '/dashboard' && location === '/');
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 bg-card/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center gap-3" data-testid="mobile-logo">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Plane className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Voyage Secu</h1>
          </div>
          <button 
            onClick={onToggle} 
            className="p-2 rounded-lg hover:bg-accent"
            data-testid="mobile-menu-toggle"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            onClick={onToggle}
            data-testid="mobile-menu-overlay"
          >
            <div 
              className="fixed left-0 top-0 w-64 h-full bg-card shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                    <Plane className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-bold text-card-foreground">Voyage Secu</h2>
                    <p className="text-sm text-muted-foreground">Sécurité des voyages</p>
                  </div>
                </div>

                <nav className="space-y-2" data-testid="mobile-navigation">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link 
                        key={item.href} 
                        href={item.href}
                        onClick={onToggle}
                        data-testid={`mobile-nav-link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <div className={`nav-link ${
                          isActive(item.href) ? 'nav-link-active' : 'nav-link-inactive'
                        }`}>
                          <Icon className="w-5 h-5" />
                          {item.name}
                        </div>
                      </Link>
                    );
                  })}
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-card-foreground">Admin</p>
                      <p className="text-muted-foreground">admin@voyagesecu.fr</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
