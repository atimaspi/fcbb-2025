
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Coach } from '@/types/backend';

export const useCoachesData = () => {
  const { data: coachesData = [], isLoading: coachesLoading, error: coachesError } = useQuery({
    queryKey: ['coaches'],
    queryFn: async () => {
      try {
        // Try to fetch from coaches table directly
        const { data, error } = await supabase.from('coaches' as any).select('*');
        if (error) {
          console.log('Coaches table not available, returning empty array');
          return [];
        }
        return data || [];
      } catch (error) {
        console.log('Coaches query failed, returning empty array');
        return [];
      }
    },
  });

  // Transform coaches data - provide empty array as fallback
  const coaches: Coach[] = Array.isArray(coachesData) ? coachesData.map((coach: any) => ({
    id: coach.id,
    name: coach.name || 'Unknown Coach',
    status: (coach.status as Coach['status']) || 'ativo',
    created_at: coach.created_at,
    updated_at: coach.updated_at || coach.created_at
  })) : [];

  return {
    coaches,
    coachesLoading,
    coachesError
  };
};
