
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Calendar, Shield, Save, Edit } from 'lucide-react';

const UserProfile = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
    phone: profile?.phone || '',
    address: profile?.address || ''
  });

  const handleSave = async () => {
    try {
      // Here you would typically update the profile in your database
      toast({
        title: "Sucesso",
        description: "Perfil atualizado com sucesso!",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o perfil.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cv-blue mb-2">Perfil do Utilizador</h2>
        <p className="text-gray-600">Gerir as suas informações pessoais</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-cv-blue">
              <User className="w-5 h-5 mr-2" />
              Informações Básicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-cv-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-semibold text-lg">{profile?.full_name || 'Utilizador'}</h3>
              <p className="text-gray-600 text-sm">{user?.email}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 text-cv-blue mr-2" />
                <span>{user?.email}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 text-cv-blue mr-2" />
                <span>Membro desde {new Date(user?.created_at || '').toLocaleDateString('pt-PT')}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Shield className="w-4 h-4 text-cv-blue mr-2" />
                <span className="capitalize">{profile?.role || 'utilizador'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Editable Profile */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-cv-blue">Detalhes do Perfil</CardTitle>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="w-4 h-4 mr-2" />
                {isEditing ? 'Cancelar' : 'Editar'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <Input
                  value={formData.full_name}
                  onChange={(e) => handleChange('full_name', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  disabled={!isEditing}
                  placeholder="+238 XXX XXXX"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Morada
              </label>
              <Input
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                disabled={!isEditing}
                placeholder="Sua morada completa"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biografia
              </label>
              <Textarea
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                disabled={!isEditing}
                placeholder="Uma breve descrição sobre você..."
                rows={4}
              />
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSave} className="bg-cv-blue hover:bg-cv-blue/90">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Alterações
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-cv-blue">Configurações da Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Alterar Password</h4>
              <p className="text-sm text-gray-600 mb-4">
                Para alterar a sua password, clique no botão abaixo.
              </p>
              <Button variant="outline">
                Alterar Password
              </Button>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Preferências</h4>
              <p className="text-sm text-gray-600 mb-4">
                Configure as suas preferências de notificação e privacidade.
              </p>
              <Button variant="outline">
                Configurar Preferências
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
