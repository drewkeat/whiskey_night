'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import {useSession} from '@/contexts/SessionContext'
import {Box, AppBar, Toolbar} from "@mui/material"

import UserBadge from "@/app/components/UserBadge"
import ErrorButton from "@/app/components/ErrorButton"
import LogoutButton from "@/app/components/LogoutButton"

type Props = {}

export default function NavBar({}: Props) {
  const session = useSession()
  const pathname = usePathname()
  if(!session?.user || pathname.match("/login") || pathname.match("/error")) return
  return (
    <Box sx={{}}>
        <AppBar position="static">
          <Toolbar>
            <UserBadge sx={{flexGrow: 1}} />
            <ErrorButton />
            <LogoutButton />
          </Toolbar>
        </AppBar>
      </Box>
  )
}