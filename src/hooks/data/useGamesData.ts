
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Game } from '@/types/backend';

export const useGamesData = () => {
  const { data: gamesData = [], isLoading: gamesLoading, error: gamesError } = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const { data, error } = await supabase.from('games').select('*');
      if (error) throw error;
      return data || [];
    },
  });

  // Transform games data to match interface with proper status casting
  const games: Game[] = gamesData.map(game => ({
    ...game,
    status: (game.status as Game['status']) || 'agendado',
    updated_at: (game as any).updated_at || game.created_at
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

  return {
    games,
    upcomingGames,
    recentGames,
    gamesLoading,
    gamesError
  };
};
