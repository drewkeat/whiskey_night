import { createClient } from "./client";

export const supabase = createClient()

export async function getAllWhiskeys(){
  const {data, error} = await supabase.from('whiskey').select()
  if(error){
    console.error("Could not fetch all whiskeys")
    return
  }
  return data
}

export async function getWhiskeyById(id: string){
  const {data, error} = await supabase.from("whiskey").select().eq("id", id)
  if (error){
    console.error("Could not fetch whiskey by ID")
    return 
  }
  return (data[0])
}