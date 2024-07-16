import { Typography } from "@mui/material";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient()

async function getWhiskeys(){
  let { data: whiskeys, error } = await supabase
    .from('whiskeys')
    .select()
    if(whiskeys){
      return whiskeys
    }
    console.error(error)
}

export default function WhiskeyList() {
 async function listWhiskeys(){
  const whiskeys = await getWhiskeys()
  return whiskeys?.map(whiskey => <li key={whiskey.id}>{whiskey.name}</li>)
 }

  return (
    <div>
      <Typography variant="h3" color="green" align="center">Whiskey List</Typography>
      <ul>
        {listWhiskeys()}
      </ul>
    </div>
  )
}
