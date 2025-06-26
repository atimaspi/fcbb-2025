
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
      // Transform data to match database schema
      const dbData = {
        name: clubData.name,
        island: clubData.island || '',
        active: clubData.status === 'active',
        abbreviation: clubData.abbreviation,
        city: clubData.city,
        founded_year: clubData.founded_year,
        logo_url: clubData.logo_url,
        address: clubData.address,
        contact_phone: clubData.contact_phone,
        contact_email: clubData.contact_email,
        website: clubData.website,
        description: clubData.description,
        regional_association_id: clubData.regional_association_id
      };

      const { data, error } = await supabase
        .from('clubs')
        .insert([dbData])
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
      // Transform data to match database schema
      const dbData: any = {};
      if (data.name) dbData.name = data.name;
      if (data.island) dbData.island = data.island;
      if (data.status) dbData.active = data.status === 'active';
      if (data.abbreviation) dbData.abbreviation = data.abbreviation;
      if (data.city) dbData.city = data.city;
      if (data.founded_year) dbData.founded_year = data.founded_year;
      if (data.logo_url) dbData.logo_url = data.logo_url;
      if (data.address) dbData.address = data.address;
      if (data.contact_phone) dbData.contact_phone = data.contact_phone;
      if (data.contact_email) dbData.contact_email = data.contact_email;
      if (data.website) dbData.website = data.website;
      if (data.description) dbData.description = data.description;

      const { data: result, error } = await supabase
        .from('clubs')
        .update(dbData)
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

  // Note: Coaches table doesn't exist in current schema, using teams as placeholder
  const createCoach = useMutation({
    mutationFn: async (coachData: Omit<Coach, 'id' | 'created_at'>) => {
      // Using teams table as placeholder since coaches doesn't exist
      const { data, error } = await supabase
        .from('teams')
        .insert([{ name: coachData.name, category: 'coach' }])
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
        .from('teams')
        .update({ name: data.name })
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
        .from('teams')
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
        .insert([{
          first_name: playerData.name.split(' ')[0] || '',
          last_name: playerData.name.split(' ').slice(1).join(' ') || '',
          team_id: playerData.team_id,
          position: playerData.position,
          jersey_number: playerData.jersey_number,
          birth_date: playerData.birth_date,
          height_cm: playerData.height,
          nationality: playerData.nationality,
          active: playerData.status === 'active'
        }])
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
      const updateData: any = {};
      if (data.name) {
        updateData.first_name = data.name.split(' ')[0] || '';
        updateData.last_name = data.name.split(' ').slice(1).join(' ') || '';
      }
      if (data.team_id) updateData.team_id = data.team_id;
      if (data.position) updateData.position = data.position;
      if (data.jersey_number) updateData.jersey_number = data.jersey_number;
      if (data.birth_date) updateData.birth_date = data.birth_date;
      if (data.height) updateData.height_cm = data.height;
      if (data.nationality) updateData.nationality = data.nationality;
      if (data.status) updateData.active = data.status === 'active';

      const { data: result, error } = await supabase
        .from('players')
        .update(updateData)
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

  // Games operations - using game_results table
  const createGame = useMutation({
    mutationFn: async (gameData: Omit<Game, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('game_results')
        .insert([{
          game_id: `${gameData.home_team_id}-${gameData.away_team_id}`,
          start_time: gameData.scheduled_date,
          home_team_score: gameData.home_score || 0,
          away_team_score: gameData.away_score || 0,
          game_status: gameData.status === 'live' ? 'ongoing' : gameData.status === 'finished' ? 'completed' : 'scheduled'
        }])
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
      const updateData: any = {};
      if (data.scheduled_date) updateData.start_time = data.scheduled_date;
      if (data.home_score !== undefined) updateData.home_team_score = data.home_score;
      if (data.away_score !== undefined) updateData.away_team_score = data.away_score;
      if (data.status) updateData.game_status = data.status === 'live' ? 'ongoing' : data.status === 'finished' ? 'completed' : 'scheduled';

      const { data: result, error } = await supabase
        .from('game_results')
        .update(updateData)
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
        .from('game_results')
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
      // Transform data to match database schema
      const dbData = {
        title: newsData.title,
        content: newsData.content,
        category: newsData.category,
        status: newsData.status,
        author: newsData.author,
        excerpt: newsData.excerpt,
        featured: newsData.featured,
        featured_image_url: newsData.featured_image_url,
        video_url: newsData.video_url,
        tags: Array.isArray(newsData.tags) ? newsData.tags : (newsData.tags ? [newsData.tags] : []),
        gallery_images: newsData.gallery_images || [],
        attachments: newsData.attachments || []
      };

      const { data, error } = await supabase
        .from('news')
        .insert([dbData])
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
      // Transform data to match database schema
      const dbData: any = {};
      if (data.title) dbData.title = data.title;
      if (data.content) dbData.content = data.content;
      if (data.category) dbData.category = data.category;
      if (data.status) dbData.status = data.status;
      if (data.author) dbData.author = data.author;
      if (data.excerpt) dbData.excerpt = data.excerpt;
      if (data.featured !== undefined) dbData.featured = data.featured;
      if (data.featured_image_url) dbData.featured_image_url = data.featured_image_url;
      if (data.video_url) dbData.video_url = data.video_url;
      if (data.tags) dbData.tags = Array.isArray(data.tags) ? data.tags : [data.tags];
      if (data.gallery_images) dbData.gallery_images = data.gallery_images;
      if (data.attachments) dbData.attachments = data.attachments;

      const { data: result, error } = await supabase
        .from('news')
        .update(dbData)
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
        .insert([{
          first_name: refereeData.name.split(' ')[0] || '',
          last_name: refereeData.name.split(' ').slice(1).join(' ') || '',
          license_number: refereeData.license_number,
          level: refereeData.level,
          phone: refereeData.phone,
          email: refereeData.email,
          island: refereeData.island,
          active: refereeData.status === 'ativo'
        }])
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
      const updateData: any = {};
      if (data.name) {
        updateData.first_name = data.name.split(' ')[0] || '';
        updateData.last_name = data.name.split(' ').slice(1).join(' ') || '';
      }
      if (data.license_number) updateData.license_number = data.license_number;
      if (data.level) updateData.level = data.level;
      if (data.phone) updateData.phone = data.phone;
      if (data.email) updateData.email = data.email;
      if (data.island) updateData.island = data.island;
      if (data.status) updateData.active = data.status === 'ativo';

      const { data: result, error } = await supabase
        .from('referees')
        .update(updateData)
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

  // Competitions operations - using championships table
  const createCompetition = useMutation({
    mutationFn: async (competitionData: Omit<Competition, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('championships')
        .insert([{
          name: competitionData.name,
          season: competitionData.season,
          type: competitionData.type,
          status: competitionData.status,
          start_date: competitionData.start_date,
          end_date: competitionData.end_date,
          description: competitionData.description
        }])
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
        .from('championships')
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
        .from('championships')
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
        .insert([{
          name: regionData.name,
          island: regionData.island,
          contact_email: regionData.contact_email,
          contact_phone: regionData.contact_phone,
          federation_id: regionData.federation_id || ''
        }])
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
