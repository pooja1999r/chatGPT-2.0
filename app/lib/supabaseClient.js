import { createClient } from '@supabase/supabase-js'


export default async function Notes() {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    const { data: notes } = await supabase.from("notes").select();
    console.log(notes);

  return <pre>{JSON.stringify(notes)}</pre>
}