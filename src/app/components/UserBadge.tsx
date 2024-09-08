'use client'
import Typography from '@mui/material/Typography'
import {useState, useEffect} from "react"
import { User } from '@supabase/supabase-js';

// import {createClient} from "../../utils/supabase/server"
import getUser from './getUser'
interface UserBadgeProps{
  sx?: {},
}

export default function UserBadge({sx}: UserBadgeProps) {
  const [user, setUser] = useState<User>()
  useEffect(() => {
    (async() => {
      const data = await getUser()
      setUser(data)
    })()
  }, [])
  

  return (
    <>
      <Typography variant="h3"  sx={sx} >Welcome {user && `${user.user_metadata.firstName} ${user.user_metadata.lastName}`}</Typography>
    </>
  );
}