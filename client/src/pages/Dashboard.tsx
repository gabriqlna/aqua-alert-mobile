import { Map, AlertTriangle, Settings } from 'lucide-react';
import WaterIcon from '@/components/icons/WaterIcon';
import MapIcon from '@/components/icons/MapIcon';
import AlertIcon from '@/components/icons/AlertIcon';
import AdminIcon from '@/components/icons/AdminIcon';
import { useAlerts } from '@/hooks/useAlerts';
import { useNeighborhoods } from '@/hooks/useNeighborhoods';
import { formatTimeAgo } from '@/lib/types';

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { data: alerts, isLoading: alertsLoading } = useAlerts(10);
  const { data: neighborhoods } = useNeighborhoods();

  const getAlertColor = (alert: any) => {
    if (!neighborhoods) return 'bg-gray-500';
    
    const neighborhood = neighborhoods.find(n => n.id === alert.neighborhoodId);
    if (!neighborhood) return 'bg-gray-500';
    
    switch (neighborhood.status) {
      case 'UNAVAILABLE':
        return 'bg-red-500';
      case 'MAINTENANCE':
        return 'bg-orange-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Quick Actions Grid */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => onNavigate('map')}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center space-y-2 hover:shadow-md transition-shadow"
        >
          <MapIcon className="text-primary w-6 h-6" />
          <span className="text-xs font-medium text-gray-700">Mapa</span>
        </button>
        <button
          onClick={() => onNavigate('report')}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center space-y-2 hover:shadow-md transition-shadow"
        >
          <AlertIcon className="text-primary w-6 h-6" variant="warning" />
          <span className="text-xs font-medium text-gray-700">Denúncia</span>
        </button>
        <button
          onClick={() => onNavigate('admin')}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center space-y-2 hover:shadow-md transition-shadow"
        >
          <AdminIcon className="text-primary w-6 h-6" />
          <span className="text-xs font-medium text-gray-700">Admin</span>
        </button>
      </div>

      {/* Recent Alerts Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">Alertas Recentes</h2>
          <p className="text-sm text-gray-600">Últimas 10 denúncias</p>
        </div>

        {alertsLoading ? (
          <div className="p-4">
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start space-x-3 animate-pulse">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : alerts && alerts.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-4 flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getAlertColor(alert)}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(alert.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <AlertTriangle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Nenhum alerta recente</p>
          </div>
        )}
      </div>
    </div>
  );
}
