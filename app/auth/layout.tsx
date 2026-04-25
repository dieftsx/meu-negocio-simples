import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

/**
 * Layout compartilhado das rotas /auth/*.
 * Se o usuário já está autenticado, redireciona direto para o dashboard
 * em vez de exibir login/cadastro novamente.
 */
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/')
  }

  return <>{children}</>
}
