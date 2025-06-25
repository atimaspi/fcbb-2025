
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Player } from '@/types/backend';

export const usePlayersData = () => {
  const { data: playersData = [], isLoading: playersLoading, error: playersError } = useQuery({
    queryKey: ['players'],
    queryFn: async () => {
      const { data, error } = await supabase.from('players').select('*');
      if (error) throw error;
      return data || [];
    },
  });

  // Transform players data to match interface with proper type casting
  const players: Player[] = playersData.map(player => ({
    ...player,
    name: `${player.first_name} ${player.last_name}`,
    position: (player.position as Player['position']) || undefined,
    updated_at: (player as any).updated_at || player.created_at
  }));

  return {
    players,
    playersLoading,
    playersError
  };
};
