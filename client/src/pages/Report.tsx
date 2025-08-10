import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useNeighborhoods } from '@/hooks/useNeighborhoods';
import { useCreateAlert } from '@/hooks/useAlerts';

const reportSchema = z.object({
  neighborhoodId: z.string().min(1, 'Selecione um bairro'),
  message: z.string().min(10, 'Descrição muito curta (mínimo 10 caracteres)'),
});

type ReportForm = z.infer<typeof reportSchema>;

interface ReportProps {
  onNavigate: (view: string) => void;
}

export default function Report({ onNavigate }: ReportProps) {
  const { data: neighborhoods } = useNeighborhoods();
  const createAlert = useCreateAlert();
  const { toast } = useToast();

  const form = useForm<ReportForm>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      neighborhoodId: '',
      message: '',
    },
  });

  const onSubmit = async (data: ReportForm) => {
    try {
      await createAlert.mutateAsync({
        message: data.message,
        neighborhoodId: data.neighborhoodId,
      });

      toast({
        title: "Sucesso!",
        description: "Denúncia enviada com sucesso!",
      });

      form.reset();
      onNavigate('dashboard');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao enviar denúncia. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-medium text-gray-900 mb-6">Nova Denúncia</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Neighborhood Selection */}
            <FormField
              control={form.control}
              name="neighborhoodId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Bairro</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                        <SelectValue placeholder="Selecione o bairro" />
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {neighborhoods?.map((neighborhood) => (
                        <SelectItem key={neighborhood.id} value={neighborhood.id}>
                          {neighborhood.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Descrição do problema</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva o problema com o fornecimento de água..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={createAlert.isPending}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            >
              {createAlert.isPending ? 'Enviando...' : 'Enviar Denúncia'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
