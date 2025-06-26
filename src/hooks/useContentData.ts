
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface NewsItem {
  id: string;
  title: string;
  summary?: string;
  content: string;
  category: string;
  status: 'rascunho' | 'pendente' | 'publicado';
  featured_image?: string;
  author?: string;
  tags?: string;
  publish_date: string;
  created_at: string;
  updated_at: string;
}

export interface EventItem {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  location?: string;
  type: string;
  status: 'agendado' | 'cancelado' | 'finalizado';
  created_at: string;
}

export interface MediaItem {
  id: string;
  title: string;
  description?: string;
  media_type: 'image' | 'video' | 'document';
  file_url: string;
  thumbnail_url?: string;
  created_at: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  image_url: string;
  cta_text?: string;
  cta_url?: string;
  order: number;
  active: boolean;
  created_at: string;
}

export interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
  category: string;
  order: number;
  active: boolean;
  created_at: string;
}

export interface StatisticData {
  id: string;
  stat_name: string;
  stat_value: string;
  icon_name: string;
  description?: string;
  order: number;
  active: boolean;
  created_at: string;
}

export const useContentData = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [eventsData, setEventsData] = useState<EventItem[]>([]);
  const [galleryData, setGalleryData] = useState<MediaItem[]>([]);
  const [heroSlidesData, setHeroSlidesData] = useState<HeroSlide[]>([]);
  const [partnersData, setPartnersData] = useState<Partner[]>([]);
  const [statisticsData, setStatisticsData] = useState<StatisticData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isContentLoading, setIsContentLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('status', 'publicado')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setNewsData(data || []);
    } catch (err: any) {
      console.error('Error fetching news:', err);
      setNewsData([]);
    }
  };

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'agendado')
        .order('event_date', { ascending: true })
        .limit(10);

      if (error) throw error;
      setEventsData(data || []);
    } catch (err: any) {
      console.error('Error fetching events:', err);
      setEventsData([]);
    }
  };

  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setGalleryData(data || []);
    } catch (err: any) {
      console.error('Error fetching gallery:', err);
      setGalleryData([]);
    }
  };

  const fetchHeroSlides = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .eq('active', true)
        .order('order', { ascending: true });

      if (error) throw error;
      setHeroSlidesData(data || []);
    } catch (err: any) {
      console.error('Error fetching hero slides:', err);
      setHeroSlidesData([]);
    }
  };

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('active', true)
        .order('order', { ascending: true });

      if (error) throw error;
      setPartnersData(data || []);
    } catch (err: any) {
      console.error('Error fetching partners:', err);
      setPartnersData([]);
    }
  };

  const fetchStatistics = async () => {
    try {
      const { data, error } = await supabase
        .from('statistics')
        .select('*')
        .eq('active', true)
        .order('order', { ascending: true });

      if (error) throw error;
      setStatisticsData(data || []);
    } catch (err: any) {
      console.error('Error fetching statistics:', err);
      setStatisticsData([]);
    }
  };

  const refetch = async () => {
    setIsLoading(true);
    setIsContentLoading(true);
    try {
      await Promise.all([
        fetchNews(),
        fetchEvents(),
        fetchGallery(),
        fetchHeroSlides(),
        fetchPartners(),
        fetchStatistics()
      ]);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar dados');
    } finally {
      setIsLoading(false);
      setIsContentLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  const createNews = async (newsData: Omit<NewsItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('news')
        .insert([newsData])
        .select()
        .single();

      if (error) throw error;
      await fetchNews();
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  };

  const updateNews = async (id: string, newsData: Partial<NewsItem>) => {
    try {
      const { data, error } = await supabase
        .from('news')
        .update(newsData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      await fetchNews();
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  };

  const deleteNews = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchNews();
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  return {
    newsData,
    eventsData,
    galleryData,
    heroSlidesData,
    partnersData,
    statisticsData,
    isLoading,
    isContentLoading,
    error,
    refetch,
    operations: {
      news: {
        create: createNews,
        update: updateNews,
        delete: deleteNews
      }
    }
  };
};
