
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Plus, Upload, Trash2, Edit } from 'lucide-react';

const GalleryManagement = () => {
  const { toast } = useToast();
  const { uploadFile, uploading, progress } = useFileUpload({
    folder: 'gallery',
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'geral',
    alt_text: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "Erro",
        description: "Selecione uma imagem para upload",
        variant: "destructive",
      });
      return;
    }

    try {
      const uploadedFile = await uploadFile(
        selectedFile,
        'gallery',
        undefined,
        {
          alt_text: formData.alt_text,
          description: formData.description,
          is_featured: false
        }
      );

      if (uploadedFile) {
        // Here you would also save gallery entry to database
        toast({
          title: "Sucesso",
          description: "Imagem adicionada à galeria com sucesso!",
        });
        setIsDialogOpen(false);
        resetForm();
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao fazer upload da imagem",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'geral',
      alt_text: ''
    });
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Auto-fill alt text with filename
      if (!formData.alt_text) {
        setFormData({ ...formData, alt_text: file.name.split('.')[0] });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue">Gestão de Galeria</h2>
          <p className="text-gray-600">Upload e gestão de imagens e vídeos</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-cv-blue hover:bg-cv-blue/90">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Mídia
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Nova Mídia</DialogTitle>
              <DialogDescription>
                Faça upload de imagens para a galeria do site
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Selecionar Arquivo *</Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
                {selectedFile && (
                  <p className="text-sm text-gray-600">
                    Arquivo selecionado: {selectedFile.name}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Título da imagem"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="Descrição da imagem"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="geral">Geral</option>
                    <option value="competicoes">Competições</option>
                    <option value="treinos">Treinos</option>
                    <option value="eventos">Eventos</option>
                    <option value="selecoes">Seleções</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alt_text">Texto Alternativo</Label>
                  <Input
                    id="alt_text"
                    value={formData.alt_text}
                    onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                    placeholder="Descrição para acessibilidade"
                  />
                </div>
              </div>

              {uploading && (
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-cv-blue h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-cv-blue hover:bg-cv-blue/90" disabled={uploading}>
                  {uploading ? (
                    <>
                      <Upload className="h-4 w-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Fazer Upload
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Imagens Recentes</CardTitle>
            <CardDescription>Últimas imagens adicionadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Upload className="mx-auto h-12 w-12 mb-4" />
              <p>Nenhuma imagem encontrada</p>
              <p className="text-sm">Adicione imagens para começar</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estatísticas</CardTitle>
            <CardDescription>Resumo da galeria</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Total Imagens:</span>
              <span className="font-bold">0</span>
            </div>
            <div className="flex justify-between">
              <span>Categorias:</span>
              <span className="font-bold">5</span>
            </div>
            <div className="flex justify-between">
              <span>Espaço Usado:</span>
              <span className="font-bold">0 MB</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Ferramentas úteis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload em Lote
            </Button>
            <Button variant="outline" className="w-full">
              <Edit className="h-4 w-4 mr-2" />
              Organizar Galeria
            </Button>
            <Button variant="outline" className="w-full">
              <Trash2 className="h-4 w-4 mr-2" />
              Limpar Cache
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GalleryManagement;
