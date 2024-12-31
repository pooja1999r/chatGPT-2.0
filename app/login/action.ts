'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/app/utils/supabase/server'
import { headers } from 'next/headers'

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const inputData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error, data: signInData } = await supabase.auth.signInWithPassword(inputData)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {

  const supabase = createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const inputData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error, data: signUpData  } = await supabase.auth.signUp(inputData)

  if (error) {
    return { error: error.message }
  }

  // Check if the user already exists ( Need to recheck)
  if (signUpData.user && signUpData.user.identities?.length === 0) {
    // User already exists, redirect to login page
    return { error:  'User already exists. Please Login'}
  }


  revalidatePath('/', 'layout')
  redirect('/')
}

// sign in with google auth 
export async function signInWithGoogle() {
  const supabase = createClient()
  const origin = headers().get('origin')
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.log('oops! something went wrong')
  }

  data.url ? redirect(data.url) : redirect('/')
}