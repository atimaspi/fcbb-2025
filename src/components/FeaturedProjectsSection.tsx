
import { motion } from 'framer-motion';
import { GraduationCap, Shield, Plane, Users, BookOpen, Trophy, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const FeaturedProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "Basket nas Escolas",
      description: "Programa nacional que leva o basquetebol às escolas primárias e secundárias de todas as ilhas, identificando talentos e promovendo valores através do desporto",
      icon: GraduationCap,
      color: "from-[#E10600] to-[#FFD100]",
      stats: { schools: 45, students: 1200, islands: 10 },
      achievements: ["12 Escolas Certificadas", "200 Professores Formados", "Festival Anual"]
    },
    {
      id: 2,
      title: "Formação de Árbitros",
      description: "Academia de formação e certificação de árbitros segundo os padrões FIBA, garantindo qualidade e profissionalismo nas competições nacionais",
      icon: Shield,
      color: "from-[#002D72] to-[#E10600]",
      stats: { referees: 30, certified: 18, fiba: 5 },
      achievements: ["Certificação FIBA", "Intercâmbio Regional", "Programa Mentor"]
    },
    {
      id: 3,
      title: "Intercâmbio Internacional",
      description: "Parcerias estratégicas com federações africanas e europeias para intercâmbio de atletas, técnicos e conhecimento, elevando o nível do basquetebol nacional",
      icon: Plane,
      color: "from-[#FFD100] to-[#002D72]",
      stats: { partners: 8, exchanges: 24, countries: 6 },
      achievements: ["Protocolo FIBA África", "Bolsas de Estudo", "Campamentos Internacionais"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="cv-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[#002D72] mb-6 font-display">
            Projetos em Destaque
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Iniciativas transformadoras que estão a revolucionar o basquetebol cabo-verdiano
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="bg-white shadow-xl border-0 overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <div className={`h-2 bg-gradient-to-r ${project.color}`}></div>
                
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className={`bg-gradient-to-r ${project.color} p-4 rounded-2xl mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <project.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#002D72] font-display group-hover:text-[#E10600] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                    {Object.entries(project.stats).map(([key, value], idx) => (
                      <div key={key} className="text-center">
                        <div className="text-2xl font-bold text-[#002D72]">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">{key.replace('_', ' ')}</div>
                      </div>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="font-bold text-[#002D72] mb-3 flex items-center">
                      <Trophy className="h-4 w-4 mr-2 text-[#FFD100]" />
                      Conquistas:
                    </h4>
                    <div className="space-y-2">
                      {project.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="w-2 h-2 bg-[#E10600] rounded-full mr-3"></div>
                          <span className="text-sm text-gray-600">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-[#002D72] to-[#E10600] text-white font-bold hover:scale-105 transition-all duration-300 group-hover:shadow-lg"
                  >
                    Saiba Mais
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#002D72] via-[#E10600] to-[#FFD100] rounded-3xl p-1 shadow-2xl"
        >
          <div className="bg-white rounded-3xl p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-bold text-[#002D72] mb-6 font-display">
                  Impacto Social
                </h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Os nossos projetos vão além do desporto, criando oportunidades educativas, 
                  promovendo inclusão social e construindo pontes entre as comunidades de todas as ilhas.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-3xl font-bold text-[#E10600] mb-2">1,500+</div>
                    <div className="text-sm text-gray-600">Jovens Beneficiados</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-3xl font-bold text-[#002D72] mb-2">10</div>
                    <div className="text-sm text-gray-600">Ilhas Cobertas</div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-[#FFD100] to-[#E10600] p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <Users className="h-16 w-16 text-white mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-white mb-4">Junte-se a Nós</h4>
                  <p className="text-white/90 mb-6">
                    Quer fazer parte desta transformação? Contacte-nos para saber como pode contribuir.
                  </p>
                  <Button 
                    size="lg"
                    className="bg-white text-[#002D72] font-bold hover:bg-gray-100 hover:scale-105 transition-all"
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    Voluntariado
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
