
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Trophy, Calendar, MapPin, Star } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const SelecoesPage = () => {
  const [activeTab, setActiveTab] = useState('masculina');

  const selecoes = {
    masculina: {
      name: "Seleção Nacional Masculina",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2970",
      coach: "Mário Palma",
      captain: "João Silva",
      nextGame: "AfroBasket 2025 - Qualificação",
      nextGameDate: "15 de Março, 2024",
      achievements: [
        "Participação AfroBasket 2021",
        "Campeão Regional 2020",
        "Vice-campeão CPLP 2019"
      ],
      players: [
        { name: "João Silva", position: "Base", club: "CD Travadores", number: 7 },
        { name: "Carlos Santos", position: "Extremo", club: "Sporting CV", number: 23 },
        { name: "Miguel Fonseca", position: "Poste", club: "ABC Mindelo", number: 15 },
        { name: "André Tavares", position: "Base", club: "Flor Juventude", number: 10 },
        { name: "Pedro Lima", position: "Ala", club: "Académico 83", number: 8 },
        { name: "Rui Monteiro", position: "Poste", club: "Varanda Fogo", number: 12 }
      ]
    },
    feminina: {
      name: "Seleção Nacional Feminina",
      image: "https://images.unsplash.com/photo-1594736797933-d0aa4cb6a2dc?q=80&w=2970",
      coach: "Ana Rodrigues",
      captain: "Maria Santos",
      nextGame: "Torneio da Amizade",
      nextGameDate: "28 de Fevereiro, 2024",
      achievements: [
        "Participação AfroBasket Women 2019",
        "Campeã Regional 2022",
        "Bronze CPLP 2021"
      ],
      players: [
        { name: "Maria Santos", position: "Base", club: "Praia Basquet", number: 9 },
        { name: "Carla Fonseca", position: "Extremo", club: "Mindelo Stars", number: 14 },
        { name: "Ana Tavares", position: "Poste", club: "Fogo Queens", number: 21 },
        { name: "Sofia Lima", position: "Ala", club: "Santiago Angels", number: 6 },
        { name: "Rita Monteiro", position: "Base", club: "Sal Warriors", number: 11 },
        { name: "Joana Pereira", position: "Poste", club: "Boavista Lions", number: 18 }
      ]
    },
    sub18: {
      name: "Seleção Sub-18 Masculina",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2990",
      coach: "Carlos Mendes",
      captain: "Tiago Santos",
      nextGame: "FIBA U18 África",
      nextGameDate: "10 de Abril, 2024",
      achievements: [
        "Participação FIBA U18 2023",
        "Campeão Regional Sub-18 2023",
        "Prata Torneio Atlântico 2022"
      ],
      players: [
        { name: "Tiago Santos", position: "Base", club: "Travadores Youth", number: 4 },
        { name: "Bruno Silva", position: "Extremo", club: "Sporting Youth", number: 17 },
        { name: "Diogo Fonseca", position: "Poste", club: "Mindelo Academy", number: 22 },
        { name: "Gabriel Lima", position: "Ala", club: "Praia Basketball", number: 13 },
        { name: "Rafael Santos", position: "Base", club: "Fogo Juniors", number: 5 },
        { name: "Lucas Tavares", position: "Poste", club: "Sal Academy", number: 19 }
      ]
    }
  };

  const currentSelection = selecoes[activeTab as keyof typeof selecoes];

  return (
    <PageLayout
      title="Seleções Nacionais"
      description="Conheça as seleções que representam Cabo Verde nas competições internacionais"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="masculina">Masculina</TabsTrigger>
          <TabsTrigger value="feminina">Feminina</TabsTrigger>
          <TabsTrigger value="sub18">Sub-18</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl"
          >
            <div className="relative h-80">
              <img 
                src={currentSelection.image}
                alt={currentSelection.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cv-blue/90 to-cv-red/60"></div>
              <div className="absolute inset-0 flex items-center justify-center text-center text-white p-8">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {currentSelection.name}
                  </h1>
                  <div className="flex flex-wrap justify-center gap-4 text-lg">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Treinador: {currentSelection.coach}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 mr-2" />
                      Capitão: {currentSelection.captain}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Next Game */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-l-4 border-cv-blue">
                <CardHeader>
                  <CardTitle className="flex items-center text-cv-blue">
                    <Calendar className="w-5 h-5 mr-2" />
                    Próximo Jogo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold mb-2">{currentSelection.nextGame}</h3>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {currentSelection.nextGameDate}
                  </p>
                  <Button className="mt-4 bg-cv-blue hover:bg-cv-blue/90">
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-l-4 border-cv-red">
                <CardHeader>
                  <CardTitle className="flex items-center text-cv-red">
                    <Trophy className="w-5 h-5 mr-2" />
                    Principais Conquistas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentSelection.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center">
                        <Badge variant="outline" className="mr-2">
                          {achievement}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Players List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-cv-blue text-2xl">Plantel Atual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentSelection.players.map((player, index) => (
                    <motion.div
                      key={player.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-cv-blue/5 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-cv-blue">{player.name}</h4>
                        <Badge className="bg-cv-red text-white">#{player.number}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{player.position}</p>
                      <p className="text-xs text-gray-500">{player.club}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default SelecoesPage;
