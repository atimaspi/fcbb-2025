
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Event {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  location?: string;
  type: string;
  status: 'agendado' | 'cancelado' | 'finalizado';
  created_at: string;
}

export const useEventsData = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setEventsLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) throw error;
      
      // Map event data with proper status handling
      const mappedData = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        event_date: item.event_date,
        location: item.location,
        type: item.type,
        status: 'agendado' as 'agendado' | 'cancelado' | 'finalizado',
        created_at: item.created_at
      }));
      
      setEvents(mappedData);
      setEventsError(null);
    } catch (err: any) {
      console.error('Error fetching events:', err);
      setEventsError(err.message);
      setEvents([]);
    } finally {
      setEventsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    eventsLoading,
    eventsError,
    refetchEvents: fetchEvents
  };
};
