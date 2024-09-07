import { Container, Typography } from "@mui/material";
import UserBadge from "./components/UserBadge";
import LogoutButton from "./components/LogoutButton";

export default function Home() {
  return (
    <>
      <Container disableGutters sx={{display: "flex"}}>
        <UserBadge />
        <LogoutButton />
      </Container>
      <Typography variant="h3" color={"green"} align="center">This is the home page</Typography>
    </>
  )
}
