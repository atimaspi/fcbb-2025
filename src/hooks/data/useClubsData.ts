
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Club {
  id: string;
  name: string;
  abbreviation?: string;
  city?: string;
  island?: string;
  founded_year?: number;
  logo_url?: string;
  address?: string;
  contact_phone?: string;
  contact_email?: string;
  website?: string;
  description?: string;
  status: 'active' | 'inactive';
  active?: boolean;
  created_at: string;
}

export const useClubsData = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [clubsLoading, setClubsLoading] = useState(true);
  const [clubsError, setClubsError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchClubs = async () => {
    try {
      setClubsLoading(true);
      const { data, error } = await supabase
        .from('clubs')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setClubs(data || []);
      setClubsError(null);
    } catch (err: any) {
      console.error('Error fetching clubs:', err);
      setClubsError(err.message);
      // Fallback data
      setClubs([
        {
          id: '1',
          name: 'ABC Basket',
          island: 'São Vicente',
          address: 'Mindelo, São Vicente',
          founded_year: 1988,
          description: 'Clube histórico de São Vicente',
          contact_phone: '+238 232 12 34',
          contact_email: 'abc@basket.cv',
          website: 'www.abcbasket.cv',
          status: 'active',
          active: true,
          created_at: new Date().toISOString()
        }
      ]);
    } finally {
      setClubsLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  return {
    clubs,
    clubsLoading,
    clubsError,
    refetchClubs: fetchClubs
  };
};
