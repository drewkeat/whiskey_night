import React from 'react'
import {Box, AppBar, Toolbar} from "@mui/material"

import UserBadge from "@/app/components/UserBadge"
import ErrorButton from "@/app/components/ErrorButton"
import LogoutButton from "@/app/components/LogoutButton"

type Props = {}

export default function NavBar({}: Props) {
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