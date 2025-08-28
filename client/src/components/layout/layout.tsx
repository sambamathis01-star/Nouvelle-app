import { ReactNode, useState } from 'react';
import Sidebar from './sidebar';
import MobileNav from './mobile-nav';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile Navigation */}
      <MobileNav 
        isOpen={mobileMenuOpen} 
        onToggle={() => setMobileMenuOpen(!mobileMenuOpen)} 
      />

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Content */}
      <div className="lg:hidden">
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
