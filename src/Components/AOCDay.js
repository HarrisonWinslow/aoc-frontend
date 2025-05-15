import { React, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

function AOCDay() {
  const { year, day } = useParams();
  const [input, setInput] = useState("No input yet");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    async function fetchInput() {
      /*global fetch*/
      console.log("Fetching input:");
      try {
        const response = await fetch(`https://aoc-backend.onrender.com/input/${year}/${day}`);
        if (!response.ok) throw new Error('Failed to fetch input');
        const text = await response.text();
        setInput(text);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchInput();
  }, [year, day]);
  
  useEffect(() => {
      console.log(input);
  }, [input]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Advent of Code {year} day {day}
      </Typography>
      <Typography variant="h4" gutterBottom style={{ whiteSpace: 'pre-wrap' }}>
        {input}
      </Typography>
      {/* You can load challenges or content for the year here */}
    </Container>
  );
}

export default AOCDay;
