import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Dashboard from "./Components/dashboard/Dashboard.jsx";
import { 
  Home, 
  Plane, 
  Bell, 
  Globe, 
  Settings, 
  User,
  Menu,
  X
} from "lucide-react";

const navigationItems = [
  { name: "Tableau de bord", href: "/", icon: Home, current: true },
  { name: "Voyages", href: "/trips", icon: Plane },
  { name: "Alertes", href: "/alerts", icon: Bell },
  { name: "Pays", href: "/countries", icon: Globe },
  { name: "Paramètres", href: "/settings", icon: Settings },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation mobile */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Plane className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800">Voyage Secu</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-slate-600" />
            ) : (
              <Menu className="w-5 h-5 text-slate-600" />
            )}
          </button>
        </div>

        {/* Menu mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
            <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-xl">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Plane className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-800">Voyage Secu</h2>
                    <p className="text-sm text-slate-500">Sécurité des voyages</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isCurrentPath(item.href)
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-slate-600" />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-slate-800">Admin</p>
                      <p className="text-slate-500">admin@voyagesecu.fr</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Layout desktop */}
      <div className="hidden lg:flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-slate-200">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">Voyage Secu</h1>
                  <p className="text-sm text-slate-500">Sécurité des voyages</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-6">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isCurrentPath(item.href)
                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Profil utilisateur */}
            <div className="p-6 border-t border-slate-200">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 truncate">Administrateur</p>
                  <p className="text-sm text-slate-500 truncate">admin@voyagesecu.fr</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 overflow-auto">
          <main>
            <Dashboard />
          </main>
        </div>
      </div>
    </div>
  );
}
