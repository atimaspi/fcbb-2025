
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from './PageLayout';
import { useContentData } from '@/hooks/useContentData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Search, User } from 'lucide-react';

const NewsPage = () => {
  const { newsData, isLoading } = useContentData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');

  const publishedNews = newsData.filter(news => news.status === 'publicado');

  const filteredNews = publishedNews.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (news.summary && news.summary.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'todas' || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'todas', label: 'Todas as Categorias' },
    { value: 'geral', label: 'Geral' },
    { value: 'competicoes', label: 'Competições' },
    { value: 'selecoes', label: 'Seleções' },
    { value: 'clubes', label: 'Clubes' },
    { value: 'formacao', label: 'Formação' },
    { value: 'arbitragem', label: 'Arbitragem' }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryLabel = (category: string) => {
    const categoryObj = categories.find(c => c.value === category);
    return categoryObj?.label || category;
  };

  if (isLoading) {
    return (
      <PageLayout title="Notícias" description="Últimas notícias da FCBB">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cv-blue"></div>
          <span className="ml-2">A carregar notícias...</span>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="Notícias FCBB" 
      description="Acompanhe as últimas notícias e desenvolvimentos da Federação Cabo-verdiana de Basquetebol"
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-cv-blue mb-4">Notícias FCBB</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mantenha-se informado sobre as últimas notícias, resultados e desenvolvimentos 
            do basquetebol cabo-verdiano.
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Pesquisar notícias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cv-blue"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          
          {(searchTerm || selectedCategory !== 'todas') && (
            <div className="mt-4 text-sm text-gray-600">
              {filteredNews.length} notícia{filteredNews.length !== 1 ? 's' : ''} encontrada{filteredNews.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {/* Lista de Notícias */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <article key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {news.featured_image && (
                  <div className="aspect-video">
                    <img
                      src={news.featured_image}
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-cv-blue text-white text-xs">
                      {getCategoryLabel(news.category)}
                    </Badge>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(news.publish_date)}
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {news.title}
                  </h2>
                  
                  {news.summary && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {news.summary}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    {news.author && (
                      <div className="flex items-center text-gray-500 text-sm">
                        <User className="h-4 w-4 mr-1" />
                        {news.author}
                      </div>
                    )}
                    
                    <Link to={`/noticias/${news.id}`}>
                      <Button size="sm" className="bg-cv-blue hover:bg-cv-blue/90">
                        Ler Mais
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Nenhuma notícia encontrada
            </h3>
            <p className="text-gray-600 mb-8">
              {searchTerm || selectedCategory !== 'todas' 
                ? 'Tente ajustar os filtros de pesquisa.'
                : 'Não há notícias disponíveis no momento.'
              }
            </p>
            {(searchTerm || selectedCategory !== 'todas') && (
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('todas');
                }}
                variant="outline"
              >
                Limpar Filtros
              </Button>
            )}
          </div>
        )}

        {/* Call to Action */}
        {filteredNews.length > 0 && (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Quer ficar sempre atualizado com as últimas notícias do basquetebol cabo-verdiano?
            </p>
            <Button className="bg-cv-red hover:bg-cv-red/90">
              Subscrever Newsletter
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default NewsPage;
