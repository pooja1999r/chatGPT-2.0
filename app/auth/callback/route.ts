import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createClient()

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Revalidate the layout to update the session
      revalidatePath('/', 'layout')
      // Redirect user to specified redirect URL or root of app
      redirect(next)
    }
  }

  // Redirect the user to an error page with some instructions
  redirect('/error')
}