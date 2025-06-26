
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Referee {
  id: string;
  name: string;
  license_number?: string;
  level: string;
  phone?: string;
  email?: string;
  status: 'ativo' | 'inativo' | 'suspenso';
  created_at: string;
}

export const useRefereesData = () => {
  const [referees, setReferees] = useState<Referee[]>([]);
  const [refereesLoading, setRefereesLoading] = useState(true);
  const [refereesError, setRefereesError] = useState<string | null>(null);

  const fetchReferees = async () => {
    try {
      setRefereesLoading(true);
      const { data, error } = await supabase
        .from('referees')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setReferees(data || []);
      setRefereesError(null);
    } catch (err: any) {
      console.error('Error fetching referees:', err);
      setRefereesError(err.message);
      setReferees([]);
    } finally {
      setRefereesLoading(false);
    }
  };

  useEffect(() => {
    fetchReferees();
  }, []);

  return {
    referees,
    refereesLoading,
    refereesError,
    refetchReferees: fetchReferees
  };
};
