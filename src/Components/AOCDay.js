import { React, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import BreadcrumbsNav from "./BreadcrumbsNav";

function AOCDay() {
  const { year, day } = useParams();
  const [input, setInput] = useState("No input yet");
  const [description, setDescription] = useState("No description yet");
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
    
    async function fetchDescription() {
      /*global fetch*/
      console.log("Fetching input:");
      try {
        const response = await fetch(`https://aoc-backend.onrender.com/description/${year}/${day}`);
        if (!response.ok) throw new Error('Failed to fetch description');
        const text = await response.text();
        setDescription(text);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchInput();
    fetchDescription();
  }, [year, day]);
  
  useEffect(() => {
      console.log(input);
  }, [input]);

  return (
    <Container>
      <BreadcrumbsNav />
      <Typography variant="h4" gutterBottom>
        Advent of Code {year} day {day}
      </Typography>
      <hr></hr>
      <Box
          sx={{
            whiteSpace: "normal", // Let HTML flow
            "& code": {
              fontFamily: "monospace",
              backgroundColor: "#eee",
              padding: "0.2em 0.4em",
              borderRadius: "4px",
            },
            "& pre": {
              backgroundColor: "#f0f0f0",
              padding: "1em",
              overflowX: "auto",
              borderRadius: "8px",
            },
            "& em": {
              fontStyle: "italic",
            },
            "& h2": {
              marginTop: "1em",
            },
          }}
          dangerouslySetInnerHTML={{ __html: description }}
      />
      
      <hr></hr>
      
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Show Problem Input</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body" gutterBottom style={{ whiteSpace: 'pre-wrap' }}>
            {input}
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <br></br>
    </Container>
  );
}

export default AOCDay;
