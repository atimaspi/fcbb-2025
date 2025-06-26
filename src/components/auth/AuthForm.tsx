
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import CreateAdminUser from './CreateAdminUser';

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loginData, setLoginData] = useState({
    email: 'admin@fcbb.cv',
    password: 'admin123456'
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Tentando fazer login com:', loginData.email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) {
        console.error('Erro de login:', error);
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Credenciais Inválidas",
            description: "Email ou palavra-passe incorretos. Crie um admin primeiro se necessário.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erro de Login",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      console.log('Login bem-sucedido:', data);
      
      toast({
        title: "Login Realizado",
        description: "Bem-vindo ao sistema FCBB!",
      });

      // Redirecionar para a área reservada
      navigate('/area-reservada');

    } catch (error: any) {
      console.error('Erro inesperado:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAccess = async () => {
    console.log('Acesso rápido - tentando login direto');
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'admin@fcbb.cv',
        password: 'admin123456',
      });

      if (!error && data.user) {
        console.log('Acesso rápido bem-sucedido');
        toast({
          title: "Acesso Rápido",
          description: "Login automático realizado!",
        });
        navigate('/area-reservada');
      } else {
        console.log('Admin não encontrado, mostrando criação');
        setShowCreateAdmin(true);
        toast({
          title: "Admin não encontrado",
          description: "Crie primeiro um utilizador administrador",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro no acesso rápido:', error);
      setShowCreateAdmin(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#002D72] via-[#1a237e] to-[#002D72] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        {showCreateAdmin ? (
          <div className="space-y-4">
            <CreateAdminUser />
            <Button 
              variant="outline" 
              onClick={() => setShowCreateAdmin(false)}
              className="w-full"
            >
              Voltar ao Login
            </Button>
          </div>
        ) : (
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#002D72] to-[#E10600] rounded-full flex items-center justify-center">
                <LogIn className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-[#002D72]">
                Área Reservada FCBB
              </CardTitle>
              <CardDescription>
                Acesso ao painel administrativo da Federação Cabo-verdiana de Basquetebol
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Palavra-passe</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#002D72] to-[#E10600] hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>A entrar...</span>
                    </div>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4 mr-2" />
                      Entrar
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 space-y-2">
                <Button 
                  variant="outline" 
                  onClick={handleQuickAccess}
                  className="w-full text-cv-blue border-cv-blue hover:bg-cv-blue hover:text-white"
                  disabled={isLoading}
                >
                  🚀 Acesso Rápido de Teste
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateAdmin(true)}
                  className="w-full text-sm"
                >
                  Criar Admin Inicial
                </Button>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm text-gray-700 mb-2">Credenciais de Teste:</h4>
                <p className="text-xs text-gray-600">Email: admin@fcbb.cv</p>
                <p className="text-xs text-gray-600">Password: admin123456</p>
              </div>

              <div className="mt-4 text-center text-sm text-gray-600">
                <p>Sistema protegido da FCBB</p>
                <p>Apenas utilizadores autorizados</p>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default AuthForm;
