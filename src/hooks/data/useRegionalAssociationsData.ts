
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { RegionalAssociation } from '@/types/backend';

export const useRegionalAssociationsData = () => {
  const { data: regionalAssociationsData = [], isLoading: regionalAssociationsLoading, error: regionalAssociationsError } = useQuery({
    queryKey: ['regional_associations'],
    queryFn: async () => {
      const { data, error } = await supabase.from('regional_associations').select('*');
      if (error) throw error;
      return data || [];
    },
  });

  // Transform regional associations data to match interface
  const regionalAssociations: RegionalAssociation[] = regionalAssociationsData.map(ra => ({
    ...ra,
    president_name: (ra as any).president_name || undefined,
    clubs_count: (ra as any).clubs_count || 0,
    status: 'ativo' as const
  }));

  return {
    regionalAssociations,
    regionalAssociationsLoading,
    regionalAssociationsError
  };
};
