import { Container, Paper, Typography } from "@mui/material";
import LoginFormContainer from "./components/LoginFormContainer"


export default function Login() {
  return (
    <Container sx={{height: "100%", display: "flex", flexFlow: "column", alignContent: "space-evenly"}}>
      <Typography variant="h3" color="green" align="center">Login Page</Typography>
        <LoginFormContainer />
    </Container>
  )
}
