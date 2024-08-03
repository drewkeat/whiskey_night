import { createClient } from "./client";

export const supabase = createClient()

export async function getAllWhiskeys(){
  const {data, error} = await supabase.from('whiskey').select()
  if(error){
    throw new Error("Could not fetch")
  }
  return data
}

export async function getWhiskeyById(id: string){
  const {data, error} = await supabase.from("whiskey").select().eq("id", id)
  if (error){
    throw Error("Could not fetch whiskey by ID")
  }
  return (data[0])
}