
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Game {
  id: string;
  home_team_id: string;
  away_team_id: string;
  competition_id?: string;
  scheduled_date?: string;
  game_date?: string;
  venue?: string;
  status: 'scheduled' | 'live' | 'finished' | 'cancelled';
  home_score?: number;
  away_score?: number;
  created_at: string;
}

export const useGamesData = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [gamesError, setGamesError] = useState<string | null>(null);

  const fetchGames = async () => {
    try {
      setGamesLoading(true);
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('scheduled_date', { ascending: true });

      if (error) throw error;
      setGames(data || []);
      setGamesError(null);
    } catch (err: any) {
      console.error('Error fetching games:', err);
      setGamesError(err.message);
      setGames([]);
    } finally {
      setGamesLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const upcomingGames = games.filter(game => 
    game.status === 'scheduled' && 
    new Date(game.scheduled_date || game.game_date || '') > new Date()
  );

  const recentGames = games.filter(game => 
    game.status === 'finished'
  ).slice(0, 10);

  return {
    games,
    upcomingGames,
    recentGames,
    gamesLoading,
    gamesError,
    refetchGames: fetchGames
  };
};
