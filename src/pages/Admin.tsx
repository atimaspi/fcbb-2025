
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminContent from '@/components/admin/AdminContent';
import SEO from '@/components/SEO';

const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          toast({
            title: "Acesso Negado",
            description: "Precisa fazer login para aceder ao painel administrativo.",
            variant: "destructive",
          });
          navigate('/auth');
          return;
        }

        setUser(session.user);

        // Get user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError || !profileData) {
          toast({
            title: "Erro de Perfil",
            description: "Não foi possível carregar o perfil do utilizador.",
            variant: "destructive",
          });
          navigate('/');
          return;
        }

        setProfile(profileData);

        // Check if user has admin or editor role
        if (!['admin', 'editor'].includes(profileData.role)) {
          toast({
            title: "Acesso Negado",
            description: "Não tem permissões para aceder ao painel administrativo.",
            variant: "destructive",
          });
          navigate('/');
          return;
        }

      } catch (error) {
        console.error('Auth check error:', error);
        toast({
          title: "Erro de Autenticação",
          description: "Erro ao verificar autenticação.",
          variant: "destructive",
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002D72] mx-auto mb-4"></div>
          <p className="text-gray-600">A carregar painel administrativo...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Painel Administrativo - FCBB"
        description="Sistema de gestão de conteúdo da Federação Cabo-verdiana de Basquetebol"
        robots="noindex,nofollow"
      />
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.h1 
                className="text-2xl font-bold text-[#002D72]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                Painel Administrativo FCBB
              </motion.h1>
              <span className="px-3 py-1 bg-[#E10600] text-white text-sm rounded-full">
                {profile.role === 'admin' ? 'Administrador' : 'Editor'}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                Bem-vindo, {profile.full_name || user.email}
              </span>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  navigate('/');
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AdminContent activeTab={activeTab} />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
