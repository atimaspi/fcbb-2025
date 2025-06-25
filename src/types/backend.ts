
// Backend data types for FCBB management system
export interface Team {
  id: string;
  name: string;
  category: string;
  division?: string;
  club_id?: string;
  created_at: string;
  // Add optional properties for backward compatibility
  abbreviation?: string;
  city?: string;
  island?: string;
  logo_url?: string;
  status?: 'ativo' | 'inativo';
  updated_at?: string;
}

export interface Club {
  id: string;
  name: string;
  island: string;
  active: boolean;
  created_at: string;
  regional_association_id?: string;
  gallery_images?: any;
  documents?: any;
  status?: string;
  website?: string;
  address?: string;
  contact_phone?: string;
  contact_email?: string;
  description?: string;
  logo_url?: string;
  founded_year?: number;
  // Add optional properties for backward compatibility
  abbreviation?: string;
  city?: string;
  president_name?: string;
  updated_at?: string;
}

export interface Competition {
  id: string;
  name: string;
  type?: 'championship' | 'tournament' | 'cup' | 'league';
  season: string;
  start_date?: string;
  end_date?: string;
  description?: string;
  status: string;
  logo_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface Game {
  id: string;
  competition_id?: string;
  home_team_id?: string;
  away_team_id?: string;
  scheduled_date: string;
  venue?: string;
  round?: string;
  home_score?: number;
  away_score?: number;
  status: 'agendado' | 'ao_vivo' | 'pausado' | 'finalizado' | 'adiado' | 'cancelado';
  created_at: string;
  // Add optional properties for backward compatibility
  game_date?: string;
  updated_at?: string;
}

export interface Player {
  id: string;
  first_name: string;
  last_name: string;
  position?: 'Base' | 'Escolta' | 'Extremo' | 'Poste Baixo' | 'Poste Alto';
  jersey_number?: number;
  team_id?: string;
  birth_date?: string;
  age?: number;
  height_cm?: number;
  weight_kg?: number;
  nationality?: string;
  photo_url?: string;
  status?: string;
  club?: string;
  active: boolean;
  documents?: any;
  created_at: string;
  // Computed property for backward compatibility
  name?: string;
  updated_at?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author_id?: string;
  author: string;
  category: string;
  image_url?: string;
  published: boolean;
  featured: boolean;
  slug?: string;
  views_count?: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
  featured_image_url?: string;
  tags?: string[];
  video_url?: string;
  attachments?: any;
  gallery_images?: any;
  status?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  end_date?: string;
  location?: string;
  type: string;
  organizer?: string;
  created_at: string;
  // Add optional properties for backward compatibility
  event_type?: 'jogo' | 'treino' | 'reuniao' | 'evento_social' | 'competicao';
  status?: 'agendado' | 'em_andamento' | 'finalizado' | 'cancelado';
  created_by?: string;
  updated_at?: string;
}

export interface Referee {
  id: string;
  first_name: string;
  last_name: string;
  license_number?: string;
  level: string;
  contact_email?: string;
  contact_phone?: string;
  phone?: string;
  email?: string;
  island?: string;
  active: boolean;
  certified_date?: string;
  certificates?: any;
  photo_url?: string;
  created_at: string;
  // Add optional properties for backward compatibility
  name?: string;
  certification_level?: 'regional' | 'nacional' | 'fiba';
  status?: 'ativo' | 'suspenso' | 'inativo';
  updated_at?: string;
}

export interface Coach {
  id: string;
  name: string;
  first_name?: string;
  last_name?: string;
  license_number?: string;
  certification_level?: 'nivel_1' | 'nivel_2' | 'nivel_3' | 'fiba';
  team_id?: string;
  position?: 'treinador_principal' | 'treinador_assistente' | 'preparador_fisico';
  contact_email?: string;
  contact_phone?: string;
  phone?: string;
  email?: string;
  experience_years?: number;
  photo_url?: string;
  status: 'ativo' | 'inativo';
  active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Federation {
  id: string;
  name: string;
  acronym?: string;
  logo_url?: string;
  website?: string;
  address?: string;
  contact_email?: string;
  contact_phone?: string;
  foundation_date?: string;
  created_at: string;
  updated_at: string;
  // Add optional properties for backward compatibility
  country?: string;
  partnership_type?: 'fiba' | 'bilateral' | 'regional' | 'observador';
  partnership_status?: 'ativo' | 'suspenso' | 'finalizado';
}

export interface RegionalAssociation {
  id: string;
  name: string;
  island?: string;
  acronym?: string;
  federation_id: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  logo_url?: string;
  created_at: string;
  updated_at: string;
  // Add optional properties for backward compatibility
  president_name?: string;
  clubs_count?: number;
  status?: 'ativo' | 'inativo';
}

export interface Profile {
  id: string;
  user_id?: string;
  full_name?: string;
  role: 'admin' | 'editor' | 'user';
  avatar_url?: string;
  club_id?: string;
  regional_association_id?: string;
  updated_at?: string;
}
