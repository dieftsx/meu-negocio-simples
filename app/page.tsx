import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ChatContainer } from '@/components/chat-container'


export default async function Home() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/landing')
  }


  //Busca dados da empresa do usuário
  const { data: empresa } = await supabase
    .from('empresas')
    .select('*')
    .eq('user_id', user.id)
    .single()
  return <ChatContainer user={user} empresa={empresa} />
}
