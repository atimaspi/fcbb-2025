
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
    updated_at: club.created_at // Fallback if updated_at doesn't exist
  }));

  // Fetch teams
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
    updated_at: team.created_at
  }));

  // Fetch players
  const { data: playersData = [], isLoading: playersLoading, error: playersError } = useQuery({
    queryKey: ['players'],
    queryFn: async () => {
      const { data, error } = await supabase.from('players').select('*');
      if (error) throw error;
      return data || [];
    },
  });

  // Transform players data to match interface
  const players: Player[] = playersData.map(player => ({
    ...player,
    name: `${player.first_name} ${player.last_name}`,
    updated_at: player.created_at
  }));

  // Fetch games
  const { data: gamesData = [], isLoading: gamesLoading, error: gamesError } = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const { data, error } = await supabase.from('games').select('*');
      if (error) throw error;
      return data || [];
    },
  });

  // Transform games data to match interface
  const games: Game[] = gamesData.map(game => ({
    ...game,
    updated_at: game.created_at
  }));

  // Fetch upcoming games
  const upcomingGames = games.filter(game => {
    if (!game.scheduled_date) return false;
    const gameDate = new Date(game.scheduled_date);
    return gameDate > new Date() && game.status === 'agendado';
  }).slice(0, 5);

  // Fetch recent games
  const recentGames = games.filter(game => {
    if (!game.scheduled_date) return false;
    const gameDate = new Date(game.scheduled_date);
    return gameDate <= new Date() && game.status === 'finalizado';
  }).slice(0, 5);

  // Fetch news
  const { data: newsData = [], isLoading: newsLoading, error: newsError } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase.from('news').select('*');
      if (error) throw error;
      return data || [];
    },
  });

  // Transform news data to match interface
  const news: NewsItem[] = newsData.map(item => ({
    ...item,
    views_count: 0 // Default value since it's not in the database
  }));

  // Published news
  const publishedNews = news.filter(item => item.published === true);

  // Fetch events
  const { data: eventsData = [], isLoading: eventsLoading, error: eventsError } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase.from('events').select('*');
      if (error) throw error;
      return data || [];
    },
  });

  // Transform events data to match interface
  const events: Event[] = eventsData.map(event => ({
    ...event,
    event_type: 'evento_social' as const,
    status: 'agendado' as const,
    updated_at: event.created_at
  }));

  // Active events
  const activeEvents = events.filter(event => {
    const eventDate = new Date(event.event_date);
    return eventDate >= new Date();
  });

  // Fetch referees
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
    updated_at: referee.created_at
  }));

  // Fetch coaches - handle case where table might not exist
  const { data: coachesData = [], isLoading: coachesLoading, error: coachesError } = useQuery({
    queryKey: ['coaches'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from('coaches').select('*');
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error fetching coaches:', error);
        return [];
      }
    },
  });

  // Transform coaches data to match interface
  const coaches: Coach[] = coachesData.map(coach => ({
    ...coach,
    updated_at: coach.updated_at || coach.created_at
  }));

  // Fetch competitions (using championships table)
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
    updated_at: champ.created_at
  }));

  // Fetch federations
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
    country: 'Unknown', // Default value
    partnership_status: 'ativo' as const
  }));

  // Fetch regional associations
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
    president_name: undefined,
    clubs_count: 0,
    status: 'ativo' as const
  }));

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
