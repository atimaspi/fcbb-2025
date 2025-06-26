
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SobreMissaoVisaoPage = () => {
  return (
    <PageLayout 
      title="Missão e Visão" 
      description="Conheca os nossos valores e objetivos"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-cv-blue">Missão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Promover e desenvolver o basquetebol em Cabo Verde, garantindo 
                a formação de atletas e contribuindo para o crescimento do desporto nacional.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-cv-blue">Visão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Ser uma federação de referência no basquetebol africano, reconhecida 
                pela qualidade das competições e formação dos atletas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default SobreMissaoVisaoPage;
