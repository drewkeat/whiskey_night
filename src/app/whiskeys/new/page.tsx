import { Container, Card, Typography } from '@mui/material';
import WhiskeyForm from './components/WhiskeyForm';

export default function NewWhiskeyPage() {
  return (
    <Container sx={{ mt: 5 }}>
      <Card sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          New Whiskey
        </Typography>
        <WhiskeyForm />
      </Card>
    </Container>
  );
}