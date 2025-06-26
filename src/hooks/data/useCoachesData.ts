
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
      const { data, error } = await supabase
        .from('coaches')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setCoaches(data || []);
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
