
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useCallback } from 'react';

interface QueryOptions {
  select?: string;
  limit?: number;
}

export const useOptimizedDataFetching = () => {
  // Simplified fetch function
  const optimizedFetch = useCallback(async (
    table: string, 
    options: QueryOptions = {}
  ) => {
    try {
      const { select = '*', limit } = options;
      
      let query = (supabase as any).from(table).select(select);
      
      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;
      
      if (error) {
        throw new Error(`Erro ao carregar ${table}: ${error.message}`);
      }
      
      return data || [];
    } catch (error: any) {
      throw error;
    }
  }, []);

  // Simplified queries
  const { data: newsData, isLoading: newsLoading } = useQuery({
    queryKey: ['news'],
    queryFn: () => optimizedFetch('news', { limit: 6 }),
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  const { data: clubsData, isLoading: clubsLoading } = useQuery({
    queryKey: ['clubs'],
    queryFn: () => optimizedFetch('clubs'),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  const { data: gamesData, isLoading: gamesLoading } = useQuery({
    queryKey: ['games'],
    queryFn: () => optimizedFetch('games'),
    staleTime: 1 * 60 * 1000,
    refetchOnWindowFocus: true
  });

  const { data: teamsData, isLoading: teamsLoading } = useQuery({
    queryKey: ['teams'],
    queryFn: () => optimizedFetch('teams'),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  return {
    newsData: newsData || [],
    clubsData: clubsData || [],
    gamesData: gamesData || [],
    teamsData: teamsData || [],
    
    newsLoading,
    clubsLoading,
    gamesLoading,
    teamsLoading,
    
    isLoading: newsLoading || clubsLoading || teamsLoading,
    
    optimizedFetch
  };
};
