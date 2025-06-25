
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const UserProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    avatar_url: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      setUser(session.user);

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(profileData);
      setFormData({
        full_name: profileData.full_name || '',
        avatar_url: profileData.avatar_url || ''
      });
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          avatar_url: formData.avatar_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        toast({
          title: "Erro",
          description: "Não foi possível actualizar o perfil.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Sucesso",
        description: "Perfil actualizado com sucesso!",
      });

      fetchProfile(); // Refresh profile data
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002D72]"></div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500">Não foi possível carregar o perfil do utilizador.</p>
        </CardContent>
      </Card>
    );
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'editor':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Perfil do Utilizador
        </CardTitle>
        <CardDescription>
          Gerir informações da sua conta
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                disabled
                className="bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1">
                O email não pode ser alterado
              </p>
            </div>

            <div>
              <Label htmlFor="full_name">Nome Completo</Label>
              <Input
                id="full_name"
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="Introduza o seu nome completo"
              />
            </div>

            <div>
              <Label htmlFor="avatar_url">URL do Avatar</Label>
              <Input
                id="avatar_url"
                type="url"
                value={formData.avatar_url}
                onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                placeholder="https://exemplo.com/avatar.jpg"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Função</Label>
              <div className="mt-2">
                <Badge className={getRoleBadgeColor(profile.role)}>
                  {profile.role === 'admin' ? 'Administrador' : 
                   profile.role === 'editor' ? 'Editor' : 'Utilizador'}
                </Badge>
              </div>
            </div>

            <div>
              <Label>Conta criada</Label>
              <p className="text-sm text-gray-600 mt-1">
                {new Date(profile.created_at).toLocaleDateString('pt-PT')}
              </p>
            </div>

            <div>
              <Label>Última actualização</Label>
              <p className="text-sm text-gray-600 mt-1">
                {new Date(profile.updated_at).toLocaleDateString('pt-PT')}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleSave}
            disabled={saving}
            className="bg-[#002D72] hover:bg-[#002D72]/90"
          >
            {saving ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                A guardar...
              </div>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Guardar Alterações
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
