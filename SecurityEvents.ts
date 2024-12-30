import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type SecurityEvent = Database['public']['Tables']['security_events']['Row'];

export function useSecurityEvents() {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('security_events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching security events:', error);
        return;
      }

      setEvents(data);
      setLoading(false);
    };

    // Initial fetch
    fetchEvents();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('security_events_channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'security_events' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setEvents(prev => [payload.new as SecurityEvent, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { events, loading };
}
