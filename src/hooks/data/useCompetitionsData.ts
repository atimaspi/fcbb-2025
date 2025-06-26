
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Competition {
  id: string;
  name: string;
  season: string;
  type: string;
  status: 'upcoming' | 'ongoing' | 'finished';
  start_date?: string;
  end_date?: string;
  created_at: string;
}

export const useCompetitionsData = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [competitionsLoading, setCompetitionsLoading] = useState(true);
  const [competitionsError, setCompetitionsError] = useState<string | null>(null);

  const fetchCompetitions = async () => {
    try {
      setCompetitionsLoading(true);
      const { data, error } = await supabase
        .from('competitions')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setCompetitions(data || []);
      setCompetitionsError(null);
    } catch (err: any) {
      console.error('Error fetching competitions:', err);
      setCompetitionsError(err.message);
      setCompetitions([]);
    } finally {
      setCompetitionsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

  return {
    competitions,
    competitionsLoading,
    competitionsError,
    refetchCompetitions: fetchCompetitions
  };
};
