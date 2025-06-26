
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, BarChart3 } from 'lucide-react';

const StatisticsManagement = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<any>(null);
  const [statistics, setStatistics] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    value: '',
    description: '',
    icon: 'users',
    color: '#002D72',
    order_index: 0,
    active: true
  });

  const availableIcons = [
    { value: 'users', label: 'Utilizadores' },
    { value: 'trophy', label: 'Troféu' },
    { value: 'calendar', label: 'Calendário' },
    { value: 'target', label: 'Alvo' },
    { value: 'award', label: 'Prémio' },
    { value: 'star', label: 'Estrela' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Here you would save to database
      toast({
        title: "Sucesso",
        description: editingStat ? "Estatística atualizada com sucesso!" : "Estatística criada com sucesso!",
      });
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar estatística",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta estatística?')) {
      try {
        // Here you would delete from database
        toast({
          title: "Sucesso",
          description: "Estatística eliminada com sucesso!",
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao eliminar estatística",
          variant: "destructive",
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      value: '',
      description: '',
      icon: 'users',
      color: '#002D72',
      order_index: 0,
      active: true
    });
    setEditingStat(null);
  };

  const openEditDialog = (stat: any) => {
    setEditingStat(stat);
    setFormData({
      title: stat.title || '',
      value: stat.value || '',
      description: stat.description || '',
      icon: stat.icon || 'users',
      color: stat.color || '#002D72',
      order_index: stat.order_index || 0,
      active: stat.active !== false
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue">Gestão de Estatísticas</h2>
          <p className="text-gray-600">Gerir números e estatísticas exibidas no site</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-cv-blue hover:bg-cv-blue/90">
              <Plus className="h-4 w-4 mr-2" />
              Nova Estatística
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingStat ? 'Editar Estatística' : 'Nova Estatística'}</DialogTitle>
              <DialogDescription>
                Configure uma estatística para exibir no site
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Clubes Federados"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="value">Valor *</Label>
                <Input
                  id="value"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="Ex: 25 ou 25+"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Texto adicional (opcional)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="icon">Ícone</Label>
                  <select
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    {availableIcons.map(icon => (
                      <option key={icon.value} value={icon.value}>{icon.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Cor</Label>
                  <Input
                    id="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="order_index">Ordem</Label>
                  <Input
                    id="order_index"
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                    min="0"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  />
                  <Label htmlFor="active">Ativo</Label>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-cv-blue hover:bg-cv-blue/90">
                  {editingStat ? 'Atualizar' : 'Criar'} Estatística
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6 text-center">
            <BarChart3 className="w-8 h-8 text-cv-blue mx-auto mb-2" />
            <div className="text-2xl font-bold text-cv-blue">25+</div>
            <p className="text-sm text-gray-600">Clubes Federados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <BarChart3 className="w-8 h-8 text-cv-red mx-auto mb-2" />
            <div className="text-2xl font-bold text-cv-red">500+</div>
            <p className="text-sm text-gray-600">Jogadores Registados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <BarChart3 className="w-8 h-8 text-cv-yellow mx-auto mb-2" />
            <div className="text-2xl font-bold text-cv-dark">10</div>
            <p className="text-sm text-gray-600">Ilhas Representadas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <BarChart3 className="w-8 h-8 text-cv-blue mx-auto mb-2" />
            <div className="text-2xl font-bold text-cv-blue">15</div>
            <p className="text-sm text-gray-600">Competições Anuais</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estatísticas Configuradas</CardTitle>
          <CardDescription>Lista de todas as estatísticas do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          {statistics.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <BarChart3 className="mx-auto h-12 w-12 mb-4" />
              <p>Nenhuma estatística cadastrada ainda.</p>
              <p className="text-sm">Use os exemplos acima como referência.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Ordem</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {statistics.map((stat: any) => (
                  <TableRow key={stat.id}>
                    <TableCell className="font-medium">{stat.title}</TableCell>
                    <TableCell>{stat.value}</TableCell>
                    <TableCell>{stat.order_index}</TableCell>
                    <TableCell>{stat.active ? 'Ativo' : 'Inativo'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => openEditDialog(stat)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(stat.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsManagement;
