'use client'
import Typography from '@mui/material/Typography'
import {useState, useEffect} from "react"
import { useAuth } from '@/contexts/AuthContext'
interface UserBadgeProps{
  sx?: {},
}

export default function UserBadge({sx}: UserBadgeProps) {
  const {user} = useAuth()
  

  return (
    <>
      <Typography variant="h3"  sx={sx} >Welcome {user && `${user.user_metadata.firstName} ${user.user_metadata.lastName}`}</Typography>
    </>
  );
}