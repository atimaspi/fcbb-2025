
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, TrendingUp, Users, MapPin } from 'lucide-react';

const AtletaEmFoco = () => {
  const featuredAthlete = {
    name: "João Silva",
    position: "Base",
    club: "CD Travadores",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400",
    stats: {
      points: "18.5",
      assists: "7.2", 
      rebounds: "4.8",
      games: "24"
    },
    achievements: [
      "MVP Liga Nacional 2024",
      "Melhor Jogador Jovem 2023",
      "Selecionado Nacional"
    ],
    bio: "Aos 23 anos, João Silva é uma das maiores promessas do basquetebol cabo-verdiano. Natural da Praia, começou a jogar aos 12 anos e rapidamente se destacou pela sua visão de jogo e liderança em campo."
  };

  return (
    <section className="py-16 bg-gradient-to-br from-cv-blue/5 to-cv-red/5">
      <div className="cv-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-cv-blue mb-4">
            Atleta em Foco
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conheça os talentos que brilham nas quadras cabo-verdianas
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="max-w-4xl mx-auto overflow-hidden shadow-2xl">
            <div className="md:flex">
              {/* Image Section */}
              <div className="md:w-2/5 relative">
                <img 
                  src={featuredAthlete.image}
                  alt={featuredAthlete.name}
                  className="w-full h-64 md:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cv-blue/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{featuredAthlete.name}</h3>
                  <p className="text-cv-yellow font-semibold">{featuredAthlete.position}</p>
                  <div className="flex items-center mt-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{featuredAthlete.club}</span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <CardContent className="md:w-3/5 p-8">
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-cv-blue mb-3">Estatísticas da Temporada</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-cv-blue/5 rounded-lg">
                      <div className="text-2xl font-bold text-cv-blue">{featuredAthlete.stats.points}</div>
                      <div className="text-sm text-gray-600">Pontos/Jogo</div>
                    </div>
                    <div className="text-center p-4 bg-cv-red/5 rounded-lg">
                      <div className="text-2xl font-bold text-cv-red">{featuredAthlete.stats.assists}</div>
                      <div className="text-sm text-gray-600">Assistências</div>
                    </div>
                    <div className="text-center p-4 bg-cv-yellow/10 rounded-lg">
                      <div className="text-2xl font-bold text-cv-blue">{featuredAthlete.stats.rebounds}</div>
                      <div className="text-sm text-gray-600">Ressaltos</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-700">{featuredAthlete.stats.games}</div>
                      <div className="text-sm text-gray-600">Jogos</div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-xl font-bold text-cv-blue mb-3 flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Conquistas
                  </h4>
                  <div className="space-y-2">
                    {featuredAthlete.achievements.map((achievement, index) => (
                      <Badge key={index} variant="outline" className="mr-2 mb-2 border-cv-blue text-cv-blue">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-xl font-bold text-cv-blue mb-3">Sobre o Atleta</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {featuredAthlete.bio}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-cv-blue hover:bg-cv-blue/90">
                    <Users className="w-4 h-4 mr-2" />
                    Ver Perfil Completo
                  </Button>
                  <Button variant="outline" className="border-cv-red text-cv-red hover:bg-cv-red hover:text-white">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Estatísticas Detalhadas
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default AtletaEmFoco;
