import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import UserBadge from "./components/UserBadge";
import LogoutButton from "./components/LogoutButton";
import ErrorButton from "./components/ErrorButton";

export default function Home() {
  return (
    <>
      <Box sx={{}}>
        <AppBar position="static">
          <Toolbar>
            <UserBadge sx={{flexGrow: 1}} />
            <ErrorButton />
            <LogoutButton />
          </Toolbar>
        </AppBar>
      </Box>
      <Typography variant="h3" color={"green"} align="center">
        This is the home page
      </Typography>
    </>
  );
}
