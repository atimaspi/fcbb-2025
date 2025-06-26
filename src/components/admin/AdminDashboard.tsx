
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBackendData } from '@/hooks/useBackendData';
import { useContentData } from '@/hooks/useContentData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  FileText, 
  Calendar, 
  Users, 
  Trophy, 
  TrendingUp,
  Eye,
  UserCheck,
  Building
} from 'lucide-react';

const AdminDashboard = () => {
  const { 
    clubs, 
    teams, 
    players, 
    games, 
    competitions, 
    isLoading: backendLoading 
  } = useBackendData();
  
  const { 
    newsData, 
    eventsData, 
    isContentLoading 
  } = useContentData();

  if (backendLoading || isContentLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const stats = [
    {
      title: "Notícias Publicadas",
      value: newsData.length,
      icon: FileText,
      color: "text-cv-blue",
      bgColor: "bg-cv-blue/10"
    },
    {
      title: "Eventos Ativos",
      value: eventsData.length,
      icon: Calendar,
      color: "text-cv-red",
      bgColor: "bg-cv-red/10"
    },
    {
      title: "Clubes Federados",
      value: clubs.length,
      icon: Building,
      color: "text-cv-blue",
      bgColor: "bg-cv-blue/10"
    },
    {
      title: "Jogadores Registados",
      value: players.length,
      icon: UserCheck,
      color: "text-cv-red",
      bgColor: "bg-cv-red/10"
    },
    {
      title: "Competições Ativas",
      value: competitions.length,
      icon: Trophy,
      color: "text-cv-blue",
      bgColor: "bg-cv-blue/10"
    },
    {
      title: "Jogos Agendados",
      value: games.filter(g => g.status === 'agendado').length,
      icon: Calendar,
      color: "text-cv-red",
      bgColor: "bg-cv-red/10"
    }
  ];

  const recentNews = newsData.slice(0, 5);
  const upcomingEvents = eventsData.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cv-blue mb-2">Dashboard Administrativo</h2>
        <p className="text-gray-600">Visão geral do sistema de gestão FCBB</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-cv-blue">
              <FileText className="w-5 h-5 mr-2" />
              Notícias Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNews.length > 0 ? recentNews.map((news, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm line-clamp-1">{news.title}</h4>
                    <p className="text-xs text-gray-600">{news.category} • {new Date(news.created_at).toLocaleDateString('pt-PT')}</p>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Eye className="w-3 h-3 mr-1" />
                    {(news as any).views_count || 0}
                  </div>
                </div>
              )) : (
                <p className="text-gray-500 text-center py-4">Nenhuma notícia disponível</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-cv-red">
              <Calendar className="w-5 h-5 mr-2" />
              Próximos Eventos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.length > 0 ? upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm line-clamp-1">{event.title}</h4>
                    <p className="text-xs text-gray-600">{event.type} • {new Date(event.event_date).toLocaleDateString('pt-PT')}</p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {event.location}
                  </div>
                </div>
              )) : (
                <p className="text-gray-500 text-center py-4">Nenhum evento agendado</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-cv-blue">Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-cv-blue text-white rounded-lg hover:bg-cv-blue/90 transition-colors">
              <FileText className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">Nova Notícia</p>
            </button>
            <button className="p-4 bg-cv-red text-white rounded-lg hover:bg-cv-red/90 transition-colors">
              <Calendar className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">Novo Evento</p>
            </button>
            <button className="p-4 bg-cv-yellow text-cv-dark rounded-lg hover:bg-cv-yellow/90 transition-colors">
              <Users className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">Novo Clube</p>
            </button>
            <button className="p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Trophy className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">Nova Competição</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
