
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  role text DEFAULT 'user' CHECK (role IN ('admin', 'editor', 'user')),
  avatar_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id)
);

-- Create teams/clubs table
CREATE TABLE IF NOT EXISTS public.teams (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  abbreviation text,
  city text,
  island text,
  logo_url text,
  status text DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create clubs table (separate from teams for organizational structure)
CREATE TABLE IF NOT EXISTS public.clubs (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  abbreviation text,
  city text,
  island text,
  logo_url text,
  contact_email text,
  contact_phone text,
  president_name text,
  founded_year integer,
  status text DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create competitions/championships table
CREATE TABLE IF NOT EXISTS public.championships (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  type text CHECK (type IN ('campeonato', 'torneio', 'copa', 'liga')),
  season text,
  start_date date,
  end_date date,
  description text,
  status text DEFAULT 'planejado' CHECK (status IN ('planejado', 'ativo', 'finalizado', 'cancelado')),
  logo_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create games table
CREATE TABLE IF NOT EXISTS public.games (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  championship_id uuid REFERENCES public.championships(id) ON DELETE CASCADE,
  home_team_id uuid REFERENCES public.teams(id) ON DELETE SET NULL,
  away_team_id uuid REFERENCES public.teams(id) ON DELETE SET NULL,
  game_date timestamp with time zone,
  venue text,
  round text,
  home_score integer DEFAULT 0,
  away_score integer DEFAULT 0,
  status text DEFAULT 'agendado' CHECK (status IN ('agendado', 'ao_vivo', 'pausado', 'finalizado', 'adiado', 'cancelado')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create players table
CREATE TABLE IF NOT EXISTS public.players (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  position text CHECK (position IN ('Base', 'Escolta', 'Extremo', 'Poste Baixo', 'Poste Alto')),
  jersey_number integer,
  team_id uuid REFERENCES public.teams(id) ON DELETE SET NULL,
  birth_date date,
  height_cm integer,
  weight_kg integer,
  nationality text DEFAULT 'Cabo Verde',
  photo_url text,
  status text DEFAULT 'ativo' CHECK (status IN ('ativo', 'lesionado', 'suspenso', 'inativo')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create news table
CREATE TABLE IF NOT EXISTS public.news (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  content text,
  excerpt text,
  author_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  category text DEFAULT 'geral' CHECK (category IN ('geral', 'competicoes', 'selecoes', 'internacional', 'formacao')),
  image_url text,
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  slug text UNIQUE,
  views_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  published_at timestamp with time zone
);

-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  description text,
  event_date timestamp with time zone NOT NULL,
  location text,
  event_type text DEFAULT 'jogo' CHECK (event_type IN ('jogo', 'treino', 'reuniao', 'evento_social', 'competicao')),
  status text DEFAULT 'agendado' CHECK (status IN ('agendado', 'em_andamento', 'finalizado', 'cancelado')),
  created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create referees table
CREATE TABLE IF NOT EXISTS public.referees (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  license_number text UNIQUE,
  certification_level text CHECK (certification_level IN ('regional', 'nacional', 'fiba')),
  contact_email text,
  contact_phone text,
  island text,
  status text DEFAULT 'ativo' CHECK (status IN ('ativo', 'suspenso', 'inativo')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create coaches table
CREATE TABLE IF NOT EXISTS public.coaches (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  license_number text,
  certification_level text CHECK (certification_level IN ('nivel_1', 'nivel_2', 'nivel_3', 'fiba')),
  team_id uuid REFERENCES public.teams(id) ON DELETE SET NULL,
  position text DEFAULT 'treinador_principal' CHECK (position IN ('treinador_principal', 'treinador_assistente', 'preparador_fisico')),
  contact_email text,
  contact_phone text,
  experience_years integer DEFAULT 0,
  photo_url text,
  status text DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create federations table (for international partnerships)
CREATE TABLE IF NOT EXISTS public.federations (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  country text NOT NULL,
  logo_url text,
  website_url text,
  contact_email text,
  partnership_type text CHECK (partnership_type IN ('fiba', 'bilateral', 'regional', 'observador')),
  partnership_status text DEFAULT 'ativo' CHECK (partnership_status IN ('ativo', 'suspenso', 'finalizado')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create regional associations table
CREATE TABLE IF NOT EXISTS public.regional_associations (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  island text NOT NULL,
  president_name text,
  contact_email text,
  contact_phone text,
  address text,
  clubs_count integer DEFAULT 0,
  status text DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.championships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.federations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regional_associations ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to published content
CREATE POLICY "Anyone can view published news" ON public.news
  FOR SELECT USING (published = true);

CREATE POLICY "Anyone can view active teams" ON public.teams
  FOR SELECT USING (status = 'ativo');

CREATE POLICY "Anyone can view active clubs" ON public.clubs
  FOR SELECT USING (status = 'ativo');

CREATE POLICY "Anyone can view active championships" ON public.championships
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view games" ON public.games
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view active players" ON public.players
  FOR SELECT USING (status = 'ativo');

CREATE POLICY "Anyone can view scheduled events" ON public.events
  FOR SELECT USING (status != 'cancelado');

CREATE POLICY "Anyone can view active referees" ON public.referees
  FOR SELECT USING (status = 'ativo');

CREATE POLICY "Anyone can view active coaches" ON public.coaches
  FOR SELECT USING (status = 'ativo');

CREATE POLICY "Anyone can view federations" ON public.federations
  FOR SELECT USING (partnership_status = 'ativo');

CREATE POLICY "Anyone can view regional associations" ON public.regional_associations
  FOR SELECT USING (status = 'ativo');

-- Admin policies for full access
CREATE POLICY "Admins can do everything on profiles" ON public.profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage teams" ON public.teams
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Admins can manage clubs" ON public.clubs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Admins can manage championships" ON public.championships
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Admins can manage games" ON public.games
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Admins can manage players" ON public.players
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Admins can manage news" ON public.news
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Admins can manage events" ON public.events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Admins can manage referees" ON public.referees
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Admins can manage coaches" ON public.coaches
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Admins can manage federations" ON public.federations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Admins can manage regional associations" ON public.regional_associations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Create function to handle user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, user_id, full_name, role)
  VALUES (
    NEW.id,
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Utilizador'),
    CASE 
      WHEN NEW.email = 'admin@fcbb.cv' THEN 'admin'
      ELSE 'user'
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON public.teams FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_clubs_updated_at BEFORE UPDATE ON public.clubs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_championships_updated_at BEFORE UPDATE ON public.championships FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_games_updated_at BEFORE UPDATE ON public.games FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_players_updated_at BEFORE UPDATE ON public.players FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON public.news FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_referees_updated_at BEFORE UPDATE ON public.referees FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_coaches_updated_at BEFORE UPDATE ON public.coaches FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_federations_updated_at BEFORE UPDATE ON public.federations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_regional_associations_updated_at BEFORE UPDATE ON public.regional_associations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
