import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useBackendData } from '@/hooks/useBackendData';
import { useToast } from '@/hooks/use-toast';
import { Play, Square, Clock, Trophy } from 'lucide-react';

const LiveScoring = () => {
  const { games, teams, refetchGames } = useBackendData();
  const { toast } = useToast();
  const [selectedGame, setSelectedGame] = useState<any>(null);

  // Filter live games (using correct status values)
  const liveGames = games.filter(game => game.status === 'live');
  const upcomingGames = games.filter(game => game.status === 'scheduled');

  const updateGameScore = async (gameId: string, homeScore: number, awayScore: number) => {
    try {
      // Update logic here
      toast({
        title: "Sucesso",
        description: "Resultado atualizado!"
      });
      refetchGames();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cv-blue">Resultado ao Vivo</h2>
        <p className="text-gray-600">Atualizar resultados em tempo real</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Jogos ao Vivo</CardTitle>
          </CardHeader>
          <CardContent>
            {liveGames.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Nenhum jogo em curso</p>
            ) : (
              <div className="space-y-4">
                {liveGames.map((game: any) => (
                  <div key={game.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          {teams.find((t: any) => t.id === game.home_team_id)?.name || 'Equipa'} vs{' '}
                          {teams.find((t: any) => t.id === game.away_team_id)?.name || 'Equipa'}
                        </p>
                        <p className="text-sm text-gray-500">{game.venue}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          {game.home_score || 0} - {game.away_score || 0}
                        </p>
                        <Badge variant="default">Ao Vivo</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Jogos Agendados</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingGames.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Nenhum jogo agendado</p>
            ) : (
              <div className="space-y-4">
                {upcomingGames.slice(0, 5).map((game: any) => (
                  <div key={game.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          {teams.find((t: any) => t.id === game.home_team_id)?.name || 'Equipa'} vs{' '}
                          {teams.find((t: any) => t.id === game.away_team_id)?.name || 'Equipa'}
                        </p>
                        <p className="text-sm text-gray-500">{game.venue}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {game.scheduled_date ? new Date(game.scheduled_date).toLocaleDateString() : 'Data não definida'}
                        </p>
                        <Badge variant="secondary">Agendado</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveScoring;
