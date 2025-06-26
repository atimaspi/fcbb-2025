
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
  description?: string;
  regulations_url?: string;
  created_at: string;
}

export const useCompetitionsData = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [competitionsLoading, setCompetitionsLoading] = useState(true);
  const [competitionsError, setCompetitionsError] = useState<string | null>(null);

  const fetchCompetitions = async () => {
    try {
      setCompetitionsLoading(true);
      // Using 'championships' table as 'competitions' table doesn't exist in current schema
      const { data, error } = await supabase
        .from('championships')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      
      // Map championship data to competition structure
      const mappedData = (data || []).map(item => ({
        id: item.id,
        name: item.name || '',
        season: item.season || '',
        type: item.type || '',
        status: (item.status as 'upcoming' | 'ongoing' | 'finished') || 'upcoming',
        start_date: item.start_date,
        end_date: item.end_date,
        description: item.description,
        regulations_url: item.description, // Using description as regulations_url fallback
        created_at: item.created_at
      }));
      
      setCompetitions(mappedData);
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
