import { supabaseClient } from "@/utils/supabase/client";

export default async function getUser(){
  const {data, error} = await supabaseClient.auth.getUser()
  if(error) throw error
  return data.user
}