
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
import { Plus, Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

const HeroSlidesManagement = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<any>(null);
  const [slides, setSlides] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image_url: '',
    button_text: '',
    button_url: '',
    active: true,
    order_index: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Here you would save to database
      toast({
        title: "Sucesso",
        description: editingSlide ? "Slide atualizado com sucesso!" : "Slide criado com sucesso!",
      });
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar slide",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este slide?')) {
      try {
        // Here you would delete from database
        toast({
          title: "Sucesso",
          description: "Slide eliminado com sucesso!",
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao eliminar slide",
          variant: "destructive",
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      image_url: '',
      button_text: '',
      button_url: '',
      active: true,
      order_index: 0
    });
    setEditingSlide(null);
  };

  const openEditDialog = (slide: any) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title || '',
      subtitle: slide.subtitle || '',
      description: slide.description || '',
      image_url: slide.image_url || '',
      button_text: slide.button_text || '',
      button_url: slide.button_url || '',
      active: slide.active || true,
      order_index: slide.order_index || 0
    });
    setIsDialogOpen(true);
  };

  const moveSlide = async (slideId: string, direction: 'up' | 'down') => {
    try {
      // Here you would update the order in database
      toast({
        title: "Sucesso",
        description: `Slide movido para ${direction === 'up' ? 'cima' : 'baixo'}!`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao reordenar slide",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue">Gestão de Slides do Banner</h2>
          <p className="text-gray-600">Gerir slides do banner principal da página inicial</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-cv-blue hover:bg-cv-blue/90">
              <Plus className="h-4 w-4 mr-2" />
              Novo Slide
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingSlide ? 'Editar Slide' : 'Novo Slide'}</DialogTitle>
              <DialogDescription>
                Configure o conteúdo do slide do banner principal
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título Principal *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Bem-vindos à FCBB"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtítulo</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Ex: Federação Cabo-verdiana de Basquetebol"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="Texto descritivo do slide"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">URL da Imagem de Fundo *</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://exemplo.com/imagem.jpg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="button_text">Texto do Botão</Label>
                  <Input
                    id="button_text"
                    value={formData.button_text}
                    onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                    placeholder="Ex: Saber Mais"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="button_url">URL do Botão</Label>
                  <Input
                    id="button_url"
                    value={formData.button_url}
                    onChange={(e) => setFormData({ ...formData, button_url: e.target.value })}
                    placeholder="/sobre"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="order_index">Ordem de Exibição</Label>
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
                  <Label htmlFor="active">Slide Ativo</Label>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-cv-blue hover:bg-cv-blue/90">
                  {editingSlide ? 'Atualizar' : 'Criar'} Slide
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Slides Existentes</CardTitle>
          <CardDescription>Lista de slides do banner principal</CardDescription>
        </CardHeader>
        <CardContent>
          {slides.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhum slide cadastrado ainda.</p>
              <p className="text-sm">Adicione o primeiro slide para começar.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ordem</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {slides.map((slide: any) => (
                  <TableRow key={slide.id}>
                    <TableCell>{slide.order_index}</TableCell>
                    <TableCell className="font-medium">{slide.title}</TableCell>
                    <TableCell>
                      <Badge variant={slide.active ? "default" : "secondary"}>
                        {slide.active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => moveSlide(slide.id, 'up')}>
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => moveSlide(slide.id, 'down')}>
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => openEditDialog(slide)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(slide.id)}>
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

export default HeroSlidesManagement;
