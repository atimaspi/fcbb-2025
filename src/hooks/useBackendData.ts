
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Team {
  id: string;
  name: string;
  abbreviation?: string;
  city?: string;
  island?: string;
  founded_year?: number;
  logo_url?: string;
  status: 'ativo' | 'inativo';
  created_at: string;
}

export interface Competition {
  id: string;
  name: string;
  type: string;
  season: string;
  status: 'ativo' | 'finalizado' | 'cancelado';
  start_date: string;
  end_date?: string;
  description?: string;
  created_at: string;
}

export interface Game {
  id: string;
  home_team_id: string;
  away_team_id: string;
  competition_id: string;
  scheduled_date: string;
  venue?: string;
  status: 'agendado' | 'ao_vivo' | 'finalizado' | 'cancelado' | 'adiado';
  home_score?: number;
  away_score?: number;
  notes?: string;
  referee?: string;
  live_score_enabled: boolean;
  created_at: string;
}

export interface Player {
  id: string;
  full_name: string;
  position?: string;
  jersey_number?: number;
  birth_date?: string;
  height?: number;
  weight?: number;
  team_id?: string;
  nationality?: string;
  photo_url?: string;
  status: 'ativo' | 'lesionado' | 'suspenso' | 'inativo';
  created_at: string;
}

export const useBackendData = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [referees, setReferees] = useState<any[]>([]);
  const [coaches, setCoaches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchTeams = async () => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('name');

      if (error) throw error;
      setTeams(data || []);
    } catch (err: any) {
      console.error('Error fetching teams:', err);
      // Fallback data for testing
      setTeams([
        {
          id: '1',
          name: 'CD Travadores',
          abbreviation: 'TRA',
          city: 'Praia',
          island: 'Santiago',
          founded_year: 1985,
          status: 'ativo',
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'ABC Académica',
          abbreviation: 'ABC',
          city: 'Mindelo',
          island: 'São Vicente',
          founded_year: 1970,
          status: 'ativo',
          created_at: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Sporting Clube da Praia',
          abbreviation: 'SCP',
          city: 'Praia',
          island: 'Santiago',
          founded_year: 1923,
          status: 'ativo',
          created_at: new Date().toISOString(),
        }
      ]);
    }
  };

  const fetchCompetitions = async () => {
    try {
      const { data, error } = await supabase
        .from('competitions')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) throw error;
      setCompetitions(data || []);
    } catch (err: any) {
      console.error('Error fetching competitions:', err);
      // Fallback data for testing
      setCompetitions([
        {
          id: '1',
          name: 'Campeonato Nacional 2025',
          type: 'campeonato',
          season: '2024-2025',
          status: 'ativo',
          start_date: '2025-02-01',
          end_date: '2025-05-30',
          description: 'Campeonato Nacional de Basquetebol Senior Masculino',
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Taça Nacional 2025',
          type: 'taca',
          season: '2024-2025',
          status: 'ativo',
          start_date: '2025-03-01',
          end_date: '2025-04-15',
          description: 'Taça Nacional de Basquetebol',
          created_at: new Date().toISOString(),
        }
      ]);
    }
  };

  const fetchGames = async () => {
    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('scheduled_date', { ascending: false });

      if (error) throw error;
      setGames(data || []);
    } catch (err: any) {
      console.error('Error fetching games:', err);
      // Fallback data for testing
      setGames([
        {
          id: '1',
          home_team_id: '1',
          away_team_id: '2',
          competition_id: '1',
          scheduled_date: new Date(Date.now() + 86400000).toISOString(),
          venue: 'Pavilhão Nacional',
          status: 'agendado',
          home_score: 0,
          away_score: 0,
          referee: 'João Silva',
          live_score_enabled: true,
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          home_team_id: '3',
          away_team_id: '1',
          competition_id: '1',
          scheduled_date: new Date(Date.now() - 86400000).toISOString(),
          venue: 'Pavilhão da Praia',
          status: 'finalizado',
          home_score: 78,
          away_score: 65,
          referee: 'Maria Santos',
          live_score_enabled: false,
          created_at: new Date(Date.now() - 86400000).toISOString(),
        }
      ]);
    }
  };

  const fetchPlayers = async () => {
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('full_name');

      if (error) throw error;
      setPlayers(data || []);
    } catch (err: any) {
      console.error('Error fetching players:', err);
      // Fallback data for testing
      setPlayers([
        {
          id: '1',
          full_name: 'Carlos Mendes',
          position: 'Base',
          jersey_number: 7,
          birth_date: '1995-03-15',
          height: 180,
          weight: 75,
          team_id: '1',
          nationality: 'Cabo Verde',
          status: 'ativo',
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          full_name: 'João Silva',
          position: 'Poste',
          jersey_number: 15,
          birth_date: '1992-07-22',
          height: 205,
          weight: 95,
          team_id: '2',
          nationality: 'Cabo Verde',
          status: 'ativo',
          created_at: new Date().toISOString(),
        }
      ]);
    }
  };

  const createTeam = async (teamData: Omit<Team, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .insert([teamData])
        .select()
        .single();

      if (error) throw error;

      setTeams(prev => [...prev, data]);
      return { data, error: null };
    } catch (err: any) {
      console.error('Error creating team:', err);
      return { data: null, error: err };
    }
  };

  const updateTeam = async (id: string, teamData: Partial<Team>) => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .update(teamData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setTeams(prev => prev.map(team => team.id === id ? data : team));
      return { data, error: null };
    } catch (err: any) {
      console.error('Error updating team:', err);
      return { data: null, error: err };
    }
  };

  const deleteTeam = async (id: string) => {
    try {
      const { error } = await supabase
        .from('teams')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTeams(prev => prev.filter(team => team.id !== id));
      return { error: null };
    } catch (err: any) {
      console.error('Error deleting team:', err);
      return { error: err };
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        await Promise.all([
          fetchTeams(),
          fetchCompetitions(),
          fetchGames(),
          fetchPlayers()
        ]);
      } catch (err: any) {
        console.error('Error loading backend data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    teams,
    competitions,
    games,
    players,
    referees,
    coaches,
    newsData: [], // For compatibility
    eventsData: [], // For compatibility
    isLoading,
    operations: {
      teams: {
        create: { mutateAsync: createTeam },
        update: { mutateAsync: ({ id, data }: { id: string; data: Partial<Team> }) => updateTeam(id, data) },
        delete: { mutateAsync: deleteTeam }
      }
    }
  };
};
