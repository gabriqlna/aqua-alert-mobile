import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { Alert } from '@/lib/types';

export function useAlerts(limit = 10) {
  return useQuery<Alert[]>({
    queryKey: ['/api/alerts', limit],
  });
}

export function useCreateAlert() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ message, neighborhoodId }: { message: string; neighborhoodId: string }) => {
      const response = await apiRequest('POST', '/api/alerts', { message, neighborhoodId });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/alerts'] });
    },
  });
}
