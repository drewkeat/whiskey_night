import { Tables } from "@/types/supabase_types"
import {createClient} from "@/utils/supabase/server"


export const getWhiskeys = async () => {
  const supabase = createClient()
  const res = await supabase.from('whiskeys').select()
  return res
}

export const getWhiskey = async (whiskeyName: string) => {
  const supabase = createClient()
  const {data: whiskey, error} = await supabase.from('whiskeys').select().eq('name', whiskeyName)
  if(error){
    throw error
  } else {
    return whiskey[0]
  }
}

export const getWhiskeyImg = (whiskey: Tables<"whiskeys">) : string | undefined => {
  const supabase = createClient()
  if(whiskey.whiskeyImg){
    const {data: img} = supabase.storage.from('imgs').getPublicUrl(whiskey.whiskeyImg)
    return img.publicUrl
  }
}