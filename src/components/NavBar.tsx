"use client";
import React, { useState, MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/contexts/SessionContext";
import {
  Box,
  AppBar,
  Toolbar,
  Menu,
  MenuList,
  MenuItem,
  Typography,
  SxProps,
  IconButton,
  Avatar,
  ListItemIcon,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabaseClient } from "@/utils/supabase/client";

import { useMessageContext } from "@/contexts/MessageContext";


const routes = [{name: "Whiskeys", path: "/whiskeys"}, {name: "Users", path: "/users"}]

export default function NavBar() {
  const session = useSession()
  const pathname = usePathname();
  if (pathname.match("/login") || pathname.match("/error")) return;

  return (
    <AppBar position="static">
      <Toolbar>
        <BrandBadge sx={{ flexGrow: 1 }} />
        <NavMenu />
      </Toolbar>
    </AppBar>
  );
}

interface BrandBadgeProps {
  sx?: SxProps;
}
function BrandBadge({ sx }: BrandBadgeProps) {
  return (
    <Box sx={sx}>
      <Link href="/">
        <Typography variant="h3">Whiskey Night</Typography>
      </Link>
    </Box>
  );
}

function NavMenu() {
  const supabase = supabaseClient
  const session = useSession()
  const {setMessage} = useMessageContext()
  const router = useRouter()
  const user = session?.user
  const initials =
    user?.user_metadata.firstName[0] + user?.user_metadata.lastName[0];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
  const isOpen = Boolean(anchorEl);
  const handleOpen = (e: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const buildItems = () => {
    return routes.map((route, i, array) => {
      return <Link key={route.path} href={route.path}><MenuItem divider={i == array.length-1}>{route.name}</MenuItem></Link>
    })
  }

  const signOut = async() => {
    const {error} = await supabase.auth.signOut()
    if(error){
      setMessage({title: "Sign Out Error", content: error.message, type: "error"})
      return
    }
    router.push("/login")
  }

  return (
    <>
      <IconButton id="avatar" onClick={handleOpen}>
        <Avatar sx={{ bgcolor: "secondary.main" }}>{initials}</Avatar>
      </IconButton>
      <Menu
        id="navmenu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuList >
          <MenuItem divider>Profile</MenuItem>
          {buildItems()}
          <MenuItem onClick={signOut}>Logout<ListItemIcon sx={{justifyContent: 'end'}}>
            <Logout fontSize="small" />
          </ListItemIcon></MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
