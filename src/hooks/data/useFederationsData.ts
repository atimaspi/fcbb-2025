
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Federation } from '@/types/backend';

export const useFederationsData = () => {
  const { data: federationsData = [], isLoading: federationsLoading, error: federationsError } = useQuery({
    queryKey: ['federations'],
    queryFn: async () => {
      const { data, error } = await supabase.from('federations').select('*');
      if (error) throw error;
      return data || [];
    },
  });

  // Transform federations data to match interface
  const federations: Federation[] = federationsData.map(fed => ({
    ...fed,
    country: (fed as any).country || 'Cabo Verde',
    partnership_status: 'ativo' as const
  }));

  return {
    federations,
    federationsLoading,
    federationsError
  };
};
