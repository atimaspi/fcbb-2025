
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
  description?: string;
  image_url: string;
  cta_text?: string;
  cta_url?: string;
  cta_link?: string;
  order: number;
  active: boolean;
  created_at: string;
}

export interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
  description?: string;
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
      
      // Map news data with proper type handling
      const mappedData = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        summary: item.excerpt || '',
        content: item.content,
        category: item.category,
        status: (item.status as 'rascunho' | 'pendente' | 'publicado') || 'rascunho',
        featured_image: item.featured_image_url,
        author: item.author,
        tags: Array.isArray(item.tags) ? item.tags.join(', ') : (item.tags || ''),
        publish_date: item.created_at,
        created_at: item.created_at,
        updated_at: item.updated_at || item.created_at
      }));
      
      setNewsData(mappedData);
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
        .order('event_date', { ascending: true })
        .limit(10);

      if (error) throw error;
      
      // Map events data with proper status handling
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
      
      setEventsData(mappedData);
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
      
      // Map gallery data with proper type handling
      const mappedData = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        media_type: 'image' as 'image' | 'video' | 'document',
        file_url: '/placeholder.svg',
        thumbnail_url: '/placeholder.svg',
        created_at: item.created_at
      }));
      
      setGalleryData(mappedData);
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
        .order('order_index', { ascending: true });

      if (error) throw error;
      
      // Map hero slides data with proper order handling
      const mappedData = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        description: item.description,
        image_url: item.image_url,
        cta_text: item.cta_text,
        cta_url: item.cta_link,
        cta_link: item.cta_link,
        order: item.order_index || 0,
        active: item.active,
        created_at: item.created_at
      }));
      
      setHeroSlidesData(mappedData);
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
        .order('name', { ascending: true });

      if (error) throw error;
      
      // Map partners data with default order
      const mappedData = (data || []).map((item, index) => ({
        id: item.id,
        name: item.name,
        logo_url: item.logo_url,
        website_url: item.website_url,
        description: item.description,
        category: item.category,
        order: index,
        active: item.active,
        created_at: item.created_at
      }));
      
      setPartnersData(mappedData);
    } catch (err: any) {
      console.error('Error fetching partners:', err);
      setPartnersData([]);
    }
  };

  const fetchStatistics = async () => {
    try {
      // Statistics table doesn't exist, use fallback data
      const fallbackStats: StatisticData[] = [
        {
          id: '1',
          stat_name: 'Equipas Registadas',
          stat_value: '24',
          icon_name: 'Users',
          description: 'Total de equipas na federação',
          order: 1,
          active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          stat_name: 'Jogadores Ativos',
          stat_value: '480',
          icon_name: 'Trophy',
          description: 'Jogadores ativos nas competições',
          order: 2,
          active: true,
          created_at: new Date().toISOString()
        }
      ];
      
      setStatisticsData(fallbackStats);
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
      // Transform data to match database schema
      const dbData = {
        title: newsData.title,
        content: newsData.content,
        category: newsData.category,
        status: newsData.status,
        author: newsData.author,
        excerpt: newsData.summary,
        featured_image_url: newsData.featured_image,
        tags: newsData.tags ? [newsData.tags] : [] // Convert string to array
      };

      const { data, error } = await supabase
        .from('news')
        .insert([dbData])
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
      // Transform data to match database schema
      const dbData: any = {};
      if (newsData.title) dbData.title = newsData.title;
      if (newsData.content) dbData.content = newsData.content;
      if (newsData.category) dbData.category = newsData.category;
      if (newsData.status) dbData.status = newsData.status;
      if (newsData.author) dbData.author = newsData.author;
      if (newsData.summary) dbData.excerpt = newsData.summary;
      if (newsData.featured_image) dbData.featured_image_url = newsData.featured_image;
      if (newsData.tags) dbData.tags = [newsData.tags]; // Convert string to array

      const { data, error } = await supabase
        .from('news')
        .update(dbData)
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
