'use client'
import { Button } from '@mui/material'
import { supabaseClient } from '@/utils/supabase/client'
import React from 'react'
import { useRouter } from 'next/navigation'


function LogoutButton() {
  const router = useRouter()
  
  const logout = async () => {
    const {error} = await supabaseClient.auth.signOut()
    if(error){
      console.log(error)
    } else {
      router.push("/")
    }
  }

  return (
    <Button variant='contained' color='primary' onClick={logout}>LogoutButton</Button>
  )
}

export default LogoutButton