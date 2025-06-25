
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useApi = () => {
  const queryClient = useQueryClient();

  // Generic create mutation
  const useCreate = (table: string) => {
    return useMutation({
      mutationFn: async (data: any) => {
        const { data: result, error } = await supabase
          .from(table)
          .insert([data])
          .select()
          .single();

        if (error) {
          console.error(`Error creating ${table}:`, error);
          throw new Error(`Erro ao criar ${table}: ${error.message}`);
        }

        return result;
      },
      onSuccess: () => {
        // Invalidate and refetch relevant queries
        queryClient.invalidateQueries({ queryKey: [table] });
        
        // For related queries
        if (table === 'games') {
          queryClient.invalidateQueries({ queryKey: ['competitions'] });
        }
        if (table === 'players') {
          queryClient.invalidateQueries({ queryKey: ['teams'] });
        }
      },
      onError: (error) => {
        console.error(`Error in create mutation for ${table}:`, error);
      }
    });
  };

  // Generic update mutation
  const useUpdate = (table: string) => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: string; data: any }) => {
        const { data: result, error } = await supabase
          .from(table)
          .update(data)
          .eq('id', id)
          .select()
          .single();

        if (error) {
          console.error(`Error updating ${table}:`, error);
          throw new Error(`Erro ao atualizar ${table}: ${error.message}`);
        }

        return result;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [table] });
        
        // For related queries
        if (table === 'games') {
          queryClient.invalidateQueries({ queryKey: ['competitions'] });
        }
        if (table === 'players') {
          queryClient.invalidateQueries({ queryKey: ['teams'] });
        }
      },
      onError: (error) => {
        console.error(`Error in update mutation for ${table}:`, error);
      }
    });
  };

  // Generic delete mutation
  const useDelete = (table: string) => {
    return useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from(table)
          .delete()
          .eq('id', id);

        if (error) {
          console.error(`Error deleting ${table}:`, error);
          throw new Error(`Erro ao eliminar ${table}: ${error.message}`);
        }

        return { id };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [table] });
        
        // For related queries
        if (table === 'games') {
          queryClient.invalidateQueries({ queryKey: ['competitions'] });
        }
        if (table === 'players') {
          queryClient.invalidateQueries({ queryKey: ['teams'] });
        }
      },
      onError: (error) => {
        console.error(`Error in delete mutation for ${table}:`, error);
      }
    });
  };

  return {
    useCreate,
    useUpdate,
    useDelete
  };
};
