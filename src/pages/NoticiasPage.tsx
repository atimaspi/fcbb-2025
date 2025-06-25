
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Calendar, Eye, Share2, Filter } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const NoticiasPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'Todas as Categorias' },
    { value: 'selecoes', label: 'Seleções' },
    { value: 'competicoes', label: 'Competições' },
    { value: 'clubes', label: 'Clubes' },
    { value: 'internacional', label: 'Internacional' },
    { value: 'formacao', label: 'Formação' }
  ];

  const news = [
    {
      id: 1,
      title: "Seleção Nacional convocada para o AfroBasket 2025",
      excerpt: "O selecionador nacional Mário Palma convocou 16 jogadores para os treinos de preparação do torneio continental.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2970",
      category: "selecoes",
      date: "2024-01-15T18:00:00Z",
      readTime: "5 min",
      views: "2.8k",
      featured: true
    },
    {
      id: 2,
      title: "CD Travadores conquista Liga Nacional 2024",
      excerpt: "Em final emocionante, o CD Travadores venceu o Sporting CV por 89-86 e sagrou-se campeão nacional.",
      image: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?q=80&w=2970",
      category: "competicoes",
      date: "2024-01-14T16:30:00Z",
      readTime: "4 min",
      views: "3.5k",
      featured: true
    },
    {
      id: 3,
      title: "Novo pavilhão inaugurado na ilha do Fogo",
      excerpt: "Infraestrutura moderna com capacidade para 2.000 espectadores vai revolucionar o basquetebol na região.",
      image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2969",
      category: "clubes",
      date: "2024-01-13T14:00:00Z",
      readTime: "3 min",
      views: "1.9k"
    },
    {
      id: 4,
      title: "Protocolo assinado com Federação Portuguesa",
      excerpt: "Acordo visa intercâmbio técnico e formação de jogadores jovens entre os dois países.",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2990",
      category: "internacional",
      date: "2024-01-12T11:00:00Z",
      readTime: "6 min",
      views: "2.2k"
    },
    {
      id: 5,
      title: "Curso de arbitragem Level 2 em Santiago",
      excerpt: "FCBB promove formação avançada para árbitros com instrutores certificados pela FIBA África.",
      image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=2970",
      category: "formacao",
      date: "2024-01-11T09:30:00Z",
      readTime: "3 min",
      views: "1.7k"
    },
    {
      id: 6,
      title: "Liga Nacional Feminina arranca com 10 equipas",
      excerpt: "Nova época promete ser a mais competitiva de sempre com equipas de 6 ilhas diferentes.",
      image: "https://images.unsplash.com/photo-1594736797933-d0aa4cb6a2dc?q=80&w=2970",
      category: "competicoes",
      date: "2024-01-10T15:45:00Z",
      readTime: "4 min",
      views: "2.1k"
    }
  ];

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredNews = filteredNews.filter(item => item.featured);
  const regularNews = filteredNews.filter(item => !item.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <PageLayout
      title="Notícias"
      description="Todas as últimas notícias do basquetebol cabo-verdiano"
    >
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Pesquisar notícias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-64">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-cv-blue mb-6">Destaques</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredNews.map((news) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
              >
                <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-cv-red">
                  <div className="relative">
                    <img 
                      src={news.image}
                      alt={news.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <Badge className="absolute top-4 left-4 bg-cv-red text-white">
                      {categories.find(c => c.value === news.category)?.label}
                    </Badge>
                    <div className="absolute top-4 right-4 flex items-center space-x-2">
                      <div className="flex items-center text-white text-sm bg-black/50 rounded-full px-3 py-1">
                        <Eye className="w-3 h-3 mr-1" />
                        {news.views}
                      </div>
                      <button className="text-white hover:text-cv-yellow transition-colors bg-black/50 rounded-full p-2">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-bold text-cv-blue mb-3 hover:text-cv-red transition-colors">
                      {news.title}
                    </CardTitle>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {news.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(news.date)}
                        </div>
                        <span>{news.readTime}</span>
                      </div>
                      <Button variant="ghost" className="text-cv-blue hover:text-cv-red p-0">
                        Ler mais →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Regular News */}
      <div>
        <h2 className="text-2xl font-bold text-cv-blue mb-6">Todas as Notícias</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularNews.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative">
                  <img 
                    src={news.image}
                    alt={news.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-cv-blue text-white text-xs">
                    {categories.find(c => c.value === news.category)?.label}
                  </Badge>
                  <div className="absolute top-3 right-3 flex items-center text-white text-xs bg-black/50 rounded-full px-2 py-1">
                    <Eye className="w-3 h-3 mr-1" />
                    {news.views}
                  </div>
                </div>
                <CardContent className="p-4">
                  <CardTitle className="text-lg font-semibold text-cv-blue mb-2 hover:text-cv-red transition-colors line-clamp-2">
                    {news.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {news.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatDate(news.date)}</span>
                    <span>{news.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {filteredNews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhuma notícia encontrada com os filtros selecionados.</p>
        </div>
      )}
    </PageLayout>
  );
};

export default NoticiasPage;
