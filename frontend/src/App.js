import React from 'react';
import EnvanterList from './components/EnvanterList';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Envanter Yönetim Sistemi
      </Typography>
      <EnvanterList />
    </Container>
  );
}

export default App;