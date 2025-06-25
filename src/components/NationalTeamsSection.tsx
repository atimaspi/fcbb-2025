
import { motion } from 'framer-motion';
import { Users, Calendar, TrendingUp, Trophy, MapPin, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const NationalTeamsSection = () => {
  const teams = [
    {
      id: 1,
      title: "Seleção Masculina Sénior",
      description: "A nossa equipa principal masculina que representa Cabo Verde nos torneios FIBA África e competições internacionais",
      image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=800&h=600&fit=crop",
      stats: { players: 15, ranking: "12º África", nextGame: "FIBA AfroBasket 2025" },
      highlights: ["Qualificação FIBA", "Melhor Ranking Histórico", "5 Vitórias Consecutivas"]
    },
    {
      id: 2,
      title: "Seleção Feminina Sénior",
      description: "Representando o basquetebol feminino cabo-verdiano com orgulho nas competições continentais e internacionais",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=800&h=600&fit=crop",
      stats: { players: 12, ranking: "15º África", nextGame: "FIBA Women's AfroBasket" },
      highlights: ["Crescimento Exponencial", "Programa de Desenvolvimento", "Talentos Emergentes"]
    },
    {
      id: 3,
      title: "Seleções Sub-18",
      description: "O futuro do basquetebol cabo-verdiano, desenvolvendo jovens talentos para as competições continentais juvenis",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&h=600&fit=crop",
      stats: { players: 24, ranking: "Projeto 2030", nextGame: "FIBA U18 AfroBasket" },
      highlights: ["Academia de Talentos", "Intercâmbio Internacional", "Formação Integral"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#002D72] to-[#1a237e] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <circle cx="200" cy="200" r="150" fill="none" stroke="#FFD100" strokeWidth="2"/>
          <circle cx="1000" cy="600" r="200" fill="none" stroke="#E10600" strokeWidth="2"/>
          <line x1="0" y1="400" x2="1200" y2="400" stroke="#FFD100" strokeWidth="3" strokeDasharray="20,10"/>
        </svg>
      </div>

      <div className="cv-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-display">
            <span className="bg-gradient-to-r from-[#FFD100] via-white to-[#E10600] bg-clip-text text-transparent">
              Seleções Nacionais
            </span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Representando Cabo Verde com orgulho nos palcos internacionais do basquetebol
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {teams.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl group overflow-hidden">
                <div className="relative">
                  <img 
                    src={team.image} 
                    alt={team.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-[#FFD100] text-[#002D72] px-3 py-1 rounded-full text-sm font-bold">
                      {team.stats.players} Atletas
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-4 font-display text-[#FFD100]">
                    {team.title}
                  </h3>
                  <p className="text-gray-200 mb-6 leading-relaxed">
                    {team.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Ranking África:</span>
                      <span className="font-bold text-[#FFD100]">{team.stats.ranking}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Próxima Competição:</span>
                      <span className="font-bold text-[#E10600] text-xs">{team.stats.nextGame}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold mb-3 text-[#FFD100]">Destaques:</h4>
                    <div className="space-y-2">
                      {team.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center">
                          <Trophy className="h-4 w-4 text-[#FFD100] mr-2" />
                          <span className="text-sm text-gray-200">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button size="sm" variant="outline" className="border-[#FFD100] text-[#FFD100] hover:bg-[#FFD100] hover:text-[#002D72] text-xs">
                      <Users className="h-3 w-3 mr-1" />
                      Plantel
                    </Button>
                    <Button size="sm" variant="outline" className="border-[#E10600] text-[#E10600] hover:bg-[#E10600] hover:text-white text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      Jogos
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/50 text-white hover:bg-white/20 text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Stats
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 font-display text-[#FFD100]">
              Acompanhe as Nossas Seleções
            </h3>
            <p className="text-lg text-gray-200 mb-8">
              Calendário FIBA, estatísticas completas e transmissões ao vivo das competições internacionais
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#FFD100] to-[#E10600] text-[#002D72] font-bold hover:scale-105 transition-transform"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Calendário FIBA
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/20"
              >
                <Globe className="h-5 w-5 mr-2" />
                Estatísticas Completas
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NationalTeamsSection;
