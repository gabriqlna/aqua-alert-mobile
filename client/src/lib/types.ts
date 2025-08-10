export type WaterStatus = 'AVAILABLE' | 'UNAVAILABLE' | 'MAINTENANCE';

export interface Neighborhood {
  id: string;
  name: string;
  status: WaterStatus;
}

export interface Alert {
  id: string;
  message: string;
  neighborhoodId: string | null;
  timestamp: Date | string;
}

export interface CityStatus {
  status: WaterStatus;
  text: string;
  color: string;
}

export const getStatusColor = (status: WaterStatus): string => {
  switch (status) {
    case 'AVAILABLE':
      return 'bg-water-available';
    case 'UNAVAILABLE':
      return 'bg-water-unavailable';
    case 'MAINTENANCE':
      return 'bg-water-maintenance';
    default:
      return 'bg-gray-300';
  }
};

export const getStatusText = (status: WaterStatus): string => {
  switch (status) {
    case 'AVAILABLE':
      return 'Água disponível';
    case 'UNAVAILABLE':
      return 'Sem água';
    case 'MAINTENANCE':
      return 'Manutenção';
    default:
      return 'Desconhecido';
  }
};

export const formatTimeAgo = (timestamp: Date | string): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 1) {
    return 'Há alguns minutos';
  } else if (diffInHours < 24) {
    return `Há ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `Há ${diffInDays} dia${diffInDays > 1 ? 's' : ''}`;
  }
};
