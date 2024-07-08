import { Container, Paper, Typography } from "@mui/material";

export default function Login() {
  return (
    <Container>
      <Typography variant="h3" color="green" align="center">Login Page</Typography>
      <Paper elevation={5}>
        <Typography variant="h4" color="blue" align="center">Login Form</Typography>
      </Paper>
    </Container>
  )
}
