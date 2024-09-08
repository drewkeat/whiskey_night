import {createClient} from "../../utils/supabase/server"
import Typography from '@mui/material/Typography'

interface UserBadgeProps{
  sx?: {},
}

export default async function UserBadge({sx}: UserBadgeProps) {
  const supabase = createClient()
  const user = await supabase.auth.getUser().then(d => d.data.user?.user_metadata)

  return (
    <>
      <Typography variant="h3"  sx={sx} >Welcome {user && `${user.firstName} ${user.lastName}`}</Typography>
    </>
  );
}