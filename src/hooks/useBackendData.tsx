
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useBackendOperations } from './useBackendOperations';
import type { 
  Club, 
  Team, 
  Player, 
  Game, 
  NewsItem, 
  Event, 
  Referee, 
  Coach,
  Competition,
  Federation,
  RegionalAssociation
} from '@/types/backend';

// Export types for components to use
export type { Game, Team, Player, NewsItem, Event, Referee, Coach, Competition, Federation, RegionalAssociation };

export const useBackendData = () => {
  const { operations } = useBackendOperations();

  // Fetch clubs
  const { data: clubs = [], isLoading: clubsLoading, error: clubsError } = useQuery({
    queryKey: ['clubs'],
    queryFn: async () => {
      const { data, error } = await supabase.from('clubs').select('*');
      if (error) throw error;
      return data as Club[];
    },
  });

  // Fetch teams
  const { data: teams = [], isLoading: teamsLoading, error: teamsError } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const { data, error } = await supabase.from('teams').select('*');
      if (error) throw error;
      return data as Team[];
    },
  });

  // Fetch players
  const { data: players = [], isLoading: playersLoading, error: playersError } = useQuery({
    queryKey: ['players'],
    queryFn: async () => {
      const { data, error } = await supabase.from('players').select('*');
      if (error) throw error;
      return data as Player[];
    },
  });

  // Fetch games
  const { data: games = [], isLoading: gamesLoading, error: gamesError } = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const { data, error } = await supabase.from('games').select('*');
      if (error) throw error;
      return data as Game[];
    },
  });

  // Fetch upcoming games
  const upcomingGames = games.filter(game => {
    if (!game.scheduled_date) return false;
    const gameDate = new Date(game.scheduled_date);
    return gameDate > new Date() && game.status === 'scheduled';
  }).slice(0, 5);

  // Fetch recent games
  const recentGames = games.filter(game => {
    if (!game.scheduled_date) return false;
    const gameDate = new Date(game.scheduled_date);
    return gameDate <= new Date() && game.status === 'finalizado';
  }).slice(0, 5);

  // Fetch news
  const { data: news = [], isLoading: newsLoading, error: newsError } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase.from('news').select('*');
      if (error) throw error;
      return data as NewsItem[];
    },
  });

  // Published news
  const publishedNews = news.filter(item => item.published === true);

  // Fetch events
  const { data: events = [], isLoading: eventsLoading, error: eventsError } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase.from('events').select('*');
      if (error) throw error;
      return data as Event[];
    },
  });

  // Active events
  const activeEvents = events.filter(event => {
    const eventDate = new Date(event.event_date);
    return eventDate >= new Date();
  });

  // Fetch referees
  const { data: referees = [], isLoading: refereesLoading, error: refereesError } = useQuery({
    queryKey: ['referees'],
    queryFn: async () => {
      const { data, error } = await supabase.from('referees').select('*');
      if (error) throw error;
      return data as Referee[];
    },
  });

  // Fetch coaches
  const { data: coaches = [], isLoading: coachesLoading, error: coachesError } = useQuery({
    queryKey: ['coaches'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from('coaches').select('*');
        if (error) throw error;
        return data as Coach[];
      } catch (error) {
        console.error('Error fetching coaches:', error);
        return [] as Coach[];
      }
    },
  });

  // Fetch competitions (using championships table)
  const { data: competitions = [], isLoading: competitionsLoading, error: competitionsError } = useQuery({
    queryKey: ['competitions'],
    queryFn: async () => {
      const { data, error } = await supabase.from('championships').select('*');
      if (error) throw error;
      return data.map(champ => ({
        id: champ.id,
        name: champ.name,
        type: champ.type,
        season: champ.season,
        start_date: champ.start_date,
        end_date: champ.end_date,
        description: champ.description,
        status: champ.status,
        created_at: champ.created_at,
        updated_at: champ.created_at
      })) as Competition[];
    },
  });

  // Fetch federations
  const { data: federations = [], isLoading: federationsLoading, error: federationsError } = useQuery({
    queryKey: ['federations'],
    queryFn: async () => {
      const { data, error } = await supabase.from('federations').select('*');
      if (error) throw error;
      return data as Federation[];
    },
  });

  // Fetch regional associations
  const { data: regionalAssociations = [], isLoading: regionalAssociationsLoading, error: regionalAssociationsError } = useQuery({
    queryKey: ['regional_associations'],
    queryFn: async () => {
      const { data, error } = await supabase.from('regional_associations').select('*');
      if (error) throw error;
      return data as RegionalAssociation[];
    },
  });

  const isLoading = clubsLoading || teamsLoading || playersLoading || gamesLoading || 
                   newsLoading || eventsLoading || refereesLoading || coachesLoading ||
                   competitionsLoading || federationsLoading || regionalAssociationsLoading;

  return {
    // Data
    clubs,
    teams,
    players,
    games,
    upcomingGames,
    recentGames,
    news,
    events,
    referees,
    coaches,
    competitions,
    federations,
    regionalAssociations,
    
    // Computed data
    publishedNews,
    activeEvents,
    
    // Data aliases for backward compatibility
    newsData: news,
    eventsData: events,
    
    // Loading states
    isLoading,
    clubsLoading,
    teamsLoading,
    playersLoading,
    gamesLoading,
    newsLoading,
    eventsLoading,
    refereesLoading,
    coachesLoading,
    competitionsLoading,
    federationsLoading,
    regionalAssociationsLoading,
    
    // Error states
    clubsError,
    teamsError,
    playersError,
    gamesError,
    newsError,
    eventsError,
    refereesError,
    coachesError,
    competitionsError,
    federationsError,
    regionalAssociationsError,
    
    // Operations
    operations
  };
};
