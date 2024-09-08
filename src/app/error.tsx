'use client';

import React, { FC, ReactNode, useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';


type Props = {
  error: Error | undefined,
  reset: () => void
}

export default function HomeError({error, reset}: Props) {
  return (
    <Container maxWidth="md" style={{ marginTop: '3rem' }}>
        <Box textAlign="center">
          <Typography variant="h3" gutterBottom>
            Bummer...
          </Typography>
          <Typography variant="body1" gutterBottom>
            An unexpected error occurred.
          </Typography>
          <Typography variant="body2" gutterBottom>
            {error?.message}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Try reloading the page.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={reset}
            style={{ marginTop: '1rem' }}
          >
            Reload
          </Button>
        </Box>
      </Container>
  )
}