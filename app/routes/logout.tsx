import { ActionFunction, redirect } from '@remix-run/node';
import { createServerClient } from '@supabase/auth-helpers-remix';

export const action: ActionFunction = async ({ request }) => {
  const response = new Response()

  const supabase = createServerClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || '',
    { request, response }
  )

  await supabase.auth.signOut()

  return redirect('/login')
}