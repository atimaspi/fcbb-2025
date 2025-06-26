
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface RegionalAssociation {
  id: string;
  name: string;
  island: string;
  contact_email?: string;
  contact_phone?: string;
  status: 'active' | 'inactive';
  created_at: string;
}

export const useRegionalAssociationsData = () => {
  const [regionalAssociations, setRegionalAssociations] = useState<RegionalAssociation[]>([]);
  const [regionalAssociationsLoading, setRegionalAssociationsLoading] = useState(true);
  const [regionalAssociationsError, setRegionalAssociationsError] = useState<string | null>(null);

  const fetchRegionalAssociations = async () => {
    try {
      setRegionalAssociationsLoading(true);
      const { data, error } = await supabase
        .from('regional_associations')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setRegionalAssociations(data || []);
      setRegionalAssociationsError(null);
    } catch (err: any) {
      console.error('Error fetching regional associations:', err);
      setRegionalAssociationsError(err.message);
      setRegionalAssociations([]);
    } finally {
      setRegionalAssociationsLoading(false);
    }
  };

  useEffect(() => {
    fetchRegionalAssociations();
  }, []);

  return {
    regionalAssociations,
    regionalAssociationsLoading,
    regionalAssociationsError,
    refetchRegionalAssociations: fetchRegionalAssociations
  };
};
