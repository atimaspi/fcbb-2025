
// Backend data types for FCBB management system
export interface Team {
  id: string;
  name: string;
  abbreviation?: string;
  city?: string;
  island?: string;
  logo_url?: string;
  status: 'ativo' | 'inativo';
  created_at: string;
  updated_at: string;
}

export interface Club {
  id: string;
  name: string;
  abbreviation?: string;
  city?: string;
  island?: string;
  logo_url?: string;
  contact_email?: string;
  contact_phone?: string;
  president_name?: string;
  founded_year?: number;
  status: 'ativo' | 'inativo';
  created_at: string;
  updated_at: string;
}

export interface Competition {
  id: string;
  name: string;
  type?: 'campeonato' | 'torneio' | 'copa' | 'liga';
  season?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
  status: 'planejado' | 'ativo' | 'finalizado' | 'cancelado';
  logo_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Game {
  id: string;
  championship_id?: string;
  home_team_id?: string;
  away_team_id?: string;
  game_date?: string;
  venue?: string;
  round?: string;
  home_score: number;
  away_score: number;
  status: 'agendado' | 'ao_vivo' | 'pausado' | 'finalizado' | 'adiado' | 'cancelado';
  created_at: string;
  updated_at: string;
}

export interface Player {
  id: string;
  name: string;
  position?: 'Base' | 'Escolta' | 'Extremo' | 'Poste Baixo' | 'Poste Alto';
  jersey_number?: number;
  team_id?: string;
  birth_date?: string;
  height_cm?: number;
  weight_kg?: number;
  nationality?: string;
  photo_url?: string;
  status: 'ativo' | 'lesionado' | 'suspenso' | 'inativo';
  created_at: string;
  updated_at: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content?: string;
  excerpt?: string;
  author_id?: string;
  category: 'geral' | 'competicoes' | 'selecoes' | 'internacional' | 'formacao';
  image_url?: string;
  published: boolean;
  featured: boolean;
  slug?: string;
  views_count: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  location?: string;
  event_type: 'jogo' | 'treino' | 'reuniao' | 'evento_social' | 'competicao';
  status: 'agendado' | 'em_andamento' | 'finalizado' | 'cancelado';
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Referee {
  id: string;
  name: string;
  license_number?: string;
  certification_level?: 'regional' | 'nacional' | 'fiba';
  contact_email?: string;
  contact_phone?: string;
  island?: string;
  status: 'ativo' | 'suspenso' | 'inativo';
  created_at: string;
  updated_at: string;
}

export interface Coach {
  id: string;
  name: string;
  license_number?: string;
  certification_level?: 'nivel_1' | 'nivel_2' | 'nivel_3' | 'fiba';
  team_id?: string;
  position: 'treinador_principal' | 'treinador_assistente' | 'preparador_fisico';
  contact_email?: string;
  contact_phone?: string;
  experience_years: number;
  photo_url?: string;
  status: 'ativo' | 'inativo';
  created_at: string;
  updated_at: string;
}

export interface Federation {
  id: string;
  name: string;
  country: string;
  logo_url?: string;
  website_url?: string;
  contact_email?: string;
  partnership_type?: 'fiba' | 'bilateral' | 'regional' | 'observador';
  partnership_status: 'ativo' | 'suspenso' | 'finalizado';
  created_at: string;
  updated_at: string;
}

export interface RegionalAssociation {
  id: string;
  name: string;
  island: string;
  president_name?: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  clubs_count: number;
  status: 'ativo' | 'inativo';
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name?: string;
  role: 'admin' | 'editor' | 'user';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}
