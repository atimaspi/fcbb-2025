
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Send } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const ContactosPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Morada",
      content: "Av. Cidade de Lisboa, Palmarejo\nCidade da Praia, Santiago\nCabo Verde",
      color: "text-cv-blue"
    },
    {
      icon: Phone,
      title: "Telefones",
      content: "+238 260 4890\n+238 260 4891\n+238 991 2345 (Emergência)",
      color: "text-cv-red"
    },
    {
      icon: Mail,
      title: "Email",
      content: "geral@fcbb.cv\ncompetitions@fcbb.cv\ninfo@fcbb.cv",
      color: "text-cv-blue"
    },
    {
      icon: Clock,
      title: "Horário",
      content: "Segunda a Sexta: 08:00 - 17:00\nSábado: 08:00 - 12:00\nDomingo: Fechado",
      color: "text-cv-red"
    }
  ];

  const socialMedia = [
    {
      icon: Facebook,
      name: "Facebook",
      url: "https://facebook.com/fcbb.cv",
      color: "bg-blue-600",
      followers: "15.2k"
    },
    {
      icon: Instagram,
      name: "Instagram", 
      url: "https://instagram.com/fcbb.cv",
      color: "bg-pink-600",
      followers: "8.7k"
    },
    {
      icon: Youtube,
      name: "YouTube",
      url: "https://youtube.com/fcbbcaboverde",
      color: "bg-red-600",
      followers: "4.1k"
    }
  ];

  return (
    <PageLayout
      title="Contactos"
      description="Entre em contacto connosco. Estamos aqui para ajudar e esclarecer todas as suas dúvidas"
    >
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-cv-blue mb-6">Informações de Contacto</h2>
            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-l-4 border-cv-blue">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <info.icon className={`w-6 h-6 ${info.color} mt-1`} />
                        <div>
                          <h3 className="font-semibold text-cv-blue mb-2">{info.title}</h3>
                          <p className="text-gray-700 whitespace-pre-line text-sm">
                            {info.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold text-cv-blue mb-4">Siga-nos nas Redes Sociais</h3>
            <div className="flex space-x-4">
              {socialMedia.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`${social.color} text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex-1 text-center`}
                >
                  <social.icon className="w-6 h-6 mx-auto mb-2" />
                  <p className="font-medium text-sm">{social.name}</p>
                  <p className="text-xs opacity-90">{social.followers}</p>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-xl font-bold text-cv-blue mb-4">Localização</h3>
            <Card>
              <CardContent className="p-0">
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-medium">Mapa Interativo</p>
                    <p className="text-sm">Palmarejo, Cidade da Praia</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-cv-blue">Envie-nos uma Mensagem</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="seu.email@exemplo.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto *
                  </label>
                  <Select value={formData.subject} onValueChange={(value) => handleChange('subject', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o assunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="geral">Informação Geral</SelectItem>
                      <SelectItem value="filiacao">Filiação de Clubes</SelectItem>
                      <SelectItem value="competicoes">Competições</SelectItem>
                      <SelectItem value="arbitragem">Arbitragem</SelectItem>
                      <SelectItem value="formacao">Formação</SelectItem>
                      <SelectItem value="imprensa">Imprensa</SelectItem>
                      <SelectItem value="parcerias">Parcerias</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Descreva a sua mensagem aqui..."
                    rows={6}
                  />
                </div>

                <Button type="submit" className="w-full bg-cv-blue hover:bg-cv-blue/90">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-cv-blue">Links Úteis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 text-left">
                  <div>
                    <p className="font-medium text-sm">Filiação de Clubes</p>
                    <p className="text-xs text-gray-600">Processo de registo</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 text-left">
                  <div>
                    <p className="font-medium text-sm">Formação</p>
                    <p className="text-xs text-gray-600">Cursos e workshops</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 text-left">
                  <div>
                    <p className="font-medium text-sm">Arbitragem</p>
                    <p className="text-xs text-gray-600">Certificação</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 text-left">
                  <div>
                    <p className="font-medium text-sm">Área de Imprensa</p>
                    <p className="text-xs text-gray-600">Material oficial</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default ContactosPage;
