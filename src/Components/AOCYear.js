import React from 'react';
import { useParams } from 'react-router-dom';

import { Container, Typography, Button, Stack } from '@mui/material'; 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import BreadcrumbsNav from "./BreadcrumbsNav";


function AOCYear() {
  const { year } = useParams();
  
  const today = new Date();
  const thisYear = today.getFullYear(); // e.g., 2025
  const month = today.getMonth() + 1;
  const day = year === thisYear && month === 12 ? today.getDate() : 25; // Day of the month
  const days = Array.from({ length: day }, (_, i) => day - i);

  return (
    <Container>
      <BreadcrumbsNav />
      <Typography variant="h4" gutterBottom>
        Advent of Code {year}
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
        Days
      </Typography>
      <Stack direction="column" spacing={1}>
        {days.map((day) => (
          <Link key={day} to={`/${year}/${day}`} underline="hover">
            Day {day}
          </Link>
        ))}
      </Stack>
      {/* You can load challenges or content for the year here */}
    </Container>
  );
}

export default AOCYear;
