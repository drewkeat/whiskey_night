import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest, {params}: {params: {slug: string}}){
  const supabase = createClient()
  const whiskeyId = params.slug
  const {data: whiskey, error} = await supabase.from('whiskeys').select().eq("id", whiskeyId)
  if(error){
    return NextResponse.json(error)
  }
  return NextResponse.json(whiskey)
}