
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, Eye, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModernNews = () => {
  const featuredNews = {
    id: 1,
    title: "CD Travadores conquista SuperTaça 2024 em jogo épico",
    excerpt: "Numa final emocionante disputada no Pavilhão Adão e Eva, o CD Travadores venceu o Sporting CV por 89-86 após prolongamento, conquistando assim a SuperTaça 2024 de Cabo Verde.",
    image: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?q=80&w=2970",
    category: "Competições",
    date: "2024-01-15T18:00:00Z",
    readTime: "4 min",
    views: "3.2k",
    featured: true
  };

  const regularNews = [
    {
      id: 2,
      title: "Seleção Nacional convocada para o Pré-AfroBasket 2025",
      excerpt: "O selecionador nacional Mário Palma convocou 16 jogadores para os treinos de preparação para o torneio de qualificação.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2970",
      category: "Seleções",
      date: "2024-01-14T10:00:00Z",
      readTime: "3 min",
      views: "2.8k"
    },
    {
      id: 3,
      title: "Novo pavilhão multidesportivo inaugurado na Praia",
      excerpt: "Com capacidade para 3.000 espectadores, a nova infraestrutura vai receber jogos da Liga Nacional a partir de fevereiro.",
      image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2969",
      category: "Infraestruturas",
      date: "2024-01-13T14:30:00Z",
      readTime: "5 min",
      views: "1.9k"
    },
    {
      id: 4,
      title: "Liga Nacional Feminina arranca com 12 equipas",
      excerpt: "A nova época da Liga Nacional Feminina promete ser a mais competitiva de sempre com a participação de equipas de todas as ilhas.",
      image: "https://images.unsplash.com/photo-1594736797933-d0aa4cb6a2dc?q=80&w=2970",
      category: "Liga Feminina",
      date: "2024-01-12T16:00:00Z",
      readTime: "3 min",
      views: "2.1k"
    },
    {
      id: 5,
      title: "Curso de arbitragem Level 1 em São Vicente",
      excerpt: "A FCBB promove formação avançada para árbitros com instrutores certificados pela FIBA África.",
      image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=2970",
      category: "Formação",
      date: "2024-01-11T09:00:00Z",
      readTime: "2 min",
      views: "1.5k"
    },
    {
      id: 6,
      title: "Acordo de cooperação com a Federação Portuguesa",
      excerpt: "Protocolo visa intercâmbio técnico e formação de jogadores jovens entre os dois países.",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2990",
      category: "Parcerias",
      date: "2024-01-10T11:00:00Z",
      readTime: "4 min",
      views: "2.7k"
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-PT', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="cv-container">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-cv-blue mb-4"
          >
            Últimas Notícias
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Fique por dentro de tudo o que acontece no basquetebol cabo-verdiano
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured News - Large Card */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group cursor-pointer">
              <div className="relative">
                <img 
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <Badge className="absolute top-4 left-4 bg-cv-red text-white border-none">
                  {featuredNews.category}
                </Badge>
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <div className="flex items-center text-white text-sm bg-black/50 rounded-full px-3 py-1">
                    <Eye className="w-3 h-3 mr-1" />
                    {featuredNews.views}
                  </div>
                  <button className="text-white hover:text-cv-yellow transition-colors bg-black/50 rounded-full p-2">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-cv-blue mb-4 group-hover:text-cv-red transition-colors leading-tight">
                  {featuredNews.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredNews.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(featuredNews.date)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredNews.readTime}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-cv-blue hover:text-cv-red hover:bg-cv-blue/5 p-0 font-semibold"
                    asChild
                  >
                    <Link to={`/noticias/${featuredNews.id}`}>
                      Ler mais <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Regular News - Smaller Cards */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {regularNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="flex">
                    <div className="w-28 h-24 flex-shrink-0">
                      <img 
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4 flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs border-cv-blue text-cv-blue">
                          {news.category}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <Eye className="w-3 h-3 mr-1" />
                          {news.views}
                        </div>
                      </div>
                      <h4 className="font-semibold text-sm text-cv-blue mb-2 group-hover:text-cv-red transition-colors line-clamp-2 leading-tight">
                        {news.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{formatDate(news.date)}</span>
                        <span>{news.readTime}</span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full border-cv-blue text-cv-blue hover:bg-cv-blue hover:text-white transition-all duration-300"
              asChild
            >
              <Link to="/noticias">
                <ArrowRight className="w-4 h-4 mr-2" />
                Ver Todas as Notícias
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ModernNews;
