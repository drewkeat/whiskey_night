export async function GET(
  req: Request
) {
  return new Response("This is active")
}

export async function POST(req: Request){
  const data = await req.json()
  return new Response("Received "+ JSON.stringify(data))
}
