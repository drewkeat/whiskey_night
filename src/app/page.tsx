import { Typography } from "@mui/material";
import UserBadge from "./components/UserBadge";

export default function Home() {
  return (
    <>
      <UserBadge />
      <Typography variant="h3" color={"green"} align="center">This is the home page</Typography>
    </>
  )
}
