
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UserPlus, Loader2 } from 'lucide-react';

const CreateAdminUser = () => {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    email: 'admin@fcbb.cv',
    password: 'admin123456',
    fullName: 'Administrador FCBB'
  });

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      // Create user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          }
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        toast({
          title: "Erro na Criação",
          description: authError.message,
          variant: "destructive",
        });
        return;
      }

      if (authData.user) {
        // Update profile to admin role
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: authData.user.id,
            full_name: formData.fullName,
            role: 'admin',
            updated_at: new Date().toISOString()
          });

        if (profileError) {
          console.error('Profile error:', profileError);
          toast({
            title: "Aviso",
            description: "Utilizador criado mas houve erro ao definir perfil de admin",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Administrador Criado!",
            description: `Admin criado com sucesso: ${formData.email}`,
          });
        }
      }

    } catch (error: any) {
      console.error('Error creating admin:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao criar administrador",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleQuickLogin = async () => {
    setIsCreating(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast({
          title: "Erro de Login",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Realizado",
          description: "Acesso à área reservada liberado!",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Erro ao fazer login",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-cv-blue">
          <UserPlus className="h-5 w-5" />
          <span>Criar Administrador de Teste</span>
        </CardTitle>
        <CardDescription>
          Crie um utilizador administrador para testar as funcionalidades
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateAdmin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email do Admin</Label>
            <Input
              id="admin-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-password">Palavra-passe</Label>
            <Input
              id="admin-password"
              type="text"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-name">Nome Completo</Label>
            <Input
              id="admin-name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Button
              type="submit"
              className="w-full bg-cv-blue hover:bg-cv-blue/90"
              disabled={isCreating}
            >
              {isCreating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Criando...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Criar Administrador
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleQuickLogin}
              disabled={isCreating}
            >
              Login Direto (se já existe)
            </Button>
          </div>
        </form>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-sm text-gray-700 mb-2">Credenciais de Teste:</h4>
          <p className="text-xs text-gray-600">Email: {formData.email}</p>
          <p className="text-xs text-gray-600">Password: {formData.password}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateAdminUser;
