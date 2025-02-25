import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest){
  const supabase = createClient()
  const {data: whiskeys, error} = await supabase.from('whiskeys').select()
  if (error) {
    return NextResponse.json(error)
  } 
  return NextResponse.json(whiskeys)
}