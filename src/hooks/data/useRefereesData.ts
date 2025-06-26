
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
  first_name?: string;
  last_name?: string;
  island?: string;
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
        .order('first_name', { ascending: true });

      if (error) throw error;
      
      // Map referee data with proper structure
      const mappedData = (data || []).map(item => ({
        id: item.id,
        name: `${item.first_name || ''} ${item.last_name || ''}`.trim() || 'Unknown',
        license_number: item.license_number,
        level: item.level,
        phone: item.phone,
        email: item.email,
        status: (item.active === false ? 'inativo' : 'ativo') as 'ativo' | 'inativo' | 'suspenso',
        first_name: item.first_name,
        last_name: item.last_name,
        island: item.island,
        created_at: item.created_at
      }));
      
      setReferees(mappedData);
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
