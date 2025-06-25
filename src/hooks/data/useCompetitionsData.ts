
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Competition } from '@/types/backend';

export const useCompetitionsData = () => {
  const { data: competitionsData = [], isLoading: competitionsLoading, error: competitionsError } = useQuery({
    queryKey: ['competitions'],
    queryFn: async () => {
      const { data, error } = await supabase.from('championships').select('*');
      if (error) throw error;
      return data || [];
    },
  });

  // Transform competitions data to match interface
  const competitions: Competition[] = competitionsData.map(champ => ({
    id: champ.id,
    name: champ.name,
    type: champ.type as any,
    season: champ.season,
    start_date: champ.start_date,
    end_date: champ.end_date,
    description: champ.description,
    status: champ.status,
    created_at: champ.created_at,
    updated_at: (champ as any).updated_at || champ.created_at
  }));

  return {
    competitions,
    competitionsLoading,
    competitionsError
  };
};
