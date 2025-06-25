
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { NewsItem } from '@/types/backend';

export const useNewsData = () => {
  const { data: newsData = [], isLoading: newsLoading, error: newsError } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase.from('news').select('*');
      if (error) throw error;
      return data || [];
    },
  });

  // Transform news data to match interface
  const news: NewsItem[] = newsData.map(item => ({
    ...item,
    views_count: (item as any).views_count || 0
  }));

  // Published news
  const publishedNews = news.filter(item => item.published === true);

  return {
    news,
    publishedNews,
    newsData: news, // For backward compatibility
    newsLoading,
    newsError
  };
};
