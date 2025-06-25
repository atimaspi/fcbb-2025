
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

export const useBackendData = () => {
  const { operations } = useBackendOperations();

  // Fetch clubs
  const { data: clubs = [], isLoading: clubsLoading } = useQuery({
    queryKey: ['clubs'],
    queryFn: async () => {
      const { data, error } = await supabase.from('clubs').select('*');
      if (error) throw error;
      return data as Club[];
    },
  });

  // Fetch teams
  const { data: teams = [], isLoading: teamsLoading } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const { data, error } = await supabase.from('teams').select('*');
      if (error) throw error;
      return data as Team[];
    },
  });

  // Fetch players
  const { data: players = [], isLoading: playersLoading } = useQuery({
    queryKey: ['players'],
    queryFn: async () => {
      const { data, error } = await supabase.from('players').select('*');
      if (error) throw error;
      return data as Player[];
    },
  });

  // Fetch games
  const { data: games = [], isLoading: gamesLoading } = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const { data, error } = await supabase.from('games').select('*');
      if (error) throw error;
      return data as Game[];
    },
  });

  // Fetch upcoming games
  const upcomingGames = games.filter(game => {
    if (!game.scheduled_date && !game.game_date) return false;
    const gameDate = new Date(game.scheduled_date || game.game_date || '');
    return gameDate > new Date() && game.status === 'agendado';
  }).slice(0, 5);

  // Fetch news
  const { data: news = [], isLoading: newsLoading } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase.from('news').select('*');
      if (error) throw error;
      return data as NewsItem[];
    },
  });

  // Fetch events
  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase.from('events').select('*');
      if (error) throw error;
      return data as Event[];
    },
  });

  // Fetch referees
  const { data: referees = [], isLoading: refereesLoading } = useQuery({
    queryKey: ['referees'],
    queryFn: async () => {
      const { data, error } = await supabase.from('referees').select('*');
      if (error) throw error;
      return data as Referee[];
    },
  });

  // Fetch coaches (using profiles table as a fallback since coaches table might not exist)
  const { data: coaches = [], isLoading: coachesLoading } = useQuery({
    queryKey: ['coaches'],
    queryFn: async () => {
      // Try coaches table first, fallback to profiles with coach role
      try {
        const { data, error } = await supabase.from('profiles').select('*').eq('role', 'treinador');
        if (error) throw error;
        // Transform profiles to coach format
        return data.map(profile => ({
          id: profile.id,
          name: profile.full_name || 'Treinador',
          first_name: profile.full_name?.split(' ')[0] || '',
          last_name: profile.full_name?.split(' ').slice(1).join(' ') || '',
          status: 'ativo',
          active: true,
          created_at: profile.updated_at || new Date().toISOString(),
          updated_at: profile.updated_at || new Date().toISOString()
        })) as Coach[];
      } catch (error) {
        console.error('Error fetching coaches:', error);
        return [] as Coach[];
      }
    },
  });

  // Fetch competitions (using championships table)
  const { data: competitions = [], isLoading: competitionsLoading } = useQuery({
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
  const { data: federations = [], isLoading: federationsLoading } = useQuery({
    queryKey: ['federations'],
    queryFn: async () => {
      const { data, error } = await supabase.from('federations').select('*');
      if (error) throw error;
      return data as Federation[];
    },
  });

  // Fetch regional associations
  const { data: regionalAssociations = [], isLoading: regionalAssociationsLoading } = useQuery({
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
    clubs,
    teams,
    players,
    games,
    upcomingGames,
    news,
    events,
    referees,
    coaches,
    competitions,
    federations,
    regionalAssociations,
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
    operations
  };
};
