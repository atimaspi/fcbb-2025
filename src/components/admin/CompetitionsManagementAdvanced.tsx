
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useBackendData } from '@/hooks/useBackendData';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Trophy, Calendar } from 'lucide-react';

const CompetitionsManagementAdvanced = () => {
  const { competitions, operations, competitionsLoading } = useBackendData();
  const { toast } = useToast();
  
  const [selectedCompetition, setSelectedCompetition] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    season: '',
    type: '',
    status: 'upcoming',
    start_date: '',
    end_date: '',
    description: '',
    regulations_url: ''
  });

  const competitionTypes = [
    'Liga Nacional', 'Taça', 'Super Taça', 'Torneio Regional', 'Copa', 'Campeonato'
  ];

  const handleEdit = (competition: any) => {
    setSelectedCompetition(competition);
    setFormData({
      name: competition.name || '',
      season: competition.season || '',
      type: competition.type || '',
      status: competition.status || 'upcoming',
      start_date: competition.start_date || '',
      end_date: competition.end_date || '',
      description: competition.description || '',
      regulations_url: competition.regulations_url || ''
    });
    setIsEditing(true);
  };

  const handleCreate = () => {
    setSelectedCompetition(null);
    setFormData({
      name: '',
      season: '',
      type: '',
      status: 'upcoming',
      start_date: '',
      end_date: '',
      description: '',
      regulations_url: ''
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const competitionData = {
        ...formData,
        status: formData.status as 'finished' | 'upcoming' | 'ongoing'
      };

      if (selectedCompetition) {
        await operations.competitions.update.mutateAsync({
          id: selectedCompetition.id,
          data: competitionData
        });
        toast({ title: "Sucesso", description: "Competição atualizada!" });
      } else {
        await operations.competitions.create.mutateAsync(competitionData);
        toast({ title: "Sucesso", description: "Competição criada!" });
      }
      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (competitionId: string) => {
    if (window.confirm('Tem certeza que deseja eliminar esta competição?')) {
      try {
        await operations.competitions.delete.mutateAsync(competitionId);
        toast({ title: "Sucesso", description: "Competição eliminada!" });
      } catch (error: any) {
        toast({
          title: "Erro",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-cv-blue">
            {selectedCompetition ? 'Editar Competição' : 'Nova Competição'}
          </h3>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-cv-blue hover:bg-blue-700">
              Salvar
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações da Competição</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome da Competição *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Liga Nacional de Basquetebol"
                />
              </div>
              <div>
                <Label htmlFor="season">Temporada *</Label>
                <Input
                  id="season"
                  value={formData.season}
                  onChange={(e) => setFormData(prev => ({ ...prev, season: e.target.value }))}
                  placeholder="2024/2025"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="type">Tipo</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {competitionTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Por Iniciar</SelectItem>
                    <SelectItem value="ongoing">Em Curso</SelectItem>
                    <SelectItem value="finished">Finalizada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start_date">Data de Início</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="end_date">Data de Fim</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descrição da competição"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="regulations_url">URL do Regulamento</Label>
              <Input
                id="regulations_url"
                type="url"
                value={formData.regulations_url}
                onChange={(e) => setFormData(prev => ({ ...prev, regulations_url: e.target.value }))}
                placeholder="https://exemplo.com/regulamento.pdf"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Competições</h3>
        <Button onClick={handleCreate} className="bg-cv-blue hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nova Competição
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {competitions.map((competition: any) => (
          <Card key={competition.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-cv-blue" />
                    <h4 className="font-semibold">{competition.name}</h4>
                    <Badge variant={competition.status === 'ongoing' ? 'default' : 'secondary'}>
                      {competition.status === 'ongoing' ? 'Em Curso' :
                       competition.status === 'upcoming' ? 'Por Iniciar' : 'Finalizada'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{competition.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Tipo: {competition.type}</span>
                    <span>Temporada: {competition.season}</span>
                    {competition.start_date && (
                      <span>Início: {new Date(competition.start_date).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(competition)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(competition.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompetitionsManagementAdvanced;
