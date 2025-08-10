import { Building2 } from 'lucide-react';
import { useNeighborhoods } from '@/hooks/useNeighborhoods';
import { getStatusColor, getStatusText } from '@/lib/types';

export default function Map() {
  const { data: neighborhoods, isLoading } = useNeighborhoods();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-3"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl p-4 shadow-sm border border-gray-100 bg-gray-300 animate-pulse">
              <div className="h-4 bg-gray-400 rounded mb-2"></div>
              <div className="h-3 bg-gray-400 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Status Legend */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Legenda</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-water-available"></div>
            <span className="text-sm text-gray-700">Água disponível</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-water-unavailable"></div>
            <span className="text-sm text-gray-700">Sem água</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-water-maintenance"></div>
            <span className="text-sm text-gray-700">Manutenção</span>
          </div>
        </div>
      </div>

      {/* Neighborhoods Grid */}
      {neighborhoods && neighborhoods.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {neighborhoods.map((neighborhood) => (
            <div
              key={neighborhood.id}
              className={`rounded-xl p-4 shadow-sm border border-gray-100 ${getStatusColor(neighborhood.status)}`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Building2 className="w-4 h-4 text-gray-700" />
                <span className="text-sm font-medium text-gray-900">
                  {neighborhood.name}
                </span>
              </div>
              <p className="text-xs text-gray-600">
                {getStatusText(neighborhood.status)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <Building2 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Nenhum bairro encontrado</p>
        </div>
      )}
    </div>
  );
}
