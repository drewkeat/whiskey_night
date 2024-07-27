// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import axios from "npm:axios"
import * as cheerio from "npm:cheerio"
import { corsHeaders } from "../cors.ts"

console.log("Running Test Function")

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  let reqData
  try {
    reqData = await req.json()
  } catch (error) {
    console.error("Request JSON not parsable", error)
  }

  if(reqData && reqData.term){
    const html = await axios.get(`https://distiller.com/search?term=${reqData.term}`).then(r => r.data)
    const $ = cheerio.load(html)
    const whiskeys = $('.spirit.whiskey-content').map((_i,e)=> ({
      name: $(e).find('.name').text().trim(),
      link: `https://www.distiller.com`+$(e).find('a').attr('href'),
      imageURL: $(e).find('.image').attr('style')!.match(/background.+url\((.+)\)/)![1]
    })).get()
    

    
    return new Response(
      JSON.stringify(whiskeys), {headers: {...corsHeaders}}
    )
  }
  return new Response(
    "Could not find whiskey", {headers: {...corsHeaders}}
  )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/test' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/