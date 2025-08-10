import { Settings, ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useNeighborhoods, useUpdateNeighborhoodStatus } from '@/hooks/useNeighborhoods';
import { getStatusColor, type WaterStatus } from '@/lib/types';

export default function Admin() {
  const { data: neighborhoods, isLoading } = useNeighborhoods();
  const updateStatus = useUpdateNeighborhoodStatus();
  const { toast } = useToast();

  const handleStatusChange = async (neighborhoodId: string, newStatus: WaterStatus) => {
    try {
      await updateStatus.mutateAsync({ id: neighborhoodId, status: newStatus });
      toast({
        title: "Sucesso!",
        description: "Status do bairro atualizado!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao atualizar status. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const getStatusLabel = (status: WaterStatus): string => {
    switch (status) {
      case 'AVAILABLE':
        return 'Disponível';
      case 'UNAVAILABLE':
        return 'Sem água';
      case 'MAINTENANCE':
        return 'Manutenção';
      default:
        return 'Desconhecido';
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
            <div className="h-5 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
        </div>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
                <div className="h-8 bg-gray-300 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Admin Header */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-2">
          <Settings className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-medium text-gray-900">Painel Administrativo</h2>
        </div>
        <p className="text-sm text-gray-600">Altere o status dos bairros</p>
      </div>

      {/* Neighborhood Status Controls */}
      {neighborhoods && neighborhoods.length > 0 ? (
        <div className="space-y-3">
          {neighborhoods.map((neighborhood) => (
            <div key={neighborhood.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded ${getStatusColor(neighborhood.status)}`} />
                  <span className="font-medium text-gray-900">{neighborhood.name}</span>
                </div>
                <Select
                  value={neighborhood.status}
                  onValueChange={(value: WaterStatus) => handleStatusChange(neighborhood.id, value)}
                  disabled={updateStatus.isPending}
                >
                  <SelectTrigger className="w-32 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent">
                    <SelectValue />
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AVAILABLE">Disponível</SelectItem>
                    <SelectItem value="UNAVAILABLE">Sem água</SelectItem>
                    <SelectItem value="MAINTENANCE">Manutenção</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <Settings className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Nenhum bairro encontrado</p>
        </div>
      )}
    </div>
  );
}
