import { Tables } from "@/types/supabase_types"
import {createClient} from "@/utils/supabase/server"


export const getWhiskeys = async () => {
  const supabase = createClient()
  const res = await supabase.from('whiskeys').select()
  return res
}

export const getWhiskey = async (input: string|number) => {
  const supabase = createClient()
  if (typeof input === 'string') {
    let {data: whiskey, error} = await supabase.from('whiskeys').select().eq('name', input).single()
    if(error){
      throw error
    } else {
      return whiskey
    }
  } else if (typeof input === 'number') {
    let {data: whiskey, error} = await supabase.from('whiskeys').select().eq('id', input).single()
    if(error){
      throw error
    } else {
      return whiskey
    }
  }
}

export const getWhiskeyImg = (whiskey: Tables<"whiskeys">) : string | undefined => {
  const supabase = createClient()
  if(whiskey.whiskeyImg){
    const {data: img} = supabase.storage.from('imgs').getPublicUrl(whiskey.whiskeyImg)
    return img.publicUrl
  }
}