
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useBackendOperations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Teams operations
  const teamsOperations = {
    create: useMutation({
      mutationFn: async (teamData: any) => {
        const { data, error } = await supabase
          .from('teams')
          .insert([teamData])
          .select()
          .single();
        if (error) throw error;
        return { data, error: null };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['teams'] });
        toast({ title: "Sucesso", description: "Equipa criada com sucesso!" });
      },
      onError: (error: any) => {
        toast({ title: "Erro", description: error.message, variant: "destructive" });
      }
    }),
    update: useMutation({
      mutationFn: async ({ id, data }: { id: string; data: any }) => {
        const { data: result, error } = await supabase
          .from('teams')
          .update(data)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return { data: result, error: null };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['teams'] });
        toast({ title: "Sucesso", description: "Equipa atualizada com sucesso!" });
      }
    }),
    delete: useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from('teams')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return { error: null };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['teams'] });
        toast({ title: "Sucesso", description: "Equipa eliminada com sucesso!" });
      }
    })
  };

  // Clubs operations
  const clubsOperations = {
    create: useMutation({
      mutationFn: async (clubData: any) => {
        const { data, error } = await supabase
          .from('clubs')
          .insert([clubData])
          .select()
          .single();
        if (error) throw error;
        return { data, error: null };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['clubs'] });
        toast({ title: "Sucesso", description: "Clube criado com sucesso!" });
      }
    }),
    update: useMutation({
      mutationFn: async ({ id, data }: { id: string; data: any }) => {
        const { data: result, error } = await supabase
          .from('clubs')
          .update(data)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return { data: result, error: null };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['clubs'] });
        toast({ title: "Sucesso", description: "Clube atualizado com sucesso!" });
      }
    }),
    delete: useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from('clubs')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return { error: null };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['clubs'] });
        toast({ title: "Sucesso", description: "Clube eliminado com sucesso!" });
      }
    })
  };

  // Coaches operations
  const coachesOperations = {
    create: useMutation({
      mutationFn: async (coachData: any) => {
        const { data, error } = await supabase
          .from('coaches')
          .insert([coachData])
          .select()
          .single();
        if (error) throw error;
        return { data, error: null };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['coaches'] });
        toast({ title: "Sucesso", description: "Treinador criado com sucesso!" });
      }
    }),
    update: useMutation({
      mutationFn: async ({ id, data }: { id: string; data: any }) => {
        const { data: result, error } = await supabase
          .from('coaches')
          .update(data)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return { data: result, error: null };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['coaches'] });
        toast({ title: "Sucesso", description: "Treinador atualizado com sucesso!" });
      }
    }),
    delete: useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from('coaches')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return { error: null };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['coaches'] });
        toast({ title: "Sucesso", description: "Treinador eliminado com sucesso!" });
      }
    })
  };

  return {
    operations: {
      teams: teamsOperations,
      clubs: clubsOperations,
      coaches: coachesOperations
    }
  };
};
