import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useBackendData } from '@/hooks/useBackendData';
import type { Game, Team } from '@/hooks/useBackendData';
import { 
  Play, 
  Pause, 
  Square, 
  Plus, 
  Minus,
  Clock,
  Target,
  Users
} from 'lucide-react';

const LiveScoring = () => {
  const { games, teams } = useBackendData();
  const [selectedGame, setSelectedGame] = useState('');
  const [gameStatus, setGameStatus] = useState('agendado');
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [currentPeriod, setCurrentPeriod] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState('10:00');

  const liveGames = games.filter((game: Game) => game.status === 'ao_vivo');
  const upcomingGames = games.filter((game: Game) => game.status === 'agendado');

  const getTeamName = (teamId: string) => {
    const team = teams.find((t: Team) => t.id === teamId);
    return team?.name || 'Equipa Desconhecida';
  };

  const startGame = () => {
    setGameStatus('ao_vivo');
    // Logic to update game status in database
  };

  const pauseGame = () => {
    setGameStatus('pausado');
  };

  const endGame = () => {
    setGameStatus('finalizado');
  };

  const adjustScore = (team: 'home' | 'away', points: number) => {
    if (team === 'home') {
      setHomeScore(Math.max(0, homeScore + points));
    } else {
      setAwayScore(Math.max(0, awayScore + points));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cv-blue mb-2">Sistema de Pontuação ao Vivo</h2>
        <p className="text-gray-600">Gestão em tempo real de jogos e estatísticas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Selecionar Jogo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="game-select">Jogo para Pontuar</Label>
              <Select value={selectedGame} onValueChange={setSelectedGame}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar jogo..." />
                </SelectTrigger>
                <SelectContent>
                  {upcomingGames.map((game: Game) => (
                    <SelectItem key={game.id} value={game.id}>
                      {getTeamName(game.home_team_id || '')} vs {getTeamName(game.away_team_id || '')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedGame && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Button 
                    onClick={startGame} 
                    disabled={gameStatus === 'ao_vivo'}
                    className="flex-1"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Iniciar
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={pauseGame}
                    disabled={gameStatus !== 'ao_vivo'}
                  >
                    <Pause className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={endGame}
                    disabled={gameStatus === 'agendado'}
                  >
                    <Square className="w-4 h-4" />
                  </Button>
                </div>
                
                <Badge variant={
                  gameStatus === 'ao_vivo' ? 'default' : 
                  gameStatus === 'finalizado' ? 'secondary' : 'outline'
                }>
                  {gameStatus === 'ao_vivo' ? 'AO VIVO' : 
                   gameStatus === 'finalizado' ? 'FINALIZADO' : 'AGENDADO'}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Live Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Pontuação Atual
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-cv-blue mb-2">
                {homeScore} - {awayScore}
              </div>
              <div className="text-sm text-gray-600">
                {currentPeriod}º Período | {timeRemaining}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Equipa Casa</Label>
                <div className="flex gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => adjustScore('home', 1)}
                    className="flex-1"
                  >
                    <Plus className="w-3 h-3" />1
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => adjustScore('home', 2)}
                    className="flex-1"
                  >
                    <Plus className="w-3 h-3" />2
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => adjustScore('home', 3)}
                    className="flex-1"
                  >
                    <Plus className="w-3 h-3" />3
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => adjustScore('home', -1)}
                  className="w-full"
                >
                  <Minus className="w-3 h-3 mr-1" />Corrigir
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Equipa Visitante</Label>
                <div className="flex gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => adjustScore('away', 1)}
                    className="flex-1"
                  >
                    <Plus className="w-3 h-3" />1
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => adjustScore('away', 2)}
                    className="flex-1"
                  >
                    <Plus className="w-3 h-3" />2
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => adjustScore('away', 3)}
                    className="flex-1"
                  >
                    <Plus className="w-3 h-3" />3
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => adjustScore('away', -1)}
                  className="w-full"
                >
                  <Minus className="w-3 h-3 mr-1" />Corrigir
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Controlo de Tempo</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="10:00" 
                  value={timeRemaining}
                  onChange={(e) => setTimeRemaining(e.target.value)}
                  className="flex-1"
                />
                <Select value={currentPeriod.toString()} onValueChange={(value) => setCurrentPeriod(parseInt(value))}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1º</SelectItem>
                    <SelectItem value="2">2º</SelectItem>
                    <SelectItem value="3">3º</SelectItem>
                    <SelectItem value="4">4º</SelectItem>
                    <SelectItem value="5">Prol.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Games Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Jogos ao Vivo
            </CardTitle>
          </CardHeader>
          <CardContent>
            {liveGames.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-500">Nenhum jogo ao vivo no momento</p>
              </div>
            ) : (
              <div className="space-y-3">
                {liveGames.map((game: Game) => (
                  <div key={game.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <div className="font-medium">
                          {getTeamName(game.home_team_id || '')} vs {getTeamName(game.away_team_id || '')}
                        </div>
                        <div className="text-gray-500">
                          {game.home_score} - {game.away_score}
                        </div>
                      </div>
                      <Badge variant="default">AO VIVO</Badge>
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
