import { Home, Map, AlertTriangle, Settings } from 'lucide-react';

interface BottomNavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function BottomNavigation({ currentView, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Início' },
    { id: 'map', icon: Map, label: 'Mapa' },
    { id: 'report', icon: AlertTriangle, label: 'Denúncia' },
    { id: 'admin', icon: Settings, label: 'Admin' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex flex-col items-center py-2 px-3 ${
              currentView === id ? 'text-primary' : 'text-gray-500'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
