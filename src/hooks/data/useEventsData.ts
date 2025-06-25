
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Event } from '@/types/backend';

export const useEventsData = () => {
  const { data: eventsData = [], isLoading: eventsLoading, error: eventsError } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase.from('events').select('*');
      if (error) throw error;
      return data || [];
    },
  });

  // Transform events data to match interface
  const events: Event[] = eventsData.map(event => ({
    ...event,
    event_type: 'evento_social' as const,
    status: 'agendado' as const,
    updated_at: (event as any).updated_at || event.created_at
  }));

  // Active events
  const activeEvents = events.filter(event => {
    const eventDate = new Date(event.event_date);
    return eventDate >= new Date();
  });

  return {
    events,
    activeEvents,
    eventsData: events, // For backward compatibility
    eventsLoading,
    eventsError
  };
};
