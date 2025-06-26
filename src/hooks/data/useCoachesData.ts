
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Coach {
  id: string;
  name: string;
  team_id?: string;
  license_number?: string;
  phone?: string;
  email?: string;
  experience_years?: number;
  status: 'ativo' | 'inativo' | 'suspenso';
  created_at: string;
}

export const useCoachesData = () => {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [coachesLoading, setCoachesLoading] = useState(true);
  const [coachesError, setCoachesError] = useState<string | null>(null);

  const fetchCoaches = async () => {
    try {
      setCoachesLoading(true);
      // Note: Using 'teams' table temporarily as 'coaches' table doesn't exist in current schema
      // This should be updated once the coaches table is properly set up
      const { data, error } = await supabase
        .from('teams') // temporary - should be 'coaches'
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      
      // Map team data to coach structure for now
      const mappedData = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        team_id: item.id,
        license_number: '',
        phone: '',
        email: '',
        experience_years: 0,
        status: 'ativo' as 'ativo' | 'inativo' | 'suspenso',
        created_at: item.created_at
      }));
      
      setCoaches(mappedData);
      setCoachesError(null);
    } catch (err: any) {
      console.error('Error fetching coaches:', err);
      setCoachesError(err.message);
      setCoaches([]);
    } finally {
      setCoachesLoading(false);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  return {
    coaches,
    coachesLoading,
    coachesError,
    refetchCoaches: fetchCoaches
  };
};
