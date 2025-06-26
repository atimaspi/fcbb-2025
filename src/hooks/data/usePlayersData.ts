
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Player {
  id: string;
  name: string;
  team_id?: string;
  position?: string;
  jersey_number?: number;
  birth_date?: string;
  height?: number;
  nationality?: string;
  status: 'active' | 'inactive';
  created_at: string;
}

export const usePlayersData = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playersLoading, setPlayersLoading] = useState(true);
  const [playersError, setPlayersError] = useState<string | null>(null);

  const fetchPlayers = async () => {
    try {
      setPlayersLoading(true);
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('first_name', { ascending: true });

      if (error) throw error;
      
      // Map player data with proper structure
      const mappedData = (data || []).map(item => ({
        id: item.id,
        name: `${item.first_name || ''} ${item.last_name || ''}`.trim() || 'Unknown',
        team_id: item.team_id,
        position: item.position,
        jersey_number: item.jersey_number,
        birth_date: item.birth_date,
        height: item.height_cm,
        nationality: item.nationality,
        status: (item.active === false ? 'inactive' : 'active') as 'active' | 'inactive',
        created_at: item.created_at
      }));
      
      setPlayers(mappedData);
      setPlayersError(null);
    } catch (err: any) {
      console.error('Error fetching players:', err);
      setPlayersError(err.message);
      setPlayers([]);
    } finally {
      setPlayersLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return {
    players,
    playersLoading,
    playersError,
    refetchPlayers: fetchPlayers
  };
};
