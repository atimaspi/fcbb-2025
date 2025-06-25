
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Phone, Mail, Users, Trophy, Filter } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const ClubesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIsland, setSelectedIsland] = useState('all');

  const islands = [
    { value: 'all', label: 'Todas as Ilhas' },
    { value: 'santiago', label: 'Santiago' },
    { value: 'sao-vicente', label: 'São Vicente' },
    { value: 'sal', label: 'Sal' },
    { value: 'fogo', label: 'Fogo' },
    { value: 'brava', label: 'Brava' },
    { value: 'maio', label: 'Maio' },
    { value: 'boavista', label: 'Boa Vista' },
    { value: 'santo-antao', label: 'Santo Antão' },
    { value: 'sao-nicolau', label: 'São Nicolau' }
  ];

  const clubs = [
    {
      id: 1,
      name: "CD Travadores",
      city: "Praia",
      island: "Santiago",
      founded: 1976,
      president: "João Silva",
      phone: "+238 260 1234",
      email: "geral@travadores.cv",
      logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=100",
      achievements: ["Campeão Nacional 2024", "Taça CV 2023"],
      teams: ["Sénior Masculino", "Sénior Feminino", "Sub-18"],
      status: "ativo"
    },
    {
      id: 2,
      name: "Sporting Clube de Cabo Verde",
      city: "Praia",
      island: "Santiago",
      founded: 1968,
      president: "Maria Santos",
      phone: "+238 260 5678",
      email: "info@sporting.cv",
      logo: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?q=80&w=100",
      achievements: ["Vice-campeão Nacional 2024", "Campeão Regional 2023"],
      teams: ["Sénior Masculino", "Sénior Feminino"],
      status: "ativo"
    },
    {
      id: 3,
      name: "ABC Mindelo",
      city: "Mindelo",
      island: "São Vicente",
      founded: 1985,
      president: "Carlos Fonseca",
      phone: "+238 232 9876",
      email: "contacto@abcmindelo.cv",
      logo: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=100",
      achievements: ["3º Lugar Nacional 2024"],
      teams: ["Sénior Masculino", "Sub-18"],
      status: "ativo"
    },
    {
      id: 4,
      name: "Académico 83",
      city: "Espargos",
      island: "Sal",
      founded: 1983,
      president: "Ana Tavares",
      phone: "+238 241 3456",
      email: "academico83@gmail.com",
      logo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=100",
      achievements: ["Campeão Regional Sal 2024"],
      teams: ["Sénior Masculino"],
      status: "ativo"
    }
  ];

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIsland = selectedIsland === 'all' || club.island.toLowerCase().replace(' ', '-') === selectedIsland;
    return matchesSearch && matchesIsland;
  });

  return (
    <PageLayout
      title="Clubes Federados"
      description="Conheça todos os clubes afiliados à FCBB em todo o arquipélago cabo-verdiano"
    >
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Pesquisar clubes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedIsland} onValueChange={setSelectedIsland}>
            <SelectTrigger className="w-full md:w-64">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {islands.map((island) => (
                <SelectItem key={island.value} value={island.value}>
                  {island.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-cv-blue mb-2">{filteredClubs.length}</div>
            <p className="text-gray-600">Clubes Ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-cv-red mb-2">9</div>
            <p className="text-gray-600">Ilhas Representadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-cv-blue mb-2">45</div>
            <p className="text-gray-600">Equipas Registadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-cv-red mb-2">1350+</div>
            <p className="text-gray-600">Atletas Federados</p>
          </CardContent>
        </Card>
      </div>

      {/* Clubs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club, index) => (
          <motion.div
            key={club.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-4">
                  <img 
                    src={club.logo}
                    alt={club.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg text-cv-blue">{club.name}</CardTitle>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {club.city}, {club.island}
                    </div>
                  </div>
                  <Badge variant={club.status === 'ativo' ? 'default' : 'secondary'} className="bg-cv-red text-white">
                    {club.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-cv-blue mb-2">Informações</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Fundado em: {club.founded}</p>
                    <p>Presidente: {club.president}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-cv-blue mb-2">Contactos</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-3 h-3 mr-2" />
                      {club.phone}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-3 h-3 mr-2" />
                      {club.email}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-cv-blue mb-2">Equipas</h4>
                  <div className="flex flex-wrap gap-1">
                    {club.teams.map((team, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {team}
                      </Badge>
                    ))}
                  </div>
                </div>

                {club.achievements.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-cv-blue mb-2 flex items-center">
                      <Trophy className="w-4 h-4 mr-1" />
                      Conquistas Recentes
                    </h4>
                    <div className="space-y-1">
                      {club.achievements.map((achievement, idx) => (
                        <Badge key={idx} variant="outline" className="mr-1 mb-1 text-xs border-cv-yellow text-cv-blue">
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Button className="w-full bg-cv-blue hover:bg-cv-blue/90">
                  <Users className="w-4 h-4 mr-2" />
                  Ver Detalhes
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredClubs.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Nenhum clube encontrado com os filtros selecionados.</p>
        </div>
      )}
    </PageLayout>
  );
};

export default ClubesPage;
