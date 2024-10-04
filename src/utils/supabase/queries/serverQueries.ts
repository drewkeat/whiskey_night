import { Tables } from "@/types/supabase_types"
import {createClient} from "@/utils/supabase/server"


export const getWhiskeys = async () => {
  const supabase = createClient()
  const res = await supabase.from('whiskey').select()
  return res
}

export const getWhiskeyImg = (whiskey: Tables<"whiskey">) => {
  const supabase = createClient()
  if(whiskey.whiskeyImg){
    const {data: img} = supabase.storage.from('imgs').getPublicUrl(whiskey.whiskeyImg)
    return img.publicUrl
  }
}