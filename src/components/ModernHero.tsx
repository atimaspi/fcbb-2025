
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Trophy, Users, Calendar, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ModernHero = () => {
  const heroSlides = [
    {
      id: 1,
      title: "Liga Nacional 2024/25",
      subtitle: "Temporada em Curso",
      description: "Acompanhe os melhores momentos da Liga Nacional de Basquetebol de Cabo Verde",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2990",
      ctaText: "Ver Classificações",
      ctaLink: "/competicoes/liga-masculina",
      badge: "AO VIVO"
    },
    {
      id: 2,
      title: "Seleção Nacional",
      subtitle: "Rumo ao AfroBasket 2025",
      description: "A nossa seleção prepara-se para representar Cabo Verde no maior torneio continental",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2970",
      ctaText: "Conhecer Seleção",
      ctaLink: "/selecoes/masculina",
      badge: "CONVOCAÇÕES"
    },
    {
      id: 3,
      title: "Taça de Cabo Verde",
      subtitle: "Final Four 2024",
      description: "As quatro melhores equipas disputam o título mais cobiçado do basquetebol nacional",
      image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2969",
      ctaText: "Ver Calendário",
      ctaLink: "/competicoes/taca",
      badge: "PLAYOFFS"
    }
  ];

  const stats = [
    { label: "Clubes Federados", value: "24+", icon: Trophy },
    { label: "Atletas Registados", value: "1250+", icon: Users },
    { label: "Jogos por Ano", value: "180+", icon: Calendar },
    { label: "Anos de História", value: "38", icon: TrendingUp }
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <Carousel 
        className="w-full h-full"
        opts={{
          align: "start",
          loop: true,
        }}
        autoplay={true}
      >
        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <div className="relative min-h-[90vh] flex items-center justify-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-cv-blue/90 via-cv-blue/70 to-cv-red/60 z-10"></div>
                  <img 
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="relative z-20 cv-container text-center text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="max-w-4xl mx-auto"
                  >
                    <Badge className="mb-6 bg-cv-red text-white border-none px-4 py-2 text-sm font-semibold animate-pulse">
                      {slide.badge}
                    </Badge>
                    
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                      {slide.title}
                    </h1>
                    
                    <h2 className="text-2xl md:text-3xl text-cv-yellow mb-8 font-semibold">
                      {slide.subtitle}
                    </h2>
                    
                    <p className="text-xl md:text-2xl mb-12 text-gray-100 max-w-3xl mx-auto leading-relaxed">
                      {slide.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                      <Button 
                        size="lg" 
                        className="bg-cv-red hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                        asChild
                      >
                        <Link to={slide.ctaLink}>
                          <Play className="mr-2 h-5 w-5" />
                          {slide.ctaText}
                        </Link>
                      </Button>
                      
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-2 border-white text-white hover:bg-white hover:text-cv-blue px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                        asChild
                      >
                        <Link to="/noticias">
                          <ArrowRight className="mr-2 h-5 w-5" />
                          Últimas Notícias
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-8" />
        <CarouselNext className="right-8" />
      </Carousel>

      {/* Statistics Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 py-8 z-30">
        <div className="cv-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-cv-blue rounded-full mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-cv-blue mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
