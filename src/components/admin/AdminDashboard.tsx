
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useBackendData } from '@/hooks/useBackendData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  Users, 
  Calendar, 
  Trophy, 
  TrendingUp,
  Building,
  UserCheck,
  Whistle,
  MapPin
} from 'lucide-react';

const AdminDashboard = () => {
  const { 
    teams, 
    players, 
    games, 
    competitions,
    clubs,
    coaches,
    referees,
    regionalAssociations,
    isLoading 
  } = useBackendData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const stats = [
    {
      title: 'Equipas',
      value: teams.filter((team: any) => team.status === 'active').length,
      total: teams.length,
      icon: Users,
      description: 'Equipas ativas no sistema'
    },
    {
      title: 'Competições',
      value: competitions.filter((comp: any) => comp.status === 'ongoing').length,
      total: competitions.length,
      icon: Trophy,
      description: 'Competições em curso'
    },
    {
      title: 'Jogos',
      value: games.filter((game: any) => game.status === 'scheduled').length,
      total: games.length,
      icon: Calendar,
      description: 'Jogos agendados'
    },
    {
      title: 'Jogadores',
      value: players.filter((player: any) => player.status === 'active').length,
      total: players.length,
      icon: UserCheck,
      description: 'Jogadores ativos'
    },
    {
      title: 'Clubes',
      value: clubs.filter((club: any) => club.status === 'active').length,
      total: clubs.length,
      icon: Building,
      description: 'Clubes registados'
    },
    {
      title: 'Treinadores',
      value: coaches.filter((coach: any) => coach.status === 'ativo').length,
      total: coaches.length,
      icon: Users,
      description: 'Treinadores ativos'
    },
    {
      title: 'Árbitros',
      value: referees.filter((ref: any) => ref.status === 'ativo').length,
      total: referees.length,
      icon: Whistle,
      description: 'Árbitros ativos'
    },
    {
      title: 'Associações',
      value: regionalAssociations.filter((assoc: any) => assoc.status === 'active').length,
      total: regionalAssociations.length,
      icon: MapPin,
      description: 'Associações regionais'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-cv-blue">Dashboard Administrativo</h2>
        <p className="text-gray-600 mt-2">Visão geral do sistema de gestão de basquetebol</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-cv-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cv-blue">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">
                  de {stat.total} {stat.description.toLowerCase()}
                </p>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-cv-blue h-2 rounded-full transition-all duration-300"
                    style={{ width: `${stat.total > 0 ? (stat.value / stat.total) * 100 : 0}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Próximos Jogos
            </CardTitle>
            <CardDescription>Jogos agendados para os próximos dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {games.slice(0, 5).map((game: any) => (
                <div key={game.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">
                      {teams.find((t: any) => t.id === game.home_team_id)?.name || 'Equipa'} vs{' '}
                      {teams.find((t: any) => t.id === game.away_team_id)?.name || 'Equipa'}
                    </p>
                    <p className="text-xs text-gray-500">{game.venue || 'Local não definido'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {game.scheduled_date ? new Date(game.scheduled_date).toLocaleDateString() : 'Data não definida'}
                    </p>
                  </div>
                </div>
              ))}
              {games.length === 0 && (
                <p className="text-gray-500 text-center py-4">Nenhum jogo agendado</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Competições Ativas
            </CardTitle>
            <CardDescription>Competições em curso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {competitions.filter((comp: any) => comp.status === 'ongoing').slice(0, 5).map((competition: any) => (
                <div key={competition.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{competition.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{competition.type} • {competition.season}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Em curso
                    </span>
                  </div>
                </div>
              ))}
              {competitions.filter((comp: any) => comp.status === 'ongoing').length === 0 && (
                <p className="text-gray-500 text-center py-4">Nenhuma competição em curso</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
