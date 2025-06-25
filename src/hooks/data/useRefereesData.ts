
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Referee } from '@/types/backend';

export const useRefereesData = () => {
  const { data: refereesData = [], isLoading: refereesLoading, error: refereesError } = useQuery({
    queryKey: ['referees'],
    queryFn: async () => {
      const { data, error } = await supabase.from('referees').select('*');
      if (error) throw error;
      return data || [];
    },
  });

  // Transform referees data to match interface
  const referees: Referee[] = refereesData.map(referee => ({
    ...referee,
    name: `${referee.first_name} ${referee.last_name}`,
    status: 'ativo' as const,
    updated_at: (referee as any).updated_at || referee.created_at
  }));

  return {
    referees,
    refereesLoading,
    refereesError
  };
};
