
-- Create coaches table
CREATE TABLE public.coaches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    license_number TEXT,
    certification_level TEXT CHECK (certification_level IN ('nivel_1', 'nivel_2', 'nivel_3', 'fiba')),
    team_id UUID REFERENCES public.teams(id),
    position TEXT CHECK (position IN ('treinador_principal', 'treinador_assistente', 'preparador_fisico')),
    contact_email TEXT,
    contact_phone TEXT,
    phone TEXT,
    email TEXT,
    experience_years INTEGER,
    photo_url TEXT,
    status TEXT NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.coaches ENABLE ROW LEVEL SECURITY;

-- Create policies (allow public read for now)
CREATE POLICY "Allow public read access to coaches" ON public.coaches FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on coaches" ON public.coaches FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on coaches" ON public.coaches FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on coaches" ON public.coaches FOR DELETE USING (auth.role() = 'authenticated');
