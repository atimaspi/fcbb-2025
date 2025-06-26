
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useBackendData } from '@/hooks/useBackendData';
import { Plus, Edit, Trash2, Trophy, Play, Calendar } from 'lucide-react';

const GamesManagement = () => {
  const { toast } = useToast();
  const { games, teams, competitions } = useBackendData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<any>(null);
  const [formData, setFormData] = useState({
    home_team_id: '',
    away_team_id: '',
    competition_id: '',
    scheduled_date: '',
    venue: '',
    status: 'agendado',
    home_score: 0,
    away_score: 0,
    notes: '',
    referee: '',
    live_score_enabled: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.home_team_id === formData.away_team_id) {
      toast({
        title: "Erro",
        description: "As equipas devem ser diferentes",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Aqui seria a integração com Supabase para salvar
      toast({
        title: "Sucesso",
        description: editingGame ? "Jogo atualizado com sucesso!" : "Jogo criado com sucesso!",
      });
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar jogo",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este jogo?')) {
      try {
        // Aqui seria a integração com Supabase para deletar
        toast({
          title: "Sucesso",
          description: "Jogo eliminado com sucesso!",
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao eliminar jogo",
          variant: "destructive",
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      home_team_id: '',
      away_team_id: '',
      competition_id: '',
      scheduled_date: '',
      venue: '',
      status: 'agendado',
      home_score: 0,
      away_score: 0,
      notes: '',
      referee: '',
      live_score_enabled: false
    });
    setEditingGame(null);
  };

  const openEditDialog = (game: any) => {
    setEditingGame(game);
    setFormData({
      home_team_id: game.home_team_id || '',
      away_team_id: game.away_team_id || '',
      competition_id: game.competition_id || '',
      scheduled_date: game.scheduled_date ? new Date(game.scheduled_date).toISOString().slice(0, 16) : '',
      venue: game.venue || '',
      status: game.status || 'agendado',
      home_score: game.home_score || 0,
      away_score: game.away_score || 0,
      notes: game.notes || '',
      referee: game.referee || '',
      live_score_enabled: game.live_score_enabled || false
    });
    setIsDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'agendado':
        return <Badge className="bg-blue-100 text-blue-800">Agendado</Badge>;
      case 'ao_vivo':
        return <Badge className="bg-red-100 text-red-800">Ao Vivo</Badge>;
      case 'finalizado':
        return <Badge className="bg-green-100 text-green-800">Finalizado</Badge>;
      case 'cancelado':
        return <Badge className="bg-gray-100 text-gray-800">Cancelado</Badge>;
      case 'adiado':
        return <Badge className="bg-yellow-100 text-yellow-800">Adiado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTeamName = (teamId: string) => {
    const team = teams.find((t: any) => t.id === teamId);
    return team?.name || 'Equipa não encontrada';
  };

  const getCompetitionName = (competitionId: string) => {
    const competition = competitions.find((c: any) => c.id === competitionId);
    return competition?.name || 'Competição não encontrada';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue">Gestão de Jogos</h2>
          <p className="text-gray-600">Agendar, editar e gerir jogos e resultados</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-cv-blue hover:bg-cv-blue/90">
              <Plus className="h-4 w-4 mr-2" />
              Novo Jogo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingGame ? 'Editar Jogo' : 'Novo Jogo'}</DialogTitle>
              <DialogDescription>
                Configure os detalhes do jogo
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="home_team_id">Equipa da Casa *</Label>
                  <select
                    id="home_team_id"
                    value={formData.home_team_id}
                    onChange={(e) => setFormData({ ...formData, home_team_id: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Selecionar equipa...</option>
                    {teams.map((team: any) => (
                      <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="away_team_id">Equipa Visitante *</Label>
                  <select
                    id="away_team_id"
                    value={formData.away_team_id}
                    onChange={(e) => setFormData({ ...formData, away_team_id: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Selecionar equipa...</option>
                    {teams.map((team: any) => (
                      <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="competition_id">Competição *</Label>
                <select
                  id="competition_id"
                  value={formData.competition_id}
                  onChange={(e) => setFormData({ ...formData, competition_id: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Selecionar competição...</option>
                  {competitions.map((competition: any) => (
                    <option key={competition.id} value={competition.id}>{competition.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scheduled_date">Data e Hora *</Label>
                  <Input
                    id="scheduled_date"
                    type="datetime-local"
                    value={formData.scheduled_date}
                    onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="venue">Local</Label>
                  <Input
                    id="venue"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="Ex: Pavilhão Nacional"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="agendado">Agendado</option>
                    <option value="ao_vivo">Ao Vivo</option>
                    <option value="finalizado">Finalizado</option>
                    <option value="cancelado">Cancelado</option>
                    <option value="adiado">Adiado</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="home_score">Resultado Casa</Label>
                  <Input
                    id="home_score"
                    type="number"
                    min="0"
                    value={formData.home_score}
                    onChange={(e) => setFormData({ ...formData, home_score: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="away_score">Resultado Visitante</Label>
                  <Input
                    id="away_score"
                    type="number"
                    min="0"
                    value={formData.away_score}
                    onChange={(e) => setFormData({ ...formData, away_score: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="referee">Árbitro</Label>
                <Input
                  id="referee"
                  value={formData.referee}
                  onChange={(e) => setFormData({ ...formData, referee: e.target.value })}
                  placeholder="Nome do árbitro principal"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  placeholder="Observações sobre o jogo..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="live_score_enabled"
                  checked={formData.live_score_enabled}
                  onChange={(e) => setFormData({ ...formData, live_score_enabled: e.target.checked })}
                />
                <Label htmlFor="live_score_enabled">Ativar pontuação ao vivo</Label>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-cv-blue hover:bg-cv-blue/90">
                  {editingGame ? 'Atualizar' : 'Criar'} Jogo
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Jogos Existentes</CardTitle>
          <CardDescription>Lista de todos os jogos do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Jogo</TableHead>
                <TableHead>Competição</TableHead>
                <TableHead>Resultado</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {games.map((game: any) => (
                <TableRow key={game.id}>
                  <TableCell>
                    {new Date(game.scheduled_date).toLocaleDateString('pt-PT')} <br />
                    <span className="text-sm text-gray-500">
                      {new Date(game.scheduled_date).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {getTeamName(game.home_team_id)} vs {getTeamName(game.away_team_id)}
                    </div>
                    {game.venue && <div className="text-sm text-gray-500">{game.venue}</div>}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{getCompetitionName(game.competition_id)}</Badge>
                  </TableCell>
                  <TableCell>
                    {game.status === 'finalizado' || game.status === 'ao_vivo' ? (
                      <span className="font-bold">{game.home_score} - {game.away_score}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(game.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {game.live_score_enabled && (
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(game)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(game.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamesManagement;
