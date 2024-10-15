import { createClient } from '../utils/supabase/client'
const supabase = createClient()

export const getAllPerviousChats = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chats`, {
        cache: 'no-store',
    })
    return res.json()
}

export default async function Posts() {
    let { data, error } = await supabase
    .from('notes')
    .select(); // Select all columns

    if (error) {
        console.error('Error fetching data:', error);
        return;
    }

    console.log('Fetched notes:', data);
  }
  
  