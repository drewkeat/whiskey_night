import { Tables } from "@/types/supabase_types"
import {createClient} from "@/utils/supabase/server"

const supabase = createClient()

export const getWhiskeys = async () => {
  const res = await supabase.from('whiskey').select()
  return res
}

export const getWhiskeyImg = (whiskey: Tables<"whiskey">) => {
  if(whiskey.whiskeyImg){
    const {data: img} = supabase.storage.from('imgs').getPublicUrl(whiskey.whiskeyImg)
    return img.publicUrl
  }
}