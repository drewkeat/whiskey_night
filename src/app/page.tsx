import { Typography } from "@mui/material";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <Typography variant="h3" color={"green"} align="center">
        This is the home page
      </Typography>
    </>
  );
}
