import { Container, Typography } from "@mui/material";
import LoginFormContainer from "./components/LoginFormContainer"


export default function Login() {
  return (
    <Container disableGutters sx={{height: "100%", display: "flex", flexFlow: "column", justifyContent: 'center'}}>
      <LoginFormContainer />
    </Container>
  )
}
