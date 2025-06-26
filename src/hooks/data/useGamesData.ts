
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Game {
  id: string;
  home_team_id: string;
  away_team_id: string;
  competition_id?: string;
  scheduled_date?: string;
  venue?: string;
  status: 'scheduled' | 'live' | 'finished' | 'cancelled';
  home_score?: number;
  away_score?: number;
  round?: string;
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
        .from('game_results')
        .select('*')
        .order('start_time', { ascending: true });

      if (error) throw error;
      
      // Map game data with proper status handling
      const mappedData = (data || []).map(item => ({
        id: item.id,
        home_team_id: item.game_id, // Using game_id as fallback
        away_team_id: item.game_id, // Using game_id as fallback  
        competition_id: '',
        scheduled_date: item.start_time,
        venue: 'TBD',
        status: (item.game_status === 'ongoing' ? 'live' : 
                item.game_status === 'completed' ? 'finished' : 'scheduled') as 'scheduled' | 'live' | 'finished' | 'cancelled',
        home_score: item.home_team_score,
        away_score: item.away_team_score,
        round: '',
        created_at: item.created_at
      }));
      
      setGames(mappedData);
      setGamesError(null);
    } catch (err: any) {
      console.error('Error fetching games:', err);
      setGamesError(err.message);
      setGames([]);
    } finally {
      setGamesLoading(false);
    }
  };

  const upcomingGames = games.filter(game => game.status === 'scheduled');
  const recentGames = games.filter(game => game.status === 'finished').slice(0, 5);

  useEffect(() => {
    fetchGames();
  }, []);

  return {
    games,
    upcomingGames,
    recentGames,
    gamesLoading,
    gamesError,
    refetchGames: fetchGames
  };
};
