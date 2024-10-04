'use client'
import { Tables } from "@/types/supabase_types"
import {createClient} from "@/utils/supabase/client"

const supabase = createClient()

export const getWhiskeys = async () => {
  const res = await supabase.from('whiskey').select()
  return res
}

export const getWhiskeyImg = async (whiskey: Tables<"whiskey">) => {
  let exists = false
  if(whiskey.whiskeyImg){
    let {data: exists, error} = await supabase.storage.from('imgs').exists(whiskey.whiskeyImg)
    if(exists){
      const {data: img} = supabase.storage.from('imgs').getPublicUrl(whiskey.whiskeyImg)
      return img.publicUrl
    }
  }
  return ''
}