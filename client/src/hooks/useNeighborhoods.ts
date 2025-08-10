import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { Neighborhood, WaterStatus } from '@/lib/types';

export function useNeighborhoods() {
  return useQuery<Neighborhood[]>({
    queryKey: ['/api/neighborhoods'],
  });
}

export function useUpdateNeighborhoodStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: WaterStatus }) => {
      const response = await apiRequest('PATCH', `/api/neighborhoods/${id}`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/neighborhoods'] });
      queryClient.invalidateQueries({ queryKey: ['/api/city-status'] });
    },
  });
}

export function useCityStatus() {
  return useQuery({
    queryKey: ['/api/city-status'],
  });
}
