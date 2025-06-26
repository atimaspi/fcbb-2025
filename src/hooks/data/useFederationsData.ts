
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Federation {
  id: string;
  name: string;
  abbreviation?: string;
  description?: string;
  contact_email?: string;
  contact_phone?: string;
  website?: string;
  created_at: string;
}

export const useFederationsData = () => {
  const [federations, setFederations] = useState<Federation[]>([]);
  const [federationsLoading, setFederationsLoading] = useState(true);
  const [federationsError, setFederationsError] = useState<string | null>(null);

  const fetchFederations = async () => {
    try {
      setFederationsLoading(true);
      const { data, error } = await supabase
        .from('federations')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setFederations(data || []);
      setFederationsError(null);
    } catch (err: any) {
      console.error('Error fetching federations:', err);
      setFederationsError(err.message);
      setFederations([]);
    } finally {
      setFederationsLoading(false);
    }
  };

  useEffect(() => {
    fetchFederations();
  }, []);

  return {
    federations,
    federationsLoading,
    federationsError,
    refetchFederations: fetchFederations
  };
};
