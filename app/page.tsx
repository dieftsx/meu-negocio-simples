import Image from "next/image";
import { redirect } from '@/lib/supabase/server'


export default async function Home() {
  const supabase = await createClient()
  const { data:  {user}, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/auth/login')
  }


  //Busca dados da empresa do usuário
  const { data: empresa } = await supabase
  .from ('empresas')
  .select('*')
  .eq('user', user.id)
  .single()
  return <ChatContainer user={user} empresa={empresa} />
}
