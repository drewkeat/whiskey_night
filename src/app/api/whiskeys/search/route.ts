import { createClient } from "@/utils/supabase/server";

export async function POST(
  req: Request,
) {
  const reqData = await req.json()
  const searchTerm = reqData.term
  console.log(searchTerm)
  console.log("Search Term ", searchTerm);
  const supabase = createClient();
  const { data, error } = await supabase.functions.invoke("scrape-search", {
    headers: { "Authorization": process.env.NEXT_PUBLIC_SERVICE_ROLE! },
    body: JSON.stringify(searchTerm),
  });

  if (error) {
    console.error(error);
  }
  console.log(data);
  return new Response(JSON.stringify(data));
}
