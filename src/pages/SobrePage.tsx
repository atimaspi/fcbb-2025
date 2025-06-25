
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { History, Users, Target, Award, FileText, Handshake, Building } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const SobrePage = () => {
  const boardMembers = [
    {
      name: "José Silva",
      position: "Presidente",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
      experience: "15 anos no basquetebol"
    },
    {
      name: "Maria Santos",
      position: "Vice-Presidente",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b2e2a9e7?q=80&w=150",
      experience: "Ex-jogadora internacional"
    },
    {
      name: "Carlos Fonseca",
      position: "Secretário-Geral",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150",
      experience: "Treinador certificado"
    },
    {
      name: "Ana Tavares",
      position: "Tesoureira",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150",
      experience: "Gestão desportiva"
    }
  ];

  const partners = [
    {
      name: "Governo de Cabo Verde",
      type: "Institucional",
      logo: "https://images.unsplash.com/photo-1560472354-b33eddccfed7?q=80&w=120",
      description: "Apoio governamental ao desenvolvimento do basquetebol"
    },
    {
      name: "FIBA África",
      type: "Federação",
      logo: "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?q=80&w=120",
      description: "Filiação continental"
    },
    {
      name: "COC - Comité Olímpico",
      type: "Olímpico",
      logo: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=120",
      description: "Movimento olímpico cabo-verdiano"
    },
    {
      name: "Banco Cabo Verde",
      type: "Patrocinador",
      logo: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?q=80&w=120",
      description: "Parceiro financeiro oficial"
    }
  ];

  const achievements = [
    "Participação no AfroBasket 2021",
    "Organização do Torneio CPLP 2020",
    "Certificação FIBA Level 3",
    "Programa de Desenvolvimento Juvenil",
    "28 Clubes Federados",
    "9 Ilhas com Basquetebol Ativo"
  ];

  return (
    <PageLayout
      title="Sobre a FCBB"
      description="Conheça a história, missão e estrutura da Federação Cabo-verdiana de Basquetebol"
    >
      <Tabs defaultValue="historia" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
          <TabsTrigger value="historia">História</TabsTrigger>
          <TabsTrigger value="direcao">Direção</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="parceiros">Parceiros</TabsTrigger>
        </TabsList>

        {/* História Tab */}
        <TabsContent value="historia" className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-cv-blue">
                  <History className="w-5 h-5 mr-2" />
                  Nossa História
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  A Federação Cabo-verdiana de Basquetebol (FCBB) foi fundada em 1986, 
                  consolidando o desenvolvimento da modalidade que já se praticava nas 
                  ilhas desde a década de 1960.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Desde então, tem promovido o crescimento sustentável do basquetebol 
                  em todo o arquipélago, organizando competições nacionais e regionais, 
                  formando atletas e técnicos, e representando Cabo Verde internacionalmente.
                </p>
                <div className="bg-cv-blue/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-cv-blue mb-2">Marcos Históricos</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 1986 - Fundação da FCBB</li>
                    <li>• 1992 - Primeira participação internacional</li>
                    <li>• 2005 - Filiação à FIBA África</li>
                    <li>• 2015 - Certificação FIBA Level 3</li>
                    <li>• 2021 - Participação no AfroBasket</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-cv-blue">
                  <Target className="w-5 h-5 mr-2" />
                  Missão e Visão
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-cv-red mb-2">Missão</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Promover, desenvolver e regular a prática do basquetebol em 
                    Cabo Verde, formando atletas de excelência e contribuindo para 
                    o desenvolvimento social através do desporto.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-cv-red mb-2">Visão</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Ser uma federação de referência no basquetebol africano, 
                    com estruturas modernas e atletas competitivos a nível internacional.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-cv-red mb-2">Valores</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Excelência</Badge>
                    <Badge variant="outline">Integridade</Badge>
                    <Badge variant="outline">Inclusão</Badge>
                    <Badge variant="outline">Desenvolvimento</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-cv-blue">
                  <Award className="w-5 h-5 mr-2" />
                  Principais Conquistas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-cv-blue/5 p-3 rounded-lg text-center"
                    >
                      <Award className="w-6 h-6 text-cv-blue mx-auto mb-2" />
                      <p className="text-sm font-medium text-cv-blue">{achievement}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Direção Tab */}
        <TabsContent value="direcao" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-cv-blue">
                <Users className="w-5 h-5 mr-2" />
                Órgãos Diretivos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {boardMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="font-semibold text-cv-blue">{member.name}</h3>
                    <p className="text-cv-red font-medium text-sm">{member.position}</p>
                    <p className="text-gray-600 text-xs mt-1">{member.experience}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documentos Tab */}
        <TabsContent value="documentos" className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-cv-blue">
                  <FileText className="w-5 h-5 mr-2" />
                  Documentos Oficiais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Estatutos da FCBB", size: "245 KB", type: "PDF" },
                  { name: "Regulamento Geral", size: "189 KB", type: "PDF" },
                  { name: "Código Disciplinar", size: "156 KB", type: "PDF" },
                  { name: "Regulamento de Competições", size: "203 KB", type: "PDF" }
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 text-cv-blue mr-3" />
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-gray-600">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-cv-blue">
                  <Building className="w-5 h-5 mr-2" />
                  Estrutura Organizacional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-cv-blue text-white rounded-lg">
                    <h4 className="font-semibold">Assembleia Geral</h4>
                    <p className="text-sm mt-1">Órgão máximo de decisão</p>
                  </div>
                  <div className="text-center p-4 bg-cv-red text-white rounded-lg">
                    <h4 className="font-semibold">Direção</h4>
                    <p className="text-sm mt-1">Órgão executivo</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-cv-yellow text-cv-dark rounded-lg">
                      <h4 className="font-semibold text-sm">Conselho Fiscal</h4>
                      <p className="text-xs mt-1">Fiscalização</p>
                    </div>
                    <div className="text-center p-3 bg-gray-200 text-gray-700 rounded-lg">
                      <h4 className="font-semibold text-sm">Conselho Disciplinar</h4>
                      <p className="text-xs mt-1">Disciplina</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Parceiros Tab */}
        <TabsContent value="parceiros" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-cv-blue">
                <Handshake className="w-5 h-5 mr-2" />
                Nossos Parceiros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {partners.map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-16 h-16 object-contain"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-cv-blue">{partner.name}</h3>
                      <Badge variant="outline" className="mb-2">{partner.type}</Badge>
                      <p className="text-sm text-gray-600">{partner.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default SobrePage;
