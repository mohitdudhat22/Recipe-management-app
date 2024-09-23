import React from 'react';
import { Typography, Container } from '@mui/material';

const NotFound = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" align="center">
        The page you are looking for doesn't exist or has been moved.
      </Typography>
    </Container>
  );
};

export default NotFound;