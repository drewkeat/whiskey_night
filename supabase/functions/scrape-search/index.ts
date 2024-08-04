// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import axios from "npm:axios";
import * as cheerio from "npm:cheerio";
import { corsHeaders } from "../cors.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const authHeader = req.headers.get("Authorization")!;
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: authHeader } } },
  );

  const searchTerm: string = await req.json().then((data) => data.term);
  const html: string = await axios.get(
    `https://distiller.com/search?term=${searchTerm}`,
  ).then((r) => r.data);

  const uploadImage = async (
    name: string,
    imgUrl: string,
  ): Promise<{ path: string | null }> => {
    const response = await fetch(imgUrl);
    const imgData = await response.arrayBuffer();
    const imgBlob = new Blob([imgData], { type: "image/jpeg" });
    const imgFile = new File([imgBlob], `${name}-${Date.now()}.jpg`, {
      type: "image/jpeg",
    });

    if (imgData) {
      const { data, error } = await supabaseClient.storage.from("imgs").upload(
        "whiskey-pics/thumbnails/" + name,
        imgFile,
      );
      if (error) {
        console.error(error);
        return { path: null };
      }
      return data;
    }
    return { path: null };
  };

  if (html) {
    const $ = cheerio.load(html);
    const results = $(".results-container li.spirit");
    const entries = await Promise.all([...results].map(async (item) => {

      const itemName = $(item).find(".name-content").text().trim()
      const imgLink = $(item).find(".image").attr("style")?.match(
        /background-image: *url *\((.+?)\)/,
      )?.[1] || ""

      const imgData = await uploadImage(itemName+"-thumbnail", imgLink)

      return (
        {
          name: itemName,
          link: $(item).find("a").attr("href"),
          imgLink: imgData.path,
        }
      );
    }));

    console.log(entries);
    return new Response(
      JSON.stringify(entries),
      { headers: { ...corsHeaders } },
    );
  }
  return new Response(
    JSON.stringify({
      message: "There was an issue with scraping a whiskey for this term",
    }),
  );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/test' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
