
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
        .order('scheduled_date', { ascending: true });

      if (error) throw error;
      
      // Map game data with proper status handling
      const mappedData = (data || []).map(item => ({
        id: item.id,
        home_team_id: item.home_team_id,
        away_team_id: item.away_team_id,
        competition_id: item.competition_id,
        scheduled_date: item.scheduled_date,
        venue: item.venue,
        status: (item.status as 'scheduled' | 'live' | 'finished' | 'cancelled') || 'scheduled',
        home_score: item.home_score,
        away_score: item.away_score,
        round: item.round,
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

  useEffect(() => {
    fetchGames();
  }, []);

  return {
    games,
    gamesLoading,
    gamesError,
    refetchGames: fetchGames
  };
};
