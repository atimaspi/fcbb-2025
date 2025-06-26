
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const SobreEstatutosPage = () => {
  return (
    <PageLayout 
      title="Estatutos da FCBB" 
      description="Estatutos da Federação Cabo-verdiana de Basquetebol"
    >
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-cv-blue">Estatutos da FCBB</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              Os estatutos da FCBB definem a estrutura organizacional, objetivos, 
              competências e funcionamento da federação.
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Principais Capítulos:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Disposições Gerais</li>
                <li>Fins e Objetivos</li>
                <li>Membros e Filiação</li>
                <li>Órgãos Sociais</li>
                <li>Competições</li>
                <li>Recursos Financeiros</li>
                <li>Disposições Finais</li>
              </ul>
            </div>

            <div className="pt-4">
              <Button className="bg-cv-blue hover:bg-cv-blue/90">
                <Download className="w-4 h-4 mr-2" />
                Descarregar Estatutos (PDF)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default SobreEstatutosPage;
