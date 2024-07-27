import {createClient} from "../../utils/supabase/server"
import Typography from '@mui/material/Typography'

export default async function UserBadge() {
  const supabase = createClient()
  const user = await supabase.auth.getUser().then(d => d.data.user?.user_metadata)

  return (
    <div>
      <Typography variant="h3" color="initial">Welcome {user && `${user.firstName} ${user.lastName}`}</Typography>
    </div>
  );
}