
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from './PageLayout';
import { useContentData, NewsItem } from '@/hooks/useContentData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { newsData, isLoading } = useContentData();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!isLoading && newsData.length > 0) {
      const foundNews = newsData.find(n => n.id === id && n.status === 'publicado');
      if (foundNews) {
        setNews(foundNews);
      } else {
        setNotFound(true);
      }
    }
  }, [id, newsData, isLoading]);

  if (isLoading) {
    return (
      <PageLayout title="A carregar..." description="">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cv-blue"></div>
          <span className="ml-2">A carregar notícia...</span>
        </div>
      </PageLayout>
    );
  }

  if (notFound || !news) {
    return (
      <PageLayout title="Notícia não encontrada" description="">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Notícia não encontrada
          </h1>
          <p className="text-gray-600 mb-8">
            A notícia que procura não existe ou foi removida.
          </p>
          <Button onClick={() => navigate('/noticias')} className="bg-cv-blue hover:bg-cv-blue/90">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar às Notícias
          </Button>
        </div>
      </PageLayout>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      geral: 'Geral',
      competicoes: 'Competições',
      selecoes: 'Seleções',
      clubes: 'Clubes',
      formacao: 'Formação',
      arbitragem: 'Arbitragem'
    };
    return labels[category] || category;
  };

  return (
    <PageLayout title={news.title} description={news.summary || ''}>
      <div className="max-w-4xl mx-auto">
        {/* Botão Voltar */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/noticias')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar às Notícias
          </Button>
        </div>

        {/* Cabeçalho da Notícia */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {news.featured_image && (
            <div className="aspect-video w-full">
              <img
                src={news.featured_image}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            {/* Categoria */}
            <div className="mb-4">
              <Badge className="bg-cv-blue text-white">
                {getCategoryLabel(news.category)}
              </Badge>
            </div>

            {/* Título */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {news.title}
            </h1>

            {/* Metadados */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 border-b border-gray-200 pb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(news.publish_date)}</span>
              </div>
              
              {news.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{news.author}</span>
                </div>
              )}

              {news.tags && (
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <div className="flex gap-2">
                    {news.tags.split(',').map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resumo */}
            {news.summary && (
              <div className="text-lg text-gray-700 mb-8 font-medium leading-relaxed bg-gray-50 p-6 rounded-lg border-l-4 border-cv-blue">
                {news.summary}
              </div>
            )}

            {/* Conteúdo */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-800 leading-relaxed"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {news.content}
              </div>
            </div>

            {/* Rodapé */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Publicado em {formatDate(news.publish_date)}
                {news.created_at !== news.updated_at && (
                  <span> • Atualizado em {formatDate(news.updated_at)}</span>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Botão de Ação */}
        <div className="mt-8 text-center">
          <Button 
            onClick={() => navigate('/noticias')}
            className="bg-cv-blue hover:bg-cv-blue/90"
          >
            Ver Mais Notícias
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default NewsDetailPage;
