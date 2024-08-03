// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import axios from "npm:axios"
import * as cheerio from "npm:cheerio"
import { createClient } from 'jsr:@supabase/supabase-js@2'

console.log(Deno.env.get('SUPABAS_URL'))


Deno.serve(async (req) => {
  const authHeader = req.headers.get('Authorization')!
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization: authHeader } } }
  )

  const uploadImage = async (name: string, imgUrl: string) => {
    const response = await fetch(imgUrl)
    const imgData = await response.arrayBuffer()
    const imgBlob = new Blob([imgData], { type: 'image/jpeg' })
    const imgFile = new File([imgBlob], `${name}-${Date.now()}.jpg`, { type: 'image/jpeg' });

    if (imgData){
      console.log(imgData)
      const {data, error} = await supabaseClient.storage.from('imgs').upload("whiskey-pics/"+name, imgFile)
      if(error){
        console.error(error)
        return {path: null}
      }
      return data 
    }
    return {path: null}
  }

  const { url } = await req.json()
  const html = (await axios.get(url)).data
  const $ = cheerio.load(html)

  const name = $('h1.name').text().trim()
  const type = $('.ultra-mini-headline.type').text().trim()
  const distillery = $('.location').text().trim().match(/(.+)?\s+?\/\//)?.[1] ?? ''
  const location = $('.location').text().trim().match(/(?:.+\/\/\s+?(.+))|(.+)/)?.[1] || $('.location').text().trim().match(/(?:.+\/\/\s+?(.+))|(.+)/)?.[2] || ''
  const description = $('.description').text().trim()
  const whiskeyImg = $('.main-image').attr('style')?.match(/background-image: *url *\((.+?)\)/)?.[1] ?? ''
  const whiskeyLink = url
  const age = $('.detail.age .value').text()
  const abv = $('.detail.abv .value').text()
  const style = $('.detail.whiskey-style .value').text()
  const caskType = $('.detail.cask-type .value').text()
  const flavorProfile = $('.js-flavor-profile-chart').data('flavors')

  const imgData = await uploadImage(name, whiskeyImg)
  console.log(imgData)
  
  const obj = {
    name, type, distillery, location, description, whiskeyImg: imgData.path, whiskeyLink, age, abv, style, caskType, flavorProfile
  }

  const {data, error} = await supabaseClient.from('whiskey').insert(obj)  

  if(data){
      return new Response(
        JSON.stringify(data),
        { headers: { "Content-Type": "application/json" } },
      )
  }
  return new Response(
    JSON.stringify(error),
    { headers: { "Content-Type": "application/json" } },
  )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/scrape-whiskey' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
