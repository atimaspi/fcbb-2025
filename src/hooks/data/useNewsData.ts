
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

export const useNewsData = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setNewsLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
      setNewsError(null);
    } catch (err: any) {
      console.error('Error fetching news:', err);
      setNewsError(err.message);
      setNews([]);
    } finally {
      setNewsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const publishedNews = news.filter(item => item.status === 'publicado');

  return {
    news,
    publishedNews,
    newsData: news, // alias for compatibility
    newsLoading,
    newsError,
    refetchNews: fetchNews
  };
};
