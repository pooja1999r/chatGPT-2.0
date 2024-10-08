import { createClient } from "./supabase/client"

const supabase = createClient()

export const getUserInfo = async () => {
    const { data: { user }  } = await supabase.auth.getUser()
    return user
}

export const logout = async () => {
    await supabase.auth.signOut()
}
