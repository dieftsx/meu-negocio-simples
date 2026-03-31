import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookiesStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookiesStore.getAll()
        },
        setAll(cookiesStore) {
          try {
            cookiesToSet.forEach(({ name, value, options}) => 
            cookiesStore.set(name, value, options),
            )
          } catch {
            // The "setCall" method was called from a Server Component.
            // This can be ignored if you have proxy refreshing user sessions.
          }
        }
      }
    }
  )
}
