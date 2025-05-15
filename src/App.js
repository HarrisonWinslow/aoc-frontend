import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Container, Typography, Button, Stack } from '@mui/material'; 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import AOCYear from './Components/AOCYear';
import AOCDay from './Components/AOCDay';
import BreadcrumbsNav from "./Components/BreadcrumbsNav";

function Home() {
  
  const today = new Date();
  const month = today.getMonth() + 1; // 0-indexed: 0 = January, so add 1
  const year = month === 12 ? today.getFullYear() : today.getFullYear() - 1; // e.g., 2025
  
  const years = Array.from({ length: year - 2015 + 1 }, (_, i) => year - i);
  
  return (
    <Container>
      <BreadcrumbsNav />
      <Typography variant="h2" gutterBottom>
        Hello, welcome to Harrison's Advent of Code!
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
        Years
      </Typography>
      <Stack direction="column" spacing={1}>
        {years.map((year) => (
          <Link key={year} to={`/${year}`} underline="hover">
            {year}
          </Link>
        ))}
      </Stack>
    </Container>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:year" element={<AOCYear />} />
        <Route path="/:year/:day" element={<AOCDay />} />
      </Routes>
    </Router>
  );
}

export default App;