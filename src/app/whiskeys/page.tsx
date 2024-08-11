import { Typography, Container } from "@mui/material";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/supabase_types";

export default async function WhiskeyList() {
  
  const supabase = createClient();

  async function listWhiskeys() {
    const { error, data } = await supabase.from("whiskey").select();
    error && console.error("error", error)
    return data?.map((w) => (
      <li key={w.id}>
        <a href={w.whiskeyLink || undefined}>{w.name}</a>
      </li>
    ));
  }
  return (
    <div>
      <Typography variant="h3" color="green" align="center">
        Whiskey List
      </Typography>
      <Container maxWidth="md">
        <ul>{listWhiskeys()}</ul>
      </Container>
    </div>
  );
}
