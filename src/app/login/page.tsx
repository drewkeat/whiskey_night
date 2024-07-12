import { Container, Paper, Typography } from "@mui/material";
import Signinform from "@/components/Signinform"


export default function Login() {
  return (
    <Container>
      <Typography variant="h3" color="green" align="center">Login Page</Typography>
        <Signinform />
    </Container>
  )
}
