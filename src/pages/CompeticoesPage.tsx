
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trophy, Calendar, Users, Target, Filter } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const CompeticoesPage = () => {
  const [activeTab, setActiveTab] = useState('liga-masculina');
  const [selectedSeason, setSelectedSeason] = useState('2024-25');

  const competitions = {
    'liga-masculina': {
      name: 'Liga Nacional Masculina',
      season: '2024/25',
      teams: 12,
      games: 132,
      status: 'Em curso',
      champion: 'CD Travadores (2023/24)',
      standings: [
        { pos: 1, team: 'CD Travadores', games: 18, wins: 15, losses: 3, points: 33 },
        { pos: 2, team: 'Sporting CV', games: 18, wins: 14, losses: 4, points: 32 },
        { pos: 3, team: 'ABC Mindelo', games: 18, wins: 12, losses: 6, points: 30 },
        { pos: 4, team: 'Académico 83', games: 18, wins: 11, losses: 7, points: 29 },
        { pos: 5, team: 'Flor Juventude', games: 18, wins: 9, losses: 9, points: 27 },
        { pos: 6, team: 'Varanda Fogo', games: 18, wins: 8, losses: 10, points: 26 }
      ]
    },
    'liga-feminina': {
      name: 'Liga Nacional Feminina',
      season: '2024/25',
      teams: 10,
      games: 90,
      status: 'Em curso',
      champion: 'Praia Basquet (2023/24)',
      standings: [
        { pos: 1, team: 'Praia Basquet', games: 14, wins: 12, losses: 2, points: 26 },
        { pos: 2, team: 'Mindelo Stars', games: 14, wins: 11, losses: 3, points: 25 },
        { pos: 3, team: 'Fogo Queens', games: 14, wins: 9, losses: 5, points: 23 },
        { pos: 4, team: 'Santiago Angels', games: 14, wins: 8, losses: 6, points: 22 },
        { pos: 5, team: 'Sal Warriors', games: 14, wins: 6, losses: 8, points: 20 }
      ]
    },
    'taca': {
      name: 'Taça de Cabo Verde',
      season: '2024',
      teams: 16,
      games: 30,
      status: 'Fase Final',
      champion: 'Sporting CV (2023)',
      standings: [
        { pos: 1, team: 'CD Travadores', stage: 'Final', status: 'Qualificado' },
        { pos: 2, team: 'ABC Mindelo', stage: 'Final', status: 'Qualificado' },
        { pos: 3, team: 'Sporting CV', stage: 'Meia-final', status: 'Eliminado' },
        { pos: 4, team: 'Académico 83', stage: 'Meia-final', status: 'Eliminado' }
      ]
    }
  };

  const upcomingGames = [
    {
      date: '2024-01-20',
      time: '20:00',
      home: 'CD Travadores',
      away: 'Sporting CV',
      venue: 'Pavilhão Adão e Eva',
      competition: 'Liga Nacional'
    },
    {
      date: '2024-01-21',
      time: '18:30',
      home: 'ABC Mindelo',
      away: 'Académico 83',
      venue: 'Pavilhão Municipal',
      competition: 'Liga Nacional'
    },
    {
      date: '2024-01-22',
      time: '19:00',
      home: 'Flor Juventude',
      away: 'Varanda Fogo',
      venue: 'Pavilhão da Praia',
      competition: 'Taça CV'
    }
  ];

  const currentCompetition = competitions[activeTab as keyof typeof competitions];

  return (
    <PageLayout
      title="Competições"
      description="Acompanhe todas as competições do basquetebol cabo-verdiano"
    >
      {/* Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-cv-blue" />
          <Select value={selectedSeason} onValueChange={setSelectedSeason}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-25">2024/25</SelectItem>
              <SelectItem value="2023-24">2023/24</SelectItem>
              <SelectItem value="2022-23">2022/23</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
          <TabsTrigger value="liga-masculina">Liga Masc.</TabsTrigger>
          <TabsTrigger value="liga-feminina">Liga Fem.</TabsTrigger>
          <TabsTrigger value="taca">Taça CV</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-8">
          {/* Competition Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-cv-blue to-cv-red p-8 rounded-2xl text-white"
          >
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <Trophy className="w-8 h-8 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">{currentCompetition.name}</h3>
                <p className="text-white/80">Temporada {currentCompetition.season}</p>
              </div>
              <div>
                <Users className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">{currentCompetition.teams}</div>
                <p className="text-white/80">Equipas</p>
              </div>
              <div>
                <Target className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">{currentCompetition.games}</div>
                <p className="text-white/80">Jogos</p>
              </div>
              <div>
                <Calendar className="w-8 h-8 mx-auto mb-2" />
                <Badge className="bg-white text-cv-blue mb-2">{currentCompetition.status}</Badge>
                <p className="text-white/80 text-sm">Campeão Anterior:</p>
                <p className="text-white font-semibold text-sm">{currentCompetition.champion}</p>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Standings Table */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-cv-blue">Classificação</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Pos</th>
                          <th className="text-left py-2">Equipa</th>
                          <th className="text-center py-2">J</th>
                          <th className="text-center py-2">V</th>
                          <th className="text-center py-2">D</th>
                          <th className="text-center py-2">Pts</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentCompetition.standings.map((team, index) => (
                          <motion.tr
                            key={team.team}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className={`border-b hover:bg-gray-50 ${
                              index < 4 ? 'bg-green-50' : index >= currentCompetition.standings.length - 2 ? 'bg-red-50' : ''
                            }`}
                          >
                            <td className="py-3 font-semibold">{team.pos}</td>
                            <td className="py-3 font-medium">{team.team}</td>
                            <td className="py-3 text-center">{team.games || '-'}</td>
                            <td className="py-3 text-center">{team.wins || '-'}</td>
                            <td className="py-3 text-center">{team.losses || '-'}</td>
                            <td className="py-3 text-center font-semibold">{team.points || team.stage}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-100 rounded mr-2"></div>
                        <span>Qualificação Playoffs</span>
                      </div>
                      {currentCompetition.standings.length > 6 && (
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-100 rounded mr-2"></div>
                          <span>Zona de Descida</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Games */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-cv-red">Próximos Jogos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingGames.map((game, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="text-xs">
                          {game.competition}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(game.date).toLocaleDateString('pt-PT')}
                        </span>
                      </div>
                      <div className="text-center mb-2">
                        <div className="font-semibold text-sm">{game.home}</div>
                        <div className="text-xs text-gray-500 my-1">vs</div>
                        <div className="font-semibold text-sm">{game.away}</div>
                      </div>
                      <div className="text-xs text-gray-500 text-center">
                        {game.time} • {game.venue}
                      </div>
                    </motion.div>
                  ))}
                  
                  <Button variant="outline" className="w-full mt-4">
                    Ver Calendário Completo
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default CompeticoesPage;
