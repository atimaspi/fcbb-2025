
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Team } from '@/types/backend';

export const useTeamsData = () => {
  const { data: teamsData = [], isLoading: teamsLoading, error: teamsError } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const { data, error } = await supabase.from('teams').select('*');
      if (error) throw error;
      return data || [];
    },
  });

  // Transform teams data to match interface
  const teams: Team[] = teamsData.map(team => ({
    ...team,
    status: 'ativo' as const,
    updated_at: (team as any).updated_at || team.created_at
  }));

  return {
    teams,
    teamsLoading,
    teamsError
  };
};
