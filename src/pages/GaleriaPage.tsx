
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Search, Image, Play, Calendar, Eye, Download } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const GaleriaPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('fotos');

  const photos = [
    {
      id: 1,
      title: "Final da Liga Nacional 2024",
      url: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?q=80&w=600",
      thumbnail: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?q=80&w=300",
      category: "Competições",
      date: "2024-01-15",
      views: 1250
    },
    {
      id: 2,
      title: "Seleção Nacional em Treino",
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=300",
      category: "Seleções",
      date: "2024-01-10",
      views: 890
    },
    {
      id: 3,
      title: "Inauguração Pavilhão Fogo",
      url: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=600",
      thumbnail: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=300",
      category: "Infraestruturas",
      date: "2024-01-08",
      views: 654
    },
    {
      id: 4,
      title: "Workshop de Treinadores",
      url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=600",
      thumbnail: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=300",
      category: "Formação",
      date: "2024-01-05",
      views: 432
    },
    {
      id: 5,
      title: "Liga Feminina - Jogo Destacado",
      url: "https://images.unsplash.com/photo-1594736797933-d0aa4cb6a2dc?q=80&w=600",
      thumbnail: "https://images.unsplash.com/photo-1594736797933-d0aa4cb6a2dc?q=80&w=300",
      category: "Competições",
      date: "2024-01-03",
      views: 789
    },
    {
      id: 6,
      title: "Atletas Sub-18 em Ação",
      url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600",
      thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=300",
      category: "Formação",
      date: "2024-01-01",
      views: 567
    }
  ];

  const videos = [
    {
      id: 1,
      title: "Melhores Momentos - Final Liga Nacional 2024",
      thumbnail: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?q=80&w=400",
      duration: "5:42",
      category: "Competições",
      date: "2024-01-15",
      views: 3250
    },
    {
      id: 2,
      title: "Entrevista com o Selecionador Nacional",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400",
      duration: "12:30",
      category: "Seleções",
      date: "2024-01-12",
      views: 1890
    },
    {
      id: 3,
      title: "Documentário: História do Basquetebol CV",
      thumbnail: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=400",
      duration: "25:15",
      category: "Documentários",
      date: "2024-01-01",
      views: 4567
    }
  ];

  const filteredPhotos = photos.filter(photo =>
    photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    photo.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageLayout
      title="Galeria Multimédia"
      description="Fotos e vídeos dos melhores momentos do basquetebol cabo-verdiano"
    >
      {/* Search Section */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Pesquisar na galeria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="fotos" className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            Fotos ({filteredPhotos.length})
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            Vídeos ({filteredVideos.length})
          </TabsTrigger>
        </TabsList>

        {/* Photos Tab */}
        <TabsContent value="fotos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className="relative group">
                        <img
                          src={photo.thumbnail}
                          alt={photo.title}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="w-8 h-8 text-white" />
                        </div>
                        <Badge className="absolute top-3 left-3 bg-cv-blue text-white">
                          {photo.category}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-cv-blue mb-2 line-clamp-2">
                          {photo.title}
                        </h3>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(photo.date).toLocaleDateString('pt-PT')}
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {photo.views}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <div className="space-y-4">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-auto max-h-[70vh] object-contain"
                      />
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-bold text-cv-blue">{photo.title}</h3>
                          <p className="text-gray-600">{photo.category} • {new Date(photo.date).toLocaleDateString('pt-PT')}</p>
                        </div>
                        <Button variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="relative group">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="bg-cv-red rounded-full p-4 group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                    <Badge className="absolute top-3 left-3 bg-cv-blue text-white">
                      {video.category}
                    </Badge>
                    <Badge className="absolute bottom-3 right-3 bg-black/70 text-white">
                      {video.duration}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-cv-blue mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(video.date).toLocaleDateString('pt-PT')}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {video.views}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {((activeTab === 'fotos' && filteredPhotos.length === 0) || (activeTab === 'videos' && filteredVideos.length === 0)) && (
        <div className="text-center py-12">
          {activeTab === 'fotos' ? <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" /> : <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />}
          <p className="text-gray-500 text-lg">Nenhum {activeTab === 'fotos' ? 'foto' : 'vídeo'} encontrado.</p>
        </div>
      )}
    </PageLayout>
  );
};

export default GaleriaPage;
