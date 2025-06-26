
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useBackendData } from '@/hooks/useBackendData';
import { Plus, Edit, Trash2, User, Upload } from 'lucide-react';

const PlayersManagement = () => {
  const { toast } = useToast();
  const { players, teams } = useBackendData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birth_date: '',
    height: '',
    weight: '',
    position: '',
    jersey_number: '',
    team_id: '',
    nationality: 'CV',
    photo_url: '',
    biography: '',
    achievements: '',
    status: 'ativo'
  });

  const positions = [
    { value: 'PG', label: 'Base (Point Guard)' },
    { value: 'SG', label: 'Escolta (Shooting Guard)' },
    { value: 'SF', label: 'Extremo (Small Forward)' },
    { value: 'PF', label: 'Ala-Pivot (Power Forward)' },
    { value: 'C', label: 'Pivot (Center)' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Aqui seria a integração com Supabase para salvar
      toast({
        title: "Sucesso",
        description: editingPlayer ? "Jogador atualizado com sucesso!" : "Jogador criado com sucesso!",
      });
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar jogador",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este jogador?')) {
      try {
        // Aqui seria a integração com Supabase para deletar
        toast({
          title: "Sucesso",
          description: "Jogador eliminado com sucesso!",
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao eliminar jogador",
          variant: "destructive",
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      birth_date: '',
      height: '',
      weight: '',
      position: '',
      jersey_number: '',
      team_id: '',
      nationality: 'CV',
      photo_url: '',
      biography: '',
      achievements: '',
      status: 'ativo'
    });
    setEditingPlayer(null);
  };

  const openEditDialog = (player: any) => {
    setEditingPlayer(player);
    setFormData({
      name: player.name || '',
      email: player.email || '',
      phone: player.phone || '',
      birth_date: player.birth_date ? player.birth_date.split('T')[0] : '',
      height: player.height?.toString() || '',
      weight: player.weight?.toString() || '',
      position: player.position || '',
      jersey_number: player.jersey_number?.toString() || '',
      team_id: player.team_id || '',
      nationality: player.nationality || 'CV',
      photo_url: player.photo_url || '',
      biography: player.biography || '',
      achievements: player.achievements || '',
      status: player.status || 'ativo'
    });
    setIsDialogOpen(true);
  };

  const getTeamName = (teamId: string) => {
    const team = teams.find((t: any) => t.id === teamId);
    return team?.name || 'Sem equipa';
  };

  const getPositionLabel = (position: string) => {
    const pos = positions.find(p => p.value === position);
    return pos?.label || position;
  };

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return 'N/A';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue">Gestão de Jogadores</h2>
          <p className="text-gray-600">Registar, editar e gerir atletas</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-cv-blue hover:bg-cv-blue/90">
              <Plus className="h-4 w-4 mr-2" />
              Novo Jogador
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPlayer ? 'Editar Jogador' : 'Novo Jogador'}</DialogTitle>
              <DialogDescription>
                Dados pessoais e desportivos do atleta
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birth_date">Data de Nascimento</Label>
                  <Input
                    id="birth_date"
                    type="date"
                    value={formData.birth_date}
                    onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nacionalidade</Label>
                  <select
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="CV">Cabo Verde</option>
                    <option value="PT">Portugal</option>
                    <option value="BR">Brasil</option>
                    <option value="US">Estados Unidos</option>
                    <option value="OTHER">Outro</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    placeholder="180"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="75"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Posição</Label>
                  <select
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Selecionar...</option>
                    {positions.map((pos) => (
                      <option key={pos.value} value={pos.value}>{pos.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jersey_number">Número</Label>
                  <Input
                    id="jersey_number"
                    type="number"
                    min="0"
                    max="99"
                    value={formData.jersey_number}
                    onChange={(e) => setFormData({ ...formData, jersey_number: e.target.value })}
                    placeholder="10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="team_id">Equipa</Label>
                  <select
                    id="team_id"
                    value={formData.team_id}
                    onChange={(e) => setFormData({ ...formData, team_id: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Sem equipa</option>
                    {teams.map((team: any) => (
                      <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="ativo">Ativo</option>
                    <option value="lesionado">Lesionado</option>
                    <option value="suspenso">Suspenso</option>
                    <option value="inativo">Inativo</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo_url">URL da Foto</Label>
                <Input
                  id="photo_url"
                  value={formData.photo_url}
                  onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                  placeholder="https://exemplo.com/foto.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="biography">Biografia</Label>
                <Textarea
                  id="biography"
                  value={formData.biography}
                  onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                  rows={3}
                  placeholder="Informações sobre o jogador..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="achievements">Conquistas</Label>
                <Textarea
                  id="achievements"
                  value={formData.achievements}
                  onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                  rows={3}
                  placeholder="Principais conquistas e títulos..."
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-cv-blue hover:bg-cv-blue/90">
                  {editingPlayer ? 'Atualizar' : 'Criar'} Jogador
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Jogadores Registados</CardTitle>
          <CardDescription>Lista de todos os atletas do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Jogador</TableHead>
                <TableHead>Posição</TableHead>
                <TableHead>Equipa</TableHead>
                <TableHead>Idade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player: any) => (
                <TableRow key={player.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={player.photo_url} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{player.name}</div>
                        {player.jersey_number && (
                          <div className="text-sm text-gray-500">#{player.jersey_number}</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {player.position ? (
                      <Badge variant="outline">{getPositionLabel(player.position)}</Badge>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>{getTeamName(player.team_id)}</TableCell>
                  <TableCell>{calculateAge(player.birth_date)} anos</TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        player.status === 'ativo' ? 'bg-green-100 text-green-800' :
                        player.status === 'lesionado' ? 'bg-red-100 text-red-800' :
                        player.status === 'suspenso' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {player.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(player)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(player.id)}>
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

export default PlayersManagement;
