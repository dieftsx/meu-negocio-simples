
-- Tabela de empresas vinculadas aos usuarios
CREATE TABLE IF NOT EXISTS public.empresas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_empresa TEXT NOT NULL,
  nome_responsavel TEXT NOT NULL,
  telefone TEXT,
  tipo_negocio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilita Row Level Security
ALTER TABLE public.empresas ENABLE ROW LEVEL SECURITY;

-- Politicas de segurança
CREATE POLICY "empresas_select_own" ON public.empresas 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "empresas_insert_own" ON public.empresas 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "empresas_update_own" ON public.empresas 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "empresas_delete_own" ON public.empresas 
  FOR DELETE USING (auth.uid() = user_id);

-- Trigger para criar empresa automaticamente no signup
CREATE OR REPLACE FUNCTION public.handle_new_user_empresa()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.empresas (user_id, nome_empresa, nome_responsavel, telefone, tipo_negocio)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'nome_empresa', 'Minha Empresa'),
    COALESCE(new.raw_user_meta_data ->> 'nome_responsavel', ''),
    COALESCE(new.raw_user_meta_data ->> 'telefone', ''),
    COALESCE(new.raw_user_meta_data ->> 'tipo_negocio', '')
  )
  ON CONFLICT DO NOTHING;
  
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_empresa ON auth.users;

CREATE TRIGGER on_auth_user_created_empresa
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_empresa();
