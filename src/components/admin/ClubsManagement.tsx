
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useBackendData } from '@/hooks/useBackendData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ClubsManagement = () => {
  const { clubs, clubsLoading, regionalAssociations, operations } = useBackendData();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClub, setEditingClub] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    island: '',
    logo_url: '',
    contact_email: '',
    contact_phone: '',
    address: '',
    website: '',
    description: '',
    founded_year: '',
    status: 'active' as 'active' | 'inactive',
    regional_association_id: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: "Erro",
        description: "Por favor, preencha o nome do clube.",
        variant: "destructive"
      });
      return;
    }

    try {
      const clubData = {
        ...formData,
        founded_year: formData.founded_year ? parseInt(formData.founded_year) : undefined,
        active: formData.status === 'active'
      };

      if (editingClub) {
        await operations.clubs.update.mutateAsync({ 
          id: editingClub.id, 
          data: clubData 
        });
        toast({
          title: "Sucesso",
          description: "Clube atualizado com sucesso!"
        });
      } else {
        await operations.clubs.create.mutateAsync(clubData);
        toast({
          title: "Sucesso", 
          description: "Clube criado com sucesso!"
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao salvar clube: ${error.message || 'Erro desconhecido'}`,
        variant: "destructive"
      });
    }
  };

  const handleEdit = (club: any) => {
    setEditingClub(club);
    setFormData({
      name: club.name || '',
      island: club.island || '',
      logo_url: club.logo_url || '',
      contact_email: club.contact_email || '',
      contact_phone: club.contact_phone || '',
      address: club.address || '',
      website: club.website || '',
      description: club.description || '',
      founded_year: club.founded_year?.toString() || '',
      status: club.status || 'active',
      regional_association_id: club.regional_association_id || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (clubId: string) => {
    if (confirm('Tem certeza que deseja eliminar este clube?')) {
      try {
        await operations.clubs.delete.mutateAsync(clubId);
        toast({
          title: "Sucesso",
          description: "Clube eliminado com sucesso!"
        });
      } catch (error: any) {
        toast({
          title: "Erro",
          description: `Erro ao eliminar clube: ${error.message || 'Erro desconhecido'}`,
          variant: "destructive"
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      island: '',
      logo_url: '',
      contact_email: '',
      contact_phone: '',
      address: '',
      website: '',
      description: '',
      founded_year: '',
      status: 'active',
      regional_association_id: ''
    });
    setEditingClub(null);
  };

  if (clubsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue flex items-center gap-2">
            <Building className="h-6 w-6" />
            Gestão de Clubes
          </h2>
          <p className="text-gray-600">Gerir clubes registados</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-cv-blue hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Clube
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingClub ? 'Editar Clube' : 'Novo Clube'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do clube
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Clube *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="island">Ilha</Label>
                  <Select value={formData.island} onValueChange={(value) => handleInputChange('island', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar ilha" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Santiago">Santiago</SelectItem>
                      <SelectItem value="São Vicente">São Vicente</SelectItem>
                      <SelectItem value="Santo Antão">Santo Antão</SelectItem>
                      <SelectItem value="São Nicolau">São Nicolau</SelectItem>
                      <SelectItem value="Sal">Sal</SelectItem>
                      <SelectItem value="Boavista">Boavista</SelectItem>
                      <SelectItem value="Maio">Maio</SelectItem>
                      <SelectItem value="Fogo">Fogo</SelectItem>
                      <SelectItem value="Brava">Brava</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="founded_year">Ano de Fundação</Label>
                  <Input
                    id="founded_year"
                    type="number"
                    min="1900"
                    max="2024"
                    value={formData.founded_year}
                    onChange={(e) => handleInputChange('founded_year', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_email">Email</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => handleInputChange('contact_email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contact_phone">Telefone</Label>
                  <Input
                    id="contact_phone"
                    value={formData.contact_phone}
                    onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Morada</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value: 'active' | 'inactive') => handleInputChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-cv-blue hover:bg-blue-700">
                  {editingClub ? 'Atualizar' : 'Criar'} Clube
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clubes Registados ({clubs.length})</CardTitle>
          <CardDescription>
            Lista completa de clubes no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Ilha</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Fundação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clubs.map((club: any) => (
                <TableRow key={club.id}>
                  <TableCell className="font-medium">{club.name}</TableCell>
                  <TableCell>{club.island || '—'}</TableCell>
                  <TableCell>{club.contact_email || club.contact_phone || '—'}</TableCell>
                  <TableCell>{club.founded_year || '—'}</TableCell>
                  <TableCell>
                    <Badge variant={club.status === 'active' ? 'default' : 'secondary'}>
                      {club.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(club)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(club.id)}
                      >
                        <Trash2 className="w-4 h-4" />
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

export default ClubsManagement;
