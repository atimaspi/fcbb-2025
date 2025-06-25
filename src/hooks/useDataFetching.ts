
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useDataFetching = () => {
  // Teams data
  const { data: teamsData, isLoading: teamsLoading, error: teamsError } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching teams:', error);
        throw error;
      }
      
      return data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });

  // Clubs data
  const { data: clubsData, isLoading: clubsLoading, error: clubsError } = useQuery({
    queryKey: ['clubs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clubs')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching clubs:', error);
        throw error;
      }
      
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
    retry: 2
  });

  // Competitions data
  const { data: competitionsData, isLoading: competitionsLoading, error: competitionsError } = useQuery({
    queryKey: ['competitions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('championships')
        .select('*')
        .order('start_date', { ascending: false });
      
      if (error) {
        console.error('Error fetching competitions:', error);
        throw error;
      }
      
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
    retry: 2
  });

  // Games data
  const { data: gamesData, isLoading: gamesLoading, error: gamesError } = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('game_date', { ascending: false });
      
      if (error) {
        console.error('Error fetching games:', error);
        throw error;
      }
      
      return data || [];
    },
    staleTime: 2 * 60 * 1000, // 2 minutes - games change more frequently
    retry: 2
  });

  // Players data
  const { data: playersData, isLoading: playersLoading, error: playersError } = useQuery({
    queryKey: ['players'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching players:', error);
        throw error;
      }
      
      return data || [];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2
  });

  // News data
  const { data: newsData, isLoading: newsLoading, error: newsError } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching news:', error);
        throw error;
      }
      
      return data || [];
    },
    staleTime: 2 * 60 * 1000,
    retry: 2
  });

  // Events data
  const { data: eventsData, isLoading: eventsLoading, error: eventsError } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });
      
      if (error) {
        console.error('Error fetching events:', error);
        throw error;
      }
      
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
    retry: 2
  });

  // Referees data
  const { data: refereesData, isLoading: refereesLoading, error: refereesError } = useQuery({
    queryKey: ['referees'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('referees')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching referees:', error);
        throw error;
      }
      
      return data || [];
    },
    staleTime: 10 * 60 * 1000,
    retry: 2
  });

  // Federations data
  const { data: federationsData, isLoading: federationsLoading, error: federationsError } = useQuery({
    queryKey: ['federations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('federations')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching federations:', error);
        throw error;
      }
      
      return data || [];
    },
    staleTime: 30 * 60 * 1000, // 30 minutes - federations rarely change
    retry: 2
  });

  // Regional associations data
  const { data: regionalAssociationsData, isLoading: regionalAssociationsLoading, error: regionalAssociationsError } = useQuery({
    queryKey: ['regional-associations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('regional_associations')
        .select('*')
        .order('island');
      
      if (error) {
        console.error('Error fetching regional associations:', error);
        throw error;
      }
      
      return data || [];
    },
    staleTime: 30 * 60 * 1000,
    retry: 2
  });

  return {
    // Raw data
    teamsData,
    clubsData,
    competitionsData,
    gamesData,
    playersData,
    newsData,
    eventsData,
    refereesData,
    federationsData,
    regionalAssociationsData,

    // Loading states
    teamsLoading,
    clubsLoading,
    competitionsLoading,
    gamesLoading,
    playersLoading,
    newsLoading,
    eventsLoading,
    refereesLoading,
    federationsLoading,
    regionalAssociationsLoading,

    // Error states
    teamsError,
    clubsError,
    competitionsError,
    gamesError,
    playersError,
    newsError,
    eventsError,
    refereesError,
    federationsError,
    regionalAssociationsError
  };
};
