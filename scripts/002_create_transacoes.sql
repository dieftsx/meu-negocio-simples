-- Tabela de transacoes financeiras
CREATE TABLE IF NOT EXISTS public.transacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('entrada', 'saida')),
  value DECIMAL(12,2) NOT NULL CHECK (value > 0),
  description TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilita RLS
ALTER TABLE public.transacoes ENABLE ROW LEVEL SECURITY;

-- Politicas RLS - usuarios so podem ver/editar suas proprias transacoes
CREATE POLICY "transacoes_select_own" ON public.transacoes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "transacoes_insert_own" ON public.transacoes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "transacoes_update_own" ON public.transacoes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "transacoes_delete_own" ON public.transacoes
  FOR DELETE USING (auth.uid() = user_id);

-- Index para melhorar performance de consultas por usuario e data
CREATE INDEX IF NOT EXISTS idx_transacoes_user_id ON public.transacoes(user_id);
CREATE INDEX IF NOT EXISTS idx_transacoes_created_at ON public.transacoes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transacoes_user_created ON public.transacoes(user_id, created_at DESC);
