
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
      
      // Map regional association data with proper structure
      const mappedData = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        island: item.island,
        contact_email: item.contact_email,
        contact_phone: item.contact_phone,
        status: 'active' as 'active' | 'inactive', // Default to active since no status field in DB
        created_at: item.created_at
      }));
      
      setRegionalAssociations(mappedData);
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
