
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
  excerpt?: string;
  published?: boolean;
  featured?: boolean;
  featured_image_url?: string;
  video_url?: string;
  gallery_images?: any[];
  attachments?: any[];
  created_at: string;
  updated_at: string;
}

export const useNewsData = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
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
      
      // Map news data with proper type handling
      const mappedData = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        summary: item.excerpt || '', // Using excerpt as summary fallback
        content: item.content,
        category: item.category,
        status: (item.status as 'rascunho' | 'pendente' | 'publicado') || 'rascunho',
        featured_image: item.featured_image_url,
        author: item.author,
        tags: Array.isArray(item.tags) ? item.tags.join(', ') : (item.tags || ''),
        publish_date: item.created_at, // Using created_at since published_at doesn't exist
        excerpt: item.excerpt,
        published: item.published,
        featured: item.featured,
        featured_image_url: item.featured_image_url,
        video_url: item.video_url,
        gallery_images: Array.isArray(item.gallery_images) ? item.gallery_images : [],
        attachments: Array.isArray(item.attachments) ? item.attachments : [],
        created_at: item.created_at,
        updated_at: item.updated_at
      }));
      
      setNewsData(mappedData);
      setNewsError(null);
    } catch (err: any) {
      console.error('Error fetching news:', err);
      setNewsError(err.message);
      setNewsData([]);
    } finally {
      setNewsLoading(false);
    }
  };

  const news = newsData;
  const publishedNews = newsData.filter(item => item.status === 'publicado');

  useEffect(() => {
    fetchNews();
  }, []);

  return {
    news,
    publishedNews,
    newsData,
    newsLoading,
    newsError,
    refetchNews: fetchNews
  };
};
