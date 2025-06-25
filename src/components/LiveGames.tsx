
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users, Trophy } from 'lucide-react';

const LiveGames = () => {
  const liveGames = [
    {
      id: 1,
      homeTeam: "CD Travadores",
      awayTeam: "Sporting CV",
      homeScore: 78,
      awayScore: 65,
      quarter: "4º Período",
      time: "08:45",
      status: "AO VIVO",
      venue: "Pavilhão Adão e Eva",
      competition: "Liga Nacional"
    },
    {
      id: 2,
      homeTeam: "ABC Mindelo",
      awayTeam: "Académico 83",
      homeScore: 45,
      awayScore: 42,
      quarter: "Intervalo",
      time: "20:00",
      status: "INTERVALO",
      venue: "Pavilhão Municipal",
      competition: "Liga Nacional"
    }
  ];

  const upcomingGames = [
    {
      id: 3,
      homeTeam: "Flor da Juventude",
      awayTeam: "Varanda Fogo",
      date: "2024-01-20",
      time: "20:00",
      venue: "Pavilhão da Praia",
      competition: "Liga Nacional"
    },
    {
      id: 4,
      homeTeam: "Sonangol Mindelo",
      awayTeam: "Tchuba Bairro",
      date: "2024-01-21",
      time: "18:30",
      venue: "Pavilhão Adão e Eva",
      competition: "Taça CV"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="cv-container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-cv-blue mb-4">
            Jogos e Resultados
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Acompanhe os jogos ao vivo e fique por dentro dos próximos confrontos
          </p>
        </div>

        {/* Live Games */}
        {liveGames.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-cv-blue mb-6 flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
              Jogos ao Vivo
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {liveGames.map((game) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-red-500">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-red-500 text-white animate-pulse">
                          {game.status}
                        </Badge>
                        <Badge variant="outline" className="text-cv-blue border-cv-blue">
                          {game.competition}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between mb-6">
                        <div className="text-center flex-1">
                          <div className="font-bold text-lg text-cv-blue mb-1">{game.homeTeam}</div>
                          <div className="text-3xl font-bold text-cv-red">{game.homeScore}</div>
                        </div>
                        
                        <div className="text-center px-4">
                          <div className="text-sm text-gray-500 font-medium">{game.quarter}</div>
                          <div className="text-lg font-bold text-cv-blue">{game.time}</div>
                        </div>
                        
                        <div className="text-center flex-1">
                          <div className="font-bold text-lg text-cv-blue mb-1">{game.awayTeam}</div>
                          <div className="text-3xl font-bold text-cv-red">{game.awayScore}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {game.venue}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Games */}
        <div>
          <h3 className="text-2xl font-bold text-cv-blue mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-3" />
            Próximos Jogos
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingGames.map((game) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-cv-blue">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="text-cv-blue border-cv-blue">
                        {game.competition}
                      </Badge>
                      <div className="text-sm text-gray-500">
                        {new Date(game.date).toLocaleDateString('pt-PT')}
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-cv-blue">{game.homeTeam}</span>
                        <span className="text-sm text-gray-500">vs</span>
                        <span className="font-semibold text-cv-blue">{game.awayTeam}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {game.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {game.venue}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveGames;
