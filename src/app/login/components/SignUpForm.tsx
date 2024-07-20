"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient()

async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const email = data.get("email")!.toString()
  const password = data.get("password")!.toString()
  const userData = {email, password}
  if(!userData){
    console.error("No Form Data")
  } else {
    console.log(userData);
    const user = await signUpNewUser(userData)
    console.log("User:", user)
  }
};

async function signUpNewUser(credentials: {email: string, password: string}) {
  const { data, error } = await supabase.auth.signUp({
    ...credentials,
    options: {
      emailRedirectTo: 'http://localhost:3000/whiskeys',
    },
  })
  if(error){
    throw new Error(error.message)
  }
  return data
}

export default function SignUpForm({
  switchForm,
  ...props
}: {
  switchForm: () => void;
}) {
  return (
    <Grid
      container
      component="main"
      justifyContent="center"
      sx={{ height: "50vh" }}
    >
      <CssBaseline />
      <Grid item component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link onClick={switchForm} variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
