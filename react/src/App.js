import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import './App.css';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';

function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      if (value === '.' && display.includes('.')) {
        return;
      }
      setDisplay(display + value);
    }
  };

  const handleOperationClick = (op) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setWaitingForSecondValue(true);
    setDisplay('0');
  };

  const handleEqualsClick = () => {
    if (!previousValue || !operation) return;

    const currentValue = parseFloat(display);
    let result = 0;

    if (operation === '+') {
      result = previousValue + currentValue;
    } else if (operation === '-') {
      result = previousValue - currentValue;
    } else if (operation === '*') {
      result = previousValue * currentValue;
    } else if (operation === '/') {
      if (currentValue === 0) {
        setDisplay('Error');
        return;
      }
      result = previousValue / currentValue;
    }

    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  const handleClearClick = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', 'C', '+',
    '='
  ];

  return (
    <ErrorBoundary>
      <Box className="Calculator-container">
        <Paper elevation={3} className="Calculator-paper">
          <Box className="Calculator-display">
            <Typography variant="h4" align="right" className="Calculator-text">
              {display}
            </Typography>
          </Box>
          <Grid container spacing={1} className="Calculator-buttons">
            {buttons.map((btn) => (
              <Grid item xs={3} key={btn}>
                <Button
                  variant="contained"
                  fullWidth
                  className={`Calculator-button ${btn === '=' ? 'Calculator-equals' : ''}`}
                  onClick={() => {
                    if (btn === 'C') handleClearClick();
                    else if (btn === '=') handleEqualsClick();
                    else if (['+', '-', '*', '/'].includes(btn)) handleOperationClick(btn);
                    else handleNumberClick(btn);
                  }}
                >
                  {btn}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </ErrorBoundary>
  );
}

export default App;
