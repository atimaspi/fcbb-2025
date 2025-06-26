
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Team {
  id: string;
  name: string;
  club_id?: string;
  category: string;
  division?: string;
  created_at: string;
}

export const useTeamsData = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamsLoading, setTeamsLoading] = useState(true);
  const [teamsError, setTeamsError] = useState<string | null>(null);

  const fetchTeams = async () => {
    try {
      setTeamsLoading(true);
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setTeams(data || []);
      setTeamsError(null);
    } catch (err: any) {
      console.error('Error fetching teams:', err);
      setTeamsError(err.message);
      // Fallback data
      setTeams([
        {
          id: '1',
          name: 'Benfica Basketball',
          category: 'senior',
          division: 'masculino',
          created_at: new Date().toISOString()
        }
      ]);
    } finally {
      setTeamsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return {
    teams,
    teamsLoading,
    teamsError,
    refetchTeams: fetchTeams
  };
};
