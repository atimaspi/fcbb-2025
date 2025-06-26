
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
import { useContentData } from '@/hooks/useContentData';
import { Plus, Edit, Trash2, Eye, Upload, Filter } from 'lucide-react';

const NewsManagement = () => {
  const { toast } = useToast();
  const { newsData } = useContentData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'geral',
    status: 'rascunho',
    featured_image: '',
    author: '',
    tags: '',
    publish_date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Aqui seria a integração com Supabase para salvar
      toast({
        title: "Sucesso",
        description: editingNews ? "Notícia atualizada com sucesso!" : "Notícia criada com sucesso!",
      });
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar notícia",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta notícia?')) {
      try {
        // Aqui seria a integração com Supabase para deletar
        toast({
          title: "Sucesso",
          description: "Notícia eliminada com sucesso!",
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao eliminar notícia",
          variant: "destructive",
        });
      }
    }
  };

  const handlePublish = async (id: string, status: string) => {
    try {
      // Aqui seria a integração com Supabase para atualizar status
      toast({
        title: "Sucesso",
        description: `Notícia ${status === 'publicado' ? 'publicada' : 'despublicada'} com sucesso!`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao alterar status da notícia",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      summary: '',
      content: '',
      category: 'geral',
      status: 'rascunho',
      featured_image: '',
      author: '',
      tags: '',
      publish_date: new Date().toISOString().split('T')[0]
    });
    setEditingNews(null);
  };

  const openEditDialog = (news: any) => {
    setEditingNews(news);
    setFormData({
      title: news.title || '',
      summary: news.summary || '',
      content: news.content || '',
      category: news.category || 'geral',
      status: news.status || 'rascunho',
      featured_image: news.featured_image || '',
      author: news.author || '',
      tags: news.tags || '',
      publish_date: news.publish_date ? news.publish_date.split('T')[0] : new Date().toISOString().split('T')[0]
    });
    setIsDialogOpen(true);
  };

  const filteredNews = newsData.filter((news: any) => {
    const matchesStatus = filterStatus === 'all' || news.status === filterStatus;
    const matchesSearch = news.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.summary?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'publicado':
        return <Badge className="bg-green-100 text-green-800">Publicado</Badge>;
      case 'pendente':
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case 'rascunho':
        return <Badge className="bg-gray-100 text-gray-800">Rascunho</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue">Gestão de Notícias</h2>
          <p className="text-gray-600">Criar, editar e gerir notícias da FCBB</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-cv-blue hover:bg-cv-blue/90">
              <Plus className="h-4 w-4 mr-2" />
              Nova Notícia
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingNews ? 'Editar Notícia' : 'Nova Notícia'}</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para {editingNews ? 'atualizar' : 'criar'} a notícia
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título da Notícia *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Autor</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="summary">Resumo</Label>
                <Textarea
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  rows={3}
                  placeholder="Breve resumo da notícia..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Conteúdo Completo *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  placeholder="Conteúdo completo da notícia..."
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
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
                    <option value="selecoes">Seleções</option>
                    <option value="clubes">Clubes</option>
                    <option value="formacao">Formação</option>
                    <option value="arbitragem">Arbitragem</option>
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
                    <option value="rascunho">Rascunho</option>
                    <option value="pendente">Pendente</option>
                    <option value="publicado">Publicado</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publish_date">Data de Publicação</Label>
                  <Input
                    id="publish_date"
                    type="date"
                    value={formData.publish_date}
                    onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="featured_image">URL da Imagem Destacada</Label>
                  <Input
                    id="featured_image"
                    value={formData.featured_image}
                    onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="basquete, fcbb, competição"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-cv-blue hover:bg-cv-blue/90">
                  {editingNews ? 'Atualizar' : 'Criar'} Notícia
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros e Pesquisa */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros e Pesquisa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="Pesquisar por título ou resumo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="all">Todos os Status</option>
                <option value="rascunho">Rascunho</option>
                <option value="pendente">Pendente</option>
                <option value="publicado">Publicado</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Notícias */}
      <Card>
        <CardHeader>
          <CardTitle>Notícias Existentes ({filteredNews.length})</CardTitle>
          <CardDescription>Lista de todas as notícias do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNews.map((news: any) => (
                <TableRow key={news.id}>
                  <TableCell className="font-medium max-w-xs truncate">{news.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{news.category}</Badge>
                  </TableCell>
                  <TableCell>{news.author || 'N/A'}</TableCell>
                  <TableCell>{getStatusBadge(news.status)}</TableCell>
                  <TableCell>{new Date(news.created_at).toLocaleDateString('pt-PT')}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(news)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handlePublish(news.id, news.status === 'publicado' ? 'rascunho' : 'publicado')}
                        className={news.status === 'publicado' ? 'text-red-600' : 'text-green-600'}
                      >
                        {news.status === 'publicado' ? 'Despublicar' : 'Publicar'}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(news.id)}>
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

export default NewsManagement;
