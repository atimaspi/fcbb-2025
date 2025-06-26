
export interface Game {
  id: string;
  home_team_id: string;
  away_team_id: string;
  competition_id?: string;
  scheduled_date?: string;
  game_date?: string;
  venue?: string;
  status: 'scheduled' | 'live' | 'finished' | 'cancelled';
  home_score?: number;
  away_score?: number;
  round?: string;
  created_at: string;
}

export interface Team {
  id: string;
  name: string;
  club_id?: string;
  category: string;
  division?: string;
  status: 'active' | 'inactive';
  abbreviation?: string;
  city?: string;
  island?: string;
  founded_year?: number;
  logo_url?: string;
  created_at: string;
}

export interface Player {
  id: string;
  name: string;
  team_id?: string;
  position?: string;
  jersey_number?: number;
  birth_date?: string;
  height?: number;
  height_cm?: number;
  weight_kg?: number;
  nationality?: string;
  status: 'active' | 'inactive';
  first_name?: string;
  last_name?: string;
  age?: number;
  club?: string;
  photo_url?: string;
  documents?: any[];
  created_at: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary?: string;
  content: string;
  category: string;
  status: 'rascunho' | 'pendente' | 'publicado';
  featured_image?: string;
  author?: string;
  tags?: string;
  publish_date: string;
  excerpt?: string;
  published?: boolean;
  featured?: boolean;
  featured_image_url?: string;
  video_url?: string;
  gallery_images?: any[];
  attachments?: any[];
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  location?: string;
  type: string;
  status: 'agendado' | 'cancelado' | 'finalizado';
  created_at: string;
}

export interface Referee {
  id: string;
  name: string;
  license_number?: string;
  level: string;
  phone?: string;
  email?: string;
  status: 'ativo' | 'inativo' | 'suspenso';
  first_name?: string;
  last_name?: string;
  island?: string;
  active?: boolean;
  created_at: string;
}

export interface Coach {
  id: string;
  name: string;
  team_id?: string;
  license_number?: string;
  phone?: string;
  email?: string;
  experience_years?: number;
  status: 'ativo' | 'inativo' | 'suspenso';
  created_at: string;
}

export interface Competition {
  id: string;
  name: string;
  season: string;
  type: string;
  status: 'upcoming' | 'ongoing' | 'finished';
  start_date?: string;
  end_date?: string;
  description?: string;
  regulations_url?: string;
  created_at: string;
}

export interface Federation {
  id: string;
  name: string;
  abbreviation?: string;
  description?: string;
  contact_email?: string;
  contact_phone?: string;
  website?: string;
  created_at: string;
}

export interface RegionalAssociation {
  id: string;
  name: string;
  island: string;
  contact_email?: string;
  contact_phone?: string;
  status: 'active' | 'inactive';
  acronym?: string;
  address?: string;
  logo_url?: string;
  federation_id?: string;
  created_at: string;
}

export interface Club {
  id: string;
  name: string;
  abbreviation?: string;
  city?: string;
  island?: string;
  founded_year?: number;
  logo_url?: string;
  address?: string;
  contact_phone?: string;
  contact_email?: string;
  website?: string;
  description?: string;
  status: 'active' | 'inactive';
  active?: boolean;
  gallery_images?: any[];
  documents?: any[];
  regional_association_id?: string;
  created_at: string;
}
