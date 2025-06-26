
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useContentData } from '@/hooks/useContentData';
import { useBackendData } from '@/hooks/useBackendData';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FileText, 
  Calendar, 
  Users, 
  Trophy, 
  Play, 
  Image,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const { newsData, eventsData, galleryData, isLoading: contentLoading } = useContentData();
  const { teams, competitions, games, players, isLoading: backendLoading } = useBackendData();
  const { profile, user } = useAuth();

  const isLoading = contentLoading || backendLoading;

  // Estatísticas calculadas
  const stats = {
    publishedNews: newsData.filter(n => n.status === 'publicado').length,
    draftNews: newsData.filter(n => n.status === 'rascunho').length,
    upcomingEvents: eventsData.filter(e => new Date(e.event_date) > new Date()).length,
    activeTeams: teams.filter(t => t.status === 'ativo').length,
    activeCompetitions: competitions.filter(c => c.status === 'ativo').length,
    scheduledGames: games.filter(g => g.status === 'agendado').length,
    activePlayers: players.filter(p => p.status === 'ativo').length,
    galleryItems: galleryData.length
  };

  const recentNews = newsData.slice(0, 5);
  const upcomingGames = games
    .filter(g => g.status === 'agendado' && new Date(g.scheduled_date) > new Date())
    .sort((a, b) => new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime())
    .slice(0, 5);

  const getTeamName = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    return team?.name || 'Equipa não encontrada';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cv-blue"></div>
        <span className="ml-2">A carregar dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-cv-blue">Dashboard FCBB</h1>
        <p className="text-gray-600">
          Bem-vindo, {profile?.full_name || user?.email}. Aqui está um resumo do sistema.
        </p>
      </div>

      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notícias Publicadas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.publishedNews}</div>
            <p className="text-xs text-muted-foreground">
              {stats.draftNews} em rascunho
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Próximos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.upcomingEvents}</div>
            <p className="text-xs text-muted-foreground">
              Agendados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Equipas Ativas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.activeTeams}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activePlayers} jogadores
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jogos Agendados</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.scheduledGames}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeCompetitions} competições ativas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Conteúdo em Duas Colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notícias Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Notícias Recentes
            </CardTitle>
            <CardDescription>Últimas notícias criadas no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentNews.length > 0 ? (
                recentNews.map((news) => (
                  <div key={news.id} className="flex items-start justify-between border-b pb-2 last:border-0">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2">{news.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(news.created_at).toLocaleDateString('pt-PT')}
                      </p>
                    </div>
                    <Badge variant={news.status === 'publicado' ? 'default' : 'secondary'} className="text-xs">
                      {news.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">Nenhuma notícia encontrada</p>
              )}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              Ver Todas as Notícias
            </Button>
          </CardContent>
        </Card>

        {/* Próximos Jogos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Próximos Jogos
            </CardTitle>
            <CardDescription>Jogos agendados para os próximos dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingGames.length > 0 ? (
                upcomingGames.map((game) => (
                  <div key={game.id} className="border-b pb-2 last:border-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm">
                        {getTeamName(game.home_team_id)} vs {getTeamName(game.away_team_id)}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {game.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(game.scheduled_date).toLocaleDateString('pt-PT')} às{' '}
                      {new Date(game.scheduled_date).toLocaleTimeString('pt-PT', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                    {game.venue && (
                      <div className="text-xs text-gray-500">{game.venue}</div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">Nenhum jogo agendado</p>
              )}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              Ver Todos os Jogos
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Alertas e Ações Rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="h-5 w-5" />
              Ações Necessárias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {stats.draftNews > 0 && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {stats.draftNews} notícias em rascunho
                </div>
              )}
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Sistema funcionando normalmente
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Estatísticas Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>Total de itens na galeria: {stats.galleryItems}</div>
              <div>Competições ativas: {stats.activeCompetitions}</div>
              <div>Eventos futuros: {stats.upcomingEvents}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button size="sm" className="w-full">Nova Notícia</Button>
              <Button size="sm" variant="outline" className="w-full">Novo Jogo</Button>
              <Button size="sm" variant="outline" className="w-full">Upload Galeria</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
