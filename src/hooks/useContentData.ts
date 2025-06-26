import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  filename: string;
  original_filename: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  entity_type?: string;
  entity_id?: string;
  alt_text?: string;
  description?: string;
  is_featured: boolean;
  category: string;
  created_at: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image_url: string;
  cta_text?: string;
  cta_link?: string;
  order_index: number;
  active: boolean;
}

export interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
  description?: string;
  category: 'sponsor' | 'media' | 'institutional';
  order_index: number;
  active: boolean;
}

export interface StatisticData {
  total_teams: number;
  total_players: number;
  total_games: number;
  total_clubs: number;
}

export const useContentData = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [eventsData, setEventsData] = useState<EventItem[]>([]);
  const [galleryData, setGalleryData] = useState<MediaItem[]>([]);
  const [heroSlidesData, setHeroSlidesData] = useState<HeroSlide[]>([]);
  const [partnersData, setPartnersData] = useState<Partner[]>([]);
  const [statisticsData, setStatisticsData] = useState<StatisticData>({
    total_teams: 0,
    total_players: 0,
    total_games: 0,
    total_clubs: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isContentLoading, setIsContentLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNewsData(data || []);
    } catch (err: any) {
      console.error('Error fetching news:', err);
      // Fallback data for testing
      setNewsData([
        {
          id: '1',
          title: 'FCBB anuncia nova época 2025',
          summary: 'A Federação Cabo-verdiana de Basquetebol apresenta os planos para a nova época desportiva.',
          content: 'Conteúdo completo da notícia sobre a nova época...',
          category: 'geral',
          status: 'publicado',
          featured_image: '/api/placeholder/600/400',
          author: 'FCBB',
          tags: 'basquete,época,2025',
          publish_date: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Seleção Nacional convocada',
          summary: 'Lista de atletas convocados para os próximos jogos internacionais.',
          content: 'Detalhes sobre a convocatória da seleção nacional...',
          category: 'selecoes',
          status: 'publicado',
          featured_image: '/api/placeholder/600/400',
          author: 'FCBB',
          tags: 'seleção,convocatória',
          publish_date: new Date(Date.now() - 86400000).toISOString(),
          created_at: new Date(Date.now() - 86400000).toISOString(),
          updated_at: new Date(Date.now() - 86400000).toISOString(),
        }
      ]);
    }
  };

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEventsData(data || []);
    } catch (err: any) {
      console.error('Error fetching events:', err);
      // Fallback data for testing
      setEventsData([
        {
          id: '1',
          title: 'Campeonato Nacional 2025',
          description: 'Início do Campeonato Nacional de Basquetebol',
          event_date: new Date(Date.now() + 7 * 86400000).toISOString(),
          location: 'Pavilhão Nacional, Praia',
          type: 'competição',
          status: 'agendado',
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Assembleia Geral FCBB',
          description: 'Assembleia Geral Ordinária da Federação',
          event_date: new Date(Date.now() + 14 * 86400000).toISOString(),
          location: 'Sede FCBB, Praia',
          type: 'institucional',
          status: 'agendado',
          created_at: new Date().toISOString(),
        }
      ]);
    }
  };

  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase
        .from('media_files')
        .select('*')
        .eq('category', 'gallery')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGalleryData(data || []);
    } catch (err: any) {
      console.error('Error fetching gallery:', err);
      // Fallback data for testing
      setGalleryData([
        {
          id: '1',
          filename: 'game1.jpg',
          original_filename: 'Jogo Final.jpg',
          file_path: '/api/placeholder/400/300',
          file_size: 1024000,
          mime_type: 'image/jpeg',
          entity_type: 'gallery',
          alt_text: 'Final do campeonato',
          description: 'Momento decisivo da final',
          is_featured: true,
          category: 'gallery',
          created_at: new Date().toISOString(),
        }
      ]);
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
      setHeroSlidesData(data || []);
    } catch (err: any) {
      console.error('Error fetching hero slides:', err);
      // Fallback data
      setHeroSlidesData([
        {
          id: 'default-1',
          title: 'FCBB - Federação Cabo-verdiana de Basquetebol',
          subtitle: 'Promovendo o basquetebol em Cabo Verde',
          description: 'Acompanhe as últimas notícias, resultados e competições do basquetebol cabo-verdiano.',
          image_url: '/lovable-uploads/39194785-9ce8-4849-82cb-ad92f0086855.png',
          cta_text: 'Ver Mais',
          cta_link: '/sobre',
          order_index: 0,
          active: true
        }
      ]);
    }
  };

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setPartnersData(data || []);
    } catch (err: any) {
      console.error('Error fetching partners:', err);
      setPartnersData([]);
    }
  };

  const fetchStatistics = async () => {
    try {
      // This would typically come from a view or computed query
      const stats = {
        total_teams: 16,
        total_players: 240,
        total_games: 48,
        total_clubs: 24
      };
      setStatisticsData(stats);
    } catch (err: any) {
      console.error('Error fetching statistics:', err);
    }
  };

  const createNews = async (newsData: Omit<NewsItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('news')
        .insert([newsData])
        .select()
        .single();

      if (error) throw error;

      setNewsData(prev => [data, ...prev]);
      toast({
        title: "Sucesso",
        description: "Notícia criada com sucesso!",
      });
      return { data, error: null };
    } catch (err: any) {
      console.error('Error creating news:', err);
      toast({
        title: "Erro",
        description: "Erro ao criar notícia",
        variant: "destructive",
      });
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

      setNewsData(prev => prev.map(item => item.id === id ? data : item));
      toast({
        title: "Sucesso",
        description: "Notícia atualizada com sucesso!",
      });
      return { data, error: null };
    } catch (err: any) {
      console.error('Error updating news:', err);
      toast({
        title: "Erro",
        description: "Erro ao atualizar notícia",
        variant: "destructive",
      });
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

      setNewsData(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Sucesso",
        description: "Notícia eliminada com sucesso!",
      });
      return { error: null };
    } catch (err: any) {
      console.error('Error deleting news:', err);
      toast({
        title: "Erro",
        description: "Erro ao eliminar notícia",
        variant: "destructive",
      });
      return { error: err };
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setIsContentLoading(true);
      setError(null);
      
      try {
        await Promise.all([
          fetchNews(),
          fetchEvents(),
          fetchGallery(),
          fetchHeroSlides(),
          fetchPartners(),
          fetchStatistics()
        ]);
      } catch (err: any) {
        setError(err.message);
        console.error('Error loading data:', err);
      } finally {
        setIsLoading(false);
        setIsContentLoading(false);
      }
    };

    loadData();
  }, []);

  const refetch = () => {
    fetchNews();
    fetchEvents();
    fetchGallery();
    fetchHeroSlides();
    fetchPartners();
    fetchStatistics();
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
        delete: deleteNews,
      }
    }
  };
};
