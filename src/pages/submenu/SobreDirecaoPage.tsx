
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

const SobreDirecaoPage = () => {
  const direcao = [
    { nome: "Presidente", cargo: "Presidente da Direção" },
    { nome: "Vice-Presidente", cargo: "Vice-Presidente" },
    { nome: "Secretário", cargo: "Secretário Geral" },
    { nome: "Tesoureiro", cargo: "Tesoureiro" },
  ];

  return (
    <PageLayout 
      title="Direção da FCBB" 
      description="Conheça os membros da direção"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          {direcao.map((membro, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-cv-blue rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{membro.nome}</h3>
                    <p className="text-cv-blue">{membro.cargo}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default SobreDirecaoPage;
