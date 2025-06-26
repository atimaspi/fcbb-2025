
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

const SobreDirecaoPage = () => {
  const directores = [
    { nome: "Presidente da Direção", cargo: "Presidente", email: "presidente@fcbb.cv" },
    { nome: "Vice-Presidente", cargo: "Vice-Presidente", email: "vice@fcbb.cv" },
    { nome: "Secretário Geral", cargo: "Secretário", email: "secretario@fcbb.cv" },
    { nome: "Tesoureiro", cargo: "Tesoureiro", email: "tesoureiro@fcbb.cv" },
  ];

  return (
    <PageLayout 
      title="Direção da FCBB" 
      description="Conheça os membros da direção da Federação Cabo-verdiana de Basquetebol"
    >
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-3xl text-cv-blue">Direção da FCBB</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              A direção da FCBB é composta por profissionais dedicados ao desenvolvimento 
              do basquetebol cabo-verdiano, trabalhando para elevar o nível do desporto no país.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {directores.map((diretor, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-cv-blue rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{diretor.nome}</h3>
                    <p className="text-cv-blue font-medium">{diretor.cargo}</p>
                    <p className="text-sm text-gray-600">{diretor.email}</p>
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
