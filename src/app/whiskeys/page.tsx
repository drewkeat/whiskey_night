import { Typography, Container } from "@mui/material";


export default async function WhiskeyList() {
  return (
    <div>
      <Typography variant="h3" color="green" align="center">
        Whiskey List
      </Typography>
      <Container maxWidth="md">
        <ul>List Whiskeys here</ul>
      </Container>
    </div>
  );
}
