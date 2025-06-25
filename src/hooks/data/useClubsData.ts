
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Club } from '@/types/backend';

export const useClubsData = () => {
  const { data: clubsData = [], isLoading: clubsLoading, error: clubsError } = useQuery({
    queryKey: ['clubs'],
    queryFn: async () => {
      const { data, error } = await supabase.from('clubs').select('*');
      if (error) throw error;
      return data || [];
    },
  });

  // Transform clubs data to match interface
  const clubs: Club[] = clubsData.map(club => ({
    ...club,
    updated_at: (club as any).updated_at || club.created_at
  }));

  return {
    clubs,
    clubsLoading,
    clubsError
  };
};
