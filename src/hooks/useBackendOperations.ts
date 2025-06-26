
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Team, Club, Coach, Player, Game, NewsItem, Event, Referee, Competition, Federation, RegionalAssociation } from '@/types/backend';

export const useBackendOperations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Teams operations
  const createTeam = useMutation({
    mutationFn: async (teamData: Omit<Team, 'id' | 'created_at'>) => {
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
      toast({ title: 'Equipa criada com sucesso' });
    },
    onError: (error: any) => {
      toast({ title: 'Erro ao criar equipa', description: error.message, variant: 'destructive' });
    }
  });

  const updateTeam = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Team> }) => {
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
      toast({ title: 'Equipa atualizada com sucesso' });
    }
  });

  const deleteTeam = useMutation({
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
      toast({ title: 'Equipa eliminada com sucesso' });
    }
  });

  // Clubs operations
  const createClub = useMutation({
    mutationFn: async (clubData: Omit<Club, 'id' | 'created_at'>) => {
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
      toast({ title: 'Clube criado com sucesso' });
    }
  });

  const updateClub = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Club> }) => {
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
      toast({ title: 'Clube atualizado com sucesso' });
    }
  });

  const deleteClub = useMutation({
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
      toast({ title: 'Clube eliminado com sucesso' });
    }
  });

  // Coaches operations
  const createCoach = useMutation({
    mutationFn: async (coachData: Omit<Coach, 'id' | 'created_at'>) => {
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
      toast({ title: 'Treinador criado com sucesso' });
    }
  });

  const updateCoach = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Coach> }) => {
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
      toast({ title: 'Treinador atualizado com sucesso' });
    }
  });

  const deleteCoach = useMutation({
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
      toast({ title: 'Treinador eliminado com sucesso' });
    }
  });

  // Players operations
  const createPlayer = useMutation({
    mutationFn: async (playerData: Omit<Player, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('players')
        .insert([playerData])
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      toast({ title: 'Jogador criado com sucesso' });
    }
  });

  const updatePlayer = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Player> }) => {
      const { data: result, error } = await supabase
        .from('players')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return { data: result, error: null };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      toast({ title: 'Jogador atualizado com sucesso' });
    }
  });

  const deletePlayer = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('players')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return { error: null };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      toast({ title: 'Jogador eliminado com sucesso' });
    }
  });

  // Games operations
  const createGame = useMutation({
    mutationFn: async (gameData: Omit<Game, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('games')
        .insert([gameData])
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      toast({ title: 'Jogo criado com sucesso' });
    }
  });

  const updateGame = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Game> }) => {
      const { data: result, error } = await supabase
        .from('games')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return { data: result, error: null };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      toast({ title: 'Jogo atualizado com sucesso' });
    }
  });

  const deleteGame = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('games')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return { error: null };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      toast({ title: 'Jogo eliminado com sucesso' });
    }
  });

  // News operations
  const createNews = useMutation({
    mutationFn: async (newsData: Omit<NewsItem, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('news')
        .insert([newsData])
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      toast({ title: 'Notícia criada com sucesso' });
    }
  });

  const updateNews = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<NewsItem> }) => {
      const { data: result, error } = await supabase
        .from('news')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return { data: result, error: null };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      toast({ title: 'Notícia atualizada com sucesso' });
    }
  });

  const deleteNews = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return { error: null };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      toast({ title: 'Notícia eliminada com sucesso' });
    }
  });

  // Referees operations
  const createReferee = useMutation({
    mutationFn: async (refereeData: Omit<Referee, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('referees')
        .insert([refereeData])
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referees'] });
      toast({ title: 'Árbitro criado com sucesso' });
    }
  });

  const updateReferee = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Referee> }) => {
      const { data: result, error } = await supabase
        .from('referees')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return { data: result, error: null };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referees'] });
      toast({ title: 'Árbitro atualizado com sucesso' });
    }
  });

  const deleteReferee = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('referees')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return { error: null };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referees'] });
      toast({ title: 'Árbitro eliminado com sucesso' });
    }
  });

  // Competitions operations
  const createCompetition = useMutation({
    mutationFn: async (competitionData: Omit<Competition, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('competitions')
        .insert([competitionData])
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competitions'] });
      toast({ title: 'Competição criada com sucesso' });
    }
  });

  const updateCompetition = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Competition> }) => {
      const { data: result, error } = await supabase
        .from('competitions')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return { data: result, error: null };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competitions'] });
      toast({ title: 'Competição atualizada com sucesso' });
    }
  });

  const deleteCompetition = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('competitions')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return { error: null };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competitions'] });
      toast({ title: 'Competição eliminada com sucesso' });
    }
  });

  // Federations operations
  const createFederation = useMutation({
    mutationFn: async (federationData: Omit<Federation, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('federations')
        .insert([federationData])
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['federations'] });
      toast({ title: 'Federação criada com sucesso' });
    }
  });

  const updateFederation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Federation> }) => {
      const { data: result, error } = await supabase
        .from('federations')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return { data: result, error: null };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['federations'] });
      toast({ title: 'Federação atualizada com sucesso' });
    }
  });

  const deleteFederation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('federations')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return { error: null };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['federations'] });
      toast({ title: 'Federação eliminada com sucesso' });
    }
  });

  // Regional Associations operations
  const createRegionalAssociation = useMutation({
    mutationFn: async (regionData: Omit<RegionalAssociation, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('regional_associations')
        .insert([regionData])
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['regionalAssociations'] });
      toast({ title: 'Associação Regional criada com sucesso' });
    }
  });

  const updateRegionalAssociation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<RegionalAssociation> }) => {
      const { data: result, error } = await supabase
        .from('regional_associations')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return { data: result, error: null };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['regionalAssociations'] });
      toast({ title: 'Associação Regional atualizada com sucesso' });
    }
  });

  const deleteRegionalAssociation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('regional_associations')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return { error: null };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['regionalAssociations'] });
      toast({ title: 'Associação Regional eliminada com sucesso' });
    }
  });

  return {
    operations: {
      teams: {
        create: createTeam,
        update: updateTeam,
        delete: deleteTeam
      },
      clubs: {
        create: createClub,
        update: updateClub,
        delete: deleteClub
      },
      coaches: {
        create: createCoach,
        update: updateCoach,
        delete: deleteCoach
      },
      players: {
        create: createPlayer,
        update: updatePlayer,
        delete: deletePlayer
      },
      games: {
        create: createGame,
        update: updateGame,
        delete: deleteGame
      },
      news: {
        create: createNews,
        update: updateNews,
        delete: deleteNews
      },
      referees: {
        create: createReferee,
        update: updateReferee,
        delete: deleteReferee
      },
      competitions: {
        create: createCompetition,
        update: updateCompetition,
        delete: deleteCompetition
      },
      federations: {
        create: createFederation,
        update: updateFederation,
        delete: deleteFederation
      },
      regionalAssociations: {
        create: createRegionalAssociation,
        update: updateRegionalAssociation,
        delete: deleteRegionalAssociation
      }
    }
  };
};
