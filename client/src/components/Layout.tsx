import { ReactNode } from 'react';
import BottomNavigation from './BottomNavigation';
import FloatingActionButton from './FloatingActionButton';
import { useCityStatus } from '@/hooks/useNeighborhoods';
import { MapPin } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  onNavigate: (view: string) => void;
  currentView: string;
}

export default function Layout({ children, onNavigate, currentView }: LayoutProps) {
  const { data: cityStatus, isLoading } = useCityStatus();

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-xl">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">AquaAlert</h1>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Nova Cruz</span>
          </div>
        </div>
        
        {!isLoading && cityStatus && (
          <div className="mt-2 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${cityStatus.color}`} />
              <span className="text-sm font-medium">{cityStatus.text}</span>
            </div>
            <p className="text-xs mt-1 opacity-90">Status geral da cidade</p>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation currentView={currentView} onNavigate={onNavigate} />
      
      {/* Floating Action Button */}
      <FloatingActionButton onQuickReport={() => onNavigate('report')} />
    </div>
  );
}
